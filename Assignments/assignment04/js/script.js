"use strict";

/********************************************************************

ANOTHER ONE
Janet Sun

This webpage will never run out of random sentences as long as you don't
get tired of it! ps: if you click on the sentence with love, it will speak
back to you...

*********************************************************************/
//load everything
$(document).ready(setup);
//set up variables for the generated sentence and the dialog box text
let randomDescription;
let createSentence;
let welcomeDialog = 'CLICK THE BUTTON OR SPEAK THE BUTTON TO GENERATE NEW SENTENCE';
//set up sound effect
const click = new Audio('assets/sounds/click.wav');

//setup
//
//this is a function to setup Annyang and to call other functions
function setup() {
  //get the data base and display message if not loaded correctly
  $.getJSON('data/data.json')
    .done(dataLoaded)
    .fail(dataNotLoaded);
  addDialog();
  //call other function to display sound and to refresh the sentence using a
  //button
  clickSound();
  clickToRefresh();
  speakWords();

  //set up Annyang
  if (annyang) {
    //Call the function after detecting the spoken sentence
    var commands = {
      'another one': speakToRefresh
    };
    annyang.addCommands(commands);
    annyang.start();
  }
}


// addDialog()
//
//a function to add a dumb question to the middle of the screen.
function addDialog() {
  // Dynamically create a div and store it in a variable.
  //Set its title at the same time.
  let $dialog = $(`<div></div>`).attr(`title`, `WELCOME`);
  // Add a p tag to the dialog div that contains the question text
  $dialog.append(`<p>${welcomeDialog}</p>`);
  //add the div to the page
  $('body').append($dialog);
  //if "yes" is clicked, use is allowed into the webiste;
  //if "no" is clicked, nothing changes but user is not allowed to use the site
  $dialog.dialog({
    autoOpen: true,
    modal: true,
    dialogClass: 'no-close',
    buttons: {
      "THANK YOU": function() {
        $(this).dialog(`close`);
      },
      "NO": function() {
        $(this).parent().effect(`shake`);
      }
    },
    // contained within the body tag, and can't be dragged out of it.
    containment: 'body'
  });
}
//dataLoaded(data)
//
//a function to pick random items and display them as a sentence in a class
//only works if the data is loaded correctly
function dataLoaded(data) {
  console.log(data);
  let randomMenu = getRandomArrayElement(data.menuItems);
  console.log(randomMenu);
  let randomCondiment = getRandomArrayElement(data.condiments);
  console.log(randomCondiment);
  let randomTea = getRandomArrayElement(data.teas);
  console.log(randomTea);
  let randomGenre = getRandomArrayElement(data.genres);
  console.log(randomGenre);
  let randomRoom = getRandomArrayElement(data.rooms);
  console.log(randomRoom);
  let randomMood = getRandomArrayElement(data.moods);
  console.log(randomMood);
  //set up determiners as variables
  let determiner1 = 'a';
  let determiner2 = 'a';
  //detect the first letter of the word to determine determiners
  let vowelWord1 = randomMenu.charAt(0);
  let vowelWord2 = randomRoom.charAt(0);
  console.log(vowelWord1);
  console.log(vowelWord2);
  //if the vowel is the first letter, use 'an' as a determiner
  if (vowelWord1 === 'A' ||
    vowelWord1 === 'E' ||
    vowelWord1 === 'I' ||
    vowelWord1 === 'O' ||
    vowelWord1 === 'U') {
    determiner1 = 'an';
    //if the object is plural, no determiner
  } else if (randomMenu.charAt(randomMenu.length - 1) === 's') {
    determiner1 = '';
  }
  //if the vowel is the first letter, use 'an' as a determiner
  if (vowelWord2 === 'a' ||
    vowelWord2 === 'e' ||
    vowelWord2 === 'i' ||
    vowelWord2 === 'o' ||
    vowelWord2 === 'u') {
    determiner2 = 'an';
  }
  //Construct the sentence using the randomly selected words
  randomDescription = `Eating ${determiner1} ${randomMenu} with ${randomCondiment}
                       and a pot of ${randomTea} is like listening to ${randomGenre}
                       in ${determiner2} ${randomRoom}. It makes me feel ${randomMood}.`;
  //Make a div box for the sentence and store the sentence in
  createSentence = $('<div></div>');
  createSentence.addClass('sentence');
  createSentence.text(randomDescription);
  createSentence.appendTo('.box1');
}

//dataNotLoaded()
//
//a function to insult you if the data isn't correctly loaded
function dataNotLoaded(request, text, error) {
  console.error('You fucked up.');
}

//getRandomArrayElement(array)
//
//a function to pick random element from an array
function getRandomArrayElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}

//clickToRefresh()
//
//a function to erase the old sentence and make a new sentence when the button
//is clicked
function clickToRefresh() {
  $('#refreshButton').click(function() {
    $('.sentence').remove();
    $.getJSON('data/data.json')
      .done(dataLoaded)
      .fail(dataNotLoaded);
  })
}

//speakToRefresh()
//
//a function to erase the old sentence and make a new sentence when the voice
//commande is detected
function speakToRefresh() {
  $('.sentence').remove();
  $.getJSON('data/data.json')
    .done(dataLoaded)
    .fail(dataNotLoaded);
}

//speakWords()
//
//a function to call responsiveVoice to speak the words that the user clicked on
function speakWords() {
  $('.box1').click(function(){
    responsiveVoice.speak(randomDescription, 'French Female', {
      pitch: 0.7,
      speed: 2,
    });
  })
}



//clickSound()
//
//a function to make cute clicking sound
function clickSound() {
  $('body').click(function() {
    click.play();
  })
}
