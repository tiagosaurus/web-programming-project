import smoothScroll from 'jquery-smooth-scroll';
import $ from 'jquery';
import 'waypoints/lib/noframework.waypoints.min.js';


class Navbar {
    constructor() {
        this.navbar = $(".navbar");
        this.navbarTrigger = $(".world-map__title");
        this.newWaypoint();

        this.section = $(".page-section");
        this.navbarLinks = $(".navbar a");
        this.pageWaypoint();

        this.smoothScrollAdd();
    }

    newWaypoint() {
        let currNavbar = this.navbar;

        new Waypoint({
            element: this.navbarTrigger[0],
            handler: function (dir) {
                if (dir == "down") {
                    currNavbar.addClass("navbar--dark");
                }
                else {
                    currNavbar.removeClass("navbar--dark");
                }
            }
        });
    }

    pageWaypoint() {
        let allLinks = this.navbarLinks;
        this.section.each(function () {
            let currSection = this;
            new Waypoint({
                element: currSection,
                handler: function (dir) {
                    if (dir == "down") {
                        let navbarLink = currSection.getAttribute("data-link");
                        allLinks.removeClass("current-link");
                        $(navbarLink).addClass("current-link");
                    }
                },
                offset: "15%"
            });

            new Waypoint({
                element: currSection,
                handler: function (dir) {
                    if (dir == "up") {
                        let navbarLink = currSection.getAttribute("data-link");
                        allLinks.removeClass("current-link");
                        $(navbarLink).addClass("current-link");
                    }
                },
                offset: "-35%"
            });
        });
    }

    smoothScrollAdd() {
        this.navbarLinks.smoothScroll();
    }
}

export default Navbar;