import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { lenis } from "./lenis.js";

export function initLogoRevealloader() {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("c-loader", "0.65, 0.01, 0.05, 0.99");

    const wrap = document.querySelector("[data-load-wrap]");
    if (!wrap) return;

    const container = wrap.querySelector("[data-load-container]");
    const bg = wrap.querySelector("[data-load-bg]");
    const progressBar = wrap.querySelector("[data-load-progress]");
    const logo = wrap.querySelector("[data-load-logo]");

    // Get all elements with data-fadein attribute and sort by value
    const fadeInElements = document.querySelectorAll('[data-fadein]');
    const sortedFadeInElements = Array.from(fadeInElements).sort((a, b) => {
        return parseInt(a.dataset.fadein) - parseInt(b.dataset.fadein);
    });

    gsap.set(sortedFadeInElements, {
        opacity: 0,
        y: -20,
    });

    // Disable scroll during loading
    if (lenis) lenis.stop();

    const loadTimeline = gsap.timeline({
        defaults: {
            ease: "c-loader",
            duration: 4
        }
    })
    .set(wrap, { display: "block" })
    .to(progressBar, { scaleX: 1 })
    .to(logo, { clipPath: "inset(0% 0% 0% 0%)" }, "<")
    .call(() => { if (lenis) lenis.start(); })
    .to(container, { autoAlpha: 0, duration: 0.5 })
    .to(progressBar, { scaleX: 0, transformOrigin: "right center", duration: 0.5 }, "<")
    .add("hideContent", "<")
    .to(bg, { opacity: 0, duration: 1 }, "hideContent")
    .set(wrap, { display: "none" })
    .call(animateFadeInElements, [sortedFadeInElements], "hideContent+=0.3");
}

function animateFadeInElements(elements) {
    if (elements.length === 0) return;
    const fadeInTimeline = gsap.timeline();
    elements.forEach((element, index) => {
        fadeInTimeline.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "cubic-bezier(0.625, 0.05, 0, 1)",
        }, index * 0.2);
    });
}
