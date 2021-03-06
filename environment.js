class Environment {
    blueState;
    redState;
    states = [];
    probs = {
        "a1 a2":{
            "right":0.75,
            "stay":0.125,
            "up":0.0,
            "down":0.125
        },
        "a1 a3":{
            "right":0.9259259259,
            "stay":0.037037037,
            "up":0.0,
            "down":0.037037037
        },
        "a1 a4":{
            "right":0.9428571429,
            "stay":0.0285714286,
            "up":0.0,
            "down":0.0285714286
        },
        "a1 a5":{
            "right":0.8409090909,
            "stay":0.0681818182,
            "up":0.0,
            "down":0.0909090909
        },
        "a1 b1":{
            "right":0.0,
            "stay":0.7692307692,
            "up":0.2307692308,
            "down":0.0
        },
        "a1 b2":{
            "right":0.0,
            "stay":0.2,
            "up":0.8,
            "down":0.0
        },
        "a1 b3":{
            "right":0.0,
            "stay":0.625,
            "up":0.375,
            "down":0.0
        },
        "a1 b5":{
            "right":0.0,
            "stay":0.4285714286,
            "up":0.5714285714,
            "down":0.0
        },
        "a2 a1":{
            "right":0.1739130435,
            "stay":0.6086956522,
            "up":0.0,
            "down":0.2173913043
        },
        "a2 a3":{
            "right":0.8333333333,
            "stay":0.0833333333,
            "up":0.0,
            "down":0.0833333333
        },
        "a2 a4":{
            "right":0.6666666667,
            "stay":0.1666666667,
            "up":0.0,
            "down":0.1666666667
        },
        "a2 a5":{
            "right":0.5,
            "stay":0.25,
            "up":0.0,
            "down":0.25
        },
        "a2 b1":{
            "right":0.0,
            "stay":0.5384615385,
            "up":0.4615384615,
            "down":0.0
        },
        "a2 b2":{
            "right":0.0,
            "stay":0.625,
            "up":0.375,
            "down":0.0
        },
        "a2 b3":{
            "right":0.0,
            "stay":0.2083333333,
            "up":0.7916666667,
            "down":0.0
        },
        "a2 b5":{
            "right":0.0,
            "stay":0.4,
            "up":0.6,
            "down":0.0
        },
        "a3 a1":{
            "right":0.2105263158,
            "stay":0.5789473684,
            "up":0.0,
            "down":0.2105263158
        },
        "a3 a2":{
            "right":0.2,
            "stay":0.2,
            "up":0.0,
            "down":0.6
        },
        "a3 a5":{
            "right":0.625,
            "stay":0.25,
            "up":0.0,
            "down":0.125
        },
        "a3 b1":{
            "right":0.0,
            "stay":0.625,
            "up":0.375,
            "down":0.0
        },
        "a3 b2":{
            "right":0.0,
            "stay":0.3846153846,
            "up":0.6153846154,
            "down":0.0
        },
        "a3 b3":{
            "right":0.0,
            "stay":0.6875,
            "up":0.3125,
            "down":0.0
        },
        "a3 b5":{
            "right":0.0,
            "stay":0.8,
            "up":0.2,
            "down":0.0
        },
        "a4 a1":{
            "right":0.3928571429,
            "stay":0.4642857143,
            "up":0.0,
            "down":0.1428571429
        },
        "a4 a2":{
            "right":0.5555555556,
            "stay":0.3333333333,
            "up":0.0,
            "down":0.1111111111
        },
        "a4 a3":{
            "right":0.1585365854,
            "stay":0.0243902439,
            "up":0.0,
            "down":0.8170731707
        },
        "a4 a5":{
            "right":0.3636363636,
            "stay":0.5454545455,
            "up":0.0,
            "down":0.0909090909
        },
        "a4 b1":{
            "right":0.0,
            "stay":0.6470588235,
            "up":0.3529411765,
            "down":0.0
        },
        "a4 b2":{
            "right":0.0,
            "stay":0.1538461538,
            "up":0.8461538462,
            "down":0.0
        },
        "a4 b3":{
            "right":0.0,
            "stay":0.4444444444,
            "up":0.5555555556,
            "down":0.0
        },
        "a4 b5":{
            "right":0.0,
            "stay":0.4,
            "up":0.6,
            "down":0.0
        },
        "a5 a1":{
            "right":0.2413793103,
            "stay":0.6206896552,
            "up":0.0,
            "down":0.1379310345
        },
        "a5 a2":{
            "right":0.8367346939,
            "stay":0.0408163265,
            "up":0.0,
            "down":0.1224489796
        },
        "a5 a3":{
            "right":0.5454545455,
            "stay":0.0909090909,
            "up":0.0,
            "down":0.3636363636
        },
        "a5 a4":{
            "right":0.3,
            "stay":0.1,
            "up":0.0,
            "down":0.6
        },
        "a5 b1":{
            "right":0.0,
            "stay":0.4666666667,
            "up":0.5333333333,
            "down":0.0
        },
        "a5 b3":{
            "right":0.0,
            "stay":0.3333333333,
            "up":0.6666666667,
            "down":0.0
        },
        "a5 b4":{
            "right":0.0,
            "stay":0.3333333333,
            "up":0.6666666667,
            "down":0.0
        },
        "a5 b5":{
            "right":0.0,
            "stay":0.75,
            "up":0.25,
            "down":0.0
        },
        "a6 a1":{
            "right":0.6626506024,
            "stay":0.1626506024,
            "up":0.0,
            "down":0.1746987952
        },
        "a6 a2":{
            "right":0.8666666667,
            "stay":0.0666666667,
            "up":0.0,
            "down":0.0666666667
        },
        "a6 a3":{
            "right":0.7,
            "stay":0.1,
            "up":0.0,
            "down":0.2
        },
        "a6 a4":{
            "right":0.6,
            "stay":0.1,
            "up":0.0,
            "down":0.3
        },
        "a6 a5":{
            "right":0.25,
            "stay":0.125,
            "up":0.0,
            "down":0.625
        },
        "a6 b1":{
            "right":0.0,
            "stay":0.85,
            "up":0.15,
            "down":0.0
        },
        "a6 b3":{
            "right":0.0,
            "stay":0.3333333333,
            "up":0.6666666667,
            "down":0.0
        },
        "a6 b4":{
            "right":0.0,
            "stay":0.3333333333,
            "up":0.6666666667,
            "down":0.0
        },
        "a6 b5":{
            "right":0.0,
            "stay":0.25,
            "up":0.75,
            "down":0.0
        },
        "b2 a1":{
            "right":0.1666666667,
            "stay":0.6666666667,
            "up":0.0,
            "down":0.1666666667
        },
        "b2 a2":{
            "right":0.6,
            "stay":0.2,
            "up":0.0,
            "down":0.2
        },
        "b2 a3":{
            "right":0.6666666667,
            "stay":0.1666666667,
            "up":0.0,
            "down":0.1666666667
        },
        "b2 a4":{
            "right":0.5,
            "stay":0.25,
            "up":0.0,
            "down":0.25
        },
        "b2 a5":{
            "right":0.25,
            "stay":0.25,
            "up":0.0,
            "down":0.5
        },
        "b2 b1":{
            "right":0.0,
            "stay":0.7894736842,
            "up":0.2105263158,
            "down":0.0
        },
        "b2 b5":{
            "right":0.0,
            "stay":0.6666666667,
            "up":0.3333333333,
            "down":0.0
        },
        "b3 a1":{
            "right":0.3333333333,
            "stay":0.5,
            "up":0.0,
            "down":0.1666666667
        },
        "b3 a2":{
            "right":0.7142857143,
            "stay":0.1428571429,
            "up":0.0,
            "down":0.1428571429
        },
        "b3 a3":{
            "right":0.6666666667,
            "stay":0.1666666667,
            "up":0.0,
            "down":0.1666666667
        },
        "b3 a4":{
            "right":0.6666666667,
            "stay":0.1666666667,
            "up":0.0,
            "down":0.1666666667
        },
        "b3 a5":{
            "right":0.25,
            "stay":0.25,
            "up":0.0,
            "down":0.5
        },
        "b3 b1":{
            "right":0.0,
            "stay":0.3333333333,
            "up":0.6666666667,
            "down":0.0
        },
        "b3 b2":{
            "right":0.0,
            "stay":0.25,
            "up":0.75,
            "down":0.0
        },
        "b3 b5":{
            "right":0.0,
            "stay":0.7142857143,
            "up":0.2857142857,
            "down":0.0
        },
        "b4 a1":{
            "right":0.3333333333,
            "stay":0.3333333333,
            "up":0.0,
            "down":0.3333333333
        },
        "b4 a2":{
            "right":0.6,
            "stay":0.2,
            "up":0.0,
            "down":0.2
        },
        "b4 a3":{
            "right":0.8125,
            "stay":0.09375,
            "up":0.0,
            "down":0.09375
        },
        "b4 a4":{
            "right":0.8823529412,
            "stay":0.0882352941,
            "up":0.0,
            "down":0.0294117647
        },
        "b4 a5":{
            "right":0.7941176471,
            "stay":0.1470588235,
            "up":0.0,
            "down":0.0588235294
        },
        "b4 b1":{
            "right":0.0,
            "stay":0.6666666667,
            "up":0.3333333333,
            "down":0.0
        },
        "b4 b3":{
            "right":0.0,
            "stay":0.2058823529,
            "up":0.7941176471,
            "down":0.0
        },
        "b5 a1":{
            "right":0.3076923077,
            "stay":0.6153846154,
            "up":0.0,
            "down":0.0769230769
        },
        "b5 a2":{
            "right":0.6,
            "stay":0.2,
            "up":0.0,
            "down":0.2
        },
        "b5 a3":{
            "right":0.6666666667,
            "stay":0.2222222222,
            "up":0.0,
            "down":0.1111111111
        },
        "b5 a4":{
            "right":0.6666666667,
            "stay":0.1111111111,
            "up":0.0,
            "down":0.2222222222
        },
        "b5 a5":{
            "right":0.5714285714,
            "stay":0.1428571429,
            "up":0.0,
            "down":0.2857142857
        },
        "b5 b1":{
            "right":0.0,
            "stay":0.6666666667,
            "up":0.3333333333,
            "down":0.0
        },
        "b5 b4":{
            "right":0.0,
            "stay":0.2,
            "up":0.8,
            "down":0.0
        },
        "b6 a1":{
            "right":0.375,
            "stay":0.375,
            "up":0.0,
            "down":0.25
        },
        "b6 a2":{
            "right":0.8181818182,
            "stay":0.0909090909,
            "up":0.0,
            "down":0.0909090909
        },
        "b6 a3":{
            "right":0.8333333333,
            "stay":0.0833333333,
            "up":0.0,
            "down":0.0833333333
        },
        "b6 a4":{
            "right":0.7857142857,
            "stay":0.1428571429,
            "up":0.0,
            "down":0.0714285714
        },
        "b6 a5":{
            "right":0.8461538462,
            "stay":0.0769230769,
            "up":0.0,
            "down":0.0769230769
        },
        "b6 b1":{
            "right":0.0,
            "stay":0.8571428571,
            "up":0.1428571429,
            "down":0.0
        },
        "b6 b4":{
            "right":0.0,
            "stay":0.3333333333,
            "up":0.6666666667,
            "down":0.0
        },
        "b6 b5":{
            "right":0.0,
            "stay":0.3333333333,
            "up":0.6666666667,
            "down":0.0
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