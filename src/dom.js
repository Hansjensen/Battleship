


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
    
    container.textContent = ""
    let idLet = player.name === 'computer' ?
                'c' : 'p';
   
    for(let i = 0; i < 100; i++) {
        let id = idLet + (i + 1)
        let targets = elementBuild('div', {'id' : id, 'class' : 'targets'},)
        if (hover) {
            targets.classList.add(hover)
        }
        targets.addEventListener('click', event => {
            let square = event.target.id
            let id = Number(square.slice(1, 4))
            let user = square.slice(0,1)
            
            if (user = 'c') {
                player.gameboard.recieveAttack(id)
                
                console.log(player.gameboard.missed)
                console.log(player.gameboard.hit)
            }
            if (player.gameboard.missed.includes(id)) {

                targets.textContent = "x"
            } else if (player.gameboard.hit.includes(id)){
                targets.innerHTML = "<p>&#x1f4a5;</p>"
            }
        })
        container.appendChild(targets)
       
    }

    if (player.gameboard.missed.length > 0) {

        console.log('k')
        for(let i in player.gameboard.missed) {

            let id = idLet + player.gameboard.missed[i]
            let square = document.getElementById(id)
            square.textContent = "X"

        }
        

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