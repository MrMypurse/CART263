"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);
//Set up game state to change between menu, main game and ending
let state = 'TITLE';
//Set up objects intervals
let wateringInterval;
let fertilizingInterval;
let trimmingInterval;
let weedsInterval;
let weedsGrowingTime;
//Set up variables
let $weeds;
let $tree;
let $watercan;
let $fertilizer;
let $scissor;
let waterlevel = 0;
let fertilizelevel = 0;
//set up variables to store generated poems
let generatedPoem;
let createSentence;
//Add background music and sound effect
const clickSound = new Audio('assets/sounds/click.wav');
const ambienceSound = new Audio('assets/sounds/ambience.mp3');
const bagSound = new Audio('assets/sounds/bag.mp3');
const fertilizeSound = new Audio('assets/sounds/fertilize.mp3');
const wateringSound = new Audio('assets/sounds/watering.mp3');
const canSound = new Audio('assets/sounds/can.mp3');
const scissorSound = new Audio('assets/sounds/scissor.mp3');

//setup()
//
//Set up variables and call functions to start game
function setup() {
  //start game with the menu and play background music
  changeScreen();
  generateSounds();
  // Call for generating new poem
  newPoem();
  speakPoem();
  //Get datas
  $.getJSON('data/data.json')
    .done(dataLoaded)
    .fail(dataNotLoaded);
  //Set up Annyang voice commande
  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
      'start game': function() {
        $('#title').hide();
        $('#introduction').hide();
        $('#gamebox').show();
        state = 'PLAY';
      },
      'hello': function() {
        waterlevel = waterlevel + 5;
        fertilizelevel = fertilizelevel + 5;
        newPoem();
      },
      'I love you': function() {
        waterlevel = watelevel + 5;
        fertilizelevel = fertilizelevel + 5;
        newPoem();
        }
    };
    // Add commands to annyang
    annyang.addCommands(commands);
    // Start listening
    annyang.start();
  };

  //store classes in variables
  $weeds = $('#weeds');
  $tree = $('#tree');
  $watercan = $('#watercan');
  $fertilizer = $('#fertilizer');
  $scissor = $('#scissor');
  //Make the objects draggable
  $scissor.draggable();
  $watercan.draggable();
  $fertilizer.draggable();
  $tree.droppable({
    drop: onDrop
  });
  //Play sound when interacted with watering can
  $watercan.on("mousedown", function() {
    canSound.play();
  })
  //Play sound when interacted with fertilizing bag
  $fertilizer.on("mousedown", function() {
    bagSound.play();
  })
  //Check for collision when the mouse is dragging the watering can
  $watercan.on("mouseup", function() {
    wateringCollision();
    treeGrowth();
  })
  //Check for collision when the mouse is dragging the fertilizing bag
  $fertilizer.on("mouseup", function() {
    fertilizingCollision();
    treeGrowth();
  })
  // Check for collision when the mouse is draggin the scissor
  $scissor.on("mouseup", function() {
    scissorCollision();
  })

}

function onDrop(event, ui) {
  console.log("DROPPED");
}

//changeScreen()
//
//Change screen from menu to gameplay when the menu is clicked
function changeScreen() {
  if (state === 'TITLE') {
    $('body').click(function() {
      $('#title').hide();
      $('#introduction').hide();
      $('#gamebox').show();
    });
    state = 'PLAY';
    console.log(state);
  }
}

//getPositions()
//
//Store the objects'positions in arrays
function getPositions(object) {
  let objectPosition = object.position();
  let objectWidth = object.width();
  let objectHeight = object.height();
  return [
    [objectPosition.left, objectPosition.left + objectWidth],
    [objectPosition.top, objectPosition.top + objectHeight]
  ];
}

//comparePositions()
//
//Compare the positions of two objects and return true or false
function comparePositions(p1, p2) {
  let x1 = p1[0] < p2[0] ? p1 : p2;
  let x2 = p1[0] < p2[0] ? p2 : p1;
  return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
}

//checkCollision()
//
//Verify if two objects are colliding
function checkCollision(a, b) {
  let position1 = getPositions(a);
  let position2 = getPositions(b);
  let horizontalMatch = comparePositions(position1[0], position2[0]);
  let verticalMatch = comparePositions(position1[1], position2[1]);
  let match = horizontalMatch && verticalMatch;
  return match;
}

//wateringAnimation()
//
//Play the watering animation when two objects collide
function wateringAnimation() {
  if ($watercan.attr("src") === "assets/images/watercan0.png") {
    $watercan.attr("src", "assets/images/watercan1.png");
  } else {
    $watercan.attr("src", "assets/images/watercan0.png");
  }
}

//fertilizingAnimation()
//
//Play the fertilizing animation when two objects collide
function fertilizingAnimation() {
  if ($fertilizer.attr('src') === 'assets/images/fertilizer0.png') {
    $fertilizer.attr('src', 'assets/images/fertilizer1.png');
  } else {
    $fertilizer.attr('src', 'assets/images/fertilizer0.png');
  }
}

