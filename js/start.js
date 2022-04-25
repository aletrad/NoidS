window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  //   // window.addEventListener("keydown", (e) => {
  //   //   switch (e.code) {
  //   //     case "Space":
  //   //       startGame();
  //   //   }

  function startGame() {
    const game = new Game();
    game.start();
  }
};
