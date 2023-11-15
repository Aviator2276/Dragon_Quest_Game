let isLoaded = false;

export function onLoad() {
    const element = document.getElementById('wavyTextStart');
    setTimeout(() => element.classList.add('infinite'), 2300);
    isLoaded = true;
}

startGame.onclick = () => {
    if (isLoaded = true) {
        setTimeout(() => gameLogic.changeGameState("teamConfigStage"), 2200);
        isLoaded = false;
    }
}