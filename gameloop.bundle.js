"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["gameloop"],{

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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/gameloop.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZWxvb3AuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE2QixpQkFBaUI7QUFDOUMsb0NBQW9DLGdCQUFnQjtBQUNwRCxxQ0FBcUMsY0FBYztBQUNuRCxpQ0FBaUMsdUJBQXVCO0FBQ3hELHFDQUFxQyx1Q0FBdUM7QUFDNUUsd0NBQXdDLHVCQUF1QjtBQUMvRCw0Q0FBNEMsbUJBQW1CO0FBQy9ELHFDQUFxQyxtQkFBbUI7QUFDeEQsd0NBQXdDLHdCQUF3QjtBQUNoRSwyQ0FBMkMsb0NBQW9DO0FBQy9FLDRDQUE0Qyx1QkFBdUI7QUFDbkUsaUNBQWlDLHVCQUF1QjtBQUN4RDtBQUNBLHFDQUFxQyw0QkFBNEI7QUFDakUseUNBQXlDLGlEQUFpRDtBQUMxRix5Q0FBeUMsa0RBQWtEO0FBQzNGO0FBQ0EscUNBQXFDLGdEQUFnRDtBQUNyRix5Q0FBeUMsa0RBQWtEO0FBQzNGLHlDQUF5QywyQ0FBMkM7QUFDcEYsNENBQTRDLHdCQUF3QjtBQUNwRSxnREFBZ0Qsa0JBQWtCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxnQkFBZ0I7QUFDcEQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQSwrQ0FBK0MsK0JBQStCO0FBQzlFO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkM7QUFDN0MsY0FBYztBQUNkLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBLDJDQUEyQywrQkFBK0I7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUM7QUFDekMsVUFBVTtBQUNWLDhDQUE4QztBQUM5Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCLFNBQVM7QUFDcEM7QUFDQTtBQUNBLG1EQUFtRCwrQkFBK0I7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSwyQkFBMkIsU0FBUztBQUNwQztBQUNBO0FBQ0EsbURBQW1ELCtCQUErQjtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSwyQkFBMkIsU0FBUztBQUNwQztBQUNBO0FBQ0EsbURBQW1ELCtCQUErQjtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsMkJBQTJCLFNBQVM7QUFDcEM7QUFDQTtBQUNBLG1EQUFtRCwrQkFBK0I7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQSwyQkFBMkIsU0FBUztBQUNwQztBQUNBO0FBQ0EsbURBQW1ELCtCQUErQjtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsU0FBUztBQUNwQztBQUNBO0FBQ0EsbURBQW1ELCtC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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxxQ0FBRztBQUNmO0FBQ0E7QUFDQTtBQUNBLFlBQVkscUNBQUc7QUFDZjtBQUNBOztBQUVBLFlBQVk7QUFDWjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25LMkI7QUFDTztBQUNHOztBQUVyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEscUNBQUc7QUFDWDs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxRQUFRLHFDQUFHO0FBQ1gsS0FBSztBQUNMO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lbG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xpc3RlbmVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuY29uc3QgZG9tID0gKCgpID0+IHtcbmZ1bmN0aW9uIGJ1aWxkUGFnZSgpIHtcblxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IFxuICAgICAgICBlbGVtZW50QnVpbGQoJ2RpdicsIHsnaWQnIDogJ3dyYXBwZXInfSwgXG4gICAgICAgICAgICBlbGVtZW50QnVpbGQoJ2hlYWRlcicsIHsnaWQnIDogJ2hlYWRlcid9LFxuICAgICAgICAgICAgICAgIGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiAnbG9nbyd9LCAnQkFUVExFU0hJUCcpKSxcbiAgICAgICAgICAgIGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiAncG9wQmFja2dyb3VuZCd9LFxuICAgICAgICAgICAgICAgIGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiAnZ2FtZU92ZXInICwgJ2NsYXNzJyA6ICdoaWRkZW4nfSwgXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRCdWlsZCgnaDEnLCB7J2lkJyA6ICdnYW1lT3ZlclRpdGxlJ30sICksXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRCdWlsZCgnYnV0dG9uJywgeydpZCcgOiAncGxheUFnYWluJ30sIFwiUExBWSBBR0FJTlwiKSksXG4gICAgICAgICAgICAgICAgZWxlbWVudEJ1aWxkKCdkaXYnLCB7J2lkJyA6ICdzdGFydEdhbWUnfSwgXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRCdWlsZCgnaDEnLCB7J2lkJyA6ICdzdGFydEdhbWVUaXRsZSd9LCBcIkVOVEVSIFlPVVIgTkFNRVwiKSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudEJ1aWxkKCdpbnB1dCcsIHsndHlwZScgOiAndGV4dCcsICdpZCcgOiAnbmFtZUlucHV0J30pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50QnVpbGQoJ2J1dHRvbicsIHsnaWQnIDogJ3N0YXJ0R2FtZUJ1dHQnfSwgXCJTVEFSVCBHQU1FXCIpKSApLFxuICAgICAgICAgICAgZWxlbWVudEJ1aWxkKCdkaXYnLCB7J2lkJyA6ICdnYW1lQ29udGFpbmVyJ30sXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBlbGVtZW50QnVpbGQoJ2RpdicsIHsnaWQnIDogJ2dhbWVib2FyZENvbnRhaW5lcid9LFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50QnVpbGQoJ2RpdicsIHsnaWQnIDogJ3BsYXllckNvbnRhaW5lcicsICdjbGFzcycgOiAnZ2FtZWJvYXJkJ30gKSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudEJ1aWxkKCdkaXYnLCB7J2lkJyA6ICdjb21wdXRlckNvbnRhaW5lcicsICdjbGFzcycgOiAnZ2FtZWJvYXJkJ30pKSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBlbGVtZW50QnVpbGQoJ2RpdicsIHsnaWQnIDogJ3BsYWNlU2hpcENvbnRhaW5lcicsICdjbGFzcycgOiAnaGlkZGVuJ30sXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiAncGxheWVyU2hpcENvbnRhaW5lcicsICdjbGFzcycgOiAnaGlkZGVuJ30gKSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudEJ1aWxkKCdkaXYnLCB7J2lkJyA6ICdpbmZvQ29udGFpbmVyJywgJ2NsYXNzJyA6ICdoaWRkZW4nfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50QnVpbGQoJ2gxJywgeydpZCcgOiAncGxhY2VTaGlwVGl0bGUnfSwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudEJ1aWxkKCdidXR0b24nLCB7J2lkJyA6ICdheGlzQnV0dCd9LCBcIkNIQU5HRSBBWElTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZWxlbWVudEJ1aWxkKCdmb290ZXInLCB7J2lkJyA6ICdmb290ZXInfSwgJ0NyZWF0ZWQgYnkgSGFucyBKZW5zZW4nKSAgXG4gICAgICAgICkgIFxuXG4gICAgYm9keS5hcHBlbmRDaGlsZCh0ZW1wbGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkR3JpZChwbGF5ZXIsIGNvbXB1dGVyKSB7XG4gICBcbiAgICBpZiAoY29tcHV0ZXIpe1xuICAgICAgICBjb25zdCBjb21wdXRlckNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlckNvbnRhaW5lcicpXG4gICAgICAgIGNvbXB1dGVyQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaWQgPSAnYycgKyAoaSArIDEpXG4gICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiBpZCwgJ2NsYXNzJyA6ICd0YXJnZXRzJ30sKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0YXJnZXRzLmNsYXNzTGlzdC5hZGQoJ2hvdmVyJylcblxuICAgICAgICAgICAgaWYoY29tcHV0ZXIuZ2FtZWJvYXJkLm1pc3NlZC5pbmNsdWRlcyhpICsgMSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRzLmlubmVySFRNTCA9ICcmI3gyMDIyOydcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29tcHV0ZXIuZ2FtZWJvYXJkLmhpdC5pbmNsdWRlcyhpKyAxKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldHMuaW5uZXJIVE1MID0gJ1x0PHA+JiN4MWY0YTU7PC9wPidcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29tcHV0ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQodGFyZ2V0cylcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBwbGF5ZXJDb250YWluZXIgPSAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXJDb250YWluZXInKTsgXG4gICAgXG4gICAgcGxheWVyQ29udGFpbmVyLiB0ZXh0Q29udGVudCA9IFwiXCJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgbGV0IGlkID0gJ3AnICsgKGkgKyAxKVxuICAgICAgICBsZXQgdGFyZ2V0cyA9IGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiBpZCwgJ2NsYXNzJyA6ICd0YXJnZXRzJ30sKVxuICAgICAgICBcbiAgICAgICAgaWYgKHNoaXBDaGVjaygoaSArIDEpLCBwbGF5ZXIpKSB7XG4gICAgICAgICAgICB0YXJnZXRzLmNsYXNzTGlzdC5hZGQoJ3JlZCcpXG4gICAgICAgIH1cblxuICAgICAgICBpZihwbGF5ZXIuZ2FtZWJvYXJkLm1pc3NlZC5pbmNsdWRlcyhpICsgMSkpIHtcbiAgICAgICAgICAgIHRhcmdldHMuaW5uZXJIVE1MID0gJyYjeDIwMjI7J1xuICAgICAgICB9IGVsc2UgaWYgKHBsYXllci5nYW1lYm9hcmQuaGl0LmluY2x1ZGVzKGkrIDEpKSB7XG4gICAgICAgICAgICB0YXJnZXRzLmlubmVySFRNTCA9ICdcdDxwPiYjeDFmNGE1OzwvcD4nXG4gICAgICAgIH1cblxuICAgICAgICAgcGxheWVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhcmdldHMpXG4gICAgfVxuXG4gICAgICAgXG59XG5cbmZ1bmN0aW9uIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLCBwbGF5ZXIsIGF4aXMgPSB0cnVlLCB4ID0gMCkge1xuICAgIFxuICAgIFxuICAgIGNvbnN0IHBsYXllclNoaXBDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyU2hpcENvbnRhaW5lcicpO1xuICAgIGxldCBpbmZvQ29udCA9IGRvY3VtZW50LiBnZXRFbGVtZW50QnlJZCgnaW5mb0NvbnRhaW5lcicpO1xuICAgIGluZm9Db250LmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZCcpXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlU2hpcFRpdGxlJylcbiAgICBwbGF5ZXJTaGlwQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZCcpXG4gICAgcGxheWVyU2hpcENvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCJcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9XCJcIlxuICAgIFxuICAgIGxldCBheGlzQnV0dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdheGlzQnV0dCcpXG4gICAgYXhpc0J1dHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGxldCBheGlzbmV3ID0gYXhpcyAhPT0gdHJ1ZTtcbiAgICAgICAgc2hpcFBsYWNlR3JpZChwbGFjZVNoaXAsIHBsYXllciwgYXhpc25ldywgeClcbiAgICB9KVxuXG5cbiAgICBpZiggYXhpcyA9PT0gdHJ1ZSkge1xuICAgICAgICBpZigheCl7XG5cbiAgICAgICAgICAgIGxldCBhcnIgPSBbMSwyLDMsNCw1LDYsNywxMSwxMiwxMywxNCwxNSwxNiwxNywyMSwyMiwyMywyNCwyNSwyNiwyNywzMSwzMiwzMywzNCwzNSwzNiwzNyw0MSw0Miw0Myw0NCw0NSw0Niw0Nyw1MSw1Miw1Myw1NCw1NSw1Niw1Nyw2MSw2Miw2Myw2NCw2NSw2Niw2Nyw3MSw3Miw3Myw3NCw3NSw3Niw3Nyw4MSw4Miw4Myw4NCw4NSw4Niw4Nyw5MSw5Miw5MywsOTQsOTUsOTYsOTddXG4gICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9XCJQTEFDRSBZT1VSIEJBVFRMRVNISVBcIlxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBpICsgMVxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRzID0gZWxlbWVudEJ1aWxkKCdkaXYnLCB7J2lkJyA6IGlkLCAnY2xhc3MnIDogJ3RhcmdldHMnfSwpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoYXJyLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmNsYXNzTGlzdC5hZGQoJ2ZvdXInKVxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwbGFjZVNoaXAoMCwgaWQsIHRydWUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaGlwUGxhY2VHcmlkKHBsYWNlU2hpcCwgcGxheWVyLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcFBsYWNlR3JpZChwbGFjZVNoaXAsIHBsYXllciwgdHJ1ZSwgMSlcblxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcGxheWVyU2hpcENvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXJnZXRzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIGlmICh4ID09PSAxKSB7XG4gICAgICAgICAgICBsZXQgYXJyID0gWzEsMiwzLDQsNSw2LDExLDEyLDEzLDE0LDE1LDE2LDIxLDIyLDIzLDI0LDI1LDI2LDMxLDMyLDMzLDM0LDM1LDM2LDQxLDQyLDQzLDQ0LDQ1LDQ2LDUxLDUyLDUzLDU0LDU1LDU2LDYxLDYyLDYzLDY0LDY1LDY2LDcxLDcyLDczLDc0LDc1LDc2LDgxLDgyLDgzLDg0LDg1LDg2LDkxLDkyLDkzLDk0LDk1LDk2XVxuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPVwiUExBQ0UgWU9VUiBDQVJSSUVSXCJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaSArIDFcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiBpZCwgJ2NsYXNzJyA6ICd0YXJnZXRzJ30sKVxuICAgICAgICAgICAgICAgIGlmIChzaGlwQ2hlY2soaWQsIHBsYXllcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCdyZWQnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihhcnIuaW5jbHVkZXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMuY2xhc3NMaXN0LmFkZCgnZml2ZScpXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwbGFjZVNoaXAoMSxpZCx0cnVlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hpcFBsYWNlR3JpZChwbGFjZVNoaXAsIHBsYXllciwgdHJ1ZSwgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLCBwbGF5ZXIsIHRydWUsIDIpXG5cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHBsYXllclNoaXBDb250YWluZXIuYXBwZW5kQ2hpbGQodGFyZ2V0cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh4ID09PSAyKSB7XG4gICAgICAgICAgICBsZXQgYXJyID0gWzEsMiwzLDQsNSw2LDExLDEyLDEzLDE0LDE1LDE2LDIxLDIyLDIzLDI0LDI1LDI2LDMxLDMyLDMzLDM0LDM1LDM2LDQxLDQyLDQzLDQ0LDQ1LDQ2LDUxLDUyLDUzLDU0LDU1LDU2LDYxLDYyLDYzLDY0LDY1LDY2LDcxLDcyLDczLDc0LDc1LDc2LDgxLDgyLDgzLDg0LDg1LDg2LDkxLDkyLDkzLDk0LDk1LDk2LDcsOCwxNywxOCwyNywyOCwzNywzOCw0Nyw0OCw1Nyw1OCw2Nyw2OCw3Nyw3OCw4Nyw4OCw5Nyw5OF1cbiAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID1cIlBMQUNFIFlPVVIgQ1JVSVNFUlwiXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBpZCA9IGkgKyAxXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldHMgPSBlbGVtZW50QnVpbGQoJ2RpdicsIHsnaWQnIDogaWQsICdjbGFzcycgOiAndGFyZ2V0cyd9LClcbiAgICAgICAgICAgICAgICBpZiAoc2hpcENoZWNrKGlkLCBwbGF5ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMuY2xhc3NMaXN0LmFkZCgncmVkJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoYXJyLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmNsYXNzTGlzdC5hZGQoJ3RocmVlJylcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwbGFjZVNoaXAoMiwgaWQsIHRydWUpPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hpcFBsYWNlR3JpZChwbGFjZVNoaXAsIHBsYXllciwgdHJ1ZSwgMilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcFBsYWNlR3JpZChwbGFjZVNoaXAscGxheWVyLHRydWUsIDMpXG5cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHBsYXllclNoaXBDb250YWluZXIuYXBwZW5kQ2hpbGQodGFyZ2V0cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh4ID09PSAzKSB7XG4gICAgICAgICAgICBsZXQgYXJyID0gWzEsMiwzLDQsNSw2LDExLDEyLDEzLDE0LDE1LDE2LDIxLDIyLDIzLDI0LDI1LDI2LDMxLDMyLDMzLDM0LDM1LDM2LDQxLDQyLDQzLDQ0LDQ1LDQ2LDUxLDUyLDUzLDU0LDU1LDU2LDYxLDYyLDYzLDY0LDY1LDY2LDcxLDcyLDczLDc0LDc1LDc2LDgxLDgyLDgzLDg0LDg1LDg2LDkxLDkyLDkzLDk0LDk1LDk2LDcsOCwxNywxOCwyNywyOCwzNywzOCw0Nyw0OCw1Nyw1OCw2Nyw2OCw3Nyw3OCw4Nyw4OCw5Nyw5OF1cbiAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID1cIlBMQUNFIFlPVVIgU1VCTUFSSU5FXCJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaSArIDFcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiBpZCwgJ2NsYXNzJyA6ICd0YXJnZXRzJ30sKVxuICAgICAgICAgICAgICAgIGlmIChzaGlwQ2hlY2soaWQsIHBsYXllcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCdyZWQnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihhcnIuaW5jbHVkZXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMuY2xhc3NMaXN0LmFkZCgndGhyZWUnKVxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwbGFjZVNoaXAoMywgaWQsIHRydWUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaGlwUGxhY2VHcmlkKHBsYWNlU2hpcCxwbGF5ZXIsdHJ1ZSwgMylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLHBsYXllcix0cnVlLCA0KVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwbGF5ZXJTaGlwQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhcmdldHMpXG5cbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBhcnIgPSBbMSwyLDMsNCw1LDYsMTEsMTIsMTMsMTQsMTUsMTYsMjEsMjIsMjMsMjQsMjUsMjYsMzEsMzIsMzMsMzQsMzUsMzYsNDEsNDIsNDMsNDQsNDUsNDYsNTEsNTIsNTMsNTQsNTUsNTYsNjEsNjIsNjMsNjQsNjUsNjYsNzEsNzIsNzMsNzQsNzUsNzYsODEsODIsODMsODQsODUsODYsOTEsOTIsOTMsOTQsOTUsOTYsNyw4LDE3LDE4LDI3LDI4LDM3LDM4LDQ3LDQ4LDU3LDU4LDY3LDY4LDc3LDc4LDg3LDg4LDk3LDk4XVxuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPVwiUExBQ0UgWU9VUiBERVNUUk9ZRVJcIlxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBpICsgMVxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRzID0gZWxlbWVudEJ1aWxkKCdkaXYnLCB7J2lkJyA6IGlkLCAnY2xhc3MnIDogJ3RhcmdldHMnfSwpXG4gICAgICAgICAgICAgICAgaWYgKHNoaXBDaGVjayhpZCwgcGxheWVyKSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmNsYXNzTGlzdC5hZGQoJ3JlZCcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGFyci5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCd0d28nKVxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwbGFjZVNoaXAoNCwgaWQsIHRydWUpPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLHBsYXllcix0cnVlLDQpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBidWlsZEdyaWQocGxheWVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wVXBCYWNrZ3JvdW5kKCdwbGFjZVNoaXBzJylcblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHBsYXllclNoaXBDb250YWluZXIuYXBwZW5kQ2hpbGQodGFyZ2V0cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKCF4KXtcbiAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID1cIlBMQUNFIFlPVVIgQkFUVExFU0hJUFwiXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBpICsgMVxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRzID0gZWxlbWVudEJ1aWxkKCdkaXYnLCB7J2lkJyA6IGlkLCAnY2xhc3MnIDogJ3RhcmdldHMnfSwpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoaWQgPCA3MSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmNsYXNzTGlzdC5hZGQoJ2ZvdXJ2JylcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxhY2VTaGlwKDAsIGlkLCBmYWxzZSk9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hpcFBsYWNlR3JpZChwbGFjZVNoaXAscGxheWVyLCBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLHBsYXllciwgZmFsc2UsIDEpXG5cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHBsYXllclNoaXBDb250YWluZXIuYXBwZW5kQ2hpbGQodGFyZ2V0cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSBpZiAoeCA9PT0gMSkge1xuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPVwiUExBQ0UgWU9VUiBDQVJSSUVSXCJcblxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaSArIDFcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiBpZCwgJ2NsYXNzJyA6ICd0YXJnZXRzJ30sKVxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHNoaXBDaGVjayhpZCwgcGxheWVyKSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmNsYXNzTGlzdC5hZGQoJ3JlZCcpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoaWQgPCA2MSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmNsYXNzTGlzdC5hZGQoJ2ZpdmV2JylcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlU2hpcCgxLCBpZCwgZmFsc2UpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaGlwUGxhY2VHcmlkKHBsYWNlU2hpcCwgcGxheWVyLGZhbHNlLCAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcFBsYWNlR3JpZChwbGFjZVNoaXAscGxheWVyLCBmYWxzZSwgMilcblxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcGxheWVyU2hpcENvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXJnZXRzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHggPT09IDIpIHtcbiAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID1cIlBMQUNFIFlPVVIgQ1JVSVNFUlwiXG5cbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaSArIDFcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IGVsZW1lbnRCdWlsZCgnZGl2JywgeydpZCcgOiBpZCwgJ2NsYXNzJyA6ICd0YXJnZXRzJ30sKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzaGlwQ2hlY2soaWQsIHBsYXllcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCdyZWQnKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGlkIDwgODEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5jbGFzc0xpc3QuYWRkKCd0aHJlZXYnKVxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwbGFjZVNoaXAoMiwgaWQsIGZhbHNlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hpcFBsYWNlR3JpZChwbGFjZVNoaXAscGxheWVyLCBmYWxzZSwgMilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLCBwbGF5ZXIsIGZhbHNlLCAzKVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwbGF5ZXJTaGlwQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhcmdldHMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoeCA9PT0gMykge1xuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPVwiUExBQ0UgWU9VUiBTVUJNQVJJTkVcIlxuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBpICsgMVxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRzID0gZWxlbWVudEJ1aWxkKCdkaXYnLCB7J2lkJyA6IGlkLCAnY2xhc3MnIDogJ3RhcmdldHMnfSwpXG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBpZiAoc2hpcENoZWNrKGlkLCBwbGF5ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMuY2xhc3NMaXN0LmFkZCgncmVkJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoaWQgPCA4MSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmNsYXNzTGlzdC5hZGQoJ3RocmVldicpXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYWNlU2hpcCgzLCBpZCwgZmFsc2UpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaGlwUGxhY2VHcmlkKHBsYWNlU2hpcCxwbGF5ZXIsICBmYWxzZSwgMylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLCBwbGF5ZXIsIGZhbHNlLCA0KVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwbGF5ZXJTaGlwQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhcmdldHMpXG5cbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID1cIlBMQUNFIFlPVVIgREVTVFJPWUVSXCJcblxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBpICsgMVxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRzID0gZWxlbWVudEJ1aWxkKCdkaXYnLCB7J2lkJyA6IGlkLCAnY2xhc3MnIDogJ3RhcmdldHMnfSwpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHNoaXBDaGVjayhpZCwgcGxheWVyKSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmNsYXNzTGlzdC5hZGQoJ3JlZCcpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoaWQgPCA5MSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmNsYXNzTGlzdC5hZGQoJ3R3b3YnKVxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2VTaGlwKDQsIGlkLCBmYWxzZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLCBwbGF5ZXIsIGZhbHNlLCA0KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRHcmlkKHBsYXllcilcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcFVwQmFja2dyb3VuZCgncGxhY2VTaGlwcycpXG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwbGF5ZXJTaGlwQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhcmdldHMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBvcFVwQmFja2dyb3VuZChldmVudCwgdXNlcikge1xuICAgIGNvbnNvbGUubG9nKCd5bycpXG4gICAgbGV0IGJhY2tncm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wQmFja2dyb3VuZCcpXG4gICAgbGV0IGdhbWVPdmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVPdmVyJylcbiAgICBsZXQgZ2FtZU92ZXJUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lT3ZlclRpdGxlJylcbiAgICBsZXQgc3RhcnRHYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0R2FtZScpXG4gICAgbGV0IHBsYWNlU2hpcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZVNoaXBDb250YWluZXInKVxuICAgIGxldCBncmlkQ29udCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXJTaGlwQ29udGFpbmVyJylcbiAgICBsZXQgaW5mb0NvbnQgPSBkb2N1bWVudC4gZ2V0RWxlbWVudEJ5SWQoJ2luZm9Db250YWluZXInKVxuICAgIGlmIChldmVudCA9PT0gJ2dhbWVPdmVyJykge1xuICAgICAgICBiYWNrZ3JvdW5kLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgICAgIGdhbWVPdmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgICAgIGdhbWVPdmVyVGl0bGUudGV4dENvbnRlbnQgPSB1c2VyICsgJyB3aW5zISdcbiAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSAnc3RhcnRHYW1lJykge1xuICAgICAgICBiYWNrZ3JvdW5kLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgICAgIHN0YXJ0R2FtZS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuICAgICAgICBwbGFjZVNoaXAuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgICAgICAgZ3JpZENvbnQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgICAgICAgaW5mb0NvbnQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSAncGxheUFnYWluJykge1xuICAgICAgICBnYW1lT3Zlci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuICAgICAgICBzdGFydEdhbWUuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSAncGxhY2VTaGlwcycpIHtcbiAgICAgICAgcGxhY2VTaGlwLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgICAgIGdyaWRDb250LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgICAgIGluZm9Db250LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgICAgIFxuICAgIH1cblxuXG59XG5cbmZ1bmN0aW9uIHNoaXBDaGVjayhpZCwgcGxheWVyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICBpZiAocGxheWVyLmdhbWVib2FyZC5zaGlwc1tpXS5jb29yZGluYXRlcy5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn1cblxuIFxuIHJldHVybiB7YnVpbGRQYWdlLCBidWlsZEdyaWQsIHBvcFVwQmFja2dyb3VuZCwgc2hpcFBsYWNlR3JpZH1cblxufSkoKTtcblxuICAgICAgICBcblxuIFxuXG5cblxuXG5cblxuXG5cblxuXG5mdW5jdGlvbiBlbGVtZW50QnVpbGQgKHR5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XG5cbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKVxuICAgIFxuICAgIGZvciAobGV0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG5cbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pXG4gICAgfVxuXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkKSlcbiAgICAgICAgfSAgZWxzZXtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmV4cG9ydCB7IGRvbX0iLCJcblxuXG5jb25zdCBTaGlwID0gKHR5cGUsIGxlbmd0aCkgPT4ge1xuXG4gICAgbGV0IG5hbWUgPSB0eXBlO1xuICAgIGxldCBoaXRzID0gMDtcbiAgICBsZW5ndGg9IGxlbmd0aDtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBbXVxuICAgIFxuXG4gICAgZnVuY3Rpb24gaGl0KCkge1xuICAgICAgICB0aGlzLmhpdHMrK1xuICAgICAgICBcbiAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICBcbiAgICAgICAgaWYodGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtuYW1lLCBsZW5ndGgsIGhpdHMsIGhpdCwgaXNTdW5rLCBjb29yZGluYXRlc31cbn1cblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuXG4gICAgbGV0IG1pc3NlZCA9IFtdXG4gICAgbGV0IGhpdCA9IFtdXG4gICAgbGV0IHNoaXBzU3Vuaz0gMFxuICAgIGxldCBzaGlwcyA9IFtdXG4gICAgbGV0IGF4aXMgPSB0cnVlXG4gICAgXG4gICAgXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHgsIHksIGF4aXMgPSB0cnVlKSA9PiB7XG5cbiAgICAgICAgbGV0IHNoaXAgPSBzaGlwVHlwZSh4KVxuXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgc2hpcC5jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVDcmVhdG9yKGF4aXMsIHksIHNoaXAubGVuZ3RoKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlcyA9PT0gZmFsc2UpIHtcbiAgICBcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc2hpcHMucHVzaChzaGlwKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcFR5cGUgPSAoeCkgPT4ge1xuXG4gICAgICAgIHJldHVybiB4ID09PSAwID8gU2hpcCgnQmF0dGxlc2hpcCcsIDQpXG4gICAgICAgICAgICA6IHggPT09IDEgPyBTaGlwKCdDYXJyaWVyJywgNSlcbiAgICAgICAgICAgIDogeCA9PT0gMiA/IFNoaXAoJ0NydWlzZXInLCAzKVxuICAgICAgICAgICAgOiB4ID09PSAzID8gU2hpcCgnU3VibWFyaW5lJywgMylcbiAgICAgICAgICAgIDogU2hpcCgnRGVzdHJveWVyJywgMik7XG5cblxuICAgIH1cblxuICAgIGNvbnN0IHJlY2lldmVBdHRhY2sgPSAoeCkgPT4ge1xuXG4gICAgICAgIFxuICAgICAgICBpZiAgKG1pc3NlZC5pbmNsdWRlcyh4KSB8fCBoaXQuaW5jbHVkZXMoeCkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIllvdSBoYXZlIGFscmVhZHkgYXR0YWNrZWQgdGhpc1wiXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNoaXAgPSBudWxsXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzaGlwc1tpXS5jb29yZGluYXRlcy5pbmNsdWRlcyh4KSkge1xuICAgICAgICAgICAgICAgIHNoaXAgPSBzaGlwc1tpXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoc2hpcCAhPSBudWxsKSB7XG4gICAgICAgICAgICBzaGlwLmhpdCgpXG4gICAgICAgICAgICBoaXQucHVzaCh4KVxuICAgICAgICB9IGVsc2UgKFxuICAgICAgICAgICAgbWlzc2VkLnB1c2goeClcbiAgICAgICAgKVxuXG5cbiAgICB9XG5cblxuICAgIGNvbnN0IHNoaXBzU3Vua0NoZWNrID0gKCkgPT4ge1xuICAgICAgICBsZXQgc2hpcHNTdW5rID0gMFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihzaGlwc1tpXS5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgIHNoaXBzU3VuayArK1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaGlwc1N1bmtcbiAgICB9XG5cbiAgICBjb25zdCBjb29yZGluYXRlQ3JlYXRvciA9IChheGlzLCBjb29yZGluYXRlLCBzaGlwTGVuZ3RoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgYXJyID0gW11cbiAgICAgICAgaWYgKGNvb3JkaW5hdGUgPT09IE5hTiB8fCBjb29yZGluYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoYXhpcyA9PSB0cnVlKSB7XG4gICAgICAgICAgICBmb3IobGV0IGk9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZG91YmxlQ2hlY2tlcihjb29yZGluYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGNvb3JkaW5hdGUpXG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZSArPSAxXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0gMDsgaSA8IHNoaXBMZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvdWJsZUNoZWNrZXIoY29vcmRpbmF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChjb29yZGluYXRlKVxuICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlICs9IDEwXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIH1cbiAgICBcblxuICAgIHJldHVybiBhcnJcbn1cblxuICAgIGNvbnN0IGRvdWJsZUNoZWNrZXIgPSAoeCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSBpbiBzaGlwcykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXNoaXBzW2ldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmIChzaGlwc1tpXS5jb29yZGluYXRlcy5pbmNsdWRlcyh4KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG5cbnJldHVybiB7IG1pc3NlZCwgaGl0LCBwbGFjZVNoaXAsIHNoaXBzLCByZWNpZXZlQXR0YWNrLCBzaGlwc1N1bmssIHNoaXBzU3Vua0NoZWNrfVxufVxuXG5jb25zdCBQbGF5ZXIgPSAoeCkgPT4ge1xuICAgIFxuICAgIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZCgpXG5cbiAgICBsZXQgbmFtZSA9IHggfHwgXCJjb21wdXRlclwiXG5cbiAgICBcbiAgICAvLyBhbiBhcnJheSBvZiB0aGUgbW92ZXMgdGhhdCBoYXZlIG5vdCBiZWVuIGNhbGxlZC5cbiAgICBsZXQgbW92ZXMgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTksIDIwLCAyMSwgMjIsIDIzLCAyNCwgMjUsIDI2LCAyNywgMjgsIDI5LCAzMCwgMzEsIDMyLCAzMywgMzQsIDM1LCAzNiwgMzcsIDM4LCAzOSwgNDAsIDQxLCA0MiwgNDMsIDQ0LCA0NSwgNDYsIDQ3LCA0OCwgNDksIDUwLCA1MSwgNTIsIDUzLCA1NCwgNTUsIDU2LCA1NywgNTgsIDU5LCA2MCwgNjEsIDYyLCA2MywgNjQsIDY1LCA2NiwgNjcsIDY4LCA2OSwgNzAsIDcxLCA3MiwgNzMsIDc0LCA3NSwgNzYsIDc3LCA3OCwgNzksIDgwLCA4MSwgODIsIDgzLCA4NCwgODUsIDg2LCA4NywgODgsIDg5LCA5MCwgOTEsIDkyLCA5MywgOTQsIDk1LCA5NiwgOTcsIDk4LCA5OSwgMTAwXVxuXG4gICAgXG5cbiAgICBjb25zdCBjaGVja0dhbWVPdmVyID0gKCkgPT4ge1xuICAgICAgICAgaWYgKGdhbWVib2FyZC5zaGlwc1N1bmtDaGVjaygpID09PSA1KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgfVxuICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgYXR0YWNrID0gKHgsIHkpID0+IHtcblxuICAgICAgICBpZiAoIXkpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IG1vdmUgPSBjb21wdXRlck1vdmUoKSAgICAgIC8vIGNhbGwgZm9yIHJhbmRvbSBudW1iZXIgZnJvbSByZW1haW5pbmcgbW92ZXMgYXJyYXlcbiAgICAgICAgICAgIHguZ2FtZWJvYXJkLnJlY2lldmVBdHRhY2sobW92ZSk7IFxuICAgICAgICAgICAgbGV0IGJ5ZSA9IG1vdmVzLmluZGV4T2YobW92ZSk7IC8vZmluZCBpbmRleCBvZiBtb3ZlIGxlZnQgaW4gYXJyYXkuXG4gICAgICAgICAgICBtb3Zlcy5zcGxpY2UoYnllLCAxKSAvLyBkZWxldGUgbW92ZVxuICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgIHJldHVybiB4LmdhbWVib2FyZC5yZWNpZXZlQXR0YWNrKHkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjb21wdXRlck1vdmUgPSAoKSA9PiB7XG4gICAgICAgIGxldCBsZW4gPSBtb3Zlcy5sZW5ndGhcbiAgICAgICAgXG4gICAgICAgIGxldCBtb3ZlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGVuKSBcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBtb3Zlc1ttb3ZlXVxuICAgICAgICBcbiAgICB9XG5cbiAgICBcbiAgICBcbiAgICByZXR1cm4ge2dhbWVib2FyZCwgbW92ZXMsIG5hbWUsIGNoZWNrR2FtZU92ZXIsIGF0dGFja31cbn1cblxuXG5leHBvcnQgeyBTaGlwLCBHYW1lYm9hcmQgLCBQbGF5ZXJ9IiwiaW1wb3J0IHtQbGF5ZXJ9IGZyb20gJy4vZmFjdG9yeSdcbmltcG9ydCB7ZG9tfSBmcm9tICcuL2RvbSdcbmltcG9ydCB7IGJ1dHRvbkxpc3RlbmVycyB9IGZyb20gJy4vbGlzdGVuZXJzJ1xuXG5jb25zdCBnYW1lbG9vcCA9ICgpID0+IHtcbiAgICBsZXQgcGxheWVyID0gIFBsYXllcigpXG4gICAgbGV0IGNvbXB1dGVyID0gUGxheWVyKClcblxuICAgIGNvbnN0IG5ld0dhbWUgPSAoeCkgPT4ge1xuICAgICAgICBwbGF5ZXIgPSAgUGxheWVyKClcbiAgICAgICAgY29tcHV0ZXIgPSBQbGF5ZXIoKVxuICAgICAgICBcbiAgICAgICAgY3JlYXRlVGVtcGxhdGUoKTtcbiAgICAgICAgY3JlYXRlR3JpZCgpO1xuICAgICAgICBhdXRvUGxhY2VTaGlwKDApO1xuICAgICAgICBcbiAgICAgICAgZG9tLnNoaXBQbGFjZUdyaWQocGxhY2VTaGlwLCBwbGF5ZXIpXG4gICAgICAgIGJ1dHRvbkxpc3RlbmVycyhwbGF5QWdhaW4sIHNldE5hbWUpXG4gICAgICAgIFxuICAgIH1cblxuICAgIGNvbnN0IHBsYXlBZ2FpbiA9ICgpID0+IHtcbiAgICAgICAgcGxheWVyID0gIFBsYXllcigpXG4gICAgICAgIGNvbXB1dGVyID0gUGxheWVyKClcbiAgICAgICAgXG4gICAgICAgIGNyZWF0ZUdyaWQoKTtcbiAgICAgICAgYXV0b1BsYWNlU2hpcCgwKTtcbiAgICAgICAgXG4gICAgICAgIGRvbS5zaGlwUGxhY2VHcmlkKHBsYWNlU2hpcCwgcGxheWVyKVxuICAgICAgICBcbiAgICB9XG5cbiAgICBjb25zdCBzZXROYW1lID0gKG5hbWUpID0+IHtcbiAgICAgICAgXG4gICAgICAgIHBsYXllci5uYW1lID0gbmFtZVxuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZVRlbXBsYXRlPSAoKSA9PiB7XG5cbiAgICAgICAgZG9tLmJ1aWxkUGFnZSgpO1xuICAgICAgICBcblxuXG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlR3JpZCA9ICgpID0+IHtcbiAgICAgICBcbiAgICAgICAgZG9tLmJ1aWxkR3JpZChwbGF5ZXIsIGNvbXB1dGVyKVxuICAgICAgIFxuICAgICAgICBjb25zdCB0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvdmVyJylcbiAgICAgICAgICAgIHRhcmdldHMuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgc3F1YXJlID0gZXZlbnQudGFyZ2V0LmlkIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzcXVhcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlID0gcGFyZW50LmlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQgPSBOdW1iZXIoc3F1YXJlLnNsaWNlKDEsIDQpKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbWFrZU1vdmUoaWQpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlR3JpZCgpO1xuICAgICAgICAgICAgICAgIH0pIFxuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoeCwgeSwgYXhpcykgPT4ge1xuICAgICAgICBpZiAocGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoeCwgeSwgYXhpcykgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICBjb25zdCBhdXRvUGxhY2VTaGlwID0gKGksIGF4aXMgPSBmYWxzZSkgPT4ge1xuICAgICAgICBcbiAgICAgICAgaWYgKGkgPiA0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICBcbiAgICAgICAgYXhpcyA9ICFheGlzXG4gICAgICAgIGxldCBtb3ZlO1xuICAgICAgIGlmIChheGlzID09PSB0cnVlKSAge1xuICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxldCBhcnIgPSBbMSwyLDMsNCw1LDYsNywxMSwxMiwxMywxNCwxNSwxNiwxNywyMSwyMiwyMywyNCwyNSwyNiwyNywzMSwzMiwzMywzNCwzNSwzNiwzNyw0MSw0Miw0Myw0NCw0NSw0Niw0Nyw1MSw1Miw1Myw1NCw1NSw1Niw1Nyw2MSw2Miw2Myw2NCw2NSw2Niw2Nyw3MSw3Miw3Myw3NCw3NSw3Niw3Nyw4MSw4Miw4Myw4NCw4NSw4Niw4Nyw5MSw5Miw5Myw5NCw5NSw5Niw5N11cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG1vdmUgPSBhcnJbcmFuZG9tTnVtKGFyci5sZW5ndGgpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGlmIChpPT09IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gWzEsMiwzLDQsNSw2LDExLDEyLDEzLDE0LDE1LDE2LDIxLDIyLDIzLDI0LDI1LDI2LDMxLDMyLDMzLDM0LDM1LDM2LDQxLDQyLDQzLDQ0LDQ1LDQ2LDUxLDUyLDUzLDU0LDU1LDU2LDYxLDYyLDYzLDY0LDY1LDY2LDcxLDcyLDczLDc0LDc1LDc2LDgxLDgyLDgzLDg0LDg1LDg2LDkxLDkyLDkzLDk0LDk1LDk2XSAgIFxuICAgICAgICAgICAgICAgIG1vdmUgPSBhcnJbcmFuZG9tTnVtKGFyci5sZW5ndGgpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGk9PT0yIHx8IGkgPT09IDMpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gWzEsMiwzLDQsNSw2LDExLDEyLDEzLDE0LDE1LDE2LDIxLDIyLDIzLDI0LDI1LDI2LDMxLDMyLDMzLDM0LDM1LDM2LDQxLDQyLDQzLDQ0LDQ1LDQ2LDUxLDUyLDUzLDU0LDU1LDU2LDYxLDYyLDYzLDY0LDY1LDY2LDcxLDcyLDczLDc0LDc1LDc2LDgxLDgyLDgzLDg0LDg1LDg2LDkxLDkyLDkzLDk0LDk1LDk2LDcsOCwxNywxOCwyNywyOCwzNywzOCw0Nyw0OCw1Nyw1OCw2Nyw2OCw3Nyw3OCw4Nyw4OCw5Nyw5OF1cbiAgICAgICAgICAgICAgICBtb3ZlID0gYXJyW3JhbmRvbU51bShhcnIubGVuZ3RoKV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID09PSA0KSB7XG4gICAgICAgICAgICAgICAgIGxldCBhcnIgPSBbMSwyLDMsNCw1LDYsMTEsMTIsMTMsMTQsMTUsMTYsMjEsMjIsMjMsMjQsMjUsMjYsMzEsMzIsMzMsMzQsMzUsMzYsNDEsNDIsNDMsNDQsNDUsNDYsNTEsNTIsNTMsNTQsNTUsNTYsNjEsNjIsNjMsNjQsNjUsNjYsNzEsNzIsNzMsNzQsNzUsNzYsODEsODIsODMsODQsODUsODYsOTEsOTIsOTMsOTQsOTUsOTYsNyw4LDE3LDE4LDI3LDI4LDM3LDM4LDQ3LDQ4LDU3LDU4LDY3LDY4LDc3LDc4LDg3LDg4LDk3LDk4XVxuICAgICAgICAgICAgICAgICBtb3ZlID0gYXJyW3JhbmRvbU51bShhcnIubGVuZ3RoKV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgaWYgKGF4aXMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbW92ZSA9IHJhbmRvbU51bSg3MClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBtb3ZlID0gcmFuZG9tTnVtKDYwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGk9PT0yIHx8IGkgPT09IDMpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBtb3ZlID0gcmFuZG9tTnVtKDgwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPT09IDQpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgbW92ZSA9IHJhbmRvbU51bSg5MClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoIWNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXAoaSwgbW92ZSwgYXhpcykpIHtcbiAgICAgICAgICAgIGF1dG9QbGFjZVNoaXAoaSxheGlzKVxuICAgICAgICB9ICBlbHNlIHtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgYXV0b1BsYWNlU2hpcChpLGF4aXMpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG5cblxuICAgIGNvbnN0IHJhbmRvbU51bSA9IChtYXgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBudW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXggKyAxKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICB9ICAgIFxuXG4gICAgY29uc3QgbWFrZU1vdmUgPSAoaWQpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBtb3ZlID0gcGxheWVyLmF0dGFjayhjb21wdXRlciwgaWQpXG5cbiAgICAgICAgaWYgKG1vdmUgPT09IFwiWW91IGhhdmUgYWxyZWFkeSBhdHRhY2tlZCB0aGlzXCIpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIGlmKGNvbXB1dGVyLmNoZWNrR2FtZU92ZXIoKSkge1xuICAgICAgICAgICAgZG9tLnBvcFVwQmFja2dyb3VuZCgnZ2FtZU92ZXInLCBwbGF5ZXIubmFtZSlcbiAgICAgICAgfVxuICAgICAgICBjb21wdXRlci5hdHRhY2socGxheWVyKSBcbiAgICAgICAgaWYocGxheWVyLmNoZWNrR2FtZU92ZXIoKSkge1xuICAgICAgICAgICAgZG9tLnBvcFVwQmFja2dyb3VuZCgnZ2FtZU92ZXInLCBjb21wdXRlci5uYW1lKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtwbGF5ZXIsIGNvbXB1dGVyLCBzZXROYW1lLCBjcmVhdGVUZW1wbGF0ZSwgY3JlYXRlR3JpZCwgbmV3R2FtZSwgYXV0b1BsYWNlU2hpcH1cbn1cblxuZXhwb3J0IHsgZ2FtZWxvb3AgfSIsImltcG9ydCB7IGRvbSB9IGZyb20gJy4vZG9tJ1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9mYWN0b3J5J1xuaW1wb3J0IHsgZ2FtZWxvb3AgfSBmcm9tICcuL2dhbWVsb29wJ1xuXG5mdW5jdGlvbiBidXR0b25MaXN0ZW5lcnMoeCwgeSkge1xuXG4gICAgbGV0IHBsYXlhZ2FpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5QWdhaW4nKVxuICAgIGxldCBzdGFydEdhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnRHYW1lQnV0dCcpXG4gICAgbGV0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lSW5wdXQnKVxuICAgIFxuXG4gICAgcGxheWFnYWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGRvbS5wb3BVcEJhY2tncm91bmQoJ3BsYXlBZ2FpbicsIFwicmVzZXRcIilcbiAgICAgICAgeCgpXG5cbiAgICB9KVxuXG4gICAgc3RhcnRHYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIHkobmFtZUlucHV0LnZhbHVlKVxuICAgICAgICBkb20ucG9wVXBCYWNrZ3JvdW5kKCdzdGFydEdhbWUnLCApXG4gICAgfSlcbiAgICBcbn1cblxuZXhwb3J0IHtidXR0b25MaXN0ZW5lcnN9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9