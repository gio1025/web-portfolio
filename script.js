/* ==========================================================
   Mobile Navigation
========================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active");

    });

}


/* ==========================================================
   Close Mobile Menu When Link is Clicked
========================================================== */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.classList.remove("active");

    });

});


/* ==========================================================
   Sticky Header
========================================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

    } else {

        header.style.boxShadow = "none";

    }

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

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

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

        "Computer Engineer",

        "Software QA Engineer",

        "Manual Tester",

        "Automation Tester"

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

    loader.style.opacity="0";

    loader.style.transition=".5s";

    setTimeout(()=>{

        loader.style.display="none";

    },500);

});

window.addEventListener("scroll",()=>{

    const scroll=

    document.documentElement.scrollTop;

    const height=

    document.documentElement.scrollHeight-

    document.documentElement.clientHeight;

    const percent=(scroll/height)*100;

    document.getElementById("progressBar").style.width=

    percent+"%";

});