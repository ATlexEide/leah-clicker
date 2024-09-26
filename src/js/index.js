// import '../css/style.css';

const game = {
    updateDisplay: ()=>{
                document.querySelector('#count-amount').textContent=`x ${game.monsterAmount.toFixed(1)}`


    },
    // Add clicks
    addClick:()=>{
        const clicks = document.getElementById('clicks-display');
        game.clicks++;
        clicks.textContent = `${game.clicks}`
        game.addMonster();
    },
    // Add monsters
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
    // // White Monsters / Points    monsterAmount: undefined,
    monsterAmount: 90,
    // Clicks
    clicks: 0,
    // Upgrades
    upgrades:{
         programmerSocks:{   
            name: 'programmerSocks',
            price: 100,
            monstersLeftToBuy: 999,
            multiplier: 0.5,
            description:'lorem ipsum',
            owned:0,

        },
        miku:{
            name: 'miku',
            price: 500,
            monstersLeftToBuy: 999,
            multiplier: 10,
            description:'lorem ipsum',
            owned:0,

        },
        neeko:{
            name: 'neeko',
            price: 1000,
            monstersLeftToBuy: 999,
            multiplier: undefined,        
            description:'lorem ipsum',
            owned:0,

        },
    },
    activeUpgrades:[],
    addUpgrade:(upgrade)=>{

game.activeUpgrades.push(game.upgrades[upgrade])



      
        const list = document.getElementById('stats-upgrades-display')
        list.innerHTML = '';
        for(const upgrade of game.activeUpgrades){
            if(upgrade === undefined)
                return
            const li = document.createElement('li');
            li.textContent = upgrade.name;
            list.appendChild(li)
        }
    },
    getMonstersLeft: ()=>{
        for(const upgrade of Object.entries(game.upgrades)){
            const item = upgrade[1];
            item.monstersLeftToBuy = item.price - game.monsterAmount;
            const priceElement = document.getElementById(`${item.name}-price`);
            priceElement.textContent = `Price: ${item.price} >> Monsters remaining to buy: ${item.monstersLeftToBuy.toFixed(1)}`;
        }
    }
}


// ///////TESTING//////////
const programmerSocksBtn = document.querySelector('#programmerSocks-buy');
programmerSocksBtn.addEventListener('click',()=>{
   const upgrade = programmerSocksBtn.id.split('-')[0];
    if(game.monsterAmount >= game.upgrades[upgrade].price){
        game.addUpgrade(upgrade);
        game.monsterAmount -= game.upgrades[upgrade].price
        game.updateDisplay()
    }
})
// /////////////////////////


game.addUpgrade('miku')
document.querySelector('#leah').addEventListener('mousedown',(e)=>{
e.preventDefault()
console.clear()
game.addClick()
console.table(game.upgrades)
document.title = `x ${game.monsterAmount}`
})