"use strict";
(() => {
    const prev = document.querySelector("#prev");
    const next = document.querySelector("#next");
    const allQuestions = document.querySelectorAll(".quiz");
    const currentQuest = document.querySelectorAll(".dot");
    const question1Container = document.querySelector("#vraag1");
    const question1InputField = document.querySelector("#question1input");
    const question1Input = document.querySelector("#beforeContain");
    const question1Valid = document.querySelector("#question1input-valid");
    const question2Container = document.querySelector("#vraag2");
    const question2Input = document.querySelector("#question2input");
    const question3Container = document.querySelector("#vraag3");
    const question3Input = document.querySelector("#question3input");
    const buttonquestion1 = document.querySelector("#question1Submit");

    const imageAmount = 2;
    let quizVraag = 0;
    let score = 0;

    const imgUrl = `https://api.thecatapi.com/v1/images/search?limit=${imageAmount}`
    const breedUrl = `https://api.thecatapi.com/v1/breeds`

    const getImg = async function() {
        const response = await fetch(imgUrl, {
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
    }; 
    // getImg();

    const getBreed = async function() {
        const response = await fetch(breedUrl, {
            method: 'Get',
            mode: 'cors',
            headers: {
                'x-api-key': '36ede6f7-73e9-4e08-9be5-e04fb24403ec'
            }
        })
        const res = await response.json();
        const resObj = res[0];
        console.log(res);
        console.log(resObj);
        return res;
    };
 //2 breeds uithalen en dan quiz maken met die 2 breeds
        let animals1;

    const appendVraag1 = async function() {
        const response = await getBreed();
        const ran1 = parseInt(Math.random()*67);
        animals1 = response[ran1];
        
        const img = new Image(450, 450);
        const imgsrc = animals1.image;
        console.log(imgsrc.url);
        img.src = imgsrc.url;
        img.id = `image${1}`;
        img.alt = `A/An ${imgsrc.name} cat. ${imgsrc.description}`
        let el = document.createElement("p");
        el.innerHTML = `This cat is a/an ${animals1.name}, on a score of 0-5 what is it's energy level?`;
        question1Input.before(el);
        question1Input.before(img);
    }
    appendVraag1();

    const resetErrors = () => {
        question1Valid.style.display = 'none';
    };
    resetErrors();

    const setError = (element, message) => {
        element.style.display = 'block';
        element.innerText = message;
    };

    const validateForm = () => {
        let isValid = true;
    
        if (question1InputField.value === '') {
          setError(question1Valid, 'put in value pls');
          isValid = false;
        }
    
        if (question1InputField.value < 0 || question1InputField.value > 5) {
          setError(question1Valid, 'wrong value');
          isValid = false;
        }
        return isValid;
      };

      buttonquestion1.addEventListener("click", e=> {
            e.preventDefault();
            resetErrors();
            let level = parseInt(animals1.energy_level);
            console.log(level);
            const isValid = validateForm();
            if (isValid) {
                let answer = parseInt(document.getElementById("question1input").value);
                console.log(animals1.energy_level + " " + answer);
                if (answer === level) {
                    score++
                    console.log(`Your score is now ${score}`)
                } else {
                    console.log("wrong")
                }
            }
    });

    allQuestions[quizVraag].style.display = "block";
    currentQuest[quizVraag].className += " active";
    //TODO: ARIA
    const whichQuestionPrev = function() {
        if (quizVraag <= 0 ) {
            quizVraag = 2;
            allQuestions.forEach(e => {
                e.style.display = "none"
            });
            currentQuest.forEach(e => {
                if (e.className === "dot active") {
                    e.className = "dot";
                }
            })
            allQuestions[quizVraag].style.display = "block";
            currentQuest[quizVraag].className += " active";
        } else {
            quizVraag --;
            allQuestions.forEach(e => {
                e.style.display = "none"
            });
            currentQuest.forEach(e => {
                if (e.className === "dot active") {
                    e.className = "dot";
                }
            })
            allQuestions[quizVraag].style.display = "block";
            currentQuest[quizVraag].className += " active";
        }
    }

    const whichQuestionNext = function() {
        if (quizVraag >= allQuestions.length - 1) {
            quizVraag = 0;
            allQuestions.forEach(e => {
                e.style.display = "none"
            });
            currentQuest.forEach(e => {
                if (e.className === "dot active") {
                    e.className = "dot";
                }
            })
            allQuestions[quizVraag].style.display = "block";
            currentQuest[quizVraag].className += " active";
        } else {
            quizVraag ++;
            allQuestions.forEach(e => {
                e.style.display = "none"
            });
            currentQuest.forEach(e => {
                if (e.className === "dot active") {
                    e.className = "dot";
                }
            })
            allQuestions[quizVraag].style.display = "block";
            currentQuest[quizVraag].className += " active";
        }
    }

    prev.addEventListener("click", whichQuestionPrev);
    next.addEventListener("click", whichQuestionNext);
})();

// { ARRAY VAN 67 DUS VAN 0 TEM 66
//     "weight": {
//         "imperial": "7  -  10",
//         "metric": "3 - 5"
//     },
//     "id": "abys",
//     "name": "Abyssinian",
//     "cfa_url": "http://cfa.org/Breeds/BreedsAB/Abyssinian.aspx",
//     "vetstreet_url": "http://www.vetstreet.com/cats/abyssinian",
//     "vcahospitals_url": "https://vcahospitals.com/know-your-pet/cat-breeds/abyssinian",
//     "temperament": "Active, Energetic, Independent, Intelligent, Gentle",
//     "origin": "Egypt",
//     "country_codes": "EG",
//     "country_code": "EG",
//     "description": "The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.",
//     "life_span": "14 - 15",
//     "indoor": 0,
//     "lap": 1,
//     "alt_names": "",
//     "adaptability": 5,
//     "affection_level": 5,
//     "child_friendly": 3,
//     "dog_friendly": 4,
//     "energy_level": 5,
//     "grooming": 1,
//     "health_issues": 2,
//     "intelligence": 5,
//     "shedding_level": 2,
//     "social_needs": 5,
//     "stranger_friendly": 5,
//     "vocalisation": 1,
//     "experimental": 0,
//     "hairless": 0,
//     "natural": 1,
//     "rare": 0,
//     "rex": 0,
//     "suppressed_tail": 0,
//     "short_legs": 0,
//     "wikipedia_url": "https://en.wikipedia.org/wiki/Abyssinian_(cat)",
//     "hypoallergenic": 0,
//     "reference_image_id": "0XYvRd7oD",
//     "image": {
//         "id": "0XYvRd7oD",
//         "width": 1204,
//         "height": 1445,
//         "url": "https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg"
//     }
// }