// const mongoose = require('mongoose')

// const roomSchema = mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     maxCount:{
//         type:Number,
//         required:true
//     },
//     phoneNumber:{
//         type:Number,
//         required:true
//     },
//     rentPerday:{
//         type:Number,
//         required:true
//     },
//     imageurls:[],
//     currentbookings:[],
//     type:{
//         type:String,
//         required:true

//     },
//     description:{
//       type:String,
//       required:true  
//     }

// },{
//     timestamps: true,
// })

// const roomModel = mongoose.model('rooms',roomSchema)
// module.exports = roomModel

// const mongoose = require('mongoose');

// const roomSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     maxcount: {
//         type: Number,
//         required: true
//     },
//     phonenumber: {
//         type: String,
//         required: true
//     },
//     // rentperday: {
//     //     type: Number,
//     //     required: true
//     // },
//     rentperday: {
//         type: Number,
//         required: true,
//         validate: {
//           validator: function(value) {
//             return !isNaN(value); // Check if the value is a number
//           },
//           message: 'Rent per day must be a number.',
//         },
//       },
//     imageurls: {
//         type: [String],
//         default: []
//     },
//     currentbookings: {
//         type: [Object],
//         default: []
//     },
//     type: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     }
// }, {
//     timestamps: true,
// });

// const roomModel = mongoose.model('rooms', roomSchema);
// module.exports = roomModel;


const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
    maxcount: {
        type: Number,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    rentperday: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return !isNaN(value); // Check if the value is a number
            },
            message: 'Rent per day must be a number.'
        },
    },
    imageurls: {
        type: [String],
        default: []
    },
    currentbookings: {
        type: [Object],
        default: []
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Room', roomSchema);

