import MenuMobile from './modules/MenuMobile.js';
import ScrollReveal from './modules/ScrollReveal.js';
import Navbar from './modules/Navbar.js';
import $ from 'jquery';
import 'select2';   

new MenuMobile();
new ScrollReveal($(".what-we-do-item"), "85%");
new ScrollReveal($(".about-us"), "65%");
new ScrollReveal($(".world-map__country-links"), "85%");
new ScrollReveal($(".text-scroll-reveal"), "85%");
new Navbar();  

$(".dropdownOptions").select2({
    placeholder: "Select a Country",
    width: 'auto'
});

$(".dropdownOptions").change(function() {
    window.location = $(".dropdownOptions").val();
});
