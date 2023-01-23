// Variables
let diamondsCounter = 0;
let diamondsPerClick = 1;
let diamondsPerSecond = 0;
let upgradesCosts = [10, 100, 1000, 5000, 100000];
let upgradesBonusMultiplier = [0.1, 1, 5, 10, 100];


const diamondsSelector = document.querySelector('#diamond');
const diamondsPerClickSelector = document.querySelector('#diamonds_per_click');
const diamondsPerSecondSelector = document.querySelector('#diamonds_per_sec');
const gainedDiamondsSelector = document.querySelector('#gained_diamonds');

const levelUpButtonsNodeArr = document.querySelectorAll('.level-up-button');
const levelUpButtons = [...levelUpButtonsNodeArr];

// Event Listener for cookie click
diamondsSelector.addEventListener('click', () => {
    // animation for clicked cookie
    diamondsSelector.classList.add('diamond-clicked');
    setTimeout(() => diamondsSelector.classList.remove('diamond-clicked'), 40);
    diamondsCounter += diamondsPerClick;
    updateMainContainer();
    checkIfUpgradesReady();
});

// DON'T ADD EVENT LISTENER TO EACH BUTTON -> EVENTS SHOULD BE DELEGATED TO THE PARENT AND BASED ON THE CONDITION SOME ACTIONS SHOULD BE PERFORMED (e.target)
levelUpButtons.forEach(function(button, index) {
       button.addEventListener('click', function() {
           if(button.classList.contains('level_up_button_ready')) {
               diamondsPerClick += upgradesBonusMultiplier.at(index) + 0.1 * diamondsPerSecond;
               diamondsPerSecond += upgradesBonusMultiplier.at(index);
               diamondsCounter -= upgradesCosts.at(index);
               upgradesCosts[index] = Math.round(upgradesCosts.at(index) * 1.3);
               updateMainContainer();
               setCostAndUpgradeValues();
               checkIfUpgradesReady();
           }
       })
})


function checkIfUpgradesReady(){
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

function setCostAndUpgradeValues(){
    for(let i=1; i<=5; i++){
        let costId = '#levelUpButton' + i + '_cost';
        let upgradeId = '#levelUpButton' + i + '_upgrade'
        document.querySelector(costId).innerText = upgradesCosts.at(i-1);
        document.querySelector(upgradeId).innerText = upgradesBonusMultiplier.at(i-1);
    }
}

// Interval for cookies per sec
const interval = window.setInterval(function (){
    diamondsCounter += diamondsPerSecond;
    updateMainContainer();
    checkIfUpgradesReady();

    // dynamically change amount of in page tab
    document.title = Math.round(diamondsCounter) + ' diamonds - Diamond Digger';
}, 1000);

setCostAndUpgradeValues();