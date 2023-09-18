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
    this.bg = new Background(this.ctx, this.dimensions);
    this.animate()
  }

  restart() {
    //need to add restart functionality to restart button
    this.running = false;
    this.score = 0;
    this.player = new Player(this.dimensions);
    this.bg = new Background();
  }

  gameOver() {
    //game over if player runs out of health
  }

  animate() {
    this.bg.animate(this.ctx, this.dimensions)
  }

  // registerEvents() {
  //   this.boundClickHandler = this.click.bind(this);
  //   this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
  // }
}