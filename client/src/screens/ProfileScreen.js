
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
import { Divider, Space, Tag } from 'antd';
import AddCart from '../components/AddCart';

const { TabPane } = Tabs;

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    } else {
      console.log(user); // Add this line to check the user object
    }
  }, []);

  return (
    <div className="ml-3-mt-3">
      <Tabs>
      <TabPane tab="Profile" key="2">
  <div style={{ marginLeft: "100px", border: "2px solid black", width: "500px", padding: "100px" }}>
    <h1 style={{ textDecoration: "underline" }}>Profile</h1>
    <br />
    <h3><span>Name</span>: {user.name}</h3>
    <h3><span>Email</span>: {user.email}</h3> {/* Corrected line */}
    <h3><span>Is Admin</span>: {user.isAdmin ? 'Yes' : 'No'}</h3>
  </div>
</TabPane>
        <TabPane tab="Bookings" key="3">
          <MyBookings user={user._id} />
        </TabPane>
        <TabPane tab="My Cart" key="4">
          <AddCart/>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileScreen;


// ///////////////////////////////Bookings view//////////////////////////////////////////////////

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

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
        setBookings(rooms);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, [user._id]);

  const cancelBooking = async (bookingid, roomid) => {
    try {
      setLoading(true);
      const result = await axios.post("http://localhost:5000/api/booking/cancelbooking", { bookingid, roomid });
      console.log(result);
      setLoading(false);

      Swal.fire('Your booking is cancelled successfully').then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log("Error cancelling booking:", error.response);
      setLoading(false);

      Swal.fire('Something went wrong');
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {error && <Error error={error} />}
          {bookings &&
            bookings.map((booking) => (
              <div className='bs' key={booking._id}>
                <h1>{booking.room}</h1>
                <p><b>Booking:</b>{booking._id}</p>
                <p><b>CheckIn:</b>{booking.fromdate}</p>
                <p><b>CheckOut:</b>{booking.todate}</p>
                <p><b>Status:</b>{booking.status === 'cancelled' ? (<Tag color="red">cancel</Tag>) : (<Tag color="green">success</Tag>)}</p>
                {booking.status !== 'cancelled' && (
                  <div className='text-right'>
                    <button className='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.roomid) }}>CANCEL BOOKING</button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
