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
  SRC_SIZE: 32,
  CANVAS_SIZE: 64,
  POS_X: 40,
  POS_Y: 27,
  COUNT: 5
};

// Each tier applies when score > minScore && score <= maxScore.
// music: 'med' | 'hard' triggers a one-time music/locomotion change on entry.
const DIFFICULTY_TIERS = [
  { minScore: 50,  maxScore: 100,      maxEnemies: 3,  numEnemies: 2, bgSpeed: 75,  playerRate: 1/10, enemyRate: 1/10, enemySpeed: 110 },
  { minScore: 100, maxScore: 150,      maxEnemies: 4,  numEnemies: 2, bgSpeed: 90,  playerRate: 1/12, enemyRate: 1/12, enemySpeed: 140 },
  { minScore: 150, maxScore: 200,      maxEnemies: 5,  numEnemies: 3, bgSpeed: 105, playerRate: 1/12, enemyRate: 1/15, enemySpeed: 170, music: 'med' },
  { minScore: 200, maxScore: 250,      maxEnemies: 5,  numEnemies: 3, bgSpeed: 112, playerRate: 1/15, enemyRate: 1/15, enemySpeed: 200 },
  { minScore: 250, maxScore: 350,      maxEnemies: 6,  numEnemies: 4, bgSpeed: 120, playerRate: 1/20, enemyRate: 1/20, enemySpeed: 240, music: 'hard' },
  { minScore: 350, maxScore: 400,      maxEnemies: 8,  numEnemies: 4, bgSpeed: 150, playerRate: 1/25, enemyRate: 1/25, enemySpeed: 280 },
  { minScore: 400, maxScore: 800,      maxEnemies: 9,  numEnemies: 5, bgSpeed: 150, playerRate: 1/28, enemyRate: 1/28, enemySpeed: 320 },
  { minScore: 800, maxScore: Infinity, maxEnemies: 10, numEnemies: 6, bgSpeed: 150, playerRate: 1/30, enemyRate: 1/30, enemySpeed: 370 },
];

