"use strict";

(() => {
  
  const htmlSelector = document.querySelector("html");
  const imgContainer = document.querySelector("#catContainer");
  let imageGrid;

  const checkPath = window.location.pathname;

  const catAPIUrl = `https://api.thecatapi.com/v1/images/search?limit=${imageGrid - 1}`; // TODO limit variabele aanapassen adhv screenwidth

  const getScreenBounds = function() {
    const height = htmlSelector.offsetHeight;
    let width = htmlSelector.offsetWidth;
    if (height > width && height > 780) { //moet nog aan gewerkt worden hoeveelheden kloppen niet
      if (width > 780  && height > 1000) {
        imageGrid = 13;
      } else if (width > 1000 && height > 1000) {
        imageGrid = 17;
      } else if (height < 1000) {
        imageGrid = 9;
      } else if (height < 900) {
        imageGrid = 7;
      } else {
        imageGrid = 7
      }
    } else {
      if (width > 750 ) {
        imageGrid = 9;
      } else if (width > 500 && !(width > 750)) {
        imageGrid = 7;
      } else if (width > 350) {
        imageGrid = 5;
      } else if (width > 250) {
        imageGrid = 3;
      } else {
        imageGrid = 7
      }
    }
    
    return { height: height, width: width };
  }

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
    getScreenBounds();
    console.log(imageGrid);
    for (let i = 1; i < imageGrid; i++) {
      const img = new Image();
      let obj = await getImg();
      if (!(obj.width + obj.height > 500)) {
        obj = await getImg();
      } else {
        console.log(obj.url);
        img.src = obj.url;
        img.id = `image${i}`;
        img.alt = "A cat, don't ask me what kind because I have no clue."
        imgContainer.appendChild(img);
        
      }
    }
  }
  appendImg();

})();