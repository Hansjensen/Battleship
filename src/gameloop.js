import {Player} from './factory'
import {dom} from './dom'
import { targetListener } from './listeners'

const gameloop = () => {
    let player =  Player()
    let computer = Player()
   
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
                    let id = Number(square.slice(1, 4))
                    
                    player.attack(computer, id)
                    computer.attack(player)
                    
                    createGrid();
                }) 
            })
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

    const playGame = (id) => {
        while (!player.checkGameOver || !computer.checkGameOver) {

        }
    }



    return {player, computer, setName, createTemplate, createGrid,autoPlaceShip}
}

export { gameloop }