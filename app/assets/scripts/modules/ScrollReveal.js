import $ from 'jquery';
//import waypoints from '../../../node_modules/waypoints/lib/noframework.waypoints';
import 'waypoints/lib/noframework.waypoints.min.js';

class ScrollReveal {
    constructor(elements, offset) {
        this.itemsReveal = elements;
        this.offsetPerc = offset;
        this.initialHide();
        this.newWaypoints();
    }
    initialHide() {
        this.itemsReveal.addClass("item-reveal");
    }

    newWaypoints() {
        let offset = this.offsetPerc;
        this.itemsReveal.each(function() {
            let currItem = this;
            new Waypoint({
                element: currItem,
                handler: function() {
                    $(currItem).addClass("item-reveal--visible");
                },
                offset: offset
            });
        });
    }

}

export default ScrollReveal;