import { buildGrid } from "./dom"

function targetListener(player) {

    const targets = document.querySelectorAll('.targets')
    
    targets.forEach(item => {
        item.addEventListener('click', event => {
            let square = event.target.id
            let id = square.slice(1, 4)
            let user = square.slice(0,1)
            if (user = 'c') {
                computer.gameboard.recieveAttack(id)
                console.log(computer.gameboard.missed)
                buildGrid(computer)
            }
        })
    })

}

export {targetListener}