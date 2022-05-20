
const mongoose = require("mongoose");


//schema of city collection
const citySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  stops: {
    type: Array,
    required: true,
  },
});



// now we create collections
const city = new mongoose.model("city", citySchema);


const newcity = new city(
//   {
//   city: "ahmedabad",
//   stops: ["kalupur", "kankariya", "CTM"],
// },

// {
//   city: "anand",
//   stops: ["ananad bus station", "samarakha chowkadi"]
// },

// {
//   city: "vadodara",
//   stops: ["baroda", "amit nagar","fatehganj","GSFC"]
// },
// {
//   city: "bharuch",
//   stops: ["jambusar by pass", "GNFC"],
// }
// ,
// {
//   city: "ankleshwar",
//   stops: ["ankleshwar GIDC","Rajpipla X"],
// },
// {
//   city: "surat",
//   stops: ["surat central bus station", "kamrej", "kapodra"],
// },
// {
//   city: "navsari",
//   stops: ["navsari bus station", "tata school"],
// },
{
  city: "vapi",
  stops: ["vapi X","vapi college"],
},
);

// const sci=newcity.save(); 

module.exports = city;
