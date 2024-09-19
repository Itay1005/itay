const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// טען תמונות
const birdImg = new Image();
birdImg.src = 'images/bird.png'; // החלף את זה בתמונה שלך

const pipeImg = new Image();
pipeImg.src = 'images/pipe.png'; // החלף בתמונה של הצינור

const bird = {
    x: 50,
    y: 150,
    width: 40,
    height: 40,
    gravity: 1.5,
    lift: -25,
    velocity: 0
};

const pipes = [];
const pipeWidth = 50;
const pipeGap = 120;

let score = 0;
let gameOver = false;

function drawBird() {
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    pipes.forEach(pipe => {
        ctx.drawImage(pipeImg, pipe.x, pipe.y, pipeWidth, pipe.height);
        ctx.drawImage(pipeImg, pipe.x, pipe.y + pipe.height + pipeGap, pipeWidth, canvas.height - (pipe.y + pipe.height + pipeGap));
    });
}

function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        gameOver = true;
    }
}

function updatePipes() {
    pipes.forEach(pipe => {
        pipe.x -= 2;
        if (pipe.x + pipeWidth < 0) {
            pipes.shift();
            score++;
        }
    });

    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
        const pipeY = Math.floor(Math.random() * (canvas.height - pipeGap));
        pipes.push({ x: canvas.width, y: pipeY, height: pipeY });
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
        drawBird();
        drawPipes();
        updateBird();
        updatePipes();
        requestAnimationFrame(gameLoop);
    } else {
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', 100, 200);
        ctx.fillText('Score: ' + score, 110, 240);
    }
}

canvas.addEventListener('click', () => {
    bird.velocity = bird.lift;
});

gameLoop();