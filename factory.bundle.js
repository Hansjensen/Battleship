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




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/factory.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7OztBQUdBOzs7QUFHQTtBQUNBO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixnQkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWM7QUFDZCw4QkFBOEIsaUJBQWlCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQSxVQUFVOztBQUVWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3RvcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cblxuY29uc3QgU2hpcCA9ICh0eXBlLCBsZW5ndGgpID0+IHtcblxuICAgIGxldCBuYW1lID0gdHlwZTtcbiAgICBsZXQgaGl0cyA9IDA7XG4gICAgbGVuZ3RoPSBsZW5ndGg7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gW11cbiAgICBcblxuICAgIGZ1bmN0aW9uIGhpdCgpIHtcbiAgICAgICAgdGhpcy5oaXRzKytcbiAgICAgICAgXG4gICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgXG4gICAgICAgIGlmKHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7bmFtZSwgbGVuZ3RoLCBoaXRzLCBoaXQsIGlzU3VuaywgY29vcmRpbmF0ZXN9XG59XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcblxuICAgIGxldCBtaXNzZWQgPSBbXVxuICAgIGxldCBoaXQgPSBbXVxuICAgIGxldCBzaGlwc1N1bms9IDBcbiAgICBsZXQgc2hpcHMgPSBbXVxuICAgIGxldCBheGlzID0gdHJ1ZVxuICAgIFxuICAgIFxuICAgIGNvbnN0IHBsYWNlU2hpcCA9ICh4LCB5LCBheGlzID0gdHJ1ZSkgPT4ge1xuXG4gICAgICAgIGxldCBzaGlwID0gc2hpcFR5cGUoeClcblxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHNoaXAuY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlQ3JlYXRvcihheGlzLCB5LCBzaGlwLmxlbmd0aCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXMgPT09IGZhbHNlKSB7XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHNoaXBzLnB1c2goc2hpcClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGNvbnN0IHNoaXBUeXBlID0gKHgpID0+IHtcblxuICAgICAgICByZXR1cm4geCA9PT0gMCA/IFNoaXAoJ0JhdHRsZXNoaXAnLCA0KVxuICAgICAgICAgICAgOiB4ID09PSAxID8gU2hpcCgnQ2FycmllcicsIDUpXG4gICAgICAgICAgICA6IHggPT09IDIgPyBTaGlwKCdDcnVpc2VyJywgMylcbiAgICAgICAgICAgIDogeCA9PT0gMyA/IFNoaXAoJ1N1Ym1hcmluZScsIDMpXG4gICAgICAgICAgICA6IFNoaXAoJ0Rlc3Ryb3llcicsIDIpO1xuXG5cbiAgICB9XG5cbiAgICBjb25zdCByZWNpZXZlQXR0YWNrID0gKHgpID0+IHtcblxuICAgICAgICBcbiAgICAgICAgaWYgIChtaXNzZWQuaW5jbHVkZXMoeCkgfHwgaGl0LmluY2x1ZGVzKHgpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJZb3UgaGF2ZSBhbHJlYWR5IGF0dGFja2VkIHRoaXNcIlxuICAgICAgICB9XG4gICAgICAgIGxldCBzaGlwID0gbnVsbFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2hpcHNbaV0uY29vcmRpbmF0ZXMuaW5jbHVkZXMoeCkpIHtcbiAgICAgICAgICAgICAgICBzaGlwID0gc2hpcHNbaV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHNoaXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgc2hpcC5oaXQoKVxuICAgICAgICAgICAgaGl0LnB1c2goeClcbiAgICAgICAgfSBlbHNlIChcbiAgICAgICAgICAgIG1pc3NlZC5wdXNoKHgpXG4gICAgICAgIClcblxuXG4gICAgfVxuXG5cbiAgICBjb25zdCBzaGlwc1N1bmtDaGVjayA9ICgpID0+IHtcbiAgICAgICAgbGV0IHNoaXBzU3VuayA9IDBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoc2hpcHNbaV0uaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICBzaGlwc1N1bmsgKytcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2hpcHNTdW5rXG4gICAgfVxuXG4gICAgY29uc3QgY29vcmRpbmF0ZUNyZWF0b3IgPSAoYXhpcywgY29vcmRpbmF0ZSwgc2hpcExlbmd0aCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyciA9IFtdXG4gICAgICAgIGlmIChjb29yZGluYXRlID09PSBOYU4gfHwgY29vcmRpbmF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGF4aXMgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgZm9yKGxldCBpPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvdWJsZUNoZWNrZXIoY29vcmRpbmF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcnIucHVzaChjb29yZGluYXRlKVxuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGUgKz0gMVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9IDA7IGkgPCBzaGlwTGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb3VibGVDaGVja2VyKGNvb3JkaW5hdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goY29vcmRpbmF0ZSlcbiAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZSArPSAxMFxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB9XG4gICAgXG5cbiAgICByZXR1cm4gYXJyXG59XG5cbiAgICBjb25zdCBkb3VibGVDaGVja2VyID0gKHgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgaW4gc2hpcHMpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFzaGlwc1tpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoc2hpcHNbaV0uY29vcmRpbmF0ZXMuaW5jbHVkZXMoeCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuXG5yZXR1cm4geyBtaXNzZWQsIGhpdCwgcGxhY2VTaGlwLCBzaGlwcywgcmVjaWV2ZUF0dGFjaywgc2hpcHNTdW5rLCBzaGlwc1N1bmtDaGVja31cbn1cblxuY29uc3QgUGxheWVyID0gKHgpID0+IHtcbiAgICBcbiAgICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoKVxuXG4gICAgbGV0IG5hbWUgPSB4IHx8IFwiY29tcHV0ZXJcIlxuXG4gICAgXG4gICAgLy8gYW4gYXJyYXkgb2YgdGhlIG1vdmVzIHRoYXQgaGF2ZSBub3QgYmVlbiBjYWxsZWQuXG4gICAgbGV0IG1vdmVzID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCwgMjEsIDIyLCAyMywgMjQsIDI1LCAyNiwgMjcsIDI4LCAyOSwgMzAsIDMxLCAzMiwgMzMsIDM0LCAzNSwgMzYsIDM3LCAzOCwgMzksIDQwLCA0MSwgNDIsIDQzLCA0NCwgNDUsIDQ2LCA0NywgNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDU4LCA1OSwgNjAsIDYxLCA2MiwgNjMsIDY0LCA2NSwgNjYsIDY3LCA2OCwgNjksIDcwLCA3MSwgNzIsIDczLCA3NCwgNzUsIDc2LCA3NywgNzgsIDc5LCA4MCwgODEsIDgyLCA4MywgODQsIDg1LCA4NiwgODcsIDg4LCA4OSwgOTAsIDkxLCA5MiwgOTMsIDk0LCA5NSwgOTYsIDk3LCA5OCwgOTksIDEwMF1cblxuICAgIFxuXG4gICAgY29uc3QgY2hlY2tHYW1lT3ZlciA9ICgpID0+IHtcbiAgICAgICAgIGlmIChnYW1lYm9hcmQuc2hpcHNTdW5rQ2hlY2soKSA9PT0gNSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgIH1cbiAgICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjayA9ICh4LCB5KSA9PiB7XG5cbiAgICAgICAgaWYgKCF5KSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBtb3ZlID0gY29tcHV0ZXJNb3ZlKCkgICAgICAvLyBjYWxsIGZvciByYW5kb20gbnVtYmVyIGZyb20gcmVtYWluaW5nIG1vdmVzIGFycmF5XG4gICAgICAgICAgICB4LmdhbWVib2FyZC5yZWNpZXZlQXR0YWNrKG1vdmUpOyBcbiAgICAgICAgICAgIGxldCBieWUgPSBtb3Zlcy5pbmRleE9mKG1vdmUpOyAvL2ZpbmQgaW5kZXggb2YgbW92ZSBsZWZ0IGluIGFycmF5LlxuICAgICAgICAgICAgbW92ZXMuc3BsaWNlKGJ5ZSwgMSkgLy8gZGVsZXRlIG1vdmVcbiAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICByZXR1cm4geC5nYW1lYm9hcmQucmVjaWV2ZUF0dGFjayh5KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY29tcHV0ZXJNb3ZlID0gKCkgPT4ge1xuICAgICAgICBsZXQgbGVuID0gbW92ZXMubGVuZ3RoXG4gICAgICAgIFxuICAgICAgICBsZXQgbW92ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxlbikgXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbW92ZXNbbW92ZV1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgXG4gICAgXG4gICAgcmV0dXJuIHtnYW1lYm9hcmQsIG1vdmVzLCBuYW1lLCBjaGVja0dhbWVPdmVyLCBhdHRhY2t9XG59XG5cblxuZXhwb3J0IHsgU2hpcCwgR2FtZWJvYXJkICwgUGxheWVyfSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==