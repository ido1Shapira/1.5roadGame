//https://github.com/noamsauerutley/shortest-path/blob/master/shortestPath.js

const shortestDistanceNode = (distances, visited) => {
	let shortest = null;

	for (let node in distances) {
		let currentIsShortest =
			shortest === null || distances[node] < distances[shortest];
		if (currentIsShortest && !visited.includes(node)) {
			shortest = node;
		}
	}
	return shortest;
};

const findShortestPath = (graph, startNode, endNode) => {
	// establish object for recording distances from the start node
	let distances = {};
	distances[endNode] = "Infinity";
	distances = Object.assign(distances, graph[startNode]);

	// track paths
	let parents = { endNode: null };
	for (let child in graph[startNode]) {
		parents[child] = startNode;
	}

	// track nodes that have already been visited
	let visited = [];

	// find the nearest node
	let node = shortestDistanceNode(distances, visited);

	// for that node
	while (node) {
		// find its distance from the start node & its child nodes
		let distance = distances[node];
		let children = graph[node];
		// for each of those child nodes
		for (let child in children) {
			// make sure each child node is not the start node
			if (String(child) === String(startNode)) {
				continue;
			} else {
				// save the distance from the start node to the child node
				let newdistance = distance + children[child];
				// if there's no recorded distance from the start node to the child node in the distances object
				// or if the recorded distance is shorter than the previously stored distance from the start node to the child node
				// save the distance to the object
				// record the path
				if (!distances[child] || distances[child] > newdistance) {
					distances[child] = newdistance;
					parents[child] = node;
				}
			}
		}
		// move the node to the visited set
		visited.push(node);
		// move to the nearest neighbor node
		node = shortestDistanceNode(distances, visited);
	}

	// using the stored paths from start node to end node
	// record the shortest path
	let shortestPath = [endNode];
	let parent = parents[endNode];
	while (parent) {
		shortestPath.push(parent);
		parent = parents[parent];
	}
	shortestPath.reverse();

	// return the shortest path from start node to end node & its distance
	let results = {
		distance: distances[endNode],
		path: shortestPath,
	};

	return results;
};


function example(){
    const graph = {
        a1: { },
        a2: {  a1: -10, b2: 1 },
        a3: {  a2: 1, b3: 1 },
        a4: {  a3: 1 ,b4: 1 },
        a5: {  a4: 1 ,b5: 1 },
        a6: {  a5: 1 ,b6: 1},

        b1: {  a1: -10 },
        b2: {  a2: 1 },
        b3: {  a3: 1 },
        b4: {  a4: 1 },
        b5: {  a5: 1 },
        b6: {a6: 1}
        
    };

    const shortestPath = findShortestPath(graph, 'a6', 'a1');
    var str = JSON.stringify(shortestPath);
    str = JSON.stringify(shortestPath, null,4); // (Optional) beautiful indented output.
    console.log(str); // Logs output to dev tools console.
    console.log('findShortestPath: ', shortestPath.toString());
}