import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function initCheckSectionThemeScroll() {
  const themeSections = document.querySelectorAll("[data-theme-section], [data-bg-section]");

  themeSections.forEach(function(section) {
    const theme = section.getAttribute("data-theme-section");
    const bgTheme = section.getAttribute("data-bg-section");

    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => setTheme(theme, bgTheme),
      onEnterBack: () => setTheme(theme, bgTheme),
    });
  });

  function setTheme(theme, bgTheme) {
    document.querySelectorAll("[data-theme-nav]").forEach(function(elem) {
      if (theme && elem.getAttribute("data-theme-nav") !== theme) {
        elem.setAttribute("data-theme-nav", theme);
      }
    });

    document.querySelectorAll("[data-bg-nav]").forEach(function(elem) {
      const bg = bgTheme || "light";
      if (elem.getAttribute("data-bg-nav") !== bg) {
        elem.setAttribute("data-bg-nav", bg);
      }
    });
  }
}

export { initCheckSectionThemeScroll }