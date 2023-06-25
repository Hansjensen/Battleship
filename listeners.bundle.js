"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["listeners"],{

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dom: () => (/* binding */ dom)
/* harmony export */ });


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



/***/ }),

/***/ "./src/factory.js":
/*!************************!*\
  !*** ./src/factory.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gameboard: () => (/* binding */ Gameboard),
/* harmony export */   Player: () => (/* binding */ Player),
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });



const Ship = (type, length) => {

    let name = type;
    let hits = 0;
    length= length;
    let coordinates = []
    

    function hit() {
        this.hits++
        
     
    }

    function isSunk() {
  
        if(this.hits === this.length) {
          return true;
        } else {
        return false;
        }
    }
    return {name, length, hits, hit, isSunk, coordinates}
}

const Gameboard = () => {

    let missed = []
    let hit = []
    let shipsSunk= 0
    let ships = []
    let axis = true
    
    
    const placeShip = (x, y, axis = true) => {

        let ship = shipType(x)

        
        
        ship.coordinates = coordinateCreator(axis, y, ship.length) 
                            
        
        
        if (ship.coordinates === false) {
    
            return false;
        }
        
        ships.push(ship)
        return true;
        
    }

    const shipType = (x) => {

        return x === 0 ? Ship('Battleship', 4)
            : x === 1 ? Ship('Carrier', 5)
            : x === 2 ? Ship('Cruiser', 3)
            : x === 3 ? Ship('Submarine', 3)
            : Ship('Destroyer', 2);


    }

    const recieveAttack = (x) => {

        
        if  (missed.includes(x) || hit.includes(x)) {
            return "You have already attacked this"
        }
        let ship = null
        for (let i = 0; i < ships.length; i++) {
            if (ships[i].coordinates.includes(x)) {
                ship = ships[i]
            }
        }
        
        if (ship != null) {
            ship.hit()
            hit.push(x)
        } else (
            missed.push(x)
        )


    }


    const shipsSunkCheck = () => {
        let shipsSunk = 0
        for (let i = 0; i < ships.length; i++) {
            if(ships[i].isSunk()) {
                shipsSunk ++
            }
        }
        return shipsSunk
    }

    const coordinateCreator = (axis, coordinate, shipLength) => {
        
        let arr = []
        if (coordinate === NaN || coordinate === undefined) {
            return false
        }
        
        if (axis == true) {
            for(let i= 0; i < shipLength; i++) {
                if (doubleChecker(coordinate)) {
                    return false;
                }
                arr.push(coordinate)
                coordinate += 1
                }

            } else {
                for(let i= 0; i < shipLength ; i++) {
                    if (doubleChecker(coordinate)) {
                        return false;
                    }
                    arr.push(coordinate)
                    coordinate += 10
               
                
        }
        
        
        }
    

    return arr
}

    const doubleChecker = (x) => {
        
        for (let i in ships) {
            
            if (!ships[i]) {
                return false;
            }
        
            if (ships[i].coordinates.includes(x)) {
                return true;
            }
            
        }
        return false;

    }


return { missed, hit, placeShip, ships, recieveAttack, shipsSunk, shipsSunkCheck}
}

const Player = (x) => {
    
    const gameboard = Gameboard()

    let name = x || "computer"

    
    // an array of the moves that have not been called.
    let moves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]

    

    const checkGameOver = () => {
         if (gameboard.shipsSunkCheck() === 5) {
            return true
         }
         return false
    }

    const attack = (x, y) => {

        if (!y) {
            
            let move = computerMove()      // call for random number from remaining moves array
            x.gameboard.recieveAttack(move); 
            let bye = moves.indexOf(move); //find index of move left in array.
            moves.splice(bye, 1) // delete move
           
            
        } else {

           return x.gameboard.recieveAttack(y)
        }
    }

    const computerMove = () => {
        let len = moves.length
        
        let move = Math.floor(Math.random() * len) 
        
        return moves[move]
        
    }

    
    
    return {gameboard, moves, name, checkGameOver, attack}
}




/***/ }),

/***/ "./src/gameloop.js":
/*!*************************!*\
  !*** ./src/gameloop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gameloop: () => (/* binding */ gameloop)
/* harmony export */ });
/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory */ "./src/factory.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");




