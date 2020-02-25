"use strict";

/********************************************************************

COINS N TOYS
Program: Janet Sun
Template: w3schools

Having trouble making money from children?
This is the perfect website to brain wash your underage consummers!
Introduce COINS N TOYS:A small shopping simulation to hook'em kids on
these toys. Just a few minutes a day on this website and they will give
 you all their cash in no time!
*********************************************************************/
//define number of generated words
const NUM_OPTIONS = 7;
//dialog question when the website opens
let question = 'YOU MUST BE UNDER 18 TO ENTER THIS SITE';
//the number of initial coins
let coins = 100;
//array for generated words
let shownWords = [];
//array of cursed words to generate from
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

//load EVERYTHING
$(document).ready(setup);

//setup()
//
//a function to set up website and call important functions
function setup() {
  addDialog();
  updateCoins();
  newWords();
}

// addDialog()
//
//a function to add a stupid question to the middle of the screen.
function addDialog() {
  // Dynamically create a div and store it in a variable.
  //Set its title at the same time.
  let $dialog = $(`<div></div>`).attr(`title`, `PLEASE VERIFY YOUR AGE`);
  // Add a p tag to the dialog div that contains the question text
  $dialog.append(`<p>${question}</p>`);
  //add the div to the page
  $('body').append($dialog);
  //if "yes" is clicked, use is allowed into the webiste;
  //if "no" is clicked, nothing changes but user is not allowed to use the site
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

//addButton()
//
//a function to add guesses and create buttons for players
//to click on
function addWords(label) {
  let $createWords = $('<div></div>');
  $createWords.addClass('words');
  $createWords.text(label);
  $createWords.button();
  $createWords.appendTo('h6');
  $createWords.click(speakWords);
}

function newWords() {
  //randomly choose guesses
  for (var i = 0; i < NUM_OPTIONS; i++) {
    let chosenWords = cursedWords[Math.floor(Math.random() * cursedWords.length)];
    addWords(chosenWords);
    shownWords.push(chosenWords);
    console.log(chosenWords);
  };
}

function speakWords(text) {
  responsiveVoice.speak(shownWords, 'UK English Female');
}

//updateCoins()
//
//a function to display the player's score
function updateCoins() {
  $('#coinNumber').text(coins);
}
