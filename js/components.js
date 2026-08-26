// DFK site — shared header/footer + nav interactivity

const DFK_EXPERTISE_ITEMS = [
  { href: "areas-of-expertise.html", label: "Corporate & Commercial" },
  { href: "property-estates.html", label: "Property & Estates" },
  { href: "mining-environmental.html", label: "Mining & Environmental" },
  { href: "dispute-resolution.html", label: "Dispute Resolution" },
];

function dfkHeaderHTML(active){
  const isActive = (key) => active === key ? "is-active" : "";
  const dropdownActive = ["expertise","areas-of-expertise","corporate-commercial","property-estates","mining-environmental","dispute-resolution"].includes(active);

  const dropdownLinks = DFK_EXPERTISE_ITEMS.map(item => {
    const key = item.href.replace(".html","");
    const activeClass = (active === key || (active === "expertise" && key === "areas-of-expertise")) ? "is-active" : "";
    return `<a href="${item.href}" class="${activeClass}">${item.label}</a>`;
  }).join("");

  return `
  <header class="site-header">
    <div class="header-top">
      <a href="index.html" class="brand">
        <img src="assets/img/logo.png" alt="DFK Logo" class="logo">
        <div class="brand-text">De Caires, Fitzpatrick &amp;<br>Karran<br><small>Attorneys-at-Law</small></div>
      </a>
      <button class="mobile-toggle" id="mobileNavToggle" aria-label="Toggle navigation">&#9776;</button>
      <nav class="main-nav" id="mainNav">
        <a href="index.html" class="home-link ${isActive('home')}">Home</a>
        <div class="nav-dropdown" id="navDropdown">
          <a href="areas-of-expertise.html" class="${dropdownActive ? 'is-active' : ''}">Areas of Expertise</a>
          <div class="dropdown-menu">${dropdownLinks}</div>
        </div>
        <a href="attorneys.html" class="${isActive('attorneys')}">Lawyers Directory</a>
        <a href="about.html" class="${isActive('about')}">About Us</a>
        <a href="contact.html" class="${isActive('contact')}">Contact Us</a>
      </nav>
    </div>
    <div class="toggle-row">
      <a href="index.html" class="toggle-btn active">DFK Law</a>
      <a href="corporate-services.html" class="toggle-btn">DFK Corporate Services</a>
    </div>
  </header>`;
}

function dfkFooterHTML(){
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="col">
          <h4>Contact Us</h4>
          <p>79B Cowan Street, Kingston, Georgetown, Guyana</p>
          <p>(592) 226-1126 &nbsp;•&nbsp; (592) 226-0250</p>
          <p>lawoffice@dfkguyana.com</p>
        </div>
        <div class="col">
          <h4>Quick Links</h4>
          <a href="areas-of-expertise.html">Areas of Expertise</a>
          <a href="attorneys.html">Lawyers Directory</a>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact Us</a>
        </div>
        <div class="col">
          <h4>Office Hours</h4>
          <p>Monday – Friday: 8:00AM – 4:00PM</p>
          <p>Saturday &amp; Sunday: Closed</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} De Caires, Fitzpatrick &amp; Karran. All rights reserved.</span>
        <span>Georgetown, Guyana &middot; Since 1969</span>
      </div>
    </div>
  </footer>`;
}

function dfkInitHeaderFooter(active){
  const headerMount = document.getElementById("dfk-header");
  const footerMount = document.getElementById("dfk-footer");
  if(headerMount) headerMount.outerHTML = dfkHeaderHTML(active);
  if(footerMount) footerMount.outerHTML = dfkFooterHTML();

  const mobileToggle = document.getElementById("mobileNavToggle");
  const mainNav = document.getElementById("mainNav");
  if(mobileToggle && mainNav){
    mobileToggle.addEventListener("click", () => mainNav.classList.toggle("open"));
  }
  const navDropdown = document.getElementById("navDropdown");
  if(navDropdown){
    const link = navDropdown.querySelector("a");
    link.addEventListener("click", (e) => {
      if(window.innerWidth <= 900){
        e.preventDefault();
        navDropdown.classList.toggle("open");
      }
    });
  }
}
