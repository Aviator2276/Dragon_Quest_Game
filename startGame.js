const startGame = document.querySelector("#startGame");

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
    line.style.transformOrigin = '0% 50%';
    
    line.style.position = 'absolute';
    line.style.left = `${dotX}px`;
    line.style.top = `${dotY}px`;
    line.style.transform = `rotate(${angle}rad)`;
    line.style.width = '0';
    line.style.height = '10px';
    line.style.zIndex = '2';
    line.style.background = 'white';
    line.style.borderRadius = '5px';
    
    document.getElementById('hyperSpace').appendChild(line);
    
    line.style.animation = 'extend 2s forwards';
    squareTrans.classList.add('trans')
    setTimeout(() => {
        line.remove();
    }, 10000);
}
function generateRandomDots(numDots) {
    for (let i = 0; i < numDots; i++) {
        createRandomDot();
    }
}


window.addEventListener('load', function () {
    const element = document.getElementById('wavyTextStart');
    setTimeout(() => element.classList.add('infinite'), 2300);
});
startGame.onclick = () => {
    generateRandomDots(500);
    setTimeout(() => window.open('teamConfig.html','_self',false), 2200);
};