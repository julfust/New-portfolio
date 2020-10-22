import {scramble} from "./../lib/scramble/scramble.js"
import {hover3d} from "./../lib/hover3d/event.js"

export let animation = {
    section2: {
        callBack: {
            triggerScramble: function() {
                let targetParent = this.targets()[1]
                let targetClassList = targetParent.lastChild.classList
                let targetClass = "." + targetClassList[1]
    
                let el = document.querySelector(targetClass)
    
                let word = el.innerHTML
    
                function resolve() {
                    targetClassList.remove(targetClassList[1])
                    targetClassList.add("glitch")
                }
    
                scramble(el, word, 40).then(resolve)
            },
            initBlackScreen: function() {
                let blackScreenElements = document.querySelectorAll(".black-screen-text")

                for(let i = 0; i < blackScreenElements.length; i++)
                {
                    blackScreenElements[i].setAttribute("data-content", blackScreenElements[i].innerHTML)
                }
            }
        },

        play: function() {
            let sectionTwoAnimation = gsap.timeline({onStart: this.callBack.initBlackScreen})
            
            sectionTwoAnimation.fromTo(".bar-1", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: this.callBack.triggerScramble})
                .fromTo(".bar-2", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: this.callBack.triggerScramble})
                .fromTo(".bar-3", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: this.callBack.triggerScramble})
                .fromTo(".bar-4", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: this.callBack.triggerScramble})
                .fromTo(".topic-content", {opacity: 0}, {opacity: 1, duration: 1.8}, "-=0.750")
        }
    },
    section4: {
        callBack: {
            setEffects: function() {

                function set3dHover() {
                    let projectItemElements = document.querySelectorAll(".project-item__picture")

                    for(let i = 0; i < projectItemElements.length; i++)
                    {
                        projectItemElements[i].className += " project-item__picture--animate3d"
                    }

                    hover3d.set()
                }

                function setScramble() {
                    let wordList  = ["Digital Product", "Marketing Website", "Mobile App"]
                    let index = 0
                    let el = document.querySelector(".title5")

                    function resolve() {
                        index = (index + 1) % wordList.length
                        setTimeout(nextWord, 4000)
                    }
                    
                    function nextWord() {
                        scramble(el, wordList[index], 25).then(resolve)
                    }

                    nextWord()
                }

                set3dHover()
                setScramble()
            }
        },
        play: function() {
            console.log()
            let sectionFourAnimation = gsap.timeline({onComplete: this.callBack.setEffects})
                
            sectionFourAnimation.fromTo(".heading-title__overground", {x: -930}, {x: 930, duration: 1.5})
                .fromTo(".heading-title__content", {opacity: 0}, {opacity: 1, duration: 0.4}, "-=0.5")
                .fromTo(".project-item__picture", {x: -600}, {x: 0, duration: 1})
                .fromTo(".project-item__picture", {scale: 0.75}, {scale: 1, ease: Bounce.easeOut,duration: 1})
                .fromTo(".project-item__title", {opacity: 0}, {opacity: 1, duration: 1})
        }
    }
}