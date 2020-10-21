import {scramble} from "../../Effect/scramble/scramble.js"

export function triggerScramble() {
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

export function initBlackScreen() {
    let blackScreenElements = document.querySelectorAll(".black-screen-text")

    for(let i = 0; i < blackScreenElements.length; i++)
    {
        blackScreenElements[i].setAttribute("data-content", blackScreenElements[i].innerHTML)
    }
}