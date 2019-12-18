

var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = -1;
var currentLevel = -1;

$(".btn").click(function (){
  console.log(2);
  var id = $(this).attr("id");
  playSound(id);
  animatePress(id);
   userColorChosen = $(this).attr("id");
   userClickedPattern.push(userColorChosen);
   currentLevel += 1;
   console.log(userClickedPattern);
   checkAnswer(currentLevel);
});

function nextSequence(){
    level += 1;
    $("#level-title").text("Level "+level);
    randomNumber = Math.floor(Math.random()*3);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    fadeButton(randomChosenColor);
    playSound(randomChosenColor);
}

function playSound(name){
  var filename = "sounds/"+name+".mp3";
  console.log(filename);
   var audio = new Audio(filename);
   audio.play();
}

function fadeButton(id){
  $("#"+id).fadeOut(100);
  $("#"+id).fadeIn(100);
}

function animatePress(currentColor){
  //$(currentColor).addClass("pressed");
  console.log(currentColor);
  $("#"+currentColor).addClass("pressed").delay(100).queue(function(){
    $(this).removeClass("pressed").dequeue();
  });
}

function checkAnswer(cl){
  console.log("currentLevel "+cl);

    console.log(userClickedPattern[cl]+"--"+gamePattern[cl]);
    if(userClickedPattern[cl]!=gamePattern[cl]){
        console.log("failure");
        gameOver();
        startOver();
        return;
    }

  if(currentLevel==level){
    console.log("success");
    userClickedPattern = [];
    currentLevel = -1;
    console.log("currentLevel reset "+currentLevel);
    setTimeout(function() {
      //your code to be executed after 1 second
      nextSequence();
    }, 1000);
  }
}

function gameOver(){
  playSound("wrong");
  $("body").addClass("game-over").delay(200).queue(function(){
    $(this).removeClass("game-over").dequeue();
  })
  $(document).keypress(function (e){
    $(document).off("keypress");  
    nextSequence();
  });
  $("#level-title").text("Game Over, Press Any Key to Restart");
}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = -1;
  currentLevel = -1;
}


$(document).keypress(function (e){
  $(document).off("keypress");
  nextSequence();
});
