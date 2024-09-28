const game = {
    // What do you think
    init:(()=>{
        console.log('Init');
        document.querySelector('#leah').addEventListener('mousedown',(e)=>{
        e.preventDefault()
        console.clear()
        game.addClick()
        console.table(game.upgrades)
        document.title = `x ${game.monsterAmount}`
})
    })(),
    // Read the key name
    updateDisplay: ()=>{
                document.querySelector('#count-amount').textContent=`x ${game.monsterAmount.toFixed(1)}`


    },
    // Read the key name
    addClick:()=>{
        const clicks = document.getElementById('clicks-display');
        game.clicks++;
        clicks.textContent = `${game.clicks}`
        game.addMonster();
    },
    // Read the key name
    addMonster:()=>{
        const multipliers = [];
        let multiplier;

        for(const upgrade of game.activeUpgrades){
            if(upgrade === undefined)
                return
            console.log(game.activeUpgrades)
            multipliers.push(upgrade.multiplier)
        }
        if(multipliers.length > 0)
            {     
                multiplier = 1 + multipliers.reduce((acc,curr)=> acc+curr,0);
            }else{
                multiplier = 1
            }
        game.monsterAmount += 1 * multiplier;
        // Display how many monsters the player have
        document.querySelector('#count-amount').textContent=`x ${game.monsterAmount.toFixed(1)}`
        
        game.getMonstersLeft()
    },
    // // White Monsters / Points
    monsterAmount: 90,
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
            description:'lorem ipsum',
            amount:0,

        },
        miku:{
            id: 'miku',
            name:'Miku',
            price: 500,
            monstersLeftToBuy: 999,
            multiplier: 10,
            description:'lorem ipsum',
            amount:0,

        },
        neeko:{
            id: 'neeko',
            name:'Neeko',
            price: 1000,
            monstersLeftToBuy: 999,
            multiplier: 100,        
            description:'lorem ipsum',
            amount:0,

        },
    },
    // List of active/bought upgrades
    activeUpgrades:[],
    // Add upgrade to active upgrades
    addUpgrade:(upgrade)=>{
        game.upgrades[upgrade].amount++
        game.activeUpgrades.push(game.upgrades[upgrade]);
     

        const list = document.getElementById('stats-upgrades-display')
        list.innerHTML = '';
        for(const upgrade of game.activeUpgrades){
           const currLi = document.getElementById(`${upgrade.id}-li`)
            if(upgrade === undefined)
                return
            if(!list.contains(currLi)){
                const li = document.createElement('li');
                li.id = `${upgrade.id}-li`;
                li.textContent = upgrade.name;
                list.appendChild(li);
            }else{
                document.querySelector(`#${upgrade.id}-li`).textContent=`${upgrade.name} x${upgrade.amount}`
            }

            
        }
    },
    getMonstersLeft: ()=>{
        for(const upgrade of Object.entries(game.upgrades)){
            const item = upgrade[1];
            item.monstersLeftToBuy = item.price - game.monsterAmount;
            const priceElement = document.getElementById(`${item.id}-price`);
            priceElement.textContent = `Price: ${item.price} >> Monsters remaining to buy: ${item.monstersLeftToBuy.toFixed(1)}`;
        }
    },
    priceCheck:(upgrade)=>{
    if(game.monsterAmount >= game.upgrades[upgrade].price){
        game.addUpgrade(upgrade);
        game.monsterAmount -= game.upgrades[upgrade].price
        game.updateDisplay()
    }
},
}

// ///////TESTING//////////
const btns = document.querySelectorAll('.upgrade-buttons');
for(const button of btns){
button.addEventListener('click',()=>{
        const upgrade = button.id;
        game.priceCheck(upgrade)
    })
}
// /////////////////////////
game.addUpgrade('miku')
// /////////////////////////    