import {coordonate} from "./coordonate.js"

let pictureList = document.querySelectorAll(".project-item__picture")

function updateTransformStyle(x, y, elTarget) {
    let style = "rotateX(" + x + "deg) rotateY(" + y + "deg)"
    pictureList[elTarget].style.transform = style
    pictureList[elTarget].style.webkitTransform = style
    pictureList[elTarget].style.mozTransform = style
    pictureList[elTarget].style.msTransform = style
    pictureList[elTarget].style.oTransform = style
};

export function update(event, elTarget) {
    coordonate.updatePosition(event, elTarget)
    updateTransformStyle(
        (coordonate.mouse.y / pictureList[elTarget].offsetHeight * 3).toFixed(2),
        (coordonate.mouse.x / pictureList[elTarget].offsetWidth * 3).toFixed(2),
        elTarget
    );
};