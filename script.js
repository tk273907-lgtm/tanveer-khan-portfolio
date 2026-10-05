/* =========================================================
   TANVEER KHAN — HIGH UI PORTFOLIO
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");
  const themeToggle = document.getElementById("themeToggle");
  const year = document.getElementById("year");

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  // Mobile Navigation
  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");

      menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Theme
  const savedTheme = localStorage.getItem("tanveer-theme");

  if (savedTheme === "light") {
    body.classList.add("light");
  }

  const updateThemeIcon = () => {
    if (!themeToggle) return;

    const isLight = body.classList.contains("light");

    themeToggle.textContent = isLight ? "☀" : "☾";

    themeToggle.setAttribute(
      "aria-label",
      isLight
        ? "Switch to dark theme"
        : "Switch to light theme"
    );
  };

  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light");

      const isLight = body.classList.contains("light");

      localStorage.setItem(
        "tanveer-theme",
        isLight ? "light" : "dark"
      );

      updateThemeIcon();
    });
  }

  // Current Year
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Active Navigation
  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const currentId = entry.target.id;

          navLinks.forEach((link) => {
            const href = link.getAttribute("href");

            link.classList.toggle(
              "active",
              href === `#${currentId}`
            );
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // Close Mobile Menu on Resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && navMenu && menuBtn) {
      navMenu.classList.remove("open");

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );
    }
  });
});
