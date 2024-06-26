let agencyList = ['005', '013', '089', '070', '015', '019', '020', '047', '080', '007'];
let runningTotal = 0;

let imageContainer = document.querySelector('.image-container');
let totalContainer = document.querySelector('.total-container');

function randomNote() {
    const notes = ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2'];
    return notes[Math.floor(Math.random() * notes.length)];
}

const positions = [
    { top: '10%', left: '10%' },
    { top: '10%', left: '20%' },
    { top: '20%', left: '30%' },
    { top: '20%', left: '40%' },
    { top: '30%', left: '50%' },
    { top: '30%', left: '60%' },
    { top: '40%', left: '55%' },
    { top: '40%', left: '55%' },
    { top: '35%', left: '60%' },
    { top: '35%', left: '60%' },
    { top: '40',  left: '50%' },
    { top: '40%', left: '40%' },
    { top: '30%', left: '30%' },
    { top: '30%', left: '55%' },
    { top: '20%', left: '50%' },
    { top: '20%', left: '60%' },
    { top: '10%', left: '30%' },
    { top: '10%', left: '40%' },
];

const breakpoints = {
    small: 600, 
    medium: 1024,
};

document.addEventListener("DOMContentLoaded", function() {
    const figureWrapper = document.createElement('figure');
    fetchRandomAgency(figureWrapper);
    fetchRandomImage(figureWrapper); 
    fetchRandomImage(figureWrapper);
});

function fetchRandomAgency(figure) {
    let randomAgency = Math.floor(Math.random() * agencyList.length);
    const API_URL = `https://api.usaspending.gov/api/v2/agency/${agencyList[randomAgency]}/federal_account/`;

    fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
        let randomIndex = Math.floor(Math.random() * data.results.length);
        let randomItem = data.results[randomIndex];

        let obligatedAmount = parseFloat(randomItem.obligated_amount); 
        runningTotal += obligatedAmount; 
        totalContainer.innerText = `$${runningTotal.toFixed(2)}`;

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
        errorText.classList.add("error-text"); 
        errorText.innerText = "ERROR: AGENCY 007:'DEPARTMENT OF DEFENSE' DOES NOT EXIST"; 

        figure.appendChild(errorText);

        console.error('Error:', error);
        imageContainer.appendChild(figure);
    });
}

function fetchRandomImage (figure) {
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

let rowIncrement = 1;
let columnCount = 1;
let totalCount = 1;

document.addEventListener('click', function() {
    function newSynth(){
        const synth = new Tone.Synth({
            oscillator:{
                type: 'sine'
            }, 
            envelope:{
                attack: 0.01,
                decay: 0.6,
                sustain: 0.1,
                release: 1
            }
        }).toDestination();
    
        synth.volume.value = 15;
        synth.triggerAttackRelease(randomNote(), "5");
    }
    newSynth();

    totalCount += rowIncrement;
    columnCount = totalCount / rowIncrement;

    let futureRowIncrement = rowIncrement + 1;
    let futureColumnCount = totalCount / futureRowIncrement
    
    if (totalCount % futureRowIncrement === 0 && futureColumnCount >= futureRowIncrement) {
        rowIncrement++
        columnCount = totalCount / rowIncrement;
    } 
    updateGridRules(rowIncrement, columnCount);
    

    for (let i = 0; i < rowIncrement; i++) {
        const figureWrapper = document.createElement('figure');
        fetchRandomAgency(figureWrapper);
        fetchRandomImage(figureWrapper); 
    }

    const randomIndex = Math.floor(Math.random() * positions.length);
    const newPosition = positions[randomIndex];
    totalContainer.style.top = newPosition.top;
    totalContainer.style.left = newPosition.left;
});

totalContainer.addEventListener('mouseover', function() {
    const randomIndex = Math.floor(Math.random() * positions.length);
    const newPosition = positions[randomIndex];
    totalContainer.style.top = newPosition.top;
    totalContainer.style.left = newPosition.left;
});

function updateGridRules(rows, cols) {
    const screenWidth = window.innerWidth;
    let fontSize;


//used some ChatGPT here to help with getting this set up for mobile
    if (screenWidth < breakpoints.small) {
        cols = Math.min(cols, 4);
        fontSize = 16; 
    } else {
        fontSize = 24; 
    }
    if (cols === 4) {
        rows = Math.ceil(totalCount / cols);
    }

//the rest of this I did with the CD tutor!

    imageContainer.style.gridTemplateRows = `repeat(${rows}, ${100 / rows}vh)`;
    imageContainer.style.gridTemplateColumns = `repeat(${cols}, ${100 / cols}vw)`;

    const totalCells = rows * cols;
    fontSize = 50 / Math.sqrt(totalCells);

    const agencyCaptions = document.querySelectorAll('.agency-caption');
    const errorTexts = document.querySelectorAll('.error-text');

    agencyCaptions.forEach(caption => {
        caption.style.fontSize = fontSize + 'px';
    });

    errorTexts.forEach(text => {
        text.style.fontSize = fontSize + 10 + 'px';
        text.style.textAlign = 'justify';
    });
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














