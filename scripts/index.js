import { renderTimescale } from './calendar/timescale.js';
import { renderWeek,renderCurrentTime } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { getItem, setItem } from './common/storage.js';
import { getStartOfWeek } from './common/time.utils.js';
import { initEventForm } from './events/createEvent.js';

document.addEventListener('DOMContentLoaded', () => {
    renderTimescale();
    setItem('displayedWeekStart', getStartOfWeek(new Date()));
    renderWeek();
    renderHeader();
    initNavigation();
    initEventForm();
});