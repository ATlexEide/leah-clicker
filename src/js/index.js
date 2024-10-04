import { displayUpgrades } from "./displayUpgrades.mjs";
import { upgrades } from "./upgrades.mjs";
displayUpgrades();
let game = {
    imageRotation:{
        image: document.querySelector('#leah'),
        deg:0,
    },
    // What do you think
    init:()=>{
        console.log('Init');
        // Check for clicks
        document.querySelector('#leah').addEventListener('mousedown',(e)=>{
        game.imageRotation.deg += 10;
        e.preventDefault();
        console.clear();
        game.addClick();
        console.table(game.upgrades)
        game.imageRotation.image.style.rotate=`${game.imageRotation.deg}deg`;
        document.title = `x ${game.monsterAmount}`;
});
    },
    // Read the key name
    printUpgradeInfo:()=>{
        game.upgrades.forEach(upgrade => {
            if(upgrade === null || upgrade === undefined){
                return;
            }else{
            document.getElementById(`${upgrade.id}-desc`).textContent = upgrade.description;
        }});
    },
    updateDisplay: ()=>{
    document.querySelector('#count-amount').textContent=`x ${game.monsterAmount.toFixed(1)}`;
    document.querySelector('#clicks-display').textContent=`${game.clicks}`;
game.displayActiveUpgrades();

    },
    // Read the key name
    addClick:()=>{
        const clicks = document.getElementById('clicks-display');
        game.clicks++;
        clicks.textContent = `${game.clicks}`;
        game.addMonster();
    },
    multiplier: 1,
    // Read the key name
    addMonster:()=>{
        game.monsterAmount += 1 * game.multiplier;
        // Display how many monsters the player have
        document.querySelector('#count-amount').textContent=`x ${game.monsterAmount.toFixed(1)}`;
        game.getMonstersLeft();
    },
    // // White Monsters / Points
    monsterAmount: 0,
    // Amount of registered clicks
    clicks: 0,
    // Available upgrades
    upgrades:upgrades,
    // List of active/bought upgrades
    activeUpgrades:[],
    // Add upgrade to active upgrades
    addUpgrade:(upgrade)=>{
        game.multiplier += upgrade.multiplier;
        upgrade.amount++;
        game.activeUpgrades.push(upgrade);
        game.displayActiveUpgrades();
        game.updateDisplay();
    },
     displayActiveUpgrades:()=>{
         const list = document.getElementById('stats-upgrades-display');
         list.innerHTML = '';
         for(const upgrade of game.activeUpgrades){
             const currLi = document.getElementById(`${upgrade.id}-li`);
             if(upgrade === undefined)
                return;
            if(!list.contains(currLi)){
                const li = document.createElement('li');
                li.id = `${upgrade.id}-li`;
                li.textContent = upgrade.name;
                list.appendChild(li);
            }else if(upgrade.amount >1){
                document.querySelector(`#${upgrade.id}-li`).textContent=`${upgrade.name} x${upgrade.amount}`;
            };
        };
    },
    // Get and display amount of monsters left to buy upgrade
    getMonstersLeft: ()=>{
        game.upgrades.forEach(upgrade => {
            if(upgrade === null || upgrade === undefined){
                return;
            }else {
                const item = upgrade;
                item.monstersLeftToBuy = item.price - game.monsterAmount;
                const priceElement = document.getElementById(`${item.id}-price`);
                priceElement.textContent = `Price: ${item.price} >> Monsters remaining to buy: ${item.monstersLeftToBuy.toFixed(1)}`;
            }
    
        });
    },
    // If player has enough monsters for an upgrade, add upgrade and delete monsters
    priceCheck:(upgrade)=>{
    if(game.monsterAmount >= upgrade.price){
        game.addUpgrade(upgrade);
        game.monsterAmount -= upgrade.price;
        game.updateDisplay();
    };
},

};

// ///////TESTING//////////

const btns = document.querySelectorAll('.upgrade-button');
for(const button of btns){
button.addEventListener('click',()=>{
        const upgrade = button.id;
        game.priceCheck(game.upgrades.find(obj => obj.id === upgrade));
        game.getMonstersLeft();
    });
};


document.getElementById('save-button').addEventListener('click',()=>{
localStorage.setItem("game-data", JSON.stringify(game));


    alert('Progress saved')
});



game.printUpgradeInfo()
game.getMonstersLeft()
// /////////////////////////
if(localStorage.length > 0){
            const gameData = JSON.parse(localStorage.getItem('game-data'));
            game.clicks = gameData.clicks;
            game.monsterAmount = gameData.monsterAmount;
            game.activeUpgrades = gameData.activeUpgrades;
            game.upgrades = gameData.upgrades;
            game.multiplier = gameData.multiplier;
            game.updateDisplay();
        };
game.init()
console.log(game.activeUpgrades)
