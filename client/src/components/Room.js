import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { Link, useParams } from 'react-router-dom';

function Room({ room, fromdate, todate }) {
  const id=useParams()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

          <Link to={`cart/${room._id}`}>
            <Button variant="primary" style={{ backgroundColor: 'black', margin: '2px', color: 'white' }}>Add to Cart</Button>
          </Link>
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
