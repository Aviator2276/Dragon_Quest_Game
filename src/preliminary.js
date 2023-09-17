import * as renderer from "./renderer.js";

const promptMesg = document.getElementById('Mesg');
const oneTeam = document.getElementById('oneTeam');
const twoTeam = document.getElementById('twoTeam');
const threeTeam = document.getElementById('threeTeam');
const fourTeam = document.getElementById('fourTeam');
const transition = document.getElementById('transition');

function addClassToElements(className, ...elements) {
    elements.forEach(element => element.classList.add(className));
}

function nextPage() {
    setTimeout(() => renderer.generateRandomDots(800), 200);
    setTimeout(() => window.open('preliminary.html','_self',false), 2200);
}

oneTeam.onclick = () => {
    addClassToElements('hidePrompt', twoTeam, threeTeam, fourTeam, promptMesg);
    oneTeam.classList.add('oneSel');
    nextPage();
};
twoTeam.onclick = () => {
    addClassToElements('hidePrompt', oneTeam, threeTeam, fourTeam, promptMesg);
    twoTeam.classList.add('twoSel');
    nextPage();
};
threeTeam.onclick = () => {
    addClassToElements('hidePrompt', oneTeam, twoTeam, fourTeam, promptMesg);
    threeTeam.classList.add('threeSel');
    nextPage();
};
fourTeam.onclick = () => {
    addClassToElements('hidePrompt', oneTeam, twoTeam, threeTeam, promptMesg);
    fourTeam.classList.add('fourSel');
    nextPage();
};