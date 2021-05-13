class Behavior{
    name;
    behavior;
    constructor(name, blueState, redState) {
        this.name = name;
        switch (this.name) {
            case "randomBehavior":
                this.behavior = new randomBehavior();
                break;
            case "carefulBehavior":
                // Moves towards the player and then moves down and waits until the player passes.
                this.behavior = new carefulBehavior();
                break;
            case "aggressiveBehavior":
                // Just moves right
                this.behavior = new aggressiveBehavior();
                break;
            case "semiAggressiveBehavior":
                // Moves left unless the other car is there, in which case it stays in place until the other car moves out of its way.
                this.behavior = new semiAggressiveBehavior();
                break;
            case "maximizeUtilitySumBehavior":
                // Moves by taking the step that will maximize its outcome at the end.
                // In fact this behavior is like the 'semiAggressiveBehavior' only more complicated.
                this.behavior = new maximizeUtilitySumBehavior();
                break
            case "nonzeroMinMaxBehavior":
                // Moves by the min-max algorithm for nonzero game
                this.behavior = new nonzeroMinMaxBehavior(blueState, redState);
                break;
            case "randomAssumptionBehavior":
                // The blue agent assumes that the red agent is behaving randomly
                this.behavior = new randomAssumptionBehavior(blueState, redState);
                break;
            case "policyIterationBasedBehavior":
                this.behavior = new policyIterationBasedBehavior(blueState, redState);
                break;
        }
    }
    makeAction(blueState, redState) {
       // Each inheriting class will implements this function
       this.behavior.makeAction(blueState, redState);
    }
}

class randomBehavior{
    constructor() { }
    makeAction(blueState, redState) {
        var actionsArray;
        if(parseInt(redState[1]) == parseInt(blueState[1])) {
            actionsArray = ["left","up"];
        } else if(blueState == "a1") {
            actionsArray = ["stay"]; //blueBall has reached to destination
        } else {
            actionsArray = ["stay", "down", "up", "left"];
        }
        var randomAction = actionsArray[actionsArray.length * Math.random() | 0];
        while(!checkAction(randomAction, "blue")) { //find valid action 
            randomAction = actionsArray[actionsArray.length * Math.random() | 0];
        }
        switch (randomAction) {
            case "stay":
                moveStay("blue")
                break;
            case "up":
                moveUp("blue");
                break;
            case "down":
                moveDown("blue");
                break;
            case "left":
                moveLeft();
                break;
        }
    }
}

class carefulBehavior{
    wasmoveUp;
    wasmoveDown;
    constructor() {
        this.wasmoveUp = false;
        this.wasmoveDown = false;
    }
    makeAction(blueState, redState) {
        if(blueState == "a1") {
            moveStay("blue");
        } else if(parseInt(redState[1]) + 1 < parseInt(blueState[1])){
            moveLeft();
        } else if(parseInt(redState[1]) > parseInt(blueState[1])) {
            if(!this.wasmoveUp) {
                moveUp("blue");
                this.wasmoveUp = true;
            }
            else {
                moveLeft();
            }
        }
        else {
            if(!this.wasmoveDown){
                moveDown("blue");
                this.wasmoveDown = true;
            }
            else {
                moveStay("blue");
            }
        }
    }
}

class semiAggressiveBehavior{
    constructor() { }
    makeAction(blueState, redState) {
        if(blueState == "a1") {
            moveStay("blue");
        } else if(parseInt(redState[1])+1 < parseInt(blueState[1]) || redState[0] == "b"){
            moveLeft();
        } else if(parseInt(redState[1]) > parseInt(blueState[1])) {
            moveLeft();
        }
        else {
            moveStay("blue");
        }
    }
}

class aggressiveBehavior{
    constructor() { }
    makeAction(blueState, redState) {
        if(blueState == "a1") {
            moveStay("blue");
        } else {
            moveLeft();
        }
    }
}

// class astarBehavior{
//     graph;
//     constructor() { 
//         this.graph = new Graph([
//             [1,1,1,1,1,1],
//             [1,1,1,1,1,1]
//             //How to build the graph?
//             //Should take into account the redBall and the walls
//         ]);
//     }

//     makeAction(blueState, redState) {
//         var start = this.graph.grid[0][5];
//         var end = this.graph.grid[0][0];
//         var result = astar.search(this.graph, start, end);
// 	    // resultWithWeight is an array containing the shortest path taking into account the weight of a node
//         console.log("result: "+ result.toString());
//     }
// }

