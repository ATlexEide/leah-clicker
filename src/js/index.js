const game = {
    imageRotation:{
        image: document.querySelector('#leah'),
        deg:0,
    },
    // What do you think
    init:(()=>{
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
    })(),
    // Read the key name
    printUpgradeInfo:()=>{
        for(const upgrade of Object.entries(game.upgrades)){
            if(!upgrade)
                return
            document.getElementById(`${upgrade[1].id}-desc`).textContent = upgrade[1].description;
        }
    },
    updateDisplay: ()=>{
    document.querySelector('#count-amount').textContent=`x ${game.monsterAmount.toFixed(1)}`;
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
    upgrades:{
        programmerSocks:{   
            id: 'programmerSocks',
            name:'Programmer Socks',
            price: 100,
            monstersLeftToBuy: 999,
            multiplier: 0.5,
            description:'Sokker som gir deg en buff på programmering. Debuff på straightness. Følger med vscode themes!',
            amount:0,
            },
        miku:{
            id: 'miku',
            name:'Miku',
            price: 500,
            monstersLeftToBuy: 999,
            multiplier: 10,
            description:'Beste vocaloid artisten. En kjærlig og fantastisk vocaloid som eier hele verden og skaper glede.',
            amount:0,
            },
        neeko:{
            id: 'neeko',
            name:'Neeko',
            price: 1000,
            monstersLeftToBuy: 999,
            multiplier: 100,        
            description:'En vill og quirky kvinne med lesbiske tendenser. Shuma sniffer og hella cute. Bird fetishiser.',
            amount:0,
            },
    },
    // List of active/bought upgrades
    activeUpgrades:[],
    // Add upgrade to active upgrades
    addUpgrade:(upgrade)=>{
        const currUpgrade = game.upgrades[upgrade];
        game.multiplier += currUpgrade.multiplier;
        currUpgrade.amount++;
        game.activeUpgrades.push(currUpgrade);
     
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
            }else{
                document.querySelector(`#${upgrade.id}-li`).textContent=`${upgrade.name} x${upgrade.amount}`;
            };
        };
    },
    // Get and display amount of monsters left to buy upgrade
    getMonstersLeft: ()=>{
        for(const upgrade of Object.entries(game.upgrades)){
            const item = upgrade[1];
            item.monstersLeftToBuy = item.price - game.monsterAmount;
            const priceElement = document.getElementById(`${item.id}-price`);
            priceElement.textContent = `Price: ${item.price} >> Monsters remaining to buy: ${item.monstersLeftToBuy.toFixed(1)}`;
        };
    },
    // If player has enough monsters for an upgrade, add upgrade and delete monsters
    priceCheck:(upgrade)=>{
    if(game.monsterAmount >= game.upgrades[upgrade].price){
        game.addUpgrade(upgrade);
        game.monsterAmount -= game.upgrades[upgrade].price;
        game.updateDisplay();
    };
},
};

// ///////TESTING//////////
const btns = document.querySelectorAll('.upgrade-buttons');
for(const button of btns){
button.addEventListener('click',()=>{
        const upgrade = button.id;
        game.priceCheck(upgrade);
        game.getMonstersLeft();
    });
};
game.printUpgradeInfo()
game.getMonstersLeft()
// /////////////////////////
