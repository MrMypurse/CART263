"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
const NUM_OPTIONS = 7;
let question = 'YOU MUST BE UNDER 18 TO ENTER THIS SITE';
let coins = 100;
let shownWords = [];
let cursedWords = [
  'buy',
  'give me your credit card',
  'merch',
  'toys',
  'buy toys',
  'subscribe',
  'like',
  'buy the toy',
  'youtube',
  'money',
  'i want money',
  'i want the toy',
  'i need money',
  'buy the merch',
  'purchase',
  'cash',
  'debit card',
  'credit card',
  'american express',
  'visa card',
  'master card',
  'dollars',
  'coins',
  'internet',
  'toy review',
  'views',
  'play',
  'toys for kids',
  'fun',
  'capitalism is good',
  'spending money is good',
  'i love capitalism',
  'i love buying toys',
  'i love toys',
];


$(document).ready(setup);

function setup() {
  addDialog();
  updateCoins();
  newWords();
}

// addDialog()
//
// The key function. It adds a stupid dialog to a random position
// on the screen.
function addDialog() {

  // Dynamically create a div and store it in a variable. This is the div
  // we will turn into a dialog box. Set its title at the same time.
  let $dialog = $(`<div></div>`).attr(`title`, `PLEASE VERIFY YOUR AGE`);
  // Add a p tag to the dialog div that contains the question text
  $dialog.append(`<p>${question}</p>`);
  //add the div to the page
  $('body').append($dialog);
  $dialog.dialog({
    autoOpen: true,
    modal: true,
    dialogClass: 'no-close',
    buttons: {
      "YES, I AM UNDER 18": function() {
        $(this).dialog(`close`);
      },
      "NO": function() {
        $(this).dialog({
          show: {
            effect: 'shake',
            duration: 800
          }
        })
      }
    },
    // contained within the body tag, and can't be dragged out of it.
    containment: 'body'
  });
}


function newWords() {
//randomly choose guesses
  for (var i = 0; i < NUM_OPTIONS; i++) {
    let chosenWords = cursedWords[Math.floor(Math.random() * cursedWords.length)];
    shownWords.push(chosenWords);
    console.log(chosenWords);
  };
  //$('shownWords').text();
  $('#wordList').append(shownWords);
}

//updateScore()
//
//a function to display the player's score
function updateCoins() {
  $('#coinNumber').text(coins);
}
