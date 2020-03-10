"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);


function setup() {
  $.getJSON('data/data.json')
    .done(dataLoaded)
    .fail(dataNotLoaded);
}

function dataLoaded(data){
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


  let verb = 'is';
  if (randomCondiment.charAt(randomCondiment.length - 1) === 's'){
    verb = 'are';

  let determiner = 'a';
  }

  let randomDescription = `Eating ${randomMenu} with ${randomCondiment} ${verb}
                            like listening to ${randomGenre} in a ${randomRoom},
                            It makes me feel ${randomMood}.`;
  $('body').append(randomDescription);

  console.log(verb);
}


function dataNotLoaded(request, text, error){
  console.error('you fucked up');
}

function getRandomArrayElement(array){
  let element = array[Math.floor(Math.random() * array.length)];
  return element;

}
