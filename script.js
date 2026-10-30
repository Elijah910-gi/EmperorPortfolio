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

// ABOUT SECTION — portrait + personal bio
const aboutGrid = document.querySelector(".about-grid");
if (aboutGrid) {
  const aboutStyles = document.createElement("style");
  aboutStyles.textContent = `
    .about-grid {
      grid-template-columns: minmax(180px, 0.72fr) minmax(280px, 1.45fr) minmax(180px, 0.63fr);
      align-items: stretch;
    }

    .about-photo {
      min-height: 360px;
      padding: 10px;
      overflow: hidden;
      border: 1px solid var(--border);
      background: var(--card);
      backdrop-filter: blur(12px);
      border-radius: 20px;
      position: relative;
    }

    .about-photo::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(8, 11, 20, 0.35), transparent 45%);
      pointer-events: none;
    }

    .about-photo img {
      width: 100%;
      height: 100%;
      min-height: 340px;
      display: block;
      object-fit: cover;
      object-position: center top;
      border-radius: 14px;
    }

    .about-text {
      height: 100%;
    }

    @media (max-width: 900px) {
      .about-grid {
        grid-template-columns: 0.8fr 1.2fr;
      }

      .about-card {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: 650px) {
      .about-grid {
        grid-template-columns: 1fr;
      }

      .about-photo {
        min-height: 390px;
      }

      .about-photo img {
        min-height: 370px;
      }

      .about-card {
        grid-column: auto;
      }
    }
  `;
  document.head.appendChild(aboutStyles);

  aboutGrid.innerHTML = `
    <div class="about-photo reveal">
      <img src="assets/emperor-about.svg" alt="Emperor portrait">
    </div>

    <div class="about-text glass reveal">
      <p>
        I'm a Computer Science student and developer who enjoys turning ideas into functional products.
        My focus is on creating fast, responsive interfaces while continuously expanding my knowledge
        of programming, AI and modern software development.
      </p>

      <p>
        I care about clean code, strong visual design and solutions that are simple for people to use.
        I'm always learning, experimenting and building something better with every project.
      </p>
    </div>

    <div class="about-card reveal">
      <span class="big-number">100%</span>
      <p>Focused on becoming better with every project.</p>
    </div>
  `;
}

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
