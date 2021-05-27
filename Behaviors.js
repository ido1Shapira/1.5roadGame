class Behavior{
    name;
    policy;
    previousBlueState;
    previousRedState;
    constructor(name) {
        this.name = name
        firebase.database().ref(name).once('value',
        (snap) => {
            this.policy = snap.val();
            // console.log(this.policy);
        });
        this.previousBlueState = 'a-9';
        this.previousRedState = 'a-9';
    }
    makeAction(blueState, redState) {
        if(blueState == "a1") {
            moveStay("blue");
        }
        var state = blueState + " " + redState + "," + this.previousBlueState + " " + this.previousRedState
        console.log("State: "+ state)
        var bestAction = this.policy[state];
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
        // Update current state of the two agents
        this.previousBlueState = blueState;
        this.previousRedState = redState;
    }
}

// class randomBehavior{
//     constructor() { }
//     makeAction(blueState, redState) {
//         var actionsArray;
//         if(parseInt(redState[1]) == parseInt(blueState[1])) {
//             actionsArray = ["left","up"];
//         } else if(blueState == "a1") {
//             actionsArray = ["stay"]; //blueBall has reached to destination
//         } else {
//             actionsArray = ["stay", "down", "up", "left"];
//         }
//         var randomAction = actionsArray[actionsArray.length * Math.random() | 0];
//         while(!checkAction(randomAction, "blue")) { //find valid action 
//             randomAction = actionsArray[actionsArray.length * Math.random() | 0];
//         }
//         switch (randomAction) {
//             case "stay":
//                 moveStay("blue")
//                 break;
//             case "up":
//                 moveUp("blue");
//                 break;
//             case "down":
//                 moveDown("blue");
//                 break;
//             case "left":
//                 moveLeft();
//                 break;
//         }
//     }
// }