const multiSrcBfs = (startNode, endNode) => {
  let found = false;
  let visitedInOrder = []; // store every node in order of their function call
  let path = []; // stores the path to the end node
  startNode.src = 1;
  endNode.src = 2;
  let queue = [
    {
      startNode: startNode,
      currPath: [],
    },
    {
      startNode: endNode,
      currPath: [endNode],
    },
  ];

  while (queue.length != 0) {
    let sz = queue.length;
    for (let j = 0; j < sz; j++) {
      let { startNode: currNode, currPath } = queue.shift();
      for (let i in currNode.neighbours) {
        if (currNode.neighbours[i].src === 3 - currNode.src) {
          while (
            currNode.neighbours[i].row !== queue[0].startNode.row ||
            currNode.neighbours[i].col !== queue[0].startNode.col ||
            currNode.neighbours[i].src !== queue[0].startNode.src
          ) {
            queue.shift();
          }
          path = [...currPath, currNode.neighbours[i], ...queue[0].currPath];
          found = true;
          return { found, visitedInOrder, path };
        }
        if (!currNode.neighbours[i].isVis && !currNode.neighbours[i].wall) {
          currNode.neighbours[i].isVis = true;
          currNode.neighbours[i].src = currNode.src;
          visitedInOrder.push(currNode.neighbours[i]);
          queue.push({
            startNode: currNode.neighbours[i],
            currPath: [...currPath, currNode.neighbours[i]],
          });
        }
      }
    }
  }
};

export default multiSrcBfs;
