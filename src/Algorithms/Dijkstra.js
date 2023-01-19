import { Heap } from '@datastructures-js/heap';

const dijkstra = (startNode) => {
  let found = false;
  let visitedInOrder = []; // store every node in order of their function call
  let path = []; // stores the path to the end node
  const compareCars = (a, b) => {
    return a.startNode.dist - b.startNode.dist >= 0 ? 1 : -1;
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
        return { found, visitedInOrder, path };
      }
      if (!currNode.neighbours[i].wall) {
        let t = currNode.dist + currNode.neighbours[i].weight;
        if (t < currNode.neighbours[i].dist) {
          visitedInOrder.push(currNode.neighbours[i]);
          currNode.neighbours[i].dist = t;
          minHeap.push({
            startNode: currNode.neighbours[i],
            currPath: [...currPath, currNode.neighbours[i]],
          });
        }
      }
    }
  }
  return { found, visitedInOrder, path };
};

export default dijkstra;
