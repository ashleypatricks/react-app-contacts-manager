import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Register = () => {
  // Grab the Alert Context
  const alertContext = useContext(AlertContext);

  // Pull setAlert method out of the context
  const { setAlert } = alertContext;

  // Use state setup
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
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

    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields!', 'danger');
    } else if (password !== passwordConfirmation) {
      setAlert('Passwords do not match!', 'danger');
    }
  };

  const { name, email, password, passwordConfirmation } = user;

  return (
    <div className='form-container'>
      <h1 style={{ textAlign: 'center' }}>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit} style={{ paddingTop: '50px' }}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='passwordConfirmation'>Confirm Password</label>
          <input
            type='password'
            name='passwordConfirmation'
            value={passwordConfirmation}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
