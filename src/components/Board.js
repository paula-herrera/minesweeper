import React, { useState, useEffect } from 'react';
import createBoard from '../util/createBoard';
import revealed from '../util/reveal';
import Cell from './Cell';
import Modal from './Modal';
import Shiba from '../images/shiba.png'

const Board = () => {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [bombs, setBombs] = useState(10);
  const [grid, setGrid] = useState([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [mineLocations, setMineLocations] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [customRows, setCustomRows] = useState(0);

  useEffect(() => {
    freshBoard(rows, cols, bombs);
  }, [])

  // Create Board
  const freshBoard = (rows, cols, bombs) => {
    const newBoard = createBoard(rows, cols, bombs);
    setGrid(newBoard.board);
    setNonMineCount(rows * cols - bombs);
    setMineLocations(newBoard.mineLocation);
  }

  // On Right Click/Flag or UnFlag Cell
  const updateFlag = (e, x, y) => {
    e.preventDefault();
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].flagged === false) {
      newGrid[x][y].flagged = true;
    } else {
      newGrid[x][y].flagged = false;
    }
    setGrid(newGrid);
  }

  // Change Difficulty/Board
  const changeDifficulty = (r, c, b) => {
    setRows(r);
    setCols(c);
    setBombs(b);
  }

  // Reset Game
  const reset = (r = rows, c = cols, b = bombs) => {
    freshBoard(rows, cols, bombs);
    setGameOver(false);
    setWon(false);
  }

  // Reveal Cell
  const revealCell = (x, y) => {
    if (grid[x][y].revealed || gameOver) {
      return;
    }
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === 'X') {
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }
      setGrid(newGrid);
      setGameOver(true);
    } else {
      let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
      setGrid(newRevealedBoard.arr);
      setNonMineCount(newRevealedBoard.newNonMinesCount);
      if (newRevealedBoard.newNonMinesCount === 0) {
        setWon(true);
        setGameOver(true);
      }
    }
  }

  return (
    <>
      <div>
        <div className="header">
          <div className="shiba">
            <img src={Shiba} alt="Shiba"></img>
          </div>
          <div>
            <h1>Dogesweeper</h1>
          </div>
        </div>
        {/* <Timer /> */}
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'relative' }}>
          {gameOver ? <Modal reset={reset} won={won} /> : <></>}
          {grid.map((singleRow, i1) => {
            return (
              <div style={{ display: "flex" }} key={i1}>
                {singleRow.map((cell, i2) => {
                  return (
                    <Cell
                      details={cell}
                      updateFlag={updateFlag}
                      revealCell={revealCell}
                      key={i2}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="rules">
          <p>Clear the board without finding one of Max's presents to win. Right click on a square if you suspect there's a present there. If you find a present, it's game over.
          </p>
        </div>
        <div className="options">
          <div className="difficulty">
            <h2>Change Difficulty</h2>
            <div className="difficulty-options">
              <div>
                <input
                  type="radio" id="beginner"
                  name="difficulty" value="beginner"
                  onClick={() => changeDifficulty(10, 10, 10)}
                ></input>
                <label htmlFor="beginner">Beginner(10 rows, 10 columns, 10 bombs)</label>
              </div>
              <div>
                <input
                  type="radio" id="intermediate"
                  name="difficulty" value="intermediate"
                  onClick={() => changeDifficulty(16, 16, 40)}
                ></input>
                <label htmlFor="intermediate">Intermediate(16 rows, 16 columns, 40 bombs)</label>
              </div>
              <div>
                <input
                  type="radio" id="expert"
                  name="difficulty" value="expert"
                  onClick={() => changeDifficulty(16, 30, 99)}
                ></input>
                <label htmlFor="expert">Expert(16 rows, 30 columns, 99 bombs)</label>
              </div>
            </div>
            <button onClick={() => reset()}>
              Update Difficulty
            </button>
          </div>
          <div className="custom">
            <h2>Custom Board</h2>
            <div className="custom-options">
              <div>
                <label htmlFor="rows">Rows (10 - 100)</label>
                <input
                  type="number" id="rows"
                  name="rows"
                  min="10" max="100"
                  onChange={(e) => setRows(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="cols">Columns (10 - 100)</label>
                <input
                  type="number" id="cols"
                  name="cols"
                  min="10" max="100"
                  onChange={(e) => setCols(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="cols">Bombs (1 - 9,999)</label>
                <input
                  type="number" id="bombs"
                  name="bombs"
                  min="1" max="9999"
                  onChange={(e) => setBombs(e.target.value)}
                ></input>
              </div>
            </div>
            <button onClick={() => reset()}>
              Create Custom Board
            </button>
          </div>
        </div>
      </div>
      <div className="credits"><p>Created by Paula Herrera | Icons made by <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p></div>
    </>
  );
};

export default Board;