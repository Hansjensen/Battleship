import {Ship} from "../factory.js"

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
        gameboard.placeShip(0)
        expect(gameboard.ships.length).toEqual(1)
        expect(gameboard.ships[0].name).toBe('Battleship')    
        expect(gameboard.ships[0].coordinates.length).toEqual(4)
    })
})