const storage = {
    eventIdToDelete: null,
    eventIdToEdit: null,
    displayedWeekStart: null,
    events: [],
};

export const setItem = (key, value) => {
    storage[key] = value
};

export const getItem = key => storage[key];