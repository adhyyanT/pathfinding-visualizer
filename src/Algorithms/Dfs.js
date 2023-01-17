// function dfsHelper

const dfs = (startNode) => {
  let found = false;
  let visitedInOrder = []; // store every node in order of their function call
  let path = []; // stores the path to the end node
  let currPath = [];
  currPath.push(startNode);
  // dfsHelper(startNode, currPath, path, visitedInOrder, found);

  const dfsHelper = (startNode, currPath) => {
    if (startNode.isEnd) {
      found = true;
      path = [...currPath];
      return;
    }
    for (let i in startNode.neighbours) {
      if (
        !startNode.neighbours[i].isVis &&
        !found &&
        !startNode.neighbours[i].wall
      ) {
        startNode.neighbours[i].isVis = true;
        visitedInOrder.push(startNode);
        currPath.push(startNode.neighbours[i]);
        dfsHelper(startNode.neighbours[i], currPath);
        currPath.splice(currPath.length - 1, 1);
        // startNode.neighbours[i].isVis = false;
      }
      // console.log(startNode.neighbours[i]);
    }
  };
  dfsHelper(startNode, currPath);
  console.log(path);
  return { path, visitedInOrder, found };
};

export default dfs;
