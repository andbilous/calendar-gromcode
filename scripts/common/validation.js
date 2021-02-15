import {
    getItem
} from "./storage.js";



const transformDateToHours = date => Math.floor((date) / 1000 / 60 / 60)

export const validateNewEvent = (event) => {
    if (!event.title) {
        alert('Please enter event title')
        return false
    }
    if (!event.description) {
        alert('Please enter event description')
        return false
    }
    const eventDurationInHours = transformDateToHours(event.end - event.start);
    if (event.start.getDay() !== event.end.getDay()) {
        alert('Event should be inside one day')
        return false
    }
    if (getItem('events').some(existingEvent => existingEvent.start >= event.start && existingEvent.end <= event.start)) {
        alert('There is another event in this range')
        return false
    }

    if (eventDurationInHours > 6) {
        alert('Event is too long')
        return false
    }
    return true
}

export const validateDeleteEvent = (id) => {
    const eventToDelete = getItem('events').filter(event => event.id === id)[0];
    const eventDurationInMinutes = Math.floor((new Date() - eventToDelete.start) / 1000 / 60);
    if (Math.abs(eventDurationInMinutes) < 15) {
        alert('We cannot delete this event')
        return false;
    }
    return true
}