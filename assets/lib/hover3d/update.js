import {data} from "./data.js"

let pictureList = document.querySelectorAll(".project-item__picture")

export let update = {
    updateTransformStyle: function(x, y, elTarget) {
        let style = "rotateX(" + x + "deg) rotateY(" + y + "deg)"
        pictureList[elTarget].style.transform = style
        pictureList[elTarget].style.webkitTransform = style
        pictureList[elTarget].style.mozTransform = style
        pictureList[elTarget].style.msTransform = style
        pictureList[elTarget].style.oTransform = style
    },
    triggerTransfrom: function(event, elTarget) {
        data.updatePosition(event, elTarget)
        this.updateTransformStyle(
            (data.mouse.y / pictureList[elTarget].offsetHeight * 3).toFixed(2),
            (data.mouse.x / pictureList[elTarget].offsetWidth * 3).toFixed(2),
            elTarget
        );
    }
}