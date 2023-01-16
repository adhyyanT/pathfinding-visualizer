import React from 'react';
import './Node.css';

const Node = ({
  isStart,
  isEnd,
  row,
  col,
  passonMouseDown,
  passonMouseUp,
  passonMouseEnter,
}) => {
  // console.log(isEnd);
  let cssClass = '';
  cssClass = isStart ? 'node-start' : '';
  if (cssClass.length === 0) {
    cssClass = isEnd ? 'node-end' : '';
  }

  //   console.log(cssClass.length);
  return (
    <div
      className={`node ${cssClass}`}
      id={`cell-${row}-${col}`}
      onMouseDown={() => passonMouseDown(row, col)}
      onMouseEnter={() => passonMouseEnter(row, col)}
      onMouseUp={() => passonMouseUp(row, col)}
      // onClick={() => passonMouseClick(row, col)}
    ></div>
  );
};

export default Node;
