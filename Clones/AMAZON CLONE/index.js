const leftbtn = document.querySelector(".l-btn");
const rightbtn = document.querySelector(".r-btn");

rightbtn.addEventListener("click", function (event) {
  const conent = document.querySelector(".product-slide");
  conent.scrollLeft += 1100;
  event.preventDefault();
});
leftbtn.addEventListener("click", function (event) {
  const conent = document.querySelector(".product-slide");
  conent.scrollLeft -= 1100;
  event.preventDefault();
});

const ltbtn = document.querySelector(".btn-1b");
const rtbtn = document.querySelector(".btn-1a");

rtbtn.addEventListener("click", function (event) {
  const conent = document.querySelector(".product-slide-1");
  conent.scrollLeft += 1100;
  event.preventDefault();
});
ltbtn.addEventListener("click", function (event) {
  const conent = document.querySelector(".product-slide-1");
  conent.scrollLeft -= 1100;
  event.preventDefault();
});
const lb = document.querySelector(".btn-2b");
const rb = document.querySelector(".btn-2a");

rb.addEventListener("click", function (event) {
  const conent = document.querySelector(".product-slide-2");
  conent.scrollLeft += 1100;
  event.preventDefault();
});
lb.addEventListener("click", function (event) {
  const conent = document.querySelector(".product-slide-2");
  conent.scrollLeft -= 1100;
  event.preventDefault();
});

const backtop = document.querySelector(".backtop");

backtop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});



const sidebar = document.querySelector(".sidebar");
const cross = document.querySelector(".fa-xmark");
const black = document.querySelector(".black");
const sidebtn = document.querySelector(".second-1");

sidebtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  cross.classList.add("active");
  black.classList.add("active");
  document.body.style.overflow = "hidden";
});

cross.addEventListener("click", () => {
  sidebar.classList.remove("active");
  cross.classList.remove("active");
  black.classList.remove("active");
  document.body.style.overflow = "unset";
});


const sign = document.querySelector(".ac");
const tri = document.querySelector(".triangle");
const signin = document.querySelector(".hdn-sign");

sign.addEventListener("click", () => {
  black.classList.toggle("active-1");
  signin.classList.toggle("active");
  tri.classList.toggle("active");
});

