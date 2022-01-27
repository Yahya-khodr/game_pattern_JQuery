var btn_colors = ["red", "blue", "green", "yellow"];
var computer_pattern = [];
var user_pattern = [];
var start = false;
var level = 0;
var buttons = document.getElementsByClassName("btn");

/* computer next sequence patterns */
function randomPattern() {
  user_pattern = [];
  var random_number = Math.floor(Math.random() * 4);
  var random_color_picked = btn_colors[random_number];
  computer_pattern.push(random_color_picked);
  animatePressBtn(random_color_picked);
  playSound(random_color_picked);
  level++;
  document.querySelector("h1").textContent = "Level " + level;
}

/* user patterns sequence */

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function (event) {
    var random_color_user = event.target.id;
    user_pattern.push(random_color_user);
    animatePressBtn(random_color_user);
    playSound(random_color_user);
    validatePatterns(user_pattern.length - 1);
  });
}

function animatePressBtn(current_color) {
  document.querySelector("#" + current_color).classList.add("pressed");
  setTimeout(function () {
    document.querySelector("#" + current_color).classList.remove("pressed");
  }, 100);
}
/* sound list picker */
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/* game start */
document.addEventListener("keypress", function () {
  if (!start) {
    document.querySelector("h1").textContent = "Level 0";
    console.log("gamestarted");
    randomPattern();
    start = true;
  }
});
/* check both patterns for the results */
function validatePatterns(current_level) {
  if (computer_pattern[current_level] === user_pattern[current_level]) {
    if (computer_pattern.length === user_pattern.length) {
      setTimeout(function () {
        randomPattern();
      }, 1000);
    }
  } else {
    var error = new Audio("sounds/wrong.mp3");
    error.play();
    document.body.classList.add("game-over");
    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 200);
    document.querySelector("h1").textContent =
      "Game Over , Press Any key to start again !";
    startOver();
  }
}

/* when game over */
function startOver() {
  level = 0;
  user_pattern = [];
  computer_pattern = [];
  start = false;
}
