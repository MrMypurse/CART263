"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);
let state = 'TITLE';
let wateringInterval;
let fertilizingInterval;
let $tree;
let $watercan;
let $fertilizer;
let waterlevel = 0;
let fertilizelevel = 0;
let generatedPoem;
let createSentence;
//sound effect
const clickSound = new Audio('assets/sounds/click.wav');
const ambienceSound = new Audio('assets/sounds/ambience.mp3');
const bagSound = new Audio('assets/sounds/bag.mp3');
const fertilizeSound = new Audio('assets/sounds/fertilize.mp3');
const wateringSound = new Audio('assets/sounds/watering.mp3');
const canSound = new Audio('assets/sounds/can.mp3');
function setup() {
    changeScreen();
    generateSounds();

  $.getJSON('data/data.json')
    .done(dataLoaded)
    .fail(dataNotLoaded);
  $tree = $('#tree');
  $watercan = $('#watercan');
  $fertilizer = $('#fertilizer');
  $watercan.draggable();
  $fertilizer.draggable();
  $tree.droppable({
    drop: onDrop
  });
  $watercan.on("mousedown", function() {
  canSound.play();
})
$fertilizer.on("mousedown", function() {
bagSound.play();
})
  $watercan.on("mouseup", function() {
    wateringCollision();
    treeGrowth();

  })
  $fertilizer.on("mouseup", function() {
    fertilizingCollision();
    treeGrowth();
  })
  newPoem();
}

function onDrop(event, ui) {
  console.log("DROPPED");
  //  ui.draggable.remove();
  //setInterval(checkCollision, 300);
}

function changeScreen() {
  if (state === 'TITLE') {
    $('body').click (function(){
      $('#title').hide();
      $('#introduction').hide();
      $('#gamebox').show();
    });
    state = 'PLAY';
    console.log(state);
  }
}

function getPositions(object) {
  let objectPosition = object.position();
  let objectWidth = object.width();
  let objectHeight = object.height();
  return [
    [objectPosition.left, objectPosition.left + objectWidth],
    [objectPosition.top, objectPosition.top + objectHeight]
  ];
}

function comparePositions(p1, p2) {
  let x1 = p1[0] < p2[0] ? p1 : p2;
  let x2 = p1[0] < p2[0] ? p2 : p1;
  return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
}

function checkCollision(a, b) {
  let position1 = getPositions(a);
  let position2 = getPositions(b);
  let horizontalMatch = comparePositions(position1[0], position2[0]);
  let verticalMatch = comparePositions(position1[1], position2[1]);
  let match = horizontalMatch && verticalMatch;
  return match;
}

function wateringAnimation() {
  if ($watercan.attr("src") === "assets/images/watercan0.png") {
    $watercan.attr("src", "assets/images/watercan1.png");
    console.log(waterlevel);
  } else {
    $watercan.attr("src", "assets/images/watercan0.png");
  }
}

function fertilizingAnimation(){
  if ($fertilizer.attr('src') === 'assets/images/fertilizer0.png') {
    $fertilizer.attr('src', 'assets/images/fertilizer1.png');
  } else {
    $fertilizer.attr('src', 'assets/images/fertilizer0.png');
  }
}

function wateringCollision() {
  let collision = checkCollision($watercan, $tree);
  if (collision === true) {
    wateringSound.play();
    waterlevel = waterlevel + 5;
    $('body').append('<p> WATERED </p>');
    if (!wateringInterval) {
      wateringInterval = setInterval(wateringAnimation, 300);
    }
  } else {
    clearInterval(wateringInterval);
    wateringInterval = false;
    $watercan.attr("src", "assets/images/watercan0.png");
  }
}

function fertilizingCollision(){
  let collision = checkCollision($fertilizer, $tree);
  if (collision === true) {
    fertilizeSound.play();
    fertilizelevel = fertilizelevel + 5;
    $('body').append('<p>fertilized</p>');
    if(!fertilizingInterval) {
      fertilizingInterval = setInterval(fertilizingAnimation, 200);
    }
  } else {
    clearInterval(fertilizingInterval);
    fertilizingInterval = false;
    $fertilizer.attr('src', 'assets/images/fertilizer0.png');
  }
}

function treeGrowth() {
  if (waterlevel >= 20 && fertilizelevel >= 20) {
    $tree.attr("src", "assets/images/tree1.png");
  };
}

function dataLoaded(data){
  console.log(data);
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
//a function to insult you if the data isn't correctly loaded
function dataNotLoaded(request, text, error) {
  console.error('You fucked up.');
}

//getRandomArrayElement(array)
//
//a function to pick random element from an array
function getRandomArrayElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}

function newPoem () {
  $tree.click(function() {
    $('.poem').remove();
    $.getJSON('data/data.json')
      .done(dataLoaded)
      .fail(dataNotLoaded);
  })
}

function generateSounds() {
  ambienceSound.loop = true;
//  ambienceSound.play();
  $('body').click(function() {
    clickSound.play();
  })
}
