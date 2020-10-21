import {triggerScramble} from "../callback/section2.js"
import {initBlackScreen} from "../callback/section2.js"

export let sectionTwoAnimation = gsap.timeline({paused: true, onStart: initBlackScreen})
            
sectionTwoAnimation.fromTo(".bar-1", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: triggerScramble})
    .fromTo(".bar-2", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: triggerScramble})
    .fromTo(".bar-3", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: triggerScramble})
    .fromTo(".bar-4", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: triggerScramble})
    .fromTo(".topic-content", {opacity: 0}, {opacity: 1, duration: 1.8}, "-=0.750")