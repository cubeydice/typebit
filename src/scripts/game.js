import Player from "./player";
import Enemy from "./enemy";
import Background from "./background";

const title = document.getElementById("title");
const start = document.getElementById("start");
const tutorial = document.querySelector(".tutorial")
const audio = document.getElementById("bg-music");
const introBGMusic = 'assets/music/bg/memory.mp3';
const fastBGMusic = 'assets/music/bg/mountainoftrials.mp3';
const gameOverBGMusic = 'assets/music/bg/churchofsaints.mp3';
const enemyDestroyAudio = new Audio('assets/music/effects/destroy2.wav');
const gameOverAudio = new Audio('assets/music/effects/game_over.mp3');
enemyDestroyAudio.volume = 0.2;
gameOverAudio.volume = 0.3;

export default class TypeBit {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = {
      width: canvas.width,
      height: canvas.height
    };
    this.num_enemies = 1;
    this.max_enemies = 3;
    this.enemies = [];
    this.score = 0;
    this.typed = "";
    this.bg = new Background(this.ctx);
    this.player = new Player(this.dimensions)
    this.enemy = new Enemy(this.dimensions)
    this.diffultyChange = false;
  }

  run() {
    this.running = false;
    this.animate();
  }

  play() {
    this.running = true;
    this.typed = "";
    this.enemyInterval = setInterval(this.addEnemies.bind(this), 1000)
    title.innerHTML = ""
    start.innerHTML = ""
  }

  restart() {
    this.running = false;
    this.score = 0;
    this.player.health = 50;
    this.enemies = [];
    this.typed = "";
    this.bg.changeSpeed(1);
    audio.src = introBGMusic;
    this.diffultyChange = false;
    title.innerHTML = "typebit"
    start.innerHTML = "press any key to start"
    clearInterval(this.enemyInterval);
    this.player.walk();
  }

  gameOver() {
    return this.player.outOfHealth()
  }

  changeDifficulty() {
    if (this.score > 50 && this.score <= 100) {
      this.max_enemies = 5;
      this.num_enemies = 3;
    } else if (this.score > 100 && this.score <= 200) {
      this.max_enemies = 8;
      this.num_enemies = 4;
      this.player.run();
      this.bg.changeSpeed(1.5);
      if (!this.diffultyChange) {
        audio.src = fastBGMusic
        this.diffultyChange = true;
      }
    } else if (this.score > 200) {
      this.bg.changeSpeed(2);
      this.max_enemies = 10;
      this.num_enemies = 4;
    }
  }

  animate() {
    /*Animate background and player*/
    this.ctx.clearRect.bind(this, 0, 0, this.dimensions.width, this.dimensions.height);
    this.bg.draw(this.ctx);
    this.player.draw(this.ctx);

    /* Game Over Sequence */
    if (this.gameOver() && this.running){
      audio.src = gameOverBGMusic;
      if (!audio.muted) {
        gameOverAudio.play();
      }
      this.player.dead();
      this.bg.changeSpeed(0);
      title.innerHTML = "GAME OVER";
      start.innerHTML = `final score: ${this.score}`;
      clearInterval(this.enemyInterval);
      this.running = false;
    }

    /*Increase difficulty*/
    this.changeDifficulty();

    /*Animate enemies and status if game started*/
    if (this.running) {
      this.enemies.forEach(enemy => {
        //Destroy enemy is correct words typed
        if (this.typed === (enemy.words + " ")) {
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
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
        }

        //Enemy collision with player when not already destroyed
        if (this.player.collidesWith(this.player.bounds(), enemy.bounds())
        && enemy.destroyed === false) {
          this.player.hurt();
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
        }
      })

      //Game data info
      this.status(this.ctx);
    }

    this.animReq = requestAnimationFrame(this.animate.bind(this))
  }

  tutorialStuff() {
    const tutorial1 = tutorial.appendChild(document.createElement("li"))
    tutorial1.innerHTML = `dangerous slimes appeared on your way home 😳 <br>
    they seem weak to you repeating what they say, though...`
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
  }
}