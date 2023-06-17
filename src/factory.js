


const Ship = (type, length) => {

    let name = type;
    let hits = 0;
    length= length;
    

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

    const placeShip = (x) => {

        
        
    }

    const shipType = (x) => {



    }
    

    return {}
}



export {Ship, Gameboard}