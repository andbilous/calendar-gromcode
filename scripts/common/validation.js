import { getItem } from '../common/storage.js';



export const validateNewEvent = (event)=>{
    const eventDurationInHours = Math.floor((event.end-event.start)/1000/60/60);
    if(event.start.getDay()!==event.end.getDay()){
        alert('Event should be inside one day')
        return false
    }
    if(getItem('events').some(existingEvent => existingEvent.start>=event.start && existingEvent.end<=event.start)){
        alert('There is another event in this range')
        return false
    }
    
    if(eventDurationInHours>6) {
        alert('Event is too long')
        return false
    } 
    return true
}

export const validateDeleteEvent = (id)=>{
    const eventToDelete = getItem('events').filter(event=>event.id ===id)[0];
    const eventDurationInminutes = Math.floor((new Date()-eventToDelete.start)/1000/60);
    if(eventDurationInminutes<15){
        alert('We cannot delete this event')
        return false;
    }
    return true
}


