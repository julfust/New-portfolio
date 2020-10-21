import {scramble} from "../../Effect/scramble/scramble.js"
import {init3dEvent} from "../../Effect/hover3d/init.js"

let wordList  = ["Digital Product", "Marketing Website", "Mobile App"]
let index = 0
let el = document.querySelector(".title5")

function resolve() {
    index = (index + 1) % wordList.length
    setTimeout(nextWord, 4000)
}

function nextWord() {
    scramble(el, wordList[index], 25).then(resolve)
}

export function setEffects() {
    let projectItemElements = document.querySelectorAll(".project-item__picture")

    for(let i = 0; i < projectItemElements.length; i++)
    {
        projectItemElements[i].className += " project-item__picture--animate3d"
    }

    nextWord()
    init3dEvent()
}