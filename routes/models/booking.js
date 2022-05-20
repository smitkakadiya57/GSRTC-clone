
const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  trip: {
    type: String,
    required: true,
  },
  capacity:{
      type:Number,
      required:true,
  },
  booked:{
      type:Array,
  }
});

// now we create collections
const booking = new mongoose.model("booking", bookingSchema);

const newbooking = new booking(
  {
    date:"2022-03-22",
    trip:"GSRTC-9435",  
    capacity:45,
    booked:["A1","B1"]
  }
);

// const sci=newbooking.save(); 

module.exports = booking;
