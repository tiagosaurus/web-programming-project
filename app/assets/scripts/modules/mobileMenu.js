import $ from 'jquery';

class mobileMenu {
    constructor() {
        this.siteHeader = $(".navbar");
        this.menuIcon = $(".navbar__menu-icon");
        this.menuContent = $(".navbar__menu");
        this.events();
    }
    events() {
        this.menuIcon.click(this.toggleMenu.bind(this));
    }

    toggleMenu() {
        this.menuContent.toggleClass("navbar__menu--is-visible");
        this.siteHeader.toggleClass("navbar--expanded");
        this.menuIcon.toggleClass("navbar__menu-icon--close");
    }
}

export default mobileMenu;