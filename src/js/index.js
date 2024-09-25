const game = {
    // Add clicks
    addClick:()=>{
        game.clicks++;
        game.addMonster();
    },
    // Add monsters
    addMonster:()=>{
        let multipliers = [];
        for(const upgrade of game.activeUpgrades){
            console.log(game.activeUpgrades)
            multipliers.push(upgrade.multiplier)
        }


        let multiplier = multipliers.reduce((acc,curr)=> acc+curr,0);
        game.monsterAmount+= 1 * multiplier;
        document.querySelector('#count-amount').textContent=`x ${game.monsterAmount}`
        
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
            multiplier: 2,
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
    },
    getMonstersLeft: ()=>{
        for(const upgrade of game.upgrades){
            upgrade.monstersLeftToBuy = upgrade.price - game.monsterAmount
            document.getElementById(`${upgrade.name}-price`).textContent = `Price: ${upgrade.price} >> Monsters remaining to buy: ${upgrade.monstersLeftToBuy}`
        }
    }
}
game.addUpgrade(game.upgrades[0])
document.querySelector('#leah').addEventListener('mousedown',(e)=>{
e.preventDefault()
    console.clear()
    game.addClick()
    console.table(game.upgrades)
})