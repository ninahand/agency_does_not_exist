let agencyList = ['005', '013', '089', '070', '015', '019', '020', '047', '080', '007'];

let imageContainer = document.querySelector('.image-container');


document.addEventListener("DOMContentLoaded", function() {
    const figureWrapper = document.createElement('figure');
    fetchRandomAgency(figureWrapper);
    fetchRandomImage(figureWrapper);

});



function fetchRandomAgency(figure) {
    let randomAgency = Math.floor(Math.random() * agencyList.length);
    const API_URL = `https://api.usaspending.gov/api/v2/agency/${agencyList[randomAgency]}/federal_account/`;

    fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data); 

        let randomIndex = Math.floor(Math.random() * data.results.length);
        let randomItem = data.results[randomIndex];
        
        let randomAgencyContainer = document.createElement("figcaption");
        randomAgencyContainer.classList.add("agency-caption");


        let itemCode = document.createElement("div");
        itemCode.innerText = `code: "${randomItem.code}"`
        let itemName = document.createElement("div");
        itemName.innerText =  `name: "${randomItem.name}"`
        let itemAmount = document.createElement("div");
        itemAmount.innerText =  `obligated_amount: "${randomItem.obligated_amount}"`

        randomAgencyContainer.appendChild(itemCode);
        randomAgencyContainer.appendChild(itemName);
        randomAgencyContainer.appendChild(itemAmount);


        figure.classList.add('image-figure')
        figure.appendChild(randomAgencyContainer)
      
        imageContainer.appendChild(figure);
    })
    .catch((error) => {

        figure.classList.add('error-image');
        figure.classList.add('image-figure');

    
        let errorText = document.createElement("div");
        errorText.classList.add("error-text"); // Adding class to errorText
        errorText.innerText = "ERROR: AGENCY 007:'DEPARTMENT OF DEFENSE' DOES NOT EXIST"; // Use the error message provided by the catch block

        figure.appendChild(errorText);

        console.error('Error:', error);
        imageContainer.appendChild(figure);

    });
}

function fetchRandomImage (figure) {
    console.log('hello')
    fetch("./data.json")
    .then((response) => response.json())
    .then((items) => {
        let randomIndex = Math.floor(Math.random() * items.length);
        let randomItem = items[randomIndex];


        let image = document.createElement('img');
        image.src= randomItem.path
        figure.appendChild(image)

    

    })
    .catch((error) => {
    });
}

// function increaseColumnCount() {
//     columnCount++;
//     let imageContainer = document.querySelector('.image-container');
//     imageContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
// }

let rowIncrement = 1;
let columnCount = 1;
let totalCount = 1;

document.addEventListener('click', function() {
    totalCount +=  rowIncrement
    columnCount = totalCount / rowIncrement;


    let futureRowIncrement = rowIncrement + 1;
    let futureColumnCount = totalCount / futureRowIncrement
    
    if (totalCount % futureRowIncrement === 0 && futureColumnCount >= futureRowIncrement) {
        rowIncrement++
        columnCount = totalCount / rowIncrement;
    } 
    updateGridRules(rowIncrement, columnCount)

    console.log('rowIncrement: ' + rowIncrement, 'columnCount: ' + columnCount)

    for ( let i = 0; i < rowIncrement; i++ ) {
        const figureWrapper = document.createElement('figure');
        fetchRandomAgency(figureWrapper);
        fetchRandomImage(figureWrapper); 

    }

});

function updateGridRules (rows, cols) {
    imageContainer.style.gridTemplateRows = `repeat(${rows}, ${100 / rows}vh)`;
    imageContainer.style.gridTemplateColumns = `repeat(${cols}, ${100 / cols}vw)`;

}

/*
 013 = department of commerce
 089 = department of energy
 070 = department of homeland security
 015 = depatment of justice
 019 = department of state
 020 = department of the treasury
 047 = general services administration
 080 = national aeronautics and space administration
 007 = Department of Defense--Military Programs (DOES NOT EXIST)




/* TESTING AGENCIES 
const API_URL = `https://api.usaspending.gov//api/v2/agency/009/federal_account/`


document.addEventListener("DOMContentLoaded", function() {
    fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data); 

   4

    })
    .catch((error) => console.error("Error fetching JSON:", error));
});
*/














