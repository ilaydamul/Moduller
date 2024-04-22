var totalImg = $(".fragmented-2 img").length - 1;
$(".fragmented-2").slick({
  dots: false,
  arrows: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
  draggable:false
});
var element = totalImg - 3;
var startEl = element + 1;
var img;

changePicture();
$(".fragmented-2").on("afterChange", function () {
  $(".fragmented-1 div").removeClass("animation1");
  changePicture();
});

$(".fragmented-2").on("beforeChange", function () {
  $(".fragmented-1 div").addClass("animation1");
});


function changePicture() {
  var sayac = 0;
  var allImg = $(".fragmented-2 img");

    for (let a = 0; a < allImg.length; a++) {
      for (let i = 0; i <= totalImg; i++) {
        if ($(allImg[a]).attr("data-slick-index") == element) {
  
          if (sayac == 0) {
            img = ".fourthGallery";
          } else if (sayac == 1) {
            img = ".thirdGallery";
          } else if (sayac == 2) {
            img = ".secondGallery";
          } else if (sayac == 3) {
            img = ".firstGallery";
          }
  
          $(img + " img:nth-child(1)").attr("src", $(allImg[a]).attr("src"));
          $(img + " img:nth-child(2)").attr(
            "src",
            $(allImg[a]).next().attr("src")
          );
          element++;
          sayac++;
        }
      }
      if (element > totalImg) {
        element = 0;
        a = 0;
      }
  
      if (sayac === 4) {
        element = startEl;
        startEl++;
        if (startEl == totalImg + 1) {
          startEl = 0;
        }
        break;
      }
    }
}
