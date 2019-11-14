import React, { useState } from 'react';

const Register = () => {
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
    console.log('Call a register submit function!!');
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
          <input type='text' name='name' value={name} onChange={onChange} />
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
          />
        </div>
        <div className='form-group'>
          <label htmlFor='passwordConfirmation'>Confirm Password</label>
          <input
            type='password'
            name='passwordConfirmation'
            value={passwordConfirmation}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
          Register
        />
      </form>
    </div>
  );
};

export default Register;
