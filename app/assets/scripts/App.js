import MenuMobile from './modules/MenuMobile.js';
import ScrollReveal from './modules/ScrollReveal.js';
import $ from 'jquery';

new MenuMobile();
new ScrollReveal($(".what-we-do-item"), "85%");
new ScrollReveal($(".about-us"), "65%");
new ScrollReveal($(".world-map__country-links"), "85%");