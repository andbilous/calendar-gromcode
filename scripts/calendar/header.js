import {
    getItem
} from '../common/storage.js';
import {
    generateWeekRange
} from '../common/time.utils.js';
import {
    openModal
} from '../common/modal.js';
import {
    fillCreateForm
} from '../events/events.js';

export const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const createBtn = document.querySelector('.create-event-btn');
const calendarHeader = document.querySelector('.calendar__header');

export const handleCreateEvent = () => {
    fillCreateForm();
    openModal();
}

export const renderHeader = () => {
    const week = generateWeekRange(getItem('displayedWeekStart'))
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        day: 'numeric'
    });
    const formattedData = week.map(item => {
        const [date, weekday] = dateFormatter.format(item).split(' ');
        return `<div class='calendar__day-label day-label' data-time="johndoe">
       <span class="day-label__day-name">${weekday.toUpperCase()}</span>
       <span class="day-label__day-number">${date}</span></div>`
    })
    calendarHeader.innerHTML = formattedData.join(" ");
};

createBtn.addEventListener('click', handleCreateEvent)