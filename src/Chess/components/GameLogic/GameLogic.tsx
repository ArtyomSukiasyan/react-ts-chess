import React, { useState } from "react";
import FillerPiece from "../../pieces/FillerPiece/FillerPiece";
import Queen from "../../pieces/Queen/Queen";
import Rook from "../../pieces/Rook/Rook";
import Bishop from "../../pieces/Bishop/Bishop";
import Knight from "../../pieces/Knight/Knight";
import Square from "../Squares/Squares";
import MatchInfo from "../MatchInfo/MatchInfo";
import calcSquareColor from "../../helpers/calcSquareColor";
import clearHighlight from "../../helpers/clearHighlight";
import clearPossibleHighlight from "../../helpers/clearPossibleHighlight";
import highlightMate from "../../helpers/highlightMate";
import clearCheckHighlight from "../../helpers/clearCheckHighlight";
import castlingAllowed from "../../helpers/castlingAllowed";
import { colNums, rowNums } from "../../constants/colsAndRows";
import { white, black } from "../../constants/players";
import initializeBoard from "../../helpers/initializeBoard";

import {
  whiteKing,
  blackKing,
  whiteQueen,
  blackQueen,
  whiteRook,
  blackRook,
  whiteBishop,
  blackBishop,
  whitePawn,
  blackPawn,
} from "../../constants/asciis";
import { next, back, nextAtw, backAtw } from "../../constants/histories";
import styles from "../../Game.module.css";
import blockersExist from "../../helpers/blockerExist";
import canEnpassant from "../../helpers/canEnpassant";

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
  const [historyH1, setHistoryH1] = useState<any>([null]);
  const [historyH2, setHistoryH2] = useState<any>([null]);
  const [historyH3, setHistoryH3] = useState<any>([null]);
  const [historyH4, setHistoryH4] = useState<any>([null]);
  const [mated, setMated] = useState(false);

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
    setHistoryH1([null]);
    setHistoryH2([null]);
    setHistoryH3([null]);
    setHistoryH4([null]);
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

    copySquares = makeMove(copySquares, start, end);

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
        stalemate(black, copySquares)
      );
    } else {
      copySquares = highlightMate(
        white,
        copySquares,
        checkmate(white, copySquares),
        stalemate(white, copySquares)
      );
    }

    const copyHistory = history.slice();
    const copyHistoryH1 = historyH1.slice();
    const copyHistoryH2 = historyH2.slice();
    const copyHistoryH3 = historyH3.slice();
    const copyHistoryH4 = historyH4.slice();
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
      (stalemate(white, copySquares) && player === black) ||
      (stalemate(black, copySquares) && player === white);

    setPassantPosition(passant);
    setHistory(copyHistory);
    setHistoryNum(historyNum + 1);
    setHistoryH1(copyHistoryH1);
    setHistoryH2(copyHistoryH2);
    setHistoryH3(copyHistoryH3);
    setHistoryH4(copyHistoryH4);
    setSquares(copySquares);
    setSource(-1);
    setTurnNum(turnNum + 1);
    setMated(checkMated || staleMated ? true : false);
    setTurn(player === black ? white : black);
    setTrueTurn(player === black ? white : black);
  };

  const makeMove = (squares: any, start: any, end: any, passantPos?: any) => {
    const copySquares = squares.slice();
    let isKing =
      copySquares[start].ascii === whiteKing ||
      copySquares[start].ascii === blackKing;
    if (isKing && Math.abs(end - start) === 2) {
      if (end === (copySquares[start].ascii === whiteKing ? 62 : 6)) {
        copySquares[end - 1] = copySquares[end + 1];
        copySquares[end - 1].highlight = true;
        copySquares[end + 1] = new FillerPiece(null);
        copySquares[end + 1].highlight = true;
      } else if (end === (copySquares[start].ascii === whiteKing ? 58 : 2)) {
        copySquares[end + 1] = copySquares[end - 2];
        copySquares[end + 1].highlight = true;
        copySquares[end - 2] = new FillerPiece(null);
        copySquares[end - 2].highlight = true;
      }
    }

    let passant = passantPos == null ? passantPosition : passantPos;
    if (
      copySquares[start].ascii === whitePawn ||
      copySquares[start].ascii === blackPawn
    ) {
      if (end - start === -7 || end - start === 9) {
        if (start + 1 === passant)
          copySquares[start + 1] = new FillerPiece(null);
      } else if (end - start === -9 || end - start === 7) {
        if (start - 1 === passant)
          copySquares[start - 1] = new FillerPiece(null);
      }
    }

    copySquares[end] = copySquares[start];
    copySquares[end].highlight = true;
    copySquares[start] = new FillerPiece(null);
    copySquares[start].highlight = true;

    if (copySquares[end].ascii === whitePawn && end >= 0 && end <= 7) {
      const figure = prompt(
        "please, select 'queen', 'rook', 'bishop' or 'knight'"
      );
      if (figure === "queen") {
        copySquares[end] = new Queen(white);
      } else if (figure === "rook") {
        copySquares[end] = new Rook(white);
      } else if (figure === "bishop") {
        copySquares[end] = new Bishop(white);
      } else if (figure === "knight") {
        copySquares[end] = new Knight(white);
      }
      copySquares[end].highlight = true;
    }
    if (copySquares[end].ascii === blackPawn && end >= 56 && end <= 63) {
      const figure = prompt(
        "please, select 'queen', 'rook', 'bishop' or 'knight'"
      );
      if (figure === "queen") {
        copySquares[end] = new Queen(black);
      } else if (figure === "rook") {
        copySquares[end] = new Rook(black);
      } else if (figure === "bishop") {
        copySquares[end] = new Bishop(black);
      } else if (figure === "knight") {
        copySquares[end] = new Knight(black);
      }
      copySquares[end].highlight = true;
    }
    return copySquares;
  };

  const isInvalidMove = (
    start: number,
    end: any,
    squares: any,
    passantPos?: number
  ) => {
    const copySquares = squares.slice();
    let bqrpk =
      copySquares[start].ascii === whiteRook ||
      copySquares[start].ascii === blackRook ||
      copySquares[start].ascii === whiteQueen ||
      copySquares[start].ascii === blackQueen ||
      copySquares[start].ascii === whiteBishop ||
      copySquares[start].ascii === blackBishop ||
      copySquares[start].ascii === whitePawn ||
      copySquares[start].ascii === blackPawn ||
      copySquares[start].ascii === whiteKing ||
      copySquares[start].ascii === blackKing;
    let invalid = bqrpk && blockersExist(start, end, copySquares);
    if (invalid) return invalid;
    let pawn =
      copySquares[start].ascii === whitePawn ||
      copySquares[start].ascii === blackPawn;
    invalid =
      pawn &&
      !canEnpassant(start, end, copySquares, passantPosition, passantPos);
    if (invalid) return invalid;
    let king = copySquares[start].ascii.toLowerCase() === whiteKing;
    if (king && Math.abs(end - start) === 2)
      invalid = !castlingAllowed(
        start,
        end,
        copySquares,
        whiteKingHasMoved,
        blackKingHasMoved,
        rightWhiteRookHasMoved,
        leftWhiteRookHasMoved,
        rightBlackRookHasMoved,
        leftBlackRookHasMoved
      );

    return invalid;
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
    if (isInvalidMove(start, end, copySquares, passantPos)) return false;

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
          !isInvalidMove(i, positionOfKing, copySquares)
        )
          return true;
      }
    }
    return false;
  };

  const stalemate = (player: any, squares: any[]) => {
    if (isCheck(player, squares)) return false;

    for (let i = 0; i < 64; i++) {
      if (squares[i].player === player) {
        for (let j = 0; j < 64; j++) {
          if (isMoveAvailable(i, j, squares)) return false;
        }
      }
    }
    return true;
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

    if (mated) return null;

    if (source === -1) {
      if (copySquares[i].player !== turn) return -1;

      if (copySquares[i].player !== null) {
        copySquares = clearCheckHighlight(copySquares, white);
        copySquares[i].highlight = true;

        for (let j = 0; j < 64; j++) {
          if (isMoveAvailable(i, j, copySquares))
            copySquares[j].possible = true;
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

  const board = [];
  for (let i = 0; i < 8; i++) {
    const squareRows = [];
    for (let j = 0; j < 8; j++) {
      const copySquares = squares.slice();
      let squareColor = calcSquareColor(i, j, copySquares);
      let squareCursor = styles.pointer;
      if (copySquares[i * 8 + j].player !== turn) {
        squareCursor = styles.default;
      }

      if (mated) {
        squareCursor = styles.default;
      }

      if (historyNum - 1 !== turnNum) {
        squareCursor = styles.not_allowed;
      }

      squareRows.push(
        <Square
          value={copySquares[i * 8 + j]}
          color={squareColor}
          cursor={squareCursor}
          onClick={() => handleClick(i * 8 + j)}
          key={i * 8 + j}
        />
      );
    }
    board.push(<div key={i + 64}>{squareRows}</div>);
  }

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

    let stale = stalemate(trueTurn, copySquares) && turn !== trueTurn;
    copySquares = highlightMate(
      trueTurn,
      copySquares,
      checkmate(trueTurn, copySquares),
      stale
    );

    let index = null;
    if (direction === back) index = historyNum - 2;
    else if (direction === next) index = historyNum;
    else if (direction === nextAtw) index = turnNum;

    if (index !== 0 && index != null) {
      if (historyH1[index] != null) {
        copySquares[historyH1[index]].highlight = true;
        copySquares[historyH2[index]].highlight = true;
      }
      if (historyH3[index] != null) {
        copySquares[historyH3[index]].highlight = true;
        copySquares[historyH4[index]].highlight = true;
      }
    }

    let newHistoryNum = direction === back ? historyNum - 1 : historyNum + 1;
    if (direction === backAtw) newHistoryNum = 1;
    if (direction === nextAtw) newHistoryNum = turnNum + 1;

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
    </div>
  );
}
