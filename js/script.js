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
