import Player from "./player";
import Enemy from "./enemy";
import Background from "./background";
export default class TypeBit {
  static NUM_ENEMIES = 10;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = {
      width: canvas.width,
      height: canvas.height
    };
    this.enemies = [];
    this.addEnemies();
  }

  play() {
    this.running = true
    this.bg = new Background(this.ctx);
    this.player = new Player(this.dimensions)
    this.enemy = new Enemy(this.dimensions)
    this.animate()
  }

  restart() {
    //need to add restart functionality to restart button
    this.running = false;
    this.score = 0;
    this.bg = new Background(this.ctx);
    this.player = new Player(this.dimensions);
  }

  gameOver() {
    //game over if player runs out of health
  }

  animate() {
    this.bg.animate(this.ctx, this.dimensions)
    this.player.animate(this.ctx)
    this.enemies.forEach(enemy => {
      enemy.animate(this.ctx)
      if (enemy.pos_x < 0) {
        this.enemies.splice(enemies.indexOf(enemy), 1)
      }
      console.log("Animating enemies...")
    })
  }

  addEnemies() {
    for (let i = 0; i < TypeBit.NUM_ENEMIES; i++){
        console.log("Adding enemies...")
        let speed = Math.random()
        let pos = Math.random()
        this.enemies.push(new Enemy(this.dimensions, speed, pos));
    }
    console.log(this.enemies)
  }
}