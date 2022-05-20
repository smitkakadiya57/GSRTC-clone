const mongoose = require("mongoose");
const validator=require("validator");



const checkEmail=(email)=>{
return validator.isEmail(email);
}

//schema of individual person
const personSchema = new mongoose.Schema({
  seatno: {
    type: String,
    required: true,  
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    max: 100,
  },
  gender: {
    type: String,
    required: true,
    maxlength: 7,
  },
});

//schema of passenger collection
const passengerSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  trip: {
    type: String,
    required: true,
  },
  mobileno: {
    type: String,
    // maxlength: 10,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // unique: true,
    required: true,
    // validate: [checkEmail, "invalid email"],
  },
  b_point: {
    type: String,
    required: true,
  },
  d_point: {
    type: String,
    required: true,
  },
  fare:{
    type:Number,
    required:true,
  },
  bookedseat: [personSchema],
});



// now we create collections
const passenger = new mongoose.model("passenger", passengerSchema);


const newPassenger=new passenger({
    date:"2022-03-22",
    trip:"GSRTC-9435",
    mobileno:"9014528822",
    email:"abc@xyz.com",
    b_point:"kalupr",
    d_point:"kamrej",
    fare:670,
    bookedseat:[
        {
            seatno:"A3",
            name:"prakash more",
            age:16,
            gender:"male",
        }
    ]

});

// newPassenger.save();

module.exports = passenger;