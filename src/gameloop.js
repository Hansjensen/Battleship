import {Player} from './factory'
import {dom} from './dom'
import { buttonListeners } from './listeners'

const gameloop = () => {
    let player =  Player()
    let computer = Player()

    const newGame = (x) => {
        player =  Player()
        computer = Player()
        
        createTemplate();
        createGrid();
        autoPlaceShip(0);
        
        dom.shipPlaceGrid(placeShip, player)
        buttonListeners(playAgain, setName)
        
    }

    const playAgain = () => {
        player =  Player()
        computer = Player()
        
        createGrid();
        autoPlaceShip(0);
        
        dom.shipPlaceGrid(placeShip, player)
        
    }

    const setName = (name) => {
        
        player.name = name
    }

    const createTemplate= () => {

        dom.buildPage();
        


    }

    const createGrid = () => {
       
        dom.buildGrid(player, computer)
       
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
            dom.popUpBackground('gameOver', player.name)
        }
        computer.attack(player) 
        if(player.checkGameOver()) {
            dom.popUpBackground('gameOver', computer.name)
        }
    }

    return {player, computer, setName, createTemplate, createGrid, newGame, autoPlaceShip}
}

export { gameloop }