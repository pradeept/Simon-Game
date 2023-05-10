var buttonColours = ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern = [];
var level=0;
var started = false;

// For starting the game.
$(document).keypress(function (){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    } 
})

// For next color sequence
function nextSequence(){
    level++; 
    userClickedPattern=[];
    $("#level-title").text("Level "+level);

    randomeNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomeNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// setting Buttons event listeners.
for(var i=0;i<4;i++){
    $("."+buttonColours[i]).click(function (e){
        var userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    });
}

// For checking the entered pattern matches with the randomly computer generated pattern.
function checkAnswer (currentLevel) { 

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            },1000);
        }
        // if lengths are not same nothing happens.
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },1000)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
  }

//   For playing curresponding sounds
function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

// For adding animation for button presses. 
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
		$("#"+currentColour).removeClass("pressed");
	}, 100);
  }

//   To restart the game's state.
function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern = [];
    started = false;
}
