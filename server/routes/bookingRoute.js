// // Example server-side code for /api/booking/bookroom

// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/booking');
// const Room =require('../models/room')


// router.post('/bookroom', async (req, res) => {
//   const { room, roomid, userid, fromdate, todate, totalamount, totaldays } = req.body;
//   console.log('Request Body:', req.body);
//   try {
//     // Convert totalamount to a number
//     const parsedTotalAmount = parseFloat(totalamount);

//     // Create a new booking
//     const newBooking = new Booking({
//       room: room.name,
//       roomid: room._id,
//        userid,
//       fromdate,
//       todate,
//       totalamount: parsedTotalAmount,  // Assign parsed totalamount
//       totaldays,
//       transactionId: '1234',
//     });

//     // Save the new booking to the database
//     const booking = await newBooking.save();
//     const roomTemp= await Room.findOne({_id:room._id})
//    roomTemp.currentbookings.push({bookingid: booking._id,
//     fromdate:fromdate,
//     todate:todate,
//      userid:user._id,
//     status: booking.status
//   })

//   await roomTemp.save
//     res.status(201).json({ message: 'Booking successful' });
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     res.status(500).json({ error: 'An error occurred while booking the room' });
//   }
// });

// router.post('/getbookingsbyuserid',async(req,res)=>{
//   const userid = req.body.userid
// try{
//   const bookings = await Booking.find({userid: userid})
//   res.send(bookings)
// }catch(error){
//   return res.status(400).json({error})
// }

// })

// module.exports = router;


const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room'); // Import the Room model
const stripe = require('stripe') ('sk_test_51OBAMTSF4g5RXY8R109y4Lxae4DZvZwvPib7wzpVES6n07mbONZSCIs77BcbI4v3nIxTP8InV7cr2DHoXy2JlBRD00PsIRqJF5')
const { v4: uuidv4 } = require('uuid');







// /////////////////////////////////////bookroom/////////////////////////////////
router.post('/bookroom', async (req, res) => {
  const { room, roomid, userid, fromdate, todate, totalamount, totaldays,token,rentperday } = req.body;
  console.log('Request Body:', req.body);

 try{
  const customer= await stripe.customers.create({
    email:token.email,
    source:token.id
  })

  const payment = await stripe.charges.create({
  
   amount : totalamount*100,
   customer:customer.id,
   currency:'inr',
   receipt_email:token.email
   
  },
  {
    idempotencyKey: uuidv4(),
  }
  );

if(payment){

  
    // Convert totalamount to a number
    const parsedTotalAmount = parseFloat(totalamount);

    // Create a new booking
    const newBooking = new Booking({
      room: room, // Use room instead of room.name
      roomid: roomid,
      userid: userid,
      fromdate: fromdate,
      todate: todate,
      totalamount: parsedTotalAmount, // Assign parsed totalamount
      totaldays: totaldays,
      // transactionId: '123',
      transactionId:payment.id,
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
      rentperday:rentperday,
      status: booking.status,
    });

    await roomTemp.save(); // You missed () for the save function   

}
res.send('payment successful, your room is booked')
 }catch(error){
return res.status(400).json({error})
 }
});


// //////////////////////////////////getbooking by userid/////////////////////////////////////////////////////////////////////

router.post('/getbookingsbyuserid', async (req, res) => {
  const userid = req.body.userid;
  try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ error: 'An error occurred while retrieving bookings' });
  }
});


// ////////////////////////cancelbooking///////////////////////////
router.post("/cancelbooking",async(req,res)=>{
  const {bookingid, roomid} = req.body
  try{
const bookingitem = await Booking.findOne({_id:bookingid})
bookingitem.status='cancelled';
await bookingitem.save()
const room = await Room.findOne({_id:roomid})  
const bookings = room.currentbookings
const temp= bookings.filter(booking=> booking.bookingid.toString()!==bookingid) 
room.currentbookings=temp
await room.save()

res.send('your booking is cancelled')
}catch(error){
res.send(error)
  }
})

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

