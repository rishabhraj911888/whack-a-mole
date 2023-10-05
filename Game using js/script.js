let scoreH2 = document.getElementById('scorecard');
let timeLeftH2 = document.getElementById('timeremaining');
let startNewGameButton = document.getElementById('star');
let pauseGameButton = document.getElementById('pause');
let grid = document.getElementsByClassName('grid')[0];
let squares = document.querySelectorAll('.squarebox');
let gameMusic = new Audio('photo/gameMusic.mp3');
let hitMusic = new Audio('photo/hitMusic.mp3');

let scorecard = 0;
let timeremaining = 60;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;
// randomly place mole
function randomMole(){
    squares.forEach(square => {
        square.classList.remove('mole');
    })

    let randomSquare = squares[Math.floor(Math.random()*squares.length)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
}
function countDown(){
    timeLeft--;
    timeLeftH2.innerHTML = `Time Left: ${timeLeft}`;

    if(timeLeft === 0){
        clearInterval(timerId);
        clearInterval(randomMoleId);
        grid.style.display = 'none';
    }
}
randomMole();
function startGame(){
    score = 0;
    timeLeft = 60;
    scoreH2.innerHTML = 'Your Score - 0';
    timeLeft.innerHTML = 'Remaining Time - 60sec';
    grid.style.display = 'flex';
    pauseGameButton.style.display = 'inline-block'
    pauseGameButton.innerHTML = 'Pause';
    gameMusic.play();
    // callback function
    // setInterval call function at regular interval
    timerId = setInterval(randomMole, 1000);
    randomMoleId = setInterval(countDown, 1000);
}
function pauseResumeGame(){
    if(pauseGameButton.textContent === 'Pause'){
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId = null;
        randomMoleId = null;
        pauseGameButton.textContent = 'Resume';
    }else{
        gameMusic.play();
        timerId = setInterval(randomMole, 1000);
        randomMoleId = setInterval(countDown, 1000);
        pauseGameButton.textContent = 'Pause';
    }
}
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(timerId !== null){
            if(square.id === hitPosition){
                hitMusic.play();
                setTimeout(() => {hitMusic.pause()}, 1000);
                score++;
                scoreH2.innerHTML = `Your Score ${score}`;
                hitPosition = null;
            }
        }
    })
})
startNewGameButton.addEventListener('click', startGame);
pauseGameButton.addEventListener('click', pauseResumeGame);

