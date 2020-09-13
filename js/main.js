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
      this.linkDiv = document.querySelector(".link__input");
      this.errorMessage = document.querySelector(".error-message");
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
      if (this.linkContainer.firstChild) {
        this.linkContainer.removeChild(this.linkContainer.firstChild);
      }
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
      button.classList.add("btn-copy");
      // agregar elementos al DOM
      this.linkContainer.appendChild(contenedor);
      contenedor.appendChild(longLink);
      contenedor.appendChild(righSection);
      righSection.appendChild(shortLink);
      righSection.appendChild(button);
      // atributos
      longLink.href = this.linkToShorten.value;
      longLink.target = "_blank";
      shortLink.href = "https://" + this.shortUrl;
      shortLink.target = "_blank";
      // contenido
      longLink.innerHTML = this.linkToShorten.value;
      shortLink.innerHTML = this.shortUrl;
      button.innerHTML = "Copiar";
      //set btn copy
      this.setBtnCopyAttributes();
    },
    setBtnCopyAttributes: function () {
      this.btnCopy = document.querySelector(".btn-copy");
      this.btnCopy.addEventListener("click", this.setBtnCopy.bind(this));
    },
    displayShortUrl: function (event) {
      event.preventDefault();
      this.shortenUrl();
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
    setErrorMessage: function () {
      this.linkToShorten.classList.add("error");
      this.errorMessage.style.display = "block";
    },
    removeErrorMessage: function () {
      this.linkToShorten.classList.remove("error");
      this.errorMessage.style.display = "none";
    },
    renderResponse: function (res) {
      if (res.errors) {
        this.setErrorMessage();
      } else {
        this.removeErrorMessage();
        this.shortUrl = res.shortUrl;
        this.setShortLinkDiv();
        //this.testArea.innerHTML = `<p>Your shortened url is: </p><p> ${res.shortUrl} </p>`;
      }
    },
    setBtnCopy: function () {
      let copyText = document.createElement("input");
      copyText.type = "text";
      document.body.appendChild(copyText);
      copyText.value = "https://" + this.shortUrl;
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
      copyText.style.display = "none";
      this.btnCopy.innerHTML = "Copiado!";
      this.btnCopy.classList.add("btn-copiado");
    }
  };
})();
main.init();
