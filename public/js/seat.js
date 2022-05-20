


const sea_container=document.querySelector(".sea_container");

// toggle between starting and destination point in seat booking layout

const b_point = document.querySelector(" .b_point");
const d_point = document.querySelector(".d_point");

const start_point = document.querySelector(".start_point");
const des_point = document.querySelector(".des_point");

b_point.classList.add("point_hover");
d_point.classList.add("point_normal");

b_point.addEventListener("click", () => {
  start_point.style.display = "block";
  b_point.classList.add("point_hover");
  b_point.classList.remove("point_normal");
  d_point.classList.add("point_normal");
  d_point.classList.remove("point_hover");
  des_point.style.display = "none";
});

d_point.addEventListener("click", () => {
  d_point.classList.add("point_hover");
  d_point.classList.remove("point_normal");
  b_point.classList.add("point_normal");
  b_point.classList.remove("point_hover");
  start_point.style.display = "none";
  des_point.style.display = "block";
});

// fare calculator

const base_fare = parseInt(document.querySelector("#base_fare").value);
let amt = document.querySelector("#amt").value;
let disc =0;
let total = document.querySelector("#total").value;

const fare = (p) => {
 
amt+=base_fare;
disc=Math.round(0.1*amt);
total=amt-disc;
document.querySelector("#amt").value=amt;
document.querySelector("#total").value=total;
document.querySelector("#disc").value=disc;
};

//getting user selected btns

let seat_no_box = document.querySelector(".seat_no");
let pass_container = document.querySelector(".pass_container");

let print_seat = (check) => {
  seat_no_box.innerHTML = ``;
  pass_container.innerHTML = ``;

  document.querySelector("#amt").value=null;
  document.querySelector("#total").value=null;
  document.querySelector("#disc").value=null;


  amt= 0;
  for (let x = 0; x < check.length; x++) {
    seat_no_box.innerHTML += `${check[x].value} `;
    fare(1);
    pass_container.innerHTML += `
    <div class="pass_det">
    <p>Passenger ${x + 1} | <b>Seat ${check[x].value}</b></p>
    <input type="text" name="ps" placeholder="Name" required>
    <div>
    <select name="gen" class="selec_op" required >
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
        <input type="number" name="ps1age" placeholder="Age" required>
    </div>
</div>

    `;
  }
};



sea_container.addEventListener("focusout", () => {
  let check = document.querySelectorAll('input[name="selec_seat"]:checked');

  print_seat(check);
});

// check and uncheck functionality

const seat = document.querySelectorAll(".seat input");
const type=document.querySelector(".type").value;


for (let i = 0; i < seat.length; i++) {
  seat[i].addEventListener("click", () => {
    if (!seat[i].checked) {
     let s= seat[i].parentNode.childNodes[3].src;
     console.log()
      seat[i].parentNode.childNodes[3].src = `/img/${type}/sbl.png`;
    } else {
      seat[i].parentNode.childNodes[3].src = `/img/${type}/sr.png`;
    }
  });
}




const res_form=document.querySelector("#final_form_res");

res_form.addEventListener("onsubmit",(e)=>{
e.preventDefault();
alert("I am working");
})




function isEmail(email) {
              
  // Regular Expression (Not accepts second @ symbol
  // before the @gmail.com and accepts everything else)
  var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
  // Converting the email to lowercase
  return regexp.test(String(email).toLowerCase());
}

function phonenumber(tel)
{
    const indiaRegex = /\d{10}$/;
    if(tel.match(indiaRegex)) {
	    return true;      
    } else {
      return false; 
    }
}


//form will submit when all fields are filled 

const check_book=()=>{
  let check_seat = document.querySelectorAll('input[name="selec_seat"]:checked');
  let start = document.querySelectorAll('input[name="start"]:checked');
  let des = document.querySelectorAll('input[name="des"]:checked');
  let email = document.querySelector('input[name="email"]').value;
  let tel = document.querySelector('input[name="phone"]').value;


if(check_seat.length==0){
alertwindow.openalert({
  title: "Warning",
  content: "Please Select the Seat",
  type: "warn",
  icon: "fa-exclamation-circle",
});
return false;
}

if(start.length==0 || des.length==0 ){
alertwindow.openalert({
  title: "Warning",
  content: "Please Select the Boarding & Dropping Point",
  type: "warn",
  icon: "fa-exclamation-circle",
});
return false;
}

if(!isEmail(email) || !phonenumber(tel) ){
alertwindow.openalert({
  title: "Warning",
  content: "Please Enter proper Email",
  type: "warn",
  icon: "fa-exclamation-circle",
});
return false;
}

return true;
}