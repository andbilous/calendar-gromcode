import { createNumbersArray } from '../common/createNumbersArray.js';

const timescaleElem = document.querySelector('.calendar__time-scale');

export const renderTimescale = () => {
    const hours = createNumbersArray(0,23);
    let timeOfDay = '';
    const timeSlots = hours.map(hour=>{
        timeOfDay = hour <=12 ? 'AM':'PM';
        return `<div class="time-slot"><span class="time-slot__time">${hour} ${timeOfDay}</span></div>`
    })
    timescaleElem.innerHTML=timeSlots.join(" ");
    // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
    // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
};