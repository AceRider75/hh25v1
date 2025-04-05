/* wallet-connect.js */
/*
  Connects the user's blockchain wallet (e.g., MetaMask) to the game.
  This allows for saving game state, accessing character ownership, and more.
*/

function connectWallet() {
  if (window.ethereum) {
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        console.log("Wallet connected:", accounts[0]);
        // Save wallet address for use in blockchain functions
      })
      .catch((error) => {
        console.error("Wallet connection failed:", error);
      });
  } else {
    console.log("No Ethereum wallet found. Please install MetaMask.");
  }
}

// Optionally, attempt to connect immediately when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  connectWallet();
});
