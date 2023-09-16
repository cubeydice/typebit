const CONSTANTS = {
  PLAYER_SPEED: 0,
  PLAYER_HEALTH: 100,
  PLAYER_WIDTH: 0,
  PLAYER_HEIGHT: 0
}

export default class Player {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = PLAYER_WIDTH;
    this.y = PLAYER_HEIGHT;
    this.speed = PLAYER_SPEED;
    this.health = PLAYER_HEALTH;
  }

  walk() {
    //animation for slow typing speed
  }

  run() {
    //animation for moderate typing speed
  }

  sprint() {
    //animation for fast typing speed
  }

  attack() {
    //animation to be played when fail to destroy enemy
  }

  hurt() {
    //animation and decrease in health for when inaccurate typing is detected
  }

  animate(ctx) {
    this.walk();
  }
}