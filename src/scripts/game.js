import Player from "./player";
import Enemy from "./enemy";
import Background from "./background";

const title = document.getElementById("title");
const start = document.getElementById("start");
const audio = document.getElementById("bg-music");
const hearts = new Image();
hearts.src = 'assets/game/UI/hearts.png'

const MUSIC = {
  introBGMusic: './assets/music/bg/memory.mp3',
  medBGMusic: 'assets/music/bg/TemplePath.mp3',
  fastBGMusic: './assets/music/bg/mountainoftrials.mp3',
  gameOverBGMusic: './assets/music/bg/churchofsaints.mp3',
  enemyDestroyAudio: new Audio('./assets/music/effects/destroy2.wav'),
  gameOverAudio: new Audio('./assets/music/effects/game_over.mp3'),
  mistakeAudio: new Audio('assets/music/effects/mistake.wav')
};

MUSIC.enemyDestroyAudio.volume = 0.1;
MUSIC.gameOverAudio.volume = 0.3;
MUSIC.mistakeAudio.volume = 0.2;

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
};

const FPS = 1000/500;

export default class TypeBit {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = {
      width: canvas.width,
      height: canvas.height
    };
    this.bg = new Background(this.ctx, FPS);
    this.player = new Player(this.dimensions, FPS)
    this.enemy = new Enemy(this.dimensions, FPS)
    this.enemiesData = {
      enemies: [],
      enemyWords: [],
      enemyWordPos: []
    }
    this.numEnemies = 1;
    this.maxEnemies = 3;
    this.score = 0;
    this.typed = "";
    this.difficultyChange = false;
    this.level = {
      med: false,
      hard: false
    }
  }

  run() {
    this.running = false;
    audio.src = MUSIC.introBGMusic;
    this.animate(0);
  }

  play() {
    this.running = true;
    this.typed = "";
    title.innerHTML = ""
    start.innerHTML = ""
    this.enemyInterval = setInterval(this.addEnemies.bind(this), 800)
  }

  restart() {
    this.running = false;

    //Reset Enemies
    Object.keys(this.enemiesData).forEach(enemyData => this.enemiesData[enemyData] = [])
    this.maxEnemies = 4;
    this.numEnemies = 1;
    this.enemy.frameTimer = 0;
    clearInterval(this.enemyInterval);

    //Reset Player Data
    this.typed = "";
    this.score = 0;
    this.player.health = 50;
    HEARTS.HEART_1_X = 0;
    HEARTS.HEART_2_X = 0;
    HEARTS.HEART_3_X = 0;
    HEARTS.HEART_4_X = 0;
    HEARTS.HEART_5_X = 0;
    this.player.frameTimer = 0;
    this.player.walk();

    //Reset Background and Sound
    this.bg.changeSpeed(0.5);
    this.bg.frameTimer = 0;
    audio.src = MUSIC.introBGMusic;
    Object.keys(this.level).forEach((lvl) => this.level[lvl] = false);
    title.innerHTML = "typebit"
    start.innerHTML = "press any key to start"
  }

  gameOver() {
    return this.player.outOfHealth()
  }

  changeDifficulty() {
    if (this.score > 50) {
      this.maxEnemies = 4;
      this.numEnemies = 2;
    } else if (this.score >= 100 && this.score <= 150) {
      this.maxEnemies = 6;
      this.numEnemies = 4;
    } if (this.score > 150 && this.score <= 250) {
      this.maxEnemies = 7;
      this.numEnemies = 5;
      if (!this.level.med) {
        audio.src = MUSIC.medBGMusic
        this.level.med = true;
      }
    } else if (this.score > 250  && this.score <= 350) {
      this.maxEnemies = 8;
      this.numEnemies = 5;
      this.bg.changeSpeed(1);
      this.player.run();
      if (!this.level.hard) {
        audio.src = MUSIC.fastBGMusic;
        this.level.hard = true;
      }
    } else if (this.score > 300 && this.score <= 400) {
      this.maxEnemies = 8;
      this.numEnemies = 6;
    } else if (this.score > 400) {
      this.bg.changeSpeed(2);
      this.maxEnemies = 10;
      this.numEnemies = 6;
    }
  }

  removeEnemy(enemy) {
    const enemyIndex = this.enemiesData.enemies.indexOf(enemy)
    this.enemiesData.enemies.splice(enemyIndex, 1);
    this.enemiesData.enemyWords.splice(enemyIndex, 1);
    this.enemiesData.enemyWordPos.splice(enemyIndex, 1);
  }

  animate(timeStamp, lastTime = 0) {
    const deltaTime = (timeStamp - lastTime)/1600;
    lastTime = timeStamp;
    /*Animate background and player*/
    this.ctx.clearRect.bind(this, 0, 0, this.dimensions.width, this.dimensions.height);
    this.bg.draw(this.ctx, deltaTime);
    this.player.draw(this.ctx, deltaTime);

    /* Game Over Sequence */
    if (this.gameOver() && this.running){
      audio.src = MUSIC.gameOverBGMusic;
      if (!audio.muted) {
        MUSIC.gameOverAudio.play();
      }
      this.health(this.ctx)
      this.player.dead();
      this.bg.changeSpeed(0);
      title.innerHTML = "GAME OVER";
      start.innerHTML = `final score: ${this.score} <br>[ctrl] to restart`;
      clearInterval(this.enemyInterval);
      this.running = false;
    }

    /*Increase difficulty*/
    this.changeDifficulty();

    /*Animate enemies and status if game started*/
    if (this.running) {
      //Health
      this.health(this.ctx)

      /*Input Logic*/
      this.wordSubmit();

      /*Enemy Logic*/
      this.enemiesData.enemies.forEach(enemy => {
        enemy.draw(this.ctx, deltaTime)

        //Remove enemy if out of bounds
        if (enemy.bounds().right < 0) {
          this.removeEnemy(enemy)
        }

        //Enemy collision with player when not already destroyed
        if (this.player.collidesWith(this.player.bounds(), enemy.bounds())
        && enemy.destroyed === false) {
          this.player.hurt();
          this.removeEnemy(enemy)
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
    for (let i = 0; i < this.numEnemies; i++){
      if (this.enemiesData.enemies.length < this.maxEnemies) {
        let speed = Math.random()
        let pos = Math.random()
        const newEnemy = new Enemy(this.dimensions, speed, pos,
          this.enemiesData.enemyWords, this.enemiesData.enemyWordPos, FPS)
        this.enemiesData.enemies.push(newEnemy);
        this.enemiesData.enemyWords.push(newEnemy.words)
        this.enemiesData.enemyWordPos.push(newEnemy.words_y)
      }
    }
  }

  wordSubmit() {
    if (this.typed.slice(-1) === "~") {
      this.typedWord = this.typed.slice(0, -1);

      if (this.enemiesData.enemyWords.includes(this.typedWord)) {
        if (!audio.muted) {
          MUSIC.enemyDestroyAudio.play();
        };

        let enemyIdx = this.enemiesData.enemyWords.indexOf(this.typedWord)
        let enemy = this.enemiesData.enemies[enemyIdx]
        enemy.destroy();
        this.score += enemy.score;
      } else {
        if (!audio.muted) {
          MUSIC.mistakeAudio.play();
        }
      }
      this.typed = "";
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