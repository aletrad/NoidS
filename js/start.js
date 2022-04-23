window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "Space":
      startGame();
  }

  function startGame() {
    const game = new Game();
    game.start();
  }
});
