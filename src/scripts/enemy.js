const CONSTANTS = {
  ENEMY_SPEED: 0
}
export default class Enemy {
  constructor(dimensions) {
    this.dimensions = dimensions;
  }

  animate(ctx) {

  }

  move() {
    //animation for movement
  }

  destroy() {
    //animation and logic for when enemy is destroyed
  }

  words() {
    //quote to be displayed above enemy head
    //if all typed, then enemy is destroyed
  }
}