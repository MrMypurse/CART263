"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
let $spans;
const interval = 500;
const probability = 0.2;
$(document).ready(setup);


function setup() {
  // This code will run when the document is ready!
  $spans = $("span");
  setInterval(update, interval);
  $spans.on('click', spanClicked);

}

function update(){
  console.log("YAY UPDATE");
  $spans.each(updateSpan);
}

function updateSpan(){
  console.log("YAY SPAN")
  let number = Math.random();
  if (number <= probability){
    $(this).removeClass("redacted");
    $(this).addClass("revealed");
  }
}

function spanClicked(){
  $(this).removeClass("revealed");
  $(this).addClass("redacted");
}
