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

// BLOG SLICK SLIDER
$(".blog-categories").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 2,
    prevArrow: '<i class="fa fa-chevron-left icon-left-big"></i>',
    nextArrow: '<i class="fa fa-chevron-right icon-right-big"></i>',
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
        },
    },
        {
            breakpoint: 578,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                arrows: false
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false
            },
        }],
});



//BLOG CATEGORY ICONS
$(".openCat").click(function () {
    $(this).siblings(".categories-group").slideToggle();
    // $(".categories-group").slideToggle();
    $(this).children(".show-categories").toggleClass("turn-180");
});

//BLOG DETAY İÇERİK AÇ KAPA

$(document).ready(function() {
    $(".blog-ingredients a").click(function () {


        // history.replaceState("", document.title, window.location.pathname + window.location.search);


        $(this)
        .addClass("active-ingredient")
        .siblings()
        .removeClass("active-ingredient");
    });
})

//HEADER STICKY
window.onscroll = function () {
    myFunction();
};
var header = document.getElementById("header");
var sticky = header.offsetTop;
function myFunction() {
    if (window.pageYOffset > sticky) {
        if (window.innerWidth > 992) {
            header.classList.add("sticky");
        }
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
    $(".mobile-header").toggle("slide",
        {
            direction: "left"
        },
        500);
}

$(document).ready(function() {

    // $(".checkboxContainer label").click(function() {
    //     $(".checkboxContainer").toggleClass("checkedInput")
    // })

    $(".openKVKK").click(function() {
        $(".kvkkModal").addClass("activeModal");
        $("body").css("overflow", "hidden")

    })
    $(".openTicari").click(function() {
        $(".ticariModal").addClass("activeModal");
        $("body").css("overflow", "hidden")
    })

    $(".closeModal").click(function () {
        $(".modall").removeClass("activeModal")
        $("body").css("overflow", "auto");
    });

    $(".modall").click(function(e) {
        if ($(e.target).hasClass("activeModal")) {
            $(e.target).removeClass("activeModal")
            $("body").css("overflow", "auto");
        }
    })

    // $(".form").on("submit",function(){

    //     var checbox=$(this).find(".checkboxContainer");
    //     $(checbox).toggleClass("checkedInput");

    // })

    $(".checkboxContainer input").on("change",
        function() {
            $(".checkboxContainer").toggleClass("checkedInput")
        })


    $(".banner-category").click(function() {
        goBlogs();
        var clickedBlog = $(this).attr("href").split("=")[1];
        thisCategory = clickedBlog;
        displayCards(thisCategory);
        setupPagination(thisCategory);
    })


    // LİNKTEN GELEN BLOG KATEGORİSİ SEÇME
    function goBlogs() {
        setTimeout(function() {
            var windowHref = window.location.hash;
            var windowHrefZero;
            if (windowHref) {
                windowHrefZero = windowHref.split("=")[0];
                if (windowHrefZero == "#blogs?blog") {
                    windowHref = windowHref.split("=")[1].toLowerCase();
                    blogCat(windowHref);
                    $("#blogs")[0].scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        },
            10);
    }
    goBlogs();
})

// ARAMA
function search() {
    var params = new URLSearchParams(location.search),
    searchVal,
    searchResult = $(".search-results");

    if (params.has("query")) {
        searchVal = params.get('query');
        $("#query").val(searchVal);
        $.ajax({
            method: "GET", url: "/tr-TR/search?query="+searchVal+""
        }).done(function(data) {
            $(".search-loading").hide();
            if (data.length > 0) {
                data.forEach(function(el, i) {
                    searchResult.append(`<a href=${el.link}> ${el.name} </a> `)
                })
            } else {
                searchResult.html("<span class='error'>Aradığınız kritere uygun kayıt bulunamamıştır.</span>");
            }
        }) .fail(function() {})
    }
}

search();