//
// Author: Ido Shapira
// date: 07/03/2021
//
//---------------- global variables------------------------------
let redCounterSteps = 0;
let blueCounterSteps = 0;
let score = 0;
let postID;
let win = true;

let previousBluePos
let redLastCommand;
let blueLastCommand;

let redBall;
let blueBall;
let selectedBehavior;
let agentBehavior;

let keyEnable = false;
//To calculate the score:
const crushing = -100;
const richToDestination = 10;
const step = -1;
// ---------------helper functions-------------------------------
function getDOM(id) {
    return document.getElementById(id);
}
function getRedState(){
    return redBall.innerHTML
}
function getBlueState(){
    return blueBall.innerHTML
}
function setRedState(newState){
    redBall.innerHTML = newState;
}
function setBlueState(newState){
    blueBall.innerHTML = newState
}
// ---------------main code--------------------------------------
function play() {
    getDOM("contactForm").addEventListener('submit', submitSurvey);

    //Init red ball on the board
    redBall = document.createElement('span');
    redBall.id = "redBall";
    setRedState("a1");
    getDOM("a1").appendChild(redBall);

    //Init blue ball on the board
    blueBall = document.createElement('span');
    blueBall.id = "blueBall";
    setBlueState("a6");
    getDOM("a6").appendChild(blueBall);

    //Choose behavior to the blue ball
    algorithms = ["carefulBehavior",
                  "aggressiveBehavior",
                  "semiAggressiveBehavior",
                  "maximizeUtilitySumBehavior",
                  "nonzeroMinMaxBehavior",
                  "randomAssumptionBehavior"
                ];
    selectedBehavior = algorithms[algorithms.length * Math.random() | 0];
    // console.log("Blue behavior: "+ selectedBehavior)
    agentBehavior = new Behavior("carefulBehavior", getBlueState(), getRedState());

    // Generate a reference to a new location and add some data using push()
    var newPostRef = firebase.database().ref("games").push({
        behavior: selectedBehavior
     });
     // Get the unique ID generated by push() by accessing its key
     postID = newPostRef.key;
     console.log("postID"+postID);

    // call key listener function
    getKey();

}

function getKey() {
    document.onkeydown = function (event) {
        if(!keyEnable) {
            return false;
        }
        switch (event.keyCode) {
            case 37:
                redMove("stay");
                break;
            case 38:
                redMove("up");
                break;
            case 39:
                redMove("right");
                break;
            case 40:
                redMove("down");
                break;
        }
     };
}

function moveUsingCursor(cell){
    if(!keyEnable) {
        return false;
    }
    var redState = getRedState();
    if(redState == cell.id) {
        redMove("stay");
    } else if(redState[0] == "a" && redState[1] == cell.id[1] && cell.id[0] == "b") {
        redMove("down");
    } else if(redState[0] == "b" && redState[1] == cell.id[1] && cell.id[0] == "a") {
        redMove("up");
    } else if(redState[0] == "a" && parseInt(redState[1])+1 == parseInt(cell.id[1]) && cell.id[0] == "a") {
        redMove("right");
    }
}

