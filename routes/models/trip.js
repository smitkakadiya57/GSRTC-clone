
const mongoose = require("mongoose");


const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  time: 
{
  hr:{
    type:Number,
    required:true,
    min:0,
    max:23
  },
  min:{
    type:Number,
    required:true,
    min:0,
    max:59
  }
},
});

const tripSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  bus: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  capacity:{
    type:Number,
    required:true,
  },
  fare_factor:{
    type:Number,
    required:true,
  },
  class:{
type:String,
required:true,
  },
  place: [placeSchema],
});

// now we create collections
const trip = new mongoose.model("trip", tripSchema);



const newtrip = new trip({
  code: "GSRTC-8890",
  bus:"Sleeper",
  rating:4,
  capacity:45,
  fare_factor:1.8,
  class:"sleeper",
  place: [
    {
      name: "Surat",
      distance: 0,
      time: {hr:9,min:30},
    },
    {
      name: "Ankleshwar",
      distance: 77,
      time: {hr:11,min:15},
    },
    {
      name: "Bharuch",
      distance: 111,
      time: {hr:12,min:15},
    },
    {
      name: "Ahmedabad",
      distance: 192,
      time: {hr:14,min:5},
    },
    
   
  ],
});

// const ssaved = newtrip.save();


module.exports = trip;

