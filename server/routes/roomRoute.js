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

module.exports = router;
