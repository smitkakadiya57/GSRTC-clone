const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
var cookieparser = require("cookie-parser");

require("../routes/db/conn");

const exp_guj = require("../routes/layout/exp_guj");
const sleeper = require("../routes/layout/sleeper");
const volvo = require("../routes/layout/volvo");

const trip = require("./models/trip");
const city = require("./models/city");
const booking = require("./models/booking");
const passenger = require("./models/passenger");

var Publishable_Key =
  "pk_bCs55k2NyOs00LiEKttvm";
var Secret_Key =
  "i3";

const stripe = require("stripe")(Secret_Key);

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname, "../public");

app.use(express.json());

app.use(express.static(staticPath));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  // find the all cities from database
  let citylist = await city.find();

  res.render("home", {
    citylist,
  });
});

//------------> important functions that will use in seat page <-------------------

// => function to get ind from place sub array
const getind = (source, trip) => {
  return trip.place.findIndex((element) => element.name === source);
};

//=> function that will calculate fare according to class
const getfare = (start, end, farefactor, trip) => {
  let i = trip.place[start].distance;
  let j = trip.place[end].distance;
  return parseInt((j - i) * farefactor);
};

//=> get duration of trip
const getduration = (shr, smin, dhr, dmin) => {
  if (smin > dmin) {
    dmin += 60;
    --dhr;
  }

  let min = dmin - smin;
  if (min < 10) {
    min = "0" + min;
  }
  let hr = dhr - shr;

  return [hr, min];
};

//=> get available seat
const getavailableseat = async (date, trip_code) => {
  try {
    let availableseat = await booking.find({
      $and: [{ date: date }, { trip: trip_code }],
    });

    let result = await trip.find({ code: trip_code }, { _id: 0, capacity: 1 });

    if (availableseat.length > 0) {
      let final = availableseat[0].capacity - availableseat[0].booked.length;

      return final;
    } else if (result.length == 1) {
      let result = await trip.find(
        { code: trip_code },
        { _id: 0, capacity: 1 }
      );
      return result[0].capacity;
    } else {
      return 0;
    }
  } catch (err) {
    console.log(err);
  }
};

//=> display the stop list

const getstop = async (loc) => {
  let result = await city.find({ city: loc }, { stops: 1, _id: 0 });

  return result[0].stops;
};

//=> get booked seat list
const get_book = async (date, trip_code) => {
  let d = [];
  let result = await booking.find(
    {
      $and: [{ date: date }, { trip: trip_code }],
    },
    { booked: 1 }
  );
  if (result.length == 0) {
    return d;
  } else {
    return result[0].booked;
  }
};

let send_trips = [];

app.post("/seat", urlencodedParser, async (req, res) => {
  //common sorce, destination and date
  const source = req.body.source;
  const des = req.body.des;
  const date = req.body.date;

  // function that find available trip
  // it will return array of object
  let availabletrip = await trip.find({
    $and: [{ "place.name": source }, { "place.name": des }],
  });

  // get array
  //  console.log(availabletrip);

  if (availabletrip.length > 0) {
    //creating a new array of object that contain informTION for present on our webpage

    // let send_trips = [];

    let j = 0;

    for (let i = 0; i < availabletrip.length; i++) {
      let sind = getind(source, availabletrip[i]);
      let dind = getind(des, availabletrip[i]);

      if (sind < dind) {
        console.log(`trip ${i} sind ${sind}  dind${dind} `);

        let code = availabletrip[i].code;
        let stimehr = availabletrip[i].place[sind].time.hr;
        let stimemin = availabletrip[i].place[sind].time.min;
        let dtimehr = availabletrip[i].place[dind].time.hr;
        let dtimemin = availabletrip[i].place[dind].time.min;

        let stime, dtime;
        if (stimemin < 10) {
          stime = stimehr + ":0" + stimemin;
        } else {
          stime = stimehr + ":" + stimemin;
        }
        if (dtimemin < 10) {
          dtime = dtimehr + ":0" + dtimemin;
        } else {
          dtime = dtimehr + ":" + dtimemin;
        }

        let fare_factor = availabletrip[i].fare_factor;
        let rating = availabletrip[i].rating;
        let available_seat = await getavailableseat(date, code);
        let capacity = availabletrip[i].capacity;

        send_trips[j] = {
          code,
          class: availabletrip[i].class,
          bus: availabletrip[i].bus,
          source,
          des,
          date,
          stime,
          dtime,
          duration: getduration(stimehr, stimemin, dtimehr, dtimemin),
          rating,
          fare: getfare(sind, dind, fare_factor, availabletrip[i]),
          available_seat,
          capacity,
        };
        j++;
      }
    }

    res.render("seat", {
      findbus: send_trips.length,
      source,
      des,
      date,
      send_trips,
    });
  } else {
    res.render("not_found");
  }
});

