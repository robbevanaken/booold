import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initHighlightText() {
    if (typeof document === 'undefined') return;
    
    let splitHeadingTargets = document.querySelectorAll("[data-highlight-text]");
    splitHeadingTargets.forEach((heading) => {
        
        const scrollStart = heading.getAttribute("data-highlight-scroll-start") || "top 80%";
        const scrollEnd = heading.getAttribute("data-highlight-scroll-end") || "center 30%";
        const fadedValue = heading.getAttribute("data-highlight-fade") || 0.2; // Opacity of letter
        const staggerValue = heading.getAttribute("data-highlight-stagger") || 1; // Smoother reveal
        
        new SplitText(heading, {
        type: "words, chars",
        autoSplit: true,
        onSplit(self) {
            let ctx = gsap.context(() => {
            let tl = gsap.timeline({
                scrollTrigger: {
                scrub: true,
                trigger: heading, 
                start: scrollStart,
                end: scrollEnd,
                }
            })
            tl.from(self.chars,{
                autoAlpha: fadedValue,
                stagger: staggerValue,
                ease: "linear"
            })
            });
            return ctx; 
        }
        });    
    });
}