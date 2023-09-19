import Player from "./player";
import Enemy from "./enemy";
import Background from "./background";
export default class TypeBit {
  static NUM_ENEMIES = 2;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = {
      width: canvas.width,
      height: canvas.height
    };
    this.wordsPerMin = 0;
    this.bg = new Background(this.ctx);
    this.player = new Player(this.dimensions)
    this.enemy = new Enemy(this.dimensions)
    this.enemies = [];
    this.score = 0;
    this.typed = "";
  }

  run() {
    this.animate();

  }

  play() {
    this.running = true;
    this.animate();
    setInterval(this.addEnemies.bind(this), 3000)
  }

  restart() {
    this.running = false
    //need to add restart functionality to restart button
    this.score = 0;
    this.player.health = 100;
    this.enemies = [];
    this.play();
  }

  // type(e) {
    //   if(!this.running) {
      //     this.play();
      //   }
      // }

  gameOver() {
    this.player.outOfHealth()
  }

  animate() {
    this.ctx.clearRect.bind(this, 0, 0, this.dimensions.width, this.dimensions.height);
    this.bg.draw(this.ctx)
    this.player.draw(this.ctx, this.wordsPerMin)
    if (this.running) {
      this.enemies.forEach(enemy => {
        if (this.typed !== this.enemy.words) {
          enemy.draw(this.ctx)
        }
        //removes enemy if leave the screen
        //need to change to right bound
        if (enemy.pos_x < 0) {
          console.log(this.enemies)
          this.enemies.splice(this.enemies.indexOf(enemy), 1)
        }
      })
      this.status(this.ctx)
    }

    if (this.gameOver()) {
      console.log("Game Over")
    }

    requestAnimationFrame(this.animate.bind(this))
  }

  status(ctx) {
    ctx.font = "40px VT323";
    ctx.strokeText(`score: ${this.score}`, 960, 70)
    ctx.strokeText(`health: ${this.player.health}`, 40, 70)
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