/* eslint-disable no-param-reassign */
import {
    getItem,
    setItem
} from '../common/storage.js';
import {
    renderWeek
} from '../calendar/calendar.js';
import {
    renderHeader
} from '../calendar/header.js';
import {
    getStartOfWeek,
    getDisplayedMonth
} from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector('.navigation__displayed-month');
const navTodayBtn = document.querySelector('.navigation__today-btn');

navTodayBtn.addEventListener('click', () => {
    setItem('displayedWeekStart', getStartOfWeek(new Date()));
})

function renderCurrentMonth() {
    displayedMonthElem.innerHTML = getDisplayedMonth(getItem('displayedWeekStart'));
}

const changeWeek = (dt, sign) => {
    dt = new Date(dt);
    if (sign === '+') {
        return new Date(dt.setDate(dt.getDate() + 7))
    }
    return new Date(dt.setDate(dt.getDate() - 7))
};


const onChangeWeek = event => {
    if (event.target.classList.value.includes('right')) {
        setItem('displayedWeekStart', changeWeek(getItem('displayedWeekStart'), '+'));
    }
    if (event.target.classList.value.includes('left')) {
        setItem('displayedWeekStart', changeWeek(getItem('displayedWeekStart'), '-'))
    }

    renderHeader();
    renderWeek()
    renderCurrentMonth();
};

export const initNavigation = () => {
    renderCurrentMonth();
    navElem.addEventListener('click', onChangeWeek);
};