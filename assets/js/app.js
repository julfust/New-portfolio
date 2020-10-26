import {view} from "./view.js"
import {modele} from "./modele.js"

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

export let app  = {
    fullPageNav: {
        init: function() {

            let fullPage = view.fullPage.init()

            let activeSection = document.location.href
            
            if(activeSection === "http://127.0.0.1:5501/" || activeSection === "http://127.0.0.1:5501/#Home") {
                view.animation.section1.play()
            }

            else {
                view.animation.section1.cancel()
            }
    
            fullPage.test.options.onLeave = function(origin, destination, direction) {
            
                if(destination.anchor == "Profil")
                {
                    if(!page.section2.animation.alreadyPlayed)
                    {
                        view.animation.section2.play()
        
                        page.section2.animation.alreadyPlayed = true
                    }
                }

                if(destination.anchor == "Experience")
                {
                    if(!page.section3.slide1.animation.alreadyPlayed)
                    {
                        view.animation.section3.slide1.play()
        
                        page.section3.slide1.animation.alreadyPlayed = true
                    }
                }
                
                if(destination.anchor == "Project"){
                    {
                        if(!page.section4.animation.alreadyPlayed)
                        {
                            view.animation.section4.play()
        
                            page.section4.animation.alreadyPlayed = true
                        }
                    }
                }
            }

            fullPage.test.options.onSlideLeave = function(section, origin, destination, direction) {
                if(destination.anchor === "final-project")
                {
                    if(!page.section3.slide2.animation.alreadyPlayed)
                    {
                        view.animation.section3.slide2.play()

                        page.section3.slide2.animation.alreadyPlayed = true
                    }
                }
            }
        }
    },
    blackScreenNav: {
        init: function() {
            let titles = document.querySelectorAll('.background__router-link')

            for (let i = 0; i < titles.length; i++) {

                titles[i].addEventListener('click', function() {
                   modele.updateContent(this.dataset.fileLink).then(view.blackScreen.showContent, view.blackScreen.showError)
                })

            }
        }
    }
}

app.fullPageNav.init()
app.blackScreenNav.init()