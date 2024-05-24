let calendar;

const fetchEvents = async (type) => {
  const response = await fetch(`/api/events${type ? '?type=' + type : ''}`);
  const events = await response.json();
  return events;
}

const getTypeColor = (type) => {
  switch (type) {
    case 'meeting_with_an_expert':
      return '#FF4E6B';
    case 'question_answer':
      return '#00CC66';
    case 'conference':
      return '#FFBB33';
    case 'webinar':
      return '#4DB4FF';
  }
}

const getTypeText = (type) => {
  switch (type) {
    case 'meeting_with_an_expert':
      return 'Meeting with an expert';
    case 'question_answer':
      return 'Question answer';
    case 'conference':
      return 'Conference';
    case 'webinar':
      return 'Webinar';
  }
}

const getTypeColorClass = (type) => {
  switch (type) {
    case 'meeting_with_an_expert':
      return 'pink-secondary-bg';
    case 'question_answer':
      return 'green-secondary-bg';
    case 'conference':
      return 'yellow-secondary-bg';
    case 'webinar':
      return 'blue-secondary-bg';
  }
}

const getDateTimeFormated = (date) => {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  })
}

const getDateFormated = (date) => {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
  })
}

const editIcon = () => {
  return `
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.53999 19.0469C1.92999 19.0469 1.35999 18.8369 0.949987 18.4469C0.429987 17.9569 0.179987 17.2169 0.269986 16.4169L0.639987 13.1769C0.709987 12.5669 1.07999 11.7569 1.50999 11.3169L8.34205 4.08541C8.3534 4.07256 8.36519 4.06008 8.37741 4.04799L9.71999 2.62692C11.77 0.45692 13.91 0.39692 16.08 2.44692C18.25 4.49692 18.31 6.63692 16.26 8.80692L8.04999 17.4969C7.62999 17.9469 6.84999 18.3669 6.23999 18.4669L3.01999 19.0169C2.95895 19.0205 2.9005 19.0254 2.84324 19.0302C2.74099 19.0387 2.64254 19.0469 2.53999 19.0469ZM2.59999 12.3369L8.51838 6.0653C9.25799 8.03436 10.8657 9.55618 12.8709 10.1898L6.94999 16.4569C6.74999 16.6669 6.26999 16.9269 5.97999 16.9769L2.75999 17.5269C2.42999 17.5769 2.15999 17.5169 1.97999 17.3469C1.79999 17.1769 1.71999 16.9069 1.75999 16.5769L2.12999 13.3369C2.16999 13.0469 2.39999 12.5469 2.59999 12.3369ZM15.16 7.76692L14.055 8.93656C11.9019 8.57138 10.1855 6.93318 9.71286 4.79952L10.81 3.63692C11.49 2.91692 12.16 2.43692 12.93 2.43692C13.55 2.43692 14.24 2.75692 15.04 3.52692C16.85 5.22692 16.4 6.44692 15.16 7.76692Z" fill="#797979"/>
    </svg>
  `
}

const popoverComponent = (date) => {
  return `
  <div class="popover custom-popover" role="tooltip">
    <h3 class="popover-header"></h3>
    <div class="popover-body"></div>
    <div class="popover-footer"><button onclick="addEvent('${date}')">Add event</button></div>
  </div>
  `
}

const popoverEventComponent = (event) => {
  return `
  <div class="popover-event">
    <div class="popover-event__header">
      <h3>${event.name}</h3>
      <span>${editIcon()}</span>
    </div>
    <p class="popover-event__description">${event.description}</p>
    <p class="popover-event__location">${event.location}</p>
    <div class="popover-event__footer">
      <span class="popover-event__date">${getDateTimeFormated(event.datetime)}</span>
      <span class="popover-event__type ${getTypeColorClass(event.event_type)}">${getTypeText(event.event_type)}</span>
    </div>
  </div>
  `
}

