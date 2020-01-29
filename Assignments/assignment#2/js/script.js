"use strict";

/*****************

Refined Raving Redactionist
Pippin Barr
Janet Sun

You are redacting a document, but it keeps becoming unredacted!
Click the secret information to hide it, don't let all the
secrets become revealed! Ptsss,Top secrets will be highlighted...
If you can find them...

******************/

// The chance a span will be revealed per update
const REVEAL_POSSIBILITY = 0.1;
// How often to update the spans (potentially revealing them)
const UPDATE_FREQUENCY = 500;

// A place to store the jQuery selection of all spans and all secrets
let $censors;
let $secrets;
// A place to store the number of secrets that have been found and
//the total number of secrets
let secretsFound = 0;
let secretsTotal = 0;

// When the document is loaded we call the setup function
$(document).ready(setup);

// setup()
//
// Sets the click handler and starts the time loop
function setup() {
  // Save the selection of all spans
  $censors = $('.redacted');
  // Store the selection of all secret classes
  $secrets = $('.secret');
  // Set a click handler on the spans (so we know when they're clicked)
  $censors.on('click', spanClicked);
  // Set an interval of 500 milliseconds to update the state of the page
  setInterval(update, UPDATE_FREQUENCY);
  //Calculate the total number of secrets on the page
  secretsTotal = $secrets.length;
  //Display the result number as text in the span
  $('#totalNb').text(secretsTotal);
  //"Mouse over"event of all secrets and the event handler
  $secrets.on('mouseover', secretsOver);
}

// spanClicked()
//
// When a span is clicked we remove its revealed class and add the redacted class
// thus blacking it out
function spanClicked() {
  $(this).removeClass('revealed');
  $(this).addClass('redacted');
}

//secretsOver()
//
//When the mouse goes over a secret, the "found" class is added
//thus highlighting the secret
//
function secretsOver() {
  $(this).addClass('found');
  //Stop the "mouseover" event
  $(this).off('mouseover');
  //Add 1 to the number of secrets found everytime
  secretsFound = secretsFound + 1;
  //Display the resualt number as text in the span
  $('#foundNb').text(secretsFound);
  console.log(secretsFound);
}

// update()
//
// Update is called every 500 milliseconds and it updates all the spans on the page
// using jQuery's each() function which calls the specified function on _each_ of the
// elements in the selection
function update() {
  $censors.each(updateSpan);
}

// updateSpan()
//
// With random chance it unblanks the current span by removing the
// redacted class and adding the revealed class. Because this function is called
// by each(), "this" refers to the current element that each has selected.
function updateSpan() {
  let r = Math.random();
  if (r < REVEAL_POSSIBILITY) {
    $(this).removeClass('redacted');
    $(this).addClass('revealed');
  }
}
