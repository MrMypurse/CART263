"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
$(document).ready(setup);

let $pot;
let $potion;
const buzz = new Audio('assets/sounds/buzz.mp3');
const crunch = new Audio('assets/sounds/crunch.wav');

function setup(){
  $pot = $('#pot');
  $potion = $('.potion');
  $potion.draggable();
  $pot.droppable({
    drop: onDrop
  });
  buzz.loop = true;
  $potion.on('mousedown', function(){
    buzz.play();
  })
  $potion.on('mouseup', function(){
    buzz.pause();
  })
}

function onDrop(event, ui){
  console.log('DROPPED');
  ui.draggable.remove();
  buzz.pause();
  setInterval(pour, 300);
}

function pour(){
  if($pot.attr('src') === 'assets/images/pot.png'){
    $pot.attr('src', 'assets/images/pot2.png');
    crunch.play();
  }else{
    $pot.attr('src', 'assets/images/pot.png');
  }
}
