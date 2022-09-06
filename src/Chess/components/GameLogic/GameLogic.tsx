import { useState } from "react";
import FillerPiece from "../../pieces/FillerPiece/FillerPiece";
import Queen from "../../pieces/Queen/Queen";
import MatchInfo from "../MatchInfo/MatchInfo";
import clearHighlight from "../../helpers/clearHighlight";
import clearPossibleHighlight from "../../helpers/clearPossibleHighlight";
import highlightMate from "../../helpers/highlightMate";
import clearCheckHighlight from "../../helpers/clearCheckHighlight";
import { colNums, rowNums } from "../../constants/colsAndRows";
import { white, black } from "../../constants/players";
import initializeBoard from "../../helpers/initializeBoard";

import {
  whiteKing,
  blackKing,
  whiteRook,
  blackRook,
  whitePawn,
  blackPawn,
} from "../../constants/asciis";
import { next, back, nextAtw, backAtw } from "../../constants/histories";
import styles from "../../Game.module.css";
import MakeBoard from "../../helpers/makeBoard";
import checkStaleMate from "../../helpers/checkStaleMate";
import checkInvalidMove from "../../helpers/checkInvalidMove";
import makeMove from "../../helpers/makeMove";

export default function Board(): any {
  const [squares, setSquares] = useState<any>(initializeBoard());
  const [source, setSource] = useState(-1);
  const [turn, setTurn] = useState(white);
  const [trueTurn, setTrueTurn] = useState(white);
  const [turnNum, setTurnNum] = useState(0);
  const [whiteKingHasMoved, setWhiteKingHasMoved] = useState(false);
  const [blackKingHasMoved, setBlackKingHasMoved] = useState(false);
  const [leftBlackRookHasMoved, setLeftBlackRookHasMoved] = useState(false);
  const [rightBlackRookHasMoved, setRightBlackRookHasMoved] = useState(false);
  const [leftWhiteRookHasMoved, setLeftWhiteRookHasMoved] = useState(false);
  const [rightWhiteRookHasMoved, setRightWhiteRookHasMoved] = useState(false);
  const [passantPosition, setPassantPosition] = useState(65);
  const [history, setHistory] = useState([initializeBoard()]);
  const [historyNum, setHistoryNum] = useState(1);
  const [histories, setHistories] = useState<any>({
    historyH1: [null],
    historyH2: [null],
    historyH3: [null],
    historyH4: [null],
  });
  const [mated, setMated] = useState(false);
  const [isWhite, setIsWhite] = useState(true);

  const reset = () => {
    clearHighlight(squares);
    setSquares(initializeBoard());
    setSource(-1);
    setTurn(white);
    setTrueTurn(white);
    setTurnNum(0);
    setWhiteKingHasMoved(false);
    setBlackKingHasMoved(false);
    setLeftBlackRookHasMoved(false);
    setRightBlackRookHasMoved(false);
    setLeftWhiteRookHasMoved(false);
    setRightWhiteRookHasMoved(false);
    setPassantPosition(65);
    setHistory([initializeBoard()]);
    setHistoryNum(1);
    setHistories({
      historyH1: [null],
      historyH2: [null],
      historyH3: [null],
      historyH4: [null],
    });
    setMated(false);
  };

  const executeMove = (
    player: any,
    squares: any[],
    start: number,
    end: number
  ) => {
    let copySquares = squares.slice();

    copySquares = clearHighlight(copySquares);
    copySquares = clearPossibleHighlight(copySquares);
    for (let j = 0; j < 64; j++) {
      if (copySquares[j].ascii === whiteKing) {
        copySquares[j].inCheck = false;
        break;
      }
    }

    if (
      copySquares[start].ascii === (player === white ? whiteKing : blackKing)
    ) {
      if (player === white) {
        setWhiteKingHasMoved(true);
      } else {
        setBlackKingHasMoved(true);
      }
    }
    if (
      copySquares[start].ascii === (player === white ? whiteRook : blackRook)
    ) {
      if (start === (player === white ? 56 : 0)) {
        if (player === white) {
          setLeftWhiteRookHasMoved(true);
        } else {
          setLeftBlackRookHasMoved(true);
        }
      } else if (start === (player === white ? 63 : 7)) {
        if (player === white) {
          setRightWhiteRookHasMoved(true);
        } else {
          setRightBlackRookHasMoved(true);
        }
      }
    }

    copySquares = makeMove(copySquares, start, end, passantPosition);

    let passantTrue =
      player === white
        ? copySquares[end].ascii === whitePawn &&
          start >= 48 &&
          start <= 55 &&
          end - start === -16
        : copySquares[end].ascii === blackPawn &&
          start >= 8 &&
          start <= 15 &&
          end - start === 16;
    let passant = passantTrue ? end : 65;

    if (player === white) {
      copySquares = highlightMate(
        black,
        copySquares,
        checkmate(black, copySquares),
        checkStaleMate(black, copySquares, isCheck, isMoveAvailable)
      );
    } else {
      copySquares = highlightMate(
        white,
        copySquares,
        checkmate(white, copySquares),
        checkStaleMate(white, copySquares, isCheck, isMoveAvailable)
      );
    }

    const copyHistory = history.slice();
    const copyHistoryH1 = histories.historyH1.slice();
    const copyHistoryH2 = histories.historyH2.slice();
    const copyHistoryH3 = histories.historyH3.slice();
    const copyHistoryH4 = histories.historyH4.slice();
    copyHistory.push(copySquares);
    copyHistoryH1.push(start);
    copyHistoryH2.push(end);

    let isKing =
      copySquares[end].ascii === whiteKing ||
      copySquares[end].ascii === blackKing;
    if (isKing && Math.abs(end - start) === 2) {
      if (end === (copySquares[end].ascii === whiteKing ? 62 : 6)) {
        copyHistoryH3.push(end - 1);
        copyHistoryH4.push(end + 1);
      } else if (end === (copySquares[end].ascii === whiteKing ? 58 : 2)) {
        copyHistoryH3.push(end + 1);
        copyHistoryH4.push(end - 2);
      }
    } else {
      copyHistoryH3.push(null);
      copyHistoryH4.push(null);
    }

    let checkMated =
      checkmate(white, copySquares) || checkmate(black, copySquares);
    let staleMated =
      (checkStaleMate(white, copySquares, isCheck, isMoveAvailable) &&
        player === black) ||
      (checkStaleMate(black, copySquares, isCheck, isMoveAvailable) &&
        player === white);

    setPassantPosition(passant);
    setHistory(copyHistory);
    setHistoryNum(historyNum + 1);
    setHistories({
      historyH1: copyHistoryH1,
      historyH2: copyHistoryH2,
      historyH3: copyHistoryH3,
      historyH4: copyHistoryH4,
    });
    setSquares(copySquares);
    setSource(-1);
    setTurnNum(turnNum + 1);
    setMated(checkMated || staleMated ? true : false);
    setTurn(player === black ? white : black);
    setTrueTurn(player === black ? white : black);
  };

  const isMoveAvailable = (
    start: number,
    end: number,
    squares: any[],
    passantPos?: number
  ) => {
    const copySquares = squares.slice();
    if (start === end) return false;

    let player = copySquares[start].player;
    if (
      player === copySquares[end].player ||
      !copySquares[start].canMove(start, end)
    )
      return false;
    if (
      checkInvalidMove(
        start,
        end,
        copySquares,
        passantPosition,
        whiteKingHasMoved,
        blackKingHasMoved,
        rightWhiteRookHasMoved,
        leftWhiteRookHasMoved,
        rightBlackRookHasMoved,
        leftBlackRookHasMoved,
        passantPos
      )
    )
      return false;

    let cantCastle =
      copySquares[start].ascii === (player === white ? whiteKing : blackKing) &&
      Math.abs(end - start) === 2 &&
      isCheck(player, copySquares);
    if (cantCastle) return false;

    if (
      copySquares[start].ascii === (player === white ? whiteKing : blackKing) &&
      Math.abs(end - start) === 2
    ) {
      let deltaPos = end - start;
      const testSquares = squares.slice();
      testSquares[start + (deltaPos === 2 ? 1 : -1)] = testSquares[start];
      testSquares[start] = new FillerPiece(null);
      if (isCheck(player, testSquares)) return false;
    }

    const checkSquares = squares.slice();
    checkSquares[end] = checkSquares[start];
    checkSquares[start] = new FillerPiece(null);
    if (checkSquares[end].ascii === whitePawn && end >= 0 && end <= 7) {
      checkSquares[end] = new Queen(white);
    } else if (
      checkSquares[end].ascii === blackPawn &&
      end >= 56 &&
      end <= 63
    ) {
      checkSquares[end] = new Queen(black);
    }
    if (isCheck(player, checkSquares)) return false;

    return true;
  };

  const isCheck = (player: any, squares: any[]) => {
    let king = player === white ? whiteKing : blackKing;
    let positionOfKing = null;
    const copySquares = squares.slice();
    for (let i = 0; i < 64; i++) {
      if (copySquares[i].ascii === king) {
        positionOfKing = i;
        break;
      }
    }

    for (let i = 0; i < 64; i++) {
      if (copySquares[i].player !== player) {
        if (
          copySquares[i].canMove(i, positionOfKing) &&
          !checkInvalidMove(
            i,
            positionOfKing,
            copySquares,
            passantPosition,
            whiteKingHasMoved,
            blackKingHasMoved,
            rightWhiteRookHasMoved,
            leftWhiteRookHasMoved,
            rightBlackRookHasMoved,
            leftBlackRookHasMoved
          )
        )
          return true;
      }
    }
    return false;
  };

  const checkmate = (player: any, squares: any[]) => {
    if (!isCheck(player, squares)) return false;
    for (let i = 0; i < 64; i++) {
      if (squares[i].player === player) {
        for (let j = 0; j < 64; j++) {
          if (isMoveAvailable(i, j, squares)) return false;
        }
      }
    }
    return true;
  };

  const handleClick = (i: number) => {
    let copySquares = squares.slice();

    if (historyNum - 1 !== turnNum) {
      return null;
    }

    if (mated) {
      return null;
    }

    if (source === -1) {
      if (copySquares[i].player !== turn) {
        return -1;
      }

      if (copySquares[i].player !== null) {
        copySquares = clearCheckHighlight(copySquares, white);
        copySquares[i].highlight = true;

        for (let j = 0; j < 64; j++) {
          if (isMoveAvailable(i, j, copySquares)) {
            copySquares[j].possible = true;
          }
        }

        setSource(i);
        setSquares(copySquares);
      }
    }

    if (source > -1) {
      let cannibalism = copySquares[i].player === turn;
      if (cannibalism && source !== i) {
        copySquares[i].highlight = true;
        copySquares[source].highlight = false;
        copySquares = clearPossibleHighlight(copySquares);
        for (let j = 0; j < 64; j++) {
          if (isMoveAvailable(i, j, copySquares))
            copySquares[j].possible = true;
        }
        setSource(i);
        setSquares(copySquares);
      } else {
        if (!isMoveAvailable(source, i, copySquares)) {
          copySquares[source].highlight = false;
          copySquares = clearPossibleHighlight(copySquares);
          if (i !== source && isCheck(white, copySquares)) {
            for (let j = 0; j < 64; j++) {
              if (copySquares[j].ascii === whiteKing) {
                copySquares[j].inCheck = true;
                break;
              }
            }
          }
          setSource(-1);
          setSquares(copySquares);
          return null;
        }
        executeMove(turn, copySquares, source, i);
      }
    }
  };

  const board = MakeBoard(
    isWhite,
    squares,
    turn,
    mated,
    historyNum,
    turnNum,
    handleClick
  );

  const viewHistory = (direction: any) => {
    let copySquares = null;

    if (direction === backAtw) {
      copySquares = history[0].slice();
    } else if (direction === nextAtw && historyNum < turnNum + 1) {
      copySquares = history[turnNum].slice();
    } else if (direction === back && historyNum - 2 >= 0) {
      copySquares = history[historyNum - 2].slice();
    } else if (direction === next && historyNum <= turnNum) {
      copySquares = history[historyNum].slice();
    }

    copySquares = clearPossibleHighlight(copySquares);
    copySquares = clearHighlight(copySquares);
    for (let j = 0; j < 64; j++) {
      if (copySquares[j].ascii === (turn === white ? whiteKing : blackKing)) {
        copySquares[j].inCheck = false;
        copySquares[j].checked = 0;
        break;
      }
    }

    let stale =
      checkStaleMate(trueTurn, copySquares, isCheck, isMoveAvailable) &&
      turn !== trueTurn;
    copySquares = highlightMate(
      trueTurn,
      copySquares,
      checkmate(trueTurn, copySquares),
      stale
    );

    let index = null;
    if (direction === back) {
      index = historyNum - 2;
    } else if (direction === next) {
      index = historyNum;
    } else if (direction === nextAtw) {
      index = turnNum;
    }

    if (index !== 0 && index != null) {
      if (histories.historyH1[index] != null) {
        copySquares[histories.historyH1[index]].highlight = true;
        copySquares[histories.historyH2[index]].highlight = true;
      }
      if (histories.historyH3[index] != null) {
        copySquares[histories.historyH3[index]].highlight = true;
        copySquares[histories.historyH4[index]].highlight = true;
      }
    }

    let newHistoryNum = direction === back ? historyNum - 1 : historyNum + 1;
    if (direction === backAtw) {
      newHistoryNum = 1;
    }

    if (direction === nextAtw) {
      newHistoryNum = turnNum + 1;
    }

    setSquares(copySquares);
    setHistoryNum(newHistoryNum);
    setTurn(turn === white ? black : white);

    if (direction === backAtw || direction === nextAtw) {
      setTurn(direction === backAtw ? white : trueTurn);
    }
  };

  return (
    <div className={styles.game}>
      <div>
        <div className={styles.board}>
          <div className={styles.row_label}> {rowNums} </div>
          <div>
            <div className={styles.table}> {board}</div>
            <div className={styles.col_label}> {colNums} </div>
          </div>
        </div>
        <MatchInfo
          backAtw={() => viewHistory(backAtw)}
          back={() => viewHistory(back)}
          reset={() => reset()}
          next={() => viewHistory(next)}
          nextAtw={() => viewHistory(nextAtw)}
        />
      </div>
      <div>
        <button onClick={() => setIsWhite(!isWhite)}>Reverse</button>
      </div>
    </div>
  );
}
