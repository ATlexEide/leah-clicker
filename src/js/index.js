const game = {
    // Add clicks
    addClick:()=>{
        game.clicks++;
        game.addMonster();
    },
    // Add monsters
    addMonster:()=>{
        game.monsterAmount++;
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
            name: 'Programmer Socks',
            price: 100,
            monstersLeftToBuy: 999,
            multiplier: undefined,
            description:'lorem ipsum',

        },
        {
            name: 'Miku',
            price: 100,
            monstersLeftToBuy: 999,
            multiplier: undefined,
            description:'lorem ipsum',

        },
        {
            name: 'Neeko',
            price: 100,
            monstersLeftToBuy: 999,
            multiplier: undefined,        
            description:'lorem ipsum',

        },
    ],
    getMonstersLeft: ()=>{
        for(const upgrade of game.upgrades){
            upgrade.monstersLeftToBuy = upgrade.price - game.monsterAmount
            console.log(`Monsters left to buy ${upgrade.name}: ${upgrade.monstersLeftToBuy}`)
        }
    }
}
document.querySelector('#leah').addEventListener('mousedown',(e)=>{
e.preventDefault()
    game.addClick()
})



console.log(game.upgrades[0].left)