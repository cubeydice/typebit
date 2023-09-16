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
  }

  restart() {
    this.running = false;
    this.score = 0;
    this.player = new Player(this.dimensions);
  }

  gameOver() {
    //game over if player runs out of health
  }
}