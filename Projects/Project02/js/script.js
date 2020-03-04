"use strict";

/********************************************************************
COINS N TOYS

Coding: Janet Sun
Template: w3schools
Images: Giphy

Having trouble making money from children?
This is the perfect website to brain wash your underage consumers!
Introduce COINS N TOYS:A small shopping simulation to hook'em kids on
these toys. Just a few minutes a day on this website and they will give
 you all their cash in no time!
*********************************************************************/
//define number of generated words
const NUM_OPTIONS = 10;
let pngStr;
let gifStr;
//dialog question when the website opens
let question = 'YOU MUST BE UNDER 18 TO ENTER THIS SITE';
let warning = 'YOU DO NOT HAVE ENOUGH COINS!PLEASE FOLLOW INSTRUCTION TO GENERATE COINS OR INSERT YOUR PARENTS CREDIT CARD.';
//the number of initial coins
let coins = 50;
//array for generated words
let shownWords = [];
//array of cursed words to generate from
let cursedWords = [
  'buy video games',
  'give me your credit card',
  'buy merch',
  'new toys',
  'buy toys',
  'subscribe',
  'like',
  'buy the toy',
  'YouTube',
  'give money',
  'I want money',
  'I want the toy',
  'I need money',
  'buy the merch',
  'purchase',
  'give cash',
  'debit card',
  'credit card',
  'american express',
  'visa card',
  'MasterCard',
  'dollars',
  'coins',
  'internet',
  'toy review',
  'views',
  'play games',
  'toys for kids',
  'I am having fun',
  'capitalism is good',
  'spending money is good',
  'I love capitalism',
  'I love buying toys',
  'I love toys',
];
//sound effect
const click = new Audio('assets/sounds/click.wav');

//load EVERYTHING
$(document).ready(setup);

//setup()
//
//a function to set up website and call important functions
function setup() {
  clickSound();
  addDialog();
  updateCoins();
  newWords();
  refreshWords();
  clickBuy();
  hoverBuy();

  //setup AnnYang voie command
  if (annyang) {
    var command = {
      //call handleSpeech function after words are detected
      "*spokenWord": handleSpeech
    };
  }
  annyang.addCommands(command);
  annyang.start();
}

//handleSpeech(word)
//
//a function to check if the word that the user says is correct
//if it is correct, add 2 coins
function handleSpeech(word) {
  console.log(word);
  if (shownWords.includes(word)) {
    coins = coins + 2;
    updateCoins();
  }
}

// addDialog()
//
//a function to add a dumb question to the middle of the screen.
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
        $(this).effect(`shake`);
      }
    },
    // contained within the body tag, and can't be dragged out of it.
    containment: 'body'
  });
}

// poorDialog()
//
//a function to add an insulting dialog to the middle of the screen.
function poorDialog() {
  // Dynamically create a div and store it in a variable.
  //Set its title at the same time.
  let $dialog2 = $(`<div></div>`).attr(`title`, `WARNING`);
  // Add a p tag to the dialog div that contains the question text
  $dialog2.append(`<p>${warning}</p>`);
  //add the div to the page
  $('body').append($dialog2);
  //if "yes" is clicked, use is allowed back into the webiste;
  //if "no" is clicked, nothing changes but user is not allowed to use the site
  $dialog2.dialog({
    autoOpen: true,
    modal: true,
    dialogClass: 'no-close',
    buttons: {
      "YES, I WILL FOLLOW": function() {
        $(this).dialog(`close`);
      },
      "NO, I LOVE BEING POOR": function() {
        $(this).effect(`shake`);
      }
    },
    // contained within the body tag, and can't be dragged out of it.
    containment: 'body'
  });
}

//imageDialog()
//
//a function to display dialogs containing gif images
function imageDialog() {
  // Dynamically create a div and store it in a variable.
  let $dialog3 = $('<div></div>').attr(`title`, ``);
  //use image source to append gif image
  $dialog3.append("<img src='" + gifStr + "'></img>");
  //add the div to the page
  $('body').append($dialog3);
  $dialog3.dialog({
    autoOpen: true,
    modal: true,
    height: 500,
    width: 600,
    // contained within the body tag, and can't be dragged out of it.
    containment: 'body'
  });
}

//addWords()
//
//a function to add randomly generated words and create buttons for users
//to click on
function addWords(label) {
  let $createWords = $('<div></div>');
  $createWords.addClass('words');
  $createWords.text(label);
  $createWords.button();
  $createWords.appendTo('h6');
  //speak the words on the button when it is clicked
  $createWords.click(speakWords);
}

//newWords()
//
// a function to generate words from an array using math
function newWords() {
  $('.words').remove();
  //randomly choose guesses
  for (var i = 0; i < NUM_OPTIONS; i++) {
    let chosenWords = cursedWords[Math.floor(Math.random() * cursedWords.length)];
    addWords(chosenWords);
    shownWords.push(chosenWords);
  };
}

//refreshWords()
//
//a function to generate new words when a button is clicked
function refreshWords() {
  let $refreshButton = $('#refreshButton');
  $refreshButton.click(newWords);
}

//speakWords()
//
//a function to call responsiveVoice to speak the words that the user clicked on
function speakWords() {
  responsiveVoice.speak($(this).text(), 'UK English Female', {
    pitch: 0.2,
    speed: 0.1,
  });
}

//clickBuy()
//
//a function to decrease the user's coins when a product image is clicked on
function clickBuy() {
  let $images = $('.toyImages');
  $images.click(
    function() {
      // call the dialog when the number of coins is insufficient to buy anything
      if (coins <= 40.20) {
        poorDialog();
      } else {
        //store the image source in a variable for converting to gif later
        pngStr = $(this).attr('src');
        console.log(pngStr);
        //decrease the user's coin when making a purchase
        coins = coins - 40.20;
        //convert image source from png to gif
        switchFormat();
        //show gif image in a dialog
        imageDialog();
        updateCoins();
      }
    })
}

//hoverBuy
//
//a function to lure users to buy the product when they hover over the image
function hoverBuy() {
  $('.toyImages').hover(
    function() {
      //use image position to assign hovered text position
      $("#hoverButton").show();
      let position = $(this).position();
      $('#hoverButton').css('top', position.top);
      $('#hoverButton').css('left', position.left);
    },
    //hide the hovered text when the image is not hovered
    function() {
      $('#hoverButton').hide();
    });
}

//updateCoins()
//
//a function to display the user's coins
function updateCoins() {
  //limit the coin's number to 2 digits after comma
  let roundedCoins = coins.toFixed(2);
  $('#coinNumber').text(roundedCoins);
}

//switchFormat()
//
//a function to switch images' source format from png to gif
//and store it in a variable
function switchFormat() {
  gifStr = pngStr.replace('png', 'gif');
  console.log(gifStr);
}

//clickSound()
//
//a function to make cute clicking sound
function clickSound() {
  $('body').click(function() {
    click.play();
  })
}
