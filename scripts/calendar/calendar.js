import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { createNumbersArray } from '../common/createNumbersArray.js';

const calendarWeek = document.querySelector('.calendar__week');
const oneMinuteInMs = 60000;
export const startHour = 0;
export const endHour = 23;

const generateDay = () => createNumbersArray(startHour,endHour).map(item=>`<div data-time=${item} class="calendar__time-slot"></div>`).join(' ');
export const renderCurrentTime = () =>{
    const slotElem = document.querySelector(`.calendar__day[data-day="${new Date().getDay()}"] .calendar__time-slot[data-time="${new Date().getHours()}"]`);
           slotElem.innerHTML='<div class="current-line"></div>';
}

export const renderWeek = () => {
    const weekRange =  generateWeekRange(getItem('displayedWeekStart'));
    const daysLayout = weekRange.map((day,index)=>`<div data-day=${day.getDay()} class="calendar__day">${generateDay()}</div>`)
    calendarWeek.innerHTML=daysLayout.join(' ');
    setInterval(renderCurrentTime(),oneMinuteInMs);
};

