const Bfs = (startNode) => {
  let found = false;
  let visitedInOrder = []; // store every node in order of their function call
  let path = []; // stores the path to the end node
  let queue = [
    {
      startNode: startNode,
      currPath: [],
    },
  ];
  while (queue.length !== 0) {
    let { startNode: currNode, currPath } = queue.shift();
    for (let i in currNode.neighbours) {
      if (currNode.neighbours[i].isEnd) {
        path = [...currPath, currNode.neighbours[i]];
        found = true;
        return { found, visitedInOrder, path };
      }
      if (!currNode.neighbours[i].isVis && !currNode.neighbours[i].wall) {
        currNode.neighbours[i].isVis = true;
        visitedInOrder.push(currNode.neighbours[i]);
        queue.push({
          startNode: currNode.neighbours[i],
          currPath: [...currPath, currNode.neighbours[i]],
        });
      }
    }
  }

  return { found, visitedInOrder, path };
};

export default Bfs;
