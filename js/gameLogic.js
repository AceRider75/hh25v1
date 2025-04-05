/* gameLogic.js */
/*
  Game logic is handled here, including:
  - Grid-based movement using WASD keys
  - Directional facing updates and sprite handling
  - Collision detection (water causes instant death)
  - Combat system triggers and basic NPC AI
  - Special mechanics: jumping, blocking, dodging, stamina, combo system, and ship travel
*/

// Global variables for canvas and context
let canvas, ctx;
const cellSize = 50;  // Each tile is 50x50 pixels
let boardWidth = 16;
let boardHeight = 12;

// The game board is a 2D array of tile types:
// 0 = water, 1 = land, 2 = bridge/island, 3 = ship tile
let gameBoard = [];

// Initialize a basic board with water borders and inner land tiles
function initBoard() {
  for (let y = 0; y < boardHeight; y++) {
    const row = [];
    for (let x = 0; x < boardWidth; x++) {
      // Set borders as water for demonstration; inner cells as land
      if (x === 0 || y === 0 || x === boardWidth - 1 || y === boardHeight - 1) {
        row.push(0);  // water
      } else {
        row.push(1);  // land
      }
    }
    gameBoard.push(row);
  }
  // Designate a special ship tile (for travel between areas)
  gameBoard[2][2] = 3;
}

// Player object with starting position and attributes
let player = {
  x: 1, // starting grid X coordinate (land)
  y: 1, // starting grid Y coordinate (land)
  facing: 'right', // initial facing direction
  stamina: 100,
  health: 100,
  inCombat: false,
  comboCooldown: false,
};

// Initialize the game environment
function initGame(canvasElement, context) {
  canvas = canvasElement;
  ctx = context;
  
  // Setup game board
  initBoard();
  drawGame();
  setupControls();
  
  console.log("Game Initialized.");
}

// Draw the game board and the player
function drawGame() {
  // Clear entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw grid and tiles
  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      const tileType = gameBoard[y][x];
      if (tileType === 0) ctx.fillStyle = "#4D90FE";  // Blue for water
      else if (tileType === 1) ctx.fillStyle = "#7CFC00"; // Green for land
      else if (tileType === 2) ctx.fillStyle = "#FFD700"; // Gold for a bridge/island
      else if (tileType === 3) ctx.fillStyle = "#8B4513"; // Brown for a ship
      
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      
      // Optionally, draw a grid outline for clarity
      ctx.strokeStyle = "#000";
      ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
  
  // Draw the player (as a simple colored square placeholder)
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
}

// Setup keyboard controls for movement and actions
function setupControls() {
  document.addEventListener('keydown', function(event) {
    const key = event.key.toLowerCase();
    
    // Only process input if it's the player's turn
    if (gameState.turn === 'player') {
      switch(key) {
        case 'w': movePlayer(0, -1); break; // Up
        case 'a': movePlayer(-1, 0); break; // Left
        case 's': movePlayer(0, 1); break;  // Down
        case 'd': movePlayer(1, 0); break;  // Right
        case ' ': jumpAction(); break;      // Jump (Spacebar)
        case 'shift': blockAction(); break;  // Block (Shift key)
        case 'b': dashAction(); break;       // Dodge/Dash (B key)
        case 'z': attackAction('light'); break;   // Light attack (Z key)
        case 'x': attackAction('medium'); break;  // Medium attack (X key)
        case 'y': attackAction('heavy'); break;   // Heavy attack (Y key)
        case 'v': attackAction('special'); break; // Special attack (V key)
        default: break;
      }
    }
  });
}

// Moves the player on the grid and implements water-death and ship travel logic
function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;
  
  // Ensure new position is within board boundaries
  if (newX >= 0 && newX < boardWidth && newY >= 0 && newY < boardHeight) {
    
    // If the new tile is water, the player dies immediately
    if (gameBoard[newY][newX] === 0) {
      console.log("Player fell into water and died!");
      player.health = 0;
      // Optionally, reset game state or show Game Over screen
      return;
    }
    
    // Update player's position and facing based on movement
    player.x = newX;
    player.y = newY;
    if (dx > 0) player.facing = 'right';
    else if (dx < 0) player.facing = 'left';
    else if (dy > 0) player.facing = 'down';
    else if (dy < 0) player.facing = 'up';
    
    // Check if the player is on a ship tile (for traveling to another area)
    if (gameBoard[newY][newX] === 3) {
      boardTransition();
      return;
    }
    
    drawGame();
  }
}

// Placeholder function for jump action
function jumpAction() {
  console.log("Jump action initiated.");
  // Here you would implement jump animation and collision logic
}

// Blocking action with a 50% chance to succeed
function blockAction() {
  if (Math.random() > 0.5) {
    console.log("Block successful!");
  } else {
    console.log("Block failed!");
  }
}

// Dodge/dash action via the B key
function dashAction() {
  console.log("Dash/Dodge activated.");
  // Increase movement speed briefly or grant temporary invulnerability
}

// Attack action handling for various attack types
function attackAction(attackType) {
  console.log(`${attackType} attack initiated facing ${player.facing}`);
  // Here, you would run the appropriate sprite animation and collision detection
  // Also handle stamina consumption and combo cooldown logic
}

// Transition to a new area when using the ship tile
function boardTransition() {
  console.log("Transitioning to a new area via the ship.");
  // For demonstration, reset the board for a new area
  gameState.currentArea = 'newArea';
  gameBoard = [];
  boardWidth = 16;
  boardHeight = 12;
  initBoard();
  // Reset player position in new area (example: back to (1,1))
  player.x = 1;
  player.y = 1;
  drawGame();
}

// Stamina regeneration example (updates every second)
setInterval(() => {
  if (player.stamina < 100) {
    player.stamina += 1;
    // Update a visual stamina bar if implemented
  }
}, 1000);
