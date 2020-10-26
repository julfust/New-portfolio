import {scramble} from "./../lib/scramble/scramble.js"
import {hover3d} from "./../lib/hover3d/event.js"

export let view = {
    fullPage: {
        init: function() {
            let fullPage = new fullpage('#fullpage', {
                anchors: ['Home', 'Profil', 'Experience', 'Project', 'lastPage'],
                sectionsColor: ['yellow', 'orange', '#C0C0C0', '#ADD8E6'],
                menu: '#myMenu',
                navigation: true,
                navigationTooltips: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
                showActiveTooltip: true,
                slidesNavigation: true,
                animateAnchor: false,
            })
    
            return fullPage
        }
    },
    blackScreen: {
        showContent: function(content) {
            document.querySelector('.topic-screen').innerHTML = content
        },
        showError: function(errorCode, errorText) {
            alert("Une erreur est survenue ! \n\nCode :" + errorCode + "\nTexte : " + errorText)
        }
    },
    animation: {
        section1: {
            callBack: {
                typingText: function() {
                    let selector = document.querySelector(".typed-text-container")

                    selector.style.display = "block"

                    let typed3 = new Typed('.typed-text3', {
        
                        strings: ["^500Let me show you^300.^300.^300."],
                        typeSpeed: 30,
                        startDelay: 0,
                        backSpeed: 0,
                        backDelay: 700,
                        showCursor: false,
                    
                        onBegin: (self) => {
                            self.stop()
                        },
                    });
                    
                    let typed2 = new Typed('.typed-text2', {
                        
                        strings: ["^500and I'm a Front-End developpeur"],
                        typeSpeed: 30,
                        startDelay: 0,
                        backSpeed: 0,
                        backDelay: 700,
                        showCursor: false,
                    
                        onBegin: (self) => {
                            self.stop()
                        },
                    
                        onComplete: (self) => {
                            typed3.start()
                        },
                    
                    });
                    
                    let typed1 = new Typed('.typed-text1', {
                        
                        strings: ["Hi my name is Julien Fustier"],
                        typeSpeed: 30,
                        startDelay: 0,
                        backSpeed: 0,
                        backDelay: 700,
                        showCursor: false,
                    
                        onComplete: (self) => {
                            typed2.start()
                        },
                    });
                }
            },
            play: function() {
                function arrowMouvement() {
                    let tween = gsap.fromTo(".arrow1", {y: 0}, {y: 20, duration: 1, repeat: -1, yoyo: true})
                }

                let tl = gsap.timeline({onStart: this.callBack.typingText})

                tl.fromTo(".home-logo", {opacity: 0}, {opacity: 1, duration: 1})
                    .fromTo(".arrow1", {opacity: 0}, {opacity: 1, duration: 1, onStart: arrowMouvement})
            },
            cancel: function() {
                let selector = document.querySelector(".text-container")

                selector.style.display = "block"
            }
        },
        section2: {
            callBack: {
                triggerScramble: function() {
                    let targetParent = this.targets()[1]
                    let targetClassList = targetParent.lastChild.lastChild.classList
                    let targetClass = "." + targetClassList[1]
        
                    let el = document.querySelector(targetClass)
        
                    let word = el.innerHTML
        
                    function resolve() {
                        targetClassList.remove(targetClassList[1])
                        targetClassList.add("glitch")
                    }
        
                    scramble(el, word, 40).then(resolve)
                }
            },
    
            play: function() {
                let sectionTwoAnimation = gsap.timeline()
                
                sectionTwoAnimation.fromTo(".bar-1", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: this.callBack.triggerScramble})
                    .fromTo(".bar-2", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: this.callBack.triggerScramble})
                    .fromTo(".bar-3", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: this.callBack.triggerScramble})
                    .fromTo(".bar-4", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: this.callBack.triggerScramble})
                    .fromTo(".topic-screen", {opacity: 0}, {opacity: 1, duration: 1.8}, "-=0.750")
            }
        },
        section3: {
            slide1: {
                callBack: {
                    typingText: function() {
                        let typed = new Typed('.typed-text4', {
                            
                            strings: ["My professional^300 experience"],
                            typeSpeed: 30,
                            startDelay: 0,
                            backSpeed: 0,
                            backDelay: 700,
    
                            onComplete: (self) => {
                                self.cursor.remove()
                            }
                        });
                    }
                },
    
                play: function() {
                    let tween = gsap.fromTo(".entreprise-description", {opacity: 0}, {opacity: 1, duration: 1, onStart: this.callBack.typingText})
                }
            },
            slide2: {
                callBack: {
                    typingText: function() {
                        let typed = new Typed('.typed-text5', {
                            
                            strings: ["My final project"],
                            typeSpeed: 30,
                            startDelay: 0,
                            backSpeed: 0,
                            backDelay: 700,
    
                            onComplete: (self) => {
                                self.cursor.remove()
                            }
                        });
                    }
                },
    
                play: function() {
                    function arrowMouvement() {
                        let tween = gsap.fromTo(".arrow2", {x: -20}, {x: 20, duration: 1, repeat: -1, yoyo: true})
                    }

                    let tl = gsap.timeline({onStart: this.callBack.typingText})
                    tl.fromTo(".project-description", {opacity: 0}, {opacity: 1, duration: 1})
                        .fromTo(".arrow2", {opacity: 0}, {opacity: 1, duration: 1, onStart: arrowMouvement})
                        .fromTo(".description__text", {opacity: 0}, {opacity: 1, duration: 1})
                }
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
                let sectionFourAnimation = gsap.timeline({onComplete: this.callBack.setEffects})
                    
                sectionFourAnimation.fromTo(".heading-title__overground", {x: -930}, {x: 930, duration: 1.5})
                    .fromTo(".heading-title__content", {opacity: 0}, {opacity: 1, duration: 0.4}, "-=0.5")
                    .fromTo(".project-item__picture", {x: -600}, {x: 0, duration: 1})
                    .fromTo(".project-item__picture", {scale: 0.75}, {scale: 1, ease: Bounce.easeOut,duration: 1})
                    .fromTo(".project-item__title", {opacity: 0}, {opacity: 1, duration: 1})
            }
        }
    }
}