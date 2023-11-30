import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import swal from 'sweetalert2';

function Bookingscreen() {
  const { roomid, fromdate, todate } = useParams();

  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalamount, setTotalamount] = useState();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userid = currentUser ? currentUser._id : null;

  const formattedFromDate = moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY');
  const formattedToDate = moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY');

  const totaldays = moment(formattedToDate, 'DD-MM-YYYY').diff(moment(formattedFromDate, 'DD-MM-YYYY'), 'days') + 1;

  useEffect(() => {
    if (!localStorage.getItem('currentUser')) {
      window.location.href = '/login';
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/api/rooms/getroombyid', {
          roomid: roomid,
        });
        const data = response.data;
        // Use a function to update totalamount based on current state
        setTotalamount(prevTotalAmount => data.rentperday * totaldays);
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid, totaldays]);

  const onToken = async (token) => {
    // Check if currentUser is available before accessing properties
    if (!currentUser) {
      console.error('User not available');
      return;
    }

    const bookingDetails = {
      room,
      roomid,
      userid: currentUser._id, // Access userid directly from currentUser
      fromdate,
      todate,
      totalamount,
      totaldays,
      token,
    };
    try {
      const result = await axios.post('http://localhost:5000/api/booking/bookroom', bookingDetails);
      console.log(result);
      setLoading(false);
      swal.fire('congrats', 'your booking is successful', 'success').then((result) => {
        window.location.href = '/bookings';
      });
    } catch (error) {
      console.log('Error response:', error.response);
      console.log(error);
      swal.fire('sorry', 'something went wrong', 'error');
    }
  };

  return (
    <div className='m-5'>
      {loading ? (
        <h1><Loader /></h1>
      ) : error ? (
        <h1><Error /></h1>
      ) : (
        <div>
          <div className='row justify-content-center mt-5'>
            <div className='col-md-6'>
              <h1>{room.name}</h1>
              {room.imageurls && room.imageurls[0] && (
                <img src={room.imageurls[0]} className='bigimg' alt={room.name} />
              )}
            </div>
            <div className='col-md-6'>
              <div style={{ textAlign: 'right' }}>
                <h1>Booking Details:</h1>
                <hr />
                <b>
                  <p>Name:{currentUser.name}</p>
                  <p>From Date: {formattedFromDate}</p>
                  <p>To Date: {formattedToDate}</p>
                  <p>Max Count: {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: 'right' }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total Days: {totaldays}</p>
                  <p>Rent per day: {room.rentperday}</p>
                  <p>Total Amount: {totalamount}</p>
                </b>
              </div>
              <div style={{ float: 'right' }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency='INR'
                  stripeKey="pk_test_51OBAMTSF4g5RXY8RPQq6ctc5XrGo5XqXxbztY9MZGvMMuCR5V9jYoZ38jfFOywiYqvZqsYPJEPGmWyhLaBfKEOvt00O4SmIL5H"
                >
                  <button className='btn btn-primary'>Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Loader from '../components/Loader';
// import Error from '../components/Error';
// import moment from 'moment';
// import { Alert } from 'react-bootstrap'; // Import Alert

// function Bookingscreen() {
//   const { roomid, fromdate, todate } = useParams();

//   const [room, setRoom] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [totalamount, setTotalamount] = useState();
//   const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for the alert

//   useEffect(() => {
//     if (!localStorage.getItem('currentUser')) {
//       window.location.reload = '/login';
//     }
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.post('http://localhost:5000/api/rooms/getroombyid', {
//           roomid: roomid,
//         });
//         const data = response.data;
//         setTotalamount(data.rentperday * totaldays);
//         setRoom(data);
//         setLoading(false);
//       } catch (error) {
//         setError(true);
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [roomid]);

//   const formattedFromDate = moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY');
//   const formattedToDate = moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY');

//   const totaldays =
//     moment(formattedToDate, 'DD-MM-YYYY').diff(moment(formattedFromDate, 'DD-MM-YYYY'), 'days') + 1;

//   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//   const userid = currentUser ? currentUser._id : null;

//   const bookRoom = async () => {
//     const bookingDetails = {
//       room,
//       roomid,
//       userid: JSON.parse(localStorage.getItem('currentUser'))._id,
//       fromdate,
//       todate,
//       totalamount,
//       totaldays,
//     };

//     try {
//       const result = await axios.post('http://localhost:5000/api/booking/bookroom', bookingDetails);
//       console.log(result);

//       // Display the success alert
//       setShowSuccessAlert(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className='m-5'>
//       {loading ? (
//         <h1>
//           <Loader />
//         </h1>
//       ) : error ? (
//         <h1>
//           <Error />
//         </h1>
//       ) : (
//         <div>
//           <div className='row justify-content-center mt-5'>
//             <div className='col-md-6'>
//               <h1>{room.name}</h1>
//               {room.imageurls && room.imageurls[0] && (
//                 <img src={room.imageurls[0]} className='bigimg' alt={room.name} />
//               )}
//             </div>
//             <div className='col-md-6'>
//               <div style={{ textAlign: 'right' }}>
//                 <h1>Booking Details:</h1>
//                 <hr />
//                 <b>
//                   <p>Name:{JSON.parse(localStorage.getItem('currentUser')).name}</p>
//                   <p>From Date: {formattedFromDate}</p>
//                   <p>To Date: {formattedToDate}</p>
//                   <p>Max Count: {room.maxcount}</p>
//                 </b>
//               </div>
//               <div style={{ textAlign: 'right' }}>
//                 <b>
//                   <h1>Amount</h1>
//                   <hr />
//                   <p>Total Days: {totaldays}</p>
//                   <p>Rent per day: {room.rentperday}</p>
//                   <p>Total Amount:{totalamount}</p>
//                 </b>
//               </div>
//               <div style={{ float: 'right' }}>
//                 <button className='btn btn-primary' onClick={bookRoom}>
//                   Pay Now
//                 </button>
//               </div>
//             </div>
//           </div>
//           {showSuccessAlert && (
//             <Alert variant='success' onClose={() => setShowSuccessAlert(false)} dismissible>
//               Your booking is successful!
//             </Alert>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Bookingscreen;

