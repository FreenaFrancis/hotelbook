// const express = require('express');
// const router = express.Router();

// const Room = require('../models/room');

// // Get all rooms
// router.get('/getallRooms', async (req, res) => {
//     try {
//         const rooms = await Room.find({});
//         return res.json(rooms);
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// });

// // Get a room by ID
// router.post('/getroombyid', async (req, res) => {
//     const roomid = req.body.roomid;

//     try {
//         const room = await Room.findOne({ _id: roomid });
//         if (!room) {
//             return res.status(404).json({ message: 'Room not found' });
//         }
//         return res.json(room);
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// });

// // Create a new room
// router.post('/createRooms', async (req, res) => {
//     try {
//         const newRoom = await Room.create(req.body);
//         return res.status(201).json(newRoom); // 201 Created
//     } catch (error) {
//         return res.status(400).json({ message: 'Bad request', error: error.message });
//     }
// });

// // Add a new room
// router.post('/addroom', async (req, res) => {
//     try {
//         const newroom = new Room(req.body);
//         await newroom.save();
//         return res.status(201).json({ message: 'New room added successfully' }); // 201 Created
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ message: 'Bad request', error: error.message });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const mongoose=require('mongoose')
const cart=require('../models/cart')
// Get all rooms
router.get('/getallRooms', async (req, res) => {
    try {
        const rooms = await Room.find({});
        return res.json(rooms);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});


// Get a room by ID
router.post('/getroombyid', async (req, res) => {
    const roomid = req.body.roomid;

    try {
        const room = await Room.findOne({ _id: roomid });
        return res.json(room);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Create a new room
router.post('/createRooms', async (req, res) => {
    try {
        const newRoom = await Room.create(req.body);
        return res.json(newRoom);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Add a new room
router.post('/addroom', async (req, res) => {
    try {
        const newroom = new Room(req.body);
        await newroom.save();
        return res.json({ message: 'New room added successfully' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
});


// router.post('/getroomid', async (req, res) => {
//     const roomid = req.body.roomid;

//     try {
//         const room = await Room.findBYId({ _id: roomid,maxxount,phonenumber,imageurls,description });
//         return res.json(room);
//     } catch (error) {
//         return res.status(400).json({ message: error.message });
//     }
// });

// Assuming you have something like this in your Express backend
router.get('/getCart/:id', async (req, res) => {
  const roomid = req.params.id;
  console.log('Room ID:', roomid);
  
  try {
      const objectId = mongoose.Types.ObjectId(roomid);
      console.log('ObjectId:', objectId);
  
      const room = await Room.findById(objectId);
      console.log('Room:', room);
  
      return res.json(room);
  } catch (error) {
      console.error('Error:', error);
      return res.status(400).json({ message: error.message });
  }
})

  // router.post('/cart', async (req, res) => {
  //   const roomid = req.body.roomid;
  
  //   try {
  //     const room = await Room.findById(roomid);
  //     return res.json(room);
  //   } catch (error) {
  //     return res.status(400).json({ message: error.message });
  //   }
  // });


  router.delete('/deleteRoom/:id', (req, res) => {
    const id = req.params.id; // Use the same parameter name as in the route
    Room.findByIdAndDelete({ _id: id })
      .then(result => res.json(result))
      .catch(err => res.json(err));
  });
  

  router.put('/updateRoom/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const updatedRoom = await Room.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      res.json(updatedRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.get('/roomid/:id', (req,res)=>{
    const id = req.params.id;
    Room.findById({_id:id})
    .then(users => res.json(users))
    .catch(err=> res.json(err))
}),

  
module.exports = router;
