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

export function onLoad() {
    transition.classList.add('transLoadPage');
    let questionAndAnswers = gameLogic.currentQuestion();
    question.innerHTML = questionAndAnswers[0];
    ansA.innerHTML = questionAndAnswers[1];
    ansB.innerHTML = questionAndAnswers[2];
    ansC.innerHTML = questionAndAnswers[3];
    ansD.innerHTML = questionAndAnswers[4];
    correctAnswer.innerHTML = gameLogic.getAnswer();
}
function nextPage() {
    renderer.generateRandomDots(800)
    setTimeout(() => gameLogic.updateGame("teamSelectStage"), 2200);
}

function resetPage() {
    addClassToElements('hidden', showAnswer, correct, incorrect);
    correct.style.animation = ''; 
    incorrect.style.animation = ''; 
    showAnswer.style.animation = '';
}

function guessAnswer(guess) {
    const transition = document.getElementById(gameLogic.getGameStage()).getElementsByClassName('transition')[0];
    //showAnswer.classList.add('confirmShow');
    showAnswer.classList.remove('hidden');
    if (guess.innerHTML === correctAnswer.innerHTML) {
        correct.classList.remove('hidden');
    } else {
        incorrect.classList.remove('hidden');
    }

    setTimeout(() => {
        removeClassFromElements('hidePrompt', ansA, ansB, ansC, ansD, question);
        removeClassFromElements('transLoadPage', transition);
        removeClassFromElements('selected', ansA, ansB, ansC, ansD);
        correct.style.animation = ''; 
        incorrect.style.animation = ''; 
        showAnswer.style.animation = ''; 
        correct.style.animation = 'correctRevealSlideOut .6s forwards';
        incorrect.style.animation = 'correctRevealSlideOut .6s forwards';
        showAnswer.style.animation = 'showAnswerSlideOut .6s forwards'; 
        setTimeout(() => {
            resetPage();
            gameLogic.nextQuestion();
            onload();
        }, 600);
        //correct.style.animation = 'correctRevealSlideOut 1s ';
        //incorrect.style.animation = 'correctRevealSlideOut 1s ';
        //showAnswer.style.animation = 'showAnswerSlideOut 1s ';

    }, 3000);
}

ansA.onclick = () => {
    addClassToElements('hidePrompt', ansB, ansC, ansD, question);
    ansA.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 1 Team Selection";
    setTimeout(() => guessAnswer(ansA), 500);
};
ansB.onclick = () => {
    addClassToElements('hidePrompt', ansA, ansC, ansD, question);
    ansB.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 2 Team Selection";
    setTimeout(() => guessAnswer(ansB), 500);
};
ansC.onclick = () => {
    addClassToElements('hidePrompt', ansA, ansB, ansD, question);
    ansC.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 3 Team Selection";
    setTimeout(() => guessAnswer(ansC), 500);
};
ansD.onclick = () => {
    addClassToElements('hidePrompt', ansA, ansB, ansC, question);
    ansD.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 4 Team Selection";
    setTimeout(() => guessAnswer(ansD), 500);
};