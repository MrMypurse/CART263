"use strict";

/********************************************************************

Assignment 03: Slamina Special
Janet Sun

Speak to the game! If you give the game some love, the game will speak to you.

*********************************************************************/



//Array of cuteness
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

//Array of harassments
let insults = [
  'You are terrible',
  'stupid',
  'think harder',
  'You are dumb',
]

//set up variables
let correctAnimal;
let answers = [];
let answer;
let score = 0;
//the game has 7 options
const NUM_OPTIONS = 7;

//set up annyang voice recongnition
if (annyang) {
//test to see if microphone is on
  var commands = {
    'hello': function() {
      alert('Hello, Mortals.');
    },
//start a new game and insult gamer
    'I give up': function() {
      giveUp();
    },
// repeat the answer backwards
    'Say it again': function() {
      sayBackwards(correctAnimal);
    },
// guess the answer by saying it
    'I think it is *answer': function() {
      checkAnswer();
    }
  };
//start annyang
  annyang.addCommands(commands);
  annyang.start();
}
//make sure that everthing is loaded
$(document).ready(setup);

//setup()
//
//a function to set up the game
function setup() {
  newRound();
}

//addButton()
//
//a function to add guesses and create buttons for players
//to click on
function addButton(label) {
  let $createButton = $('<div></div>');
  $createButton.addClass('guess');
  $createButton.text(label);
  $createButton.button();
  $createButton.appendTo('body');
// check if the player clicked on the right answer
  $createButton.on('click', handleGuess);
}

//newRound()
//
//a function to restart the game and reset the score
function newRound() {
  $('.guess').remove();
  answers = [];
  for (var i = 0; i < NUM_OPTIONS; i++) {
    let chosenAnimals = animals[Math.floor(Math.random() * animals.length)];
    addButton(chosenAnimals);
    answers.push(chosenAnimals);
  }
  correctAnimal = answers[Math.floor(Math.random() * answers.length)];
  sayBackwards(correctAnimal);
  updateScore();

}

function handleGuess() {
  if ($(this).text() === correctAnimal) {
    setTimeout(newRound, 500);
    score++;
    updateScore();
  } else {
    $('.guess').effect('shake');
    sayBackwards(correctAnimal);
    score = 0;
    updateScore();
  }
}

function sayBackwards(text) {
  let backwardsText = text.split('').reverse().join('');
  let options = {
    pitch: Math.random(0, 2),
    rate: Math.random(0, 2)
  }
  responsiveVoice.speak(backwardsText, 'Japanese Female', {
    options
  });
}

function updateScore() {
  $('#scoreNumber').text(score);
}

function giveUp() {
  $('div').each(function() {
    if ($(this).text() === correctAnimal) {
      $(this).effect('shake');
    };
  });
  speakInsult();
  setTimeout(newRound, 2500);
}


function checkAnswer(answer) {
  if ($(answer).text() === correctAnimal) {
    score++;
    updateScore();
    setTimeout(newRound, 500);
  } else {
    $('.guess').effect('shake');
    sayBackwards(correctAnimal);
    score = 0;
    updateScore();
  }
}

function speakInsult() {
  let selectInsult = insults[Math.floor(Math.random() * insults.length)];
  responsiveVoice.speak(selectInsult, 'Japanese Female');
}
