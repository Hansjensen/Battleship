import _ from 'lodash'
import css from './styles.css'
import {buildPage, buildGrid} from "./dom"
import {Player} from "./factory"
import {gameloop} from './gameloop'
import { targetListener} from './listeners';
import "@fontsource/roboto-condensed/400.css"; // Specify weight




let game = gameloop();
game.newGame()







