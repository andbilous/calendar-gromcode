import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';
import {fillCreateForm} from '../events/events.js';

export const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const createBtn = document.querySelector('.create-event-btn');
const calendarHeader = document.querySelector('.calendar__header');

export const handleCreateEvent=()=>{
    fillCreateForm();
    openModal();
}

export const renderHeader = () => {
    const week = generateWeekRange(getItem('displayedWeekStart'))
    const dateFormatter = new Intl.DateTimeFormat('en-US', {weekday: 'short',day: 'numeric'});
    const formattedData = week.map(item=>{
        let [date,weekday] = dateFormatter.format(item).split(' '); 
       return  `<div class='calendar__day-label day-label' data-time="johndoe">
       <span class="day-label__day-name">${weekday.toUpperCase()}</span>
       <span class="day-label__day-number">${date}</span></div>`
    })
    calendarHeader.innerHTML=formattedData.join(" ");
    // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
    // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
    // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
    // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка
};

createBtn.addEventListener('click',handleCreateEvent)


// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик 