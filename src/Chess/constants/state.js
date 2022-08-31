import initializeBoard from "../helpers/initializeBoard";
import { white } from "./players";

export const state = {
  squares: initializeBoard(),
  source: -1,
  turn: white,
  trueTurn: white,
  turnNum: 0,
  whiteKingHasMoved: false,
  blackKingHasMoved: false,
  leftBlackRookHasMoved: false,
  rightBlackRookHasMoved: false,
  leftWhiteRookHasMoved: false,
  rightWhiteRookHasMoved: false,
  passantPos: 65,
  history: [initializeBoard()],
  historyNum: 1,
  historyH1: [null],
  historyH2: [null],
  historyH3: [null],
  historyH4: [null],
  mated: false,
};
