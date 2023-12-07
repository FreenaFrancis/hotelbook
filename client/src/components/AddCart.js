

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Button from 'react-bootstrap/esm/Button';

// function AddCart() {
//   const [roomss, setRoomss] = useState(null);

//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/cart/getcart`)
        
//         console.log('API Response:', response.data);

//         if (response.data) {
//           setRoomss(response.data);
//         } else {
//           console.error('Room data not found.');
//         }
//       } catch (error) {
//         console.error('Error fetching room data:', error);
//       }
//     };

//     fetchCartData();
//   }, []);

//   // Check if roomss is null before accessing its properties
//   if (!roomss) {
//     return <p>Loading...</p>;
//   }

//   const deleteCart = () => {
//     const id = roomss._id; // Assuming _id is the correct identifier for the cart item
  
//     axios.delete(`http://localhost:5000/api/cart/deleteCart/${id}`)
//       .then(res => {
//         console.log(res);
//         // You may want to fetch the cart data again after deletion
//         // This is just an example, adjust as needed
//         setRoomss(null);
//       })
//       .catch(err => console.log(err));
//   };

  

//   return (
//     <div>
//       <div className='row bs' style={{ width: '400px', height: '400px', marginLeft: '100px' }}>
//         <div className='col-md-4'>
//           {/* Check if roomss.imageurls is available before rendering */}
//           {/* // Check if roomss.imageurls is available before rendering */}
// {roomss.imageurls && roomss.imageurls.length > 0 && (
//   <img src={roomss.imageurls[0]} alt='' />
// )}
// {/* Add your content here */}
// <h1>{roomss.name}</h1>
// <p>Max Count: {roomss.maxcount}</p>
// <p>Phone number: {roomss.phonenumber}</p>
// <p>Type: {roomss.type}</p>

//           <div style={{ float: 'right' }}>
//             {/* Add additional content if needed */}
//             <Button variant="primary" style={{ backgroundColor: 'black', margin: '2px', color: 'white' }} onClick={deleteCart}>Remove Cart</Button>
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
import { useParams } from 'react-router-dom';

function AddCart() {
  const [roomss, setRoomss] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/getcart/${id}`);
        console.log('API Response:', response.data);

        if (response.data && response.data.cart) {
          setRoomss(response.data.cart);
        } else {
          console.error('Cart data not found.');
          setRoomss(null); // Set roomss to null to handle the case where cart data is not found
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setRoomss(null); // Set roomss to null in case of an error
      }
    };

    fetchCartData();
  }, [id]);

  // Check if roomss is null before accessing its properties
  if (!roomss) {
    return <p>Loading...</p>;
  }

  const deleteCart = (cartId) => {
    console.log('Deleting cart with ID:', cartId);
  
    axios.delete(`http://localhost:5000/api/cart/deleteCart/${id}/${cartId}`)
      .then(res => {
        console.log(res.data.message);
        setRoomss(res.data.updatedCart);
      })
      .catch(err => console.error(err));
  };
  

  return (
    <div>
      {
        roomss.map((values, index) => (
          <div className='row bs' style={{ width: '500px', height: '500px', marginLeft: '100px' }} key={index}>
            <div className='col-md-6'>
              {values.imageurls && values.imageurls.length > 0 && (
                <img src={values.imageurls[0]} alt='' width={'400px'} height={'200px'} />
              )}
              <h4> {values.name}</h4>
              <p>Max Count: {values.maxcount}</p>
              <p>Phone number: {values.phonenumber}</p>
              <p>Type: {values.type}</p>
              <div style={{ float: 'right' }}>
              <Button
  variant="primary"
  style={{ backgroundColor: 'black', margin: '2px', color: 'white' }}
  onClick={() => deleteCart(values._id)}  
>
  Remove Cart
</Button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default AddCart;