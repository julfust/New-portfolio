import {sectionTwoAnimation} from "./animation/timeline/section2.js"
import {sectionFourAnimation} from "./animation/timeline/section4.js"

let page = {
    section1: {
        animation: {
            alreadyPlayed: false
        }
    },
    section2: {
        animation: {
            alreadyPlayed: false
        }
    },
    section3: {
        slide1: {
            animation: {
                alreadyPlayed: false
            }
        },
        slide2: {
            animation: {
                alreadyPlayed: false
            }
        }
    },
    section4: {
        animation: {
            alreadyPlayed: false
        }
    },
    section5: {
        animation: {
            alreadyPlayed: false
        }
    },
}

// full page
new fullpage('#fullpage', {
    anchors: ['Home', 'Profil', 'Experience', 'Project', 'lastPage'],
    sectionsColor: ['yellow', 'orange', '#C0C0C0', '#ADD8E6'],
    menu: '#myMenu',
    navigation: true,
    navigationTooltips: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
    showActiveTooltip: true,
    slidesNavigation: true,
    animateAnchor: false,

    afterLoad: function(origin, destination, direction) {
        if(destination.anchor ==  "Home") {
            if(!page.section1.animation.alreadyPlayed)
            {
                let typedAnimation = {
                    ref: null,

                    play: function(){
                        this.ref = new Typed(".article__content--main", {
                            stringsElement: ".article__typed-string",
                            typeSpeed: 40,
                            backDelay: 700,
                        })
                    }
                }

                typedAnimation.play()
                page.section1.animation.alreadyPlayed = true
            }
        }

        if(destination.anchor == "Profil")
        {
            if(!page.section2.animation.alreadyPlayed)
            {
                sectionTwoAnimation.play()

                page.section2.animation.alreadyPlayed = true
            }
        }

        if(destination.anchor == "Experience")
        {
            if(!page.section3.slide1.animation.alreadyPlayed)
            {
                let typedAnimation = {
                    ref: null,

                    play: function(){
                        this.ref = new Typed(".title-slide1", {
                            stringsElement: ".typed-slide1",
                            typeSpeed: 40,
                        })
                    }
                }

                typedAnimation.play()
                page.section3.slide1.animation.alreadyPlayed = true
            }
        }
        
        if(destination.anchor == "Project"){
            {
                if(!page.section4.animation.alreadyPlayed)
                {
                    sectionFourAnimation.play()

                    page.section4.animation.alreadyPlayed = true
                }
            }
        }
    },

    afterSlideLoad: function(section, origin, destination, direction) {
        if(section.anchor == "Experience" && destination.anchor == "slide1"){
            if(!page.section3.slide1.animation.alreadyPlayed){
                let typedAnimation = {
                    ref: null,

                    play: function(){
                        this.ref = new Typed(".title-slide1", {
                            stringsElement: ".typed-slide1",
                            typeSpeed: 40,
                        })
                    }
                }

                typedAnimation.play()
                page.section3.slide1.animation.alreadyPlayed = true
            }
        }

        if(section.anchor == "Experience" && destination.anchor == "slide2"){
            if(!page.section3.slide2.animation.alreadyPlayed){
                let typedAnimation = {
                    ref: null,
    
                    play: function(){
                        this.ref = new Typed(".title-slide2", {
                            stringsElement: ".typed-slide2",
                            typeSpeed: 40,
                        })
                    }
                }
    
                typedAnimation.play()
                page.section3.slide2.animation.alreadyPlayed = true
            }
        }
    }
});