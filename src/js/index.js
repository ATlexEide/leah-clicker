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
    monsterAmount: 0,
    // Clicks
    clicks: 0,
    // Upgrades
    upgrades:[
        {   
            name: 'programmerSocks',
            price: 100,
            monstersLeftToBuy: 999,
            multiplier: 0.5,
            description:'lorem ipsum',

        },
        {
            name: 'miku',
            price: 500,
            monstersLeftToBuy: 999,
            multiplier: undefined,
            description:'lorem ipsum',

        },
        {
            name: 'neeko',
            price: 1000,
            monstersLeftToBuy: 999,
            multiplier: undefined,        
            description:'lorem ipsum',

        },
    ],
    activeUpgrades:[],
    addUpgrade:(upgrade)=>{
        game.activeUpgrades.push(upgrade)
        const list = document.getElementById('stats-upgrades-display')
        list.innerHTML = '';
        for(const upgrade of game.activeUpgrades){
            const li = document.createElement('li');
            li.textContent = upgrade.name;
            list.appendChild(li)
        }
    },
    getMonstersLeft: ()=>{
        for(const upgrade of game.upgrades){
            upgrade.monstersLeftToBuy = upgrade.price - game.monsterAmount
            document.getElementById(`${upgrade.name}-price`).textContent = `Price: ${upgrade.price} >> Monsters remaining to buy: ${upgrade.monstersLeftToBuy.toFixed(1)}`
        }
    }
}


// ///////TESTING//////////
document.querySelector('#programmerSocks-buy').addEventListener('click',()=>{
    if(game.monsterAmount >= game.upgrades[0].price){
        game.addUpgrade(game.upgrades[0]);
        game.monsterAmount -= game.upgrades[0].price
        game.updateDisplay()
    }
})
// /////////////////////////


game.addUpgrade(game.upgrades[0])
document.querySelector('#leah').addEventListener('mousedown',(e)=>{
e.preventDefault()
    console.clear()
    game.addClick()
    console.table(game.upgrades)
})