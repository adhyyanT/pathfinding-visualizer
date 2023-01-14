import React from 'react';
import './Node.css';

const Node = ({ isStart, isEnd, row, col }) => {
  console.log(isEnd);
  let cssClass = '';
  cssClass = isStart ? 'node-start' : '';
  if (cssClass.length === 0) {
    cssClass = isEnd ? 'node-end' : '';
  }

  //   console.log(cssClass.length);
  return <div className={`node ${cssClass}`} id={`cell-${row}-${col}`}></div>;
};

export default Node;
