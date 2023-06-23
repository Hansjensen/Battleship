import _ from 'lodash'
import css from './styles.css'
import {buildPage, buildGrid} from "./dom"
import {Player} from "./factory"
import {gameloop} from './gameloop'
import { targetListener} from './listeners';
import "@fontsource/roboto-condensed/400.css"; // Specify weight




let game = gameloop();
game.setName('Hans');
console.log(game.player.name)
game.autoPlaceShip();
game.createTemplate();
game.createGrid();
game.player.gameboard.missed.push(3)
game.createGrid();






