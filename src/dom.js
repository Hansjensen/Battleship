


function buildPage() {

    const body = document.querySelector('body')
    const template = 
        elementBuild('div', {'id' : 'wrapper'}, 
            elementBuild('header', {'id' : 'header'},
                elementBuild('div', {'id' : 'logo'}, 'BATTLESHIP')),
            elementBuild('div', {'id' : 'gameContainer'},
                elementBuild('div', {'id' : 'messageContainer'}, "testing"),
                elementBuild('div', {'id' : 'gameboardContainer'},
                    elementBuild('div', {'id' : 'playerContainer', 'class' : 'gameboard'} ),
                    elementBuild('div', {'id' : 'computerContainer', 'class' : 'gameboard'}))
                ),
            elementBuild('footer', {'id' : 'footer'}, 'Created by Hans Jensen')  
        )  

    body.appendChild(template);
}

function buildGrid(player, hover) {
    const container = player.name === 'computer' ? 
                document.getElementById('computerContainer')
                : document.getElementById('playerContainer'); 
    
    let idLet = player.name === 'computer' ?
                'c' : 'p';
   
    for(let i = 0; i < 100; i++) {
        let id = idLet + (i + 1)
        let target = elementBuild('div', {'id' : id, 'class' : 'target'},)
        if (hover) {
            target.classList.add(hover)
        }
        container.appendChild(target)
       
    }


}









function elementBuild (type, attributes, ...children) {

    const element = document.createElement(type)
    
    for (let key in attributes) {

        element.setAttribute(key, attributes[key])
    }

    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child))
        }  else{
            element.appendChild(child)
        }
    })

    return element;
}

export { buildPage, buildGrid }