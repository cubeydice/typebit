const CONSTANTS = {
  GAME_SPEED: 5,
  X: 0,
  X2: 20,
  X3: 40,
  X4: 60
}
export default class Background {
  constructor() {
    this.createImage = this.createImage.bind(this)
    this.bg = ['assets/game/background/nature_2/1.png',
          'assets/game/background/nature_2/2.png',
          'assets/game/background/nature_2/3.png',
          'assets/game/background/nature_2/4.png' ]
  }

  animate(ctx, dimensions) {
    console.log(this)
    this.createImage(this.bg[0], ctx, CONSTANTS.X, dimensions)
    this.createImage(this.bg[1], ctx, CONSTANTS.X, dimensions)
    this.createImage(this.bg[2], ctx, CONSTANTS.X, dimensions)
    this.createImage(this.bg[3], ctx, CONSTANTS.X, dimensions)


    // requestAnimationFrame(this.animate.bind(this, ctx, dimensions));
  }


  createImage(url, ctx, x, dimensions) {
    const img = new Image();
    if (x < -dimensions.width) x = dimensions.width;
    x -= CONSTANTS.GAME_SPEED;
    img.onload = function() {
      ctx.drawImage(img, x, 0, dimensions.width, dimensions.height);
    }
    img.src = url;
    return img;
  }
}

