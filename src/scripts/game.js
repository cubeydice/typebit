import Player from "./player";
import Enemy from "./enemy";
import Background from "./background";

const title = document.getElementById("title");
const start = document.getElementById("start");
const audio = document.getElementById("bg-music");
const gameOverBGMusic = 'assets/bg/churchofsaints.mp3';
const enemyDestroyAudio = new Audio('assets/music/effects/destroy2.wav');
const gameOverAudio = new Audio('assets/music/effects/game_over.mp3');
enemyDestroyAudio.volume = 0.5;
gameOverAudio.volume = 0.5;

export default class TypeBit {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = {
      width: canvas.width,
      height: canvas.height
    };
    this.wordsPerMin = 0;
    this.num_enemies = 1;
    this.max_enemies = 4;
    this.enemies = [];
    this.score = 0;
    this.typed = "";
    this.bg = new Background(this.ctx);
    this.player = new Player(this.dimensions)
    this.enemy = new Enemy(this.dimensions)
  }

  run() {
    this.running = false;
    this.animate();
  }

  play() {
    this.running = true;
    this.typed = "";
    this.enemyInterval = setInterval(this.addEnemies.bind(this), 2000)
    title.innerHTML = ""
    start.innerHTML = ""
  }

  restart() {
    this.running = false;
    this.score = 0;
    this.player.health = 100;
    this.enemies = [];
    this.typed = "";
    clearInterval(this.enemyInterval)
    title.innerHTML = "typebit"
    start.innerHTML = "press any key to start"
    this.player.walk();
  }

  gameOver() {
    this.player.outOfHealth()
  }

  animate() {
    /*Animate background and player*/
    this.ctx.clearRect.bind(this, 0, 0, this.dimensions.width, this.dimensions.height);
    this.bg.draw(this.ctx)
    this.player.draw(this.ctx, this.wordsPerMin)

    /*Increase difficulty*/
    if (this.score > 100 && this.score <= 250) {
      this.max_enemies = 6;
      this.num_enemies = 2;
    } else if (this.score > 250 && this.score <= 400) {
      this.max_enemies = 8;
      this.num_enemies = 3;
    } else if (this.score > 400) {
      this.max_enemies = 10;
      this.num_enemies = 4;
    }

    /*Animate enemies and status if game started*/
    if (this.running) {
      this.enemies.forEach(enemy => {
        if (this.typed === enemy.words) {
          if (!audio.muted) {
            enemyDestroyAudio.play()
          }
          enemy.destroy();
          this.score += enemy.score;
          this.typed = "";
        }

        enemy.draw(this.ctx)

        //Remove enemy if out of bounds
        if (enemy.bounds().right < 0) {
          console.log(this.enemies)
          this.enemies.splice(this.enemies.indexOf(enemy), 1)
        }

        //Enemy collision with player when not already destroyed
        if (this.player.collidesWith(this.player.bounds(), enemy.bounds())
        && enemy.destroyed === false) {
          console.log("Ow!")
          this.player.hurt();
          this.enemies.splice(this.enemies.indexOf(enemy), 1)
        }
      })
      this.status(this.ctx)
    }

    /* Game Over Sequence */
    if (this.gameOver()) {
      console.log("Game Over")
      if (!audio.muted) {
        gameOverAudio.play()
      }
      audio.src = gameOverBGMusic
      this.running = false;
    }

    requestAnimationFrame(this.animate.bind(this))
  }

  status(ctx) {
    ctx.font = "40px VT323";
    ctx.fillText(`score: ${this.score}`, 960, 70)
    ctx.fillText(`health: ${this.player.health}`, 40, 70)
    ctx.font = "64px VT323";
    ctx.fillText(this.typed, 200, 280)
  }


  addEnemies() {
    for (let i = 0; i < this.num_enemies; i++){
      if (this.enemies.length < this.max_enemies) {
        console.log("Adding enemies...")
        let speed = Math.random()
        let pos = Math.random()
        this.enemies.push(new Enemy(this.dimensions, speed, pos));
      }
    }
    console.log(this.enemies)
  }
}