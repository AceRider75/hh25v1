/* main.js */
/*
  This is the entry point for the game.
  It creates the game canvas, initializes game state and modules,
  and sets up event listeners for UI elements.
*/

document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('game-container');

  // Create the canvas element and set its dimensions
  const canvas = document.createElement('canvas');
  canvas.id = 'gameCanvas';
  canvas.width = 800;
  canvas.height = 600;
  gameContainer.appendChild(canvas);

  // Get the drawing context from the canvas
  const ctx = canvas.getContext('2d');
  
  // Global game state
  window.gameState = {
    currentArea: 'island', // starting area (could be 'island', 'ship', etc.)
    turn: 'player', // turn-based: can be 'player' or 'npc'
  };

  // Initialize the game logic with the canvas and context
  if (typeof initGame === 'function') {
    initGame(canvas, ctx);
  }

  // Initialize blockchain integration (placeholder)
  if (typeof initBlockchain === 'function') {
    initBlockchain();
  }

  // Set up event listeners for online save/load buttons
  document.getElementById('save-online').addEventListener('click', () => {
    if (typeof saveGameOnline === 'function') {
      saveGameOnline();
    }
  });
  document.getElementById('load-online').addEventListener('click', () => {
    if (typeof loadGameOnline === 'function') {
      loadGameOnline();
    }
  });
});