const gameloop = () => {
    let player =  (0,_factory__WEBPACK_IMPORTED_MODULE_0__.Player)()
    let computer = (0,_factory__WEBPACK_IMPORTED_MODULE_0__.Player)()

    const newGame = (x) => {
        player =  (0,_factory__WEBPACK_IMPORTED_MODULE_0__.Player)()
        computer = (0,_factory__WEBPACK_IMPORTED_MODULE_0__.Player)()
        
        createTemplate();
        createGrid();
        autoPlaceShip(0);
        
        _dom__WEBPACK_IMPORTED_MODULE_1__.dom.shipPlaceGrid(placeShip, player)
        ;(0,_listeners__WEBPACK_IMPORTED_MODULE_2__.buttonListeners)(playAgain, setName)
        
    }

    const playAgain = () => {
        player =  (0,_factory__WEBPACK_IMPORTED_MODULE_0__.Player)()
        computer = (0,_factory__WEBPACK_IMPORTED_MODULE_0__.Player)()
        
        createGrid();
        autoPlaceShip(0);
        
        _dom__WEBPACK_IMPORTED_MODULE_1__.dom.shipPlaceGrid(placeShip, player)
        
    }

    const setName = (name) => {
        
        player.name = name
    }

    const createTemplate= () => {

        _dom__WEBPACK_IMPORTED_MODULE_1__.dom.buildPage();
        


    }

    const createGrid = () => {
       
        _dom__WEBPACK_IMPORTED_MODULE_1__.dom.buildGrid(player, computer)
       
        const targets = document.querySelectorAll('.hover')
            targets.forEach(item =>{
                item.addEventListener('click', event => {
                    
                    let square = event.target.id 
                    
                    if (!square) {
                        parent = event.target.parentNode;
                        square = parent.id;
                    }
                    
                    let id = Number(square.slice(1, 4))
                    
                    makeMove(id);
                    
                    createGrid();
                }) 
            })
    }

    const placeShip = (x, y, axis) => {
        if (player.gameboard.placeShip(x, y, axis) === false) {

            return false
        }
        
        
    }

    const autoPlaceShip = (i, axis = false) => {
        
        if (i > 4) {
            return;
        }
       
        axis = !axis
        let move;
       if (axis === true)  {
           if (i === 0) {
                let arr = [1,2,3,4,5,6,7,11,12,13,14,15,16,17,21,22,23,24,25,26,27,31,32,33,34,35,36,37,41,42,43,44,45,46,47,51,52,53,54,55,56,57,61,62,63,64,65,66,67,71,72,73,74,75,76,77,81,82,83,84,85,86,87,91,92,93,94,95,96,97]
            
                move = arr[randomNum(arr.length)]
            }
             if (i=== 1) {
                let arr = [1,2,3,4,5,6,11,12,13,14,15,16,21,22,23,24,25,26,31,32,33,34,35,36,41,42,43,44,45,46,51,52,53,54,55,56,61,62,63,64,65,66,71,72,73,74,75,76,81,82,83,84,85,86,91,92,93,94,95,96]   
                move = arr[randomNum(arr.length)]
            }
            if (i===2 || i === 3) {
                let arr = [1,2,3,4,5,6,11,12,13,14,15,16,21,22,23,24,25,26,31,32,33,34,35,36,41,42,43,44,45,46,51,52,53,54,55,56,61,62,63,64,65,66,71,72,73,74,75,76,81,82,83,84,85,86,91,92,93,94,95,96,7,8,17,18,27,28,37,38,47,48,57,58,67,68,77,78,87,88,97,98]
                move = arr[randomNum(arr.length)]
            }
            if (i === 4) {
                 let arr = [1,2,3,4,5,6,11,12,13,14,15,16,21,22,23,24,25,26,31,32,33,34,35,36,41,42,43,44,45,46,51,52,53,54,55,56,61,62,63,64,65,66,71,72,73,74,75,76,81,82,83,84,85,86,91,92,93,94,95,96,7,8,17,18,27,28,37,38,47,48,57,58,67,68,77,78,87,88,97,98]
                 move = arr[randomNum(arr.length)]
            }
        } 
        if (axis === false) {
            if (i === 0) {
                
            
                move = randomNum(70)
            }
             if (i === 1) {
              
                move = randomNum(60)
            }
            if (i===2 || i === 3) {
                
                move = randomNum(80)
            }
            if (i === 4) {
                
                 move = randomNum(90)
            }
        }
        
        if(!computer.gameboard.placeShip(i, move, axis)) {
            autoPlaceShip(i,axis)
        }  else {
            i++
            autoPlaceShip(i,axis)
        }
        
        
        
    }


    const randomNum = (max) => {
        
        let num = Math.floor(Math.random() * max + 1)
        
        return num;
    }    

    const makeMove = (id) => {
        
        let move = player.attack(computer, id)

        if (move === "You have already attacked this") {
            return
        }

                    
        if(computer.checkGameOver()) {
            _dom__WEBPACK_IMPORTED_MODULE_1__.dom.popUpBackground('gameOver', player.name)
        }
        computer.attack(player) 
        if(player.checkGameOver()) {
            _dom__WEBPACK_IMPORTED_MODULE_1__.dom.popUpBackground('gameOver', computer.name)
        }
    }

    return {player, computer, setName, createTemplate, createGrid, newGame, autoPlaceShip}
}



/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buttonListeners: () => (/* binding */ buttonListeners)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factory */ "./src/factory.js");
/* harmony import */ var _gameloop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameloop */ "./src/gameloop.js");




