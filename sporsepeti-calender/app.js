// DOM Elements
const dateList = document.querySelector(".dates");
const calendarList = document.querySelector(".calendar-cards");
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

var educationCalendar = [
  {
    month: 3,
    day: 21,
    year: 2023,
    time: "10:23",
    description: "selam bu bir deneme",
  },
  {
    month: 5,
    day: 21,
    year: 2023,
    time: "10:23",
    description: "selam bu bir deneme",
  },
  {
    month: 6,
    day: 2,
    year: 2023,
    time: "10:23",
    description: "selam bu bir deneme",
  },
  {
    month: 12,
    day: 5,
    year: 2022,
    time: "10:23",
    description: "selam bu bir deneme",
  },
];

// Create calendar with the given date object
function createCalendar(date) {
  // Find the amount of days from the last, current and next month to show on the calendar
  const prev = getLastDate(date.getFullYear(), date.getMonth(), true);
  const curr = getLastDate(date.getFullYear(), date.getMonth() + 1);
  const next = TOTAL_DAYS_VISIBLE - (prev.days + curr);

  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  // Firstly, clear the date list
  dateList.innerHTML = "";
  calendarList.innerHTML = "";

  // Fill previous days on the calendar
  for (let i = prev.date - prev.days + 1; i <= prev.date; i++) {
    dateList.innerHTML += `
      <li class="date">${i}</li>
    `;
  }

  // Fill current days on the calendar

  for (let i = 1; i <= curr; i++) {
    var control = false;
    for (let a = 0; a < educationCalendar.length; a++) {
      if (
        educationCalendar[a].month == month &&
        educationCalendar[a].day == i &&
        educationCalendar[a].year == year
      ) {
        dateList.innerHTML += `
        <li class="date current active-day">${i}</li>
      `;
        calendarList.innerHTML += `
      <div class="calendar-card">
      <div class="calendar-head">
          <span class="calendar-day">${educationCalendar[a].day}</span>
          <div class="calendar-texts">
              <p>${educationCalendar[a].description}</p>
          </div>
      </div>
      <span class="calendar-clock">${educationCalendar[a].time}</span>
  </div>
    `;

        control = true;
      }
    }

    if (control == false) {
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
