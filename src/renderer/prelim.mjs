import * as gameLogic from "./game.mjs";
import * as renderer from "./renderer.mjs";

//import elements
const prelimStage = document.getElementById("prelimStage");
const question = getPrelimElement('question');
const ansA = getPrelimElement('ansA');
const ansB = getPrelimElement('ansB');
const ansC = getPrelimElement('ansC');
const ansD = getPrelimElement('ansD');

const showAnswer = getPrelimElement('showAnswer');
const correctAnswer = getPrelimElement('correctAnswer');
const correct = getPrelimElement('correct');
const incorrect = getPrelimElement('incorrect');

const transition = getPrelimElement('transition');

const topGUI = document.getElementById('topGUI');
const score = document.getElementById('score');

function addClassToElements(className, ...elements) {
    elements.forEach(element => element.classList.add(className));
}

function removeClassFromElements(className, ...elements) {
    elements.forEach(element => element.classList.remove(className));
}

function getPrelimElement(elementClass) {
    return prelimStage.getElementsByClassName(elementClass)[0];
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
    correctAnswer.innerHTML = gameLogic.getAnswer(true);

    score.classList.remove("pageHide");
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
        gameLogic.nextPrelimQuestion();
        gameLogic.updateGame('speedStage')
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