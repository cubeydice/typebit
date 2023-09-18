import Player from "./player";
import Enemy from "./enemy";
import Background from "./background";
export default class TypeBit {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = {
      width: canvas.width,
      height: canvas.height
    };
  }

  play() {
    this.running = true
    this.animate()
  }

  restart() {
    this.running = false;
    this.score = 0;
    this.player = new Player(this.dimensions);
    this.bg = new Background(this.ctx, this.canvas)
  }

  gameOver() {
    //game over if player runs out of health
  }

  animate() {
    this.background.animate(this.ctx)
  }
}