const CONFIG = {
  PLAYER_HEALTH: 50,
  PLAYER_SPEED: 7, // Higher number = slower animation
  PLAYER_WIDTH: 64,
  PLAYER_HEIGHT: 64,
  SPRITE_WIDTH: 32,
  SPRITE_HEIGHT: 32,
  SPRITE_POS_X: 100,
  SPRITE_POS_Y: 440,
  DAMAGE_PER_HIT: 10,
  ANIMATION_FRAMES: 5,
  SOUND_HURT: 'assets/music/effects/destroy.wav',
  SPRITES: {
    WALK: 'assets/game/player/walk.png',
    RUN: 'assets/game/player/run.png',
    HURT: 'assets/game/player/hurt.png',
    DEAD: 'assets/game/player/dead.png'
  }
};

// Global animation frame (should ideally be managed by game state)
let globalGameFrame = 0;

const audio = document.getElementById("bg-music");
const hurtAudio = new Audio(CONFIG.SOUND_HURT);
hurtAudio.volume = 0.1;

export default class Player {
  constructor(dimensions, fps) {
    this.dimensions = dimensions;
    this.health = CONFIG.PLAYER_HEALTH;
    this.fps = fps;
    
    // Animation state
    this.frameTimer = 0;
    this.animationFrame = 0;
    this.isRunning = false;
    this.isHurt = false;
    
    // Load sprites
    this.sprites = {};
    Object.entries(CONFIG.SPRITES).forEach(([key, src]) => {
      this.sprites[key] = new Image();
      this.sprites[key].src = src;
    });
    
    // Set initial sprite
    this.currentSprite = this.sprites.WALK;
  }

  walk() {
    this.currentSprite = this.sprites.WALK;
    this.isRunning = false;
  }

  run() {
    this.currentSprite = this.sprites.RUN;
    this.isRunning = true;
  }

  hurt() {
    globalGameFrame = 1;
    if (!audio.muted) {
      hurtAudio.play();
    }
    this.currentSprite = this.sprites.HURT;
    this.health -= CONFIG.DAMAGE_PER_HIT;
    this.isHurt = true;
  }

  dead() {
    globalGameFrame = 0;
    this.currentSprite = this.sprites.DEAD;
  }

  draw(ctx, deltaTime) {
    this.updateAnimation(deltaTime);
    this.drawSprite(ctx);
  }

  updateAnimation(deltaTime) {
    // Handle hurt animation completion
    if (this.isHurt && this.animationFrame >= 4) {
      this.isHurt = false;
      this.isRunning ? this.run() : this.walk();
    }
    
    // Update animation frame timing
    if (this.frameTimer >= this.fps) {
      if (!this.outOfHealth()) {
        this.animationFrame = Math.floor(globalGameFrame / CONFIG.PLAYER_SPEED) % CONFIG.ANIMATION_FRAMES;
        globalGameFrame++;
      }
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  drawSprite(ctx) {
    if (!this.currentSprite.complete) return; // Don't draw if image not loaded
    
    const spriteX = CONFIG.SPRITE_WIDTH * this.animationFrame;
    
    ctx.drawImage(
      this.currentSprite,
      spriteX, 0, // Source position on sprite sheet
      CONFIG.SPRITE_WIDTH, CONFIG.SPRITE_HEIGHT, // Source size
      CONFIG.SPRITE_POS_X, CONFIG.SPRITE_POS_Y, // Destination position
      CONFIG.PLAYER_WIDTH, CONFIG.PLAYER_HEIGHT // Destination size
    );
  }

  outOfHealth() {
    return this.health <= 0;
  }

  bounds() {
    return {
      left: CONFIG.SPRITE_POS_X,
      right: CONFIG.SPRITE_POS_X + CONFIG.PLAYER_WIDTH,
      top: CONFIG.SPRITE_POS_Y,
      bottom: CONFIG.SPRITE_POS_Y + CONFIG.PLAYER_HEIGHT
    };
  }

  // Proper collision detection with all boundaries
  collidesWith(playerBounds, enemyBounds) {
    return !(
      playerBounds.right < enemyBounds.left ||
      playerBounds.left > enemyBounds.right ||
      playerBounds.bottom < enemyBounds.top ||
      playerBounds.top > enemyBounds.bottom
    );
  }

  // Utility methods
  getHealth() {
    return this.health;
  }

  getHealthPercentage() {
    return (this.health / CONFIG.PLAYER_HEALTH) * 100;
  }

  isAlive() {
    return this.health > 0;
  }
}