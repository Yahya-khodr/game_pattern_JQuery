var btn_colors = ["red", "blue", "green", "yellow"];
var computer_pattern = [];
var user_pattern = [];
var start = false;
var level = 0;

document.addEventListener("keypress", function () {
  if (!start) {
    document.querySelector("h1").textContent = "Level 0";
    console.log("gamestarted");
    // randomPattern();
    start = true;
  }
});
function startOver() {
  level = 0;
  user_pattern = [];
  computer_pattern = [];
  start = false;
}
