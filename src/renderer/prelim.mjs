import * as gameLogic from "./game.mjs";
import * as renderer from "./renderer.mjs";
import * as dbAcess from "./dbAccess.js";

//import elements
const question = document.getElementById('question');
const ansA = document.getElementById('ansA');
const ansB = document.getElementById('ansB');
const ansC = document.getElementById('ansC');
const ansD = document.getElementById('ansD');

const confirmSelect = document.getElementById('confirmSelect2');
const confirmMesg = document.getElementById('confirmMesg2');
const confirm = document.getElementById('confirmed2');
const notConfirm = document.getElementById('notConfirmed2');


function addClassToElements(className, ...elements) {
    elements.forEach(element => element.classList.add(className));
}

export function onLoad() {
    const transition = document.getElementById(gameLogic.getGameStage()).getElementsByClassName('transition')[0];
    transition.classList.add('transStart');
}
function nextPage() {
    renderer.generateRandomDots(800)
    setTimeout(() => gameLogic.updateGame("teamSelectStage"), 2200);
}

function confirmSelection(selectTeam) {
    const transition = document.getElementById('transition2');
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
        transition.classList.add('transStart');
        gameLogic.changeTotalTeam(1);
        setTimeout(() => gameLogic.updateGame("teamConfigStage"), 700);
    }
}

ansA.onclick = () => {
    console.log("clicked!");
    console.log(ansB);
    console.log(ansC);
    console.log(ansD);
    console.log(question);
    addClassToElements('hidePrompt', ansB, ansC, ansD, question);
    ansA.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 1 Team Selection";
    setTimeout(() => confirmSelection(ansA), 500);
};
ansB.onclick = () => {
    addClassToElements('hidePrompt', ansA, ansB, ansD, question);
    ansB.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 2 Team Selection";
    setTimeout(() => confirmSelection(ansB), 500);
};
ansC.onclick = () => {
    addClassToElements('hidePrompt', ansA, ansB, ansD, question);
    ansC.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 3 Team Selection";
    setTimeout(() => confirmSelection(ansC), 500);
};
ansD.onclick = () => {
    addClassToElements('hidePrompt', ansA, ansB, ansC, question);
    ansD.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 4 Team Selection";
    setTimeout(() => confirmSelection(ansD), 500);
};