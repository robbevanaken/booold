import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export let lenis = null;
let rafCallback = null;

export function initLenis(wrapper = null) {
    // Destroy previous instance if exists
    destroyLenis();

    const options = wrapper ? {
        wrapper: wrapper,
        content: wrapper,
    } : {};

    lenis = new Lenis(options);
    lenis.on('scroll', ScrollTrigger.update);

    rafCallback = (time) => { lenis.raf(time * 1000); };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return lenis;
}

export function destroyLenis() {
    if (lenis) {
        lenis.destroy();
        lenis = null;
    }
    if (rafCallback) {
        gsap.ticker.remove(rafCallback);
        rafCallback = null;
    }
}

export function resetLenisScroll() {
    if (lenis) {
        lenis.stop();
        lenis.scrollTo(0, { immediate: true });
        lenis.start();
    }
}
