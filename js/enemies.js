class Enemies {
  constructor(game, x, y, width, height, color) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// class Enemies {
//     constructor(game, x, y, width, height, color) {
//       this.game = game;
//       this.x = x;
//       this.y = y;
//       this.width = width;
//       this.height = height;
//       this.color = color;
//     }

//     draw() {
//       this.game.ctx.fillStyle = this.color;
//       this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
//   }

//   class Enemy1 extends Enemies {
//     constructor(game, x, y, width, height, color) {
//       super(game, x, y, width, height, color);
//     }

//     draw() {
//       this.game.ctx.fillStyle = this.color;
//       this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
//   }
