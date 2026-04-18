const CONSTANTS = {
  PLAYER_HEALTH: 50,
  ANIM_RATE: 8,           // animation frames per second (base walk speed)
  FRAME_COUNT: 5,
  PLAYER_WIDTH: 64,
  PLAYER_HEIGHT: 64,
  SPRITE_WALK: 'assets/game/player/walk.png',
  SPRITE_RUN: 'assets/game/player/run.png',
  SPRITE_HURT: 'assets/game/player/hurt.png',
  SPRITE_DEAD: 'assets/game/player/dead.png',
  SPRITE_X: 32,
  SPRITE_Y: 32,
  SPRITE_POS_X: 100,
  SPRITE_POS_Y: 440,
  SOUND_HURT: 'assets/music/effects/destroy.wav'
}

const audio = document.getElementById("bg-music");
const hurtAudio = new Audio(CONSTANTS.SOUND_HURT);
hurtAudio.volume = 0.1;

export default class Player {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.health = CONSTANTS.PLAYER_HEALTH;
    this.spriteAnim = {
      walk: CONSTANTS.SPRITE_WALK,
      run: CONSTANTS.SPRITE_RUN,
      hurt: CONSTANTS.SPRITE_HURT,
      dead: CONSTANTS.SPRITE_DEAD
    };
    this.playerImg = new Image();
    this.playerImg.src = CONSTANTS.SPRITE_WALK;
    this.frameDuration = 1 / CONSTANTS.ANIM_RATE; // seconds per animation frame
    this.frameTimer = 0;
    this.frame = 0;
    this.running = false;
    this.hurts = false;
  }

  walk() {
    this.playerImg.src = this.spriteAnim.walk;
    this.running = false;
  }

  run() {
    this.playerImg.src = this.spriteAnim.run;
    this.running = true;
  }

  hurt() {
    this.frame = 0;
    if (!audio.muted) hurtAudio.play();
    this.playerImg.src = this.spriteAnim.hurt;
    this.health -= 10;
    this.hurts = true;
  }

  dead() {
    this.frame = 0;
    this.playerImg.src = this.spriteAnim.dead;
  }

  update(deltaTime) {
    this.frameTimer += deltaTime;
    while (this.frameTimer >= this.frameDuration) {
      this.frameTimer -= this.frameDuration;
      this._advanceFrame();
    }
  }

  _advanceFrame() {
    // Hold on the last frame of the death animation
    if (this.outOfHealth() && this.frame >= CONSTANTS.FRAME_COUNT - 1) return;

    this.frame = (this.frame + 1) % CONSTANTS.FRAME_COUNT;

    // When hurt animation completes a full cycle, return to normal locomotion
    if (this.hurts && this.frame === 0) {
      this.hurts = false;
      !this.running ? this.walk() : this.run();
    }
  }

  draw(ctx) {
    const spriteX = CONSTANTS.SPRITE_X * this.frame;
    ctx.drawImage(
      this.playerImg,
      spriteX, 0,
      CONSTANTS.SPRITE_X, CONSTANTS.SPRITE_Y,
      CONSTANTS.SPRITE_POS_X, CONSTANTS.SPRITE_POS_Y,
      CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT
    );
  }

  outOfHealth() {
    return this.health <= 0;
  }

  bounds() {
    return {
      left: CONSTANTS.SPRITE_POS_X,
      right: CONSTANTS.SPRITE_POS_X + CONSTANTS.PLAYER_WIDTH,
      top: CONSTANTS.SPRITE_POS_Y,
      bottom: CONSTANTS.SPRITE_POS_Y + CONSTANTS.PLAYER_HEIGHT
    };
  }

  collidesWith(player, enemy) {
    return player.right > enemy.left;
  }
}
