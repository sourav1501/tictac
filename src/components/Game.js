import React, { Component } from 'react'
import Board from './Board';

export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        isAsce: true
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0
      });
    }
  
    reverseMoves() {
      this.setState({
        isAsce: !this.state.isAsce
      });
    }
  
    render() {
      const history = this.state.history;
  
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const isCurrent = this.state.stepNumber === move;
        const desc = move ? "Go to  #" + move : "Go to game start";
  
        return (
        
          <li key={move}>
            <button
              className={isCurrent ? "bold" : ""}
              onClick={() => this.jumpTo(move)}
            >
              {desc}
            </button>
          </li>
        );
      });
  
      let status;
      let winPos;
      if (winner) {
        status = "Winner: " + winner.winner;
        winPos = winner.winPos;
       
      } else if (!current.squares.includes(null) && !winner) {
        status = "It's a draw!";
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              winningPos={winPos}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{this.state.isAsce ? moves : moves.reverse()}</ol>
          </div>
        </div>
      );
    }
  }
  
  
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],
          winPos: lines[i]
        };
      }
    }
    return null;
  }
  