function checkAction(action, ballColor) {
    var state;
    if(ballColor == "red") {
        state = getRedState(); // Get red ball state
    }
    else {
        state = getBlueState(); // Get blue ball state
    }
    // console.log("ball: " + ballColor + " is in: " + state)
    switch (action) {
        case "stay":
            return true;
        case "up":
            if(state[0] == 'b') {
                return true;
            }
            else {
                console.log("can't go up");
            }
            break;
        case "right":
            if(ballColor == "red") {
                if(state[0] == "a") {
                    return true;
                } else {
                    console.log("can't go right");
                }
            }
            break;
        case "down":
            if(state[0] == "a") {
                return true;
            } else {
                console.log("can't go down");
            }
            break;
        case "left":
            if(ballColor == "blue") {
                if(state[0] == "a") {
                    return true;
                } else {
                    console.log("can't go left");
                }
            }
            break;
    }
    return false;
}
function redMove(to) {
    var validMove = checkAction(to, "red"); //if operation is valid
    if(validMove) {
        blueMove();
        switch (to) {
            case "stay":
                moveStay("red")
                break;
            case "up":
                moveUp("red");
                break;
            case "right":
                moveRight();
                break;
            case "down":
                moveDown("red");
                break;
        }
        if(cheackIfLoss()) {
            win = false;
            score += crushing;
            getDOM("survey_title").innerHTML = "Game ended!<br>You collided with the blue ball. Your score is: "+score+ "<br>Please fill the following survey:";
            finishGame();
        }
        if(getRedState() == "a6") {
            win = true;
            score += richToDestination;
            getDOM("survey_title").innerHTML = "Well done, you reached your destination safely!<br>Your score is: "+score+ " point(s).\n"+ "<br>Please fill the following survey:";
            finishGame();
        }
    }
}
function blueMove() {
    previousBluePos = getBlueState();
    agentBehavior.makeAction(getBlueState(), getRedState());
}

function cheackIfLoss() { //if red and blue ball in the same position
    redState = getRedState(); // Get red ball state
    blueState = getBlueState(); // Get red ball state

    return ((redLastCommand == "right") && (blueLastCommand == "left") &&
    parseInt(redState[1])-1 == parseInt(blueState[1])) || (redState == blueState); 
}

function moveOnboard(currentPosition, newPosition, color) {
    var ballElement;
    if(color == "red") {
        ballElement = redBall;
    }
    else { //color == "blue"
        ballElement = blueBall;
    }
    ballElement.innerHTML = newPosition;
    getDOM(currentPosition).removeChild(getDOM(currentPosition).childNodes[0]);
    getDOM(newPosition).appendChild(ballElement);
}

function moveStay(ballColor) {
    updateHTMLmetaData("stay", ballColor);
    if(ballColor == "red") { // update firebase only on red move
        saveToFirebase("stay");
    }
}

function moveRight() { //must be red ball (blue ball can't go right)
    saveToFirebase("right");
    var redState = getRedState();
    var num = parseInt(redState[1]);
    num++;
    var newRedState =  "a" + num;
    moveOnboard(redState, newRedState, "red");
    updateHTMLmetaData("right", "red");
    
}

function moveLeft() { //must be blue ball (red ball can't go right)
    var blueState = getBlueState();
    var num = parseInt(blueState[1]);
    num--;
    var newBlueState =  "a" + num;
    moveOnboard(blueState, newBlueState, "blue");
    updateHTMLmetaData("left", "blue");
}

function moveUp(ballColor) {
    if(ballColor == "red") { // update firebase only on blue move
        saveToFirebase("up");
    }
    var currentPosition;
    var newPosition;
    if(ballColor == "red") {
        currentPosition = getRedState();
    } else { //color == "blue"
        currentPosition = getBlueState();
    }
    newPosition =  "a" + parseInt(currentPosition[1]);
    moveOnboard(currentPosition, newPosition, ballColor);
    updateHTMLmetaData("up", ballColor);
    
}

function moveDown(ballColor) {
    if(ballColor == "red") { // update firebase only on blue move
        saveToFirebase("down");
    }
    var currentPosition;
    var newPosition;
    if(ballColor == "red") {
        currentPosition = getRedState();
    } else { //color == "blue"
        currentPosition = getBlueState();
    }
    newPosition =  "b" + parseInt(currentPosition[1]);
    moveOnboard(currentPosition, newPosition, ballColor);
    updateHTMLmetaData("down", ballColor);
    
}

function updateHTMLmetaData(action, ballColor) {
    if(ballColor == "red") {
        redCounterSteps++;
        redLastCommand = action;
        score += step;
        getDOM("steps").innerHTML = "Steps: "+ redCounterSteps;
        getDOM("score").innerHTML = "Score: "+ score;
        getDOM("panel").innerHTML += redCounterSteps + ". " + redBall.id + " move to: " + getRedState() + " action: " + action + "<br>";
    }
    else { // ballColor == blue
        blueCounterSteps++;
        blueLastCommand = action;
        getDOM("panel").innerHTML += blueCounterSteps + ". " + blueBall.id + " move to: " + getBlueState() + " action: " + action + "<br>";
    }
}

