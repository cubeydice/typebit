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

const BG_TRACKS = {
  intro: MUSIC.introBGMusic,
  med:   MUSIC.medBGMusic,
  hard:  MUSIC.fastBGMusic,
};

const HEARTS = {
  SRC_SIZE: 32,
  FULL_SRC_X: 0,
  EMPTY_SRC_X: 64,  // sprite sheet: full=0, half=32, empty=64
  CANVAS_SIZE: 64,
  POS_X: 40,
  POS_Y: 27,
  COUNT: 5
};

// Each tier applies when score > minScore && score <= maxScore.
// music: 'med' | 'hard' triggers a one-time music/locomotion change on entry.
const DIFFICULTY_TIERS = [
  { minScore: 50,   maxScore: 150,     maxEnemies: 3,  numEnemies: 2, bgSpeed: 65,  playerRate: 1/9,  enemyRate: 1/9,  enemySpeed: 75,  music: 'intro' },
  { minScore: 150,  maxScore: 300,     maxEnemies: 4,  numEnemies: 2, bgSpeed: 78,  playerRate: 1/10, enemyRate: 1/10, enemySpeed: 100, music: 'med'  },
  { minScore: 300,  maxScore: 450,     maxEnemies: 5,  numEnemies: 3, bgSpeed: 85,  playerRate: 1/12, enemyRate: 1/12, enemySpeed: 120, music: 'med'  },
  { minScore: 450,  maxScore: 700,     maxEnemies: 6,  numEnemies: 3, bgSpeed: 110, playerRate: 1/14, enemyRate: 1/14, enemySpeed: 150, music: 'hard', run: true },
  { minScore: 700,  maxScore: 1000,    maxEnemies: 7,  numEnemies: 4, bgSpeed: 120, playerRate: 1/18, enemyRate: 1/18, enemySpeed: 155, music: 'hard' },
  { minScore: 1000, maxScore: 1500,    maxEnemies: 8,  numEnemies: 4, bgSpeed: 135, playerRate: 1/22, enemyRate: 1/22, enemySpeed: 180, music: 'hard' },
  { minScore: 1500, maxScore: 2500,    maxEnemies: 9,  numEnemies: 5, bgSpeed: 140, playerRate: 1/26, enemyRate: 1/26, enemySpeed: 210, music: 'hard' },
  { minScore: 2500, maxScore: Infinity, maxEnemies: 10, numEnemies: 6, bgSpeed: 180, playerRate: 1/30, enemyRate: 1/30, enemySpeed: 250, music: 'hard' },
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
    this.currentMusic = 'intro';
    this.charsTyped = 0;
    this.elapsedTime = 0;
    this.fadeAlpha = 0;
    this.fading = false;
    this.timerStarted = false;
    this.animate = this.animate.bind(this);
  }

  run() {
    this.running = false;
    audio.src = BG_TRACKS.intro;
    this.animate(0);
  }

  play() {
    this.running = true;
    this.typed = "";
    title.innerHTML = ""
    start.innerHTML = ""
    this.enemyInterval = setInterval(this.addEnemies.bind(this), 500);
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
    this.charsTyped = 0;
    this.elapsedTime = 0;
    this.timerStarted = false;
    this.player.health = 50;
    this.player.frameDuration = 1/8;
    this.player.frameTimer = 0;
    this.player.frame = 0;
    this.player.hurts = false;
    this.player.walk();

    // Reset background and sound
    this.bg.changeSpeed(60);
    audio.src = BG_TRACKS.intro;
    this.currentMusic = 'intro';
    this.fadeAlpha = 0;
    this.fading = false;
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

    if (tier.music !== this.currentMusic) {
      this.currentMusic = tier.music;
      audio.src = BG_TRACKS[tier.music];
      if (tier.run) this.player.run();
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
      const finalWpm = this.charsTyped > 0 ? Math.round((this.charsTyped / 5) / (this.elapsedTime / 60)) : 0;
      start.innerHTML = `final score: ${this.score} &nbsp;|&nbsp; ${finalWpm} wpm <br>[ctrl] to restart`;
      clearInterval(this.enemyInterval);
      this.running = false;
      this.fading = true;
    }

    if (this.fading) {
      this.fadeAlpha = Math.min(this.fadeAlpha + deltaTime * 0.4, 1);
      this.ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeAlpha})`;
      this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
      this.player.draw(this.ctx);
    }

    if (this.running) {
      if (!this.timerStarted && this.typed.length > 0) this.timerStarted = true;
      if (this.timerStarted) this.elapsedTime += deltaTime;
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

    this.animReq = requestAnimationFrame(this.animate);
  }

  status(ctx) {
    const wpm = this.charsTyped > 0 ? Math.round((this.charsTyped / 5) / (this.elapsedTime / 60)) : 0;
    ctx.fillStyle = "black";
    ctx.font = "40px VT323";
    ctx.fillText(`score: ${this.score}`, 960, 70);
    ctx.font = "24px VT323";
    ctx.fillText(`${wpm} wpm`, 960, 100);
    ctx.font = "64px VT323";
    ctx.fillText(this.typed, 200, 280);
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
      this.charsTyped += this.enemiesData.enemies[idx].score; // score === word.length
      this.removeEnemy(this.enemiesData.enemies[idx]);
    } else {
      if (!audio.muted) MUSIC.mistakeAudio.play();
    }
  }

  health(ctx) {
    for (let i = 0; i < HEARTS.COUNT; i++) {
      const srcX = this.player.health < (i + 1) * 10 ? HEARTS.EMPTY_SRC_X : HEARTS.FULL_SRC_X;
      ctx.drawImage(hearts,
        srcX, 0,
        HEARTS.SRC_SIZE, HEARTS.SRC_SIZE,
        HEARTS.POS_X + (HEARTS.CANVAS_SIZE * i), HEARTS.POS_Y,
        HEARTS.CANVAS_SIZE, HEARTS.CANVAS_SIZE
      );
    }
  }
}
