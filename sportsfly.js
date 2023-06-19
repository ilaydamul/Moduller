//HEADER STICKY
window.onscroll = function () {
  myFunction();
};
var header = document.getElementById("header");
var sticky = header.offsetTop;
function myFunction() {
  // console.log(window.pageYOffset);
  // console.log(sticky);
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    // if (window.innerWidth > 992) {
    //     header.classList.add("sticky");
    // }
  } else {
    header.classList.remove("sticky");
  }
}

//HEADER BURGER

$(".header-burger").click(function () {
  a();
});

$(".mobile-header").click(function (e) {
  if ($(e.target).hasClass("mobile-header")) {
    a();
  }
});

function a() {
  $(".header-burger").toggleClass("active");
  $(".header-burger-main").toggleClass("opacityBurger");
  $(".mobile-header").toggle(
    "slide",
    {
      direction: "left",
    },
    500
  );
}

//   LANGUAGE OPEN
$(".lang-dp").click(function () {
  // $(this).siblings(".lang-dp-menu").slideToggle();
  $(this)
    .siblings(".lang-dp-menu")
    .slideToggle("", function () {
      if ($(this).is(":visible")) $(this).css("display", "flex");
    });
});

// ÇÖZÜMLER
$(".solution-cats").slick({
  dots: false,
  arrows: false,
  infinite: true,
  speed: 300,
  slidesToShow: 7,
  slidesToScroll: 1,
  focusOnSelect: true,
  asNavFor: ".solution-items",
  responsive: [
    {
      breakpoint: 998,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
});

$(".solution-items").slick({
  dots: false,
  arrows: false,
  infinite: true,
  speed: 300,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  asNavFor: ".solution-cats",
  responsive: [
    {
      breakpoint: 1024,
      settings: {},
    },
  ],
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

// ÖZELLİKLER DEĞİŞİM
$(".features-dev>div").click(function () {
  $(this).addClass("active-feature").siblings().removeClass("active-feature");
});



$(".features-dev>div:first-child").addClass("active-feature");

$(document).ready(function () {
  new WOW().init();
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
