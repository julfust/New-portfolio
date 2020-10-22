export let data = {
    // Position de la souris
    mouse : {
        x: 0,
        y: 0,
    },

    // Tableau des coordonnées des différents éléments (1 element = 1 objet)
    el: [
        {
            x: 0,
            y: 0
        },
        {
            x: 0,
            y: 0
        },
        {
            x: 0,
            y: 0
        },
        {
            x: 0,
            y: 0
        },
    ],
    updatePosition: function(event, target) {
        // Position de la souris par rapport au centre de l'élément
        let e = event || window.event
        this.mouse.x = e.clientX - this.el[target].x
        this.mouse.y = (e.clientY - this.el[target].y) * -1
    },
    setOrigin: function(el, counter) {
        // Position du centre de l'élément
        this.el[counter].x = el.offsetLeft + Math.floor(el.offsetWidth / 2)
        this.el[counter].y = el.offsetTop + Math.floor(el.offsetHeight / 2)
    },
    show: function() {
        return "(" + this.mouse.x + ", " + this.mouse.y + ")"
    }
};