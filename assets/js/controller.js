import {animation} from "./view.js"

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

export let navigation  = {
    init: function() {
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
        
                if(destination.anchor == "Profil")
                {
                    if(!page.section2.animation.alreadyPlayed)
                    {
                        animation.section2.play()
        
                        page.section2.animation.alreadyPlayed = true
                    }
                }
                
                if(destination.anchor == "Project"){
                    {
                        if(!page.section4.animation.alreadyPlayed)
                        {
                            animation.section4.play()
        
                            page.section4.animation.alreadyPlayed = true
                        }
                    }
                }
            },
        });
    }
}