// // Room.js
// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Carousel from 'react-bootstrap/Carousel';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// function Room({ room, fromdate, todate }) {
//   const { roomid } = useParams();
//   const [show, setShow] = useState(false);
//   const [cartData, setCartData] = useState({
//     name: '',
//     maxcount: 0,
//     description: '',
//     price: 0,
//     image: '',
//   });
// const navigate=useNavigate();

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const addCart = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:5000/api/cart/addToCart', {
//       roomid: room._id,
//       name: room.name,
//       maxcount: room.maxcount,
//       description: room.description,
//       price: room.price,
//       image: room.imageurls[0], // Assuming the imageurls is an array, take the first image
//     })
//     .then(result => {
//       console.log(result);
//       navigate('/cart')
//       setCartData(result.data); // Optional: Store the added item in state if needed
//     })
//     .catch(err => console.log(err));
//   }
//   // const addCart = (e) => {
//   //   e.preventDefault();
//   //   axios.post('http://localhost:5000/api/cart/addToCart', {
//   //     roomid: room._id,
//   //     name: room.name,
//   //     maxcount: room.maxcount,
//   //     description: room.description,
//   //     price: room.price,
//   //     image: room.imageurls[0],
//   //   })
//   //   .then(result => {
//   //     console.log(result);
//   //     navigate(`/cart/${result.data._id}`); // Updated navigation to include the cart item id
//   //     setCartData(result.data);
//   //   })
//   //   .catch(err => console.log(err));
//   // }
  
//   return (
//     <div className='row bs'>
//       <div className='col-md-4'>
//         <img src={room.imageurls[0]} className='smallimg' alt='' />
//       </div>
//       <div className='col-md-7'>
//         <h1>{room.name}</h1>
//         <p>{room.maxcount}</p>
//         <p>Phone number: {room.phonenumber}</p>
//         <p>Type: {room.type}</p>
//         <div style={{ float: 'right' }}>
//           {(fromdate && todate) && (
//             <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
//               <Button variant="primary" className='m-2' style={{ backgroundColor: 'black', color: 'white' }}>Book Now</Button>
//             </Link>
//           )}
//           <Button variant="primary" style={{ backgroundColor: 'black', color: 'white' }} onClick={handleShow}>View Details</Button>
//           <Button variant="primary" style={{ backgroundColor: 'black', margin: '2px', color: 'white' }} onClick={addCart}>Add to Cart</Button>
//         </div>
//       </div>
//       {/* carousel view details */}
//       <Modal show={show} onHide={handleClose} size='lg'>
//         <Modal.Header closeButton>
//           <Modal.Title>{room.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Carousel prevLabel='' nextLabel=''>
//             {room.imageurls.map((url, index) => (
//               <Carousel.Item key={index}>
//                 <img className="d-block w-100 bigimg" src={url} alt={`Slide ${index + 1}`} />
//                 <Carousel.Caption>
//                   <h5>Image {index + 1} Label</h5>
//                   <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//                 </Carousel.Caption>
//               </Carousel.Item>
//             ))}
//           </Carousel>
//           <p>{room.description}</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default Room;

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Room({ room, fromdate, todate }) {
  const { roomid } = useParams();
  const [show, setShow] = useState(false);
  const [cartData, setCartData] = useState({
    name: '',
    maxcount: 0,
    description: '',
    price: 0,
    image: '',
  });
const navigate=useNavigate();
const {id}=useParams()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  
  const addCart = (roomid) => {
   
    axios.put('http://localhost:5000/api/cart/addToCart/'+id, {roomid})
    .then(result => {
      console.log(result);
      navigate('/cart/'+id)
      setCartData(result.data); // Optional: Store the added item in state if needed
    })
    .catch(err => console.log(err));
  }
  // const addCart = (e) => {
  //   e.preventDefault();
  //   axios.post('http://localhost:5000/api/cart/addToCart', {
  //     roomid: room._id,
  //     name: room.name,
  //     maxcount: room.maxcount,
  //     description: room.description,
  //     price: room.price,
  //     image: room.imageurls[0],
  //   })
  //   .then(result => {
  //     console.log(result);
  //     navigate(`/cart/${result.data._id}`); // Updated navigation to include the cart item id
  //     setCartData(result.data);
  //   })
  //   .catch(err => console.log(err));
  // }
  
  return (
    <div className='row bs'>
      <div className='col-md-4'>
        <img src={room.imageurls[0]} className='smallimg' alt='' />
      </div>
      <div className='col-md-7'>
        <h1>{room.name}</h1>
        <p>{room.maxcount}</p>
        <p>Phone number: {room.phonenumber}</p>
        <p>Type: {room.type}</p>
        <div style={{ float: 'right' }}>
          {(fromdate && todate) && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <Button variant="primary" className='m-2' style={{ backgroundColor: 'black', color: 'white' }}>Book Now</Button>
            </Link>
          )}
          <Button variant="primary" style={{ backgroundColor: 'black', color: 'white' }} onClick={handleShow}>View Details</Button>
          <Button variant="primary" style={{ backgroundColor: 'black', margin: '2px', color: 'white' }} onClick={()=>addCart(room._id)}>Add to Cart</Button>
          <Button variant="primary" style={{ backgroundColor: 'black', color: 'white' }} onClick={handleShow}>See availiabilty</Button>
        </div>
      </div>




      {/* carousel view details */}
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel='' nextLabel=''>
            {room.imageurls.map((url, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100 bigimg" src={url} alt={`Slide ${index + 1}`} />
                <Carousel.Caption>
                  <h5>Image {index + 1} Label</h5>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;