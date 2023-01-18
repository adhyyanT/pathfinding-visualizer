import { Heap } from '@datastructures-js/heap';

const dijkstra = (startNode) => {
  let found = false;
  let visitedInOrder = []; // store every node in order of their function call
  let path = []; // stores the path to the end node
  const compareCars = (a, b) => {
    return a.startNode.weight - b.startNode.weight >= 0 ? 1 : -1;
  };
  let minHeap = new Heap(compareCars);
  minHeap.insert({
    startNode: startNode,
    currPath: [],
  });
  while (!minHeap.isEmpty()) {
    let { startNode: currNode, currPath } = minHeap.pop();
    for (let i in currNode.neighbours) {
      if (currNode.neighbours[i].isEnd) {
        path = [...currPath, currNode.neighbours[i]];
        found = true;
        return { found, visitedInOrder, path };
      }
      if (!currNode.neighbours[i].isVis && !currNode.neighbours[i].wall) {
        currNode.neighbours[i].isVis = true;
        visitedInOrder.push(currNode.neighbours[i]);
        currNode.neighbours[i].weight = Math.min(
          currNode.neighbours[i].weight,
          currNode.weight + 1
        );
        minHeap.push({
          startNode: currNode.neighbours[i],
          currPath: [...currPath, currNode.neighbours[i]],
        });
      }
    }
  }
  return { found, visitedInOrder, path };
};

export default dijkstra;
