const menuBtn = document.querySelector(".menu-btn");
const navBar = document.getElementById("nav-bar");
const body = document.querySelector("body");
let menuOpen = false;
menuBtn.addEventListener("click", () => {
  /* nav animacion*/
  navBar.classList.toggle("nav-active");
  /* menu hamburguesa animacion */
  if (!menuOpen) {
    menuBtn.classList.add("open");
    menuOpen = true;
    body.style.overflow = "hidden";
  } else {
    /* cerrar menu hamburguesa */
    menuBtn.classList.remove("open");
    menuOpen = false;
    body.style.overflow = "visible";
  }
});

fetch("https://cleanuri.com/api/v1/shorten", {
    method: "POST",
    'mode': 'no-cors',
    'headers': {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      url: "https%3A%2F%2Fgoogle.com%2F"
    })
  })
  .then(response => response.json)
  .then(data => console.log(data.result_url));
