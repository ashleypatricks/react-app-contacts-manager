import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  REGISTER_FAIL
} from '../types';

const AuthState = props => {
  // STATE //
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  // SET THE REDUCER //
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ACTIONS //

  /**
   * Load User
   */
  const loadUser = async () => {
    // Set the token into a global header so we don't have to keep doing it with every request. We do it within Axios and pull it in here

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  /**
   * Register User
   */
  const registerUser = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      // We don't need to use the http://localhost/ part because it is already defined in the proxy attribute in the package.json
      const res = await axios.post('/api/users', formData, config);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data }); // res.data will be the jwt token

      // Call Load User after you register a user
      loadUser();
      //
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.serverMessage
      });
    }
  };

  /**
   * Login User
   */

  const loginUser = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth', formData, config);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data }); // res.data will be the jwt token

      // Call Load User after you login a user
      loadUser();
      //
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.serverMessage
      });
    }
  };

  /**
   * Logout
   */
  const logoutUser = () => {
    dispatch({ type: LOGOUT });
  };

  /**
   * Clear Errors
   */
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  /**
   * Return
   */
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        registerUser,
        loadUser,
        loginUser,
        logoutUser,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
