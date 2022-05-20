
const nav=document.querySelector("nav");
const nav_btn=document.querySelector(".nav_box");
const nav_exit=document.querySelector(".nav_close  i");
nav_btn.addEventListener("click",()=>{

    nav.style.display="flex";

});

nav_exit.addEventListener("click",()=>{

    nav.style.display="none";

});



// javascript for search option date field

const date_field=document.querySelector("#date");

var date = new Date();
var currentDate = date.toISOString().substring(0,10);
date_field.value = currentDate;
date_field.min = currentDate;


const date_tomo=document.querySelector(".date_choice");
// add a day
date.setDate(date.getDate() + 1);
var nextDate=date.toISOString().substring(0,10);


date_tomo.addEventListener("click",()=>{
    date_field.value=nextDate;
})

date.setDate(date.getDate() + 14);
date_field.max=date.toISOString().substring(0,10);



// chooose start des form is not empty validation
const source_field=document.querySelector("#source");
const des_field=document.querySelector("#des");

const search_form=document.querySelector(".search_form");


const check=()=>{

if(!source_field.value || !des_field.value || (source_field.value== des_field.value)){
    
alertwindow.openalert({
    title: "Warning",
    content: "Please Correct Enter Source & Destination",
    type: "warn",
    icon: "fa-exclamation-circle",
  });

  return false;
}else{

    return true;
}

   
}