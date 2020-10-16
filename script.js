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

    let el = document.querySelector(titleTarget)

    let word = el.innerHTML

    function resolve() {
        targetClassList.remove(targetClassList[1])
        targetClassList.add("glitch")
    }

    scramble(el, word, 40).then(resolve)
}

function myTimeLine() {

    let tl = gsap.timeline()

    tl.fromTo(".bar-1", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: onTweenStart})
        .fromTo(".bar-2", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: onTweenStart})
        .fromTo(".bar-3", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: onTweenStart})
        .fromTo(".bar-4", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: onTweenStart})
        .fromTo(".topic", {opacity: 0}, {opacity: 1, duration: 1.8}, "-=0.750")
}

// Effet black screen
let selector = document.querySelectorAll(".screen-content__text")

for(let i = 0; i < selector.length; i++)
{
    selector[i].setAttribute("data-content", selector[i].innerHTML)
}

// Effet perspective
// Init
let containerList = document.querySelectorAll(".project-item")
let inner = document.querySelectorAll(".inner")

// Mouse
let mouse = {
    // Position de l'élément
    _x: 0,
    _y: 0,

    // Position de la souris
    x: 0,
    y: 0,

    // Tableau des coordonnées des différents éléments (1 element = 1 objet)
    coordonateTab: [
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    ],
    updatePosition: function(event, target) {
    // Position de la souris par rapport au centre de l'élément
    let e = event || window.event
    this.x = e.clientX - this.coordonateTab[target].x
    this.y = (e.clientY - this.coordonateTab[target].y) * -1
    },
    setOrigin: function(el, counter) {
    // Position du centre de l'élément
    this.coordonateTab[counter].x = el.offsetLeft + Math.floor(el.offsetWidth / 2)
    this.coordonateTab[counter].y = el.offsetTop + Math.floor(el.offsetHeight / 2)
    },
    show: function() {
    return "(" + this.x + ", " + this.y + ")"
    }
};

// On définit les coordonnées du centre de notre éléments

for(let i = 0; i < containerList.length; i++){
    mouse.setOrigin(containerList[i], i)
}

//-----------------------------------------

let counter = 0
let updateRate = 10
function isTimeToUpdate() {
    return counter++ % updateRate === 0
};

//-----------------------------------------
let target = null

function onMouseEnterHandler(event) {
    target = parseInt(event.target.classList[1])
    update(event, target)
};

function onMouseLeaveHandler() {
    inner[target].style = ""
    target = null
};

function onMouseMoveHandler(event) {
    if (isTimeToUpdate()) {
    update(event, target)
    }
};

//-----------------------------------------

function update(event, target) {
    mouse.updatePosition(event, target)
    updateTransformStyle(
    (mouse.y / inner[target].offsetHeight * 3).toFixed(2),
    (mouse.x / inner[target].offsetWidth * 3).toFixed(2),
    target
    );
};

function updateTransformStyle(x, y, target) {
    let style = "rotateX(" + x + "deg) rotateY(" + y + "deg)"
    inner[target].style.transform = style
    inner[target].style.webkitTransform = style
    inner[target].style.mozTransform = style
    inner[target].style.msTransform = style
    inner[target].style.oTransform = style
};

//-----------------------------------------

for(let i = 0; i < containerList.length; i++){
    containerList[i].addEventListener("mouseenter", onMouseEnterHandler)
    containerList[i].addEventListener("mouseleave", onMouseLeaveHandler)
    containerList[i].addEventListener("mousemove", onMouseMoveHandler)
}

// Gestion du redimensionnement
window.addEventListener("resize", () => {
    for(let i = 0; i < containerList.length; i++){
    mouse.setOrigin(containerList[i], i)
    }
})