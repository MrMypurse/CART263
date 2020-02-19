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
  let commands = {
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
    'is it *answer': function() {
      $('answer').val('answer');
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
//randomly choose guesses
  for (var i = 0; i < NUM_OPTIONS; i++) {
    let chosenAnimals = animals[Math.floor(Math.random() * animals.length)];
    addButton(chosenAnimals);
    answers.push(chosenAnimals);
  }
//speak the answer backwards
  correctAnimal = answers[Math.floor(Math.random() * answers.length)];
  sayBackwards(correctAnimal);
  updateScore();

}

//handleGuess()
//
//a function to check whether the player clicked on the right answer
function handleGuess() {
//if right, adjust score and start a new game
  if ($(this).text() === correctAnimal) {
    setTimeout(newRound, 500);
    score++;
    updateScore();
// if wrong, shake the guesses and reset score
} else {
    $('.guess').effect('shake');
    sayBackwards(correctAnimal);
    score = 0;
    updateScore();
  }
}

//sayBackwards()
//
//a function to make the responsive voice speak the right answer backwards
function sayBackwards(text) {
//reverse the letters of the answer
  let backwardsText = text.split('').reverse().join('');
  let options = {
    pitch: Math.random(0, 2),
    rate: Math.random(0, 2)
  };
//make the responsive voice speak the backwards answer
  responsiveVoice.speak(backwardsText, 'Japanese Female', {
    options
  });
}

//updateScore()
//
//a function to display the player's score
function updateScore() {
  $('#scoreNumber').text(score);
}

//givUp()
//
//a function to harass the player when the player chooses to give up
function giveUp() {
//give the right answer by shaking the answer
  $('div').each(function() {
    if ($(this).text() === correctAnimal) {
      $(this).effect('shake');
    };
  });
//insult the player
  speakInsult();
//start a new game
  setTimeout(newRound, 2500);
}

//checkAnswer()
//
//a function to check whether the player speaks the right answer
function checkAnswer()  {
//if right, adjust score and start a new game
  if ($(answer).text() === correctAnimal) {
    setTimeout(newRound, 500);
    score++;
    updateScore();
// if wrong, shake the guesses and reset score
} else {
    $('.guess').effect('shake');
    sayBackwards(correctAnimal);
    score = 0;
    updateScore();
  }
}

//speakInsult()
//
//a function to destroy player's self-esteem
function speakInsult() {
  let selectInsult = insults[Math.floor(Math.random() * insults.length)];
  responsiveVoice.speak(selectInsult, 'Japanese Female');
}
