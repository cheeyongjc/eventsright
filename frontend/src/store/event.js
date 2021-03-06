// import { useReducer } from "react";
import { csrfFetch } from "./csrf";

const GET_EVENTS = 'event/GET_EVENT';
const ADD_EVENT = 'event/ADD_EVENT';
const DELETE_EVENT = 'event/DELETE_EVENT';
const UPDATE_EVENT = 'event/UPDATE_EVENT';

export const getEvents = (events) => {
	return { type: GET_EVENTS, events };
}
export const addEvent = event => {
	return {
		type: ADD_EVENT, event
	};
}
export const deleteEvent = id => {
	return {
		type: DELETE_EVENT, id
	};
};
export const editEvent = event => {
	return {
		type: UPDATE_EVENT, event
	};
};

export const getEventThunk = () => async (dispatch) => {
	const response = await fetch(`/api/events`);
	if (response.ok) {
		const events = await response.json();
		dispatch(getEvents(events));
	}
};
export const createEventThunk = (event) => async dispatch => {
	const { hostId, name, date, start_time, end_time, description, image } = event;
	const response = await csrfFetch(`/api/events`, {
		method: 'POST',
		body: JSON.stringify({
			hostId,
			name,
			date,
			start_time,
			end_time,
			description,
			image,
		}),
	});
	if (response.ok) {
		const events = await response.json();
		dispatch(addEvent(events.event));
		return events;
	}
};
export const updateEventThunk = (id, event) => async dispatch => {
	console.log(event, 'inside thunk');
	const response = await csrfFetch(`/api/events/${id}/edit`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(event),
	});
	if (response.ok) {
		const editedEvent = await response.json();
		dispatch(editEvent(editedEvent.event));
		return editedEvent;
	}

}
export const deleteEventThunk = (id) => async dispatch => {
	// const eventResponse = await fetch(`/api/events/${id}`);
	// const event = await eventResponse.json();
	const response = await csrfFetch(`/api/events/${id}`, {
		method: 'DELETE',
	});
	if (response.ok) {
		dispatch(deleteEvent(id));
	}
};
const initialState = {
	events: []
};

const eventReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_EVENTS:
			const results = {};
			action.events.forEach((event) => {
				results[event.id] = event;
			});
			return { ...state, events: results };
		case ADD_EVENT:
			return { ...state, events: [action.event] };
		case UPDATE_EVENT:
			return { ...state, events: [action.event] };
		case DELETE_EVENT:
			const id = action.id;
			delete state.events[id];
			return { ...state}
		default:
			return state;
	}
}
export default eventReducer;
