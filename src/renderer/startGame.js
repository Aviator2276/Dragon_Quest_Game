const { changeGameState } = require('../main/game.js');
const { generateRandomDots } = require('./renderer.js');
//import * as game from "../main/game.js";
//import * as renderer from "./renderer.js";

const startGame = document.querySelector("#startGame");

window.addEventListener('load', function () {
    const element = document.getElementById('wavyTextStart');
    setTimeout(() => element.classList.add('infinite'), 2300);
});
startGame.onclick = () => {
    changeGameState("teamConfig");
    generateRandomDots(800);
    setTimeout(() => window.open('teamConfig.html','_self',false), 2200);
};