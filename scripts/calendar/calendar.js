import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';

const calendarWeek = document.querySelector('.calendar__week');

const generateDay = () => {
  return  createNumbersArray(0,23).map(item=>{
      return `<div data-time=${item} class="calendar__time-slot"></div>`
    }).join(' ');
    // функция должна сгенерировать и вернуть разметку дня в виде строки
    // разметка состоит из 24 часовых временных слотов (.calendar__time-slot)
};
export const renderCurrentTime = () =>{
    const slotElem = document.querySelector(`.calendar__day[data-day="${new Date().getDay()}"] .calendar__time-slot[data-time="${new Date().getHours()}"]`);
           slotElem.innerHTML='<div class="current-line"></div>';
}

export const renderWeek = () => {
    const weekRange =  generateWeekRange(getItem('displayedWeekStart'));
    const daysLayout = weekRange.map((day,index)=>{
        return `<div data-day=${day.getDay()} class="calendar__day">${generateDay()}</div>`
    })
    calendarWeek.innerHTML=daysLayout.join(' ');
    setInterval(renderCurrentTime(),60000);
    // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
    // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
    // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
    // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
    // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents
};

