(function() {
    // Constants
    const form = document.querySelector("form");
    const firstNameField = document.querySelector('input[name="fname"]');
    const lastNameField = document.querySelector('input[name="name"]');
    const scoreField = document.querySelector('input[name="score"]');
    const commentField = document.querySelector('input[name="comment"]');
    const dateField = document.querySelector('input[name="date"]');
    const errFirstName = document.querySelector("#fname-valid");
    const errName = document.querySelector("#name-valid");
    const errScore = document.querySelector("#score-valid");
    const errComment = document.querySelector("#comment-valid");
    const errDate = document.querySelector("#date-valid");
    const regex = /^[A-Z][a-z]+([\s\-]?[A-Za-z]{2,})*$/gm;
    const postUrl = "http://localhost:8000/reviewpost";
    // Functions
    const resetErrors = ()=>{
        errFirstName.style.display = "none";
        errName.style.display = "none";
        errScore.style.display = "none";
        errComment.style.display = "none";
        errDate.style.display = "none";
    };
    const resetForm = ()=>{
        firstNameField.value = "";
        lastNameField.value = "";
        scoreField.value = "";
        commentField.value = "";
        errDate.value = "";
    };
    const setError = (element, message)=>{
        element.style.display = "block";
        element.innerText = message;
    };
    const checkRegex = (e, element)=>{
        const result = e.target.value.match(regex);
        if (!result) setError(element, "Invalid charactre!");
        else element.style.display = "none";
    };
    const checkOnInput = (e)=>{
        if (e.target.value.length >= 1) {
            checkRegex(e, errFirstName);
            checkRegex(e, errName);
        }
    };
    const checkOnLostFocus = (e)=>{
        if (e.target.value.length === 0) {
            setError(errName, "Name is required");
            setError(errFirstName, "fname is required");
        } else checkRegex(e, errName);
    };
    const postData = async ()=>{
        await fetch(postUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "fname": firstNameField.value,
                "name": lastNameField.value,
                "comment": commentField.value,
                "score": scoreField.value,
                "date": dateField.value
            })
        });
    };
    // Event Listeners
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        resetErrors();
        const isValid = validateForm();
        if (isValid) {
            postData();
            document.querySelector("form").innerHTML = "";
            resetForm();
        }
    });
    firstNameField.addEventListener("input", checkOnInput);
    lastNameField.addEventListener("input", checkOnInput);
    firstNameField.addEventListener("focusout", checkOnLostFocus);
    lastNameField.addEventListener("focusout", checkOnLostFocus);
    const validateForm = ()=>{
        let isValid = true;
        if (firstNameField.value === "") {
            setError(errFirstName, "Fill in firstname");
            isValid = false;
        }
        if (lastNameField.value === "") {
            setError(errName, "Fill in lastname");
            isValid = false;
        }
        if (scoreField.value === "") {
            setError(errScore, "score can't be empty");
            isValid = false;
        }
        if (scoreField.value < 1 || scoreField.value > 5) {
            setError(errScore, "score must be between 1 and 5");
            isValid = false;
        }
        if (dateField.value === "") setError(errDate, "Date must be filled in");
        return isValid;
    };
})();

//# sourceMappingURL=newReview.ff8571d1.js.map
