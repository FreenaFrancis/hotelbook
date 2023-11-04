// import React, { useEffect, useState } from 'react';
// import { Tabs } from 'antd';
// import axios from 'axios';
// import Loader from '../components/Loader';
// import Error from '../components/Error';
// // impport Swal from 'Sweetaler2'
// import { Divider, Space, Tag } from 'antd';
// const { TabPane } = Tabs;

// function ProfileScreen() {
//   const user = JSON.parse(localStorage.getItem('currentUser'));

//   useEffect(() => {
//     if (!user) {
//       window.location.href = '/login';
//     }
//   }, []);

//   return (
//     <div className="ml-3-mt-3">
//       <Tabs defaultActiveKey="1">
//         <TabPane tab="Profile" key="2">
//           <h1>Profile</h1>
//           <br />
//           <h1>Name: {user.name}</h1>
//           <h1>Email: {user.email}</h1>
//           <h1>isAdmin: {user.isAdmin ? 'Yes' : 'No'}</h1>
//         </TabPane>
//         <TabPane tab="Bookings" key="3">
//           <MyBookings user={user} />
//         </TabPane>
//       </Tabs>
//     </div>
//   );
// }

// export default ProfileScreen;

// export function MyBookings({ user }) {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // Initialize error state as null

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.post('http://localhost:5000/api/booking/getbookingsbyuserid', {
//           userid: user._id,
//         });
//         const rooms = response.data;
//         console.log(rooms);
//         setBookings(rooms);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//         setError(error); // Set the error state with the error object
//       }
//     };

//     fetchData();
//   }, []);

//   const cancelBooking=async(bookingid,roomid)=>{
// try{
// setLoading(true)
// const result = await axios.post("http://localhost:5000/api/booking/cancelbooking",{bookingid,roomid}).data
// console.log(result);
// setLoading(false)
// // Swal.fire('your booking is cancelled successfully').then(result=>{
// //   window.location.reload
// // })
// }catch(error){
//   console.log(error);
//   setLoading(false)
//   // Swal.fire('something went wrong')
// }

//   }
//   return (
//     <div>
//       <div className="row">
//         <div className="col-md-6">
//           {loading && <Loader />}
//           {error && <Error error={error} />} {/* Render error message if error state is set */}
//           {bookings &&
//             bookings.map((booking) => {
//               return <div className='bs'>
//                 <h1>{booking.room}</h1>
//                 <p><b>Booking:</b>{booking._id}</p>
//                 <p><b>CheckIn:</b>{booking.fromdate}</p>
//                 <p><b>CheckOut:</b>{booking.todate}</p>
//                 <p><b>Status:</b>{booking.status == 'cancelled' ? (<Tag color="red">cancel</Tag>) :( <Tag color="green">booked</Tag>)}</p>
                
//                 {/* <div className='text-right'>

//                   <button className='btn btn-primary' onClick={()=>{cancelBooking(booking._id,booking.roomid)}}>CANCEL BOOOKING</button>
//                 </div> */}

//                 {booking.status !== 'cancelled' && (
//                  <div className='text-right'>

//                  <button className='btn btn-primary' onClick={()=>{cancelBooking(booking._id,booking.roomid)}}>CANCEL BOOOKING</button>
//                </div> 
//                 )}
                
//                 </div>
//             })}
//         </div>
//       </div>
//     </div>
//   );
// }

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2'; // Fix the import statement for SweetAlert2
import { Divider, Space, Tag } from 'antd';
const { TabPane } = Tabs;

function ProfileScreen() {
  // const user = JSON.parse(localStorage.getItem('currentUser'));
  const user = JSON.parse(localStorage.getItem('currentUser'));
console.log(user);

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="ml-3-mt-3">
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Profile" key="2">
        <div style={{marginLeft:"100px", border:"2px solid black", width:"500px", padding:"100px"}}>
       <h1 style={{textDecoration:"underline"}}>Profile</h1>
          <br />
         
          <h3><span>Name</span>: {user.name}</h3>
          {/* <h1>Email: {user.email}</h1> */}
          <h3><span>Email</span>: {user.isAdmin ? 'Yes' : 'No'}</h3>
       </div>
        </TabPane>
        <TabPane tab="Bookings" key="3">
          <MyBookings user={user} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileScreen;

export function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/api/booking/getbookingsbyuserid', {
          userid: user._id,
        });
        const rooms = response.data;
        console.log(rooms);
        setBookings(rooms);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, []);

  const cancelBooking = async (bookingid, roomid) => {
    try {
      setLoading(true);
      const result = await axios.post("http://localhost:5000/api/booking/cancelbooking", { bookingid, roomid });
      console.log(result);
      setLoading(false);

      // Use SweetAlert2 to show a success message and reload the page
      Swal.fire('Your booking is cancelled successfully').then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);

      // Use SweetAlert2 to show an error message
      Swal.fire('Something went wrong');
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {error && <Error error={error} />}
          {bookings &&
            bookings.map((booking) => {
              return <div className='bs'>
                <h1>{booking.room}</h1>
                <p><b>Booking:</b>{booking._id}</p>
                <p><b>CheckIn:</b>{booking.fromdate}</p>
                <p><b>CheckOut:</b>{booking.todate}</p>
                <p><b>Status:</b>{booking.status === 'cancelled' ? (<Tag color="green">booked</Tag>) : (<Tag color="red">cancel</Tag>)}
                </p>
                {booking.status !== 'cancelled' && (
                  <div className='text-right'>
                    <button className='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.roomid) }}>CANCEL BOOKING</button>
                  </div>
                )}
              </div>
            })}
        </div>
      </div>
    </div>
  );
}
