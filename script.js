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
    anchors: ['Home', 'Profil', 'Experience', 'Project', 'lastPage'],
    sectionsColor: ['yellow', 'orange', '#C0C0C0', '#ADD8E6'],
    menu: '#myMenu',
    navigation: true,
    navigationTooltips: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
    showActiveTooltip: true,
    slidesNavigation: true,
    animateAnchor: false,
	
	onLeave: function(origin, destination, direction){
        if(destination.anchor == "Profil")
        {
            if(!page.section2.animation.alreadyPlayed)
            {
                function triggerScramble() {
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
                }

                let s2Tl= gsap.timeline()
            
                s2Tl.fromTo(".bar-1", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: triggerScramble})
                    .fromTo(".bar-2", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: triggerScramble})
                    .fromTo(".bar-3", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: triggerScramble})
                    .fromTo(".bar-4", {scaleX: 0}, {scaleX: 1, ease: "power3.in", stagger:0.250, duration: 0.250, onStart: triggerScramble})
                    .fromTo(".topic-content", {opacity: 0}, {opacity: 1, duration: 1.8}, "-=0.750")

                page.section2.animation.alreadyPlayed = true
            }
        }
        
        if(destination.anchor == "Project"){
            {
                if(!page.section4.animation.alreadyPlayed)
                {
                    let wordList = ["Digital Product", "Marketing Website", "Mobile App"]

                    let index = 0;

                    let el = document.querySelector(".title5")

                    function resolve() {
                        index = (index + 1) % wordList.length
                        setTimeout(nextWord, 4000)
                    }

                    function nextWord() {
                        scramble(el, wordList[index], 25).then(resolve)
                    }

                    function addClass() {
                        let projectItemElements = document.querySelectorAll(".project-item__picture")

                        for(let i = 0; i < projectItemElements.length; i++)
                        {
                            projectItemElements[i].className += " project-item__picture--animate3d"
                        }

                        nextWord()
                    }

                    let s4tl1 = gsap.timeline({onComplete: addClass})
                
                    s4tl1.fromTo(".heading-title__overground", {x: -930}, {x: 930, duration: 1.5})
                        .fromTo(".heading-title__content", {opacity: 0}, {opacity: 1, duration: 0.4}, "-=0.5")
                        .fromTo(".project-item__picture", {x: -600}, {x: 0, duration: 1})
                        .fromTo(".project-item__picture", {scale: 0.75}, {scale: 1, ease: Bounce.easeOut,duration: 1})
                        .fromTo(".project-item__title", {opacity: 0}, {opacity: 1, duration: 1})

                    page.section4.animation.alreadyPlayed = true
                }
            }
        }
	}
});

// animation
function scramble(el, word, duration) {
    const promise = new Promise((resolve) => {

        let randomCharList = "0123456789qwertyuiopasdfghjklzxcvbnm!?></\a`~+*=@#$%".split('');

        function randomIndex() {
            return Math.floor(Math.random() * randomCharList.length)
        }
    
        function randomString(Length) {
            let scrambledString = '';
            for(let i = 0; i < Length; i++) {
                scrambledString += randomCharList[randomIndex()];
            }
            return scrambledString;
        }
    
        function generate(str) {
            let wordLength = str.length;
            
            el.innerHTML = '';
            
            let animationScramble = setInterval(function() {

                el.setAttribute('data-before', randomString(wordLength / 2));
                el.setAttribute('data-after', randomString(wordLength / 2));
                if(duration > 0) {
                    duration--;
                }
                else {
                    if(wordLength < str.length) {
                        el.innerHTML += str[str.length - wordLength - 1];
                    }
                    wordLength--;
                    if(wordLength === -1) {
                        clearInterval(animationScramble);
                        resolve()
                    }
                }
            }, 32);
        }
    
        generate(word);
    })

    return promise
}

// Effet black screen
let blackScreenElements = document.querySelectorAll(".black-screen-text")

for(let i = 0; i < blackScreenElements.length; i++)
{
    blackScreenElements[i].setAttribute("data-content", blackScreenElements[i].innerHTML)
}

// Effet perspective
// Init
let projectItemList = document.querySelectorAll(".project-item")
let pictureList = document.querySelectorAll(".project-item__picture")

// Mouse
let animate3d = {
    // Position de la souris
    mouse : {
        x: 0,
        y: 0,
    },

    // Tableau des coordonnées des différents éléments (1 element = 1 objet)
    el: [
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
        this.mouse.x = e.clientX - this.el[target].x
        this.mouse.y = (e.clientY - this.el[target].y) * -1
    },
    setOrigin: function(el, counter) {
        // Position du centre de l'élément
        this.el[counter].x = el.offsetLeft + Math.floor(el.offsetWidth / 2)
        this.el[counter].y = el.offsetTop + Math.floor(el.offsetHeight / 2)
    },
    show: function() {
        return "(" + this.mouse.x + ", " + this.mouse.y + ")"
    }
};

//-----------------------------------------

let counter = 0
let updateRate = 10
function isTimeToUpdate() {
    return counter++ % updateRate === 0
};

//-----------------------------------------
let elTarget = null

function onMouseEnterHandler(event) {
    elTarget = parseInt(event.target.classList[1])
    update(event, elTarget)
};

function onMouseLeaveHandler() {
    pictureList[elTarget].style = ""
    elTarget = null
};

function onMouseMoveHandler(event) {
    if (isTimeToUpdate()) {
        update(event, elTtarget)
    }
};

//-----------------------------------------

function update(event, elTarget) {
    animate3d.updatePosition(event, elTarget)
    updateTransformStyle(
    (animate3d.mouse.y / pictureList[elTarget].offsetHeight * 3).toFixed(2),
    (animate3d.mouse.x / pictureList[elTarget].offsetWidth * 3).toFixed(2),
    elTarget
    );
};

function updateTransformStyle(x, y, elTarget) {
    let style = "rotateX(" + x + "deg) rotateY(" + y + "deg)"
    pictureList[elTarget].style.transform = style
    pictureList[elTarget].style.webkitTransform = style
    pictureList[elTarget].style.mozTransform = style
    pictureList[elTarget].style.msTransform = style
    pictureList[elTarget].style.oTransform = style
};

//-----------------------------------------

for(let i = 0; i < projectItemList.length; i++){
    // On défini les coordonnées du centre de nos éléments et on créer le gestionnaire d'évenement
    animate3d.setOrigin(projectItemList[i], i)
    projectItemList[i].addEventListener("mouseenter", onMouseEnterHandler)
    projectItemList[i].addEventListener("mouseleave", onMouseLeaveHandler)
    projectItemList[i].addEventListener("mousemove", onMouseMoveHandler)
}

// Gestion du redimensionnement
window.addEventListener("resize", () => {
    for(let i = 0; i < projectItemList.length; i++){
        animate3d.setOrigin(projectItemList[i], i)
    }
})