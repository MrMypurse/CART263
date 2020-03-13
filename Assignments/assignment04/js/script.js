"use strict";

/********************************************************************

ANOTHER ONE
Janet Sun

This webpage will never run out of random sentences as long as you don't
get tired of it!

*********************************************************************/
//load everything
$(document).ready(setup);
//set up variables
let randomDescription;
let createSentence;
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
  //call other function to display sound and to refresh the sentence using a
  //button
  clickSound();
  clickToRefresh();
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
                          is like listening to ${randomGenre} in ${determiner2}
                          ${randomRoom}. It makes me feel ${randomMood}.`;
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

//clickSound()
//
//a function to make cute clicking sound
function clickSound() {
  $('body').click(function() {
    click.play();
  })
}
