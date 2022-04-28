let game = null;

document.getElementById("start-button").onclick = () => {
  startGame();
};

function startGame() {
  if (!game || !game.isRunning) {
    game = new Game();
    game.start();
  }
}
