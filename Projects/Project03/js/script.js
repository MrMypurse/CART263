"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);
let wateringInterval;
let $tree;
let $watercan;
let waterlevel = 0;;

function setup() {
  $tree = $('#tree');
  $watercan = $('#watercan');
  $watercan.draggable();
  $tree.droppable({
    drop: onDrop
  });
  //$watercan.on("mousedown", function() {
  //})
  $watercan.on("mouseup", function() {
    wateringCollision();
  })
}

function onDrop(event, ui) {
  console.log("DROPPED");
  //  ui.draggable.remove();
  //setInterval(checkCollision, 300);
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
    waterlevel = waterlevel + 5;
  } else {
    $watercan.attr("src", "assets/images/watercan0.png");
  }
}

function wateringCollision() {
  let collision = checkCollision($watercan, $tree);
  if (collision === true) {
    $('body').append('<p> HITTT </p>');
    if (!wateringInterval) {
      wateringInterval = setInterval(wateringAnimation, 300);
    }
  } else {
    clearInterval(wateringInterval);
    wateringInterval = false;
    $watercan.attr("src", "assets/images/watercan0.png");
  }
}
