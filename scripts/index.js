
const jokeServerAddress = "https://api.chucknorris.io/jokes/random"; // fetch returns Promise
// let jokeContainer = document.querySelector(".js-joke-container");
let jokeContainer;

function renderButtonToPage(buttonName) {
    let button = document.createElement("button");
    button.textContent = buttonName;
    button.addEventListener("click", function(event) {
        clearJokeContainer(jokeContainer);
        fetchJoke();
    });
    document.body.appendChild(button);
}

function renderMultipleButtonToPage(buttonName) {
    let button = document.createElement("button");
    button.textContent = buttonName;
    button.addEventListener("click", function(event) {
        clearJokeContainer(jokeContainer);
        fetchMultipleJokes();
    });
    document.body.appendChild(button);
}

function renderContainerToPage(classTitle) {
    let div = document.createElement("div");
    div.className = classTitle;
    document.body.appendChild(div);
    jokeContainer = div;
}


renderButtonToPage("Give me a joke");
renderMultipleButtonToPage("Get multiple jokes");
renderContainerToPage('js-joke-container');

function convertToJson(response) {
    console.log(response); //response contains metaData 
    return response.json();
}

function extractJoke(dataObject) {
    return dataObject.value;
}

function printJoke(joke) {
    console.log(joke);
}

function clearJokeContainer(container) {
    container.textContent = "";
}

function renderJokeToPage(jokeString) {
    const h1 = document.createElement("h1");
    h1.textContent = jokeString;
    jokeContainer.appendChild(h1);
}


function fetchMultipleJokes() {
    for (i = 0; i < 5; i++) {
        fetchJoke();
    }
}

function fetchJoke() {
    fetch(jokeServerAddress)
        .then(r => r.json())
        // .then(convertToJson)
        .then(extractJoke)
        .then(renderJokeToPage)
}



