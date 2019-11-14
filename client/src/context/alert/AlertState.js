import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  // Initial state
  const initialState = [];

  // Create Reducer
  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Actions

  /**
   * Set Alert
   */
  const setAlert = (msg, type, timeOut = 5000) => {
    const id = uuid.v4();

    dispatch({ type: SET_ALERT, payload: { msg, type, id } });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeOut);
  };

  // Return Provider
  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
