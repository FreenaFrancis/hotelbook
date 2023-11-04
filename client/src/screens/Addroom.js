// import React, { useState } from 'react';
// import axios from 'axios';

// function Addroom() {
//   const [room, setRoom] = useState('');
//   const [rentperday, setRentperday] = useState('');
//   const [maxcount, setMaxcount] = useState('');
//   const [description, setDescription] = useState('');
//   const [phonenumber, setPhonenumber] = useState('');
//   const [type, setType] = useState('');
//   const [image1, setImage1] = useState('');
//   const [image2, setImage2] = useState('');
//   const [image3, setImage3] = useState('');

//   const add = async () => {
//     const newroom = {
//       room,
//       rentperday,
//       maxcount,
//       description,
//       phonenumber,
//       type,
//       imageurls: [image1, image2, image3],
//     };

//     try {
//       const result = await axios.post('http://localhost:5000/api/rooms/addroom', newroom);
//       console.log(result.data); // Access data property of the response

//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className='row'>
//       <div className='col-md-5'>
//         <input type="text" className='form-control' placeholder='room name'
//           value={room} onChange={(e) => { setRoom(e.target.value) }}
//         />
//         <input type="text" className='form-control' placeholder='rent per day'
//           value={rentperday} onChange={(e) => { setRentperday(e.target.value) }}
//         />
//         <input type="text" className='form-control' placeholder='max count'
//           value={maxcount} onChange={(e) => { setMaxcount(e.target.value) }}
//         />
//         <input type="text" className='form-control' placeholder='description'
//           value={description} onChange={(e) => { setDescription(e.target.value) }}
//         />
//         <input type="text" className='form-control' placeholder='phone number'
//           value={phonenumber} onChange={(e) => { setPhonenumber(e.target.value) }}
//         />
//       </div>

//       <div className='col-md-5'>
//         <input type="text" className='form-control' placeholder='type'
//           value={type} onChange={(e) => { setType(e.target.value) }}
//         />
//         <input type="text" className='form-control' placeholder='image url-1'
//           value={image1} onChange={(e) => { setImage1(e.target.value) }}
//         />
//         <input type="text" className='form-control' placeholder='image url-2'
//           value={image2} onChange={(e) => { setImage2(e.target.value) }}
//         />
//         <input type="text" className='form-control' placeholder='image url-3'
//           value={image3} onChange={(e) => { setImage3(e.target.value) }}
//         />

//         <div className='text-right'>
//           <button className='btn btn-primary mt-2' onClick={add}>Add</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Addroom;



import React, { useState } from 'react';
import axios from 'axios';

function Addroom() {
  const [room, setRoom] = useState('');
  const [rentperday, setRentperday] = useState('');
  const [maxcount, setMaxcount] = useState('');
  const [description, setDescription] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [type, setType] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');

  const add = async () => {
    const newroom = {
      name: room,
      rentperday: rentperday,
      maxcount: maxcount,
      description: description,
      phonenumber: phonenumber,
      type: type,
      imageurls: [image1, image2, image3],
    };

    try {
      const result = await axios.post('http://localhost:5000/api/rooms/addroom', newroom);
      console.log(result.data); // Access data property of the response

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='row'>
      <div className='col-md-5'>
        <input type="text" className='form-control' placeholder='room name'
          value={room} onChange={(e) => { setRoom(e.target.value) }}
        />
        <input type="text" className='form-control' placeholder='rent per day'
          value={rentperday} onChange={(e) => { setRentperday(e.target.value) }}
        />
        <input type="text" className='form-control' placeholder='max count'
          value={maxcount} onChange={(e) => { setMaxcount(e.target.value) }}
        />
        <input type="text" className='form-control' placeholder='description'
          value={description} onChange={(e) => { setDescription(e.target.value) }}
        />
        <input type="text" className='form-control' placeholder='phone number'
          value={phonenumber} onChange={(e) => { setPhonenumber(e.target.value) }}
        />
      </div>

      <div className='col-md-5'>
        <input type="text" className='form-control' placeholder='type'
          value={type} onChange={(e) => { setType(e.target.value) }}
        />
        <input type="text" className='form-control' placeholder='image url-1'
          value={image1} onChange={(e) => { setImage1(e.target.value) }}
        />
        <input type="text" className='form-control' placeholder='image url-2'
          value={image2} onChange={(e) => { setImage2(e.target.value) }}
        />
        <input type="text" className='form-control' placeholder='image url-3'
          value={image3} onChange={(e) => { setImage3(e.target.value) }}
        />

        <div className='text-right'>
          <button className='btn btn-primary mt-2' onClick={add}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default Addroom;
