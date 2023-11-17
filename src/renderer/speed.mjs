import * as gameLogic from "./game.mjs";
import * as renderer from "./renderer.mjs";

//import elements
const speedStage = document.getElementById("speedStage");
const question = getSpeedElement('question');
const ansA = getSpeedElement('ansA');
const ansB = getSpeedElement('ansB');
const ansC = getSpeedElement('ansC');
const ansD = getSpeedElement('ansD');

const showAnswer = getSpeedElement('showAnswer');
const correctAnswer = getSpeedElement('correctAnswer');
const correct = getSpeedElement('correct');
const incorrect = getSpeedElement('incorrect');

const transition = getSpeedElement('transition');


function addClassToElements(className, ...elements) {
    elements.forEach(element => element.classList.add(className));
}

function removeClassFromElements(className, ...elements) {
    elements.forEach(element => element.classList.remove(className));
}

function getSpeedElement(elementClass) {
    return speedStage.getElementsByClassName(elementClass)[0];
}

export function onLoad(firstTime) {
    if (firstTime) {
        transition.classList.add('transLoadPage');
    } else {
        correct.style.animation = 'correctRevealSlideOut .6s forwards';
        incorrect.style.animation = 'correctRevealSlideOut .6s forwards';
        showAnswer.style.animation = 'showAnswerSlideOut .6s forwards'; 
    }
    let questionAndAnswers = gameLogic.currentQuestion();
    console.log(question);
    question.innerHTML = questionAndAnswers[0];
    ansA.innerHTML = questionAndAnswers[1];
    ansB.innerHTML = questionAndAnswers[2];
    ansC.innerHTML = questionAndAnswers[3];
    ansD.innerHTML = questionAndAnswers[4];
    correctAnswer.innerHTML = gameLogic.getAnswer(false);
}

function nextPage() {
    renderer.generateRandomDots(400)
    setTimeout(() => gameLogic.updateGame("speedStage"), 2200);
}

function resetPage() {
    removeClassFromElements('hidePrompt', ansA, ansB, ansC, ansD, question);
    removeClassFromElements('transLoadPage', transition);
    removeClassFromElements('selected', ansA, ansB, ansC, ansD);
    correct.style.animation = ''; 
    incorrect.style.animation = ''; 
    showAnswer.style.animation = ''; 
    addClassToElements('hidden', showAnswer, correct, incorrect);
}

function guessAnswer(guess) {
    //showAnswer.classList.add('confirmShow');
    showAnswer.classList.remove('hidden');
    if (guess.innerHTML === correctAnswer.innerHTML) {
        correct.classList.remove('hidden');
        gameLogic.addPoints(1);
        gameLogic.consoleLogGameInfo();
        
    } else {
        incorrect.classList.remove('hidden');
    }

    setTimeout(() => {
        resetPage();
        gameLogic.nextSpeedQuestion();
        onLoad(false);
    }, 3000);
}

ansA.onclick = () => {
    addClassToElements('hidePrompt', ansB, ansC, ansD, question);
    ansA.classList.add('selected');
    setTimeout(() => guessAnswer(ansA), 500);
};
ansB.onclick = () => {
    addClassToElements('hidePrompt', ansA, ansC, ansD, question);
    ansB.classList.add('selected');
    setTimeout(() => guessAnswer(ansB), 500);
};
ansC.onclick = () => {
    addClassToElements('hidePrompt', ansA, ansB, ansD, question);
    ansC.classList.add('selected');
    setTimeout(() => guessAnswer(ansC), 500);
};
ansD.onclick = () => {
    addClassToElements('hidePrompt', ansA, ansB, ansC, question);
    ansD.classList.add('selected');
    setTimeout(() => guessAnswer(ansD), 500);
};