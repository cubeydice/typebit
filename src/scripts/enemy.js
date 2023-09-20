import { WORDS } from "./words";

const CONSTANTS = {
  ENEMY_SPEED: 2,
  STAGGER_FRAME: 10,
  ENEMY_WIDTH: 64,
  ENEMY_HEIGHT: 64,
  GAME_FRAME: 0,
  SPRITE_FRAME: 0,
  SPRITE_X: 32,
  SPRITE_Y: 28,
  SPRITE_POS_X: 1152,
  SPRITE_POS_Y: 450
}
export default class Enemy {
  constructor(dimensions, speed, pos) {
    this.dimensions = dimensions;
    this.speed = Math.floor(speed * CONSTANTS.ENEMY_SPEED + CONSTANTS.ENEMY_SPEED);
    this.pos_x = Math.floor(CONSTANTS.SPRITE_POS_X + (100 * pos));
    this.pos_y = 0;
    this.stagger_frame = CONSTANTS.STAGGER_FRAME - this.speed;
    this.enemyImg = new Image();
    this.enemyImg.src = 'assets/game/enemy/slime.png';
    this.words = WORDS[Math.floor(Math.random() * WORDS.length)];
    this.words_y = CONSTANTS.SPRITE_POS_Y - Math.random() * 100;
    this.score = this.words.length;
    this.destroyed = false;
  }

  draw(ctx) {
    if (!this.destroyed) {
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.roundRect(this.pos_x - this.words.length - 9, this.words_y - 28, (this.words.length * 10) + 10, 22, [10]);
      ctx.fill();

      ctx.fillStyle = "black";
      ctx.font = "24px VT323";
      ctx.fillText(this.words, this.pos_x - this.words.length, this.words_y - 10)
      ctx.clearRect.bind(this, 0, 0, this.dimensions.width, this.dimensions.height)
    }

    this.move(ctx)
  }

  move(ctx) {
    if (this.destroyed && this.position >= 6) {
    } else {
      this.position = Math.floor(CONSTANTS.GAME_FRAME/this.stagger_frame) % 7;
      CONSTANTS.SPRITE_FRAME = CONSTANTS.SPRITE_X * this.position;

      ctx.drawImage(this.enemyImg, CONSTANTS.SPRITE_FRAME, this.pos_y,
        CONSTANTS.SPRITE_X, CONSTANTS.SPRITE_Y,
        this.pos_x, CONSTANTS.SPRITE_POS_Y,
        CONSTANTS.ENEMY_WIDTH, CONSTANTS.ENEMY_HEIGHT)
        CONSTANTS.GAME_FRAME++;
    }
    this.pos_x -= this.speed/2
  }

  destroy() {
    this.pos_y = CONSTANTS.SPRITE_Y * 2 + 2;
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