import * as renderer from "./transition.js";

const startGame = document.querySelector("#startGame");

window.addEventListener('load', function () {
    const element = document.getElementById('wavyTextStart');
    setTimeout(() => element.classList.add('infinite'), 2300);
});
startGame.onclick = () => {
    renderer.generateRandomDots(800);
    setTimeout(() => window.open('teamConfig.html','_self',false), 2200);
};