function saveToFirebase(redAction) {
    var blueState = getBlueState();
    var redState = getRedState();

    firebase.database().ref("games/"+postID+"/"+blueCounterSteps).set({
        "blue": blueBall.id + " move to: " + blueState +", action: " + blueLastCommand,
        "red": redBall.id + " move to: " + redState +", action: " + redLastCommand
    });

    firebase.database().ref("statistics/"+blueState+" "+redState).once('value',
    (snap) => {
        var number = snap.child(redAction).val();
        firebase.database().ref("statistics/"+previousBluePos+" "+redState+"/"+redAction).set(number+1);
    });
}

function showGame() {
    getDOM("board").style.display = "";
    getDOM("step_score").style.display = "flex";
    keyEnable = true;
}

function finishGame() { //update database
    getDOM("steps").innerHTML = "Steps: "+ redCounterSteps;
    getDOM("score").innerHTML = "Score: "+ score;
    getDOM("panel").innerHTML += "<br> end game <br>";
    firebase.database().ref("games/"+postID+"/steps").set(redCounterSteps);
    firebase.database().ref("games/"+postID+"/score").set(score);
    firebase.database().ref("games/"+postID+"/win").set(win);
    // Get the survey
    var survey = document.getElementById("survey");
    survey.style.display = "block";
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        survey.style.display = "none";
        keyEnable = false;
    }
    window.onclick = function(event) {
        if (event.target == survey) {
            survey.style.display = "none";
            keyEnable = false;
        }
    }
}

function submitSurvey(e) {
    e.preventDefault();
    //Get values
    var birthYear = getDOM("yBirth").value;
    var birthCountry = getDOM("cBirth").value;
    var gender = getDOM("gender").value;
    var education = getDOM("education").value;
    var drivinglicense = getDOM("drivinglicense").value;
    
    var aggressively_value = getRating("aggressively_rating");
    var generously_value = getRating("generously_rating");
    var wisely_value = getRating("wisely_rating");
    var computer_value = getRating("computer_rating");

    var additional_comments = getDOM("additionalcomments").value;

    if(birthYear === undefined || birthCountry === undefined || gender === undefined || education === undefined || drivinglicense === undefined ||
        aggressively_value === undefined || generously_value === undefined || wisely_value === undefined || computer_value === undefined) {
            getDOM("notFillAll").style.display = ""; 
        }
    else {
        firebase.database().ref("games/"+postID+"/birthYear").set(birthYear);
        firebase.database().ref("games/"+postID+"/birthCountry").set(birthCountry);
        firebase.database().ref("games/"+postID+"/gender").set(gender);
        firebase.database().ref("games/"+postID+"/education").set(education);
        firebase.database().ref("games/"+postID+"/drivinglicense").set(drivinglicense);
        firebase.database().ref("games/"+postID+"/aggressively_value").set(aggressively_value);
        firebase.database().ref("games/"+postID+"/generously_value").set(generously_value);
        firebase.database().ref("games/"+postID+"/wisely_value").set(wisely_value);
        firebase.database().ref("games/"+postID+"/computer_value").set(computer_value);
        firebase.database().ref("games/"+postID+"/additional_comments").set(birthYear);

        survey.style.display = "none";
        keyEnable = false;
    }
}

function getRating(s_rating) {
    var rating = document.getElementsByName(s_rating);
    for(var i = 0; i < rating.length; i++){
        if(rating[i].checked){
            return rating[i].value;
        }
    }
    return undefined;
}

function initializeFirebase() {
    // Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDROtt5r3t5VL_iPabcgVgsWmUZHMw7Pv8",
        authDomain: "road-game.firebaseapp.com",
        projectId: "road-game",
        storageBucket: "road-game.appspot.com",
        messagingSenderId: "14363967441",
        appId: "1:14363967441:web:c422a8a462e6352f2ceaf0"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}
