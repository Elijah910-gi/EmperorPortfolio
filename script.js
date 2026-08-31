// =========================
// MOBILE NAVIGATION
// =========================

const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuButton && nav) {

  menuButton.addEventListener("click", () => {

    const isOpen =
      nav.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      isOpen.toString()
    );

  });


  // Close menu when a navigation
  // link is clicked

  document
    .querySelectorAll(".nav a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove("open");

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}


// =========================
// CURRENT YEAR
// =========================

const year =
  document.getElementById("year");

if (year) {

  year.textContent =
    new Date().getFullYear();

}


// =========================
// SCROLL REVEAL ANIMATION
// =========================

const revealElements =
  document.querySelectorAll(".reveal");


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach(element => {

  observer.observe(element);

});


// =========================
// CURSOR GLOW
// =========================

const glow =
  document.querySelector(".cursor-glow");


if (glow) {

  window.addEventListener(
    "mousemove",
    event => {

      glow.style.left =
        `${event.clientX}px`;

      glow.style.top =
        `${event.clientY}px`;

    }
  );

}

