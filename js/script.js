/*=====================================================
  0. ICONS
=====================================================*/

// This file is loaded with `defer` immediately after the deferred Lucide
// CDN script, so Lucide is guaranteed to be available by the time this runs.

if (window.lucide) {
    window.lucide.createIcons();
}


/*=====================================================
  PAGE LOADER
=====================================================*/

(function () {

    const loader = document.querySelector(".page-loader");

    if (!loader) return;

    function hideLoader() {
        loader.classList.add("loaded");
    }

    window.addEventListener("load", hideLoader);

    // Fallback in case the load event is delayed by a slow asset
    setTimeout(hideLoader, 2500);

})();


/*=====================================================
  SCROLL TO TOP
=====================================================*/

(function () {

    const scrollBtn = document.querySelector(".scroll-top-btn");

    if (!scrollBtn) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 480) {
            scrollBtn.classList.add("visible");
        } else {
            scrollBtn.classList.remove("visible");
        }

    });

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

})();


/*=====================================================
  1. NAVIGATION
=====================================================*/

// Hamburger Menu

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {

    hamburger.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}

// Close menu after clicking a navigation link

const navLinks = document.querySelectorAll("#nav-menu a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {

            navMenu.classList.remove("active");

        }

    });

});


/*=====================================================
  1B. DARK MODE TOGGLE
=====================================================*/

(function () {

    const root = document.documentElement;
    const toggle = document.getElementById("theme-toggle");

    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
        root.setAttribute("data-theme", "dark");
    }

    function updateIcon() {

        if (!toggle) return;

        const isDark = root.getAttribute("data-theme") === "dark";
        const icon = toggle.querySelector("i");

        if (icon) {
            icon.setAttribute("data-lucide", isDark ? "sun" : "moon");

            if (window.lucide) {
                window.lucide.createIcons();
            }
        }
    }

    updateIcon();

    if (toggle) {

        toggle.addEventListener("click", () => {

            const isDark = root.getAttribute("data-theme") === "dark";

            if (isDark) {
                root.removeAttribute("data-theme");
                localStorage.setItem("theme", "light");
            } else {
                root.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
            }

            updateIcon();

        });

    }

})();


/*=====================================================
  2. HEADER
=====================================================*/

// Shrinking Header While Scrolling

const header = document.querySelector("header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("shrink");

        } else {

            header.classList.remove("shrink");

        }

    });

}


/*=====================================================
  STAGGERED REVEAL INDEXING
=====================================================*/

// Assigns a --stagger index to each item in grouped card layouts so the
// CSS transition-delay (see style.css, section 16) fires them in sequence
// as the group scrolls into view.

const staggerGroups = [
    ".skills-grid .skillcard",
    ".portfolio-grid .portfolio-preview-card",
    ".testimonial-wrapper .testimonial-card",
    ".timeline .timeline-row"
];

staggerGroups.forEach(selector => {

    document.querySelectorAll(selector).forEach((el, index) => {

        el.style.setProperty("--stagger", index);

    });

});


/*=====================================================
  BUTTON RIPPLE
=====================================================*/

const rippleTargets = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .cta-button, .contact-button a"
);

rippleTargets.forEach(btn => {

    btn.addEventListener("click", function (e) {

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

        this.appendChild(ripple);

        ripple.addEventListener("animationend", () => ripple.remove());

    });

});


/*=====================================================
  SCROLL REVEAL
=====================================================*/

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.05
});

reveals.forEach(item => {
    revealObserver.observe(item);
});



/*=====================================================
  4. SMOOTH SCROLL
=====================================================*/

// Smooth scrolling for links pointing to IDs

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        // Skip bare "#" placeholder links and guard against missing targets
        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});


/*=====================================================
  5. CONTACT FORM (AJAX + FORMSPREE)
=====================================================*/

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const data = new FormData(form);

        try {

            const response = await fetch(form.action, {

                method: form.method,
                body: data,
                headers: {
                    "Accept": "application/json"
                }

            });

            if (response.ok) {

                status.textContent = "✓ Message sent successfully!";
                status.style.color = "green";

                form.reset();

            } else {

                status.textContent = "Something went wrong. Please try again.";
                status.style.color = "red";

            }

        } catch (error) {

            status.textContent = "Network error. Please try again.";
            status.style.color = "red";

        }

    });

}

/*=====================================================
  6. PORTFOLIO IMAGE EFFECTS
=====================================================*/

// Image Click Enlargement (Reserved for future gallery)

const images = document.querySelectorAll(".source-grid img");

images.forEach(image => {

    image.addEventListener("click", () => {

        image.classList.toggle("large");

    });

});


/*=====================================================
  7. ANIMATED STATISTICS COUNTER
=====================================================*/

const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {

    const target = parseInt(counter.dataset.target);

    const symbol = counter.dataset.symbol;

    let count = 0;
    const increment = target / 25;

    counter.textContent = Math.ceil(count) + symbol;

    const timer = setInterval(() => {

    count += increment;

       counter.textContent = Math.ceil(count) + symbol;
    
    if (count >= target) {

        counter.textContent = target + symbol;

        clearInterval(timer);

    }

}, 25);

}

// Only start counting once each counter scrolls into view, and only once
const counterObserver = new IntersectionObserver((entries, obs) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            animateCounter(entry.target);

            obs.unobserve(entry.target);

        }

    });

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});

/*=====================================================
  8. IMAGE LIGHTBOX
=====================================================*/

const imageLinks = document.querySelectorAll(".image-link");

imageLinks.forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        // Create dark background
        const overlay = document.createElement("div");
        overlay.className = "lightbox";

        // Create image
        const image = document.createElement("img");
        image.src = this.href;

        overlay.appendChild(image);

        document.body.appendChild(overlay);
        function closeLightbox(e){

    if(e.key === "Escape"){

        overlay.remove();

        document.removeEventListener("keydown", closeLightbox);

    }

}

document.addEventListener("keydown", closeLightbox);

        // Close when background is clicked
        overlay.addEventListener("click", () => {

            overlay.remove();

            document.removeEventListener("keydown", closeLightbox);

        });

    });

});
