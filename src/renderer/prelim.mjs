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


function addClassToElements(className, ...elements) {
    elements.forEach(element => element.classList.add(className));
}

function removeClassFromElements(className, ...elements) {
    elements.forEach(element => element.classList.remove(className));
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
            addClassToElements('hidden', showAnswer, correct, incorrect);
            gameLogic.nextQuestion();
            //gameLogic.updateGame('prelimStage');
            correct.style.animation = ''; 
            incorrect.style.animation = ''; 
            showAnswer.style.animation = ''; 
        }, 600);
        //correct.style.animation = 'correctRevealSlideOut 1s ';
        //incorrect.style.animation = 'correctRevealSlideOut 1s ';
        //showAnswer.style.animation = 'showAnswerSlideOut 1s ';

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