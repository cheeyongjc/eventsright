import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import Event from './components/Event';
import CreateEventForm from './components/Event/CreateEventForm';
import EditEventForm from './components/Event/EditEventForm';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' exact>
            <Event />
          </Route>
          <Route path='/create' exact>
            <CreateEventForm />
          </Route>
          <Route path='/signup' exact>
            <SignupFormPage />
          </Route>
          <Route path='/:id' exact>
            <Event single={true} />
          </Route>
          <Route path='/:id/edit' exact>
            <EditEventForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
