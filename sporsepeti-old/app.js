// DOM Elements
const dateList = document.querySelector(".dates");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const currentMonthYear = document.querySelector(".current-month-year");

// Constants & Variables
let date = new Date();
const TOTAL_DAYS_VISIBLE = 42;
const MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

   // Create calendar with the given date object
  function createCalendar(date) {
  // Find the amount of days from the last, current and next month to show on the calendar
  const prev = getLastDate(date.getFullYear(), date.getMonth(), true);
  const curr = getLastDate(date.getFullYear(), date.getMonth() + 1);
  const next = TOTAL_DAYS_VISIBLE - (prev.days + curr);

  // Firstly, clear the date list
  dateList.innerHTML = "";

  // Fill previous days on the calendar
  for (let i = prev.date - prev.days + 1; i <= prev.date; i++) {
    dateList.innerHTML += `
      <li class="date">${i}</li>
    `;
  }

  // Fill current days on the calendar
  for (let i = 1; i <= curr; i++) {
    // Check if the day is today
    if (date.getDate() === i) {
      dateList.innerHTML += `
        <li class="date current today">${i}</li>
      `;
    } else {
      dateList.innerHTML += `
        <li class="date current">${i}</li>
      `;
    }
  }

  // Fill next days on the calendar
  for (let i = 1; i <= next; i++) {
    dateList.innerHTML += `
      <li class="date">${i}</li>
    `;
  }

  // Update current month & year
  currentMonthYear.innerText = `${
    MONTHS[date.getMonth()]
  }, ${date.getFullYear()}`;
}

// Previous month
function prevMonth() {
  date = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
  createCalendar(date);
}

// Next month
function nextMonth() {
  date = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());

  createCalendar(date);
}

// Helper function - Get last date of the previous month
function getLastDate(year, month, withDay = false) {
  if (withDay) {
    return {
      date: new Date(year, month, 0).getDate(),
      days: new Date(year, month, 0).getDay(),
    };
  }

  return new Date(year, month, 0).getDate();
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => createCalendar(date));

// TABLO
var ctx = document.getElementById('chart').getContext('2d');
var chart = new Chart(ctx, {
  type:'line',
  data:{
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', '6.06'],
    datasets: [{
      label: 'Üye Olanlar',
      backgroundColor:'black',
      data: [40,5,60,24,16,32,10,2],
      tension: 0.5,
      fill: true,
      borderColor: '#0E70FE',
      backgroundColor: 'rgba(14, 112, 254, 0.5)',

    },
    {
      label: 'Yeni Başvuranlar',
      data: [40,50,20,10,5,7,15,23],
      tension: 0.5,
      fill:true,
      borderColor: '#F5CA07',
      backgroundColor: 'rgba(245, 202, 7, 0.5)'
    },
    {
      label: 'Bu Ay Üyeler',
      data: [20,5,10,40,30,45,35,10],
      tension: 0.5,
      fill:true,
      borderColor: '#E12466',
      backgroundColor: 'rgba(225, 36, 102, 0.5)'
    },
    {
      label: 'Başvurusu İptal Olanlar',
      data: [10,20,30,40,40,40,4,20],
      tension: 0.5,
      fill:true,
      borderColor: 'grey',
      backgroundColor: 'rgba(56, 54, 54, 0.5)'
    },

  
  ],
  options : {
    title : {
      display : true,
      text : 'Chart JS Pie Chart Example'
    }
  }
  }
})
