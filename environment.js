class Environment {
    blueState;
    redState;
    states = [];
    probs = {
        "a1 a2":{
            "right":0.6666666667,
            "stay":0.1111111111,
            "up":0.1111111111,
            "down":0.1111111111
        },
        "a1 a3":{
            "right":0.8928571429,
            "stay":0.0357142857,
            "up":0.0357142857,
            "down":0.0357142857
        },
        "a1 a4":{
            "right":0.9166666667,
            "stay":0.0277777778,
            "up":0.0277777778,
            "down":0.0277777778
        },
        "a1 a5":{
            "right":0.8222222222,
            "stay":0.0666666667,
            "up":0.0222222222,
            "down":0.0888888889
        },
        "a1 b1":{
            "right":0.0357142857,
            "stay":0.7142857143,
            "up":0.2142857143,
            "down":0.0357142857
        },
        "a1 b2":{
            "right":0.1428571429,
            "stay":0.1428571429,
            "up":0.5714285714,
            "down":0.1428571429
        },
        "a1 b3":{
            "right":0.1,
            "stay":0.5,
            "up":0.3,
            "down":0.1
        },
        "a1 b5":{
            "right":0.1111111111,
            "stay":0.3333333333,
            "up":0.4444444444,
            "down":0.1111111111
        },
        "a2 a1":{
            "right":0.1666666667,
            "stay":0.5833333333,
            "up":0.0416666667,
            "down":0.2083333333
        },
        "a2 a3":{
            "right":0.7692307692,
            "stay":0.0769230769,
            "up":0.0769230769,
            "down":0.0769230769
        },
        "a2 a4":{
            "right":0.5714285714,
            "stay":0.1428571429,
            "up":0.1428571429,
            "down":0.1428571429
        },
        "a2 a5":{
            "right":0.4,
            "stay":0.2,
            "up":0.2,
            "down":0.2
        },
        "a2 b1":{
            "right":0.0666666667,
            "stay":0.4666666667,
            "up":0.4,
            "down":0.0666666667
        },
        "a2 b2":{
            "right":0.1,
            "stay":0.5,
            "up":0.3,
            "down":0.1
        },
        "a2 b3":{
            "right":0.0384615385,
            "stay":0.1923076923,
            "up":0.7307692308,
            "down":0.0384615385
        },
        "a2 b5":{
            "right":0.1428571429,
            "stay":0.2857142857,
            "up":0.4285714286,
            "down":0.1428571429
        },
        "a3 a1":{
            "right":0.2,
            "stay":0.55,
            "up":0.05,
            "down":0.2
        },
        "a3 a2":{
            "right":0.1923076923,
            "stay":0.1923076923,
            "up":0.0384615385,
            "down":0.5769230769
        },
        "a3 a5":{
            "right":0.5555555556,
            "stay":0.2222222222,
            "up":0.1111111111,
            "down":0.1111111111
        },
        "a3 b1":{
            "right":0.0555555556,
            "stay":0.5555555556,
            "up":0.3333333333,
            "down":0.0555555556
        },
        "a3 b2":{
            "right":0.0666666667,
            "stay":0.3333333333,
            "up":0.5333333333,
            "down":0.0666666667
        },
        "a3 b3":{
            "right":0.0294117647,
            "stay":0.6470588235,
            "up":0.2941176471,
            "down":0.0294117647
        },
        "a3 b5":{
            "right":0.1428571429,
            "stay":0.5714285714,
            "up":0.1428571429,
            "down":0.1428571429
        },
        "a4 a1":{
            "right":0.3793103448,
            "stay":0.4482758621,
            "up":0.0344827586,
            "down":0.1379310345
        },
        "a4 a2":{
            "right":0.5,
            "stay":0.3,
            "up":0.1,
            "down":0.1
        },
        "a4 a3":{
            "right":0.156626506,
            "stay":0.0240963855,
            "up":0.0120481928,
            "down":0.8072289157
        },
        "a4 a5":{
            "right":0.3333333333,
            "stay":0.5,
            "up":0.0833333333,
            "down":0.0833333333
        },
        "a4 b1":{
            "right":0.0526315789,
            "stay":0.5789473684,
            "up":0.3157894737,
            "down":0.0526315789
        },
        "a4 b2":{
            "right":0.0666666667,
            "stay":0.1333333333,
            "up":0.7333333333,
            "down":0.0666666667
        },
        "a4 b3":{
            "right":0.0344827586,
            "stay":0.4137931034,
            "up":0.5172413793,
            "down":0.0344827586
        },
        "a4 b5":{
            "right":0.1428571429,
            "stay":0.2857142857,
            "up":0.4285714286,
            "down":0.1428571429
        },
        "a5 a1":{
            "right":0.2333333333,
            "stay":0.6,
            "up":0.0333333333,
            "down":0.1333333333
        },
        "a5 a2":{
            "right":0.8282828283,
            "stay":0.0404040404,
            "up":0.0101010101,
            "down":0.1212121212
        },
        "a5 a3":{
            "right":0.5,
            "stay":0.0833333333,
            "up":0.0833333333,
            "down":0.3333333333
        },
        "a5 a4":{
            "right":0.2727272727,
            "stay":0.0909090909,
            "up":0.0909090909,
            "down":0.5454545455
        },
        "a5 b1":{
            "right":0.03125,
            "stay":0.4375,
            "up":0.5,
            "down":0.03125
        },
        "a5 b3":{
            "right":0.2,
            "stay":0.2,
            "up":0.4,
            "down":0.2
        },
        "a5 b4":{
            "right":0.125,
            "stay":0.25,
            "up":0.5,
            "down":0.125
        },
        "a5 b5":{
            "right":0.1666666667,
            "stay":0.5,
            "up":0.1666666667,
            "down":0.1666666667
        },
        "a6 a1":{
            "right":0.6586826347,
            "stay":0.1616766467,
            "up":0.005988024,
            "down":0.1736526946
        },
        "a6 a2":{
            "right":0.8125,
            "stay":0.0625,
            "up":0.0625,
            "down":0.0625
        },
        "a6 a3":{
            "right":0.6363636364,
            "stay":0.0909090909,
            "up":0.0909090909,
            "down":0.1818181818
        },
        "a6 a4":{
            "right":0.5454545455,
            "stay":0.0909090909,
            "up":0.0909090909,
            "down":0.2727272727
        },
        "a6 a5":{
            "right":0.2222222222,
            "stay":0.1111111111,
            "up":0.1111111111,
            "down":0.5555555556
        },
        "a6 b1":{
            "right":0.0454545455,
            "stay":0.7727272727,
            "up":0.1363636364,
            "down":0.0454545455
        },
        "a6 b3":{
            "right":0.2,
            "stay":0.2,
            "up":0.4,
            "down":0.2
        },
        "a6 b4":{
            "right":0.2,
            "stay":0.2,
            "up":0.4,
            "down":0.2
        },
        "a6 b5":{
            "right":0.1666666667,
            "stay":0.1666666667,
            "up":0.5,
            "down":0.1666666667
        },
        "b2 a1":{
            "right":0.1578947368,
            "stay":0.6315789474,
            "up":0.0526315789,
            "down":0.1578947368
        },
        "b2 a2":{
            "right":0.5,
            "stay":0.1666666667,
            "up":0.1666666667,
            "down":0.1666666667
        },
        "b2 a3":{
            "right":0.5714285714,
            "stay":0.1428571429,
            "up":0.1428571429,
            "down":0.1428571429
        },
        "b2 a4":{
            "right":0.4,
            "stay":0.2,
            "up":0.2,
            "down":0.2
        },
        "b2 a5":{
            "right":0.2,
            "stay":0.2,
            "up":0.2,
            "down":0.4
        },
        "b2 b1":{
            "right":0.0476190476,
            "stay":0.7142857143,
            "up":0.1904761905,
            "down":0.0476190476
        },
        "b2 b5":{
            "right":0.2,
            "stay":0.4,
            "up":0.2,
            "down":0.2
        },
        "b3 a1":{
            "right":0.2857142857,
            "stay":0.4285714286,
            "up":0.1428571429,
            "down":0.1428571429
        },
        "b3 a2":{
            "right":0.625,
            "stay":0.125,
            "up":0.125,
            "down":0.125
        },
        "b3 a3":{
            "right":0.5714285714,
            "stay":0.1428571429,
            "up":0.1428571429,
            "down":0.1428571429
        },
        "b3 a4":{
            "right":0.5714285714,
            "stay":0.1428571429,
            "up":0.1428571429,
            "down":0.1428571429
        },
        "b3 a5":{
            "right":0.2,
            "stay":0.2,
            "up":0.2,
            "down":0.4
        },
        "b3 b1":{
            "right":0.2,
            "stay":0.2,
            "up":0.4,
            "down":0.2
        },
        "b3 b2":{
            "right":0.1666666667,
            "stay":0.1666666667,
            "up":0.5,
            "down":0.1666666667
        },
        "b3 b5":{
            "right":0.1111111111,
            "stay":0.5555555556,
            "up":0.2222222222,
            "down":0.1111111111
        },
        "b4 a1":{
            "right":0.2857142857,
            "stay":0.2857142857,
            "up":0.1428571429,
            "down":0.2857142857
        },
        "b4 a2":{
            "right":0.5,
            "stay":0.1666666667,
            "up":0.1666666667,
            "down":0.1666666667
        },
        "b4 a3":{
            "right":0.7878787879,
            "stay":0.0909090909,
            "up":0.0303030303,
            "down":0.0909090909
        },
        "b4 a4":{
            "right":0.8571428571,
            "stay":0.0857142857,
            "up":0.0285714286,
            "down":0.0285714286
        },
        "b4 a5":{
            "right":0.7714285714,
            "stay":0.1428571429,
            "up":0.0285714286,
            "down":0.0571428571
        },
        "b4 b1":{
            "right":0.125,
            "stay":0.5,
            "up":0.25,
            "down":0.125
        },
        "b4 b3":{
            "right":0.0277777778,
            "stay":0.1944444444,
            "up":0.75,
            "down":0.0277777778
        },
        "b5 a1":{
            "right":0.2857142857,
            "stay":0.5714285714,
            "up":0.0714285714,
            "down":0.0714285714
        },
        "b5 a2":{
            "right":0.5,
            "stay":0.1666666667,
            "up":0.1666666667,
            "down":0.1666666667
        },
        "b5 a3":{
            "right":0.6,
            "stay":0.2,
            "up":0.1,
            "down":0.1
        },
        "b5 a4":{
            "right":0.6,
            "stay":0.1,
            "up":0.1,
            "down":0.2
        },
        "b5 a5":{
            "right":0.5,
            "stay":0.125,
            "up":0.125,
            "down":0.25
        },
        "b5 b1":{
            "right":0.2,
            "stay":0.4,
            "up":0.2,
            "down":0.2
        },
        "b5 b4":{
            "right":0.1428571429,
            "stay":0.1428571429,
            "up":0.5714285714,
            "down":0.1428571429
        },
        "b6 a1":{
            "right":0.3333333333,
            "stay":0.3333333333,
            "up":0.1111111111,
            "down":0.2222222222
        },
        "b6 a2":{
            "right":0.75,
            "stay":0.0833333333,
            "up":0.0833333333,
            "down":0.0833333333
        },
        "b6 a3":{
            "right":0.7692307692,
            "stay":0.0769230769,
            "up":0.0769230769,
            "down":0.0769230769
        },
        "b6 a4":{
            "right":0.7333333333,
            "stay":0.1333333333,
            "up":0.0666666667,
            "down":0.0666666667
        },
        "b6 a5":{
            "right":0.7857142857,
            "stay":0.0714285714,
            "up":0.0714285714,
            "down":0.0714285714
        },
        "b6 b1":{
            "right":0.0625,
            "stay":0.75,
            "up":0.125,
            "down":0.0625
        },
        "b6 b4":{
            "right":0.2,
            "stay":0.2,
            "up":0.4,
            "down":0.2
        },
        "b6 b5":{
            "right":0.2,
            "stay":0.2,
            "up":0.4,
            "down":0.2
        },
        ////////////////////////Set a random probability for states that do not appear in a database//////////////////////////////////
        
        "a1 a1":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "a1 b4":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "a2 a2":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "a2 b4":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "a3 a3":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "a4 a4":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "a3 a4":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "a3 b4":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "a4 b4":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "a5 a5":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "b2 b2":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "b2 b3":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "b2 b4":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "b3 b3":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "b3 b4":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "b4 b2":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "b4 b4":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "b4 b5":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "b5 b3":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "b5 b5":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        "b6 b3":{
            "right":0.25,
            "stay":0.25,
            "up":0.25,
            "down":0.25
        },
        // "a3 "

    };

    ns;
    constructor(blueState, redState) {
        if(!blueState || typeof blueState !== 'string' || !blueState.trim().length) {
            throw new Error('State must be a non-empty String');
          }
        if(!redState || typeof redState !== 'string' || !redState.trim().length) {
            throw new Error('State must be a non-empty String');
        }
        this.blueState = blueState;
        this.redState = redState;
        for(var k in this.probs) this.states.push(k);
        this.ns = this.states.length;
    }

    getStates() {
        return this.states;
    }

    allowedActions(state, ballColor) {
        if (state.startsWith("a1") && ballColor == "blue") {
            return ["stay"];
        }
        if(state.startsWith("a6") &&  ballColor == "red") {
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
    
    nextStateDistribution(state, action) {
        var nextstate;
        var redPosition = state.split(" ")[1];
        if(action == "left") {
            nextstate = "a" + (parseInt(state[1])-1) + " " + redPosition;
        }
        else if(action == "right") {
            nextstate = "a" + (parseInt(state[1])+1) + " " + redPosition;
        }
        else if(action == "down") {
            nextstate = "b" + parseInt(state[1]) + " " + redPosition;
        }
        else if(action == "up") {
            nextstate = "a" + parseInt(state[1]) + " " + redPosition;
        }
        else if(action == "stay") {
            nextstate = state;
        }
        return nextstate;
    }

    reward(currentState,action,newState) {
        if(newState.startsWith("a1")) {
            return 10;
        }
        if(newState.endsWith(this.redState)) {
            return -100;
        }
        else return -1;
    }

    transition_function(currentState,action) {
        return this.probs[currentState][action];
    }
}