import * as gameLogic from "./game.mjs";
import * as renderer from "./renderer.mjs";

const promptMesg = document.getElementById('Mesg');
const oneTeam = document.getElementById('oneTeam');
const twoTeam = document.getElementById('twoTeam');
const threeTeam = document.getElementById('threeTeam');
const fourTeam = document.getElementById('fourTeam');

const confirmSelect = document.getElementById('confirmSelect');
const confirmMesg = document.getElementById('confirmMesg');
const confirm = document.getElementById('confirmed');
const notConfirm = document.getElementById('notConfirmed');

function addClassToElements(className, ...elements) {
    elements.forEach(element => element.classList.add(className));
}

export function onLoad() {
    const transition = document.getElementById(gameLogic.getGameStage()).getElementsByClassName('transition')[0];
    transition.classList.add('transLoadPage');
}
function nextPage() {
    renderer.generateRandomDots(800)
    setTimeout(() => gameLogic.updateGame("teamSelectStage"), 2200);
}

function confirmSelection(selectTeam) {
    const transition = document.getElementById(gameLogic.getGameStage()).getElementsByClassName('transition')[0];
    transition.classList.remove('transLoadPage');
    confirmSelect.classList.add('confirmShow');
    setTimeout(() => selectTeam.classList.remove('selected'), 400);
    addClassToElements('confirmButtonShow', confirm, notConfirm);
    setTimeout(() => confirmMesg.classList.add('prompt'), 400);
    setTimeout(() => confirmMesg.classList.remove('hidden'), 400);
    
    selectTeam === "fourTeam" ? gameLogic.changeTotalTeam(4)
    : selectTeam === "threeTeam" ? gameLogic.changeTotalTeam(3)
    : selectTeam === "twoTeam" ? gameLogic.changeTotalTeam(2)
    : gameLogic.changeTotalTeam(1);

    confirm.onclick = () => {
        nextPage();
    };
    notConfirm.onclick = () => {
        transition.classList.add('transNextPage');
        gameLogic.changeTotalTeam(1);
        setTimeout(() => gameLogic.updateGame("teamConfigStage"), 700);
    }
}

oneTeam.onclick = () => {
    addClassToElements('hidePrompt', twoTeam, threeTeam, fourTeam, promptMesg);
    oneTeam.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 1 Team Selection";
    setTimeout(() => confirmSelection(oneTeam), 500);
};
twoTeam.onclick = () => {
    addClassToElements('hidePrompt', oneTeam, threeTeam, fourTeam, promptMesg);
    twoTeam.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 2 Team Selection";
    setTimeout(() => confirmSelection(twoTeam), 500);
};
threeTeam.onclick = () => {
    addClassToElements('hidePrompt', oneTeam, twoTeam, fourTeam, promptMesg);
    threeTeam.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 3 Team Selection";
    setTimeout(() => confirmSelection(threeTeam), 500);
};
fourTeam.onclick = () => {
    addClassToElements('hidePrompt', oneTeam, twoTeam, threeTeam, promptMesg);
    fourTeam.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 4 Team Selection";
    setTimeout(() => confirmSelection(fourTeam), 500);
};