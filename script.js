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
        animation: {
            alreadyPlayed: false
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
    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
    sectionsColor: ['yellow', 'orange', '#C0C0C0', '#ADD8E6'],
    normalScrollElements: '#element1',
    menu: '#myMenu',
    navigation: true,
    navigationTooltips: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
    showActiveTooltip: true,
    slidesNavigation: true,
    animateAnchor: false,
	
	onLeave: function(origin, destination, direction){
        if(destination.anchor == "secondPage")
        {
            if(!page.section2.animation.alreadyPlayed)
            {
                myTimeLine()
                page.section2.animation.alreadyPlayed = true
            }
        }
        
        if(destination.anchor == "fourthPage"){
            {
                if(!page.section4.animation.alreadyPlayed)
                {
                    let wordList = ["Digital Product", "Marketing Website", "Mobile App"]

                    let counter = 0;

                    let target = document.querySelector(".encrypted-title5")

                    function resolve() {
                        counter = (counter + 1) % wordList.length
                        setTimeout(next, 4000)
                    }

                    function next() {
                        scramble(target, wordList[counter], 25).then(resolve)
                    }

                    next()

                    page.section4.animation.alreadyPlayed = true
                }
            }
        }
	}
});

let section = fullpage_api.getActiveSection()
console.log(section)

let activeSlide = fullpage_api.getActiveSlide()
console.log(activeSlide)



// animation
function scramble(el, word, delay) {
    const promise = new Promise((resolve) => {

        let dictionary = "0123456789qwertyuiopasdfghjklzxcvbnm!?></\a`~+*=@#$%".split('');

        let ran = function() {
            return Math.floor(Math.random() * dictionary.length)
        }
    
        let ranString = function(amt) {
        let string = '';
        for(let i = 0; i < amt; i++) {
            string += dictionary[ran()];
        }
        return string;
        }
    
        let init = function(str) {
            let count = str.length;
            
            el.innerHTML = '';
            
            let gen = setInterval(function() {

                el.setAttribute('data-before', ranString(count / 2));
                el.setAttribute('data-after', ranString(count / 2));
                if(delay > 0) {
                delay--;
                }
                else {
                    if(count < str.length) {
                        el.innerHTML += str[str.length - count-1];
                    }
                    count--;
                    if(count === -1) {
                        clearInterval(gen);
                        resolve()
                    }
                }
            }, 32);
        }
    
        init(word);
    })

    return promise
}

function onTweenStart() {

    let currentTarget = this.targets()[1]
    let targetClassList = currentTarget.lastChild.classList
    let titleTarget = "." + targetClassList[1]
    console.log(titleTarget)

    let el = document.querySelector(titleTarget)

    let word = el.innerHTML

    scramble(el, word, 40)
}

function myTimeLine() {

    let tl = gsap.timeline()

    tl.fromTo(".bar-1", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: onTweenStart})
        .fromTo(".bar-2", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: onTweenStart})
        .fromTo(".bar-3", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: onTweenStart})
        .fromTo(".bar-4", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: onTweenStart})
        .fromTo(".topic", {opacity: 0}, {opacity: 1, duration: 1.8}, "-=0.750")
}