import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { loginUser, error, clearErrors, isAuthenticated } = authContext;

  // Use Effect
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]); // Run this when the error changes or the error is added to the state

  // Use state setup
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  /**
   * OnChange
   */
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  /**
   * OnSubmit
   */
  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      loginUser({ email, password });
    }
  };

  const { email, password } = user;

  return (
    <div className='form-container'>
      <h1 style={{ textAlign: 'center' }}>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit} style={{ paddingTop: '50px' }}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
