$(document).ready(function() {
    
    $("#hamburger").click(function() {
        $(this).toggleClass("active");
        $("#navMenu").toggleClass("active");
    });
    
    $(".nav-menu a").click(function() {
        $("#hamburger").removeClass("active");
        $("#navMenu").removeClass("active");
    });
    
});