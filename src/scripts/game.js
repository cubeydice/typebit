import Player from "./player";
import Enemy from "./enemy";
import Background from "./background";

const title = document.getElementById("title");
const start = document.getElementById("start");
const audio = document.getElementById("bg-music");
const introBGMusic = './assets/music/bg/memory.mp3';
const fastBGMusic = './assets/music/bg/mountainoftrials.mp3';
const gameOverBGMusic = './assets/music/bg/churchofsaints.mp3';
const enemyDestroyAudio = new Audio('./assets/music/effects/destroy2.wav');
const gameOverAudio = new Audio('./assets/music/effects/game_over.mp3');
const hearts = new Image();
hearts.src = 'assets/game/UI/hearts.png'
enemyDestroyAudio.volume = 0.1;
gameOverAudio.volume = 0.3;

const HEARTS = {
  HEART_SIZE: 32,
  HEART_1_X: 0,
  HEART_2_X: 0,
  HEART_3_X: 0,
  HEART_4_X: 0,
  HEART_5_X: 0,
  HEARTS_Y: 0,
  HEARTS_POS_X: 40,
  HEARTS_POS_Y: 27,
  HEART_CANVAS_SIZE: 64
}

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
    this.typed = "";
    this.score = 0;
    this.player.health = 50;
    this.enemies = [];
    this.max_enemies = 3;
    this.num_enemies = 1;
    HEARTS.HEART_1_X = 0;
    HEARTS.HEART_2_X = 0;
    HEARTS.HEART_3_X = 0;
    HEARTS.HEART_4_X = 0;
    HEARTS.HEART_5_X = 0;
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
      this.max_enemies = 4;
      this.num_enemies = 2;
    } else if (this.score > 100 && this.score <= 200) {
      this.max_enemies = 6;
      this.num_enemies = 3;
      this.player.run();
      this.bg.changeSpeed(1.5);
      if (!this.diffultyChange) {
        audio.src = fastBGMusic
        this.diffultyChange = true;
      }
    } else if (this.score > 200) {
      this.bg.changeSpeed(2);
      this.max_enemies = 8;
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
      this.health(this.ctx)
      this.player.dead();
      this.bg.changeSpeed(0);
      title.innerHTML = "GAME OVER";
      start.innerHTML = `final score: ${this.score} <br>[esc] to restart`;
      clearInterval(this.enemyInterval);
      this.running = false;
    }

    /*Increase difficulty*/
    this.changeDifficulty();

    /*Animate enemies and status if game started*/
    if (this.running) {
      //Health
      this.health(this.ctx)

      //Enemy logic
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

  status(ctx) {
    ctx.font = "40px VT323";
    ctx.fillText(`score: ${this.score}`, 960, 70)
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

  health(ctx) {
    if (this.player.health < 10) HEARTS.HEART_1_X = 64
    ctx.drawImage(hearts,
      HEARTS.HEART_1_X, HEARTS.HEARTS_Y,
      HEARTS.HEART_SIZE, HEARTS.HEART_SIZE,
      HEARTS.HEARTS_POS_X, HEARTS.HEARTS_POS_Y,
      HEARTS.HEART_CANVAS_SIZE, HEARTS.HEART_CANVAS_SIZE)

    if (this.player.health < 20) HEARTS.HEART_2_X = 64
    ctx.drawImage(hearts,
      HEARTS.HEART_2_X, HEARTS.HEARTS_Y,
      HEARTS.HEART_SIZE, HEARTS.HEART_SIZE,
      HEARTS.HEARTS_POS_X + HEARTS.HEART_CANVAS_SIZE, HEARTS.HEARTS_POS_Y,
      HEARTS.HEART_CANVAS_SIZE, HEARTS.HEART_CANVAS_SIZE)

    if (this.player.health < 30) HEARTS.HEART_3_X = 64
    ctx.drawImage(hearts,
      HEARTS.HEART_3_X, HEARTS.HEARTS_Y,
      HEARTS.HEART_SIZE, HEARTS.HEART_SIZE,
      HEARTS.HEARTS_POS_X + (HEARTS.HEART_CANVAS_SIZE * 2), HEARTS.HEARTS_POS_Y,
      HEARTS.HEART_CANVAS_SIZE, HEARTS.HEART_CANVAS_SIZE)

    if (this.player.health < 40) HEARTS.HEART_4_X = 64
    ctx.drawImage(hearts,
      HEARTS.HEART_4_X, HEARTS.HEARTS_Y,
      HEARTS.HEART_SIZE, HEARTS.HEART_SIZE,
      HEARTS.HEARTS_POS_X + (HEARTS.HEART_CANVAS_SIZE * 3), HEARTS.HEARTS_POS_Y,
      HEARTS.HEART_CANVAS_SIZE, HEARTS.HEART_CANVAS_SIZE)

    if (this.player.health < 50) HEARTS.HEART_5_X = 64
    ctx.drawImage(hearts,
      HEARTS.HEART_5_X, HEARTS.HEARTS_Y,
      HEARTS.HEART_SIZE, HEARTS.HEART_SIZE,
      HEARTS.HEARTS_POS_X + (HEARTS.HEART_CANVAS_SIZE * 4), HEARTS.HEARTS_POS_Y,
      HEARTS.HEART_CANVAS_SIZE, HEARTS.HEART_CANVAS_SIZE)
  }
}