let data;

app.get("/book/:id", async (req, res) => {
  let id = req.params.id;
  console.log("id " + id);

  // console.log(send_trips);
  let blist = await getstop(send_trips[id].source);
  let dlist = await getstop(send_trips[id].des);
  let book_seat = await get_book(send_trips[id].date, send_trips[id].code);

  let obj = {
    // blist: await getstop(send_trips[id].source),
    // dlist: await getstop(send_trips[id].des),
    // book_seat: await get_book(send_trips[id].date, send_trips[id].code),

    blist,
    dlist, 
    book_seat,
  };
  console.log("this is data");
  data = send_trips[id];
  let layout;
  switch (data.class) {
    case "exp_guj":
      layout = exp_guj;
      break;
    case "volvo":
      layout = volvo;
      break;
    case "sleeper":
      layout = sleeper;
      break;
  }
  console.log(data);
  res.render("book", { id, obj, data, layout });
});

let form=null;

app.post("/book/confirm", urlencodedParser, async (req, res) => {
   form = await req.body;

  res.render("pay",{
    fare:form.total,
  });


});
 
//Stripe Payment Routing
app.post("/payment", async (req, res) => {
  const { product } = req.body;
  const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
          {
              price_data: {
                  currency: "inr",
                  product_data: {
                      name: product.name,
                      images: [product.image],
                  },
                  unit_amount: product.amount * 100,
              },
            quantity:1,
          },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
  });

  res.json({ id: session.id });

});


app.get("/success",async (req,res)=>{

try{

  
  console.log(form);

  console.log(form.ps[0]);

  console.log("this is form respoi");

  let p_arr = [];

  console.log(typeof form.ps);

  if (typeof form.ps === typeof ["23", "3"]) { 
    console.log("double exec");

    for (let i = 0; i < form.ps.length; i++) {
      p_arr[i] = {
        seatno: form.selec_seat[i],
        name: form.ps[i],
        age: form.ps1age[i],
        gender: form.gen[i],
      }; 
    }
  } else {
    console.log("single exe");

    p_arr[0] = {
      seatno: form.selec_seat,
      name: form.ps,
      age: form.ps1age,
      gender: form.gen,
    };
  }

  const newPassenger = new passenger({
    date: data.date,
    trip: data.code,
    mobileno: form.phone,
    email: form.email,
    b_point: form.start,
    d_point: form.des,
    fare: form.total,
    bookedseat: p_arr,
  });

  let soo = await booking.updateOne(
    {
      $and: [
        { date: data.date },
        { trip: data.code },
        { capacity: data.capacity },
      ],
    },
    { $push: { booked: form.selec_seat } },
    {
      upsert: true,
    }
  );

  console.log(soo);

  newPassenger.save();

  send_trips = [];

  res.render("success");

}catch(err){
  console.log("error in success"+err);
}


});

app.get("/cancel",(req,res)=>{
  res.render("404");
})


app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
