

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
                    elementBuild('div', {'id' : 'computerContainer', 'class' : 'gameboard'})),
                
                elementBuild('div', {'id' : 'placeShipContainer', 'class' : 'hidden'},
                    elementBuild('div', {'id' : 'playerShipContainer', 'class' : 'hidden'} ),
                    elementBuild('div', {'id' : 'infoContainer', 'class' : 'hidden'}, 
                        elementBuild('h1', {'id' : 'placeShipTitle'},),
                        elementBuild('button', {'id' : 'axisButt'}, "CHANGE AXIS")
                        ))
            ),
            
            elementBuild('footer', {'id' : 'footer'}, 'Created by Hans Jensen')  
        )  

    body.appendChild(template);
}

function buildGrid(player, computer) {
   
    if (computer){
        const computerContainer = document.getElementById('computerContainer')
        computerContainer.textContent = "";
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
    }
    const playerContainer =   document.getElementById('playerContainer'); 
    
    playerContainer. textContent = ""
    for(let i = 0; i < 100; i++) {
        let id = 'p' + (i + 1)
        let targets = elementBuild('div', {'id' : id, 'class' : 'targets'},)
        
        if (shipCheck((i + 1), player)) {
            targets.classList.add('red')
        }

        if(player.gameboard.missed.includes(i + 1)) {
            targets.innerHTML = '&#x2022;'
        } else if (player.gameboard.hit.includes(i+ 1)) {
            targets.innerHTML = '	<p>&#x1f4a5;</p>'
        }

         playerContainer.appendChild(targets)
    }

       
}

