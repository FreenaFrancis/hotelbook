// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import Error from '../components/Error';
// // import Loader from '../components/Loader';

// // function Loginscreen() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(false);

// //   const login = async () => {
// //     const user = {
// //       email,
// //       password,
// //     };

// //     try {
// //       setLoading(true);
// //       const response = await axios.post('http://localhost:5000/api/users/login', user);
// //       setLoading(false);

// //       const userData = {
// //         name: response.data.name, // Assuming the API response contains the user's name
// //         token: response.data.token, // Assuming the API response contains an authentication token
// //       };

// //       localStorage.setItem('currentUser', JSON.stringify(userData));
// //       console.log('Login successful', response.data);
// //       // You can handle success here, such as redirecting to a dashboard or setting user authentication state.
// //       window.location.href = '/home';
// //     } catch (error) {
// //       console.error('Login error:', error.response.data);
// //       // Handle login error, display an alert or error message.
// //       setLoading(false);
// //       setError(true);
// //     }
// //   };

// //   return (
// //     <div>
// //       {loading && <Loader />}
// //       <div className='row justify-content-center mt-5'>
// //         <div className='col-md-5'>
// //           {error && <Error message='Invalid user' />}
// //           <div className='bs'>
// //             <h2>Login</h2>
// //             <input
// //               type='text'
// //               className='form-control'
// //               placeholder='Email'
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //             />
// //             <input
// //               type='password'
// //               className='form-control'
// //               placeholder='Password'
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //             />
// //             <button className='btn btn-primary mt-3' onClick={login}>
// //               Login
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Loginscreen;

// import React, { useState } from 'react';
// import axios from 'axios';
// import Error from '../components/Error';
// import Loader from '../components/Loader';

// function Loginscreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const login = async () => {
//     const user = {
//       email,
//       password,
//     };

//     try {
//       setLoading(true);
//       const response = await axios.post('http://localhost:5000/api/users/login', user);
//       setLoading(false);

//       const userData = {
//         name: response.data.name, // Assuming the API response contains the user's name
//         token: response.data.token, // Assuming the API response contains an authentication token
//       };

//       localStorage.setItem('currentUser', JSON.stringify(userData));
//       console.log('Login successful', response.data);
//       // You can handle success here, such as redirecting to a dashboard or setting user authentication state.
//       window.location.href = '/home';
//     } catch (error) {
//       console.error('Login error:', error.response.data);
//       // Handle login error, display an alert or error message.
//       setLoading(false);
//       setError(error.response.data.message); // Update to use an appropriate error message property from the response.
//     }
//   };

//   return (
//     <div>
//       {loading && <Loader />}
//       <div className='row justify-content-center mt-5'>
//         <div className='col-md-5'>
//           {error && <Error message={error} />}
//           <div className='bs'>
//             <h2>Login</h2>
//             <input
//               type='text'
//               className='form-control'
//               placeholder='Email'
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type='password'
//               className='form-control'
//               placeholder='Password'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button className='btn btn-primary mt-3' onClick={login}>
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Loginscreen;

import React, { useState } from 'react';
import axios from 'axios';
import Error from '../components/Error';
import Loader from '../components/Loader';

function Loginscreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async () => {
    const user = {
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/users/login', user);
      setLoading(false);

      const userData = {
        name: response.data.name, // Assuming the API response contains the user's name
        token: response.data.token, // Assuming the API response contains an authentication token
      };

      localStorage.setItem('currentUser', JSON.stringify(userData));
      console.log('Login successful', response.data);
      // You can handle success here, such as redirecting to a dashboard or setting user authentication state.
      window.location.href = '/home';
    } catch (err) {
      console.error('Login error:', err);

      if (err.response) {
        // Handle login error with response data if available
        setError(err.response.data.message);
      } else {
        // Handle other errors
        setError('An error occurred while logging in.');
      }

      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5'>
          {error && <Error message={error} />}
          <div className='bs'>
            <h2>Login</h2>
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
            <button className='btn btn-primary mt-3' onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
