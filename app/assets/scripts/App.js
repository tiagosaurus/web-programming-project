import MenuMobile from './modules/MenuMobile.js';
import ScrollReveal from './modules/ScrollReveal.js';
import Navbar from './modules/Navbar.js';
import $ from 'jquery';

new MenuMobile();
new ScrollReveal($(".what-we-do-item"), "85%");
new ScrollReveal($(".about-us"), "65%");
new ScrollReveal($(".world-map__country-links"), "85%");
new ScrollReveal($(".text-scroll-reveal"), "85%");
new Navbar();       