const alertwindow = {
  init() {
    document.body.addEventListener("click", (e) => {
      if (e.target.classList.contains("alert_close")) {
        this.closealert(e.target);
      }
    });
  },
  gethtmltemplate(alertoption) {
    return `
        <div class="alert_overlay">
        <div class="alert_window ${alertoption.type}">
            <div class="alert_icon">
                <i class="fa  ${alertoption.icon}"></i>
            </div>
            <div class="alert_content">
                <div class="alert_title">
                    ${alertoption.title}
                </div>
                <div class="alert_text">
                    ${alertoption.content}
                </div>
            </div>
            <div class="alert_close">&#10005</div>
        </div>
    </div>
`;
  },
  openalert(alertoption = {}) {
    alertoption = Object.assign(
      {
        title: "alert title",
        content: "alert content",
        type: "danger",
        icon: "fa-circle-check",
      },
      alertoption
    );

    const alerttemplate = this.gethtmltemplate(alertoption);
    document.body.insertAdjacentHTML("afterbegin", alerttemplate);
  },

  closealert(closebtn) {
    const alertoverlay = closebtn.parentElement.parentElement;
    document.body.removeChild(alertoverlay);
  },
};

document.addEventListener("DOMContentLoaded", () => alertwindow.init());



// module.exports=alertwindow;


// ------> you can now show alert on your screen using function below


// => sucess alert 

// alertwindow.openalert({
//   title: "Success",
//   content: "Your Account Created Sucessfully ",
//   type: "success",
//   icon: "fa-check-circle",
// });

// => info alert 

// alertwindow.openalert({
//   title: "ALert",
//   content: "this is alert want it",
//   type: "info",


// => warning alert 


// => danger alert 

// alertwindow.openalert({
//   title: "ALert",
//   content: "this is alert text",
//   type: "danger",
//   icon: "fa-times-circle",
// });
