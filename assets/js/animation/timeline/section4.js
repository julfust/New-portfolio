import {setEffects} from "../callback/section4.js"

export let sectionFourAnimation = gsap.timeline({paused: true, onComplete: setEffects})
                
sectionFourAnimation.fromTo(".heading-title__overground", {x: -930}, {x: 930, duration: 1.5})
    .fromTo(".heading-title__content", {opacity: 0}, {opacity: 1, duration: 0.4}, "-=0.5")
    .fromTo(".project-item__picture", {x: -600}, {x: 0, duration: 1})
    .fromTo(".project-item__picture", {scale: 0.75}, {scale: 1, ease: Bounce.easeOut,duration: 1})
    .fromTo(".project-item__title", {opacity: 0}, {opacity: 1, duration: 1})