import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEventThunk, getEventThunk } from '../../store/event';
import { useHistory, useParams } from 'react-router-dom';
import './Event.css';

export default function Event({ single }) {
	const dispatch = useDispatch();
	const events = useSelector((state) => state.eventState.events);
	const { id } = useParams();
	const allEvents = Object.values(events).find((event) => event.id === Number(id));
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);
	const { user } = useSelector((state) => state.session);
	const handleEventClick = (event, eachId) => {
		event.preventDefault();
		history.push(`/${eachId}`);
	}
	const handleDeleteEvent = (e) => {
		e.preventDefault();
		dispatch(deleteEventThunk(id));
		setTimeout(() => {
			history.push('/');
		}, 1000);
	}
	const handleEdit = (event) => {
		event.preventDefault();
		history.push(`/${id}/edit`);
	}
	useEffect(() => {
		dispatch(getEventThunk());
	}, [dispatch]);
	// if (single) {
	// 	if (allEvents.hostId === sessionUser.id) {
	// 		return (
	// 			<>
	// 				<div className='singleEventBackground-container'>
	// 					<img className='singleEventBackground' src='https://photodumpeventsright.s3.us-east-2.amazonaws.com/48-487865_festival-coachella.png' alt='background'></img>
	// 				</div>
	// 				<div className='singleEvent-container'>
	// 					<img className='singleImage' src={allEvents?.image} alt={allEvents?.name} />
	// 					<h1 className='singleInputs'>{allEvents?.name}</h1>
	// 					<h1 className='singleInputs'>{allEvents?.description}</h1>
	// 					<button onClick={handleDeleteEvent}>Delete</button>
	// 					<button onClick={handleEdit}>Edit</button>
	// 				</div>
	// 			</>
	// 		)
	// 	} else if (allEvents.hostId !== sessionUser.id || user === undefined) {
	// 		return (
	// 			<>
	// 				<div className='singleEventBackground-container'>
	// 					<img className='singleEventBackground' src='https://photodumpeventsright.s3.us-east-2.amazonaws.com/48-487865_festival-coachella.png' alt='background'></img>
	// 				</div>
	// 				<div className='singleEvent-container'>
	// 					<img className='singleImage' src={allEvents?.image} alt={allEvents?.name} />
	// 					<h1 className='singleInputs'>{allEvents?.name}</h1>
	// 					<h1 className='singleInputs'>{allEvents?.description}</h1>
	// 				</div>
	// 			</>
	// 		)
	// 	}
	// }
	if (single) {
		if (user === undefined) {
			return (
				<>
					<div className='singleEventBackground-container'>
						<img className='singleEventBackground' src='https://photodumpeventsright.s3.us-east-2.amazonaws.com/48-487865_festival-coachella.png' alt='background'></img>
					</div>
					<div className='singleEvent-container'>
						<img className='singleImage' src={allEvents?.image} alt={allEvents?.name} />
						<h1 className='singleInputs'>{allEvents?.name}</h1>
						<h2>About this event:</h2>
						<p className='singleInputs'>{allEvents?.description}</p>
					</div>
				</>
			)
		} else if (allEvents.hostId !== sessionUser.id) {
			return (
				<>
					<div className='singleEventBackground-container'>
						<img className='singleEventBackground' src='https://photodumpeventsright.s3.us-east-2.amazonaws.com/48-487865_festival-coachella.png' alt='background'></img>
					</div>
					<div className='singleEvent-container'>
						<img className='singleImage' src={allEvents?.image} alt={allEvents?.name} />
						<h1 className='singleInputs'>{allEvents?.name}</h1>
						<h2>About this event:</h2>
						<p className='singleInputs'>{allEvents?.description}</p>
					</div>
				</>
			)
		} else if (allEvents.hostId === sessionUser.id) {
			return (
				<>
					<div className='singleEventBackground-container'>
						<img className='singleEventBackground' src='https://photodumpeventsright.s3.us-east-2.amazonaws.com/48-487865_festival-coachella.png' alt='background'></img>
					</div>
					<div className='singleEvent-container'>
						<img className='singleImage' src={allEvents?.image} alt={allEvents?.name} />
						<h1 className='singleInputs'>{allEvents?.name}</h1>
						<h2>About this event:</h2>
						<p className='singleInputs'>{allEvents?.description}</p>
						<button onClick={handleDeleteEvent}>Delete</button>
						<button onClick={handleEdit}>Edit</button>
					</div>
				</>
			)
		}
	}
	return (
		<>
			<div className='background-container'>
				<img className='eventBackground' src='https://photodumpeventsright.s3.us-east-2.amazonaws.com/48-487865_festival-coachella.png' alt='background'></img>
			</div>
			<div className='eventsContainer'>
				{Object.values(events).map((event) => (
					<div key={event.id}>
						<div className='eventContainer' >
							<img className='eventImages' src={event?.image} alt={event?.name} onClick={e => handleEventClick(e, event.id)} />
							<h1 className='eventName'>{event?.name}</h1>
							<p className='eventDescription'>{event?.description}</p>
						</div>
					</div>
				))}

			</div>
		</>
	)
}
