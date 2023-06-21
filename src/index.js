import _ from 'lodash'
import css from './styles.css'
import {buildPage, buildGrid} from "./dom"
import {Player} from "./factory"
import {Gameloop} from './gameloop'
import { targetListener} from './listeners';
import "@fontsource/roboto-condensed/400.css"; // Specify weight

buildPage();
let user =  Player('Hans');
let computer = Player();
user.gameboard.placeShip(0, 3)
user.gameboard.placeShip(1, 22)
user.gameboard.placeShip(2, 12)
user.gameboard.placeShip(3, 53)
user.gameboard.placeShip(4, 44)
computer.gameboard.placeShip(0, 3)
computer.gameboard.placeShip(1, 22)
computer.gameboard.placeShip(2, 12)
computer.gameboard.placeShip(3, 53)
computer.gameboard.placeShip(4, 44)

console.log(user.gameboard.ships)
console.log(computer.gameboard.ships)



buildGrid(user);
buildGrid(computer, 'hover');