//trimmingAnimation()
//
//Play the trimming animation when two objects collide
function trimmingAnimation() {
  if ($scissor.attr('src') === 'assets/images/scissor0.png') {
    $scissor.attr('src', 'assets/images/scissor1.png');
  } else {
    $scissor.attr('src', 'assets/images/scissor0.png');
  }
}

//wateringCollision()
//
//Call checking collision between watering can and tree
function wateringCollision() {
  let collision = checkCollision($watercan, $tree);
  //if the two objects collide, play the sound effects, raise waterlevel and play the animation
  if (collision === true) {
    wateringSound.play();
    waterlevel = waterlevel + 5;
    newPoem();
    if (!wateringInterval) {
      wateringInterval = setInterval(wateringAnimation, 300);
    }
  } else {
    clearInterval(wateringInterval);
    wateringInterval = false;
    $watercan.attr("src", "assets/images/watercan0.png");
  }
}

//fertilizingCollision()
//
//Call checking collision between fertilizer and tree
function fertilizingCollision() {
  let collision = checkCollision($fertilizer, $tree);
  //if the two objects collide, play the sound effects, raise fertilizing level and play the animation
  if (collision === true) {
    fertilizeSound.play();
    fertilizelevel = fertilizelevel + 5;
    newPoem();
    if (!fertilizingInterval) {
      fertilizingInterval = setInterval(fertilizingAnimation, 200);
    }
  } else {
    clearInterval(fertilizingInterval);
    fertilizingInterval = false;
    $fertilizer.attr('src', 'assets/images/fertilizer0.png');
  }
}

//scissorCollision()
//
//Call checking collision between fertilizer and tree
function scissorCollision() {
  let collision = checkCollision($scissor, $tree);
  //if the two objects collide, play the sound effects and play the animation
  if (collision === true) {
    $('.poem').remove();
    scissorSound.play();
    newPoem();
    //$('body').append('<p>trimmed</p>');
    if (!trimmingInterval) {
      trimmingInterval = setInterval(trimmingAnimation, 200);
      $('#weeds').hide();
      clearInterval(weedsInterval);
    }
  } else {
    clearInterval(trimmingInterval);
    weedsInterval = setInterval(weedsGrowth, weedsGrowingTime);
    trimmingInterval = false;
    $scissor.attr('src', 'assets/images/scissor0.png');
  }
}

function weedsGrowth() {
  weedsGrowingTime = 20000 + Math.floor(Math.random() * 5);
  $('#weeds').show();
}
//treeGrowth()
//
//Check for water level and fertilizing level to grow the tree
function treeGrowth() {
  if (waterlevel >= 20 && fertilizelevel >= 20) {
    $tree.attr("src", "assets/images/tree1.png");
  };
  if (waterlevel >= 40 && fertilizelevel >= 40) {
    $tree.attr("src", "assets/images/tree2.png");
  };
  if (waterlevel >= 60 && fertilizelevel >= 60) {
    $tree.attr("src", "assets/images/tree3.png");
  };
  if (waterlevel >= 80 && fertilizelevel >= 80) {
    $tree.attr("src", "assets/images/tree4.png");
  };
  if (waterlevel >= 100 && fertilizelevel >= 100) {
    $tree.attr("src", "assets/images/tree5.png");
  };
  if (waterlevel >= 120 && fertilizelevel >= 120) {
    $tree.attr("src", "assets/images/tree6.png");
  };
  if (waterlevel >= 140 && fertilizelevel >= 140) {
    $tree.attr("src", "assets/images/tree7.png");
  };
  if (waterlevel >= 160 && fertilizelevel >= 160) {
    $tree.attr("src", "assets/images/tree8.png");
    state = 'END';
    endGame();
  };
}

//dataLoaded
//
//Generate poems from the data if it is correctly loaded and add new poem to the body
function dataLoaded(data) {
  //console.log(data);
  let randomPoem = getRandomArrayElement(data.text);
  generatedPoem = `${randomPoem}`;
  //Make a div box for the sentence and store the sentence in
  createSentence = $('<div></div>');
  createSentence.addClass('poem');
  createSentence.text(randomPoem);
  createSentence.appendTo('#poembox');
}

//dataNotLoaded()
//
//Insult you if the data isn't correctly loaded
function dataNotLoaded(request, text, error) {
  console.error('You fudged up.');
}

//getRandomArrayElement(array)
//
//a function to pick random element from an array
function getRandomArrayElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}

//newPoem()
//
//Add new generated poem when the tree is clicked
function newPoem() {
    $('.poem').remove();
    $.getJSON('data/data.json')
      .done(dataLoaded)
      .fail(dataNotLoaded);
}

//speakPoem()
//
//a function to call responsiveVoice to speak the words that the user clicked on
function speakPoem() {
  $('#tree').click(function(){
    responsiveVoice.speak($(createSentence).text(), 'UK English Female');
});
}

//generatedSounds()
//
//Play background sounds and objects' sound effects
function generateSounds() {
  ambienceSound.loop = true;
  ambienceSound.play();
  $('body').click(function() {
    clickSound.play();
  })
}

function endGame() {
  if (state === 'END') {
    $('.poem').remove();

  }
}
