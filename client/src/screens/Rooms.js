import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { Link } from 'react-router-dom';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await axios.get('http://localhost:5000/api/rooms/getallRooms');
      setRooms(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/rooms/deleteRoom/${id}`);
      // After deletion, fetch the updated room list
      fetchData();
      // window.location.reload()
      window.alert('Room deleted successfully!');
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };


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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length > 0 && rooms.map(room => (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>{room.rentperday}</td>
                  <td>{room.maxcount}</td>
                  <td>{room.phonenumber}</td>
                  <td>
                  <Link to={`update/${room._id}`}>
  <button>Update</button>
</Link>

                    <button onClick={() => handleDelete(room._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {error && <Error error={error} />}
        </div>
      </div>
    </div>
  );
}

export default Rooms;
