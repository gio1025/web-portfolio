/* ==========================================================
   Appearance
========================================================== */

const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("portfolio-theme") || "light";
} catch (error) {
    console.warn("Unable to read the saved appearance preference.", error);
}

const initialTheme = savedTheme === "dark" ? "dark" : "light";

function applyTheme(theme) {

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    if (themeToggle) {
        const isDark = theme === "dark";
        const label = isDark ? "Switch to light mode" : "Switch to dark mode";

        themeToggle.setAttribute("aria-label", label);
        themeToggle.setAttribute("aria-pressed", String(isDark));
        themeToggle.setAttribute("title", label);
        themeToggle.innerHTML = `<i class="fas ${isDark ? "fa-sun" : "fa-moon"}" aria-hidden="true"></i>`;
    }

    if (themeColor) {
        themeColor.setAttribute("content", theme === "dark" ? "#0B1220" : "#2563EB");
    }

}

applyTheme(initialTheme);

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);

        try {
            localStorage.setItem("portfolio-theme", nextTheme);
        } catch (error) {
            console.warn("Unable to save the appearance preference.", error);
        }

    });

}


/* ==========================================================
   Mobile Navigation
========================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");

        });

    });

}


/* ==========================================================
   Sticky Header
========================================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    header.classList.toggle("scrolled", window.scrollY > 16);

});


/* ==========================================================
   Back To Top Button
========================================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.style.display = "flex";

    } else {

        backToTop.style.display = "none";

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ==========================================================
   Active Navigation Highlight
========================================================== */

const sections = document.querySelectorAll("section[id]");

const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");
        link.removeAttribute("aria-current");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");
            link.setAttribute("aria-current", "page");

        }

    });

});


/* ==========================================================
   Scroll Reveal Animation
========================================================== */

const revealElements = document.querySelectorAll(

    ".about-container, .skill-card, .timeline-item, .project-card, .contact-container"

);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

revealElements.forEach(element => {

    element.classList.add("hidden");

    observer.observe(element);

});


/* ==========================================================
   Smooth Fade-In
========================================================== */

const style = document.createElement("style");

style.innerHTML = `

.hidden{

    opacity:0;

    transform:translateY(40px);

    transition:all .8s ease;

}

.show{

    opacity:1;

    transform:translateY(0);

}

`;

document.head.appendChild(style);


/* ==========================================================
   Current Year in Footer
========================================================== */

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML = `© ${new Date().getFullYear()} Gio Barrameda. All Rights Reserved.`;

}


/* ==========================================================
   Typing Effect (Hero)
========================================================== */

const typingElement = document.querySelector(".typing");

if (typingElement) {

    const words = [

        "Computer Engineer.",

        "Software QA Engineer.",

        "Manual Tester.",

        "Automation Tester.",

        "API Tester.",

        "Runner.",

        "Gamer."

    ];

    let wordIndex = 0;

    let charIndex = 0;

    let deleting = false;

    function type() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingElement.textContent = currentWord.substring(0, charIndex++);

            if (charIndex > currentWord.length) {

                deleting = true;

                setTimeout(type, 1500);

                return;

            }

        } else {

            typingElement.textContent = currentWord.substring(0, charIndex--);

            if (charIndex < 0) {

                deleting = false;

                wordIndex = (wordIndex + 1) % words.length;

            }

        }

        setTimeout(type, deleting ? 50 : 100);

    }

    type();

}

window.addEventListener("load",()=>{

    const loader=document.getElementById("loader");

    if (loader) {

        loader.style.opacity="0";

        loader.style.transition=".5s";

        setTimeout(()=>{

            loader.style.display="none";

        },500);

    }

});

window.addEventListener("scroll",()=>{

    const scroll=document.documentElement.scrollTop;

    const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

    const percent = height > 0 ? (scroll / height) * 100 : 0;

    const progressBar = document.getElementById("progressBar");

    if (progressBar) {
        progressBar.style.width = percent + "%";
    }

});

const contactForm = document.querySelector(".contact-form form");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const submitButton = contactForm.querySelector("button[type='submit']");

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent';
        }

        const formData = new FormData(contactForm);
        const name = (formData.get("name") || "").toString().trim();
        const email = (formData.get("email") || "").toString().trim();
        const subject = (formData.get("subject") || "").toString().trim();
        const message = (formData.get("message") || "").toString().trim();

        const mailtoLink = `mailto:giobarrameda123@gmail.com?subject=${encodeURIComponent(subject || "Portfolio Inquiry")}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

        window.location.href = mailtoLink;

        contactForm.reset();

        setTimeout(() => {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        }, 2500);

    });

}