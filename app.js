const buttons = document.querySelectorAll('.btn');
const colors = ['red', 'blue', 'green', 'yellow'];
let gameSequence = [];
let playerSequence = [];
let level = 0;

document.addEventListener('keydown', startGame);

buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => handleButtonClick(index));
});

function startGame() {
    document.removeEventListener('keydown', startGame);
    nextSequence();
}

function nextSequence() {
    playerSequence = [];
    level++;
    document.querySelector('h2').innerText = `Level ${level}`;
    const randomColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);
    playSequence();
}

function playSequence() {
    let delay = 0;
    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            animateButton(color);
        }, delay);
        delay += 600;
    });
}

function handleButtonClick(index) {
    const chosenColor = colors[index];
    playerSequence.push(chosenColor);
    animateButton(chosenColor);
    checkAnswer(playerSequence.length - 1);
}

function animateButton(color) {
    const button = document.getElementById(`btn-${colors.indexOf(color) + 1}`);
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 300);
}

function checkAnswer(currentLevel) {
    if (gameSequence[currentLevel] === playerSequence[currentLevel]) {
        if (playerSequence.length === gameSequence.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        document.querySelector('h2').innerText = `Game Over! Press any key to restart.`;
        resetGame();
    }
}

function resetGame() {
    level = 0;
    gameSequence = [];
    document.addEventListener('keydown', startGame);
}
