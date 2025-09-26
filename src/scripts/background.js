const CONFIG = {
  BASE_SPEED: 0.5,
  SPEED_MULTIPLIERS: [0, 0.5, 0.7, 0.9], // Parallax effect multipliers
  CANVAS_WIDTH: 1152,
  CANVAS_HEIGHT: 576,
  BACKGROUND_IMAGES: [
    'assets/game/background/nature_2/1.png',
    'assets/game/background/nature_2/2.png', 
    'assets/game/background/nature_5/3.png',
    'assets/game/background/nature_5/4.png'
  ]
};

// Global animation frame for background scrolling
let backgroundGameFrame = 0;
export default class Background {
  constructor(ctx, fps) {
    this.ctx = ctx;
    this.layers = [];
    this.fps = fps;
    this.currentSpeedMultiplier = 1; // For difficulty scaling
    
    this.initializeLayers();
  }

  initializeLayers() {
    CONFIG.BACKGROUND_IMAGES.forEach((imageSrc, index) => {
      const image = new Image();
      image.src = imageSrc;
      
      const layer = new Layer(
        image, 
        this.ctx, 
        CONFIG.SPEED_MULTIPLIERS[index], 
        CONFIG.BASE_SPEED, 
        this.fps
      );
      
      this.layers.push(layer);
    });
  }

  changeSpeed(speedMultiplier) {
    this.currentSpeedMultiplier = speedMultiplier;
    this.layers.forEach((layer) => {
      layer.updateSpeed(speedMultiplier);
    });
  }

  draw(ctx, deltaTime) {
    // Update global frame for all layers
    backgroundGameFrame++;
    
    this.layers.forEach((layer) => {
      layer.update(deltaTime);
      layer.draw();
    });
  }

  // Utility methods
  getSpeed() {
    return this.currentSpeedMultiplier;
  }

  reset() {
    backgroundGameFrame = 0;
    this.currentSpeedMultiplier = 1;
    this.layers.forEach(layer => layer.reset());
  }
}
class Layer {
  constructor(image, ctx, speedMultiplier, baseSpeed, fps) {
    this.x = 0;
    this.y = 0;
    this.ctx = ctx;
    this.width = CONFIG.CANVAS_WIDTH;
    this.height = CONFIG.CANVAS_HEIGHT;
    this.image = image;
    this.speedMultiplier = speedMultiplier;
    this.baseSpeed = baseSpeed;
    this.currentSpeed = baseSpeed * speedMultiplier;
    this.frameTimer = 0;
    this.fps = fps;
  }

  update(deltaTime) {
    if (this.frameTimer >= this.fps) {
      // Calculate scroll position based on global frame and layer speed
      this.x = (backgroundGameFrame * this.currentSpeed) % this.width;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  updateSpeed(globalSpeedMultiplier) {
    this.currentSpeed = this.baseSpeed * this.speedMultiplier * globalSpeedMultiplier;
  }

  draw() {
    if (!this.image.complete) return; // Don't draw if image not loaded
    
    // Draw two copies for seamless scrolling
    this.ctx.drawImage(this.image, -this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.image, -this.x + this.width, this.y, this.width, this.height);
  }

  reset() {
    this.x = 0;
    this.frameTimer = 0;
    this.currentSpeed = this.baseSpeed * this.speedMultiplier;
  }
}