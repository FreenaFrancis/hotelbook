const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  room: {
    type: String,
    required: true,
  },
  roomid: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: false,
  },
  fromdate: {
    type: String,
    required: true,
  },
  todate: {
    type: String,
    required: true,
  },
  totalamount: {
    type: Number,  // Changed to Number type
    required: true,
  },
  totaldays: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'booked',
  },
}, {
  timestamps: true,
});

const bookingModel = mongoose.model('Booking', bookingSchema);
module.exports = bookingModel;
