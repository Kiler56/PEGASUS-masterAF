let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newClassModal = document.getElementById('newClassModal');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const overlay = document.getElementById('overlay');
const eventCodeInput = document.getElementById('eventCodeInput');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventDescInput = document.getElementById('eventDescInput');
const eventDateInput = document.getElementById('eventDateInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal() {
  newClassModal.classList.add('modal-active');
  overlay.classList.add('active');
}

function openModal2() {
  newEventModal.classList.add('modal-active');
  overlay.classList.add('active');
}

function openEvent(codigo) {
  clicked = codigo
  const eventForDay = events.find(value => value.code === clicked);
  document.getElementById('eventText').innerText = eventForDay.title;
  document.getElementById('eventDesc').innerText = eventForDay.desc;
  deleteEventModal.classList.add('desc__evento-active');
  overlay.classList.add('active');
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }
      let currentevent;
      for(let j = 0; j <= events.length-1 ;j++) {
        currentevent = events[j];
        if (currentevent.date === dayString){
          const eventDiv = document.createElement('div');
          eventDiv.classList.add('event');
          eventDiv.innerText = currentevent.title;
          daySquare.appendChild(eventDiv);
          const eventCode = currentevent.code
          eventDiv.addEventListener('click', () => openEvent(eventCode));
        } 
      }


    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
}

function closeModal() {
  deleteEventModal.classList.remove('desc__evento-active');
  newEventModal.classList.remove('modal-active');
  newClassModal.classList.remove('modal-active')
  overlay.classList.remove('active');
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');
    const date = eventDateInput.value
    const datedone = dateConstruction(date);
    events.push({
      date: datedone,
      code: eventCodeInput.value,
      title: eventTitleInput.value,
      desc: eventDescInput.value
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.code !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });
  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('closeButton').addEventListener('click', closeModal);
  document.getElementById('cancelAddButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('addEvent').addEventListener('click', openModal2);
  document.getElementById('addClass').addEventListener('click', openModal);
}

function dateConstruction(date){
  let dateref;
  if (date[5]=="0" && date[8] == "0"){
    dateref = date[6] + "/" + date[9] + "/" + date.substring(0,4);
  } else if (date[5]!="0" && date[8] == "0") {
    dateref = date.substring(5,7) + "/" + date[9] + "/" + date.substring(0,4);
  } else if (date[5]=="0" && date[8] != "0"){
    dateref = date[6] + "/" + date.substring(8,) + "/" + date.substring(0,4);
  } else {
    dateref = date.substring(5,7) + "/" + date.substring(8,) + "/" + date.substring(0,4);
  }
  return dateref
}

initButtons();
load();
