import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateRoom() {
  const { id } = useParams();

  const [room, setRoom] = useState('');
  const [rentperday, setRentperday] = useState('');
  const [maxcount, setMaxcount] = useState('');
  const [description, setDescription] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [type, setType] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
const navigate=useNavigate()
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rooms/roomid/${id}`);
        const roomData = response.data; // Assuming your API returns the room details
        setRoom(roomData.name);
        setRentperday(roomData.rentperday);
        setMaxcount(roomData.maxcount);
        setDescription(roomData.description);
        setPhonenumber(roomData.phonenumber);
        setType(roomData.type);
        setImage1(roomData.imageurls[0]);
        setImage2(roomData.imageurls[1]);
        setImage3(roomData.imageurls[2]);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRoomData();
  }, [id]);

  const updateRoom = async () => {
    const updatedRoom = {
      name: room,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [image1, image2, image3],
    };

    try {
      const result = await axios.put(`http://localhost:5000/api/rooms/updateRoom/${id}`, updatedRoom);
      console.log(result.data.data);
       // Access data property of the response
       navigate('/admin')
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className='row'>
      <div className='col-md-5'>
        <input
          type="text"
          className='form-control'
          placeholder='room name'
          value={room}
          onChange={(e) => { setRoom(e.target.value) }}
        />
        <input
          type="text"
          className='form-control'
          placeholder='rent per day'
          value={rentperday}
          onChange={(e) => { setRentperday(e.target.value) }}
        />
        <input
          type="text"
          className='form-control'
          placeholder='max count'
          value={maxcount}
          onChange={(e) => { setMaxcount(e.target.value) }}
        />
        <input
          type="text"
          className='form-control'
          placeholder='description'
          value={description}
          onChange={(e) => { setDescription(e.target.value) }}
        />
        <input
          type="text"
          className='form-control'
          placeholder='phone number'
          value={phonenumber}
          onChange={(e) => { setPhonenumber(e.target.value) }}
        />
      </div>

      <div className='col-md-5'>
        <input
          type="text"
          className='form-control'
          placeholder='type'
          value={type}
          onChange={(e) => { setType(e.target.value) }}
        />
        <input
          type="text"
          className='form-control'
          placeholder='image url-1'
          value={image1}
          onChange={(e) => { setImage1(e.target.value) }}
        />
        <input
          type="text"
          className='form-control'
          placeholder='image url-2'
          value={image2}
          onChange={(e) => { setImage2(e.target.value) }}
        />
        <input
          type="text"
          className='form-control'
          placeholder='image url-3'
          value={image3}
          onChange={(e) => { setImage3(e.target.value) }}
        />

        <div className='text-right'>
          <button className='btn btn-primary mt-2' onClick={updateRoom}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateRoom;
