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

function changeClassToElements(change, className, ...elements) {
    if (change === "add") {
        elements.forEach(element => element.classList.add(className));
    } else if (change === "remove") {
        elements.forEach(element => element.classList.remove(className));
    } else {
        console.log("Error: Please use a correct change statement.")
    }
}

export function onLoad() {
    const transition = document.getElementById(gameLogic.getGameStage()).getElementsByClassName('transition')[0];
    transition.classList.remove('transNextPage'); 
    transition.classList.add('transLoadPage'); 
}
function nextPage() {
    renderer.generateRandomDots(400)
    gameLogic.setTeams();
    setTimeout(() => gameLogic.updateGame("teamSelectStage"), 2200);
}

function confirmSelection(selectTeam) {
    const transition = document.getElementById(gameLogic.getGameStage()).getElementsByClassName('transition')[0];
    let teamDiv = document.getElementById(selectTeam);
    transition.classList.remove('transLoadPage');
    confirmSelect.classList.add('confirmShow');
    setTimeout(() => teamDiv.classList.remove('selected'), 400);
    changeClassToElements("add",'confirmButtonShow', confirm, notConfirm);
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
        setTimeout(() => {
            changeClassToElements("remove", 'hidePrompt', oneTeam, twoTeam, threeTeam, fourTeam, promptMesg);
            changeClassToElements("remove",'confirmButtonShow', confirm, notConfirm);
            confirmSelect.classList.remove('confirmShow');
            confirmMesg.classList.remove('prompt');
            confirmMesg.classList.add('hidden');
            gameLogic.changeTotalTeam(1);
        }, 800);
        setTimeout(() => gameLogic.updateGame("teamConfigStage"), 800);
        setTimeout(() => onLoad(), 1000);
    }
}

oneTeam.onclick = () => {
    changeClassToElements("add",'hidePrompt', twoTeam, threeTeam, fourTeam, promptMesg);
    oneTeam.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 1 Team Selection";
    setTimeout(() => confirmSelection("oneTeam"), 500);
};
twoTeam.onclick = () => {
    changeClassToElements("add",'hidePrompt', oneTeam, threeTeam, fourTeam, promptMesg);
    twoTeam.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 2 Team Selection";
    setTimeout(() => confirmSelection("twoTeam"), 500);
};
threeTeam.onclick = () => {
    changeClassToElements("add",'hidePrompt', oneTeam, twoTeam, fourTeam, promptMesg);
    threeTeam.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 3 Team Selection";
    setTimeout(() => confirmSelection("threeTeam"), 500);
};
fourTeam.onclick = () => {
    changeClassToElements("add",'hidePrompt', oneTeam, twoTeam, threeTeam, promptMesg);
    fourTeam.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 4 Team Selection";
    setTimeout(() => confirmSelection("fourTeam"), 500);
};