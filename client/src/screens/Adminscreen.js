import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs } from 'antd';
import Rooms from './Rooms';
import Users from './Users';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Addroom from './Addroom';

const { TabPane } = Tabs;

function Adminscreen() {
  // useEffect(() => {
  //   if (!JSON.parse(localStorage.getItem('currentUser')).isAdmin) {
  //     window.location.href = '/home';
  //   }
  // }, []);

  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center">Admin Panel</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add room" key="3">
          <Addroom/>
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/booking/getallbookings');
        const data = response.data;
        setBookings(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Bookings</h1>
        {loading && <Loader />}
        <table className='table table-bordered table-dark'>
          <thead className='bs'>
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 && bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.userid}</td>
                <td>{booking.room}</td>
                <td>{booking.fromdate}</td>
                <td>{booking.todate}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && <Error error={error} /> /* Render error message if there's an error */}
      </div>
    </div>
  );
}