function getPossibleActions(state, ballColor) {
    if (state == "a1" && ballColor == "blue") {
        return ["stay"];
    }
    if(state == "a6" &&  ballColor == "red") {
        return ["stay"];
    }
    if(state[0] == "a") {
        if(ballColor == "blue") {
            return ["left", "stay", "down"];
        }
        else { // ballColor == "red"
            return ["right", "stay", "down"];
        }
    }
    if(state[0] == "b") {
        return ["stay", "up"];
    }
}

function getUtilityAfterAction(blueState, redState, ballColor, depth) {
    var utility = depth*(-1);
    if(blueState == "a1" && ballColor == "blue") {
        utility += 10;
    }
    else if(redState == "a6" && ballColor == "red"){
        utility += 10;
    }
    if(blueState == redState) {
        utility -= 100;
    }
    else if(redState[0] == "a" && blueState[0] == "a" && parseInt(blueState[1])+1 == parseInt(redState[1])){
        utility -= 100;
    }
    return utility;
}


function getAction(previousState, currentState) {
    var action;
    if(currentState == "a" + (parseInt(previousState[1])-1)) {
        action = "left";
    }
    else if(currentState == "a" + (parseInt(previousState[1])+1)) {
        action = "right";
    }
    else if(currentState == "b" + parseInt(previousState[1]) && previousState[0] == "a") {
        action = "down";
    }
    else if(currentState == "a" + parseInt(previousState[1]) && previousState[0] == "b") {
        action = "up";
    }
    else if(currentState == previousState) {
        action = "stay";
    }
    return action;
}

function createNextPosition(stepAction, blueState) {
    var nextPosition;
    if(stepAction == "left") {
        nextPosition = "a" + (parseInt(blueState[1])-1);
    }
    else if(stepAction == "right") {
        nextPosition = "a" + (parseInt(blueState[1])+1);
    }
    else if(stepAction == "down") {
        nextPosition = "b" + parseInt(blueState[1]);
    }
    else if(stepAction == "up") {
        nextPosition = "a" + parseInt(blueState[1]);
    }
    else if(stepAction == "stay") {
        nextPosition = blueState;
    }
    return nextPosition;
}

function cheackIfCollided(blueState, redState, blueLastCommand, redLastCommand) {
    return ((redLastCommand == "right") && (blueLastCommand == "left") &&
    parseInt(redState[1])-1 == parseInt(blueState[1])) || (redState == blueState); 
}

class maximizeUtilitySumBehavior {
    MAX_DEPTH = 10;
    bestAction;
    constructor() { }
    makeAction(blueState, redState) {
        if(blueState == "a1") {
            moveStay("blue");
            return;
        }
        var root = new Tree(blueState, redState, 0, 0);
        this.createDecisionTree(blueState, redState, 1, root);
        root.print(); //print the tree
        var maxValue = this.getBestAction(root, Number.NEGATIVE_INFINITY);
        console.log("maxValue: "+maxValue);
        console.log("bestAction: "+this.bestAction);
        switch (this.bestAction) {
            case "stay":
                moveStay("blue");
                break;
            case "left":
                moveLeft();
                break;
            case "up":
                moveUp("blue");
                break;
            case "down":
                moveDown("blue");
                break;
        }
        return this.bestAction;
    }

