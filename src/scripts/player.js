const CONSTANTS = {
  PLAYER_HEALTH: 50,
  PLAYER_SPEED: 9, //higher num === slower; stagger frame speed
  PLAYER_WIDTH: 64, //size of player on canvas
  PLAYER_HEIGHT: 64, //size of player on canvas
  SPRITE_WALK: 'assets/game/player/walk.png',
  SPRITE_RUN: 'assets/game/player/run.png',
  SPRITE_ATTACK: 'assets/game/player/attack.png',
  SPRITE_HURT: 'assets/game/player/hurt.png',
  SPRITE_IDLE: 'assets/game/player/idle.png', //for future use in blockades
  GAME_FRAME: 0, //initial game frame
  SPRITE_FRAME: 0, //starting frame
  SPRITE_X: 32, //sprite frame size
  SPRITE_Y: 32, //sprite frame size
  SPRITE_POS_X: 100, //starting position
  SPRITE_POS_Y: 440, //starting position
  SOUND_HURT: 'assets/music/effects/destroy.wav'
}

const audio = document.getElementById("bg-music");

export default class Player {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.health = CONSTANTS.PLAYER_HEALTH;
    this.spriteAnim = [CONSTANTS.SPRITE_WALK, CONSTANTS.SPRITE_RUN,
      CONSTANTS.SPRITE_ATTACK, CONSTANTS.SPRITE_HURT, CONSTANTS.SPRITE_IDLE]
    this.playerImg = new Image();
    this.playerImg.src = CONSTANTS.SPRITE_WALK;
  }

  walk() {
    this.playerImg.src = this.spriteAnim[0];
    CONSTANTS.PLAYER_SPEED = 9;
  }

  run() {
    //animation for moderate typing speed
    this.playerImg.src = this.spriteAnim[1];
    CONSTANTS.PLAYER_SPEED = 5;
  }

  attack() {
    //animation for fast typing speed
    this.playerImg.src = this.spriteAnim[2];
  }

  hurt() {
    //animation and decrease in health for when inaccurate typing is detected
    if (!audio.muted) {
      this.hurtAudio = new Audio(CONSTANTS.SOUND_HURT)
      this.hurtAudio.play()
    }
    this.playerImg.src = this.spriteAnim[3];
    this.health -= 10;
  }

  draw(ctx, wordsPerMin) {
    let position = Math.floor(CONSTANTS.GAME_FRAME/CONSTANTS.PLAYER_SPEED) % 5;
    CONSTANTS.SPRITE_FRAME = CONSTANTS.SPRITE_X * position;

    ctx.drawImage(this.playerImg, //image file
      CONSTANTS.SPRITE_FRAME, 0, //position on sprite frame file
      CONSTANTS.SPRITE_X, CONSTANTS.SPRITE_Y, //size of position on sprite frame file
      CONSTANTS.SPRITE_POS_X, CONSTANTS.SPRITE_POS_Y, //position on canvas
      CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT) //size of sprite on canvas

    CONSTANTS.GAME_FRAME++;
  }

  outOfHealth() {
    if (this.health <= 0) return true;
    return false;
  }

  bounds() {
    return {
      left: CONSTANTS.SPRITE_POS_X,
      right: CONSTANTS.SPRITE_POS_X + CONSTANTS.PLAYER_WIDTH,
      top: CONSTANTS.SPRITE_POS_Y,
      bottom: CONSTANTS.SPRITE_POS_Y + CONSTANTS.PLAYER_HEIGHT
    }
  }

  collidesWith(player, enemy) {
    //checks if enemy overlaps with player
    if (player.right > enemy.left) {
      return true;
    }
    return false;
  }
}