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
        dom.shipPlaceGrid(placeShip)
        buttonListeners(playAgain, setName)
        
    }

    const playAgain = () => {
        player =  Player()
        computer = Player()
        autoPlaceShip()
        createGrid();
        
        
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

    const placeShip = (x, y) => {
        player.gameboard.placeShip(x, y)
        console.log(player.gameboard.ships)
    }

    const autoPlaceShip = () => {

        

        player.gameboard.placeShip(0, 3)
        player.gameboard.placeShip(1, 22)
        player.gameboard.placeShip(2, 12)
        player.gameboard.placeShip(3, 53)
        player.gameboard.placeShip(4, 44)
        computer.gameboard.placeShip(0, 3)
        computer.gameboard.placeShip(1, 22)
        computer.gameboard.placeShip(2, 12)
        computer.gameboard.placeShip(3, 53)
        computer.gameboard.placeShip(4, 44)
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

    return {player, computer, setName, createTemplate, createGrid, newGame}
}

export { gameloop }