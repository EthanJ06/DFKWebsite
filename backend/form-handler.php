<?php
/**
 * form-handler.php
 * Receives the DFK contact form submission, stores it in MySQL,
 * and emails a notification to the firm.
 */

header('Content-Type: application/json');

// Only allow the site's own domain to POST here.
// Update this to your real domain once the site is live.
header('Access-Control-Allow-Origin: https://www.dfkguyana.com');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require __DIR__ . '/config.php';
require __DIR__ . '/phpmailer/src/Exception.php';
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

function respond($success, $message) {
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    respond(false, 'Method not allowed.');
}

// Read JSON body sent by the form's fetch() call.
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    respond(false, 'Invalid submission.');
}

// --- Honeypot spam check ---
// The form includes a hidden field named "website" that real users never fill in.
// Bots that auto-fill every field will trip this, and we quietly pretend success.
if (!empty($input['website'])) {
    respond(true, 'Thank you.'); // silently drop, don't tip off the bot
}

// --- Validate required fields ---
$firstName = trim($input['firstName'] ?? '');
$lastName  = trim($input['lastName'] ?? '');
$email     = trim($input['email'] ?? '');
$phone     = trim($input['phone'] ?? '');
$area      = trim($input['area'] ?? '');
$message   = trim($input['message'] ?? '');

if ($firstName === '' || $lastName === '' || $email === '' || $message === '') {
    http_response_code(422);
    respond(false, 'Please fill in all required fields.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    respond(false, 'Please enter a valid email address.');
}

// --- Store in MySQL ---
try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare(
        'INSERT INTO contact_submissions
            (first_name, last_name, email, phone, area_of_interest, message, ip_address)
         VALUES
            (:first_name, :last_name, :email, :phone, :area, :message, :ip)'
    );

    $stmt->execute([
        ':first_name' => $firstName,
        ':last_name'  => $lastName,
        ':email'      => $email,
        ':phone'      => $phone,
        ':area'       => $area,
        ':message'    => $message,
        ':ip'         => $_SERVER['REMOTE_ADDR'] ?? null,
    ]);
} catch (PDOException $e) {
    error_log('DFK contact form DB error: ' . $e->getMessage());
    http_response_code(500);
    respond(false, 'Something went wrong saving your message. Please try again or call us directly.');
}

// --- Send email notification (via SMTP, authenticated as your real
//     Google Workspace mailbox — required for Google to accept the mail) ---
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = SMTP_PORT;

    $mail->setFrom(NOTIFY_FROM_EMAIL, 'DFK Website');
    $mail->addAddress(NOTIFY_TO_EMAIL);
    $mail->addReplyTo($email, "{$firstName} {$lastName}");

    $mail->Subject = NOTIFY_SUBJECT;
    $mail->Body    = "New contact form submission from the DFK website:\n\n"
        . "Name: {$firstName} {$lastName}\n"
        . "Email: {$email}\n"
        . "Phone: {$phone}\n"
        . "Area of Interest: {$area}\n\n"
        . "Message:\n{$message}\n";

    $mail->send();
} catch (PHPMailerException $e) {
    // Don't fail the whole request if email fails — the submission is
    // already safely stored in the database either way. Just log it so
    // you (or I) can see what went wrong.
    error_log('DFK contact form email error: ' . $mail->ErrorInfo);
}

respond(true, 'Thank you — your message has been sent. Our team will be in touch shortly.');
