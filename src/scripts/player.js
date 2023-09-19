const CONSTANTS = {
  PLAYER_SPEED: 0,
  PLAYER_HEALTH: 100,
  PLAYER_WIDTH: 64,
  PLAYER_HEIGHT: 64,
  SPRITE_WALK: 'assets/game/player/walk.png',
  SPRITE_RUN: 'assets/game/player/run.png',
  SPRITE_ATTACK: 'assets/game/player/attack.png',
  SPRITE_HURT: 'assets/game/player/hurt.png',
  SPRITE_IDLE: 'assets/game/player/idle.png', //for future use in blockades
  GAME_FRAME: 0,
  SPRITE_FRAME: 0,
  STAGGER_FRAME: 9,
  SPRITE_X: 32,
  SPRITE_Y: 32,
  SPRITE_POS_X: 100,
  SPRITE_POS_Y: 440,
  SOUND_HURT: 'assets/music/effects/destroy.wav'
}

export default class Player {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = CONSTANTS.PLAYER_WIDTH;
    this.y = CONSTANTS.PLAYER_HEIGHT;
    this.speed = CONSTANTS.PLAYER_SPEED;
    this.health = CONSTANTS.PLAYER_HEALTH;
    this.spriteAnim = [CONSTANTS.SPRITE_WALK, CONSTANTS.SPRITE_RUN,
      CONSTANTS.SPRITE_ATTACK, CONSTANTS.SPRITE_HURT, CONSTANTS.SPRITE_IDLE]
    this.playerImg = new Image();
    this.playerImg.src = CONSTANTS.SPRITE_WALK;
  }

  walk() {
    this.playerImg.src = this.spriteAnim[0];
    CONSTANTS.STAGGER_FRAME = 9;
  }

  run() {
    //animation for moderate typing speed
    this.playerImg.src = this.spriteAnim[1];
    CONSTANTS.STAGGER_FRAME = 5;
  }

  attack() {
    //animation for fast typing speed
    this.playerImg.src = this.spriteAnim[2];
  }

  hurt() {
    //animation and decrease in health for when inaccurate typing is detected
    this.playerImg.src = this.spriteAnim[3];
    CONSTANTS.STAGGER_FRAME = 12;
    CONSTANTS.PLAYER_HEALTH -= 10;
  }

  animate(ctx) {
    ctx.clearRect.bind(this, 0, 0, this.dimensions.width, this.dimensions.height)

    let position = Math.floor(CONSTANTS.GAME_FRAME/CONSTANTS.STAGGER_FRAME) % 5;
    CONSTANTS.SPRITE_FRAME = CONSTANTS.SPRITE_X * position;

    ctx.drawImage(this.playerImg, CONSTANTS.SPRITE_FRAME, 0,
      CONSTANTS.SPRITE_X, CONSTANTS.SPRITE_Y,
      CONSTANTS.SPRITE_POS_X, CONSTANTS.SPRITE_POS_Y,
      this.x, this.y)

    CONSTANTS.GAME_FRAME++;
    requestAnimationFrame(this.animate.bind(this, ctx))
  }
}