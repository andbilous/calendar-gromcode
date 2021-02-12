import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';
import { openModal } from '../common/modal.js';
import {validateNewEvent,validateDeleteEvent} from '../common/validation.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');
const editEventFormElem = document.querySelector('.edit-event-form');
const createEventForm = document.querySelector('.event-form');

function handleEventClick(event) {
    const node = event.target;
    if(getItem('events').length){
    fillEditForm(node.dataset.eventId);
    if(node.classList.contains('event')){
        openPopup(event.clientX,event.clientY)
    }
    }else{
         const currentDay = shmoment(getItem('displayedWeekStart')).add('days',parseInt(node.parentNode.dataset.day-1)).result();
         const date = shmoment(currentDay).add('hours',parseInt(node.dataset.time)).result();
        fillCreateForm(date);
         openModal();
    }

}

export const fillCreateForm = (date=new Date())=>{
   createEventForm.querySelector('input[name="title"]').value = 'Some text';
   createEventForm.querySelector('input[name="date"]').valueAsDate =  shmoment(date).add('hours',2).result();
   createEventForm.querySelector('input[name="startTime"]').value =  date.toLocaleTimeString();
   createEventForm.querySelector('input[name="endTime"]').value = shmoment(date).add('minutes',15).result().toLocaleTimeString();
   createEventForm.querySelector('textarea[name="description"]').value = 'Some description';
}

export const fillEditForm = (id)=>{
    if(id){
        setItem('eventIdToEdit',id)
        const currentEvent = getItem('events').filter(event=>event.id.toString()===id.toString())[0];
        editEventFormElem.querySelector('input[name="title"]').value = currentEvent.title;
        editEventFormElem.querySelector('textarea[name="description"]').value = currentEvent.description;
        editEventFormElem.querySelector('input[name="date"]').value = currentEvent.start.toISOString().split('T')[0];
        editEventFormElem.querySelector('input[name="startTime"]').value = currentEvent.start.toLocaleTimeString();
        editEventFormElem.querySelector('input[name="endTime"]').value = currentEvent.end.toLocaleTimeString();
    }
}

const editEventSubmit = event =>{
    event.preventDefault();
    console.log('editEvenFormElem',editEventFormElem);
    const formData = new FormData(editEventFormElem);
    const id = getItem('eventIdToEdit');
    console.log('CurrentEvents',getItem('events'));
    console.log('Form Data startTime',formData.get('startTime'));
    console.log(formData.get('date'))
    const newEvent = {
        title:formData.get('title'),
        description: formData.get('description'),
start: new Date(Date.parse(formData.get('date')+' '+formData.get('startTime'))),
end: new Date(Date.parse(formData.get('date')+' '+formData.get('endTime')))
    }
    if(validateNewEvent(newEvent)){
        const editedEvents = getItem('events').map(event=>{
            if(event.id.toString()===id.toString()){
               return {
                   id,
                   ...newEvent
               }
            }
            return event
        })
        setItem('events',editedEvents);
        editEventFormElem.reset();
        renderEvents();
        closePopup();
    } 
}


const createEventElement = event => {
   let start = event.start.getHours();
   let end = event.end.getHours();
    const eventElem = document.createElement('div');
    eventElem.innerHTML=`<div class="event__title"><div>${event.title}</div><div>${event.description}</div>${start}-${end}</div>`;
    eventElem.classList.add('event');
    eventElem.setAttribute('data-event-id',event.id);
    setItem('eventIdToDelete',event.id);
    return eventElem
    // event.target.appendChild(eventElem);
    // ф-ция создает DOM элемент события
    // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
    // нужно добавить id события в дата атрибут
    // здесь для создания DOM элемента события используйте document.createElement
};



function removeEventsFromCalendar() {
   setItem('events',[]);

    // ф-ция для удаления всех событий с календаря
}



export const renderEvents = () => {
   
    const oldEvent = document.querySelector('.event');
    if(oldEvent){
        oldEvent.remove();
    }
    const weekStart = getItem('displayedWeekStart');
    const events = getItem('events');
        let day,time = null;
        events.forEach(event=>{
            day = event.start.getDay();
            time = event.start.getHours();
           const slotElem = document.querySelector(`.calendar__day[data-day="${day}"] .calendar__time-slot[data-time="${time}"]`);
           slotElem.appendChild(createEventElement(event));
        })
   
    // достаем из storage все события и дату понедельника отображаемой недели
    // фильтруем события, оставляем только те, что входят в текущую неделю
    // создаем для них DOM элементы с помощью createEventElement
    // для каждого события находим на странице временную ячейку (.calendar__time-slot)
    // и вставляем туда событие
    // каждый день и временная ячейка должно содержать дата атрибуты,
    // по которым можно будет найти нужную временную ячейку для события
    // не забудьте удалить с календаря старые события перед добавлением новых
};

function onDeleteEvent() {
  const eventIdToDelete=  getItem('eventIdToDelete');
  console.log(eventIdToDelete);
  if(validateDeleteEvent(eventIdToDelete)){
    const events = getItem('events');
    console.log('eventIdToDelete',eventIdToDelete)
    setItem('events',events.filter(event=>event.id !==eventIdToDelete));
    console.log('Events in onDeleteEvent',getItem('events'))
    // достаем из storage массив событий и eventIdToDelete
    // удаляем из массива нужное событие и записываем в storage новый массив
    // закрыть попап
    // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
    closePopup();
    renderEvents();
  }
   
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

 weekElem.addEventListener('click', handleEventClick);

 editEventFormElem.addEventListener('submit',editEventSubmit);





