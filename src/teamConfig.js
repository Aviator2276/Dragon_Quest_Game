import * as renderer from "./renderer.js";

const promptMesg = document.getElementById('Mesg');
const oneTeam = document.getElementById('oneTeam');
const twoTeam = document.getElementById('twoTeam');
const threeTeam = document.getElementById('threeTeam');
const fourTeam = document.getElementById('fourTeam');

const confirmSelect = document.getElementById('confirmSelect');
const confirmMesg = document.getElementById('confirmMesg');
const confirm = document.getElementById('confirmed');
const notConfirm = document.getElementById('notConfirmed');
const transition = document.getElementById('transition');

function addClassToElements(className, ...elements) {
    elements.forEach(element => element.classList.add(className));
}

function nextPage() {
    setTimeout(() => renderer.generateRandomDots(800), 200);
    setTimeout(() => window.open('preliminary.html','_self',false), 2200);
}

function confirmSelection() {
    setTimeout(() => confirmSelect.classList.add('confirmShow'), 500);
    addClassToElements('confirmButtonShow', confirm, notConfirm);
    setTimeout(() => confirmMesg.classList.add('prompt'), 1000);
    confirmMesg.classList.remove('hidden');
    confirm.onclick = () => {
        nextPage();
    };
    notConfirm.onclick = () => {
        renderer.generateRandomDots(600)
        location.reload();
    }
}

oneTeam.onclick = () => {
    addClassToElements('hidePrompt', twoTeam, threeTeam, fourTeam, promptMesg);
    oneTeam.classList.add('selected');
    confirmSelection();
};
twoTeam.onclick = () => {
    addClassToElements('hidePrompt', oneTeam, threeTeam, fourTeam, promptMesg);
    twoTeam.classList.add('selected');
    confirmSelection();
};
threeTeam.onclick = () => {
    addClassToElements('hidePrompt', oneTeam, twoTeam, fourTeam, promptMesg);
    threeTeam.classList.add('selected');
    confirmSelection();
};
fourTeam.onclick = () => {
    addClassToElements('hidePrompt', oneTeam, twoTeam, threeTeam, promptMesg);
    fourTeam.classList.add('selected');
    confirmSelection();
};