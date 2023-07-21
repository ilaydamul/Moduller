//HEADER STICKY
window.onscroll = function () {
  myFunction();
};
var header = document.getElementById("header");
var sticky = header.offsetTop;
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

//HEADER BURGER
$(".header-burger").click(function () {
  toggleMobileMenu();
});

$(".mobile-header").click(function (e) {
  if ($(e.target).hasClass("mobile-header")) {
    toggleMobileMenu();
  }
});

function toggleMobileMenu() {
  $(".header-burger").toggleClass("active");
  $(".header-burger-main").toggleClass("opacityBurger");
  $(".mobile-header").slideToggle(200);
}

// LANGUAGE OPEN
$(".lang-dp").click(function () {
  $(this)
    .siblings(".lang-dp-menu")
    .slideToggle("", function () {
      if ($(this).is(":visible")) $(this).css("display", "flex");
    });
});



function openFaq() {
  // SSS
  $(".faq-item").click(function () {
    $(this).toggleClass("faq-active").siblings().removeClass("faq-active");
    $(this)
      .children(".faq-answer")
      .slideToggle(200)
      .parent()
      .siblings()
      .children(".faq-answer")
      .slideUp(200);
  });
}

openFaq();

// ÖZELLİKLERİN DEĞİŞMESİ
$(".features-dev>div").click(function () {
  $(this).addClass("active-feature").siblings().removeClass("active-feature");
});

$(".features-dev>div:first-child").addClass("active-feature");

$(document).ready(function () {
  new WOW().init();
  // SporKütüphanesi ve Dijital Çözümler Header/Footer silme.
  $(".sk-header, .sk-footer, .sd-header, .sd-footer").remove();
});

// FOOTER LANGUAGE
$(".active-lang").click(function () {
  $(".lang-options").slideToggle();
  $(this).children("i").toggleClass("turn-90");
});

// SİTE AÇILINCA MENU İTEMLERİNİ MOBİLE MENU YAPMA
$(".mobile-links").html($(".header-links").html());

// OPEN DROPDOWN
$(window).on("resize", checkPosition);
checkPosition();

function checkPosition() {
  if (window.matchMedia("(max-width: 992px)").matches) {
    $(".dropdown").click(function () {
      $(this)
        .children(".dropdown-links")
        .slideToggle(200)
        .parent()
        .siblings()
        .children(".dropdown-links")
        .slideUp(200);
    });
  } else {
  }
}


