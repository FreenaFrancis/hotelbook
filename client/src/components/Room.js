import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import {Link} from 'react-router-dom'


function Room({ room, fromdate,todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='row bs'>
      <div className='col-md-4'>
        <img src={room.imageurls[0]} className='smallimg' alt='' />
      </div>
      <div className='col-md-7 '>
        {/* Add your content here */}
       <h1>{room.name}</h1>
       <p>{room.maxcount}</p>
       <p>phone number{room.phonenumber}</p>
       <p>Type:{room.type}</p>
       <div style={{float:'right'}}>

{
  (fromdate && todate)&&(
    <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
       <button btn-btn-primary m-2 style={{backgroundColor:'black', color:'white'}} >Book Now</button>
       </Link>
  )
}

        
        <button btn-btn-primary style={{backgroundColor:'black', color:'white'}} onClick={handleShow}>View deatils</button>
       </div>
      </div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
       
        <Carousel prevLabel='' nextLabel=''>
       {room.imageurls.map(url=>{
        return  <Carousel.Item>
        <img
          className="d-block w-100 bigimg"
          src={url}
          
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
       })}
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

