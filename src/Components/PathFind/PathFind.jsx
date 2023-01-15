import React, { useEffect, useState } from 'react';
import './PathFind.css';
import Node from '../Node/Node';
import dfs from '../../Algorithms/Dfs';

const rows = 15;
const cols = 35;
const start_row = 0,
  start_col = 0,
  end_row = 9,
  end_col = 25;

const PathFind = () => {
  //Main grid that holds object structure
  const [grid, setGrid] = useState([]);

  // All the visited Node in order of their function call
  const [visitedNodes, setVisitedNodes] = useState([]);

  // shortest path according to the algorithm
  const [path, setPath] = useState([]);

  // Is it possible to traverse to the end node ?
  const [pathFound, setPathFound] = useState(false);

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
    let tempGrid = [];
    for (let i = 0; i < rows; i++) {
      let currNodes = [];
      for (let j = 0; j < cols; j++) {
        currNodes[j] = {
          isStart: i === start_row && j === start_col,
          isEnd: i === end_row && j === end_col,
          isVis: false,
          row: i,
          col: j,
          //   id: i + ' ' + j,
          weight: 1,
          wall: false,
          neighbours: [],
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

    let path = dfs(tempGrid[start_row][start_col]);
    setPath(path.path);
    setVisitedNodes(path.visitedInOrder);
    setPathFound(path.found);
  };

  useEffect(() => {
    initGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visualizeShortestPath = (path) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        document.getElementById(
          `cell-${path[i].row}-${path[i].col}`
        ).className = 'node node-shortest-path';
      }, 10 * i);
    }
  };

  const handleVisualizeAlgo = () => {
    console.log(path);
    console.log(visitedNodes);
    console.log(pathFound);
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(path);
        }, 20 * i);
      } else {
        setTimeout(() => {
          document.getElementById(
            `cell-${visitedNodes[i].row}-${visitedNodes[i].col}`
          ).className = 'node node-visited';
        }, 20 * i);
      }
    }
  };

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
                />
              );
            })}
          </div>
        ))}
      </div>
      <button onClick={handleVisualizeAlgo}>Visualize DFS</button>
    </div>
  );
};

export default PathFind;
