$(".current-day").click(function () {
  $(".select-options").slideToggle(150);
});

$(".select-options>div").click(function () {
  $(this).addClass("current").siblings().removeClass("current");
  $(".current-range").text($(this).text());
  $(".select-options").slideUp(150);

  //TARİH DEĞİŞİNCE OLUŞACAK OLAYLAR AŞAĞIYA YAZILMALI.
  var range = $(this).attr("data-range");
});


// Kalan SMS/Kredi Kredisi Tablosu. Ekstra JS gerekecek.
var sendedSMSArray = [
  { month: "Haziran", amount: 40 },
  { month: "Eylül", amount: [20, 10] },
  { month: "Temmuz", amount: 10 },
];

var extractedAmounts = [];
//sendedSMSArray'indeki amountlardaki [20,10]'u normal arraya atma işlemi. Burada ekstra işlem yapılmalı.
//Eğer aylar birbiriyle aynı ise amountlar toplanmalı. Bunu gelecek olan JS'ye göre yazmamız gerektiğinden beklettim.
sendedSMSArray.forEach(function (a) {
  if (Array.isArray(a.amount)) {
    extractedAmounts.push(...a.amount);
  } else if (typeof a.amount === "object") {
    extractedAmounts.push(...Object.values(a.amount));
  } else {
    extractedAmounts.push(a.amount);
  }
});


var ctx = document.getElementById("chart").getContext("2d");
var ctx2 = document.getElementById("chart2").getContext("2d");

$(document).ready(function () {
  newChart(ctx);
  newChart(ctx2);
});

function newChart(chartx) {
  new Chart(chartx, {
    type: "line",
    data: {
      labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "6.06"],
      // labels: sendedSMSArray.map((a) => a.month),
      datasets: [
        {
          label: "SMS",
          data: [40, 20, 10, 10, 40, 20, 10],
          tension: 0.5,
          borderColor: "#0E70FE",
        },
      ],
    },
    options: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
  });
}


// Verilerin html'e işlenmesi.
var totalSMS = 1000;
var sendedSMS = 300;
var remainingSMS = totalSMS - sendedSMS;
var unsuccessSMS = 100;

var totalMail = 1500;
var sendedMail = 250;
var remainingMail = totalMail - sendedMail;
var unsuccessMail = 150;

$(".total-sms").text(totalSMS);
$(".sended-sms").text(sendedSMS);
$(".total-mail").text(totalMail);
$(".remaining-mail").text(remainingMail);
$(".remaining-sms").text(remainingSMS);
$(".sended-mail").text(sendedMail);
$(".unsuccess-sms").text(unsuccessSMS);
$(".unsuccess-mail").text(unsuccessMail);




// Circle'ların yüzdeliğe göre dolması.
function changeCircleColor(className, percent) {
  $(className).css(
    "background",
    "conic-gradient( #dc3545 " + percent + "%, rgb(233 233 233) 0%)"
  );
}

var percentSMS = ((totalSMS - sendedSMS) * 100) / totalSMS;
var percentMail = ((totalMail - sendedMail) * 100) / totalMail;

changeCircleColor(".circle-mail", percentMail);
changeCircleColor(".circle-sms", percentSMS);