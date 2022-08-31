export default class FillerPiece {
  constructor(player) {
    this.player = player;
    this.highlight = false;
    this.possible = false;
    this.icon = null;
    this.ascii = null;
  }

  canMove(start, end) {
    return false;
  }
}
