"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["gameloop"],{

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
    let shipsSunk = 0;
    let ships = []
    let axis = 'x'
    
    
    const placeShip = (x, y) => {

        let ship = shipType(x)

        

        ship.coordinates = axis === 'x' 
                            ? coordinateCreator('x', y, ship.length) 
                            : coordinateCreator('y', y. ship.length)
        
        
        if (ship.coordinates === false) {
            return false;
        }

        ships.push(ship)
        
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
        if (ship !== null) {
            ship.hit()
            hit.push(x)
            if (ship.isSunk()) {
                shipsSunk++
            }
        } else (
            missed.push(x)
        )


    }

    

    const coordinateCreator = (axis, coordinate, shipLength) => {
        
        let arr = []
        
        if (axis == 'x') {
            for(let i= 0; i < shipLength; i++) {
                if (doubleChecker(coordinate)) {
                    return false;
                }
                arr.push(coordinate)
                coordinate += 1
                }

            } else {
                for(let i= 0; i < shipLength - 1; i++) {
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


return { missed, hit, placeShip, ships, recieveAttack}
}

const Player = (x) => {
    
    const gameboard = Gameboard()

    const name = x || "computer"

    
    // an array of the moves that have not been called.
    let moves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]

    

    const checkGameOver = () => {
         if (gameboard.shipsSunk === 5) {
            return true
         }
         return false
    }

    const attack = (x, y) => {

        if ( name === "computer") {
            let move = computerMove()      // call for random number from remaining moves array
            x.gameboard.recieveAttack(move); 
            let bye = moves.indexOf(move); //find index of move left in array.
            moves.splice(bye, 1) // delete move
           
            
        } else {
            x.gameboard.recieveAttack(y);
            moves.push(y)
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
/* harmony export */   Gameloop: () => (/* binding */ Gameloop)
/* harmony export */ });
/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory */ "./src/factory.js");


const Gameloop = () => {
    let player =  (0,_factory__WEBPACK_IMPORTED_MODULE_0__.Player)()
    let computer = (0,_factory__WEBPACK_IMPORTED_MODULE_0__.Player)()
   
    const newGame = (name) => {

        player.name = name
        

    }


    return {newGame, player, computer}
}



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/gameloop.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZWxvb3AuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGdCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkLDhCQUE4QixvQkFBb0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1TGdDOztBQUVoQztBQUNBLGtCQUFrQixnREFBTTtBQUN4QixtQkFBbUIsZ0RBQU07QUFDekI7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQSxZQUFZO0FBQ1oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lbG9vcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG5jb25zdCBTaGlwID0gKHR5cGUsIGxlbmd0aCkgPT4ge1xuXG4gICAgbGV0IG5hbWUgPSB0eXBlO1xuICAgIGxldCBoaXRzID0gMDtcbiAgICBsZW5ndGg9IGxlbmd0aDtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBbXVxuICAgIFxuXG4gICAgZnVuY3Rpb24gaGl0KCkge1xuICAgICAgICB0aGlzLmhpdHMrK1xuICAgICAgICBcbiAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICBcbiAgICAgICAgaWYodGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtuYW1lLCBsZW5ndGgsIGhpdHMsIGhpdCwgaXNTdW5rLCBjb29yZGluYXRlc31cbn1cblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuXG4gICAgbGV0IG1pc3NlZCA9IFtdXG4gICAgbGV0IGhpdCA9IFtdXG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG4gICAgbGV0IHNoaXBzID0gW11cbiAgICBsZXQgYXhpcyA9ICd4J1xuICAgIFxuICAgIFxuICAgIGNvbnN0IHBsYWNlU2hpcCA9ICh4LCB5KSA9PiB7XG5cbiAgICAgICAgbGV0IHNoaXAgPSBzaGlwVHlwZSh4KVxuXG4gICAgICAgIFxuXG4gICAgICAgIHNoaXAuY29vcmRpbmF0ZXMgPSBheGlzID09PSAneCcgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBjb29yZGluYXRlQ3JlYXRvcigneCcsIHksIHNoaXAubGVuZ3RoKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGNvb3JkaW5hdGVDcmVhdG9yKCd5JywgeS4gc2hpcC5sZW5ndGgpXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBzaGlwcy5wdXNoKHNoaXApXG4gICAgICAgIFxuICAgIH1cblxuICAgIGNvbnN0IHNoaXBUeXBlID0gKHgpID0+IHtcblxuICAgICAgICByZXR1cm4geCA9PT0gMCA/IFNoaXAoJ0JhdHRsZXNoaXAnLCA0KVxuICAgICAgICAgICAgOiB4ID09PSAxID8gU2hpcCgnQ2FycmllcicsIDUpXG4gICAgICAgICAgICA6IHggPT09IDIgPyBTaGlwKCdDcnVpc2VyJywgMylcbiAgICAgICAgICAgIDogeCA9PT0gMyA/IFNoaXAoJ1N1Ym1hcmluZScsIDMpXG4gICAgICAgICAgICA6IFNoaXAoJ0Rlc3Ryb3llcicsIDIpO1xuXG5cbiAgICB9XG5cbiAgICBjb25zdCByZWNpZXZlQXR0YWNrID0gKHgpID0+IHtcbiAgICAgICAgaWYgIChtaXNzZWQuaW5jbHVkZXMoeCkgfHwgaGl0LmluY2x1ZGVzKHgpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJZb3UgaGF2ZSBhbHJlYWR5IGF0dGFja2VkIHRoaXNcIlxuICAgICAgICB9XG4gICAgICAgIGxldCBzaGlwID0gbnVsbFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2hpcHNbaV0uY29vcmRpbmF0ZXMuaW5jbHVkZXMoeCkpIHtcbiAgICAgICAgICAgICAgICBzaGlwID0gc2hpcHNbaV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hpcCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc2hpcC5oaXQoKVxuICAgICAgICAgICAgaGl0LnB1c2goeClcbiAgICAgICAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgc2hpcHNTdW5rKytcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIChcbiAgICAgICAgICAgIG1pc3NlZC5wdXNoKHgpXG4gICAgICAgIClcblxuXG4gICAgfVxuXG4gICAgXG5cbiAgICBjb25zdCBjb29yZGluYXRlQ3JlYXRvciA9IChheGlzLCBjb29yZGluYXRlLCBzaGlwTGVuZ3RoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgYXJyID0gW11cbiAgICAgICAgXG4gICAgICAgIGlmIChheGlzID09ICd4Jykge1xuICAgICAgICAgICAgZm9yKGxldCBpPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvdWJsZUNoZWNrZXIoY29vcmRpbmF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcnIucHVzaChjb29yZGluYXRlKVxuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGUgKz0gMVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9IDA7IGkgPCBzaGlwTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb3VibGVDaGVja2VyKGNvb3JkaW5hdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goY29vcmRpbmF0ZSlcbiAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZSArPSAxMFxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB9XG4gICAgXG5cbiAgICByZXR1cm4gYXJyXG59XG5cbiAgICBjb25zdCBkb3VibGVDaGVja2VyID0gKHgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgaW4gc2hpcHMpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFzaGlwc1tpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoc2hpcHNbaV0uY29vcmRpbmF0ZXMuaW5jbHVkZXMoeCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuXG5yZXR1cm4geyBtaXNzZWQsIGhpdCwgcGxhY2VTaGlwLCBzaGlwcywgcmVjaWV2ZUF0dGFja31cbn1cblxuY29uc3QgUGxheWVyID0gKHgpID0+IHtcbiAgICBcbiAgICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoKVxuXG4gICAgY29uc3QgbmFtZSA9IHggfHwgXCJjb21wdXRlclwiXG5cbiAgICBcbiAgICAvLyBhbiBhcnJheSBvZiB0aGUgbW92ZXMgdGhhdCBoYXZlIG5vdCBiZWVuIGNhbGxlZC5cbiAgICBsZXQgbW92ZXMgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTksIDIwLCAyMSwgMjIsIDIzLCAyNCwgMjUsIDI2LCAyNywgMjgsIDI5LCAzMCwgMzEsIDMyLCAzMywgMzQsIDM1LCAzNiwgMzcsIDM4LCAzOSwgNDAsIDQxLCA0MiwgNDMsIDQ0LCA0NSwgNDYsIDQ3LCA0OCwgNDksIDUwLCA1MSwgNTIsIDUzLCA1NCwgNTUsIDU2LCA1NywgNTgsIDU5LCA2MCwgNjEsIDYyLCA2MywgNjQsIDY1LCA2NiwgNjcsIDY4LCA2OSwgNzAsIDcxLCA3MiwgNzMsIDc0LCA3NSwgNzYsIDc3LCA3OCwgNzksIDgwLCA4MSwgODIsIDgzLCA4NCwgODUsIDg2LCA4NywgODgsIDg5LCA5MCwgOTEsIDkyLCA5MywgOTQsIDk1LCA5NiwgOTcsIDk4LCA5OSwgMTAwXVxuXG4gICAgXG5cbiAgICBjb25zdCBjaGVja0dhbWVPdmVyID0gKCkgPT4ge1xuICAgICAgICAgaWYgKGdhbWVib2FyZC5zaGlwc1N1bmsgPT09IDUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICB9XG4gICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBhdHRhY2sgPSAoeCwgeSkgPT4ge1xuXG4gICAgICAgIGlmICggbmFtZSA9PT0gXCJjb21wdXRlclwiKSB7XG4gICAgICAgICAgICBsZXQgbW92ZSA9IGNvbXB1dGVyTW92ZSgpICAgICAgLy8gY2FsbCBmb3IgcmFuZG9tIG51bWJlciBmcm9tIHJlbWFpbmluZyBtb3ZlcyBhcnJheVxuICAgICAgICAgICAgeC5nYW1lYm9hcmQucmVjaWV2ZUF0dGFjayhtb3ZlKTsgXG4gICAgICAgICAgICBsZXQgYnllID0gbW92ZXMuaW5kZXhPZihtb3ZlKTsgLy9maW5kIGluZGV4IG9mIG1vdmUgbGVmdCBpbiBhcnJheS5cbiAgICAgICAgICAgIG1vdmVzLnNwbGljZShieWUsIDEpIC8vIGRlbGV0ZSBtb3ZlXG4gICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB4LmdhbWVib2FyZC5yZWNpZXZlQXR0YWNrKHkpO1xuICAgICAgICAgICAgbW92ZXMucHVzaCh5KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY29tcHV0ZXJNb3ZlID0gKCkgPT4ge1xuICAgICAgICBsZXQgbGVuID0gbW92ZXMubGVuZ3RoXG4gICAgICAgIFxuICAgICAgICBsZXQgbW92ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxlbikgXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbW92ZXNbbW92ZV1cbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7Z2FtZWJvYXJkLCBtb3ZlcywgbmFtZSwgY2hlY2tHYW1lT3ZlciwgYXR0YWNrfVxufVxuXG5cbmV4cG9ydCB7IFNoaXAsIEdhbWVib2FyZCAsIFBsYXllcn0iLCJpbXBvcnQge1BsYXllcn0gZnJvbSAnLi9mYWN0b3J5J1xuXG5jb25zdCBHYW1lbG9vcCA9ICgpID0+IHtcbiAgICBsZXQgcGxheWVyID0gIFBsYXllcigpXG4gICAgbGV0IGNvbXB1dGVyID0gUGxheWVyKClcbiAgIFxuICAgIGNvbnN0IG5ld0dhbWUgPSAobmFtZSkgPT4ge1xuXG4gICAgICAgIHBsYXllci5uYW1lID0gbmFtZVxuICAgICAgICBcblxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtuZXdHYW1lLCBwbGF5ZXIsIGNvbXB1dGVyfVxufVxuXG5leHBvcnQgeyBHYW1lbG9vcCB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9