import {Ship, Gameboard, Player} from "../factory.js"

describe('Ship Factory', () => {
    it('returns ship with properties', () => {
        const ship = Ship('patrol', 2);
        expect(ship.name).toBe('patrol')
        expect(ship.length).toBe(2)
        expect(ship.hits).toBe(0)
    })

    it('adds hits when function is called', () => {
        const ship = Ship('battleship', 4);
        expect(ship.hits).toBe(0)
        ship.hit()
        expect(ship.hits).toBe(1)
        ship.hit()
        ship.hit()
        expect(ship.hits).toBe(3)
    })

    it('should sink the ship', () => {
        const ship = Ship('battleship', 4);
        expect(ship.isSunk()).toBe(false)
        ship.hit()
        ship.hit()
        ship.hit()
        ship.hit()
        expect(ship.hits).toBe(4)
        expect(ship.isSunk()).toBe(true)
    })
})

describe('Gameboard factory', () => {
    it('should place a ship', () => {
        let gameboard = Gameboard()
        gameboard.placeShip(0, 10)
        expect(gameboard.ships.length).toEqual(1)
        expect(gameboard.ships[0].name).toBe('Battleship')   
        expect(gameboard.ships[0].coordinates.length).toEqual(4)
        
    })

    it('should not place a ship on top of another ship', () => {
        let gameboard = Gameboard()
        gameboard.placeShip(0, 10)
        gameboard.placeShip(1, 13)
        
        expect(gameboard.placeShip(2, 11)).toBe(false)
        expect(gameboard.ships.length).toBe(1)
    })
    

    it('should recieve an attack', () => {
        let gameboard = Gameboard()
        gameboard.placeShip(0, 11)
        gameboard.recieveAttack(11)
        expect(gameboard.hit.includes(11)).toBe(true)
        expect(gameboard.ships[0].hits).toBe(1)
    
    })
    
    it('should reject an already called space', () => {
        let gameboard = Gameboard()
        gameboard.placeShip(0, 11)
        gameboard.recieveAttack(11)
        expect(gameboard.recieveAttack(11)).toBe("You have already attacked this")
    })

    it('should log missed hits', () => {
        let gameboard = Gameboard()
        gameboard.placeShip(0, 11)
        gameboard.recieveAttack(11)
        gameboard.recieveAttack(50)
        expect(gameboard.missed.includes(50)).toBe(true)
    })

    it('should log hits', () => {
        let gameboard = Gameboard()
        gameboard.placeShip(0, 11)
        gameboard.recieveAttack(11)
        gameboard.recieveAttack(11)
        expect(gameboard.hit.includes(11)).toBe(true)
    })
})

describe('Player factory', () => {

    
        test('should make a gameboard, name property', () => {
            const computer = Player("computer")
            const hans = Player("Hans")
            expect(typeof hans.gameboard).toEqual("object")
            expect(hans.name).toBe("Hans")
        })
   
                
        
        test('should return a random coordinate for the computer, no doubles.', () => {
                
                const computer = Player("computer")
                const hans = Player("Hans")
                
                computer.attack(hans)
                
                expect(computer.moves.length).toBe(99)
                expect(hans.gameboard.missed.length).toBe(1)
                for (let i = 0;i < 99; i++) {
                
                    computer.attack(hans)

                }
                expect(hans.gameboard.missed.length).toBe(100)
                expect(computer.moves.length).toBe(0)

        })

    
})