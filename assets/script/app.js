import {view} from "./view.js"
import {data} from "./data.js"

let alreadyPlay1 = false
let alreadyPlay2 = false

let app = {
    init: function() {
        let fullPage = view.init()

        fullPage.test.options.onLeave = function(origin, destination, direction) {
            
            if(destination.anchor == "Profil" && alreadyPlay1 == false && window.innerWidth > 768)
            {
                view.animateSection2()
                alreadyPlay1 = true
            }

            if(destination.anchor == "Project" && alreadyPlay2 == false && window.innerWidth > 768)
            {
                view.animateSection4()
                alreadyPlay2 = true
            }
        }

        let routerLinkList = document.querySelectorAll(".router-link")

        for(let i = 0; i < routerLinkList.length; i++)
        {
            routerLinkList[i].addEventListener("click", function() {
                let location = this.dataset.location
                data.updateContent(location).then(view.showContent, view.showError)
            })
        }

        let mainProjectList = document.querySelectorAll(".project-item")

        for(let i = 0; i < mainProjectList.length; i++)
        {
            mainProjectList[i].addEventListener("click", function(){
                view.changeLocation(this)
            })
        }

        let otherProjectList = document.querySelectorAll(".other-poject-item")

        for(let i = 0; i < otherProjectList.length; i++)
        {
            otherProjectList[i].addEventListener("click", function() {
                view.changeLocation(this)
            })
        }
    }
}

app.init()