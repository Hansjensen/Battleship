

const dom = (() => {
function buildPage() {

    const body = document.querySelector('body')
    const template = 
        elementBuild('div', {'id' : 'wrapper'}, 
            elementBuild('header', {'id' : 'header'},
                elementBuild('div', {'id' : 'logo'}, 'BATTLESHIP')),
            elementBuild('div', {'id' : 'popBackground'},
                elementBuild('div', {'id' : 'gameOver' , 'class' : 'hidden'}, 
                    elementBuild('h1', {'id' : 'gameOverTitle'}, ),
                    elementBuild('button', {'id' : 'playAgain'}, "PLAY AGAIN")),
                elementBuild('div', {'id' : 'startGame'}, 
                    elementBuild('h1', {'id' : 'startGameTitle'}, "ENTER YOUR NAME"),
                    elementBuild('input', {'type' : 'text', 'id' : 'nameInput'}),
                    elementBuild('button', {'id' : 'startGameButt'}, "START GAME")) ),
            elementBuild('div', {'id' : 'gameContainer'},
               
                elementBuild('div', {'id' : 'gameboardContainer'},
                    elementBuild('div', {'id' : 'playerContainer', 'class' : 'gameboard'} ),
                    elementBuild('div', {'id' : 'computerContainer', 'class' : 'gameboard'}))
                ),
            elementBuild('footer', {'id' : 'footer'}, 'Created by Hans Jensen')  
        )  

    body.appendChild(template);
}

function buildGrid(player, computer) {
    const computerContainer = document.getElementById('computerContainer')
    const playerContainer =   document.getElementById('playerContainer'); 
    
    computerContainer.textContent = "";
    playerContainer. textContent = ""
    
   
    for(let i = 0; i < 100; i++) {
        let id = 'c' + (i + 1)
        let targets = elementBuild('div', {'id' : id, 'class' : 'targets'},)
        
        targets.classList.add('hover')

        if(computer.gameboard.missed.includes(i + 1)) {
            targets.innerHTML = '&#x2022;'
        } else if (computer.gameboard.hit.includes(i+ 1)) {
            targets.innerHTML = '	<p>&#x1f4a5;</p>'
        }

         computerContainer.appendChild(targets)
    }

    for(let i = 0; i < 100; i++) {
        let id = 'p' + (i + 1)
        let targets = elementBuild('div', {'id' : id, 'class' : 'targets'},)
        
       

        if(player.gameboard.missed.includes(i + 1)) {
            targets.innerHTML = '&#x2022;'
        } else if (player.gameboard.hit.includes(i+ 1)) {
            targets.innerHTML = '	<p>&#x1f4a5;</p>'
        }

         playerContainer.appendChild(targets)
    }

       
 }

 function popUpBackground(event, user) {
    console.log('yo')
    let background = document.getElementById('popBackground')
    let gameOver = document.getElementById('gameOver')
    let gameOverTitle = document.getElementById('gameOverTitle')
    let startGame = document.getElementById('startGame')
    if (event === 'gameOver') {
        background.classList.toggle('hidden')
        gameOver.classList.toggle('hidden')
        gameOverTitle.textContent = user + ' wins!'
    } else if (event === 'startGame') {
        background.classList.toggle('hidden')
        startGame.classList.toggle('hidden')
    } else if (event === 'playAgain') {
        gameOver.classList.toggle('hidden')
        startGame.classList.toggle('hidden')
        
    }


 }

 
 return {buildPage, buildGrid, popUpBackground}

})();

        

 










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

export { dom}