# Contact Form Backend — Setup Guide (Bluehost)

This connects your Contact page to a real MySQL database and sends you an
email every time someone submits the form. It uses PHP, which Bluehost
supports natively — no extra software needed.

## What's included

```
backend/
├── config.php       Database + email settings (edit this one)
├── schema.sql        Creates the table that stores submissions
└── form-handler.php  Receives the form, saves it, emails you
```

## Setup steps

### 1. Create the MySQL database

In Bluehost's **cPanel**, go to **MySQL® Databases**:

1. Under "Create New Database," name it something like `dfkcontacts` and click Create.
   (Bluehost will prefix it automatically, e.g. `yourcpaneluser_dfkcontacts`.)
2. Under "MySQL Users," create a new user with a strong password — save that
   password somewhere safe, you'll need it in step 3.
3. Under "Add User to Database," add that user to the database you just made,
   and give it **All Privileges**.

### 2. Create the table

Still in cPanel, open **phpMyAdmin**, select your new database on the left,
click the **SQL** tab, paste in the contents of `backend/schema.sql`, and
click **Go**. This creates the `contact_submissions` table.

### 3. Fill in your credentials

Open `backend/config.php` and replace these four lines with the real values
from step 1:

```php
define('DB_NAME', 'yourcpaneluser_dfkcontacts');
define('DB_USER', 'yourcpaneluser_dbuser');
define('DB_PASS', 'REPLACE_WITH_YOUR_DB_PASSWORD');
```

Also update `NOTIFY_TO_EMAIL` if `lawoffice@dfkguyana.com` isn't the inbox
that should receive form submissions, and set `NOTIFY_FROM_EMAIL` to an
address on your own domain (e.g. `noreply@dfkguyana.com`) — using an address
from a domain you don't control there can cause emails to get flagged as spam.

### 4. Upload everything

Upload the whole site — including the `backend/` folder — into
`public_html` (or a subfolder, if the site lives at
`yourdomain.com/somefolder`) via cPanel's **File Manager** or FTP.

For better security, if your hosting plan allows it, you can instead place
`config.php` **one level above** `public_html` and update the `require`
line at the top of `form-handler.php` to point there
(`require __DIR__ . '/../config.php';`). That keeps your DB password
completely outside the web-servable folder. Not required to make it work —
just an extra precaution.

### 5. Update the allowed domain

In `backend/form-handler.php`, find this line:

```php
header('Access-Control-Allow-Origin: https://www.dfkguyana.com');
```

Change it to match your actual live domain exactly (including `www.` or not,
whichever you use).

### 6. Test it

Open the live Contact page, fill out the form, and submit. You should:
- See a green "Thank you" message appear
- Receive an email at `NOTIFY_TO_EMAIL`
- See a new row in `contact_submissions` (check via phpMyAdmin → your
  database → the `contact_submissions` table → Browse tab)

## Viewing submissions later

Anytime you want to see everything that's come in, log into cPanel →
phpMyAdmin → your database → `contact_submissions` → **Browse**. You can
also **Export** that table to CSV/Excel directly from phpMyAdmin if you want
to hand submissions to someone or import them elsewhere.

## If emails don't arrive

Bluehost's built-in `mail()` function usually works, but shared hosting
mail can occasionally land in spam or get rate-limited. If that happens,
the fix is to send via SMTP instead (e.g. through your existing email
inbox's SMTP settings, or a transactional service like Brevo or Mailgun's
free tier) using the PHPMailer library. Let me know if emails aren't
showing up and I'll walk through swapping that in — the database storage
side will keep working regardless, since it's independent of email delivery.

## Spam protection

The form includes a hidden "honeypot" field — invisible to real visitors,
but bots that auto-fill every input on a page will fill it in too. Any
submission with that field non-empty is silently discarded before it ever
touches your database or inbox. No CAPTCHA needed for typical volume, but if
spam becomes a problem later, adding Google reCAPTCHA is a straightforward
next step.
