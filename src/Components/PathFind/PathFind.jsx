import React, { useEffect, useState } from 'react';
import './PathFind.css';
import Node from '../Node/Node';
import dfs from '../../Algorithms/Dfs';
import Bfs from '../../Algorithms/Bfs';
import multiSrcBfs from '../../Algorithms/Multi-src-bfs';
import dijkstra from '../../Algorithms/Dijkstra';
const rows = 15;
const cols = 35;
// const start_row = 10,
//   start_col = 10,
//   end_row = 7,
//   end_col = 24;

const PathFind = () => {
  //Main grid that holds object structure
  const [grid, setGrid] = useState([]);

  // Walls
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  // Algo select dropdown
  const [algoSelect, setAlgoSelect] = useState('DFS');

  // Add wall state for button "Add walls" and store startnode and endnode
  const [isWall, setIsWall] = useState(false);
  const [start_row, setStart_row] = useState(10);
  const [start_col, setStart_col] = useState(10);
  const [end_row, setEnd_row] = useState(7);
  const [end_col, setEnd_col] = useState(24);
  const [changingStart, setChangingStart] = useState(false);
  const [changingEnd, setChangingEnd] = useState(false);

  let tempGrid = [];

  const isValid = (i, j) => {
    return i >= 0 && i < rows && j >= 0 && j < cols;
  };

  const populateNeighbours = (i, j, grid) => {
    const x = [-1, 0, 1, 0];
    const y = [0, 1, 0, -1];
    let neh = [];
    for (let k = 0; k < 4; k++) {
      let nr = i + x[k],
        nc = j + y[k];
      if (isValid(nr, nc)) {
        neh.push(grid[nr][nc]);
      }
    }
    return neh;
  };

  //Run this before component render to init grid
  const initGrid = () => {
    for (let i = 0; i < rows; i++) {
      let currNodes = [];
      for (let j = 0; j < cols; j++) {
        currNodes[j] = {
          isStart: i === start_row && j === start_col,
          isEnd: i === end_row && j === end_col,
          isVis: false,
          row: i,
          col: j,
          weight: i === start_row && j === start_col ? 0 : Infinity,
          wall: false,
          neighbours: [],
          src: -1,
        };
      }
      tempGrid.push(currNodes);
    }

    // Add neightbours of the current nodes so we dont have to perform this calculation
    // while writing the algorithms
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        tempGrid[i][j].neighbours = populateNeighbours(i, j, tempGrid);
      }
    }
    setGrid(tempGrid);
  };

  const visualizeShortestPath = (path) => {
    for (let i = 0; i < path.length; i++) {
      if (
        (path[i].row === start_row && path[i].col === start_col) ||
        (path[i].col === end_col && path[i].row === end_row)
      ) {
        continue;
      }
      setTimeout(() => {
        document.getElementById(
          `cell-${path[i].row}-${path[i].col}`
        ).className = 'node node-shortest-path';
      }, 10 * i);
    }
  };

  const handleVisualizeAlgo = () => {
    let visitedInOrder, pathFound, path;
    switch (algoSelect) {
      case 'DFS':
        let dfsObj;
        dfsObj = dfs(grid[start_row][start_col]);
        visitedInOrder = dfsObj.visitedInOrder;
        pathFound = dfsObj.pathFound;
        path = dfsObj.path;
        break;
      case 'BFS':
        let bfsObj;
        bfsObj = Bfs(grid[start_row][start_col]);
        visitedInOrder = bfsObj.visitedInOrder;
        pathFound = bfsObj.pathFound;
        path = bfsObj.path;
        break;
      case 'Multi-Source-BFS':
        let multiSrc;
        multiSrc = multiSrcBfs(
          grid[start_row][start_col],
          grid[end_row][end_col]
        );
        visitedInOrder = multiSrc.visitedInOrder;
        pathFound = multiSrc.pathFound;
        path = multiSrc.path;
        break;
      case 'Dijkstra':
        let dij;
        dij = dijkstra(grid[start_row][start_col]);
        visitedInOrder = dij.visitedInOrder;
        pathFound = dij.pathFound;
        path = dij.path;
        break;
      default:
        break;
    }

    for (let i = 0; i <= visitedInOrder.length; i++) {
      if (i === visitedInOrder.length) {
        setTimeout(() => {
          visualizeShortestPath(path);
        }, 20 * i);
      } else if (
        (visitedInOrder[i].row === start_row &&
          visitedInOrder[i].col === start_col) ||
        (visitedInOrder[i].col === end_col && visitedInOrder[i].row === end_row)
      ) {
        continue;
      } else {
        setTimeout(() => {
          document.getElementById(
            `cell-${visitedInOrder[i].row}-${visitedInOrder[i].col}`
          ).className = 'node node-visited';
        }, 20 * i);
      }
    }
  };

  const handleReset = () => {
    let tempGrid2 = grid;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (i === start_row && j === start_col) {
          document.getElementById(
            `cell-${grid[i][j].row}-${grid[i][j].col}`
          ).className = 'node node-start';
        } else if (i === end_row && j === end_col) {
          document.getElementById(
            `cell-${grid[i][j].row}-${grid[i][j].col}`
          ).className = 'node node-end';
        } else {
          document.getElementById(
            `cell-${grid[i][j].row}-${grid[i][j].col}`
          ).className = 'node';
        }
        tempGrid2[i][j].wall = false;
        tempGrid2[i][j].isVis = false;
        tempGrid2[i][j].src = -1;
      }
    }
  };

  const onMouseDown = (row, col) => {
    if (!isWall) {
      if (
        document
          .getElementById(`cell-${grid[row][col].row}-${grid[row][col].col}`)
          .className.localeCompare('node node-start') === 0
      ) {
        setChangingStart(true);
        setMouseIsPressed(true);
      } else if (
        document
          .getElementById(`cell-${grid[row][col].row}-${grid[row][col].col}`)
          .className.localeCompare('node node-end') === 0
      ) {
        setChangingEnd(true);
        setMouseIsPressed(true);
      }
    } else {
      tempGrid = grid;
      tempGrid[row][col].wall = !tempGrid[row][col].wall;
      if (tempGrid[row][col].wall) {
        document.getElementById(
          `cell-${grid[row][col].row}-${grid[row][col].col}`
        ).className = 'node node-wall';
      } else {
        document.getElementById(
          `cell-${grid[row][col].row}-${grid[row][col].col}`
        ).className = 'node';
      }
      setGrid(tempGrid);
      setMouseIsPressed(true);
    }
  };
  const onMouseUp = (row, col) => {
    tempGrid = grid;
    if (changingEnd) {
      setEnd_row(row);
      setEnd_col(col);
      tempGrid[row][col].isEnd = true;
      setChangingEnd(false);
    }
    if (changingStart) {
      setStart_row(row);
      setStart_col(col);
      setChangingStart(false);
      tempGrid[row][col].isStart = true;
    }
    setGrid(tempGrid);
    setMouseIsPressed(false);
  };
  const onMouseEnter = (row, col) => {
    // if ()
    if (mouseIsPressed) {
      if (!isWall) {
        if (changingStart) {
          document.getElementById(
            `cell-${grid[row][col].row}-${grid[row][col].col}`
          ).className = 'node node-start';
        }
        if (changingEnd) {
          document.getElementById(
            `cell-${grid[row][col].row}-${grid[row][col].col}`
          ).className = 'node node-end';
        }
      } else {
        tempGrid = grid;
        tempGrid[row][col].wall = !tempGrid[row][col].wall;
        if (tempGrid[row][col].wall) {
          document.getElementById(
            `cell-${grid[row][col].row}-${grid[row][col].col}`
          ).className = 'node node-wall';
        } else {
          document.getElementById(
            `cell-${grid[row][col].row}-${grid[row][col].col}`
          ).className = 'node';
        }
        setGrid(tempGrid);
      }
    }
  };

  const onMouseleave = (row, col) => {
    if (mouseIsPressed) {
      if (changingStart) {
        document.getElementById(
          `cell-${grid[row][col].row}-${grid[row][col].col}`
        ).className = 'node';
      }
      if (changingEnd) {
        document.getElementById(
          `cell-${grid[row][col].row}-${grid[row][col].col}`
        ).className = 'node';
      }
    }
  };

  const handleAlgoChange = (event) => {
    let algo = event.target.value;
    setAlgoSelect(algo);
  };

  const handleSetWalls = () => {
    setIsWall(!isWall);
  };

  useEffect(() => {
    initGrid();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='container'>
      <div>
        {grid.map((innerArray, index) => (
          <div key={index} className='grid'>
            {innerArray.map((item, i2) => {
              const { isStart, isEnd, row, col } = item;
              return (
                <Node
                  key={i2}
                  isStart={isStart}
                  isEnd={isEnd}
                  row={row}
                  col={col}
                  passonMouseDown={onMouseDown}
                  passonMouseUp={onMouseUp}
                  passonMouseEnter={onMouseEnter}
                  passonMouseLeave={onMouseleave}
                />
              );
            })}
          </div>
        ))}
      </div>
      <button onClick={handleVisualizeAlgo}>Visualize DFS</button>
      <button onClick={handleReset}> Reset Grid</button>
      <select onChange={handleAlgoChange}>
        <option value='none'></option>
        <option value='DFS'>DFS</option>
        <option value='BFS'>BFS</option>
        <option value='Multi-Source-BFS'>Multi Source BFS</option>
        <option value='Dijkstra'>Dijkstra</option>
      </select>
      <button onClick={handleSetWalls}>Set Walls</button>
    </div>
  );
};

export default PathFind;
