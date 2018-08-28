var game = {
    states : [ "notStarted", "inProgress", "over" ],
    currentState : "NotStarted",
    crystals : [ "red", "blue",  "yellow", "green" ],
    crystalVal : [ 0, 0, 0, 0],
    matchNum : 0,
    test: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ,12],

    runningCalc : 0,

    randomIntFromInterval : function(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    },

    shuffle : function(array) {
        var i = 0
          , j = 0
          , temp = null
      
        for (i = array.length - 1; i > 0; i -= 1) {
          j = Math.floor(Math.random() * (i + 1))
          temp = array[i]
          array[i] = array[j]
          array[j] = temp
        }

        return array;
      },

    addVal : function(int) {
        game.runningCalc = game.runningCalc + parseInt(int);
        return game.runningCalc;

    }

} //end game object

$(document).ready(function() {

    //get the initial random number Between!!! lower boundery of 19 and upper boundery of 120 
    //translation:  min:20, max:119
    matchNum = (game.randomIntFromInterval(20, 119) );
    //display MatchNum to user
    $("#matchNum").text(matchNum);

    //get the initial random number for each crystal which must be "between 1 - 12" 
    //Developer Note:  This is clearly bad instruction as the number 1 is allowed per the video and so is 12.
    //question: duplicate allowed? --developer says no
    //https://www.frankmitchell.org/2015/01/fisher-yates/
    game.shuffle(game.test);
    for (var i=0; i<game.crystals.length; i++) {

        //return 1st four values in the shuffled array
        game.crystalVal[i] = ( game.test[i] );
        //display but just for development purposes
        $("#"+game.crystals[i]).text(game.crystalVal[i]);
        $("#crystal-"+game.crystals[i]).attr("value", game.crystalVal[i]);

    }

    //onclick event listener
    $(".crystal").on("click",function(){
        game.state = "inProgress"

        //get the value of the crystal clicked
        x = $(this).attr("value");

        //populate running calc field by passing the value of crystal into the addVal function
        $("#runningCalc").text( game.addVal(x) );

        //Test For Win/Loss
            //if win increment win
            //if loss increment loss
        //change game state to over
            //pull new random numbers

        


    });

    


});