    createDecisionTree(blueState, redState, depth, parent, ballColor) {
        this.updateStateProb(blueState, redState);
        var redPossibleActions = getPossibleActions(redState, "red");
        var bluePossibleActions = getPossibleActions(blueState, "blue");
        var buildChildNode = (action) => {
            if(ballColor == "blue") {
                var newBluePosition = createNextPosition(action, blueState);
                for(var i=0; i < redPossibleActions.length;i++) {
                    var newRedPosition = createNextPosition(redPossibleActions[i], redState);
                    var blueLastCommand = getAction(blueState, newBluePosition);
                    var redLastCommand = getAction(redState, newRedPosition);
                    if(depth < this.MAX_DEPTH && newBluePosition != "a1" && !cheackIfCollided(newBluePosition, newRedPosition, blueLastCommand, redLastCommand)) {
                        //not a leaf node and the two ball do not colliding
                        var node = parent.createChildNode(newBluePosition, newRedPosition);
                        this.createDecisionTree(newBluePosition, newRedPosition, depth + 1, node, "red");
                    }
                    else {
                        parent.createChildNode(newBluePosition, newRedPosition,
                            this.getUtilityExpectationBeforeAction(newBluePosition, redState, "blue", depth, redPossibleActions),
                            getUtilityAfterAction(newBluePosition, newRedPosition, "red", depth));
                    }
                }
            }
            else { //ballColor == "red"
                var newRedPosition = createNextPosition(action, redState);
                for(var i=0; i < bluePossibleActions.length;i++) {
                    var newBluePosition = createNextPosition(bluePossibleActions[i], blueState);
                    var blueLastCommand = getAction(blueState, newBluePosition);
                    var redLastCommand = getAction(redState, newRedPosition);
                    if(depth < this.MAX_DEPTH && newRedPosition != "a6" && !cheackIfCollided(newBluePosition, newRedPosition, blueLastCommand, redLastCommand)) {
                        var node = parent.createChildNode(newBluePosition, newRedPosition);
                        this.createDecisionTree(newBluePosition, newRedPosition, depth + 1, node, "blue");
                    }
                    else {
                        parent.createChildNode(newBluePosition, newRedPosition,
                            this.getUtilityExpectationBeforeAction(newBluePosition, redState, "blue", depth, redPossibleActions),
                            getUtilityAfterAction(newBluePosition, newRedPosition, "red", depth));
                    }
                }
            }
        }
        if(ballColor == "blue") {
            bluePossibleActions.forEach(buildChildNode);
        }
        else { //ballColor == "red"
            redPossibleActions.forEach(buildChildNode);
        }
    }

    createDecisionTree(blueState, redState, depth, parent) {
        var possibleActions = getPossibleActions(blueState, "blue");  
        var buildChildNode = (action) => {
            var newPosition = createNextPosition(action, blueState);
            var node = parent.createChildNode(newPosition, redState, getUtilityAfterAction(newPosition, redState, "blue", depth), 0);
            if(depth != this.MAX_DEPTH && newPosition != "a1" && newPosition != redState) { //if not leaf node
                this.createDecisionTree(newPosition, redState, depth + 1, node);
            }
        }
        possibleActions.forEach(buildChildNode);
    }
    getBestAction(root, maxValue){
        if(root.children.length == 0) { //leaf node
            return root.blueUtility;
        }
        var findMax = (child) => {
            var v = this.getBestAction(child, maxValue);
            if(v > maxValue) {
                maxValue = v;
                this.bestAction = getAction(root.blueState, child.blueState);
            }
        }
        root.children.forEach(findMax);
        return maxValue;
    }
}

class nonzeroMinMaxBehavior{
    MAX_DEPTH = 7;
    tree;
    constructor(blueState, redState) {
        this.tree = new Tree(blueState, redState);
        this.createDecisionTree(blueState, redState, 1, this.tree, "blue");
    }
    makeAction(blueState, redState) {
        if(blueState == "a1") {
            return "stay";
        }
        var currentNode = this.tree.findNodeByStates(blueState, redState);
        currentNode.print();

        var action = this.getBestAction(currentNode, this.MAX_DEPTH, "blue");
        console.log("bestAction: "+action);
        switch (action) {
            case "stay":
                moveStay("blue");
                break;
            case "left":
                moveLeft();
                break;
            case "up":
                moveUp("blue");
                break;
            case "down":
                moveDown("blue");
                break;
        }
    }

