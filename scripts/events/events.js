/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
import {
    getItem,
    setItem
} from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import {
    openPopup,
    closePopup
} from '../common/popup.js';
import {
    openModal
} from '../common/modal.js';
import {
    validateNewEvent,
    validateDeleteEvent
} from '../common/validation.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');
const editEventFormElem = document.querySelector('.edit-event-form');
const createEventForm = document.querySelector('.event-form');

export const fillEditForm = (id) => {
    if (id) {
        setItem('eventIdToEdit', id)
        const currentEvent = getItem('events').filter(event => event.id.toString() === id.toString())[0];
        editEventFormElem.querySelector('input[name="title"]').value = currentEvent.title;
        editEventFormElem.querySelector('textarea[name="description"]').value = currentEvent.description;
        editEventFormElem.querySelector('input[name="date"]').valueAsDate = shmoment(currentEvent.start).add('hours', 2).result();
        editEventFormElem.querySelector('input[name="startTime"]').value = currentEvent.start.toLocaleTimeString();
        editEventFormElem.querySelector('input[name="endTime"]').value = currentEvent.end.toLocaleTimeString();
    }
}

function handleEventClick(event) {
    const node = event.target;
    if (getItem('events').length) {
        fillEditForm(node.dataset.eventId);
        if (node.classList.contains('event')) {
            openPopup(event.clientX, event.clientY)
        }
    } else {
        const currentDay = shmoment(getItem('displayedWeekStart')).add('days', parseInt(node.parentNode.dataset.day - 1, 10)).result();
        const date = shmoment(currentDay).add('hours', parseInt(node.dataset.time, 10)).result();
        fillCreateForm(date);
        openModal();
    }

}

export const fillCreateForm = (date = new Date()) => {
    createEventForm.querySelector('input[name="title"]').value = '';
    createEventForm.querySelector('input[name="date"]').valueAsDate = shmoment(date).add('hours', 2).result();
    createEventForm.querySelector('input[name="startTime"]').value = date.toLocaleTimeString();
    createEventForm.querySelector('input[name="endTime"]').value = shmoment(date).add('minutes', 15).result().toLocaleTimeString();
    createEventForm.querySelector('textarea[name="description"]').value = '';
}



const editEventSubmit = event => {
    event.preventDefault();
    const formData = new FormData(editEventFormElem);
    const id = getItem('eventIdToEdit');
    const newEvent = {
        title: formData.get('title'),
        description: formData.get('description'),
        start: new Date(Date.parse(formData.get('date') + ' ' + formData.get('startTime'))),
        end: new Date(Date.parse(formData.get('date') + ' ' + formData.get('endTime')))
    }
    if (validateNewEvent(newEvent)) {
        const editedEvents = getItem('events').map(item => {
            if (item.id.toString() === id.toString()) {
                return {
                    id,
                    ...newEvent
                }
            }
            return event
        })
        setItem('events', editedEvents);
        editEventFormElem.reset();
        renderEvents();
        closePopup();
    }
}


const createEventElement = event => {
    const start = event.start.getHours();
    const end = event.end.getHours();
    const eventElem = document.createElement('div');
    eventElem.innerHTML = `<div class="event__title"><div>${event.title}</div><div>${event.description}</div>${start}-${end}</div>`;
    eventElem.classList.add('event');
    eventElem.setAttribute('data-event-id', event.id);
    setItem('eventIdToDelete', event.id);
    return eventElem
};



function removeEventsFromCalendar() {
    setItem('events', []);
}



export const renderEvents = () => {
    const oldEvent = document.querySelector('.event');
    if (oldEvent) {
        oldEvent.remove();
    }
    const weekStart = getItem('displayedWeekStart');
    const currentWeekEvents = getItem('events').filter(item => item.start >= weekStart);
    let day;
    let time = null;
    currentWeekEvents.forEach(event => {
        day = event.start.getDay();
        time = event.start.getHours();
        const slotElem = document.querySelector(`.calendar__day[data-day="${day}"] .calendar__time-slot[data-time="${time}"]`);
        slotElem.appendChild(createEventElement(event));
    })
};

function onDeleteEvent() {
    const eventIdToDelete = getItem('eventIdToDelete');
    if (validateDeleteEvent(eventIdToDelete)) {
        const events = getItem('events');
        setItem('events', events.filter(event => event.id !== eventIdToDelete));
        closePopup();
        renderEvents();
    }

}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);

editEventFormElem.addEventListener('submit', editEventSubmit);