"use strict";
(()=>{
    const toggleMenu = document.querySelector("#menu");
    const toggleMenu2 = document.querySelector("#hamburgerOverlay");
    const catFactP = document.querySelector("#randomCatFact");
    const catFactUrl = "https://catfact.ninja/fact?max_length=90"; // TODO lengte misschien nog aanpassen adhv screenwidth
    const switchAria = function() {
        if (toggleMenu.getAttribute("aria-expanded") === "false") {
            this.setAttribute("aria-expanded", "true"); //TODO menu openen
            toggleMenu2.setAttribute("aria-hidden", "false");
        } else if (toggleMenu.getAttribute("aria-expanded") === "true") {
            this.setAttribute("aria-expanded", "false");
            toggleMenu2.setAttribute("aria-hidden", "true");
        }
    };
    const getCatFact = async function() {
        const response = await fetch(catFactUrl, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": "sjs0Xf6S4TpWP5q3feJ1SwrQyWyxrCfOaZpaI8k1"
            }
        });
        const res = await response.json();
        console.log(res);
        catFactP.innerHTML = res.fact;
    };
    catFactP.addEventListener("click", getCatFact);
    catFactP.addEventListener("keydown", getCatFact);
    toggleMenu.addEventListener("click", switchAria);
    toggleMenu.addEventListener("keyDown", switchAria);
})();

//# sourceMappingURL=quiz.67b64151.js.map
