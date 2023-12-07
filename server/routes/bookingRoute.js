


const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room'); // Import the Room model
const stripe = require('stripe')('sk_test_51OBAMTSF4g5RXY8R109y4Lxae4DZvZwvPib7wzpVES6n07mbONZSCIs77BcbI4v3nIxTP8InV7cr2DHoXy2JlBRD00PsIRqJF5')
const { v4: uuidv4 } = require('uuid');








// /////////////////////////////////////bookroom/////////////////////////////////
// Inside your router.post('/bookroom', async (req, res) => { ... } block
router.post('/bookroom', async (req, res) => {
  const { room, roomid, fromdate, todate, totalamount, totaldays, token, rentperday } = req.body;
  console.log('Request Body:', req.body);

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.paymentIntents.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: 'inr',
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const currentUser = req.user; // Assuming you use Passport or some other authentication middleware
      const userid = currentUser ? currentUser._id : null;

      // Convert totalamount to a number
      const parsedTotalAmount = parseFloat(totalamount);

      // Create a new booking
      const newBooking = new Booking({
        room: room.name, // Use room instead of room.name
        roomid: roomid,
        userid: userid,
        fromdate: fromdate,
        todate: todate,
        totalamount: parsedTotalAmount, // Assign parsed totalamount
        totaldays: totaldays,
        transactionId: payment.id,
        status: 'Booked', // Define the booking status
      });

      // Save the new booking to the database
      const booking = await newBooking.save();

      // Update the currentbookings array in the room
      const roomTemp = await Room.findOne({ _id: roomid }); // Use roomid to find the room
      roomTemp.currentbookings.push({
        bookingid: booking._id,
        fromdate: fromdate,
        todate: todate,
        userid: userid, // Corrected to userid
        rentperday: rentperday,
        status: booking.status,
      });

      await roomTemp.save(); // You missed () for the save function

      res.send('payment successful, your room is booked');
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});




// //////////////////////////////////getbooking by userid/////////////////////////////////////////////////////////////////////

// router.post('/getbookingsbyuserid', async (req, res) => {
//   const userid = req.body.userid;
//   try {
//     const bookings = await Booking.find({ userid: userid });
//     res.send(bookings);
//   } catch (error) {
//     console.error('Error retrieving bookings:', error);
//     res.status(500).json({ error: 'An error occurred while retrieving bookings' });
//   }
// });


// getbookingsbyuserid route
// getbookingsbyuserid route
// router.post('/getbookingsbyuserid', async (req, res) => {
//   const userid = req.body.userid;
//   try {
//     const bookings = await Booking.find({ userid: userid });
//     const bookingsWithRoomDetails = await Promise.all(
//       bookings.map(async (booking) => {
//         console.log('Booking Room ID:', booking.roomid);
//         const room = await Room.findOne({ _id: booking.roomid });
//         return {
//           ...booking.toObject(),
//           room: room ? room.name : 'Room Not Found',
//         };
//       })
//     );
//     res.send(bookingsWithRoomDetails);
//   } catch (error) {
//     console.error('Error retrieving bookings:', error);
//     res.status(500).json({ error: 'An error occurred while retrieving bookings' });
//   }
// });

router.post('/getbookingsbyuserid', async (req, res) => {
  const userid = req.params.userid;
  try {
    const bookings = await Booking.find({ userid: userid });
    const bookingsWithRoomDetails = await Promise.all(
      bookings.map(async (booking) => {
        console.log('Booking Room ID:', booking.roomid);
        const room = await Room.findOne({ _id: booking.roomid });
        return {
          ...booking.toObject(),
          room: room ? room.name : 'Room Not Found',
        };
      })
    );
    res.send(bookingsWithRoomDetails);
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ error: 'An error occurred while retrieving bookings' });
  }
});





// ////////////////////////cancelbooking///////////////////////////
router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    // Find the booking by ID and update its status to 'cancelled'
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: bookingid },
      { $set: { status: 'cancelled' } },
      { new: true } // This option returns the modified document
    );

    if (!updatedBooking) {
      // If the booking is not found, return an error response
      return res.status(404).send({ error: 'Booking not found' });
    }

    // Find the room by ID
    const room = await Room.findOne({ _id: roomid });

    // Filter out the cancelled booking from currentbookings
    room.currentbookings = room.currentbookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );

    // Save the updated room
    await room.save();

    // Respond with a success message
    res.send('Your booking is cancelled');
  } catch (error) {
    // Handle errors and respond with an error message
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


// router.post("/cancelbooking",async(req,res)=>{
//   const {bookingid,roomid}=req.body;
//   try{
// const bookingitem = await Booking.findOne({_id:bookingid}) 
// bookingitem.status='cancelled'
// await bookingitem.save()
// const  room= await Room.findOne({_id:roomid})
// const bookings=room.currentbookings
// const temp = bookings.filter(booking=>booking.bookingid.toString()!==bookingid)
// room.currentbookings=temp;
// await room.save()

// res.send('your booking send successfully')
//   }catch(error){
// return res.status(400).json({error})
//   }
// })


/////////////////////////////////getallbooking///////////////////////////////////////////////////////////////

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
});




module.exports = router;



