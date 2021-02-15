import { getItem, setItem } from '../common/storage.js';
import { renderEvents,fillEditForm } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';
import {validateNewEvent} from '../common/validation.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

function clearEventForm() {
    eventFormElem.reset();
}

function onCloseEventForm(e) {
    closeModal();
}

function onCreateEvent(e) {
    e.preventDefault();
    const formData = new FormData(eventFormElem);
    const date = formData.get('date');
    const newEvent = {
        id: Math.random(),
        title: formData.get('title'),
        description: formData.get('description'),
        start: getDateTime(date,formData.get('startTime')),
        end: getDateTime(date,formData.get('endTime'))
    }
    if(validateNewEvent(newEvent)){
        eventFormElem.reset();
        setItem('events',[...getItem('events'),newEvent]);
        closeModal();
        renderEvents();
    }
    closeModal();
}


export function initEventForm() {}

closeEventFormBtn.addEventListener('click',onCloseEventForm);
eventFormElem.addEventListener('submit',onCreateEvent)

