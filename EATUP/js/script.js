"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
$(document).ready(setup);

let $mouth;
let $fly;
const buzz = new Audio("assets/sounds/buzz.mp3");
const crunch = new Audio("assets/sounds/crunch.wav");

function setup(){
  $mouth = $('#mouth');
  $fly = $('#fly');
  $fly.draggable();
  $mouth.droppable({
    drop: onDrop
  });
  buzz.loop = true;
  $fly.on("mousedown", function(){
    buzz.play(); 
  })
  $fly.on("mouseup", function(){
    buzz.pause();
  })
}

function onDrop(event, ui){
  console.log("DROPPED");
  ui.draggable.remove();
  buzz.pause();
  setInterval(chew, 300);
}

function chew(){
  if($mouth.attr("src") === "assets/images/mouth-open.png"){
    $mouth.attr("src", "assets/images/mouth-closed.png");
    crunch.play();
  }else{
    $mouth.attr("src", "assets/images/mouth-open.png");
  }
}