function shipPlaceGrid(placeShip, player, axis = true, x = 0) {
    
    
    const playerShipContainer = document.getElementById('playerShipContainer');
    let infoCont = document. getElementById('infoContainer');
    infoCont.classList.add('gameboard')
    let title = document.getElementById('placeShipTitle')
    playerShipContainer.classList.add('gameboard')
    playerShipContainer.textContent = ""
    title.textContent =""
    
    let axisButt = document.getElementById('axisButt')
    axisButt.addEventListener('click', () => {
        let axisnew = axis !== true;
        shipPlaceGrid(placeShip, player, axisnew, x)
    })


    if( axis === true) {
        if(!x){

            let arr = [1,2,3,4,5,6,7,11,12,13,14,15,16,17,21,22,23,24,25,26,27,31,32,33,34,35,36,37,41,42,43,44,45,46,47,51,52,53,54,55,56,57,61,62,63,64,65,66,67,71,72,73,74,75,76,77,81,82,83,84,85,86,87,91,92,93,,94,95,96,97]
            title.textContent ="PLACE YOUR BATTLESHIP"
            for(let i = 0; i < 100; i++) {
            
                let id = i + 1
                let targets = elementBuild('div', {'id' : id, 'class' : 'targets'},)
                
                if(arr.includes(id)) {
                    targets.classList.add('four')
                    targets.addEventListener('click', e => {
                      
                        if(placeShip(0, id, true) === false) {
                            return shipPlaceGrid(placeShip, player, true)
                        }
                        shipPlaceGrid(placeShip, player, true, 1)


                    })
                }
            
                playerShipContainer.appendChild(targets)
            }
            
            
        } else if (x === 1) {
            let arr = [1,2,3,4,5,6,11,12,13,14,15,16,21,22,23,24,25,26,31,32,33,34,35,36,41,42,43,44,45,46,51,52,53,54,55,56,61,62,63,64,65,66,71,72,73,74,75,76,81,82,83,84,85,86,91,92,93,94,95,96]
            title.textContent ="PLACE YOUR CARRIER"
            for(let i = 0; i < 100; i++) {
            
                let id = i + 1
                let targets = elementBuild('div', {'id' : id, 'class' : 'targets'},)
                if (shipCheck(id, player)) {
                    targets.classList.add('red')
                }
                if(arr.includes(id)) {
                    targets.classList.add('five')
                    targets.addEventListener('click', e => {
                        
                        
                        if(placeShip(1,id,true) === false) {
                            
                            return shipPlaceGrid(placeShip, player, true, 1)
                        }
                        shipPlaceGrid(placeShip, player, true, 2)


                    })
                }
            
                playerShipContainer.appendChild(targets)
            }
        } else if (x === 2) {
            let arr = [1,2,3,4,5,6,11,12,13,14,15,16,21,22,23,24,25,26,31,32,33,34,35,36,41,42,43,44,45,46,51,52,53,54,55,56,61,62,63,64,65,66,71,72,73,74,75,76,81,82,83,84,85,86,91,92,93,94,95,96,7,8,17,18,27,28,37,38,47,48,57,58,67,68,77,78,87,88,97,98]
            title.textContent ="PLACE YOUR CRUISER"
            for(let i = 0; i < 100; i++) {
            
                let id = i + 1
                let targets = elementBuild('div', {'id' : id, 'class' : 'targets'},)
                if (shipCheck(id, player)) {
                    targets.classList.add('red')
                }
                if(arr.includes(id)) {
                    targets.classList.add('three')
                    targets.addEventListener('click', e => {
                        
                        if(placeShip(2, id, true)=== false) {
                           return shipPlaceGrid(placeShip, player, true, 2)
                        }
                        
                        shipPlaceGrid(placeShip,player,true, 3)


                    })
                }
            
                playerShipContainer.appendChild(targets)
            }
        } else if (x === 3) {
            let arr = [1,2,3,4,5,6,11,12,13,14,15,16,21,22,23,24,25,26,31,32,33,34,35,36,41,42,43,44,45,46,51,52,53,54,55,56,61,62,63,64,65,66,71,72,73,74,75,76,81,82,83,84,85,86,91,92,93,94,95,96,7,8,17,18,27,28,37,38,47,48,57,58,67,68,77,78,87,88,97,98]
            title.textContent ="PLACE YOUR SUBMARINE"
            for(let i = 0; i < 100; i++) {
            
                let id = i + 1
                let targets = elementBuild('div', {'id' : id, 'class' : 'targets'},)
                if (shipCheck(id, player)) {
                    targets.classList.add('red')
                }
                if(arr.includes(id)) {
                    targets.classList.add('three')
                    targets.addEventListener('click', e => {
                        if(placeShip(3, id, true) === false) {
                            return shipPlaceGrid(placeShip,player,true, 3)
                        }
                        shipPlaceGrid(placeShip,player,true, 4)


                    })
                }
            
                playerShipContainer.appendChild(targets)

            } 

        } else {
            let arr = [1,2,3,4,5,6,11,12,13,14,15,16,21,22,23,24,25,26,31,32,33,34,35,36,41,42,43,44,45,46,51,52,53,54,55,56,61,62,63,64,65,66,71,72,73,74,75,76,81,82,83,84,85,86,91,92,93,94,95,96,7,8,17,18,27,28,37,38,47,48,57,58,67,68,77,78,87,88,97,98]
            title.textContent ="PLACE YOUR DESTROYER"
            for(let i = 0; i < 100; i++) {
            
                let id = i + 1
                let targets = elementBuild('div', {'id' : id, 'class' : 'targets'},)
                if (shipCheck(id, player)) {
                    targets.classList.add('red')
                }
                if(arr.includes(id)) {
                    targets.classList.add('two')
                    targets.addEventListener('click', e => {
                        if(placeShip(4, id, true)=== false) {
                            return shipPlaceGrid(placeShip,player,true,4)
                        }
                        buildGrid(player)
                        popUpBackground('placeShips')

                    })
                }
            
                playerShipContainer.appendChild(targets)
            }
        }
    } else {
        if(!x){
            title.textContent ="PLACE YOUR BATTLESHIP"
            

            for(let i = 0; i < 100; i++) {
            
                let id = i + 1
                let targets = elementBuild('div', {'id' : id, 'class' : 'targets'},)
                
                if(id < 71) {
                    targets.classList.add('fourv')
                    targets.addEventListener('click', e => {
                        if(placeShip(0, id, false)=== false) {
                            return shipPlaceGrid(placeShip,player, false)
                        }
                        shipPlaceGrid(placeShip,player, false, 1)


                    })
                }
            
                playerShipContainer.appendChild(targets)
            }
            
            
        } else if (x === 1) {
            title.textContent ="PLACE YOUR CARRIER"

            for(let i = 0; i < 100; i++) {
                
                let id = i + 1
                let targets = elementBuild('div', {'id' : id, 'class' : 'targets'},)
               
                if (shipCheck(id, player)) {
                    targets.classList.add('red')
                }

                if(id < 61) {
                    targets.classList.add('fivev')
                    targets.addEventListener('click', e => {
                        if (placeShip(1, id, false) === false) {
                            return shipPlaceGrid(placeShip, player,false, 1)
                        }
                        shipPlaceGrid(placeShip,player, false, 2)


                    })
                }
            
                playerShipContainer.appendChild(targets)
            }
        } else if (x === 2) {
            title.textContent ="PLACE YOUR CRUISER"

            for(let i = 0; i < 100; i++) {
               
                let id = i + 1
                let targets = elementBuild('div', {'id' : id, 'class' : 'targets'},)
                
                if (shipCheck(id, player)) {
                    targets.classList.add('red')
                }

                if(id < 81) {
                    targets.classList.add('threev')
                    targets.addEventListener('click', e => {
                        if(placeShip(2, id, false) === false) {
                            return shipPlaceGrid(placeShip,player, false, 2)
                        }
                        shipPlaceGrid(placeShip, player, false, 3)


                    })
                }
            
                playerShipContainer.appendChild(targets)
            }
        } else if (x === 3) {
            title.textContent ="PLACE YOUR SUBMARINE"

            for(let i = 0; i < 100; i++) {
                
                let id = i + 1
                let targets = elementBuild('div', {'id' : id, 'class' : 'targets'},)
                

                if (shipCheck(id, player)) {
                    targets.classList.add('red')
                }
                
                
                if(id < 81) {
                    targets.classList.add('threev')
                    targets.addEventListener('click', e => {
                        if(placeShip(3, id, false) === false) {
                            return shipPlaceGrid(placeShip,player,  false, 3)
                        }
                        shipPlaceGrid(placeShip, player, false, 4)


                    })
                }
            
                playerShipContainer.appendChild(targets)

            } 

        } else {
            title.textContent ="PLACE YOUR DESTROYER"

            for(let i = 0; i < 100; i++) {
            
                let id = i + 1
                let targets = elementBuild('div', {'id' : id, 'class' : 'targets'},)
                
                if (shipCheck(id, player)) {
                    targets.classList.add('red')
                }

                if(id < 91) {
                    targets.classList.add('twov')
                    targets.addEventListener('click', e => {
                        if (placeShip(4, id, false) === false) {
                            return shipPlaceGrid(placeShip, player, false, 4)
                        }
                        buildGrid(player)
                        popUpBackground('placeShips')

                    })
                }
            
                playerShipContainer.appendChild(targets)
            }
        }
    
    }
}

