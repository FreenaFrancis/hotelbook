import axios from 'axios';
import React, { useState } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate(); // Get the navigate function from React Router

  const register = async () => {
    if (password === confirmPassword) {
      const user = {
        name,
        email,
        password,
      };

      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/api/users/register', user);
        setLoading(false);
        setSuccess(true);

        // Reset form fields
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        // Automatically hide success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
          // Navigate to the login page after a successful registration
          navigate('/login');
        }, 3000);

        console.log('Registration successful', response.data);
        // You can handle success here, such as redirecting to a login page.
      } catch (error) {
        console.error('Registration error:', error.response.data);
        setLoading(false);
        setError(true);
      }
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
     
      <div className='row justify-content-center mt-1'>
        <div className='col-md-5'>
          {success && <Success message='Registration is successful' />}
          <div className='bs'>
            <h2>Register</h2>
            <input
              type='text'
              className='form-control'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='text'
              className='form-control'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type='password'
              className='form-control'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className='btn btn-primary mt-3' onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
