"use strict";

/********************************************************************

Stirring
Janet Sun

This is a mini stirring game. Player's mission is to pick one "perk potion"
and generate a new life using mouse to drag, drog and click.

*********************************************************************/
$(document).ready(setup);

//set up variables to store the pot, potions, number of mouse clicked and
//the audios.
let $pot;
let $potion;
let $button;
let clickNumber = 0;
const pourring = new Audio('assets/sounds/pour.wav');
const stirring = new Audio('assets/sounds/stir.wav');

//setup()
//
//set up all variables and make objects draggable when the game starts
function setup(){
  //assign all variables to objects
  $pot = $('#pot');
  $potion = $('.potion');
  $button = $('#button');
  //make the potions draggable
  $potion.draggable();
  //call the onDrop() while potion being draggable
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
    clickNumber = 0;
    return;
  }
}