function buttonListeners(x, y) {

    let playagain = document.getElementById('playAgain')
    let startGame = document.getElementById('startGameButt')
    let nameInput = document.getElementById('nameInput')
    

    playagain.addEventListener('click', e => {
        _dom__WEBPACK_IMPORTED_MODULE_0__.dom.popUpBackground('playAgain', "reset")
        x()

    })

    startGame.addEventListener('click', e => {
        y(nameInput.value)
        _dom__WEBPACK_IMPORTED_MODULE_0__.dom.popUpBackground('startGame', )
    })
    
}



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/listeners.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVkscUNBQUc7QUFDZjtBQUNBO0FBQ0E7QUFDQSxZQUFZLHFDQUFHO0FBQ2Y7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSzJCO0FBQ087QUFDRzs7QUFFckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLHFDQUFHO0FBQ1g7O0FBRUEsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsUUFBUSxxQ0FBRztBQUNYLEtBQUs7QUFDTDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9saXN0ZW5lcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cbmNvbnN0IGRvbSA9ICgoKSA9PiB7XG5mdW5jdGlvbiBidWlsZFBhZ2UoKSB7XG5cbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG4gICAgY29uc3QgdGVtcGxhdGUgPSBcbiAgICAgICAgZWxlbWVudEJ1aWxkKCdkaXYnLCB7J2lkJyA6ICd3cmFwcGVyJ30sIFxuICAgICAgICAgICAgZWxlbWVudEJ1aWxkKCdoZWFkZXInLCB7J2lkJyA6ICdoZWFkZXInfSxcbiAgICAgICAgICAgICAgICBlbGVtZW50QnVpbGQoJ2RpdicsIHsnaWQnIDogJ2xvZ28nfSwgJ0JBVFRMRVNISVAnKSksXG4gICAgICAgICAgICBlbGVtZW50QnVpbGQoJ2RpdicsIHsnaWQnIDogJ3BvcEJhY2tncm91bmQnfSxcbiAgICAgICAgICAgICAgICBlbGVtZW50QnVpbGQoJ2RpdicsIHsnaWQnIDogJ2dhbWVPdmVyJyAsICdjbGFzcycgOiAnaGlkZGVuJ30sIFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50QnVpbGQoJ2gxJywgeydpZCcgOiAnZ2FtZU92ZXJUaXRsZSd9LCApLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50QnVpbGQoJ2J1dHRvbicsIHsnaWQnIDogJ3BsYXlBZ2Fpbid9LCBcIlBMQVkgQUdBSU5cIikpLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiAnc3RhcnRHYW1lJ30sIFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50QnVpbGQoJ2gxJywgeydpZCcgOiAnc3RhcnRHYW1lVGl0bGUnfSwgXCJFTlRFUiBZT1VSIE5BTUVcIiksXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRCdWlsZCgnaW5wdXQnLCB7J3R5cGUnIDogJ3RleHQnLCAnaWQnIDogJ25hbWVJbnB1dCd9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudEJ1aWxkKCdidXR0b24nLCB7J2lkJyA6ICdzdGFydEdhbWVCdXR0J30sIFwiU1RBUlQgR0FNRVwiKSkgKSxcbiAgICAgICAgICAgIGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiAnZ2FtZUNvbnRhaW5lcid9LFxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZWxlbWVudEJ1aWxkKCdkaXYnLCB7J2lkJyA6ICdnYW1lYm9hcmRDb250YWluZXInfSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudEJ1aWxkKCdkaXYnLCB7J2lkJyA6ICdwbGF5ZXJDb250YWluZXInLCAnY2xhc3MnIDogJ2dhbWVib2FyZCd9ICksXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiAnY29tcHV0ZXJDb250YWluZXInLCAnY2xhc3MnIDogJ2dhbWVib2FyZCd9KSksXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZWxlbWVudEJ1aWxkKCdkaXYnLCB7J2lkJyA6ICdwbGFjZVNoaXBDb250YWluZXInLCAnY2xhc3MnIDogJ2hpZGRlbid9LFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50QnVpbGQoJ2RpdicsIHsnaWQnIDogJ3BsYXllclNoaXBDb250YWluZXInLCAnY2xhc3MnIDogJ2hpZGRlbid9ICksXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiAnaW5mb0NvbnRhaW5lcicsICdjbGFzcycgOiAnaGlkZGVuJ30sIFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudEJ1aWxkKCdoMScsIHsnaWQnIDogJ3BsYWNlU2hpcFRpdGxlJ30sKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRCdWlsZCgnYnV0dG9uJywgeydpZCcgOiAnYXhpc0J1dHQnfSwgXCJDSEFOR0UgQVhJU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVsZW1lbnRCdWlsZCgnZm9vdGVyJywgeydpZCcgOiAnZm9vdGVyJ30sICdDcmVhdGVkIGJ5IEhhbnMgSmVuc2VuJykgIFxuICAgICAgICApICBcblxuICAgIGJvZHkuYXBwZW5kQ2hpbGQodGVtcGxhdGUpO1xufVxuXG5mdW5jdGlvbiBidWlsZEdyaWQocGxheWVyLCBjb21wdXRlcikge1xuICAgXG4gICAgaWYgKGNvbXB1dGVyKXtcbiAgICAgICAgY29uc3QgY29tcHV0ZXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXJDb250YWluZXInKVxuICAgICAgICBjb21wdXRlckNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgbGV0IGlkID0gJ2MnICsgKGkgKyAxKVxuICAgICAgICAgICAgbGV0IHRhcmdldHMgPSBlbGVtZW50QnVpbGQoJ2RpdicsIHsnaWQnIDogaWQsICdjbGFzcycgOiAndGFyZ2V0cyd9LClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCdob3ZlcicpXG5cbiAgICAgICAgICAgIGlmKGNvbXB1dGVyLmdhbWVib2FyZC5taXNzZWQuaW5jbHVkZXMoaSArIDEpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0cy5pbm5lckhUTUwgPSAnJiN4MjAyMjsnXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbXB1dGVyLmdhbWVib2FyZC5oaXQuaW5jbHVkZXMoaSsgMSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRzLmlubmVySFRNTCA9ICdcdDxwPiYjeDFmNGE1OzwvcD4nXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbXB1dGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhcmdldHMpXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcGxheWVyQ29udGFpbmVyID0gICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyQ29udGFpbmVyJyk7IFxuICAgIFxuICAgIHBsYXllckNvbnRhaW5lci4gdGV4dENvbnRlbnQgPSBcIlwiXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgIGxldCBpZCA9ICdwJyArIChpICsgMSlcbiAgICAgICAgbGV0IHRhcmdldHMgPSBlbGVtZW50QnVpbGQoJ2RpdicsIHsnaWQnIDogaWQsICdjbGFzcycgOiAndGFyZ2V0cyd9LClcbiAgICAgICAgXG4gICAgICAgIGlmIChzaGlwQ2hlY2soKGkgKyAxKSwgcGxheWVyKSkge1xuICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCdyZWQnKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYocGxheWVyLmdhbWVib2FyZC5taXNzZWQuaW5jbHVkZXMoaSArIDEpKSB7XG4gICAgICAgICAgICB0YXJnZXRzLmlubmVySFRNTCA9ICcmI3gyMDIyOydcbiAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXIuZ2FtZWJvYXJkLmhpdC5pbmNsdWRlcyhpKyAxKSkge1xuICAgICAgICAgICAgdGFyZ2V0cy5pbm5lckhUTUwgPSAnXHQ8cD4mI3gxZjRhNTs8L3A+J1xuICAgICAgICB9XG5cbiAgICAgICAgIHBsYXllckNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXJnZXRzKVxuICAgIH1cblxuICAgICAgIFxufVxuXG5mdW5jdGlvbiBzaGlwUGxhY2VHcmlkKHBsYWNlU2hpcCwgcGxheWVyLCBheGlzID0gdHJ1ZSwgeCA9IDApIHtcbiAgICBcbiAgICBcbiAgICBjb25zdCBwbGF5ZXJTaGlwQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllclNoaXBDb250YWluZXInKTtcbiAgICBsZXQgaW5mb0NvbnQgPSBkb2N1bWVudC4gZ2V0RWxlbWVudEJ5SWQoJ2luZm9Db250YWluZXInKTtcbiAgICBpbmZvQ29udC5jbGFzc0xpc3QuYWRkKCdnYW1lYm9hcmQnKVxuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZVNoaXBUaXRsZScpXG4gICAgcGxheWVyU2hpcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdnYW1lYm9hcmQnKVxuICAgIHBsYXllclNoaXBDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPVwiXCJcbiAgICBcbiAgICBsZXQgYXhpc0J1dHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXhpc0J1dHQnKVxuICAgIGF4aXNCdXR0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsZXQgYXhpc25ldyA9IGF4aXMgIT09IHRydWU7XG4gICAgICAgIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLCBwbGF5ZXIsIGF4aXNuZXcsIHgpXG4gICAgfSlcblxuXG4gICAgaWYoIGF4aXMgPT09IHRydWUpIHtcbiAgICAgICAgaWYoIXgpe1xuXG4gICAgICAgICAgICBsZXQgYXJyID0gWzEsMiwzLDQsNSw2LDcsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMzEsMzIsMzMsMzQsMzUsMzYsMzcsNDEsNDIsNDMsNDQsNDUsNDYsNDcsNTEsNTIsNTMsNTQsNTUsNTYsNTcsNjEsNjIsNjMsNjQsNjUsNjYsNjcsNzEsNzIsNzMsNzQsNzUsNzYsNzcsODEsODIsODMsODQsODUsODYsODcsOTEsOTIsOTMsLDk0LDk1LDk2LDk3XVxuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPVwiUExBQ0UgWU9VUiBCQVRUTEVTSElQXCJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaSArIDFcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiBpZCwgJ2NsYXNzJyA6ICd0YXJnZXRzJ30sKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKGFyci5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCdmb3VyJylcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxhY2VTaGlwKDAsIGlkLCB0cnVlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hpcFBsYWNlR3JpZChwbGFjZVNoaXAsIHBsYXllciwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLCBwbGF5ZXIsIHRydWUsIDEpXG5cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHBsYXllclNoaXBDb250YWluZXIuYXBwZW5kQ2hpbGQodGFyZ2V0cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSBpZiAoeCA9PT0gMSkge1xuICAgICAgICAgICAgbGV0IGFyciA9IFsxLDIsMyw0LDUsNiwxMSwxMiwxMywxNCwxNSwxNiwyMSwyMiwyMywyNCwyNSwyNiwzMSwzMiwzMywzNCwzNSwzNiw0MSw0Miw0Myw0NCw0NSw0Niw1MSw1Miw1Myw1NCw1NSw1Niw2MSw2Miw2Myw2NCw2NSw2Niw3MSw3Miw3Myw3NCw3NSw3Niw4MSw4Miw4Myw4NCw4NSw4Niw5MSw5Miw5Myw5NCw5NSw5Nl1cbiAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID1cIlBMQUNFIFlPVVIgQ0FSUklFUlwiXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBpZCA9IGkgKyAxXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldHMgPSBlbGVtZW50QnVpbGQoJ2RpdicsIHsnaWQnIDogaWQsICdjbGFzcycgOiAndGFyZ2V0cyd9LClcbiAgICAgICAgICAgICAgICBpZiAoc2hpcENoZWNrKGlkLCBwbGF5ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMuY2xhc3NMaXN0LmFkZCgncmVkJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoYXJyLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmNsYXNzTGlzdC5hZGQoJ2ZpdmUnKVxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxhY2VTaGlwKDEsaWQsdHJ1ZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLCBwbGF5ZXIsIHRydWUsIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwUGxhY2VHcmlkKHBsYWNlU2hpcCwgcGxheWVyLCB0cnVlLCAyKVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwbGF5ZXJTaGlwQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhcmdldHMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoeCA9PT0gMikge1xuICAgICAgICAgICAgbGV0IGFyciA9IFsxLDIsMyw0LDUsNiwxMSwxMiwxMywxNCwxNSwxNiwyMSwyMiwyMywyNCwyNSwyNiwzMSwzMiwzMywzNCwzNSwzNiw0MSw0Miw0Myw0NCw0NSw0Niw1MSw1Miw1Myw1NCw1NSw1Niw2MSw2Miw2Myw2NCw2NSw2Niw3MSw3Miw3Myw3NCw3NSw3Niw4MSw4Miw4Myw4NCw4NSw4Niw5MSw5Miw5Myw5NCw5NSw5Niw3LDgsMTcsMTgsMjcsMjgsMzcsMzgsNDcsNDgsNTcsNTgsNjcsNjgsNzcsNzgsODcsODgsOTcsOThdXG4gICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9XCJQTEFDRSBZT1VSIENSVUlTRVJcIlxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBpICsgMVxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRzID0gZWxlbWVudEJ1aWxkKCdkaXYnLCB7J2lkJyA6IGlkLCAnY2xhc3MnIDogJ3RhcmdldHMnfSwpXG4gICAgICAgICAgICAgICAgaWYgKHNoaXBDaGVjayhpZCwgcGxheWVyKSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmNsYXNzTGlzdC5hZGQoJ3JlZCcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGFyci5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCd0aHJlZScpXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxhY2VTaGlwKDIsIGlkLCB0cnVlKT09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLCBwbGF5ZXIsIHRydWUsIDIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLHBsYXllcix0cnVlLCAzKVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwbGF5ZXJTaGlwQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhcmdldHMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoeCA9PT0gMykge1xuICAgICAgICAgICAgbGV0IGFyciA9IFsxLDIsMyw0LDUsNiwxMSwxMiwxMywxNCwxNSwxNiwyMSwyMiwyMywyNCwyNSwyNiwzMSwzMiwzMywzNCwzNSwzNiw0MSw0Miw0Myw0NCw0NSw0Niw1MSw1Miw1Myw1NCw1NSw1Niw2MSw2Miw2Myw2NCw2NSw2Niw3MSw3Miw3Myw3NCw3NSw3Niw4MSw4Miw4Myw4NCw4NSw4Niw5MSw5Miw5Myw5NCw5NSw5Niw3LDgsMTcsMTgsMjcsMjgsMzcsMzgsNDcsNDgsNTcsNTgsNjcsNjgsNzcsNzgsODcsODgsOTcsOThdXG4gICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9XCJQTEFDRSBZT1VSIFNVQk1BUklORVwiXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBpZCA9IGkgKyAxXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldHMgPSBlbGVtZW50QnVpbGQoJ2RpdicsIHsnaWQnIDogaWQsICdjbGFzcycgOiAndGFyZ2V0cyd9LClcbiAgICAgICAgICAgICAgICBpZiAoc2hpcENoZWNrKGlkLCBwbGF5ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMuY2xhc3NMaXN0LmFkZCgncmVkJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoYXJyLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmNsYXNzTGlzdC5hZGQoJ3RocmVlJylcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxhY2VTaGlwKDMsIGlkLCB0cnVlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hpcFBsYWNlR3JpZChwbGFjZVNoaXAscGxheWVyLHRydWUsIDMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwUGxhY2VHcmlkKHBsYWNlU2hpcCxwbGF5ZXIsdHJ1ZSwgNClcblxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcGxheWVyU2hpcENvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXJnZXRzKVxuXG4gICAgICAgICAgICB9IFxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgYXJyID0gWzEsMiwzLDQsNSw2LDExLDEyLDEzLDE0LDE1LDE2LDIxLDIyLDIzLDI0LDI1LDI2LDMxLDMyLDMzLDM0LDM1LDM2LDQxLDQyLDQzLDQ0LDQ1LDQ2LDUxLDUyLDUzLDU0LDU1LDU2LDYxLDYyLDYzLDY0LDY1LDY2LDcxLDcyLDczLDc0LDc1LDc2LDgxLDgyLDgzLDg0LDg1LDg2LDkxLDkyLDkzLDk0LDk1LDk2LDcsOCwxNywxOCwyNywyOCwzNywzOCw0Nyw0OCw1Nyw1OCw2Nyw2OCw3Nyw3OCw4Nyw4OCw5Nyw5OF1cbiAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID1cIlBMQUNFIFlPVVIgREVTVFJPWUVSXCJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaSArIDFcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiBpZCwgJ2NsYXNzJyA6ICd0YXJnZXRzJ30sKVxuICAgICAgICAgICAgICAgIGlmIChzaGlwQ2hlY2soaWQsIHBsYXllcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCdyZWQnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihhcnIuaW5jbHVkZXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMuY2xhc3NMaXN0LmFkZCgndHdvJylcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxhY2VTaGlwKDQsIGlkLCB0cnVlKT09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaGlwUGxhY2VHcmlkKHBsYWNlU2hpcCxwbGF5ZXIsdHJ1ZSw0KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRHcmlkKHBsYXllcilcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcFVwQmFja2dyb3VuZCgncGxhY2VTaGlwcycpXG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwbGF5ZXJTaGlwQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhcmdldHMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZigheCl7XG4gICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9XCJQTEFDRSBZT1VSIEJBVFRMRVNISVBcIlxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaSArIDFcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiBpZCwgJ2NsYXNzJyA6ICd0YXJnZXRzJ30sKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKGlkIDwgNzEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCdmb3VydicpXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYWNlU2hpcCgwLCBpZCwgZmFsc2UpPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLHBsYXllciwgZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwUGxhY2VHcmlkKHBsYWNlU2hpcCxwbGF5ZXIsIGZhbHNlLCAxKVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwbGF5ZXJTaGlwQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhcmdldHMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2UgaWYgKHggPT09IDEpIHtcbiAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID1cIlBMQUNFIFlPVVIgQ0FSUklFUlwiXG5cbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBpZCA9IGkgKyAxXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldHMgPSBlbGVtZW50QnVpbGQoJ2RpdicsIHsnaWQnIDogaWQsICdjbGFzcycgOiAndGFyZ2V0cyd9LClcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzaGlwQ2hlY2soaWQsIHBsYXllcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCdyZWQnKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGlkIDwgNjEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCdmaXZldicpXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZVNoaXAoMSwgaWQsIGZhbHNlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hpcFBsYWNlR3JpZChwbGFjZVNoaXAsIHBsYXllcixmYWxzZSwgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLHBsYXllciwgZmFsc2UsIDIpXG5cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHBsYXllclNoaXBDb250YWluZXIuYXBwZW5kQ2hpbGQodGFyZ2V0cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh4ID09PSAyKSB7XG4gICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9XCJQTEFDRSBZT1VSIENSVUlTRVJcIlxuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBpZCA9IGkgKyAxXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldHMgPSBlbGVtZW50QnVpbGQoJ2RpdicsIHsnaWQnIDogaWQsICdjbGFzcycgOiAndGFyZ2V0cyd9LClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoc2hpcENoZWNrKGlkLCBwbGF5ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMuY2xhc3NMaXN0LmFkZCgncmVkJylcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihpZCA8IDgxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMuY2xhc3NMaXN0LmFkZCgndGhyZWV2JylcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxhY2VTaGlwKDIsIGlkLCBmYWxzZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLHBsYXllciwgZmFsc2UsIDIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwUGxhY2VHcmlkKHBsYWNlU2hpcCwgcGxheWVyLCBmYWxzZSwgMylcblxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcGxheWVyU2hpcENvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXJnZXRzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHggPT09IDMpIHtcbiAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID1cIlBMQUNFIFlPVVIgU1VCTUFSSU5FXCJcblxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaSArIDFcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiBpZCwgJ2NsYXNzJyA6ICd0YXJnZXRzJ30sKVxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgaWYgKHNoaXBDaGVjayhpZCwgcGxheWVyKSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmNsYXNzTGlzdC5hZGQoJ3JlZCcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKGlkIDwgODEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCd0aHJlZXYnKVxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwbGFjZVNoaXAoMywgaWQsIGZhbHNlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hpcFBsYWNlR3JpZChwbGFjZVNoaXAscGxheWVyLCAgZmFsc2UsIDMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwUGxhY2VHcmlkKHBsYWNlU2hpcCwgcGxheWVyLCBmYWxzZSwgNClcblxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcGxheWVyU2hpcENvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXJnZXRzKVxuXG4gICAgICAgICAgICB9IFxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9XCJQTEFDRSBZT1VSIERFU1RST1lFUlwiXG5cbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaSArIDFcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiBpZCwgJ2NsYXNzJyA6ICd0YXJnZXRzJ30sKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzaGlwQ2hlY2soaWQsIHBsYXllcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCdyZWQnKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGlkIDwgOTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCd0d292JylcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlU2hpcCg0LCBpZCwgZmFsc2UpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaGlwUGxhY2VHcmlkKHBsYWNlU2hpcCwgcGxheWVyLCBmYWxzZSwgNClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkR3JpZChwbGF5ZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3BVcEJhY2tncm91bmQoJ3BsYWNlU2hpcHMnKVxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcGxheWVyU2hpcENvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXJnZXRzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwb3BVcEJhY2tncm91bmQoZXZlbnQsIHVzZXIpIHtcbiAgICBjb25zb2xlLmxvZygneW8nKVxuICAgIGxldCBiYWNrZ3JvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcEJhY2tncm91bmQnKVxuICAgIGxldCBnYW1lT3ZlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lT3ZlcicpXG4gICAgbGV0IGdhbWVPdmVyVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZU92ZXJUaXRsZScpXG4gICAgbGV0IHN0YXJ0R2FtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydEdhbWUnKVxuICAgIGxldCBwbGFjZVNoaXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2VTaGlwQ29udGFpbmVyJylcbiAgICBsZXQgZ3JpZENvbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyU2hpcENvbnRhaW5lcicpXG4gICAgbGV0IGluZm9Db250ID0gZG9jdW1lbnQuIGdldEVsZW1lbnRCeUlkKCdpbmZvQ29udGFpbmVyJylcbiAgICBpZiAoZXZlbnQgPT09ICdnYW1lT3ZlcicpIHtcbiAgICAgICAgYmFja2dyb3VuZC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuICAgICAgICBnYW1lT3Zlci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuICAgICAgICBnYW1lT3ZlclRpdGxlLnRleHRDb250ZW50ID0gdXNlciArICcgd2lucyEnXG4gICAgfSBlbHNlIGlmIChldmVudCA9PT0gJ3N0YXJ0R2FtZScpIHtcbiAgICAgICAgYmFja2dyb3VuZC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuICAgICAgICBzdGFydEdhbWUuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgICAgICAgcGxhY2VTaGlwLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgICAgIGdyaWRDb250LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgICAgIGluZm9Db250LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgfSBlbHNlIGlmIChldmVudCA9PT0gJ3BsYXlBZ2FpbicpIHtcbiAgICAgICAgZ2FtZU92ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgICAgICAgc3RhcnRHYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgfSBlbHNlIGlmIChldmVudCA9PT0gJ3BsYWNlU2hpcHMnKSB7XG4gICAgICAgIHBsYWNlU2hpcC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuICAgICAgICBncmlkQ29udC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuICAgICAgICBpbmZvQ29udC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuICAgICAgICBcbiAgICB9XG5cblxufVxuXG5mdW5jdGlvbiBzaGlwQ2hlY2soaWQsIHBsYXllcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyLmdhbWVib2FyZC5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgaWYgKHBsYXllci5nYW1lYm9hcmQuc2hpcHNbaV0uY29vcmRpbmF0ZXMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59XG5cbiBcbiByZXR1cm4ge2J1aWxkUGFnZSwgYnVpbGRHcmlkLCBwb3BVcEJhY2tncm91bmQsIHNoaXBQbGFjZUdyaWR9XG5cbn0pKCk7XG5cbiAgICAgICAgXG5cbiBcblxuXG5cblxuXG5cblxuXG5cblxuZnVuY3Rpb24gZWxlbWVudEJ1aWxkICh0eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xuXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSlcbiAgICBcbiAgICBmb3IgKGxldCBrZXkgaW4gYXR0cmlidXRlcykge1xuXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKVxuICAgIH1cblxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCkpXG4gICAgICAgIH0gIGVsc2V7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBlbGVtZW50O1xufVxuXG5leHBvcnQgeyBkb219IiwiXG5cblxuY29uc3QgU2hpcCA9ICh0eXBlLCBsZW5ndGgpID0+IHtcblxuICAgIGxldCBuYW1lID0gdHlwZTtcbiAgICBsZXQgaGl0cyA9IDA7XG4gICAgbGVuZ3RoPSBsZW5ndGg7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gW11cbiAgICBcblxuICAgIGZ1bmN0aW9uIGhpdCgpIHtcbiAgICAgICAgdGhpcy5oaXRzKytcbiAgICAgICAgXG4gICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgXG4gICAgICAgIGlmKHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7bmFtZSwgbGVuZ3RoLCBoaXRzLCBoaXQsIGlzU3VuaywgY29vcmRpbmF0ZXN9XG59XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcblxuICAgIGxldCBtaXNzZWQgPSBbXVxuICAgIGxldCBoaXQgPSBbXVxuICAgIGxldCBzaGlwc1N1bms9IDBcbiAgICBsZXQgc2hpcHMgPSBbXVxuICAgIGxldCBheGlzID0gdHJ1ZVxuICAgIFxuICAgIFxuICAgIGNvbnN0IHBsYWNlU2hpcCA9ICh4LCB5LCBheGlzID0gdHJ1ZSkgPT4ge1xuXG4gICAgICAgIGxldCBzaGlwID0gc2hpcFR5cGUoeClcblxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHNoaXAuY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlQ3JlYXRvcihheGlzLCB5LCBzaGlwLmxlbmd0aCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXMgPT09IGZhbHNlKSB7XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHNoaXBzLnB1c2goc2hpcClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGNvbnN0IHNoaXBUeXBlID0gKHgpID0+IHtcblxuICAgICAgICByZXR1cm4geCA9PT0gMCA/IFNoaXAoJ0JhdHRsZXNoaXAnLCA0KVxuICAgICAgICAgICAgOiB4ID09PSAxID8gU2hpcCgnQ2FycmllcicsIDUpXG4gICAgICAgICAgICA6IHggPT09IDIgPyBTaGlwKCdDcnVpc2VyJywgMylcbiAgICAgICAgICAgIDogeCA9PT0gMyA/IFNoaXAoJ1N1Ym1hcmluZScsIDMpXG4gICAgICAgICAgICA6IFNoaXAoJ0Rlc3Ryb3llcicsIDIpO1xuXG5cbiAgICB9XG5cbiAgICBjb25zdCByZWNpZXZlQXR0YWNrID0gKHgpID0+IHtcblxuICAgICAgICBcbiAgICAgICAgaWYgIChtaXNzZWQuaW5jbHVkZXMoeCkgfHwgaGl0LmluY2x1ZGVzKHgpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJZb3UgaGF2ZSBhbHJlYWR5IGF0dGFja2VkIHRoaXNcIlxuICAgICAgICB9XG4gICAgICAgIGxldCBzaGlwID0gbnVsbFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2hpcHNbaV0uY29vcmRpbmF0ZXMuaW5jbHVkZXMoeCkpIHtcbiAgICAgICAgICAgICAgICBzaGlwID0gc2hpcHNbaV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHNoaXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgc2hpcC5oaXQoKVxuICAgICAgICAgICAgaGl0LnB1c2goeClcbiAgICAgICAgfSBlbHNlIChcbiAgICAgICAgICAgIG1pc3NlZC5wdXNoKHgpXG4gICAgICAgIClcblxuXG4gICAgfVxuXG5cbiAgICBjb25zdCBzaGlwc1N1bmtDaGVjayA9ICgpID0+IHtcbiAgICAgICAgbGV0IHNoaXBzU3VuayA9IDBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoc2hpcHNbaV0uaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICBzaGlwc1N1bmsgKytcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2hpcHNTdW5rXG4gICAgfVxuXG4gICAgY29uc3QgY29vcmRpbmF0ZUNyZWF0b3IgPSAoYXhpcywgY29vcmRpbmF0ZSwgc2hpcExlbmd0aCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyciA9IFtdXG4gICAgICAgIGlmIChjb29yZGluYXRlID09PSBOYU4gfHwgY29vcmRpbmF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGF4aXMgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgZm9yKGxldCBpPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvdWJsZUNoZWNrZXIoY29vcmRpbmF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcnIucHVzaChjb29yZGluYXRlKVxuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGUgKz0gMVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9IDA7IGkgPCBzaGlwTGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb3VibGVDaGVja2VyKGNvb3JkaW5hdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goY29vcmRpbmF0ZSlcbiAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZSArPSAxMFxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB9XG4gICAgXG5cbiAgICByZXR1cm4gYXJyXG59XG5cbiAgICBjb25zdCBkb3VibGVDaGVja2VyID0gKHgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgaW4gc2hpcHMpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFzaGlwc1tpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoc2hpcHNbaV0uY29vcmRpbmF0ZXMuaW5jbHVkZXMoeCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuXG5yZXR1cm4geyBtaXNzZWQsIGhpdCwgcGxhY2VTaGlwLCBzaGlwcywgcmVjaWV2ZUF0dGFjaywgc2hpcHNTdW5rLCBzaGlwc1N1bmtDaGVja31cbn1cblxuY29uc3QgUGxheWVyID0gKHgpID0+IHtcbiAgICBcbiAgICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoKVxuXG4gICAgbGV0IG5hbWUgPSB4IHx8IFwiY29tcHV0ZXJcIlxuXG4gICAgXG4gICAgLy8gYW4gYXJyYXkgb2YgdGhlIG1vdmVzIHRoYXQgaGF2ZSBub3QgYmVlbiBjYWxsZWQuXG4gICAgbGV0IG1vdmVzID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCwgMjEsIDIyLCAyMywgMjQsIDI1LCAyNiwgMjcsIDI4LCAyOSwgMzAsIDMxLCAzMiwgMzMsIDM0LCAzNSwgMzYsIDM3LCAzOCwgMzksIDQwLCA0MSwgNDIsIDQzLCA0NCwgNDUsIDQ2LCA0NywgNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDU4LCA1OSwgNjAsIDYxLCA2MiwgNjMsIDY0LCA2NSwgNjYsIDY3LCA2OCwgNjksIDcwLCA3MSwgNzIsIDczLCA3NCwgNzUsIDc2LCA3NywgNzgsIDc5LCA4MCwgODEsIDgyLCA4MywgODQsIDg1LCA4NiwgODcsIDg4LCA4OSwgOTAsIDkxLCA5MiwgOTMsIDk0LCA5NSwgOTYsIDk3LCA5OCwgOTksIDEwMF1cblxuICAgIFxuXG4gICAgY29uc3QgY2hlY2tHYW1lT3ZlciA9ICgpID0+IHtcbiAgICAgICAgIGlmIChnYW1lYm9hcmQuc2hpcHNTdW5rQ2hlY2soKSA9PT0gNSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgIH1cbiAgICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjayA9ICh4LCB5KSA9PiB7XG5cbiAgICAgICAgaWYgKCF5KSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBtb3ZlID0gY29tcHV0ZXJNb3ZlKCkgICAgICAvLyBjYWxsIGZvciByYW5kb20gbnVtYmVyIGZyb20gcmVtYWluaW5nIG1vdmVzIGFycmF5XG4gICAgICAgICAgICB4LmdhbWVib2FyZC5yZWNpZXZlQXR0YWNrKG1vdmUpOyBcbiAgICAgICAgICAgIGxldCBieWUgPSBtb3Zlcy5pbmRleE9mKG1vdmUpOyAvL2ZpbmQgaW5kZXggb2YgbW92ZSBsZWZ0IGluIGFycmF5LlxuICAgICAgICAgICAgbW92ZXMuc3BsaWNlKGJ5ZSwgMSkgLy8gZGVsZXRlIG1vdmVcbiAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICByZXR1cm4geC5nYW1lYm9hcmQucmVjaWV2ZUF0dGFjayh5KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY29tcHV0ZXJNb3ZlID0gKCkgPT4ge1xuICAgICAgICBsZXQgbGVuID0gbW92ZXMubGVuZ3RoXG4gICAgICAgIFxuICAgICAgICBsZXQgbW92ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxlbikgXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbW92ZXNbbW92ZV1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgXG4gICAgXG4gICAgcmV0dXJuIHtnYW1lYm9hcmQsIG1vdmVzLCBuYW1lLCBjaGVja0dhbWVPdmVyLCBhdHRhY2t9XG59XG5cblxuZXhwb3J0IHsgU2hpcCwgR2FtZWJvYXJkICwgUGxheWVyfSIsImltcG9ydCB7UGxheWVyfSBmcm9tICcuL2ZhY3RvcnknXG5pbXBvcnQge2RvbX0gZnJvbSAnLi9kb20nXG5pbXBvcnQgeyBidXR0b25MaXN0ZW5lcnMgfSBmcm9tICcuL2xpc3RlbmVycydcblxuY29uc3QgZ2FtZWxvb3AgPSAoKSA9PiB7XG4gICAgbGV0IHBsYXllciA9ICBQbGF5ZXIoKVxuICAgIGxldCBjb21wdXRlciA9IFBsYXllcigpXG5cbiAgICBjb25zdCBuZXdHYW1lID0gKHgpID0+IHtcbiAgICAgICAgcGxheWVyID0gIFBsYXllcigpXG4gICAgICAgIGNvbXB1dGVyID0gUGxheWVyKClcbiAgICAgICAgXG4gICAgICAgIGNyZWF0ZVRlbXBsYXRlKCk7XG4gICAgICAgIGNyZWF0ZUdyaWQoKTtcbiAgICAgICAgYXV0b1BsYWNlU2hpcCgwKTtcbiAgICAgICAgXG4gICAgICAgIGRvbS5zaGlwUGxhY2VHcmlkKHBsYWNlU2hpcCwgcGxheWVyKVxuICAgICAgICBidXR0b25MaXN0ZW5lcnMocGxheUFnYWluLCBzZXROYW1lKVxuICAgICAgICBcbiAgICB9XG5cbiAgICBjb25zdCBwbGF5QWdhaW4gPSAoKSA9PiB7XG4gICAgICAgIHBsYXllciA9ICBQbGF5ZXIoKVxuICAgICAgICBjb21wdXRlciA9IFBsYXllcigpXG4gICAgICAgIFxuICAgICAgICBjcmVhdGVHcmlkKCk7XG4gICAgICAgIGF1dG9QbGFjZVNoaXAoMCk7XG4gICAgICAgIFxuICAgICAgICBkb20uc2hpcFBsYWNlR3JpZChwbGFjZVNoaXAsIHBsYXllcilcbiAgICAgICAgXG4gICAgfVxuXG4gICAgY29uc3Qgc2V0TmFtZSA9IChuYW1lKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBwbGF5ZXIubmFtZSA9IG5hbWVcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVUZW1wbGF0ZT0gKCkgPT4ge1xuXG4gICAgICAgIGRvbS5idWlsZFBhZ2UoKTtcbiAgICAgICAgXG5cblxuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZUdyaWQgPSAoKSA9PiB7XG4gICAgICAgXG4gICAgICAgIGRvbS5idWlsZEdyaWQocGxheWVyLCBjb21wdXRlcilcbiAgICAgICBcbiAgICAgICAgY29uc3QgdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob3ZlcicpXG4gICAgICAgICAgICB0YXJnZXRzLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNxdWFyZSA9IGV2ZW50LnRhcmdldC5pZCBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3F1YXJlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZSA9IHBhcmVudC5pZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkID0gTnVtYmVyKHNxdWFyZS5zbGljZSgxLCA0KSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIG1ha2VNb3ZlKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUdyaWQoKTtcbiAgICAgICAgICAgICAgICB9KSBcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHgsIHksIGF4aXMpID0+IHtcbiAgICAgICAgaWYgKHBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKHgsIHksIGF4aXMpID09PSBmYWxzZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgY29uc3QgYXV0b1BsYWNlU2hpcCA9IChpLCBheGlzID0gZmFsc2UpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGlmIChpID4gNCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIGF4aXMgPSAhYXhpc1xuICAgICAgICBsZXQgbW92ZTtcbiAgICAgICBpZiAoYXhpcyA9PT0gdHJ1ZSkgIHtcbiAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gWzEsMiwzLDQsNSw2LDcsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMzEsMzIsMzMsMzQsMzUsMzYsMzcsNDEsNDIsNDMsNDQsNDUsNDYsNDcsNTEsNTIsNTMsNTQsNTUsNTYsNTcsNjEsNjIsNjMsNjQsNjUsNjYsNjcsNzEsNzIsNzMsNzQsNzUsNzYsNzcsODEsODIsODMsODQsODUsODYsODcsOTEsOTIsOTMsOTQsOTUsOTYsOTddXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBtb3ZlID0gYXJyW3JhbmRvbU51bShhcnIubGVuZ3RoKV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBpZiAoaT09PSAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IFsxLDIsMyw0LDUsNiwxMSwxMiwxMywxNCwxNSwxNiwyMSwyMiwyMywyNCwyNSwyNiwzMSwzMiwzMywzNCwzNSwzNiw0MSw0Miw0Myw0NCw0NSw0Niw1MSw1Miw1Myw1NCw1NSw1Niw2MSw2Miw2Myw2NCw2NSw2Niw3MSw3Miw3Myw3NCw3NSw3Niw4MSw4Miw4Myw4NCw4NSw4Niw5MSw5Miw5Myw5NCw5NSw5Nl0gICBcbiAgICAgICAgICAgICAgICBtb3ZlID0gYXJyW3JhbmRvbU51bShhcnIubGVuZ3RoKV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpPT09MiB8fCBpID09PSAzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IFsxLDIsMyw0LDUsNiwxMSwxMiwxMywxNCwxNSwxNiwyMSwyMiwyMywyNCwyNSwyNiwzMSwzMiwzMywzNCwzNSwzNiw0MSw0Miw0Myw0NCw0NSw0Niw1MSw1Miw1Myw1NCw1NSw1Niw2MSw2Miw2Myw2NCw2NSw2Niw3MSw3Miw3Myw3NCw3NSw3Niw4MSw4Miw4Myw4NCw4NSw4Niw5MSw5Miw5Myw5NCw5NSw5Niw3LDgsMTcsMTgsMjcsMjgsMzcsMzgsNDcsNDgsNTcsNTgsNjcsNjgsNzcsNzgsODcsODgsOTcsOThdXG4gICAgICAgICAgICAgICAgbW92ZSA9IGFycltyYW5kb21OdW0oYXJyLmxlbmd0aCldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICBsZXQgYXJyID0gWzEsMiwzLDQsNSw2LDExLDEyLDEzLDE0LDE1LDE2LDIxLDIyLDIzLDI0LDI1LDI2LDMxLDMyLDMzLDM0LDM1LDM2LDQxLDQyLDQzLDQ0LDQ1LDQ2LDUxLDUyLDUzLDU0LDU1LDU2LDYxLDYyLDYzLDY0LDY1LDY2LDcxLDcyLDczLDc0LDc1LDc2LDgxLDgyLDgzLDg0LDg1LDg2LDkxLDkyLDkzLDk0LDk1LDk2LDcsOCwxNywxOCwyNywyOCwzNywzOCw0Nyw0OCw1Nyw1OCw2Nyw2OCw3Nyw3OCw4Nyw4OCw5Nyw5OF1cbiAgICAgICAgICAgICAgICAgbW92ZSA9IGFycltyYW5kb21OdW0oYXJyLmxlbmd0aCldXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgICAgIGlmIChheGlzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG1vdmUgPSByYW5kb21OdW0oNzApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbW92ZSA9IHJhbmRvbU51bSg2MClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpPT09MiB8fCBpID09PSAzKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbW92ZSA9IHJhbmRvbU51bSg4MClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID09PSA0KSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgIG1vdmUgPSByYW5kb21OdW0oOTApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKCFjb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwKGksIG1vdmUsIGF4aXMpKSB7XG4gICAgICAgICAgICBhdXRvUGxhY2VTaGlwKGksYXhpcylcbiAgICAgICAgfSAgZWxzZSB7XG4gICAgICAgICAgICBpKytcbiAgICAgICAgICAgIGF1dG9QbGFjZVNoaXAoaSxheGlzKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuXG5cbiAgICBjb25zdCByYW5kb21OdW0gPSAobWF4KSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgbnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4ICsgMSlcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBudW07XG4gICAgfSAgICBcblxuICAgIGNvbnN0IG1ha2VNb3ZlID0gKGlkKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgbW92ZSA9IHBsYXllci5hdHRhY2soY29tcHV0ZXIsIGlkKVxuXG4gICAgICAgIGlmIChtb3ZlID09PSBcIllvdSBoYXZlIGFscmVhZHkgYXR0YWNrZWQgdGhpc1wiKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICBpZihjb21wdXRlci5jaGVja0dhbWVPdmVyKCkpIHtcbiAgICAgICAgICAgIGRvbS5wb3BVcEJhY2tncm91bmQoJ2dhbWVPdmVyJywgcGxheWVyLm5hbWUpXG4gICAgICAgIH1cbiAgICAgICAgY29tcHV0ZXIuYXR0YWNrKHBsYXllcikgXG4gICAgICAgIGlmKHBsYXllci5jaGVja0dhbWVPdmVyKCkpIHtcbiAgICAgICAgICAgIGRvbS5wb3BVcEJhY2tncm91bmQoJ2dhbWVPdmVyJywgY29tcHV0ZXIubmFtZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7cGxheWVyLCBjb21wdXRlciwgc2V0TmFtZSwgY3JlYXRlVGVtcGxhdGUsIGNyZWF0ZUdyaWQsIG5ld0dhbWUsIGF1dG9QbGFjZVNoaXB9XG59XG5cbmV4cG9ydCB7IGdhbWVsb29wIH0iLCJpbXBvcnQgeyBkb20gfSBmcm9tICcuL2RvbSdcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vZmFjdG9yeSdcbmltcG9ydCB7IGdhbWVsb29wIH0gZnJvbSAnLi9nYW1lbG9vcCdcblxuZnVuY3Rpb24gYnV0dG9uTGlzdGVuZXJzKHgsIHkpIHtcblxuICAgIGxldCBwbGF5YWdhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheUFnYWluJylcbiAgICBsZXQgc3RhcnRHYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0R2FtZUJ1dHQnKVxuICAgIGxldCBuYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZUlucHV0JylcbiAgICBcblxuICAgIHBsYXlhZ2Fpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBkb20ucG9wVXBCYWNrZ3JvdW5kKCdwbGF5QWdhaW4nLCBcInJlc2V0XCIpXG4gICAgICAgIHgoKVxuXG4gICAgfSlcblxuICAgIHN0YXJ0R2FtZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICB5KG5hbWVJbnB1dC52YWx1ZSlcbiAgICAgICAgZG9tLnBvcFVwQmFja2dyb3VuZCgnc3RhcnRHYW1lJywgKVxuICAgIH0pXG4gICAgXG59XG5cbmV4cG9ydCB7YnV0dG9uTGlzdGVuZXJzfSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==