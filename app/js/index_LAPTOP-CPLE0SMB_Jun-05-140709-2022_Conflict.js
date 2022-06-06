"use strict";
import A11yDialog from 'a11y-dialog';

(() => {
  
  const imgContainer = document.querySelector("#catContainer");
  const toggleMenu = document.querySelector("#menu");
  const toggleMenu2 = document.querySelector("#hamburgerOverlay");
  const catFactOpen = document.querySelector("#showModal");
  const catfactDiag = document.getElementById("factDialog");
  const catFactP = document.querySelector("#randomCatFact");
  const dialogEl = document.querySelector("#catDialog")
  const dialog = new A11yDialog(dialogEl)
  const imageGrid = 5;

  const checkPath = window.location.pathname;

  const catAPIUrl = `https://api.thecatapi.com/v1/images/search?limit=${imageGrid - 1}`; //limit variabele aanapassen
  const catFactUrl = 'https://catfact.ninja/fact?max_length=90'; // lengte misschien nog aanpassen

  const switchAria = function() {
    if (toggleMenu.getAttribute("aria-expanded") === "false") {
      this.setAttribute("aria-expanded", "true"); //menu openen
      toggleMenu2.setAttribute("aria-hidden", "false");
    } else if (toggleMenu.getAttribute("aria-expanded") === "true") {
      this.setAttribute("aria-expanded", "false");
      toggleMenu2.setAttribute("aria-hidden", "true");
    }
    
  }
  const openDialog = function() {
    catfactDiag.open = true;
    const getCatFact = async function() {
      const response = await fetch(catFactUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': 'sjs0Xf6S4TpWP5q3feJ1SwrQyWyxrCfOaZpaI8k1'
        }
      })
      const res = await response.json();
      console.log(res);
      catFactP.innerHTML = res.fact;
      catFactP.style.display = "none";
    }();
  }

  toggleMenu.addEventListener("click", switchAria);
  catFactOpen.addEventListener("click", openDialog)


  

  const getImg = async function() {
    const response = await fetch(catAPIUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'x-api-key': '36ede6f7-73e9-4e08-9be5-e04fb24403ec'
        }
      })
      const res = await response.json();
      const resObj = res[0];
    console.log(res);
    console.log(resObj);
    return resObj;
  }
  const appendImg = async function() {
    for (let i = 1; i < imageGrid; i++) {
      const img = new Image();
      const obj = await getImg();
      //preload erbij zetten voor de images beter te laten
      console.log(obj.url);
      img.src = obj.url;
      img.id = `image${i}`;
      imgContainer.appendChild(img);
    }
  }
  // appendImg();

})();