const modalComponent = ({ date, event }) => {
  // array of time slots
  const quarterHours = ["00", "15", "30", "45"];
  let times = [];
  for(let i = 0; i < 24; i++){
    for(let j = 0; j < 4; j++){
      let time = i + ":" + quarterHours[j];
      if(i < 10){
        time = "0" + time;
      }
      times.push(time);
    }
  }

  // array of event types
  const eventTypes = ["meeting_with_an_expert", "question_answer", "conference", "webinar"];

  return `
    <div class="event-modal__header">
      <h3 class="event-modal__title">Add event</h3>
      <a href="#" class="event-modal__close-btn" onclick="closeModal()">&times;</a>
    </div>
    <form id="eventForm" onsubmit="event.preventDefault();">
      <div class="event-modal__body">
        <input required type="text" class="event-modal__input" placeholder="Title" name="name">
        <textarea required class="event-modal__input" placeholder="Description" name="description"></textarea>
        <input required type="text" class="event-modal__input" placeholder="Location" name="location">
        <label class="event-modal__date">
          <span>${getDateFormated(date)}</span>
          <select required class="event-modal__select" name="time">
            ${times.map(time => `<option value="${time}">${time}</option>`).join('')}
          </select>
        </label>
        <select required class="event-modal__select" name="event_type">
          ${eventTypes.map(type => `<option value="${type}">${getTypeText(type)}</option>`).join('')}
        </select>
      </div>
      <div class="event-modal__footer">
        <button class="event-modal__cancel-btn" onclick="closeModal()">Cancel</button>
        <button class="event-modal__submit-btn" onclick="submitEvent('${date}')">Add</button>
      </div>
    </form>
  `
}

const closePopovers = () => {
  $('.popover').each(function(){
    $(`.calendar-day-cell[aria-describedby=${this.id}]`).popover('hide');
  });
}

const closeModal = () => {
  document.body.style.overflow = 'auto';
  $('.event-modal').remove();
  $('.modal-backdrop').remove();
}

const addEvent = (date) => {
  closePopovers()

  const modal = document.createElement('div');
  const modalBackdrop = document.createElement('div');

  modalBackdrop.classList.add('modal-backdrop');
  modalBackdrop.addEventListener('click', closeModal);
  document.body.appendChild(modalBackdrop);

  modal.classList.add('event-modal');
  modal.innerHTML = modalComponent({ date });
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

const submitEvent = async (date) => {
  const form = document.getElementById('eventForm');
  const formData = new FormData(form);
  const formDataObject = Object.fromEntries(formData)

  // validate
  if (!formDataObject['name'] || !formDataObject['description'] || !formDataObject['location'] || !formDataObject['time'] || !formDataObject['event_type']) {
    return
  }

  formatedDate = new Date(new Date(date).toDateString() + ' ' + formDataObject['time'])
  formDataObject['datetime'] = formatedDate
  const parsedData = JSON.stringify(formDataObject)

  console.log(parsedData)

  await fetch('/api/events', {
    method: 'POST',
    body: parsedData
  })
  .then(response => response.json())
  .then(async data => {
    closeModal();
    calendar.removeAllEvents();
    calendar.addEventSource(await fetchEvents());
  })
}

document.addEventListener('DOMContentLoaded', async function() {
  const events = await fetchEvents();
  const calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'multiMonthYear',
    headerToolbar: {
      left: '',
      center: '',
      right: ''
    },
    dayCellClassNames: 'calendar-day-cell',
    showNonCurrentDates: true,
    dayCellDidMount: function(info) {
      const date = info.date;
      const events = calendar.getEvents().filter(event => event.start.toDateString() === date.toDateString());

      $(info.el).popover({
        html: true,
        title: 'Events',
        trigger: 'click',
        content: function() {
          return events.map(event => popoverEventComponent(event.extendedProps.raw)).join('');
        },
        template: popoverComponent(info.date)
      })
    },
    eventDataTransform(eventData) {
      return {
        title: eventData.name,
        start: eventData.datetime.split(' ')[0],
        display: 'list-item',
        backgroundColor: getTypeColor(eventData.event_type),
        raw: eventData
      };
    },
    events: events,
  });
  calendar.render();

  $('html').on('mouseup', function(e) {
    if(!$(e.target).closest('.popover').length) {
      $('.popover').each(function(){
          $(`.calendar-day-cell[aria-describedby=${this.id}]`).popover('hide');
      });
    }
  });

  const filtr = document.querySelector('.calendar-header__filtr');

  filtr.addEventListener('click', async function(e) {
    const prevTarget = filtr.querySelector('.active');
    const target = e.target;
    let newEvents = [];

    if (prevTarget) prevTarget.classList.remove('active');

    if (prevTarget === e.target) { 
      target.classList.remove('active');
      newEvents = await fetchEvents();
    } else { 
      target.classList.add('active');
      const type = target.getAttribute('id');
      newEvents = await fetchEvents(type);
    }

    calendar.removeAllEvents();
    calendar.addEventSource(newEvents);
  });
});