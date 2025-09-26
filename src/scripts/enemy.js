import { getRandomWord } from "./words";

const CONSTANTS = {
  ENEMY_SPEED: 1,
  STAGGER_FRAME: 10,
  ENEMY_WIDTH: 64,
  ENEMY_HEIGHT: 64,
  GAME_FRAME: 0,
  SPRITE_FRAME: 0,
  SPRITE_X: 32,
  SPRITE_Y: 25,
  SPRITE_POS_X: 1152,
  SPRITE_POS_Y: 445
}
export default class Enemy {
  constructor(dimensions, speed, pos, enemyWords, enemyWordPos, fps) {
    this.dimensions = dimensions;
    this.speed = Math.floor(speed * CONSTANTS.ENEMY_SPEED + CONSTANTS.ENEMY_SPEED);
    this.pos_x = Math.floor(CONSTANTS.SPRITE_POS_X + (100 * pos));
    this.pos_y = 0;
    this.stagger_frame = CONSTANTS.STAGGER_FRAME - this.speed;
    this.enemyImg = new Image();
    this.enemyImg.src = 'assets/game/enemy/slime.png';
    this.words = getRandomWord();
    this.words_y = CONSTANTS.SPRITE_POS_Y - Math.random() * 150;
    this.score = this.words.length;
    this.destroyed = false;
    this.checkWord(enemyWords)
    this.checkWordPosition(enemyWordPos)
    this.fps = fps;
    this.maxFrame = 60;
    this.frameTimer = 0;
  }
  checkWordPosition(enemyWordPos) {
    if (enemyWordPos !== undefined) {
      while (enemyWordPos.includes(this.words_y)) {
        this.words_y += 10;
      }
    }
  }

  checkWord (enemyWords) {
    if (enemyWords !== undefined) {
      while (enemyWords.includes(this.words)) {
        this.words = getRandomWord();
      }
    }
  }

  draw(ctx, deltaTime) {
    if (!this.destroyed) {
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.roundRect(this.pos_x - this.words.length - 9, this.words_y - 28, (this.words.length * 10) + 10, 22, [10]);
      ctx.fill();
      ctx.strokeStyle = "gray";
      ctx.stroke();

      ctx.fillStyle = "black";
      ctx.font = "24px VT323";
      ctx.fillText(this.words, this.pos_x - this.words.length, this.words_y - 10)
    }

    this.move(ctx, deltaTime)
  }

  move(ctx, deltaTime) {
    if (this.destroyed && this.position >= 6) {
    } else {
      this.position = Math.floor(CONSTANTS.GAME_FRAME/this.stagger_frame) % 7;
      CONSTANTS.SPRITE_FRAME = CONSTANTS.SPRITE_X * this.position;
      ctx.drawImage(this.enemyImg, CONSTANTS.SPRITE_FRAME, this.pos_y,
        CONSTANTS.SPRITE_X, CONSTANTS.SPRITE_Y,
        this.pos_x, CONSTANTS.SPRITE_POS_Y,
        CONSTANTS.ENEMY_WIDTH, CONSTANTS.ENEMY_HEIGHT
      )
    }
    if (this.frameTimer < this.fps) {
      CONSTANTS.GAME_FRAME++;
      this.pos_x -= this.speed/5;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }

  }

  destroy() {
    this.pos_y = CONSTANTS.SPRITE_Y * 2;
    CONSTANTS.GAME_FRAME = 1;
    this.destroyed = true;
  }

  bounds() {
    return {
      left: this.pos_x,
      right: this.pos_x + CONSTANTS.ENEMY_WIDTH,
      top: CONSTANTS.SPRITE_POS_Y,
      bottom: CONSTANTS.SPRITE_POS_Y + CONSTANTS.ENEMY_HEIGHT
    }
  }
}