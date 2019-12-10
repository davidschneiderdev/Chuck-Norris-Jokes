
const jokeServerAddress = "https://api.chucknorris.io/jokes/random?category=dev"; // fetch returns Promise
// let jokeContainer = document.querySelector(".js-joke-container");
const jokeCategoriesAddress = "https://api.chucknorris.io/jokes/categories";
let jokeContainer;
let listContainer;
let currentCategoryContainer;
let selectedCategory;

// Render Buttons

function renderButtonToPage(buttonName) {
    let button = document.createElement("button");
    button.textContent = buttonName;
    button.addEventListener("click", function(event) {
        clearContainer(jokeContainer);
        fetchJoke(`https://api.chucknorris.io/jokes/random?category=${selectedCategory}`);
    });
    document.body.appendChild(button);
}

function renderMultipleButtonToPage(buttonName) {
    let button = document.createElement("button");
    button.textContent = buttonName;
    button.addEventListener("click", function(event) {
        clearContainer(jokeContainer);
        fetchMultipleJokes(`https://api.chucknorris.io/jokes/random?category=${selectedCategory}`);
    });
    document.body.appendChild(button);
}

// Render Category List

function renderList() {
    const ul = document.createElement("ul");
    ul.className = "js-list";
    document.body.appendChild(ul);
    listContainer = ul;
}

// Render Jokes

function renderContainerToPage(classTitle) {
    let div = document.createElement("div");
    div.className = classTitle;
    document.body.appendChild(div);
    jokeContainer = div;
}

function renderCurrentCategoryToPage() {
    let div = document.createElement("div");
    div.className = "js-current-category";
    listContainer.appendChild(div);
    currentCategoryContainer = div;
}


renderList();
renderCurrentCategoryToPage();
renderButtonToPage("Give me a joke");
renderMultipleButtonToPage("Get multiple jokes");
renderContainerToPage('js-joke-container');


// Configures Fetch Joke Function

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

function clearContainer(container) {
    container.textContent = "";
}

function renderJokeToPage(jokeString) {
    const h1 = document.createElement("h1");
    h1.textContent = jokeString;
    jokeContainer.appendChild(h1);
}

function fetchMultipleJokes(categoryAddress) {
    for (i = 0; i < 5; i++) {
        fetchJoke(categoryAddress);
    }
}

function fetchJoke(categoryAddress) {
    fetch(categoryAddress)
        .then(r => r.json())
        // .then(convertToJson)
        .then(extractJoke)
        .then(renderJokeToPage)
}

// Adds Click Handler for Each Category

function handleCurrentCategory(event) {
    clearContainer(currentCategoryContainer);
    let h2 = document.createElement("h2");
    h2.textContent = `Current category: ${event.target.textContent}`;
    selectedCategory = event.target.textContent;
    currentCategoryContainer.appendChild(h2);
}

// Configures Fetch Categories Function


function renderItemToList(dataObject) {
    for (let item of dataObject) {
        let li = document.createElement("li");
        li.textContent = item;
        li.addEventListener("click", handleCurrentCategory);
        listContainer.appendChild(li);
    }
}

function fetchCategories() {
    fetch(jokeCategoriesAddress)
        .then(r => r.json())
        .then(renderItemToList)
}

fetchCategories();







