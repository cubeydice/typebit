const CONSTANTS = {
  PLAYER_SPEED: 0,
  PLAYER_HEALTH: 100,
  PLAYER_WIDTH: 64,
  PLAYER_HEIGHT: 64,
  SPRITE_WALK: 'assets/game/player/walk.png',
  SPRITE_RUN: 'assets/game/player/run.png',
  SPRITE_RUN: 'assets/game/player/attack.png',
  SPRITE_FRAME: 0,
  STAGGER_FRAME: 5,
  SPRITE_X: 32,
  SPRITE_Y: 32,
  SPRITE_POS_X: 100,
  SPRITE_POS_Y: 400,
}

export default class Player {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = CONSTANTS.PLAYER_WIDTH;
    this.y = CONSTANTS.PLAYER_HEIGHT;
    this.speed = CONSTANTS.PLAYER_SPEED;
    this.health = CONSTANTS.PLAYER_HEALTH;
    this.playerImg = new Image();
    this.playerImg.src = CONSTANTS.SPRITE_WALK;
  }

  walk(ctx) {
    //animation for slow typing speed
  }

  run(ctx) {
    //animation for moderate typing speed
  }

  sprint(ctx) {
    //animation for fast typing speed
  }

  hurt(ctx) {
    //animation and decrease in health for when inaccurate typing is detected
    CONSTANTS.PLAYER_HEALTH -= 10;
  }

  animate(ctx) {
    // ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height)
    ctx.drawImage(this.playerImg, CONSTANTS.SPRITE_X * CONSTANTS.SPRITE_FRAME, 0, CONSTANTS.SPRITE_X, CONSTANTS.SPRITE_Y, CONSTANTS.SPRITE_POS_X, CONSTANTS.SPRITE_POS_Y, this.x, this.y)

    if (CONSTANTS.SPRITE_FRAME % CONSTANTS.STAGGER_FRAME == 0) {
      if (CONSTANTS.SPRITE_FRAME < 5) CONSTANTS.SPRITE_FRAME++
      else CONSTANTS.SPRITE_FRAME = 0;
    }
    requestAnimationFrame(this.animate.bind(this, ctx))
  }
}