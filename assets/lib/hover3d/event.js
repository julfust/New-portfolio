import {data} from "./data.js"
import {update} from "./update.js"

let projectItemList = document.querySelectorAll(".project-item")
let pictureList = document.querySelectorAll(".project-item__picture")
let counter = 0
let updateRate = 10
let elTarget = null

function isTimeToUpdate() {
    return counter++ % updateRate === 0
};

export let hover3d = {

    callBack: {
        isTimeToUpdate: function() {
            return counter++ % updateRate === 0
        },
        onMouseEnterHandler: function(event) {
            elTarget = parseInt(event.target.classList[1])
            update.triggerTransfrom(event, elTarget)
        },
        onMouseLeaveHandler: function() {
            if(elTarget != null)
            {
                pictureList[elTarget].style = ""
                elTarget = null
            }
        },
        onMouseMoveHandler: function(event) {
            if (elTarget != null && isTimeToUpdate()) {
                update.triggerTransfrom(event, elTarget)
            }
        },
        onResizeWindowsHandler: function() {
            window.addEventListener("resize", () => {
                for(let i = 0; i < projectItemList.length; i++){
                    data.setOrigin(projectItemList[i], i)
                }
            })
        }
    },
    set: function() {

        for(let i = 0; i < projectItemList.length; i++){
            // On défini les coordonnées du centre de nos éléments et on créer le gestionnaire d'évenement
            data.setOrigin(projectItemList[i], i)
            projectItemList[i].addEventListener("mouseenter", this.callBack.onMouseEnterHandler)
            projectItemList[i].addEventListener("mouseleave", this.callBack.onMouseLeaveHandler)
            projectItemList[i].addEventListener("mousemove", this.callBack.onMouseMoveHandler)
        }
        this.callBack.onResizeWindowsHandler()
    }
}