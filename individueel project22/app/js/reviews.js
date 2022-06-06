"use strict";
(() => {
    const bars = document.getElementsByClassName("bar");
    const avgP = document.querySelector("#avgReviews");
    const numbersRev = document.getElementsByClassName("amountRev");
    const visualStars = document.getElementsByClassName("fa-star");
    const getRevasd = document.querySelector("#reviewContainer");
    const loadmore = document.querySelector("#loadmore");
    const personContainer = document.getElementsByClassName("personContainer");
    

    const scoreUrl = "http://localhost:8000/getStars";
    const _1stars = 10;
    const _2stars = 5;
    const _3stars = 7;
    const _4stars = 12;
    const _5stars = 20;
    const stars = [5, 4, 3, 2, 1]
    let data = [];
    let reviewsPerStar;
    let avg;
    let sumReviews;
    let loadmoreClicked = false;

    const getScores = async () => {
    
    const response = await fetch("http://localhost:8000/getStars");
    const res = await response.json();
    const scores = res.data;
    for (let i = 0; i < scores.length; i++) {
        data[i] = scores[i].score;
    }
   
    data.sort().reverse();
    }

    const calcPercentages = async () => {
        await getScores();
        reviewsPerStar = [0, 0, 0, 0, 0];
        for (let i = 0; i <= data.length; i++) {
            for (let j = 0; j <= stars.length; j++) {
                if (stars[i] === data[j]) {
                    reviewsPerStar[i]++
                    // console.log(`stars${stars[i]} and data ${data} and reviewsPerStar${reviewsPerStar}`);
                }
            }
        }
        sumReviews = reviewsPerStar.reduce((sum1, sum2) => (sum1+sum2));
        for (let i = 0; i < reviewsPerStar.length; i++) {
            numbersRev[i].innerHTML = reviewsPerStar[i];
        }
        for (let i = 0; i < reviewsPerStar.length; i++) {
            reviewsPerStar[i] = parseInt((reviewsPerStar[i]/sumReviews)*100) + "%";
        }
        return reviewsPerStar;
    }
    const calcAvg = () => { 
        let sum = data.reduce((a, b) => (a+b));
        avg = (sum/data.length).toFixed(1);
        return avg;
    }

    const getReviews = async() => {
        const response = await fetch("http://localhost:8000/");
        let res = await response.json();
        res = res.data;
        console.log(res);
        const toPage = res.map(e => {
            switch (e.score) {
            case 1: 
                return `
                <div class="personContainer" id="${e.id}">
                <p class="personReview">${e.fname} ${e.name} comments:</p>
                <p class="personReview2">${e.comment}</p>
                <span id="personStars${e.score}" class="fa fa-star checked"></span>
                <span id="personStars${e.score}" class="fa fa-star"></span>
                <span id="personStars${e.score}" class="fa fa-star"></span>
                <span id="personStars${e.score}" class="fa fa-star"></span>
                <span id="personStars${e.score}" class="fa fa-star"></span>
            </div>   
                `;
                break;
            case 2: 
            return `
            <div class="personContainer" id="${e.id}">
            <p class="personReview">${e.fname} ${e.name} comments:</p>
            <p class="personReview2">${e.comment}</p>
            <span id="personStars${e.score}" class="fa fa-star checked"></span>
            <span id="personStars${e.score}" class="fa fa-star checked"></span>
            <span id="personStars${e.score}" class="fa fa-star"></span>
            <span id="personStars${e.score}" class="fa fa-star"></span>
            <span id="personStars${e.score}" class="fa fa-star"></span>
        </div>   
            `;
                break;
            case 3: 
            return `
            <div class="personContainer" id="${e.id}">
            <p class="personReview">${e.fname} ${e.name} comments:</p>
            <p class="personReview2">${e.comment}</p>
            <span id="personStars${e.score}" class="fa fa-star checked"></span>
            <span id="personStars${e.score}" class="fa fa-star checked"></span>
            <span id="personStars${e.score}" class="fa fa-star checked"></span>
            <span id="personStars${e.score}" class="fa fa-star"></span>
            <span id="personStars${e.score}" class="fa fa-star"></span>
        </div>   
            `;
                break;
            case 4: 
            return `
            <div class="personContainer" id="${e.id}">
            <p class="personReview">${e.fname} ${e.name} comments:</p>
            <p class="personReview2">${e.comment}</p>
            <span id="personStars${e.score}" class="fa fa-star checked"></span>
            <span id="personStars${e.score}" class="fa fa-star checked"></span>
            <span id="personStars${e.score}" class="fa fa-star checked"></span>
            <span id="personStars${e.score}" class="fa fa-star checked"></span>
            <span id="personStars${e.score}" class="fa fa-star"></span>
        </div>   
            `;
                break;
            case 5: 
            return `
            <div class="personContainer" id="${e.id}">
            <p class="personReview">${e.fname} ${e.name} comments:</p>
            <p class="personReview2">${e.comment}</p>
            <span id="personStars${e.score}" class="fa fa-star checked"></span>
            <span id="personStars${e.score}" class="fa fa-star checked"></span>
            <span id="personStars${e.score}" class="fa fa-star checked"></span>
            <span id="personStars${e.score}" class="fa fa-star checked"></span>
            <span id="personStars${e.score}" class="fa fa-star checked"></span>
        </div>   
            `;
                break;
            default: 
                throw console.error("er klopt hier iets niet");
            }
        }).join(``);
        getRevasd.insertAdjacentHTML("beforeend", toPage);
    };
    getReviews();
 
    const setHTML = async () => {
        const percentages = await calcPercentages();
        for (let i = 0; i < 5; i++) {
            console.log();
            if (bars[i].classList.contains("bar-" + (5-i))) {
                bars[i].style.width = percentages[i];
            }
        }
        avgP.innerHTML = `${calcAvg()} average based on ${sumReviews} reviews.`
        for (let i = 0; i < 5; i++) {
            visualStars[i].setAttribute("class", "fa fa-star");
            
        }
        if (avg <= 1) {
            visualStars[0].setAttribute("class", "fa fa-star checked");
        } else if (avg <= 2) {
            for (let i = 0; i < 2; i++) {
                visualStars[i].setAttribute("class", "fa fa-star checked");
                
            }
        } else if (avg <= 3) {
            for (let i = 0; i < 3; i++) {
                visualStars[i].setAttribute("class", "fa fa-star checked");
                
            }
        } else if (avg <= 4) {
            for (let i = 0; i < 4; i++) {
                visualStars[i].setAttribute("class", "fa fa-star checked");
                
            }
        } else if (avg <= 5) {
            for (let i = 0; i < 5; i++) {
                visualStars[i].setAttribute("class", "fa fa-star checked");
                
            }
        }
    };
    

    const loadmoreFunc = async () => {
        await setHTML();
        if (loadmoreClicked) {
            for (let i = 0; i < personContainer.length; i++) {
                personContainer[i].setAttribute("class", "personContainer");
                
            }
        } else {
            for (let i = personContainer.length-1; i > 2; i--) {
                personContainer[i].setAttribute("class", "personContainer hiddenpers");
                
            }
        }
    }
    loadmoreFunc();

    loadmore.addEventListener("click", () => {
        loadmoreClicked = true;
        loadmoreFunc();
    });
    loadmore.addEventListener("keydown", loadmoreFunc);



    const hamburgerButton = document.querySelector("#menu");
    const hamburgerButton2 = document.querySelector("#hamburgerOverlay");
    const menuText = document.querySelector("#buttontext");
    const ham1 = document.querySelector("#ham1");
    const ham2 = document.querySelector("#ham2");
    const ham3 = document.querySelector("#ham3");

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

    hamburgerButton.addEventListener("click", toggleMenu);
    hamburgerButton.addEventListener("keyDown", toggleMenu);
})()