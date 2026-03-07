const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlaySubtitle = document.getElementById('overlay-subtitle');

// Game constants
const GRID_SIZE = 20;

// Initialize canvas resolution
function resizeCanvas() {
    canvas.width = 400; // Internal resolution
    canvas.height = 400;
}
resizeCanvas();

const TILE_COUNT = canvas.width / GRID_SIZE;
let GAME_SPEED = 120; // ms per frame

// Colors
const COLOR_MIGHTY_SNAKE_HEAD = '#FBF5DD';
const COLOR_SNAKE_BODY = '#DDA853';
const COLOR_FOOD = '#A6CDC6';

// Game state
let snake = [];
let food = { x: 0, y: 0 };
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameState = 'START'; // START, PLAYING, GAME_OVER
let lastRenderTime = 0;
let animationFrameId;
let pendingDirection = null;

highScoreElement.textContent = highScore;

// Initialize game
function initGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 10, y: 11 },
        { x: 10, y: 12 }
    ];
    dx = 0;
    dy = -1;
    score = 0;
    GAME_SPEED = 120; // reset speed
    scoreElement.textContent = score;
    pendingDirection = null;
    placeFood();
}

// Generate random food position
function placeFood() {
    let newFoodPosition;
    let isOccupied = true;
    while (isOccupied) {
        newFoodPosition = {
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT)
        };
        isOccupied = snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y);
    }
    food = newFoodPosition;
}

// Main game loop
function main(currentTime) {
    if (gameState !== 'PLAYING') return;

    animationFrameId = window.requestAnimationFrame(main);

    const timeSinceLastRender = (currentTime - lastRenderTime);
    if (timeSinceLastRender < GAME_SPEED) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

// Update game state
function update() {
    // Process pending direction input
    if (pendingDirection) {
        dx = pendingDirection.dx;
        dy = pendingDirection.dy;
        pendingDirection = null;
    }

    // Calculate new head position
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check collision with walls
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        gameOver();
        return;
    }

    // Check collision with self
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    // Check if food eaten
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }

        // Increase speed slightly
        if (GAME_SPEED > 60) {
            GAME_SPEED -= 2;
        }

        placeFood();
    } else {
        snake.pop(); // Remove tail if no food eaten
    }
}

// Draw game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food with glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = COLOR_FOOD;
    ctx.fillStyle = COLOR_FOOD;

    ctx.beginPath();
    ctx.arc((food.x * GRID_SIZE) + GRID_SIZE / 2, (food.y * GRID_SIZE) + GRID_SIZE / 2, GRID_SIZE / 2 - 2, 0, 2 * Math.PI);
    ctx.fill();

    // Draw snake
    snake.forEach((segment, index) => {
        const isHead = index === 0;

        ctx.shadowBlur = isHead ? 15 : 5;
        ctx.shadowColor = isHead ? COLOR_MIGHTY_SNAKE_HEAD : COLOR_SNAKE_BODY;
        ctx.fillStyle = isHead ? COLOR_MIGHTY_SNAKE_HEAD : COLOR_SNAKE_BODY;

        const x = segment.x * GRID_SIZE + 1;
        const y = segment.y * GRID_SIZE + 1;
        const size = GRID_SIZE - 2;
        const radius = 4;

        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(x, y, size, size, radius);
        } else {
            ctx.rect(x, y, size, size);
        }
        ctx.fill();

        // Draw eyes on head
        if (isHead) {
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#fff';
            let leftEye = { x: 0, y: 0 };
            let rightEye = { x: 0, y: 0 };

            const offset = 4;
            const eyeSize = 3;

            if (dx === 1) { // Right
                leftEye = { x: x + size - offset, y: y + offset };
                rightEye = { x: x + size - offset, y: y + size - offset - eyeSize };
            } else if (dx === -1) { // Left
                leftEye = { x: x + offset, y: y + offset };
                rightEye = { x: x + offset, y: y + size - offset - eyeSize };
            } else if (dy === -1) { // Up
                leftEye = { x: x + offset, y: y + offset };
                rightEye = { x: x + size - offset - eyeSize, y: y + offset };
            } else { // Down
                leftEye = { x: x + offset, y: y + size - offset - eyeSize };
                rightEye = { x: x + size - offset - eyeSize, y: y + size - offset - eyeSize };
            }

            ctx.fillRect(leftEye.x, leftEye.y, eyeSize, eyeSize);
            ctx.fillRect(rightEye.x, rightEye.y, eyeSize, eyeSize);
        }
    });

    // Reset shadow
    ctx.shadowBlur = 0;
}

function startGame() {
    if (gameState === 'PLAYING') return;
    gameState = 'PLAYING';
    overlay.classList.remove('active');
    initGame();
    lastRenderTime = performance.now();
    window.requestAnimationFrame(main);
}

function gameOver() {
    gameState = 'GAME_OVER';
    cancelAnimationFrame(animationFrameId);

    overlayTitle.textContent = 'GAME OVER';
    overlaySubtitle.textContent = `Score: ${score}`;
    overlay.classList.add('active');

    // Visual effect
    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Input handling
window.addEventListener('keydown', e => {
    // Prevent scrolling
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
    }

    if (e.code === 'Space') {
        if (gameState !== 'PLAYING') {
            startGame();
        }
        return;
    }

    if (gameState !== 'PLAYING') return;

    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    // Use pendingDirection to prevent instantaneous reversal within the same frame
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (!goingDown && dy === 0) pendingDirection = { dx: 0, dy: -1 };
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (!goingUp && dy === 0) pendingDirection = { dx: 0, dy: 1 };
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (!goingRight && dx === 0) pendingDirection = { dx: -1, dy: 0 };
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (!goingLeft && dx === 0) pendingDirection = { dx: 1, dy: 0 };
            break;
    }
});

// Mobile D-pad Input
const bindBtn = (id, checkProp, valObj) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    const handler = (e) => {
        e.preventDefault();
        if (gameState !== 'PLAYING') startGame();
        if ((checkProp === 'dy' && dy === 0) || (checkProp === 'dx' && dx === 0)) {
            pendingDirection = valObj;
        }
    };
    btn.addEventListener('touchstart', handler);
    btn.addEventListener('mousedown', handler);
};

bindBtn('btn-up', 'dy', { dx: 0, dy: -1 });
bindBtn('btn-down', 'dy', { dx: 0, dy: 1 });
bindBtn('btn-left', 'dx', { dx: -1, dy: 0 });
bindBtn('btn-right', 'dx', { dx: 1, dy: 0 });

// Overlay tap-to-start
overlay.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (gameState !== 'PLAYING') {
        startGame();
    }
});
overlay.addEventListener('mousedown', (e) => {
    if (gameState !== 'PLAYING') {
        startGame();
    }
});

// Initial draw logic
initGame();
draw();