    createDecisionTree(blueState, redState, depth, parent, ballColor) {
        var redPossibleActions = getPossibleActions(redState, "red");
        var bluePossibleActions = getPossibleActions(blueState, "blue");
        var buildChildNode = (action) => {
            if(ballColor == "blue") {
                var newBluePosition = createNextPosition(action, blueState);
                for(var i=0; i < redPossibleActions.length;i++) {
                    var newRedPosition = createNextPosition(redPossibleActions[i], redState);
                    var blueLastCommand = getAction(blueState, newBluePosition);
                    var redLastCommand = getAction(redState, newRedPosition);
                    if(depth < this.MAX_DEPTH - 1 && newBluePosition != "a1" && !cheackIfCollided(newBluePosition, newRedPosition, blueLastCommand, redLastCommand)) {
                        //not a leaf node and the two ball do not colliding
                        var node = parent.createChildNode(newBluePosition, newRedPosition);
                        this.createDecisionTree(newBluePosition, newRedPosition, depth + 1, node, "red");
                    }
                    else {
                        parent.createChildNode(newBluePosition, newRedPosition,
                            getUtilityAfterAction(newBluePosition, newRedPosition, "blue", depth),
                            getUtilityAfterAction(newBluePosition, newRedPosition, "red", depth));
                    }
                }
            }
            else { //ballColor == "red"
                var newRedPosition = createNextPosition(action, redState);
                for(var i=0; i < bluePossibleActions.length;i++) {
                    var newBluePosition = createNextPosition(bluePossibleActions[i], blueState);
                    var blueLastCommand = getAction(blueState, newBluePosition);
                    var redLastCommand = getAction(redState, newRedPosition);
                    if(depth < this.MAX_DEPTH - 1 && newRedPosition != "a6" && !cheackIfCollided(newBluePosition, newRedPosition, blueLastCommand, redLastCommand)) {
                        var node = parent.createChildNode(newBluePosition, newRedPosition);
                        this.createDecisionTree(newBluePosition, newRedPosition, depth + 1, node, "blue");
                    }
                    else {
                        parent.createChildNode(newBluePosition, newRedPosition,
                            getUtilityAfterAction(newBluePosition, newRedPosition, "blue", depth),
                            getUtilityAfterAction(newBluePosition, newRedPosition, "red", depth));
                    }
                }
            }
        }
        if(ballColor == "blue") {
            bluePossibleActions.forEach(buildChildNode);
        }
        else { //ballColor == "red"
            redPossibleActions.forEach(buildChildNode);
        }
    }

    extractAction(leaf, action) {
        var parent = leaf.parentNode;
        if(parent == null) {
            return action;
        }
        action = getAction(parent.blueState, leaf.blueState);
        return this.extractAction(parent, action);
    }

    getBestAction(root, depth, ballColor){
        var leaf = this.maxMaxAlgorithm(root, depth, ballColor);
        console.log(leaf);
        // leaf.print();
        return this.extractAction(leaf, "");
    }

    maxMaxAlgorithm(root, depth, ballColor){
        if(root.children.length == 0 || depth == 0) { //leaf node
            return root
        }
        var best_node, best_value, v;
        best_value = Number.NEGATIVE_INFINITY;
        for(var child in root.children) {
            if(ballColor == "blue") {
                var tempReturnNode = this.maxMaxAlgorithm(root.children[child], depth +1, "red");
                if(tempReturnNode === undefined) { 
                    //v was the biggest value
                    tempReturnNode = root.children[child];
                }
                v = tempReturnNode.blueUtility;
            }
            else { // ballColor == "red"
                var tempReturnNode = this.maxMaxAlgorithm(root.children[child], depth +1, "blue");
                if(tempReturnNode === undefined) { 
                    //v was the biggest value
                    tempReturnNode = root.children[child];
                }
                v = tempReturnNode.redUtility;
            }
            if(v > best_value) {
                best_value = v;
                best_node = root.children[child];
            }
        }
        return best_node;
    }

    minmax(node, depth, max_player) {
        if(depth == 0 || !("children" in node)) {
            return node.utility;
        }
        var best_value, v;
        if(max_player) {
            //maximizing player
            best_value = Number.NEGATIVE_INFINITY;

            for(var child in node.children) {
                v = this.minmax(node.children[child], depth -1, false);
                best_value = Math.max(v, best_value);
            }
            return best_value;
        }
        else {
            //minimizing player
            best_value = Number.POSITIVE_INFINITY;

            for(var child in node.children) {
                v = this.minmax(node.children[child], depth -1, true);
                best_value = Math.min(v, best_value);
            }
            return best_value;
        }
    }
}

class randomAssumptionBehavior{
    MAX_DEPTH = 3;
    tree;

    stay_prob = 0.25;
    right_prob = 0.25;
    up_prob = 0.25;
    down_prob = 0.25;

    constructor(blueState, redState) {
        this.tree = new Tree(blueState, redState);
        this.createDecisionTree(blueState, redState, 1, this.tree, "blue");
    }
    makeAction(blueState, redState) {
        if(blueState == "a1") {
            return "stay";
        }
        var currentNode = this.tree.findNodeByStates(blueState, redState);
        currentNode.print();

        var bestAction = this.getBestAction(currentNode, this.MAX_DEPTH, "red");
        console.log("bestAction: "+bestAction);
        switch (bestAction) {
            case "stay":
                moveStay("blue");
                break;
            case "left":
                moveLeft();
                break;
            case "up":
                moveUp("blue");
                break;
            case "down":
                moveDown("blue");
                break;
        }
    }

