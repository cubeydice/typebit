const CONSTANTS = {
  PLAYER_HEALTH: 50,
  PLAYER_SPEED: 9, //higher num === slower; stagger frame speed
  PLAYER_WIDTH: 64, //size of player on canvas
  PLAYER_HEIGHT: 64, //size of player on canvas
  SPRITE_WALK: 'assets/game/player/walk.png',
  SPRITE_RUN: 'assets/game/player/run.png',
  SPRITE_HURT: 'assets/game/player/hurt.png',
  SPRITE_DEAD: 'assets/game/player/dead.png',
  GAME_FRAME: 0, //initial game frame
  SPRITE_FRAME: 0, //starting frame
  SPRITE_X: 32, //sprite frame size
  SPRITE_Y: 32, //sprite frame size
  SPRITE_POS_X: 100, //starting position
  SPRITE_POS_Y: 440, //starting position
  SOUND_HURT: 'assets/music/effects/destroy.wav'
}

const audio = document.getElementById("bg-music");
const hurtAudio = new Audio(CONSTANTS.SOUND_HURT);
hurtAudio.volume = 0.2;

export default class Player {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.health = CONSTANTS.PLAYER_HEALTH;
    this.spriteAnim = {
      walk: CONSTANTS.SPRITE_WALK,
      run: CONSTANTS.SPRITE_RUN,
      attack: CONSTANTS.SPRITE_ATTACK,
      hurt: CONSTANTS.SPRITE_HURT,
      dead: CONSTANTS.SPRITE_DEAD
    }
    this.playerImg = new Image();
    this.playerImg.src = CONSTANTS.SPRITE_WALK;
  }

  walk() {
    this.playerImg.src = this.spriteAnim.walk;
  }

  run() {
    this.playerImg.src = this.spriteAnim.run;
  }

  hurt() {
    if (!audio.muted) {
      hurtAudio.play()
    }
    this.playerImg.src = this.spriteAnim.hurt;
    this.health -= 10;
    this.position = 0;
    this.hurts = true;
  }

  dead() {
    this.playerImg.src = this.spriteAnim.dead;
  }

  draw(ctx) {
    if (this.outOfHealth() && this.position >= 4){
    } else if (this.hurts && this.position >= 4) {
      this.hurts = false;
      this.walk();
    } else {
      this.position = Math.floor(CONSTANTS.GAME_FRAME/CONSTANTS.PLAYER_SPEED) % 5;
      CONSTANTS.SPRITE_FRAME = CONSTANTS.SPRITE_X * this.position;

    }
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
    if (player.right > enemy.left) {
      return true;
    }
    return false;
  }
}