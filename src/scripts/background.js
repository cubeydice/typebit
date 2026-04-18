const CONSTANTS = {
  GAME_SPEED: 120,              // pixels per second (base scroll speed)
  SPEED_MODS: [0, 0.5, 0.7, 0.9],
  WIDTH: 1152,
  HEIGHT: 576,
}

export default class Background {
  constructor(ctx) {
    this.ctx = ctx;
    const sources = [
      'assets/game/background/nature_2/1.png',
      'assets/game/background/nature_2/2.png',
      'assets/game/background/nature_5/3.png',
      'assets/game/background/nature_5/4.png'
    ];

    this.layers = sources.map((src, i) => {
      const image = new Image();
      image.src = src;
      return new Layer(image, this.ctx, CONSTANTS.SPEED_MODS[i], CONSTANTS.GAME_SPEED);
    });
  }

  changeSpeed(speed) {
    this.layers.forEach(layer => layer.changeSpeed(speed));
  }

  update(deltaTime) {
    this.layers.forEach(layer => layer.update(deltaTime));
  }

  draw() {
    this.layers.forEach(layer => layer.draw());
  }
}

class Layer {
  constructor(img, ctx, speedMod, speed) {
    this.x = 0;
    this.y = 0;
    this.ctx = ctx;
    this.width = CONSTANTS.WIDTH;
    this.height = CONSTANTS.HEIGHT;
    this.img = img;
    this.speedMod = speedMod;
    this.speed = speed * this.speedMod; // pixels per second
  }

  update(deltaTime) {
    this.x = (this.x - this.speed * deltaTime) % this.width;
  }

  changeSpeed(speed) {
    this.speed = speed * this.speedMod;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);
  }
}
