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
let $button;
let clickNumber = 0;
let frameNumber = 0;
const pourring = new Audio('assets/sounds/pour.wav');
const stirring = new Audio('assets/sounds/stir.wav');

function setup(){
  $pot = $('#pot');
  $potion = $('.potion');
  $button = $('#button');
  $potion.draggable();
  $pot.droppable({
    drop: onDrop
  });

}

function onDrop(event, ui){
  console.log('DROPPED');
  pourring.play();
  $potion.draggable('disable');
  ui.draggable.remove();
  $button.click(stir);
}

function stir(){

  clickNumber += 1;
  stirring.play();
  console.log(clickNumber);
  $pot.attr(`src`,`assets/images/pot${clickNumber}.png`);
  console.log(stir);
  if(clickNumber >= 17){
    clickNumber = 1;
    return;
  }
}
