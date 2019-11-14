import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  EGISTER_FAIL,
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
  const loadUser = () => {
    console.log('Load user');
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
  const loginUser = () => {
    console.log('Login user');
  };

  /**
   * Logout
   */
  const logoutUser = () => {
    console.log('Logout user');
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
