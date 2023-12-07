// const express = require('express');
// const router = express.Router();
// const Room = require('../models/room');
// const mongoose=require('mongoose')
// const cart=require('../models/cart')


// router.post('/addToCart', (req, res) => {
//     const { roomid } = req.body;
//     Room.findById(roomid)
//         .then(roomss => {
//             cart.create({
//                 name: roomss.name,
//                 maxcount:roomss.maxcount,
//                 description: roomss.description,
//                 price: roomss.price,
//                 image: roomss.image
//             })
//                 .then(cartItem => res.json(cartItem))
//                 .catch(err => res.json(err));
//         })
//         .catch(err => res.status(500).json({ error: err.message }));
// });

// // router.get('/getcart/:id', (req, res) => {
// //     const id = req.params.id;
// //     cart.findById({ _id: id })
// //         .then(result => res.json(result))
// //         .catch(err => res.json(err));
// // });

// router.get('/getcart', async (req, res) => {
//     try {
//       const cartItems = await cart.find();
//       res.json(cartItems);
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });


// // router.get('/getcart/:roomid', async (req, res) => {
// //   const roomid=req.params.id;
// //   try {
// //     const cartItems = await cart.findById({_id:roomid});
// //     res.json(cartItems);
// //   } catch (error) {
// //     console.error('Error fetching cart items:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // });
  


//   router.delete('/deleteCart/:id', (req, res) => {
//     const { id } = req.params;

//     cart.findByIdAndDelete({ _id: id })
//         .then(result => res.json(result))
//         .catch(err => res.json(err));
// });


// module.exports=router;


const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const mongoose=require('mongoose')
const cart=require('../models/cart')
const User = require('../models/user');

router.put('/addToCart/:id', (req, res) => {
  const { id } = req.params;
  const { roomid } = req.body;

  User.findById(id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Fix: Change bookId to roomid
      const existingCartItem = user.cart.find(item => item.roomId.toString() === roomid.toString());

      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        user.cart.push({ roomId: roomid });
      }

      // Save the updated user document
      user.save()
        .then(result => res.json(result))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});


router.get('/getcart/:id', async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id)
      .populate({
        path: 'cart.roomId',
        model: 'Room', // Assuming your room model is named 'Room'
        select: 'name maxcount phonenumber rentperday imageurls currentbookings description type'
      });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(user); // Log the user object to inspect its structure

    const populatedCart = user.cart.map(item => ({
      // Extract the properties you need from the populated room object
      roomId: item.roomId._id,
      name: item.roomId.name,
      maxcount: item.roomId.maxcount,
      phonenumber: item.roomId.phonenumber,
      rentperday: item.roomId.rentperday,
      imageurls: item.roomId.imageurls,
      currentbookings: item.roomId.currentbookings,
      description: item.roomId.description,
      type: item.roomId.type
    }));

    res.json({ cart: populatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




//   router.delete('/deleteCart/:id', (req, res) => {
//     const { id } = req.params;

//     cart.findByIdAndDelete({ _id: id })
//         .then(result => res.json(result))
//         .catch(err => res.json(err));
// });


router.delete('/deleteCart/:id/:cartId', async (req, res) => {
  const { id, cartId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { $pull: { cart: { _id: cartId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Item removed from cart successfully', updatedCart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports=router;
