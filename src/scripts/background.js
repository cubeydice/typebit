const CONSTANTS = {
  GAME_SPEED: 1,
  GAME_FRAME: 0,
  SPEED_MODS: [0, 0.5, 0.7, 0.9],
  WIDTH: 1152,
  HEIGHT: 576,
}
export default class Background {
  constructor(ctx, fps) {
    // this.createImage = this.createImage.bind(this)
    this.ctx = ctx;
    this.bg = ['assets/game/background/nature_2/1.png',
          'assets/game/background/nature_2/2.png',
          'assets/game/background/nature_5/3.png',
          'assets/game/background/nature_5/4.png'];
    this.layers = [];
    this.fps = fps;

    let i = 0
    this.bg.forEach(img => {
      const image = new Image();
      image.src = img;
      this.layers.push(new Layer(image, this.ctx, CONSTANTS.SPEED_MODS[i], CONSTANTS.GAME_SPEED, this.fps));
      i++;
    })
  }

  changeSpeed(speed) {
    this.layers.forEach((layer) => {
      layer.changeSpeed(speed);
    })
  }

  draw(ctx, deltaTime) {
    this.layers.forEach((layer) => {
      layer.update(deltaTime);
      layer.draw();
    })
  }
}
class Layer {
  constructor(img, ctx, speedMod, speed, fps) {
    this.x = 0;
    this.y = 0;
    this.ctx = ctx;
    this.width = CONSTANTS.WIDTH;
    this.height = CONSTANTS.HEIGHT;
    this.img = img;
    this.speedMod = speedMod;
    this.speed = speed * this.speedMod
    this.draw = this.draw.bind(this)
    this.frameTimer = 0;
    this.fps = fps;
  }

  update(deltaTime) {
    // this.speed = CONSTANTS.GAME_SPEED * this.speedMod
    if (this.frameTimer > this.fps) {
      this.x = CONSTANTS.GAME_FRAME * this.speed % (this.width);
      this.frameTimer = 0;
      CONSTANTS.GAME_FRAME--
    } else {
      this.frameTimer += deltaTime;
    }
  }

  changeSpeed(speed) {
    this.speed = speed;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    this.ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height)
  }
}