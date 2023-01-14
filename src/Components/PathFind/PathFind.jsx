import React, { useEffect, useState } from 'react';
import './PathFind.css';
import Node from '../Node/Node';

const rows = 10;
const cols = 25;
const start_row = 1,
  start_col = 2,
  end_row = 9,
  end_col = 9;

const PathFind = () => {
  const [grid, setGrid] = useState([]);

  const initGrid = () => {
    const tempGrid = [];
    for (let i = 0; i < rows; i++) {
      const currNodes = [];
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
        };
      }
      tempGrid.push(currNodes);
    }
    setGrid(tempGrid);
  };

  useEffect(() => {
    initGrid();
  }, []);

  console.log(grid);
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
    </div>
  );
};

export default PathFind;
