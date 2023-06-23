import { dom } from './dom'

function targetListener(player, computer) {

    const targets = document.querySelectorAll('.hover')
    targets.forEach(item =>{
        item.addEventListener('click', event => {
            let square = event.target.id
            let id = Number(square.slice(1, 4))
            let user = square.slice(0,1)
            
            computer.recieveAttack(id)
            computer.attack()
            
            if (computer.gameboard.shipsSunk < 5){
            dom.buildGrid(computer, "hover")
            }
        })
    })

}

export {targetListener}