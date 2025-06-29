// Get the game canvas and player element
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const player = document.querySelector('.player');

// Set up the game state variables
let score = 0;
let enemies = [];
let playerX = 300;
let playerY = 200;

// Draw the game background and player
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the player character
    ctx.beginPath();
    ctx.arc(playerX, playerY, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Update and draw the enemies
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'gray';
        ctx.fill();

        // Check if the player has collided with an enemy
        if (distance(playerX, playerY, enemy.x, enemy.y) < 30) {
            score++;
            enemies.splice(i, 1); // Remove the defeated enemy from the array
        }
    }

    // Update and display the score
    document.getElementById('score-display').textContent = `Score: ${score}`;
}

// Handle user input (player movement)
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            playerX -= 10;
            break;
        case 'ArrowRight':
            playerX += 10;
            break;
        case 'ArrowUp':
            playerY -= 10;
            break;
        case 'ArrowDown':
            playerY += 10;
            break;
    }
});

// Update and draw the game state every frame
setInterval(draw, 1000 / 60);

// Initialize the enemies array with some random positions
for (let i = 0; i < 5; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    enemies.push({ x, y });
}
