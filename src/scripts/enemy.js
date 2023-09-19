const CONSTANTS = {
  ENEMY_SPEED: 2,
  STAGGER_FRAME: 50,
  ENEMY_WIDTH: 64,
  ENEMY_HEIGHT: 64,
  GAME_FRAME: 0,
  SPRITE_FRAME: 0,
  SPRITE_X: 32,
  SPRITE_Y: 28,
  SPRITE_POS_X: 1152,
  SPRITE_POS_Y: 450,
  SOUND_HURT: 'assets/music/effects/destroy2.wav'
}
export default class Enemy {
  constructor(dimensions, speed, pos) {
    this.dimensions = dimensions;
    this.x = CONSTANTS.ENEMY_WIDTH;
    this.y = CONSTANTS.ENEMY_HEIGHT;
    this.speed = speed * CONSTANTS.ENEMY_SPEED + CONSTANTS.ENEMY_SPEED
    this.pos_x = CONSTANTS.SPRITE_POS_X + (CONSTANTS.SPRITE_POS_X * pos) + (this.speed * CONSTANTS.SPRITE_POS_X)/10
    this.stagger_frame = CONSTANTS.STAGGER_FRAME - this.speed
    this.enemyImg = new Image();
    this.enemyImg.src = 'assets/game/enemy/slime.png'
  }

  animate(ctx) {
    ctx.clearRect.bind(this, 0, 0, this.dimensions.width, this.dimensions.height)
    this.move(ctx)
    requestAnimationFrame(this.animate.bind(this, ctx))
  }

  move(ctx) {
    //animation for movement
    let position = Math.floor(CONSTANTS.GAME_FRAME/this.stagger_frame) % 7;
    CONSTANTS.SPRITE_FRAME = CONSTANTS.SPRITE_X * position;

    ctx.drawImage(this.enemyImg, CONSTANTS.SPRITE_FRAME, 0,
      CONSTANTS.SPRITE_X, CONSTANTS.SPRITE_Y,
      this.pos_x, CONSTANTS.SPRITE_POS_Y,
      this.x, this.y)

    CONSTANTS.GAME_FRAME++;
    this.pos_x -= this.speed/2
  }

  destroy() {
    //animation and logic for when enemy is destroyed
  }

  words() {
    //quote to be displayed above enemy head
    //if all typed, then enemy is destroyed
  }
}