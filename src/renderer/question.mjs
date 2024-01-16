import * as gameLogic from "./game.mjs";
import * as renderer from "./renderer.mjs";

//import elements
const questionStage = document.getElementById("questionStage");
const question = getQuestionElement('question');
const ansA = getQuestionElement('ansA');
const ansB = getQuestionElement('ansB');
const ansC = getQuestionElement('ansC');
const ansD = getQuestionElement('ansD');

const showAnswer = getQuestionElement('showAnswer');
const correctAnswer = getQuestionElement('correctAnswer');
const correct = getQuestionElement('correct');
const incorrect = getQuestionElement('incorrect');

const transition = getQuestionElement('transition');

const topGUI = document.getElementById('topGUI');
const score = document.getElementById('score');

function addClassToElements(className, ...elements) {
    elements.forEach(element => element.classList.add(className));
}

function removeClassFromElements(className, ...elements) {
    elements.forEach(element => element.classList.remove(className));
}

function getQuestionElement(elementClass) {
    return questionStage.getElementsByClassName(elementClass)[0];
}

export function onLoad(firstTime) {
    transition.classList.add('transLoadPage');

    let questionAndAnswers = gameLogic.currentQuestion();
    console.log(question);
    question.innerHTML = questionAndAnswers[0];
    ansA.innerHTML = questionAndAnswers[1];
    ansB.innerHTML = questionAndAnswers[2];
    ansC.innerHTML = questionAndAnswers[3];
    ansD.innerHTML = questionAndAnswers[4];
    setTimeout(() => {
        correctAnswer.innerHTML = gameLogic.getAnswer(true);
        gameLogic.setClicksEnabled(true);
    }, 300);

    score.classList.remove("pageHide");
}

function nextPage() {
    renderer.generateRandomDots(400)
    setTimeout(() => gameLogic.updateGame("questionStage"), 2200);
}

function resetPage() {
    removeClassFromElements('hidePrompt', ansA, ansB, ansC, ansD, question);
    removeClassFromElements('transLoadPage', transition);
    removeClassFromElements('selected', ansA, ansB, ansC, ansD);
    correct.style.animation = 'correctRevealSlideOut 1s forwards'; 
    incorrect.style.animation = 'correctRevealSlideOut 1s forwards'; 
    showAnswer.style.animation = 'showAnswerSlideOut 1s forwards'; 
    setTimeout(() => {
        addClassToElements('hidden', showAnswer, correct, incorrect);
        correct.style.animation = ''; 
        incorrect.style.animation = ''; 
        showAnswer.style.animation = ''; 
    }, 700);
}

function guessAnswer(guess) {
    showAnswer.classList.remove('hidden');
    if (guess.innerHTML === correctAnswer.innerHTML) {
        correct.classList.remove('hidden');
        gameLogic.addPoints(1);
    } else {
        incorrect.classList.remove('hidden');
    }
    gameLogic.consoleLogGameInfo();

    setTimeout(() => {
        resetPage();
        gameLogic.nextQuestion();
        gameLogic.updateGame('questionStage');
    }, 2300);
}

ansA.onclick = () => {
    if (gameLogic.getClicksEnabled()) {
        addClassToElements('hidePrompt', ansB, ansC, ansD, question);
        ansA.classList.add('selected');
        setTimeout(() => guessAnswer(ansA), 200);
        gameLogic.setClicksEnabled(false);
    }
};
ansB.onclick = () => {
    if (gameLogic.getClicksEnabled()) {
        addClassToElements('hidePrompt', ansA, ansC, ansD, question);
        ansB.classList.add('selected');
        setTimeout(() => guessAnswer(ansB), 200);
        gameLogic.setClicksEnabled(false);
    }
};
ansC.onclick = () => {
    if (gameLogic.getClicksEnabled()) {
        addClassToElements('hidePrompt', ansA, ansB, ansD, question);
        ansC.classList.add('selected');
        setTimeout(() => guessAnswer(ansC), 200);
        gameLogic.setClicksEnabled(false);
    }
};
ansD.onclick = () => {
    if (gameLogic.getClicksEnabled()) {
        addClassToElements('hidePrompt', ansA, ansB, ansC, question);
        ansD.classList.add('selected');
        setTimeout(() => guessAnswer(ansD), 200);
        gameLogic.setClicksEnabled(false);
    }
};