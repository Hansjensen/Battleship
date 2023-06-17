


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
    return {name, length, hits, hit, isSunk}
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
                
                arr.push(coordinate)
                coordinate += 1
                

            }
        } else {
            for(let i= 0; i < shipLength - 1; i++) {
                
                arr.push(coordinate)
                coordinate += 10
                
        }
        
        
        }
    

    return arr
}

return { missed, hit, placeShip, ships, recieveAttack}
}

const Player = () => {
    
    const gameboard = Gameboard()

    let moves = []
    return {gameboard, moves}
}


export { Ship, Gameboard , Player}