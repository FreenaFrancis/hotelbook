import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await (await axios.get('http://localhost:5000/api/rooms/getallRooms')).data;
        setRooms(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-10">
          <h1>Rooms</h1>
          {loading && <Loader />}
          <table className='table table-bordered table-dark'>
            <thead className='bs'>
              <tr>
                <th>Room Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent per day</th>
                <th>Max count</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length > 0 && (rooms.map(room => {
                return (
                  <tr key={room._id}> {/* Add a key prop for each row */}
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
          {error && <Error error={error} />}
        </div>
      </div>
    </div>
  );
}

export default Rooms;
