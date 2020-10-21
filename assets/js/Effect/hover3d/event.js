import {update} from "./update.js"

let pictureList = document.querySelectorAll(".project-item__picture")
let counter = 0
let updateRate = 10
let elTarget = null

function isTimeToUpdate() {
    return counter++ % updateRate === 0
};

export function onMouseEnterHandler(event) {
    elTarget = parseInt(event.target.classList[1])
    update(event, elTarget)
};

export function onMouseLeaveHandler() {
    if(elTarget != null)
    {
        pictureList[elTarget].style = ""
        elTarget = null
    }
};

export function onMouseMoveHandler(event) {
    if (elTarget != null && isTimeToUpdate()) {
        update(event, elTarget)
    }
};