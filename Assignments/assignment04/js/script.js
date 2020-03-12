"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);
//sound effect
const click = new Audio('assets/sounds/click.wav');

function setup() {
  $.getJSON('data/data.json')
    .done(dataLoaded)
    .fail(dataNotLoaded);
  clickSound();
}

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

  let determiner1 = 'a';
  let determiner2 = 'a';
  let vowelWord1 = randomMenu.charAt(0);
  let vowelWord2 = randomRoom.charAt(0);
  console.log(vowelWord1);
  console.log(vowelWord2);

  if (vowelWord1 === 'A' ||
    vowelWord1 === 'E' ||
    vowelWord1 === 'I' ||
    vowelWord1 === 'O' ||
    vowelWord1 === 'U') {
    determiner1 = 'an';
  } else if (randomMenu.charAt(randomMenu.length - 1) === 's') {
    determiner1 = '';
  }

  if (vowelWord2 === 'a' ||
    vowelWord2 === 'e' ||
    vowelWord2 === 'i' ||
    vowelWord2 === 'o' ||
    vowelWord2 === 'u') {
    determiner2 = 'an';
  }

  let randomDescription = `Eating ${determiner1} ${randomMenu} with ${randomCondiment}
                          is like listening to ${randomGenre} in ${determiner2}
                          ${randomRoom}. It makes me feel ${randomMood}.`;

  $('.box1').append(randomDescription);
}


function dataNotLoaded(request, text, error) {
  console.error('you fucked up');
}

function getRandomArrayElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}

function clickToRefresh() {

}

//clickSound()
//
//a function to make cute clicking sound
function clickSound() {
  $('body').click(function() {
    click.play();
  })
}
