// const mongoose = require('mongoose')

// const userSchema=mongoose.Schema({

//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
    
//     isAdmin:{
//         type:Boolean,
//         default:false
//     },
//     cart:[{
//         bookId:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'Books'
//         }
//     }],
// },

// {
//     timestamps:true,
// })
// const userModel = mongoose.model('user', userSchema);
// module.exports = userModel;

const mongoose = require('mongoose')

const userSchema=mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
    isAdmin:{
        type:Boolean,
        default:false
    },
    cart: [{
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'rooms'
        },
    }]
},{
    timestamps:true,
})
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;