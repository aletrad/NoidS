// window.onload = () => {
// };

document.getElementById("start-button").onclick = () => {
  setTimeout(() => {
    startGame();
  }, 3000);
};

//   // window.addEventListener("keydown", (e) => {
//   //   switch (e.code) {
//   //     case "Space":
//   //       startGame();
//   //   }

function startGame() {
  const game = new Game();
  game.start();
  // ctx.font = "20px 'Press Start 2P', cursive";
  // ctx.fillStyle = "black";
  // ctx.fillText(`Get ready!`, 35, 300);
}

// function drawStart() {
//   this.ctx.font = "20px 'Press Start 2P', cursive";
//   this.ctx.fillStyle = "black";
//   this.ctx.fillText(`Get ready!`, 35, 300);
// }
