// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function AddCart() {
//   // const { cartId } = useParams();
//   const [room, setRoom] = useState(null);

//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/cart/getcart`);
        
//         console.log('API Response:', response.data); // Add this line
  
//         if (response.data) {
//           setRoom(response.data);
//         } else {
//           console.error('Room data not found.');
//         }
//       } catch (error) {
//         console.error('Error fetching room data:', error);
//       }
//     };
  
//     fetchCartData();
//   }, []);
  

//   return (
//     <div>
//       <div className='row bs'>
//         <div className='col-md-4'>
//           {/* Check if room.imageurls is available before rendering */}
//           {room.imageurls && room.imageurls.length > 0 && (
//             <img src={room.imageurls[0]} alt='' />
//           )}
//         </div>
//         <div className='col-md-7'>
//           {/* Add your content here */}
//           <h1>{room.name}</h1>
//           <p>{room.maxcount}</p>
//           <p>Phone number: {room.phonenumber}</p>
//           <p>Type: {room.type}</p>
//           <div style={{ float: 'right' }}>
//             {/* Add additional content if needed */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddCart;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AddCart() {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/getcart`);
        console.log('API Response:', response.data);

        if (response.data) {
          setRoom(response.data);
        } else {
          console.error('Room data not found.');
        }
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchCartData();
  }, []);

  // Check if room is null before accessing its properties
  if (!room) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className='row bs'style={{width:'400px', height:'200px', marginLeft:'100px'}}>
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
