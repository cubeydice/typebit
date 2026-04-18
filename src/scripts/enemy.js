import { WORDS } from "./words";

const CONSTANTS = {
  BASE_SPEED: 60,         // px/s initial enemy movement speed
  SPEED_VARIANCE: 20,     // px/s additional random speed range per enemy
  ANIM_RATE: 8,           // default animation frames per second
  FRAME_COUNT: 7,         // frames in enemy sprite sheet row
  ENEMY_WIDTH: 64,
  ENEMY_HEIGHT: 64,
  SPRITE_X: 32,
  SPRITE_Y: 25,
  SPAWN_X: 1152,
  SPRITE_POS_Y: 445
}

export default class Enemy {
  constructor(dimensions, speedFactor, pos, enemyWords, enemyWordPos, baseSpeed = CONSTANTS.BASE_SPEED) {
    this.dimensions = dimensions;
    this.speedFactor = speedFactor; // 0–1, preserved so speed can be recalculated on difficulty change
    this.speed = baseSpeed + speedFactor * CONSTANTS.SPEED_VARIANCE; // px/s
    this.pos_x = CONSTANTS.SPAWN_X + (100 * pos);
    this.frameDuration = 1 / CONSTANTS.ANIM_RATE; // seconds per animation frame
    this.frameTimer = 0;
    this.frame = 0;
    this.enemyImg = new Image();
    this.enemyImg.src = 'assets/game/enemy/slime.png';
    this.words = WORDS[Math.floor(Math.random() * WORDS.length)];
    this.words_y = CONSTANTS.SPRITE_POS_Y - Math.random() * 150;
    this.checkWord(enemyWords);
    this.checkWordPosition(enemyWordPos);
    this.score = this.words.length; // set after checkWord resolves the final word
  }

  checkWord(enemyWords) {
    if (enemyWords !== undefined) {
      while (enemyWords.includes(this.words)) {
        this.words = WORDS[Math.floor(Math.random() * WORDS.length)];
      }
    }
  }

  checkWordPosition(enemyWordPos) {
    if (enemyWordPos !== undefined) {
      while (enemyWordPos.includes(this.words_y)) {
        this.words_y += 10;
      }
    }
  }

  setBaseSpeed(baseSpeed) {
    this.speed = baseSpeed + this.speedFactor * CONSTANTS.SPEED_VARIANCE;
  }

  update(deltaTime) {
    this.pos_x -= this.speed * deltaTime;

    this.frameTimer += deltaTime;
    while (this.frameTimer >= this.frameDuration) {
      this.frameTimer -= this.frameDuration;
      this.frame = (this.frame + 1) % CONSTANTS.FRAME_COUNT;
    }
  }

  draw(ctx) {
    // Word label
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.roundRect(this.pos_x - this.words.length - 9, this.words_y - 28, (this.words.length * 10) + 10, 22, [10]);
    ctx.fill();
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "24px VT323";
    ctx.fillText(this.words, this.pos_x - this.words.length, this.words_y - 10);

    // Sprite
    const spriteX = CONSTANTS.SPRITE_X * this.frame;
    ctx.drawImage(
      this.enemyImg,
      spriteX, 0,
      CONSTANTS.SPRITE_X, CONSTANTS.SPRITE_Y,
      this.pos_x, CONSTANTS.SPRITE_POS_Y,
      CONSTANTS.ENEMY_WIDTH, CONSTANTS.ENEMY_HEIGHT
    );
  }

  bounds() {
    return {
      left: this.pos_x,
      right: this.pos_x + CONSTANTS.ENEMY_WIDTH,
      top: CONSTANTS.SPRITE_POS_Y,
      bottom: CONSTANTS.SPRITE_POS_Y + CONSTANTS.ENEMY_HEIGHT
    };
  }
}
