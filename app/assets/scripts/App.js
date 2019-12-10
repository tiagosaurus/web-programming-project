import MenuMobile from './modules/MenuMobile.js';
import ScrollReveal from './modules/ScrollReveal.js';
import Navbar from './modules/Navbar.js';
import $ from 'jquery';
import 'select2';   
import Modal from './modules/Modal.js'

new MenuMobile();
new ScrollReveal($(".what-we-do-item"), "85%");
new ScrollReveal($(".about-us"), "65%");
new ScrollReveal($(".world-map__country-links"), "85%");
new ScrollReveal($(".text-scroll-reveal"), "85%");
new ScrollReveal($(".basic-info-items"), "85%");
new ScrollReveal($(".trending"), "85%");
new ScrollReveal($(".weather-items"), "85%");
new ScrollReveal($(".travel-advisories"), "85%");


new Navbar();  
let modal = new Modal();

$(".dropdownOptions").select2({
    placeholder: "Select a Country",
    width: 'auto'
});

$(".dropdownOptions").change(function() {
    window.location = $(".dropdownOptions").val();
});
