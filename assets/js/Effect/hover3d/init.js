import {coordonate} from "./coordonate.js"

import {onMouseEnterHandler} from "./event.js"
import {onMouseLeaveHandler} from "./event.js"
import {onMouseMoveHandler} from "./event.js"

export function init3dEvent(){
    let projectItemList = document.querySelectorAll(".project-item")

    for(let i = 0; i < projectItemList.length; i++){
        // On défini les coordonnées du centre de nos éléments et on créer le gestionnaire d'évenement
        coordonate.setOrigin(projectItemList[i], i)
        projectItemList[i].addEventListener("mouseenter", onMouseEnterHandler)
        projectItemList[i].addEventListener("mouseleave", onMouseLeaveHandler)
        projectItemList[i].addEventListener("mousemove", onMouseMoveHandler)
    }
    
    // Gestion du redimensionnement
    window.addEventListener("resize", () => {
        for(let i = 0; i < projectItemList.length; i++){
            coordonate.setOrigin(projectItemList[i], i)
        }
    })
}