    getUtilityExpectationBeforeAction(blueState, redState, ballColor, depth, possibleActions) {
        var utilityExpectation = 0;
        var calculateUtilityExpectation = (redAction) => {
            var newRedPosition = createNextPosition(redAction, redState);
            var actionProb = 0; //The probability that red would choose this "action"
            switch (redAction) {
                case "stay":
                    actionProb = this.stay_prob;
                    break;
                case "right":
                    actionProb = this.right_prob;
                    break;
                case "up":
                    actionProb = this.up_prob;
                    break;
                case "down":
                    actionProb = this.down_prob;
                    break;
            }
            utilityExpectation += actionProb * getUtilityAfterAction(blueState, newRedPosition, ballColor, depth);
        }
        possibleActions.forEach(calculateUtilityExpectation);
        // utilityExpectation = utilityExpectation/possibleActions.length;
        return utilityExpectation;
    }
    updateStateProb(blueState, redState) {
        //In the future these data will come from the database
        firebase.database().ref("statistics/"+blueState+" "+redState).once('value',
        (snap) => {
            var actions = getPossibleActions(redState, "red");
            var sum = 0;
            for(var i=0;i<actions.lengthl;i++){
                sum += snap.child(redAction).val();
            }
            this.stay_prob = snap.child("stay").val()/sum;
            this.right_prob = snap.child("right").val()/sum;
            this.up_prob = snap.child("up").val()/sum;
            this.down_prob = snap.child("down").val()/sum;
        });
        this.stay_prob = 0.25;
        this.right_prob = 0.25;
        this.up_prob = 0.25;
        this.down_prob = 0.25;
    }

    createDecisionTree(blueState, redState, depth, parent, ballColor) {
        this.updateStateProb(blueState, redState);
        var redPossibleActions = getPossibleActions(redState, "red");
        var bluePossibleActions = getPossibleActions(blueState, "blue");
        var buildChildNode = (action) => {
            if(ballColor == "blue") {
                var newBluePosition = createNextPosition(action, blueState);
                for(var i=0; i < redPossibleActions.length;i++) {
                    var newRedPosition = createNextPosition(redPossibleActions[i], redState);
                    var blueLastCommand = getAction(blueState, newBluePosition);
                    var redLastCommand = getAction(redState, newRedPosition);
                    if(depth < this.MAX_DEPTH && newBluePosition != "a1" && !cheackIfCollided(newBluePosition, newRedPosition, blueLastCommand, redLastCommand)) {
                        //not a leaf node and the two ball do not colliding
                        var node = parent.createChildNode(newBluePosition, newRedPosition);
                        this.createDecisionTree(newBluePosition, newRedPosition, depth + 1, node, "red");
                    }
                    else {
                        parent.createChildNode(newBluePosition, newRedPosition,
                            this.getUtilityExpectationBeforeAction(newBluePosition, redState, "blue", depth, redPossibleActions),
                            getUtilityAfterAction(newBluePosition, newRedPosition, "red", depth));
                    }
                }
            }
            else { //ballColor == "red"
                var newRedPosition = createNextPosition(action, redState);
                for(var i=0; i < bluePossibleActions.length;i++) {
                    var newBluePosition = createNextPosition(bluePossibleActions[i], blueState);
                    var blueLastCommand = getAction(blueState, newBluePosition);
                    var redLastCommand = getAction(redState, newRedPosition);
                    if(depth < this.MAX_DEPTH && newRedPosition != "a6" && !cheackIfCollided(newBluePosition, newRedPosition, blueLastCommand, redLastCommand)) {
                        var node = parent.createChildNode(newBluePosition, newRedPosition);
                        this.createDecisionTree(newBluePosition, newRedPosition, depth + 1, node, "blue");
                    }
                    else {
                        parent.createChildNode(newBluePosition, newRedPosition,
                            this.getUtilityExpectationBeforeAction(newBluePosition, redState, "blue", depth, redPossibleActions),
                            getUtilityAfterAction(newBluePosition, newRedPosition, "red", depth));
                    }
                }
            }
        }
        if(ballColor == "blue") {
            bluePossibleActions.forEach(buildChildNode);
        }
        else { //ballColor == "red"
            redPossibleActions.forEach(buildChildNode);
        }
    }

