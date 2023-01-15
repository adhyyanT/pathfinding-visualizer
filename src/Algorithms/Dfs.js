let found = false;
let visitedInOrder = []; // store every node in order of their function call
let path = []; // just stores the path to the end node

function dfsHelper(startNode, currPath) {
  if (startNode.isEnd) {
    found = true;
    path = [...currPath];
    return;
  }
  for (let i in startNode.neighbours) {
    if (!startNode.neighbours[i].isVis && !found) {
      startNode.neighbours[i].isVis = true;
      visitedInOrder.push(startNode);
      currPath.push(startNode.neighbours[i]);
      dfsHelper(startNode.neighbours[i], currPath);
      currPath.splice(currPath.length - 1, 1);
      startNode.neighbours[i].Vis = false;
    }
    // console.log(startNode.neighbours[i]);
  }
}

const dfs = (startNode) => {
  let currPath = [];
  currPath.push(startNode);
  dfsHelper(startNode, currPath);
  return { path, visitedInOrder, found };
};

export default dfs;
