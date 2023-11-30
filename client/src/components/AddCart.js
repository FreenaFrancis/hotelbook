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
import Button from 'react-bootstrap/esm/Button';

function AddCart() {
  const [roomss, setRoomss] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/getcart`);
        console.log('API Response:', response.data);

        if (response.data) {
          setRoomss(response.data);
        } else {
          console.error('Room data not found.');
        }
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchCartData();
  }, []);

  // Check if roomss is null before accessing its properties
  if (!roomss) {
    return <p>Loading...</p>;
  }

  const deleteCart = () => {
    const id = roomss._id; // Assuming _id is the correct identifier for the cart item
  
    axios.delete(`http://localhost:5000/api/cart/deleteCart/${id}`)
      .then(res => {
        console.log(res);
        // You may want to fetch the cart data again after deletion
        // This is just an example, adjust as needed
        setRoomss(null);
      })
      .catch(err => console.log(err));
  };
  

  return (
    <div>
      <div className='row bs' style={{ width: '400px', height: '400px', marginLeft: '100px' }}>
        <div className='col-md-4'>
          {/* Check if roomss.imageurls is available before rendering */}
          {/* // Check if roomss.imageurls is available before rendering */}
{roomss.imageurls && roomss.imageurls.length > 0 && (
  <img src={roomss.imageurls[0]} alt='' />
)}
{/* Add your content here */}
<h1>{roomss.name}</h1>
<p>Max Count: {roomss.maxcount}</p>
<p>Phone number: {roomss.phonenumber}</p>
<p>Type: {roomss.type}</p>

          <div style={{ float: 'right' }}>
            {/* Add additional content if needed */}
            <Button variant="primary" style={{ backgroundColor: 'black', margin: '2px', color: 'white' }} onClick={deleteCart}>Remove Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCart;
