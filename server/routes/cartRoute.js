const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const mongoose=require('mongoose')
const cart=require('../models/cart')


router.post('/addToCart', (req, res) => {
    const { roomid } = req.body;
    Room.findById(roomid)
        .then(roomss => {
            cart.create({
                name: roomss.name,
                maxcount:roomss.maxcount,
                description: roomss.description,
                price: roomss.price,
                image: roomss.image
            })
                .then(cartItem => res.json(cartItem))
                .catch(err => res.json(err));
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// router.get('/getcart/:id', (req, res) => {
//     const id = req.params.id;
//     cart.findById({ _id: id })
//         .then(result => res.json(result))
//         .catch(err => res.json(err));
// });

router.get('/getcart', (req, res) => {
    // const id = req.params.id;
    cart.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


router.delete('/deleteCart/:id',(req,res)=> {
    const {id}=req.params
    cartModel.findByIdAndDelete({_id:id})
    .then(result =>res.json(result))
    .catch(err =>res.json(err))
})

module.exports=router;

