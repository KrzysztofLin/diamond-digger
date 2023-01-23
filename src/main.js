// Variables
let diamondsCounter = 0;
let diamondsPerClick = 1;
let diamondsPerSecond = 0;
let upgradesCosts = [10, 100, 1000, 5000, 100000];
let upgradesBonusMultiplier = [0.1, 1, 5, 10, 100];
let levels = [1, 1, 1, 1, 1];

const diamondsSelector = document.querySelector('#diamond');
const diamondsPerClickSelector = document.querySelector('#diamonds_per_click');
const diamondsPerSecondSelector = document.querySelector('#diamonds_per_second');
const gainedDiamondsSelector = document.querySelector('#gained_diamonds');

const levelUpButtons = [
    document.querySelector('#levelUpButton1'),
    document.querySelector('#levelUpButton2'),
    document.querySelector('#levelUpButton3'),
    document.querySelector('#levelUpButton4'),
    document.querySelector('#levelUpButton5'),
];

// Event Listener for cookie click
diamondsSelector.addEventListener('click', () => {
    // animation for clicked cookie
    diamondsSelector.classList.add('diamond-clicked');
    setTimeout(() => diamondsSelector.classList.remove('diamond-clicked'), 40);
    diamondsCounter += diamondsPerClick;
    updateMainContainer();
    checkIfBonusesAvailable();
});

// Event Listener for Level-Up Buttons click
for(let i=1; i<=5; i++){
    levelUpButtons.at(i-1).addEventListener('click', () => {
        if(levelUpButtons.at(i-1).classList.contains('level_up_button_ready')){
            levels[i-1]++;
            diamondsPerClick += upgradesBonusMultiplier.at(i-1) + 0.1 * diamondsPerSecond;
            diamondsPerSecond += upgradesBonusMultiplier.at(i-1);
            diamondsCounter -= upgradesCosts.at(i-1);
            upgradesCosts[i-1] = Math.round(upgradesCosts.at(i-1) * 1.3);
            updateMainContainer();
            setValues();
            checkIfBonusesAvailable();
        }
    });
}


function checkIfBonusesAvailable(){
    for(let i=1; i<=5; i++){
        if(Number(gainedDiamondsSelector.innerText) >= upgradesCosts.at(i-1))
            document.querySelector('#levelUpButton'+i).classList.add('level_up_button_ready');
        else
            document.querySelector('#levelUpButton'+i).classList.remove('level_up_button_ready');
    }
}

function updateMainContainer(){
    gainedDiamondsSelector.innerText = Math.round(diamondsCounter);
    diamondsPerSecondSelector.innerText = Math.round(10*diamondsPerSecond)/10;
    diamondsPerClickSelector.innerText = Math.round(10*diamondsPerClick)/10;
}

function setValues(){
    for(let i=0; i<=4; i++){
        let costId = '#levelUpButton' + i + '_cost';
        let upgradeId = '#levelUpButton' + i + '_upgrade';
        document.querySelector(costId).innerText = upgradesCosts.at(i-1);
        document.querySelector(upgradeId).innerText = upgradesBonusMultiplier.at(i-1);
    }
}

// Interval for cookies per sec
const interval = window.setInterval(function (){
    diamondsCounter += diamondsPerSecond;
    updateMainContainer();
    checkIfBonusesAvailable();

    // dynamically change amount of in page tab
    document.title = '(' + Math.round(diamondsCounter) + ' diamonds) Diamond Digger';
}, 1000);

setValues();