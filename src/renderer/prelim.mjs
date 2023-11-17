import * as gameLogic from "./game.mjs";
import * as renderer from "./renderer.mjs";

//import elements
const question = document.getElementById('question');
const ansA = document.getElementById('ansA');
const ansB = document.getElementById('ansB');
const ansC = document.getElementById('ansC');
const ansD = document.getElementById('ansD');

const showAnswer = document.getElementById('showAnswer');
const correctAnswer = document.getElementById('correctAnswer');
const correct = document.getElementById('correct');
const incorrect = document.getElementById('incorrect');


function addClassToElements(className, ...elements) {
    elements.forEach(element => element.classList.add(className));
}

export function onLoad() {
    const transition = document.getElementById(gameLogic.getGameStage()).getElementsByClassName('transition')[0];
    transition.classList.add('transLoadPage');

    gameLogic.nextQuestion();
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

function guessAnswer(guess) {
    const transition = document.getElementById(gameLogic.getGameStage()).getElementsByClassName('transition')[0];
    //showAnswer.classList.add('confirmShow');
    showAnswer.classList.remove('hidden');
    if (guess.innerHTML === correctAnswer.innerHTML) {
        correct.classList.remove('hidden');
    } else {
        incorrect.classList.remove('hidden');
    }
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