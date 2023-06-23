import { dom } from './dom'
import { Player } from './factory'
import { gameloop } from './gameloop'

function buttonListeners(x, y) {

    let playagain = document.getElementById('playAgain')
    let startGame = document.getElementById('startGameButt')
    let nameInput = document.getElementById('nameInput')
    

    playagain.addEventListener('click', e => {
        dom.popUpBackground('playAgain', "reset")
        x()

    })

    startGame.addEventListener('click', e => {
        y(nameInput.value)
        dom.popUpBackground('startGame', )
    })
    
}

export {buttonListeners}