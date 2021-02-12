import { getItem, setItem } from '../common/storage.js';
import { renderEvents,fillEditForm } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';
import {validateNewEvent} from '../common/validation.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

function clearEventForm() {
    eventFormElem.reset();
    // ф-ция должна очистить поля формы от значений
}

function onCloseEventForm(e) {
    // e.preventDefault();
    closeModal();
}

function onCreateEvent(e) {
    e.preventDefault();
    const formData = new FormData(eventFormElem);
    const date = formData.get('date');
    const eventExample = {
        id: 0.7520027086457333, // id понадобится для работы с событиями
        title: 'Title',
        description: 'Some description',
        start: new Date('2020-03-17T01:10:00.000Z'),
        end: new Date('2020-03-17T04:30:00.000Z'),
    }
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
    // при подтверждении формы нужно считать данные с формы
    // с формы вы получите поля date, startTime, endTime, title, description
    // на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
    // date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
    // полученное событие добавляем в массив событий, что хранится в storage
    // закрываем форму
    // и запускаем перерисовку событий с помощью renderEvents
}


export function initEventForm() {
    // подпишитесь на сабмит формы и на закрытие формы
}

closeEventFormBtn.addEventListener('click',onCloseEventForm);
eventFormElem.addEventListener('submit',onCreateEvent)

