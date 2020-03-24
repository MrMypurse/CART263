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

function setup(){
  $tree = $('#tree');
  $watercan = $('#watercan');
  $watercan.draggable();
  $tree.droppable({
    drop: onDrop
  });
  $watercan.on("mousedown", function(){
    //buzz.play();
  })
  $watercan.on("mouseup", function(){
    //buzz.pause();
  })
}

function onDrop(event, ui){
  console.log("DROPPED");
  //ui.draggable.remove();
//  buzz.pause();
  setInterval(watering, 300);
}

function watering(){
  if($watercan.attr("src") === "assets/images/watercan0.png"){
    $watercan.attr("src", "assets/images/watercan1.png");
    //crunch.play();
  }else{
    $watercan.attr("src", "assets/images/watercan0.png");
  }
}
