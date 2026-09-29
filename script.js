/* ==========================================================
   AVA SOBOLAK PORTFOLIO
   Interactive functionality
========================================================== */


document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------------------------------------
     CURRENT YEAR
  --------------------------------------------------------- */

  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* --------------------------------------------------------
     MOBILE MENU
  --------------------------------------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      menuToggle.textContent =
        isOpen ? "Menu" : "Close";

      mainNav.classList.toggle("is-open");

      document.body.classList.toggle(
        "menu-open",
        !isOpen
      );

    });


    /* Close menu after a navigation link is selected */

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach((link) => {

      link.addEventListener("click", () => {

        mainNav.classList.remove("is-open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.textContent = "Menu";

        document.body.classList.remove("menu-open");

      });

    });

  }


  /* --------------------------------------------------------
     EXPANDABLE EXPERIENCE SECTIONS
  --------------------------------------------------------- */

  const projectToggles =
    document.querySelectorAll(".project-toggle");

  projectToggles.forEach((button) => {

    button.addEventListener("click", () => {

      const targetId =
        button.getAttribute("aria-controls");

      const details =
        document.getElementById(targetId);

      if (!details) {
        return;
      }

      const isExpanded =
        button.getAttribute("aria-expanded") === "true";

      button.setAttribute(
        "aria-expanded",
        String(!isExpanded)
      );


      const label =
        button.querySelector("span:first-child");

      if (label) {
        label.textContent =
          isExpanded
            ? "View details"
            : "Close details";
      }


      if (isExpanded) {

        details.hidden = true;

        details.classList.remove("is-opening");

      } else {

        details.hidden = false;

        details.classList.remove("is-opening");

        /* Force browser to recognize class change */
        void details.offsetWidth;

        details.classList.add("is-opening");

      }

    });

  });


  /* --------------------------------------------------------
     CLOSE MOBILE NAVIGATION WITH ESCAPE KEY
  --------------------------------------------------------- */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      mainNav &&
      mainNav.classList.contains("is-open")
    ) {

      mainNav.classList.remove("is-open");

      document.body.classList.remove("menu-open");

      if (menuToggle) {

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.textContent = "Menu";

        menuToggle.focus();

      }

    }

  });


  /* --------------------------------------------------------
     SIMPLE REVEAL EFFECT
     Uses IntersectionObserver without requiring libraries.
  --------------------------------------------------------- */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (!prefersReducedMotion) {

    const revealElements =
      document.querySelectorAll(
        ".project, .leadership-item"
      );


    /* Add initial styles */

    revealElements.forEach((element) => {

      element.style.opacity = "0";
      element.style.transform = "translateY(18px)";

      element.style.transition =
        "opacity 0.65s ease, transform 0.65s ease";

    });


    const observer =
      new IntersectionObserver(
        (entries, revealObserver) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.style.opacity = "1";
              entry.target.style.transform =
                "translateY(0)";

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach((element) => {
      observer.observe(element);
    });

  }

});
