import * as gameLogic from "./game.mjs";
import * as renderer from "./renderer.mjs";

//import elements
const questionStage = document.getElementById("questionStage");
const question = getQuestionElement('question');
const ansA = getQuestionElement('ansA');
const ansB = getQuestionElement('ansB');
const ansC = getQuestionElement('ansC');
const ansD = getQuestionElement('ansD');

const correctSound = new Audio('../static/assets/sound/correct.mp3');
const incorrectSound = new Audio('../static/assets/sound/incorrect.mp3');
correctSound.volume = 0.8;
incorrectSound.volume = 0.1;

const showAnswer = getQuestionElement('showAnswer');
const correctAnswer = getQuestionElement('correctAnswer');
const correct = getQuestionElement('correct');
const incorrect = getQuestionElement('incorrect');

const transition = getQuestionElement('transition');
3
const topGUI = document.getElementById('topGUI');
const score = document.getElementById('score');
const timer = document.getElementById("time");

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
    if (firstTime) {
        transition.classList.add('transLoadPage');
        gameLogic.startTimer();
    }
    let questionAndAnswers = gameLogic.currentQuestion();
    console.log(question);
    question.innerHTML = questionAndAnswers[0];
    ansA.innerHTML = questionAndAnswers[1];
    ansB.innerHTML = questionAndAnswers[2];
    ansC.innerHTML = questionAndAnswers[3];
    ansD.innerHTML = questionAndAnswers[4];
    gameLogic.updateTeamDisplay();
    setTimeout(() => {
        correctAnswer.innerHTML = gameLogic.getAnswer(true);
        gameLogic.setClicksEnabled(true);
        gameLogic.resumeTimer();
    }, 400);
    setTimeout(() => transition.classList.remove('transLoadPage'), 1200);
    topGUI.classList.remove("pageHide");
}

export function nextPage() {
    renderer.generateRandomDots(400);
    topGUI.classList.add("pageHide");
    setTimeout(()=>transition.classList.add('transNextPage'),1200);
    setTimeout(() => gameLogic.updateGame("leaderboardStage"), 2200);
}

function resetPage() {
    removeClassFromElements('hidePrompt', ansA, ansB, ansC, ansD, question);
    removeClassFromElements('transLoadPage', transition);
    removeClassFromElements('selected', ansA, ansB, ansC, ansD);
    setTimeout(() => {
        addClassToElements('hidden', showAnswer, correct, incorrect);
        correct.style.animation = undefined; 
        incorrect.style.animation = undefined; 
        correctAnswer.style.animation = undefined; 
    }, 700);
}

function guessAnswer(guess) {
    showAnswer.classList.remove('hidden');
    if (guess.innerHTML === correctAnswer.innerHTML) {
        correctSound.play();
        correct.classList.remove('hidden');
        setTimeout(() => {
            gameLogic.addPoints();
        }, 1000)
    } else {
        incorrectSound.play();
        incorrect.classList.remove('hidden');
        setTimeout(() => {
            gameLogic.removePoints();
        }, 1000)
    }
    correct.style.animation = "correctRevealSlideIn .8s"; 
    incorrect.style.animation = "correctRevealSlideIn .8s"; 
    correctAnswer.style.animation = "showAnswerSlideIn .8s"; 
    gameLogic.consoleLogGameInfo();
    setTimeout(() => {
        correct.style.animation = undefined; 
        incorrect.style.animation = undefined; 
        correctAnswer.style.animation = undefined; 
    }, 1000);
    setTimeout(() => {
        correct.style.animation = "correctRevealSlideOut 1s"; 
        incorrect.style.animation = "correctRevealSlideOut 1s"; 
        correctAnswer.style.animation = "showAnswerSlideOut 1s"; 
        resetPage();
        gameLogic.nextQuestion();
        gameLogic.updateGame('questionStage');
    }, 2000);
}

export function incrementTimer(timeLeft) { 
    timer.innerHTML = timeLeft + " seconds";
}

ansA.onclick = () => {
    if (gameLogic.getClicksEnabled()) {
        addClassToElements('hidePrompt', ansB, ansC, ansD, question);
        ansA.classList.add('selected');
        setTimeout(() => guessAnswer(ansA), 200);
        gameLogic.pauseTimer();
        gameLogic.setClicksEnabled(false);
    }
};
ansB.onclick = () => {
    if (gameLogic.getClicksEnabled()) {
        addClassToElements('hidePrompt', ansA, ansC, ansD, question);
        ansB.classList.add('selected');
        setTimeout(() => guessAnswer(ansB), 200);
        gameLogic.pauseTimer();
        gameLogic.setClicksEnabled(false);
    }
};
ansC.onclick = () => {
    if (gameLogic.getClicksEnabled()) {
        addClassToElements('hidePrompt', ansA, ansB, ansD, question);
        ansC.classList.add('selected');
        setTimeout(() => guessAnswer(ansC), 200);
        gameLogic.pauseTimer();
        gameLogic.setClicksEnabled(false);
    }
};
ansD.onclick = () => {
    if (gameLogic.getClicksEnabled()) {
        addClassToElements('hidePrompt', ansA, ansB, ansC, question);
        ansD.classList.add('selected');
        setTimeout(() => guessAnswer(ansD), 200);
        gameLogic.pauseTimer();
        gameLogic.setClicksEnabled(false);
    }
};