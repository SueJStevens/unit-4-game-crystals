var game = {
    states : [ "notStarted", "inProgress", "over" ],
    currentState : "NotStarted",
    crystals : [ "red", "blue",  "yellow", "green" ],
    crystalVal : [ 0, 0, 0, 0],
    matchNum : 0,
    valDeck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ,12],

    runningCalc : 0,
    wins : 0,
    losses : 0,

    randomIntFromInterval : function(min,max) {
        game.matchNum = Math.floor(Math.random()*(max-min+1)+min);
        return game.matchNum;
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

$(function() {

    restart();

    //onclick event listener
    $(".crystal").on("click",function(){
        game.state = "inProgress"

        //get the value of the crystal clicked
        x = $(this).attr("value");

        //populate running calc field by passing the value of crystal into the addVal function
        $("#runningCalc").text( game.addVal(x) );

        //Test For Win/Loss/still in progress
        switch(true) {
            case (game.runningCalc === game.matchNum):
                game.wins += 1;
                $("#winCounter").text(game.wins);
                game.state = "over";
                restart();
                break;
            case (game.runningCalc >= game.matchNum):
                game.losses += 1;
                $("#lossCounter").text(game.losses);
                game.state = "over";
                restart();
                break;
            default:
                console.log("Game in Progress")
           }    
    });

    function restart() {
        //Reset Running Total
        game.runningCalc = 0;
        $("#runningCalc").text( game.runningCalc );

        //get the initial random number Between!!! lower boundery of 19 and upper boundery of 120 
        //translation:  min:20, max:119
        matchNum = (game.randomIntFromInterval(20, 119) );
        //display MatchNum to user
        $("#matchNum").text(matchNum);

        //get the initial random number for each crystal which must be "between 1 - 12" 
        //Developer Note:  This is clearly bad instruction as the number 1 is allowed per the video and so is 12.
        //question: duplicate allowed? --developer says no
        //https://www.frankmitchell.org/2015/01/fisher-yates/
        game.shuffle(game.valDeck);
        for (var i=0; i<game.crystals.length; i++) {

            //return 1st four values in the shuffled array
            game.crystalVal[i] = ( game.valDeck[i] );
            //display but just for development purposes
            $("#"+game.crystals[i]).text(game.crystalVal[i]);
            $("#crystal-"+game.crystals[i]).attr("value", game.crystalVal[i]);
        }

    };



    /*--    _
    .__(.)< (MEOW)
     \___)   
~~~~~~~~~~~~~~~~~~*/   

$("#instructions_close").on("click", function() {

    closeDiv("#instructions");

});

    function closeDiv(elID) {
        //get class attribute of Toggle
        var str = $(elID).attr("class");

        //check to see if class attributes include either the display none or the display block class
        var n = str.search("d-none"); //then toggle to d-block
        var b = str.search("d-block"); //then toggle to d-none

        //toggle the class
        if (n>=0) {
            $(elID).removeClass( "d-none" ).addClass( "d-block" );
        } else {
            $(elID).removeClass( "d-block" ).addClass( "d-none" );
        }

    } 

/*--    _
.__(.)< (MEOW)
 \___)   
~~~~~~~~~~~~~~~~~~*/    

    $('#popoverData').popover();


    


});