export default class TypeBit {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = {
      width: canvas.width,
      height: canvas.height
    };
    this.bg = new Background(this.ctx);
    this.player = new Player(this.dimensions);
    this.lastTime = 0;
    this.enemiesData = {
      enemies: [],
      enemyWords: [],
      enemyWordPos: []
    }
    this.numEnemies = 1;
    this.maxEnemies = 3;
    this.enemyBaseSpeed = 60;
    this.enemyFrameDuration = 1/8;
    this.score = 0;
    this.typed = "";
    this.running = false;
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
    this.enemyInterval = setInterval(this.addEnemies.bind(this), 500)
  }

  restart() {
    this.running = false;

    // Reset enemies
    Object.keys(this.enemiesData).forEach(key => this.enemiesData[key] = []);
    this.maxEnemies = 3;
    this.numEnemies = 1;
    this.enemyBaseSpeed = 60;
    this.enemyFrameDuration = 1/8;
    clearInterval(this.enemyInterval);

    // Reset player
    this.typed = "";
    this.score = 0;
    this.player.health = 50;
    this.player.frameDuration = 1/8;
    this.player.frameTimer = 0;
    this.player.frame = 0;
    this.player.hurts = false;
    this.player.walk();

    // Reset background and sound
    this.bg.changeSpeed(60);
    audio.src = MUSIC.introBGMusic;
    Object.keys(this.level).forEach(lvl => this.level[lvl] = false);
    title.innerHTML = "typebit"
    start.innerHTML = "press any key to start"
  }

  gameOver() {
    return this.player.outOfHealth();
  }

  changeDifficulty() {
    const tier = DIFFICULTY_TIERS.find(t => this.score > t.minScore && this.score <= t.maxScore);
    if (!tier) return;

    this.maxEnemies           = tier.maxEnemies;
    this.numEnemies           = tier.numEnemies;
    this.bg.changeSpeed(tier.bgSpeed);
    this.player.frameDuration = tier.playerRate;
    this.enemyFrameDuration   = tier.enemyRate;
    this.enemyBaseSpeed       = tier.enemySpeed;

    if (tier.music === 'med' && !this.level.med) {
      audio.src = MUSIC.medBGMusic;
      this.level.med = true;
    }
    if (tier.music === 'hard' && !this.level.hard) {
      audio.src = MUSIC.fastBGMusic;
      this.player.run();
      this.level.hard = true;
    }

    this.enemiesData.enemies.forEach(e => {
      e.frameDuration = this.enemyFrameDuration;
      e.setBaseSpeed(this.enemyBaseSpeed);
    });
  }

  removeEnemy(enemy) {
    const idx = this.enemiesData.enemies.indexOf(enemy);
    if (idx === -1) return;
    this.enemiesData.enemies.splice(idx, 1);
    this.enemiesData.enemyWords.splice(idx, 1);
    this.enemiesData.enemyWordPos.splice(idx, 1);
  }

  animate(timeStamp) {
    // Cap deltaTime to 50ms to prevent a spiral of death after tab focus loss
    const deltaTime = Math.min((timeStamp - this.lastTime) / 1000, 0.05);
    this.lastTime = timeStamp;

    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.bg.update(deltaTime);
    this.bg.draw();
    this.player.update(deltaTime);
    this.player.draw(this.ctx);

    /* Game over sequence */
    if (this.gameOver() && this.running) {
      audio.src = MUSIC.gameOverBGMusic;
      if (!audio.muted) MUSIC.gameOverAudio.play();
      this.health(this.ctx);
      this.player.dead();
      this.bg.changeSpeed(0);
      title.innerHTML = "GAME OVER";
      start.innerHTML = `final score: ${this.score} <br>[ctrl] to restart`;
      clearInterval(this.enemyInterval);
      this.running = false;
    }

    if (this.running) {
      this.changeDifficulty();
      this.health(this.ctx);
      this.wordSubmit();

      const toRemove = new Set();
      this.enemiesData.enemies.forEach(enemy => {
        enemy.update(deltaTime);
        enemy.draw(this.ctx);

        if (enemy.bounds().right < 0) {
          toRemove.add(enemy);
        } else if (this.player.collidesWith(this.player.bounds(), enemy.bounds())) {
          this.player.hurt();
          toRemove.add(enemy);
        }
      });
      toRemove.forEach(enemy => this.removeEnemy(enemy));

      this.status(this.ctx);
    }

    this.animReq = requestAnimationFrame(this.animate.bind(this));
  }

  status(ctx) {
    ctx.font = "40px VT323";
    ctx.fillText(`score: ${this.score}`, 960, 70)
    ctx.font = "64px VT323";
    ctx.fillText(this.typed, 200, 280)
  }

  addEnemies() {
    for (let i = 0; i < this.numEnemies; i++) {
      if (this.enemiesData.enemies.length < this.maxEnemies) {
        const newEnemy = new Enemy(
          this.dimensions, Math.random(), i + Math.random(),
          this.enemiesData.enemyWords, this.enemiesData.enemyWordPos,
          this.enemyBaseSpeed
        );
        newEnemy.frameDuration = this.enemyFrameDuration;
        this.enemiesData.enemies.push(newEnemy);
        this.enemiesData.enemyWords.push(newEnemy.words);
        this.enemiesData.enemyWordPos.push(newEnemy.words_y);
      }
    }
  }

  wordSubmit() {
    if (this.typed.slice(-1) !== "~") return;
    const typedWord = this.typed.slice(0, -1);
    this.typed = "";

    const idx = this.enemiesData.enemyWords.indexOf(typedWord);
    if (idx !== -1) {
      if (!audio.muted) MUSIC.enemyDestroyAudio.play();
      this.score += this.enemiesData.enemies[idx].score;
      this.removeEnemy(this.enemiesData.enemies[idx]);
    } else {
      if (!audio.muted) MUSIC.mistakeAudio.play();
    }
  }

  health(ctx) {
    for (let i = 0; i < HEARTS.COUNT; i++) {
      const srcX = this.player.health < (i + 1) * 10 ? HEARTS.SRC_SIZE : 0;
      ctx.drawImage(hearts,
        srcX, 0,
        HEARTS.SRC_SIZE, HEARTS.SRC_SIZE,
        HEARTS.POS_X + (HEARTS.CANVAS_SIZE * i), HEARTS.POS_Y,
        HEARTS.CANVAS_SIZE, HEARTS.CANVAS_SIZE
      );
    }
  }
}
