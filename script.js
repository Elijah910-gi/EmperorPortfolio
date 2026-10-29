// Enable scroll-reveal styling only when JavaScript is available.
document.documentElement.classList.add("js-enabled");

// MOBILE NAVIGATION
const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
  const closeMenu = () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
}

// CURRENT YEAR
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// SCROLL REVEAL — gracefully fall back on older browsers.
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// CURSOR GLOW — only track pointers on devices with a fine pointer.
const glow = document.querySelector(".cursor-glow");
if (glow && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
}
