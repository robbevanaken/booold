import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance = null;

export { lenisInstance as lenis };

export function getLenis() {
    return lenisInstance;
}

export async function initLenis() {
    lenisInstance = new Lenis({});
    lenisInstance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenisInstance.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
}

export function resetLenisScroll() {
    if (lenisInstance) {
        lenisInstance.stop();
        lenisInstance.scrollTo(0, { immediate: true, force: true });
        lenisInstance.start();
    }
}
