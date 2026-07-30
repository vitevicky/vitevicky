// ===== Sticky Navbar =====
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        navbar?.classList.add("is-scrolled");
    } else {
        navbar?.classList.remove("is-scrolled");
    }
});

// ===== Scroll Reveal =====
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
        }
    });
}, {
    threshold: 0.15
});

reveals.forEach((el) => observer.observe(el));

// ===== Mobile Menu =====
const hamburger = document.querySelector(".navbar__hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".mobile-overlay");

function closeMenu() {
    mobileMenu?.classList.remove("is-open");
    overlay?.classList.remove("is-open");
}

hamburger?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("is-open");
    overlay?.classList.toggle("is-open");
});

overlay?.addEventListener("click", closeMenu);

// ===== FAQ Accordion =====
document.querySelectorAll(".accordion-trigger").forEach((btn) => {

    btn.addEventListener("click", () => {

        const panel = btn.nextElementSibling;
        const expanded = btn.getAttribute("aria-expanded") === "true";

        btn.setAttribute("aria-expanded", !expanded);

        if (!expanded) {
            panel.style.maxHeight = panel.scrollHeight + "px";
        } else {
            panel.style.maxHeight = null;
        }

    });

});

// ===== Scroll To Top =====
const topBtn = document.querySelector(".fab--top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        topBtn?.classList.add("is-visible");
    } else {
        topBtn?.classList.remove("is-visible");
    }

});

topBtn?.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ===== Search Toggle =====
const searchBtn = document.querySelector(".search-toggle");
const searchBar = document.querySelector(".search-bar");

searchBtn?.addEventListener("click", () => {
    searchBar?.classList.toggle("is-open");
});

// ===== Testimonial Slider =====
const slides = document.querySelectorAll(".testimonial-slide");
const prevBtn = document.getElementById("testimonialPrev");
const nextBtn = document.getElementById("testimonialNext");
const dotsContainer = document.getElementById("testimonialDots");

let current = 0;
let autoSlide;

// Create Dots
if (dotsContainer && slides.length) {
    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            current = index;
            showSlide(current);
            restartAutoSlide();
        });

        dotsContainer.appendChild(dot);
    });
}

const dots = document.querySelectorAll(".dot");

// Show Slide
function showSlide(index) {

    slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });

}

// Next Slide
function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

// Previous Slide
function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
}

// Auto Slide
function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 5000);
}

// Restart Auto Slide
function restartAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

// Initialize
if (slides.length) {

    showSlide(current);
    startAutoSlide();

    nextBtn?.addEventListener("click", () => {
        nextSlide();
        restartAutoSlide();
    });

    prevBtn?.addEventListener("click", () => {
        prevSlide();
        restartAutoSlide();
    });

}