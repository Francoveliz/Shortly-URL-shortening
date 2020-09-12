let main = (function () {
  return {
    init: function () {
      this.cacheDom();
      this.setVariables();
      this.bindEvents();
    },
    cacheDom: function () {
      this.btnMenu = document.querySelector(".menu-btn");
      this.navBar = document.getElementById("nav-bar");
      this.body = document.querySelector("body");
      this.linkContainer = document.getElementById("link-container");
      this.linkToShorten = document.getElementById("link-to-shorten");
      this.btnShorten = document.getElementById("btn-shorten");
      this.testArea = document.getElementById("test");
    },
    setVariables: function () {
      this.menuOpen = false;
      this.apiKey = "3161399a53474bff8c010db1cdca3be5";
      this.fetchUrl = 'https://api.rebrandly.com/v1/links';
    },
    bindEvents: function () {
      this.btnMenu.addEventListener("click", this.setBurgerMenu.bind(this));
      this.btnShorten.addEventListener("click", this.displayShortUrl.bind(this));
    },
    setBurgerMenu: function () {
      /* nav animacion*/
      this.navBar.classList.toggle("nav-active");
      /* menu hamburguesa animacion */
      if (!this.menuOpen) {
        this.btnMenu.classList.add("open");
        this.menuOpen = true;
        this.body.style.overflow = "hidden";
      } else {
        /* cerrar menu hamburguesa */
        this.btnMenu.classList.remove("open");
        this.menuOpen = false;
        this.body.style.overflow = "visible";
      }
    },
    setShortLinkDiv: function () {
      // crear elementos
      let contenedor = document.createElement("div"),
        longLink = document.createElement("a"),
        shortLink = document.createElement("a"),
        button = document.createElement("button"),
        righSection = document.createElement("div");
      // agregar clases  
      contenedor.classList.add("link-acortado");
      longLink.classList.add("link__long");
      righSection.classList.add("link__right-section");
      // agregar elementos al DOM
      this.linkContainer.appendChild(contenedor);
      contenedor.appendChild(longLink);
      contenedor.appendChild(righSection);
      righSection.appendChild(shortLink);
      righSection.appendChild(button);
      // contenido
      longLink.innerHTML = this.linkToShorten.value;
      shortLink.innerHTML = "shorturl.at/aftxI";
      button.innerHTML = "Copiar";
    },
    renderResponse: function (res) {
      if (res.errors) {
        this.testArea.innerHTML = "<p>Sorry, couldn't format your URL.</p><p>Try again.</p>";
      } else {
        this.testArea.innerHTML = `<p>Your shortened url is: </p><p> ${res.shortUrl} </p>`;
      }
    },
    shortenUrl: function () {
      const data = JSON.stringify({
        destination: this.linkToShorten.value
      });
      const xhr = new XMLHttpRequest;
      xhr.responseType = 'json';
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          this.renderResponse(xhr.response);
        }
      }
      xhr.open('POST', this.fetchUrl);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.setRequestHeader('apikey', this.apiKey);
      xhr.send(data);
    },
    displayShortUrl: function (event) {
      event.preventDefault();
      this.shortenUrl();
    }
  };
})();
main.init();
