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


function changeClassToElements(change, className, ...elements) {
    if (change === "add") {
        elements.forEach(element => element.classList.add(className));
    } else if (change === "remove") {
        elements.forEach(element => element.classList.remove(className));
    } else {
        console.log("Error: Please use a correct change statement.")
    }
}

function getPrelimElement(elementClass) {
    return prelimStage.getElementsByClassName(elementClass)[0];
}

export function onLoad() {
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
    renderer.generateRandomDots(400)
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
    changeClassToElements("add", 'hidePrompt', ansB, ansC, ansD, question);
    ansA.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 1 Team Selection";
    setTimeout(() => guessAnswer(ansA), 500);
};
ansB.onclick = () => {
    changeClassToElements("add", 'hidePrompt', ansA, ansC, ansD, question);
    ansB.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 2 Team Selection";
    setTimeout(() => guessAnswer(ansB), 500);
};
ansC.onclick = () => {
    changeClassToElements("add", 'hidePrompt', ansA, ansB, ansD, question);
    ansC.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 3 Team Selection";
    setTimeout(() => guessAnswer(ansC), 500);
};
ansD.onclick = () => {
    changeClassToElements("add", 'hidePrompt', ansA, ansB, ansC, question);
    ansD.classList.add('selected');
    confirmMesg.innerHTML = "Confirm 4 Team Selection";
    setTimeout(() => guessAnswer(ansD), 500);
};