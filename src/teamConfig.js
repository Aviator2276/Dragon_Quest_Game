const promptMesg = document.getElementById('Mesg');
const oneTeam = document.getElementById('oneTeam');
const twoTeam = document.getElementById('twoTeam');
const threeTeam = document.getElementById('threeTeam');
const fourTeam = document.getElementById('fourTeam');
const transition = document.getElementById('transition');

function addClassToElements(className, ...elements) {
    elements.forEach(element => element.classList.add(className));
}

function createRandomDot() {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    
    dot.style.left = `${randomX}px`;
    dot.style.top = `${randomY}px`;
    
    document.getElementById('hyperSpace').appendChild(dot);
    
    setTimeout(() => {
        transformDotToLine(dot);
    }, 1200);
}
function transformDotToLine(dot) {
    dot.classList.remove('dot');
    dot.classList.add('line');

    const squareTrans = document.getElementById('transition');

    const dotX = parseFloat(dot.style.left) + 5;
    const dotY = parseFloat(dot.style.top) + 5;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const angle = Math.atan2(centerY - dotY, centerX - dotX) + Math.PI;
    const distance = Math.sqrt(Math.pow(centerX - dotX, 2) + Math.pow(centerY - dotY, 2)) + 1000;
    
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.left = `${dotX}px`;
    line.style.top = `${dotY}px`;
    line.style.transform = `rotate(${angle}rad)`;
    
    document.getElementById('hyperSpace').appendChild(line);
    
    line.style.animation = 'extend 2s forwards';
    transition.style.animation = 'transitionOut 1.6s forwards';
    setTimeout(() => {
        line.remove();
    }, 10000);
}
function generateRandomDots(numDots) {
    for (let i = 0; i < numDots; i++) {
        createRandomDot();
    }
}

function nextPage() {
    setTimeout(() => generateRandomDots(800), 200);
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
    fourTeam.classList.add('fourSel');
    addClassToElements('hidePrompt', oneTeam, twoTeam, threeTeam, promptMesg);
    nextPage();
};