    // getBestAction(root, depth, ballColor){
    //     var leaf = this.maxMaxAlgorithm(root, depth, ballColor);
    //     console.log("maxValue: "+leaf.blueUtility);
    //     // var leaf = root.findNodeByBlueUtility(maxValue);
    //     leaf.print();
    //     return this.extractAction(leaf);
    // }

    getBestAction(root, depth, ballColor){
        var maxValue = this.maxMaxAlgorithm(root, depth, ballColor);
        console.log(maxValue);
        var leaf = root.findNodeByBlueUtility(maxValue);
        leaf.print();
        return this.extractAction(leaf);
    }

    extractAction(leaf, action) {
        var parent = leaf.parentNode;
        if(parent == null) {
            return action;
        }
        action = getAction(parent.blueState, leaf.blueState);
        return this.extractAction(parent, action);
    }

    // maxMaxAlgorithm(root, depth, ballColor){
    //     if(root.children.length == 0 || depth == 0) { //leaf node
    //         return root
    //     }
    //     var best_node, best_value, v;
    //     if(ballColor == "blue") {
    //         best_value = Number.NEGATIVE_INFINITY;
    //         for(var child in root.children) {
    //             v = this.maxMaxAlgorithm(root.children[child], depth -1, "red").blueUtility;
    //             if(v > best_value) {
    //                 best_value = v;
    //                 best_node = root.children[child];
    //             }
    //         }
    //         return best_node;
    //     }
    //     else { //ballColor == "red"
    //         best_value = Number.NEGATIVE_INFINITY;
    //         for(var child in root.children) {
    //             v = this.maxMaxAlgorithm(root.children[child], depth -1, "blue").redUtility;
    //             if(v > best_value) {
    //                 best_value = v;
    //                 best_node = root.children[child];
    //             }
    //         }
    //         return best_node;
    //     }
    // }

    maxMaxAlgorithm(root, depth, ballColor){
        if(root.children.length == 0 || depth == 0) { //leaf node
            if(ballColor == "blue") {
                return root.blueUtility;
            }
            else { //ballColor == red
                return root.redUtility;
            }
        }
        var best_value, v;
        if(ballColor == "blue") {
            best_value = Number.NEGATIVE_INFINITY;
            for(var child in root.children) {
                v = this.maxMaxAlgorithm(root.children[child], depth -1, "red");
                if(v > best_value) {
                    best_value = v;
                    
                }
            }
            return best_value;
        }
        else { //ballColor == "red"
            best_value = Number.NEGATIVE_INFINITY;
            for(var child in root.children) {
                v = this.maxMaxAlgorithm(root.children[child], depth -1, "blue");
                if(v > best_value) {
                    best_value = v;
                    
                }
            }
            return best_value;
        }
    }
}

// https://annisap.medium.com/searching-for-optimal-policies-in-python-an-intro-to-optimization-7182d6fe4dba

// https://towardsdatascience.com/how-to-code-the-value-iteration-algorithm-for-reinforcement-learning-8fb806e117d1

class policyIterationBasedBehavior{
    env;
    gamma = 0.99;
    V;
    policy;
    states;

    constructor(blueState, redState) {
        this.env = new Environment(blueState, redState);
        this.states = this.env.getStates();

        // // initialize V,policy
        // this.V = Array(this.env.ns).fill(0);
        // this.policy = Array(this.env.ns).fill("stay");

        // var stable = false;
        // var i = 0;
        // while(!stable) {
        //     console.log("Iteration: "+ ++i);
        //     // valuate policy:
        //     this.evaluatePolicy();
        //     // improve policy:
        //     var newPolicy = this.updatePolicy();
        //     if(this.policy.every(function(value, index) { return value === newPolicy[index];})) {
        //         stable = true;
        //     }
        //     else {
        //         // console.log("newPolicy: "+ newPolicy);
        //         this.policy = newPolicy;
        //         // console.log(this.policy);
        //     }
        // }
        
        // console.log("policy: "+this.policy);
        // console.log("V: "+this.V);

        // console.log("V(a6 a1)= "+ this.V[this.states.indexOf("a6 a1")]);
        // // console.log("policy(a6 a1)= "+this.policy[this.states.indexOf("a6 a1")]);

        // var [policy, V] = this.policy_improvement();

        firebase.database().ref("Value Iteration behavior").once('value',
        (snap) => {
            this.policy = snap.val();
            console.log(this.policy);
            // var actions = getPossibleActions(redState, "red");
            // var sum = 0;
            // for(var i=0;i<actions.lengthl;i++){
            //     sum += snap.child(redAction).val();
            // }
            // this.stay_prob = snap.child("stay").val()/sum;
            // this.right_prob = snap.child("right").val()/sum;
            // this.up_prob = snap.child("up").val()/sum;
            // this.down_prob = snap.child("down").val()/sum;
        });
    }
    makeAction(blueState, redState) {
        if(blueState == "a1") {
            return "stay";
        }
        // Update current state of the two agents
        this.env.blueState = blueState;
        this.env.redState = redState;

        console.log("State: "+blueState + " " + redState)
        var bestAction = this.policy[blueState + " " + redState];
        console.log("bestAction: "+bestAction);
        switch (bestAction) {
            case "stay":
                moveStay("blue");
                break;
            case "left":
                moveLeft();
                break;
            case "up":
                moveUp("blue");
                break;
            case "down":
                moveDown("blue");
                break;
        }
    }

