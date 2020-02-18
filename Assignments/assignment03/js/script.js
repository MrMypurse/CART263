"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
if (annyang){
  var commands = {
    'hello': function(){alert('Hello Mortals.');}
  };
  var commands1 = {
    'I am a disappointment': function(){
    gaveUp();}
  };
  var commands2 = {
    'Say it again': function(){
    sayBackwards(correctAnimal);}
  };

  annyang.addCommands(commands);
  annyang.addCommands(commands1);
  annyang.addCommands(commands2);
  annyang.start();
}

$(document).ready(setup);
let animals = [
      "Aardvark",
      "Alligator",
      "Alpaca",
      "Antelope",
      "Ape",
      "Armadillo",
      "Baboon",
      "Badger",
      "Bat",
      "Bear",
      "Beaver",
      "Bison",
      "Boar",
      "Buffalo",
      "Bull",
      "Camel",
      "Canary",
      "Capybara",
      "Cat",
      "Chameleon",
      "Cheetah",
      "Chimpanzee",
      "Chinchilla",
      "Chipmunk",
      "Cougar",
      "Cow",
      "Coyote",
      "Crocodile",
      "Crow",
      "Deer",
      "Dingo",
      "Dog",
      "Donkey",
      "Dromedary",
      "Elephant",
      "Elk",
      "Ewe",
      "Ferret",
      "Finch",
      "Fish",
      "Fox",
      "Frog",
      "Gazelle",
      "Gila monster",
      "Giraffe",
      "Gnu",
      "Goat",
      "Gopher",
      "Gorilla",
      "Grizzly bear",
      "Ground hog",
      "Guinea pig",
      "Hamster",
      "Hedgehog",
      "Hippopotamus",
      "Hog",
      "Horse",
      "Hyena",
      "Ibex",
      "Iguana",
      "Impala",
      "Jackal",
      "Jaguar",
      "Kangaroo",
      "Koala",
      "Lamb",
      "Lemur",
      "Leopard",
      "Lion",
      "Lizard",
      "Llama",
      "Lynx",
      "Mandrill",
      "Marmoset",
      "Mink",
      "Mole",
      "Mongoose",
      "Monkey",
      "Moose",
      "Mountain goat",
      "Mouse",
      "Mule",
      "Muskrat",
      "Mustang",
      "Mynah bird",
      "Newt",
      "Ocelot",
      "Opossum",
      "Orangutan",
      "Oryx",
      "Otter",
      "Ox",
      "Panda",
      "Panther",
      "Parakeet",
      "Parrot",
      "Pig",
      "Platypus",
      "Polar bear",
      "Porcupine",
      "Porpoise",
      "Prairie dog",
      "Puma",
      "Rabbit",
      "Raccoon",
      "Ram",
      "Rat",
      "Reindeer",
      "Reptile",
      "Rhinoceros",
      "Salamander",
      "Seal",
      "Sheep",
      "Shrew",
      "Silver fox",
      "Skunk",
      "Sloth",
      "Snake",
      "Squirrel",
      "Tapir",
      "Tiger",
      "Toad",
      "Turtle",
      "Walrus",
      "Warthog",
      "Weasel",
      "Whale",
      "Wildcat",
      "Wolf",
      "Wolverine",
      "Wombat",
      "Woodchuck",
      "Yak",
      "Zebra"
    ];

let correctAnimal;
let answers = [];
let score = 0;
const NUM_OPTIONS = 7;


function setup() {
  newRound();
}

function addButton(label){
  let $createButton = $('<div></div>');
  $createButton.addClass('guess');
  $createButton.text(label);
  $createButton.button();
  $createButton.appendTo('body');
  $createButton.on('click', handleGuess);
}

function newRound(){
  $('.guess').remove();
  answers = [];
  for (var i = 0; i < NUM_OPTIONS; i++) {
    let chosenAnimals = animals[Math.floor(Math.random()* animals.length)];
    addButton(chosenAnimals);
    answers.push(chosenAnimals);
  }
  correctAnimal = answers[Math.floor(Math.random()* answers.length)];
  sayBackwards(correctAnimal);
  updateScore();

}

function handleGuess(){
  if ($(this).text() === correctAnimal) {
    setTimeout(newRound, 500);
    score ++;
    updateScore();
  }else{
    $('.guess').effect('shake');
    sayBackwards(correctAnimal);
    score = 0;
    updateScore();
  }
  giveUp();
}

function sayBackwards(text){
  let backwardsText = text.split('').reverse().join('');
  let options = {
    pitch: Math.random(0,2),
    rate: Math.random(0,2)
  }
    responsiveVoice.speak(backwardsText, 'Japanese Female',{options});
}

function updateScore(){
  $('#scoreNumber').text(score);
}

function gaveUp(){
  $('correctAnimal').toggle('highlight');
  setTimeout(newRound(), 2000);
}
