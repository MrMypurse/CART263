"use strict";

/********************************************************************

STIRRING
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
function setup() {
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

//onDrop()
//
//dropping the potion in the pot
function onDrop(event, ui) {
  //check if the potion is dropping
  console.log('DROPPED');
  //play sound effect of potion pouring
  pourring.play();
  //stop the potion from being draggable since the player can only pick 1 potion
  $potion.draggable('disable');
  ui.draggable.remove();
  //call the stir function when the player clicks the button
  $button.click(stir);
}

//stir()
//
//"strring" the pot when the player clickes on the button and by changing the
//animation frame number every click
function stir() {
  //Add 1 to the clickNumber everytime the player clicks the button
  clickNumber += 1;
  //play sound effect of stirring liquid
  stirring.play();
  //make sure that the clickNumber is adding everytime the player clicks
  console.log(clickNumber);
  //assign the click number to the frame number to change animation frames
  $pot.attr(`src`, `assets/images/pot${clickNumber}.png`);
  //make sure that the stir function is working to call the next animation frame
  console.log(stir);
  //reset the frame number to 0 to loop the animation
  if (clickNumber >= 17) {
    clickNumber = 0;
    return;
  }
}
