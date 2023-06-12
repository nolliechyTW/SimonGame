// Array of button colours
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to store the pattern of the game
var gamePattern = [];

// Array to store the pattern of the user's clicks
var userClickedPattern = [];

// Variable to track if the game has started
var started = false;

// Variable to store the current level
var level = 0;

// Event listener for keypress to start the game
$(document).keypress(function() {
  // Check if the game has already started
  if (!started) {
    // show the menu
    $("#menu").show();
    
    // Update the level title with the current level
    $("#level-title").text("Level " + level);

    // Generate the next sequence of button clicks
    nextSequence();

    // Set started to true to indicate that the game has started
    started = true;

     // Hide the menu after 10 seconds
     setTimeout(function() {
      $("#menu").hide();
    }, 10000); // 10000 milliseconds = 10 seconds
  }
});

// Event listener for button clicks
$(".btn").click(function() {
  // Get the colour of the clicked button
  var userChosenColour = $(this).attr("id");

  // Add the clicked colour to the user's pattern
  userClickedPattern.push(userChosenColour);

  // Play sound corresponding to the clicked colour
  playSound(userChosenColour);

  // Animate the clicked button
  animatePress(userChosenColour);

  // Check if the user's pattern matches the game's pattern
  checkAnswer(userClickedPattern.length-1);
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
  // Check if the user's current click matches the game's pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Check if the user has completed the current level
    if (userClickedPattern.length === gamePattern.length){
      // Wait for a second and then generate the next sequence
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Play the wrong sound and indicate game over
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Remove the game over class after 200 milliseconds
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Reset the game to its initial state
    startOver();
  }
}

// Function to generate the next sequence
function nextSequence() {
  // Reset the user's clicked pattern
  userClickedPattern = [];

  // Increase the level and update the level title
  level++;
  $("#level-title").text("Level " + level);

  // Generate a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);

  // Get the colour corresponding to the random number
  var randomChosenColour = buttonColours[randomNumber];

  // Add the random colour to the game's pattern
  gamePattern.push(randomChosenColour);

  // Flash the button with the random colour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play the sound corresponding to the random colour
  playSound(randomChosenColour);
}

// Function to animate the button press
function animatePress(currentColor) {
  // Add the pressed class to the button
  $("#" + currentColor).addClass("pressed");

  // Remove the pressed class after 100 milliseconds
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to play the sound
function playSound(name) {
  // Create a new audio element with the sound file
  var audio = new Audio("sounds/" + name + ".mp3");

  // Play the sound
  audio.play();
}

// Function to start the game over
function startOver() {
  // Reset the level, game pattern, and started variable
  level = 0;
  gamePattern = [];
  started = false;
}