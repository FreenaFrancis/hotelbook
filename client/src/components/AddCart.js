import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AddCart() {
  const { id } = useParams(); // Destructure 'id' from the object returned by useParams
  const [room, setRoom] = useState({
    name: '',
    maxcount: 0,
    phonenumber: '',
    type: '',
    imageurls: [],
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/rooms/getroomsbyId/${id}`)
      .then(response => {
        // Assuming the response.data contains room information
        setRoom(response.data); // Ensure that response.data is not null or undefined
      })
      .catch(error => {
        console.error('Error fetching room data:', error);
      });
  }, [id]); // Include 'id' in the dependency array to re-run the effect when 'id' changes

  // Check if room is null or undefined
  if (!room) {
    return <p>Loading...</p>; // or any other loading indicator
  }

  return (
    <div>
      <div className='row bs'>
        <div className='col-md-4'>
          {/* Check if room.imageurls is available before rendering */}
          {room.imageurls && room.imageurls.length > 0 && (
            <img src={room.imageurls[0]} alt='' />
          )}
        </div>
        <div className='col-md-7'>
          {/* Add your content here */}
          <h1>{room.name}</h1>
          <p>{room.maxcount}</p>
          <p>Phone number: {room.phonenumber}</p>
          <p>Type: {room.type}</p>
          <div style={{ float: 'right' }}>
            {/* Add additional content if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCart;
