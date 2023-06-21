import  {Gameloop} from "../gameloop.js"

describe('Game Loop', () => {
    it('new player and computer should exist. Player should have name.', () => {
       const game = Gameloop()
       game.newGame('Hans')
       expect(game.player).not.toBeNull()
       
       expect(game.player.name).toBe('Hans')
       expect(game.computer).toBeDefined()
    })
    

})