function popUpBackground(event, user) {
    console.log('yo')
    let background = document.getElementById('popBackground')
    let gameOver = document.getElementById('gameOver')
    let gameOverTitle = document.getElementById('gameOverTitle')
    let startGame = document.getElementById('startGame')
    let placeShip = document.getElementById('placeShipContainer')
    let gridCont = document.getElementById('playerShipContainer')
    let infoCont = document. getElementById('infoContainer')
    if (event === 'gameOver') {
        background.classList.toggle('hidden')
        gameOver.classList.toggle('hidden')
        gameOverTitle.textContent = user + ' wins!'
    } else if (event === 'startGame') {
        background.classList.toggle('hidden')
        startGame.classList.toggle('hidden')
        placeShip.classList.toggle('hidden')
        gridCont.classList.toggle('hidden')
        infoCont.classList.toggle('hidden')
    } else if (event === 'playAgain') {
        gameOver.classList.toggle('hidden')
        startGame.classList.toggle('hidden')
    } else if (event === 'placeShips') {
        placeShip.classList.toggle('hidden')
        gridCont.classList.toggle('hidden')
        infoCont.classList.toggle('hidden')
        
    }


}

function shipCheck(id, player) {
    for (let i = 0; i < player.gameboard.ships.length; i++) {
            
                   
             if (player.gameboard.ships[i].coordinates.includes(id)) {
            return true;
        }
        
    }
}

 
 return {buildPage, buildGrid, popUpBackground, shipPlaceGrid}

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