    evaluatePolicy() {
        // perform a synchronous update of the value function
        var Vnew = Array(this.states.length).fill(0); // initialize new value function array for each state
        for(var s_i in this.states) {
            var s = this.states[s_i];
            // console.log("s: "+s);
            var v = 0.0;
            var poss = this.env.allowedActions(s, "blue"); // fetch all possible actions
            // console.log(poss);
            for(var a of poss) {
                var prob = this.env.transition_function(s,a); // probability of taking action under current policy
                if(prob === undefined) { // there is no information for s
                    prob = 1 / poss.length;
                }
                // console.log(prob);
                var s_ = this.env.nextStateDistribution(s,a); // look up the next state
                if(this.states.indexOf(s_) == -1) {
                    // there is no information for s_
                    console.warn("state with no information: "+ s_)
                    // Set random probability
                }
                // console.log("s_: "+s_);
                var rs = this.env.reward(s,a,s_); // get reward for s->a->s_ transition
                // console.log("rs: "+rs);
                // console.log("gamma: "+this.gamma);
                // console.log("index of s_: "+this.states.indexOf(s_))
                // console.log("V(s_): "+this.V[this.states.indexOf(s_)]);
                v += prob * (rs + this.gamma * this.V[this.states.indexOf(s_)]);
                // console.log(v);
            }
            Vnew[s_i] = v;
            // console.log("Vnew(s): "+ Vnew[s_i]);
        }
        this.V = Vnew; // swap
        // console.log("Vnew: "+ Vnew);
    }

    updatePolicy() {
        var policy = Array(this.env.ns).fill("stay");
        // update policy to be greedy w.r.t. learned Value function
        // iterate over all states...
        for(var s_i in this.states) {
            var s = this.states[s_i];
            // console.log("s: "+s);
            var poss = this.env.allowedActions(s, "blue");
            // console.log(poss);
            // compute value of taking each allowed action
            var vmax, nmax;
            var vs = [];
            const actions = Object.freeze({0: "stay", 1: "left", 2: "down", 3: "up"});
            for(var i=0,n=poss.length;i < n;i++) {
                var a = poss[i];
                // console.log("a: "+ a);
                // compute the value of taking action a
                var s_ = this.env.nextStateDistribution(s,a);
                // console.log("s_: "+s_);
                var rs = this.env.reward(s,a,s_);
                // console.log("rs: "+rs);
                var v = rs + this.gamma * this.V[this.states.indexOf(s_)];
                // bookeeping: store it and maintain max
                vs.push(v);
                if(i === 0 || v > vmax) {
                    vmax = v;
                    nmax = 1;
                }
                else if(v === vmax) {
                    nmax += 1;
                }
            }
            // console.log("vs: "+vs);
            // console.log("vs_i: "+ vs.indexOf(vmax));
            // console.log("vmax: "+vmax);
            // policy[s_i] = actions[vs.indexOf(vmax)];
            // console.log("vs_i: "+ vs.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0));
            // update policy smoothly across all argmaxy actions
            policy[s_i] = actions[vs.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)];
            // console.log("vs(v): "+ vs[i]);
        }
        return policy;
    }

    bestAction(state) {
        console.log(state);
        var s_i = this.states.indexOf(state);
        return this.policy[s_i];
    }
}
