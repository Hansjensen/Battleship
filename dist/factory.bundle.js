"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["factory"],{

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




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/factory.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixnQkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWM7QUFDZCw4QkFBOEIsb0JBQW9CO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG5jb25zdCBTaGlwID0gKHR5cGUsIGxlbmd0aCkgPT4ge1xuXG4gICAgbGV0IG5hbWUgPSB0eXBlO1xuICAgIGxldCBoaXRzID0gMDtcbiAgICBsZW5ndGg9IGxlbmd0aDtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBbXVxuICAgIFxuXG4gICAgZnVuY3Rpb24gaGl0KCkge1xuICAgICAgICB0aGlzLmhpdHMrK1xuICAgICAgICBcbiAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICBcbiAgICAgICAgaWYodGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtuYW1lLCBsZW5ndGgsIGhpdHMsIGhpdCwgaXNTdW5rLCBjb29yZGluYXRlc31cbn1cblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuXG4gICAgbGV0IG1pc3NlZCA9IFtdXG4gICAgbGV0IGhpdCA9IFtdXG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG4gICAgbGV0IHNoaXBzID0gW11cbiAgICBsZXQgYXhpcyA9ICd4J1xuICAgIFxuICAgIFxuICAgIGNvbnN0IHBsYWNlU2hpcCA9ICh4LCB5KSA9PiB7XG5cbiAgICAgICAgbGV0IHNoaXAgPSBzaGlwVHlwZSh4KVxuXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgc2hpcC5jb29yZGluYXRlcyA9IGF4aXMgPT09ICd4JyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGNvb3JkaW5hdGVDcmVhdG9yKCd4JywgeSwgc2hpcC5sZW5ndGgpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogY29vcmRpbmF0ZUNyZWF0b3IoJ3knLCB5LiBzaGlwLmxlbmd0aClcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc2hpcHMucHVzaChzaGlwKVxuICAgICAgICBcbiAgICB9XG5cbiAgICBjb25zdCBzaGlwVHlwZSA9ICh4KSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHggPT09IDAgPyBTaGlwKCdCYXR0bGVzaGlwJywgNClcbiAgICAgICAgICAgIDogeCA9PT0gMSA/IFNoaXAoJ0NhcnJpZXInLCA1KVxuICAgICAgICAgICAgOiB4ID09PSAyID8gU2hpcCgnQ3J1aXNlcicsIDMpXG4gICAgICAgICAgICA6IHggPT09IDMgPyBTaGlwKCdTdWJtYXJpbmUnLCAzKVxuICAgICAgICAgICAgOiBTaGlwKCdEZXN0cm95ZXInLCAyKTtcblxuXG4gICAgfVxuXG4gICAgY29uc3QgcmVjaWV2ZUF0dGFjayA9ICh4KSA9PiB7XG4gICAgICAgIGlmICAobWlzc2VkLmluY2x1ZGVzKHgpIHx8IGhpdC5pbmNsdWRlcyh4KSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiWW91IGhhdmUgYWxyZWFkeSBhdHRhY2tlZCB0aGlzXCJcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2hpcCA9IG51bGxcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNoaXBzW2ldLmNvb3JkaW5hdGVzLmluY2x1ZGVzKHgpKSB7XG4gICAgICAgICAgICAgICAgc2hpcCA9IHNoaXBzW2ldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNoaXAgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHNoaXAuaGl0KClcbiAgICAgICAgICAgIGhpdC5wdXNoKHgpXG4gICAgICAgICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgIHNoaXBzU3VuaysrXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSAoXG4gICAgICAgICAgICBtaXNzZWQucHVzaCh4KVxuICAgICAgICApXG5cblxuICAgIH1cblxuICAgIFxuXG4gICAgY29uc3QgY29vcmRpbmF0ZUNyZWF0b3IgPSAoYXhpcywgY29vcmRpbmF0ZSwgc2hpcExlbmd0aCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyciA9IFtdXG4gICAgICAgIFxuICAgICAgICBpZiAoYXhpcyA9PSAneCcpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaT0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChkb3VibGVDaGVja2VyKGNvb3JkaW5hdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goY29vcmRpbmF0ZSlcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlICs9IDFcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPSAwOyBpIDwgc2hpcExlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG91YmxlQ2hlY2tlcihjb29yZGluYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGNvb3JkaW5hdGUpXG4gICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGUgKz0gMTBcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgfVxuICAgIFxuXG4gICAgcmV0dXJuIGFyclxufVxuXG4gICAgY29uc3QgZG91YmxlQ2hlY2tlciA9ICh4KSA9PiB7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpIGluIHNoaXBzKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghc2hpcHNbaV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHNoaXBzW2ldLmNvb3JkaW5hdGVzLmluY2x1ZGVzKHgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cblxucmV0dXJuIHsgbWlzc2VkLCBoaXQsIHBsYWNlU2hpcCwgc2hpcHMsIHJlY2lldmVBdHRhY2t9XG59XG5cbmNvbnN0IFBsYXllciA9ICh4KSA9PiB7XG4gICAgXG4gICAgY29uc3QgZ2FtZWJvYXJkID0gR2FtZWJvYXJkKClcblxuICAgIGNvbnN0IG5hbWUgPSB4IHx8IFwiY29tcHV0ZXJcIlxuXG4gICAgXG4gICAgLy8gYW4gYXJyYXkgb2YgdGhlIG1vdmVzIHRoYXQgaGF2ZSBub3QgYmVlbiBjYWxsZWQuXG4gICAgbGV0IG1vdmVzID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCwgMjEsIDIyLCAyMywgMjQsIDI1LCAyNiwgMjcsIDI4LCAyOSwgMzAsIDMxLCAzMiwgMzMsIDM0LCAzNSwgMzYsIDM3LCAzOCwgMzksIDQwLCA0MSwgNDIsIDQzLCA0NCwgNDUsIDQ2LCA0NywgNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDU4LCA1OSwgNjAsIDYxLCA2MiwgNjMsIDY0LCA2NSwgNjYsIDY3LCA2OCwgNjksIDcwLCA3MSwgNzIsIDczLCA3NCwgNzUsIDc2LCA3NywgNzgsIDc5LCA4MCwgODEsIDgyLCA4MywgODQsIDg1LCA4NiwgODcsIDg4LCA4OSwgOTAsIDkxLCA5MiwgOTMsIDk0LCA5NSwgOTYsIDk3LCA5OCwgOTksIDEwMF1cblxuICAgIFxuXG4gICAgY29uc3QgY2hlY2tHYW1lT3ZlciA9ICgpID0+IHtcbiAgICAgICAgIGlmIChnYW1lYm9hcmQuc2hpcHNTdW5rID09PSA1KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgfVxuICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgYXR0YWNrID0gKHgsIHkpID0+IHtcblxuICAgICAgICBpZiAoIG5hbWUgPT09IFwiY29tcHV0ZXJcIikge1xuICAgICAgICAgICAgbGV0IG1vdmUgPSBjb21wdXRlck1vdmUoKSAgICAgIC8vIGNhbGwgZm9yIHJhbmRvbSBudW1iZXIgZnJvbSByZW1haW5pbmcgbW92ZXMgYXJyYXlcbiAgICAgICAgICAgIHguZ2FtZWJvYXJkLnJlY2lldmVBdHRhY2sobW92ZSk7IFxuICAgICAgICAgICAgbGV0IGJ5ZSA9IG1vdmVzLmluZGV4T2YobW92ZSk7IC8vZmluZCBpbmRleCBvZiBtb3ZlIGxlZnQgaW4gYXJyYXkuXG4gICAgICAgICAgICBtb3Zlcy5zcGxpY2UoYnllLCAxKSAvLyBkZWxldGUgbW92ZVxuICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeC5nYW1lYm9hcmQucmVjaWV2ZUF0dGFjayh5KTtcbiAgICAgICAgICAgIG1vdmVzLnB1c2goeSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNvbXB1dGVyTW92ZSA9ICgpID0+IHtcbiAgICAgICAgbGV0IGxlbiA9IG1vdmVzLmxlbmd0aFxuICAgICAgICBcbiAgICAgICAgbGV0IG1vdmUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZW4pIFxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG1vdmVzW21vdmVdXG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICByZXR1cm4ge2dhbWVib2FyZCwgbW92ZXMsIG5hbWUsIGNoZWNrR2FtZU92ZXIsIGF0dGFja31cbn1cblxuXG5leHBvcnQgeyBTaGlwLCBHYW1lYm9hcmQgLCBQbGF5ZXJ9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9