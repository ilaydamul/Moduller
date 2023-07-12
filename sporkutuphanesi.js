// ANASAYFA BANNER OK
$(".scrollPopular").click(function (event) {
  if (this.hash !== "") {
    event.preventDefault();
    var hash = this.hash;
    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top,
      },
      800,
      function () {
        window.location.hash = hash;
      }
    );
  }
});

//BLOG CATEGORY ICONS
$(".openCat").click(function () {
  $(this).siblings(".categories-group").slideToggle();
  // $(".categories-group").slideToggle();
  $(this).children(".show-categories").toggleClass("turn-180");
});

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
  openBurger();
});

$(".mobile-header").click(function (e) {
  if ($(e.target).hasClass("mobile-header")) {
    openBurger();
  }
});

function openBurger() {
  $(".header-burger").toggleClass("active");
  $(".header-burger-main").toggleClass("opacityBurger");
  $(".mobile-header").slideToggle();
}

$(document).ready(function () {
  // SportsFly ve Dijital Çözümler Header/Footer silme.
  $(".sf-header, .sf-footer, .sd-header, .sd-footer").remove();

  $(".openKVKK").click(function () {
    $(".kvkkModal").addClass("activeModal");
    $("body").css("overflow", "hidden");
  });
  $(".openTicari").click(function () {
    $(".ticariModal").addClass("activeModal");
    $("body").css("overflow", "hidden");
  });

  $(".closeModal").click(function () {
    $(".modall").removeClass("activeModal");
    $("body").css("overflow", "auto");
  });

  $(".modall").click(function (e) {
    if ($(e.target).hasClass("activeModal")) {
      $(e.target).removeClass("activeModal");
      $("body").css("overflow", "auto");
    }
  });

  // $(".form").on("submit",function(){

  //     var checbox=$(this).find(".checkboxContainer");
  //     $(checbox).toggleClass("checkedInput");

  // })

  $(".checkboxContainer input").on("change", function () {
    $(".checkboxContainer").toggleClass("checkedInput");
  });

  $(".banner-category,.branch-icon").click(function () {
    goBlogs();
    var clickedBlog = $(this).attr("href").split("=")[1];
    thisCategory = clickedBlog;
    displayCards(thisCategory);
    setupPagination(thisCategory);
  });

  // LİNKTEN GELEN BLOG KATEGORİSİ SEÇME
  function goBlogs() {
    setTimeout(function () {
      var windowHref = window.location.hash;
      var windowHrefZero;

      if (windowHref) {
        windowHrefZero = windowHref.split("=")[0];
        if (windowHrefZero == "#blogs?blog") {
          windowHref = windowHref.split("=")[1].toLowerCase();
          thisCategory = windowHref;

          blogCat(windowHref);

          var windowWidth = window.innerWidth;
          if (windowWidth > 576) {
            var branchSlideNo = $(
              ".branch-icons .branch-icon[cat='" + windowHref + "']"
            ).attr("cat-id");
            $(".blog-categories").slick("slickGoTo", branchSlideNo);
          }
          else{
            var activeImg = $(".blog-category[cat='"+windowHref+"']").find(".banner-category-img img").attr("src");
            var activeTitle = $(".blog-category[cat='"+windowHref+"']").find("p").text().trim();

            $(".open-categories").find(".banner-category-img img").attr("src", activeImg);
            $(".open-categories").find("p").text(activeTitle);
          }

          $("#blogs")[0].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          displayCards(thisCategory);
          setupPagination(thisCategory);
        }
      }
    }, 10);
  }
  goBlogs();
});

// SİTE AÇILINCA MENU İTEMLERİNİ MOBİLE MENU YAPMA
$(".mobile-links").html($(".header-links").html());

// ARAMA
function search() {
  var params = new URLSearchParams(location.search),
    searchVal,
    searchResult = $(".search-results");

  if (params.has("query")) {
    searchVal = params.get("query");
    $("#query").val(searchVal);
    $.ajax({
      method: "GET",
      url: "/tr-TR/search?query=" + searchVal + "",
    })
      .done(function (data) {
        $(".search-loading").hide();
        if (data.length > 0) {
          data.forEach(function (el, i) {
            searchResult.append(`<a href=${el.link}> ${el.name} </a> `);
          });
        } else {
          searchResult.html(
            "<span class='error'>Aradığınız kritere uygun kayıt bulunamamıştır.</span>"
          );
        }
      })
      .fail(function () {});
  }
}

search();


