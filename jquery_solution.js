var btn_colors = ["red", "blue", "green", "yellow"];
var computer_pattern = [];
var user_pattern = [];
var start = false;
var level = 0;

function randomPattern() {
  user_pattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var random_color_picked = btn_colors[randomNumber];
  computer_pattern.push(random_color_picked);
  $("." + random_color_picked)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(random_color_picked);
  level++;
  $("h1").text("Level " + level);
}

$(document).keypress(function () {
  if (!start) {
    $("h1").text("Level 0");
    randomPattern();
    start = true;
  }
});

$(".btn").click(function () {
  var random_color_user = $(this).attr("id");
  console.log(random_color_user);
  user_pattern.push(random_color_user);
  playSound(random_color_user);
  animatePressBtn(random_color_user);
  validatePatterns(user_pattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePressBtn(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function validatePatterns(currentLevel) {
  if (computer_pattern[currentLevel] === user_pattern[currentLevel]) {
    console.log("Success");
    if (user_pattern.length === computer_pattern.length) {
      setTimeout(function () {
        randomPattern();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    var error = new Audio("sounds/wrong.mp3");
    error.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  computer_pattern = [];
  user_pattern = [];
  start = false;
}
