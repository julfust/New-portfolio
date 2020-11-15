import {scramble} from "./../lib/scramble.js"

export let view = {
    init: function() {
        let fullPage = new fullpage('.fullpage', {
            anchors: ["Home", "Profil", "Experience", "Project", "lastPage"],
            animateAnchor: false,
            paddingTop: "11vh",
            verticalCentered: false,
            controlArrows: false,
            slidesNavigation: true,
            loopHorizontal: false,
        })

        return fullPage
    },

    animateSection2: function() {
        function removeBar() {
            let target = this.targets()[0]

            target.style.display = "none"
        }

        function triggerScramble() {
            let target = this.targets()[0]
                
            scramble(target, target.innerHTML, 40)
        }

        function animateSpotlight() {
            let target = this.targets()[0]

            target.className += " profil-section__spotlight--animated"
        }

        let sectionTwoAnimation = gsap.timeline()
        
        sectionTwoAnimation.fromTo(".overground1", {x: "-30vw"}, {x:"55vw", duration: 1.25, onComplete: removeBar})
            .fromTo(".title1", {opacity: 0}, {opacity: 1, duration: 0.5, onStart: triggerScramble}, "-=0.4")
            .fromTo(".overground2", {x: "-30vw"}, {x: "55vw", duration: 1.25, onComplete: removeBar}, "-=0.75")
            .fromTo(".title2", {opacity: 0}, {opacity: 1, duration: 0.5, onStart: triggerScramble}, "-=0.4")
            .fromTo(".overground3", {x: "-30vw"}, {x: "55vw", duration: 1.25, onComplete: removeBar}, "-=0.75")
            .fromTo(".title3", {opacity: 0}, {opacity: 1, duration: 0.5, onStart: triggerScramble}, "-=0.4")
            .fromTo(".overground4", {x: "-30vw"}, {x: "55vw", duration: 1.25, onComplete: removeBar}, "-=0.75")
            .fromTo(".title4", {opacity: 0}, {opacity: 1, duration: 0.5, onStart: triggerScramble}, "-=0.4")
            .fromTo(".black-screen", {opacity: 0}, {opacity: 1, duration: 1.8}, "-=0.750")
            .fromTo(".spotlight", {opacity: 0}, {opacity: 1, duration: 1.8, onComplete: animateSpotlight}, "-=1")
    },

    animateSection4: function() {
        let sectionFourAnimation = gsap.timeline()
                    
        sectionFourAnimation.fromTo(".overground5", {x: "-40vw"}, {x: "80vw", duration: 1.5})
            .fromTo(".paragraph1", {opacity: 0}, {opacity: 1, duration: 0.4}, "-=0.5")
            .fromTo(".project-item__picture", {x: "-34vw"}, {x: 0, duration: 1})
            .fromTo(".project-item__picture", {scale: 0.75}, {scale: 1, ease: Bounce.easeOut,duration: 1})
            .fromTo(".project-item__title", {opacity: 0}, {opacity: 1, duration: 1})
    },

    showContent: function(content) {
        document.querySelector('.black-screen').innerHTML = content
    },
    
    showError: function(errorCode, errorText) {
        alert("Une erreur est survenue ! \n\nCode :" + errorCode + "\nTexte : " + errorText)
    },

    changeLocation: function(el) {
        let location = el.dataset.location
        self.location.href = "./projet/" + location + "/index.html"
    }
}