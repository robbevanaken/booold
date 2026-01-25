import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function initCheckSectionThemeScroll() {
  const themeSections = document.querySelectorAll("[data-theme-section]");

  themeSections.forEach(function(themeSection) {
    const theme = themeSection.getAttribute("data-theme-section");
    const bgTheme = themeSection.getAttribute("data-bg-section");

    ScrollTrigger.create({
      trigger: themeSection,
      start: "top top",
      end: "bottom top",
      onEnter: () => setTheme(theme, bgTheme),
      onEnterBack: () => setTheme(theme, bgTheme),
      onLeave: () => setTheme("light", null),
      onLeaveBack: () => setTheme("light", null),
    });
  });

  function setTheme(theme, bgTheme) {
    document.querySelectorAll("[data-theme-nav]").forEach(function(elem) {
      if (theme && elem.getAttribute("data-theme-nav") !== theme) {
        elem.setAttribute("data-theme-nav", theme);
      }
    });

    document.querySelectorAll("[data-bg-nav]").forEach(function(elem) {
      if (bgTheme && elem.getAttribute("data-bg-nav") !== bgTheme) {
        elem.setAttribute("data-bg-nav", bgTheme);
      }
    });
  }
}

export { initCheckSectionThemeScroll }