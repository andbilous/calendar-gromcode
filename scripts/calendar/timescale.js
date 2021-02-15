import { createNumbersArray } from '../common/createNumbersArray.js';
import {startHour,endHour} from './calendar.js';

const timescaleElem = document.querySelector('.calendar__time-scale');

export const renderTimescale = () => {
    const hours = createNumbersArray(startHour,endHour);
    let timeOfDay = '';
    const timeSlots = hours.map(hour=>{
        timeOfDay = hour <=12 ? 'AM':'PM';
        return `<div class="time-slot"><span class="time-slot__time">${hour} ${timeOfDay}</span></div>`
    })
    timescaleElem.innerHTML=timeSlots.join(" ");
};