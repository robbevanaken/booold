import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initParallaxImages() {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 760px)", () => {
    const caseCards = document.querySelectorAll('[data-parallax-img] img');

    caseCards.forEach((img) => {
      gsap.fromTo(
        img,
        { y: "-12%" },
        {
          y: "12%",
          ease: "linear",
          scrollTrigger: {
            trigger: img.closest('[data-parallax-img]'),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  });
}
