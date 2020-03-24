"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);

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
  $watercan.on("mousedown", function() {

  })
  $watercan.on("mouseup", function() {

  })
}

function onDrop(event, ui) {
  console.log("DROPPED");
  //ui.draggable.remove();
  setInterval(checkCollision, 300);
}

function watering() {
  if ($watercan.attr("src") === "assets/images/watercan0.png") {
    $watercan.attr("src", "assets/images/watercan1.png");
    waterlevel = waterlevel + 5;
  } else {
    $watercan.attr("src", "assets/images/watercan0.png");
  }
}

function getPositions(tree) {
  let treePosition = $tree.position();
  let treeWidth = $tree.width();
  let treeHeight = $tree.height();
  return [
    [treePosition.left, treePosition.left + treeWidth],
    [treePosition.top, treePosition.top + treeHeight]
  ];
}

function comparePositions(p1, p2) {
  let x1 = p1[0] < p2[0] ? p1 : p2;
  let x2 = p1[0] < p2[0] ? p2 : p1;
  return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
}

function checkCollision() {
  let treeBox = $('#tree')[0];
  let position1 = getPositions(treeBox);
  let position2 = getPositions(this);
  let horizontalMatch = comparePositions(position1[0], position2[0]);
  let verticalMatch = comparePositions(position1[1], position2[1]);
  let match = horizontalMatch && verticalMatch;
  if (match) {
    $('body').append('<p> HITTT </p>');
    watering();
  } else {
    $watercan.attr("src", "assets/images/watercan0.png");
  }

}
