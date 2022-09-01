export default class FillerPiece {
  player: any;
  highlight: boolean;
  possible: boolean;
  icon: any;
  ascii: any;

  constructor(player: any) {
    this.player = player;
    this.highlight = false;
    this.possible = false;
    this.icon = null;
    this.ascii = null;
  }

  canMove(): boolean {
    return false;
  }
}
