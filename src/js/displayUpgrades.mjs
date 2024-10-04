import { upgrades } from "./upgrades.mjs";


export function createUpgradeElement(upgrade){
    const upgradeDiv = document.querySelector('#upgrades');
    const div = document.createElement('div');
    div.classList.add('upgrade');

    const header = document.createElement('header');
    header.classList.add('upgrade-header');
    
    const h1 = document.createElement('h1');
    h1.classList.add('upgrade-name');
    h1.id = `${upgrade.id}-title`;
    h1.textContent = `${upgrade.name}`;
    
    header.appendChild(h1);
    div.appendChild(header)
    
    const body = document.createElement('div');
    body.classList.add('upgrade-body');
    

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('upgrade-img');
    
    const img = document.createElement('img');
    img.src = `${upgrade.imgSrc}`;
    img.setAttribute('alt',`${upgrade.imgAlt}`);

    imgDiv.appendChild(img);
    body.appendChild(imgDiv);

    const desc = document.createElement('div');
    desc.classList.add('upgrade-desc');

    const h2 = document.createElement('h2');
    h2.classList.add('upgrade-price');
    h2.id = `${upgrade.id}-price`;
    h2.textContent = 'Price: | Monsters remaining to buy:';

    const p = document.createElement('p');
    p.id = `${upgrade.id}-desc`;
    p.textContent = `${upgrade.description}`;

    desc.appendChild(h2);
    desc.appendChild(p);
    body.appendChild(desc)

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('upgrade-buttons');
    buttonDiv.id = `${upgrade.id}`;

    const button = document.createElement('button');
    button.classList.add('upgrade-button');
    button.id = upgrade.id;
    button.textContent = 'Buy';
    buttonDiv.appendChild(button);
    body.appendChild(buttonDiv);

    
    div.appendChild(body);
    upgradeDiv.appendChild(div);
};
export function displayUpgrades(){
    for(const upgrade of upgrades){
createUpgradeElement(upgrade) 
    }
    
}


// Add imgSrc && imgAlt to all upgrades