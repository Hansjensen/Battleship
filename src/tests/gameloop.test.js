import  {gameloop} from "../gameloop.js"

describe('Game Loop', () => {
    it('new player and computer should exist. Player should have name.', () => {
       const game = gameloop()
       game.setName('Hans')
       expect(game.player).not.toBeNull()
       
       expect(game.player.name).toBe('Hans')
       expect(game.computer).toBeDefined()
    })
    it(' autoPlace should give 5 ships to each player', () => {
        const game = gameloop()
        game.setName('Hans')
        game.autoPlaceShip()
        expect(game.player.gameboard.ships.length).toBe(5)
    })

    
    

})