const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const roomRoute = require('./routes/roomRoute');
const userRoute = require('./routes/userRouter');
const bookingRoute = require('./routes/bookingRoute');
const cartRoute=require('./routes/cartRoute')
const app = express();


var mongoURI= 'mongodb+srv://freenafrancis2000:xqBRClyG9po3murZ@cluster0.ygk9lht.mongodb.net/'



mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connected to mongodbserver")
}).catch((error)=>{
    console.log("error connecting server");
})


app.use(express.json());
app.use(cors());
app.use('/api/rooms', roomRoute)
app.use('/api/users',userRoute)
app.use('/api/booking',bookingRoute)
app.use('/api/cart',cartRoute)

const port = process.env.PORT || 5000;


app.listen(port,()=> console.log ('server is running'))







