"use strict";
(() => {

    const hamburgerButton = document.querySelector("#menu");
    const hamburgerButton2 = document.querySelector("#hamburgerOverlay");
    const catFactP = document.querySelector("#randomCatFact");
    const menuText = document.querySelector("#buttontext");
    const ham1 = document.querySelector("#ham1");
    const ham2 = document.querySelector("#ham2");
    const ham3 = document.querySelector("#ham3");

    const catFactUrl = 'https://catfact.ninja/fact?max_length=90'; // TODO lengte misschien nog aanpassen adhv screenwidth

    const toggleMenu = function() {
        if (hamburgerButton.getAttribute("aria-expanded") === "false") {
          this.setAttribute("aria-expanded", "true"); //TODO menu openen
          hamburgerButton2.setAttribute("aria-hidden", "false");
          menuText.setAttribute("aria-hidden", "true");
          menuText.innerHTML = "";
          hamburgerAnim();
        } else if (hamburgerButton.getAttribute("aria-expanded") === "true") {
          this.setAttribute("aria-expanded", "false");
          hamburgerButton2.setAttribute("aria-hidden", "true");
          menuText.setAttribute("aria-hidden", "false");
          menuText.innerHTML = "Menu";
          hamburgerAnim();
        }
    }

    const hamburgerAnim = function() {
        ham1.classList.toggle("open");
        ham2.classList.toggle("open");
        ham3.classList.toggle("open");
    }

    const getCatFact = async function() {
        console.log(catFactP);
        const response = await fetch(catFactUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': 'sjs0Xf6S4TpWP5q3feJ1SwrQyWyxrCfOaZpaI8k1'
            }
        })
        const res = await response.json();
        catFactP.innerHTML = res.fact;
    }
    console.log(catFactP);
    
    if (catFactP === undefined || catFactP === null) {
        return;
    } else {
        catFactP.addEventListener("click", getCatFact);
        catFactP.addEventListener("keydown", getCatFact);
    }

    hamburgerButton.addEventListener("click", toggleMenu);
    hamburgerButton.addEventListener("keyDown", toggleMenu);

})();