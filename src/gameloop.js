import {Player} from './factory'

const Gameloop = () => {
    let player =  Player()
    let computer = Player()
   
    const newGame = (name) => {

        player.name = name
        

    }


    return {newGame, player, computer}
}

export { Gameloop }