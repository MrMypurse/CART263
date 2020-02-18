"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let frequencies = [
  110.00,
  123.47,
  138.59,
  146.83,
  164.81,
  185.00,
  207.65,

];

let pattern = [
  'x',
  'o',
  '*',
  '',
  '',
  '',
  '',
  '',
];

let beat = 0;
let synth;
let kick;
let snare;
let hihat;

function setup(){
  synth = new Pizzicato.Sound({
    source: 'wave',
  });
  kick = new Pizzicato.Sound ('./assets/sounds/kick.wav');
  snare = new Pizzicato.Sound ('./assets/sounds/snare.wav');
  hihat = new Pizzicato.Sound('./assets/sounds/hihat.wav');
}

function playNote(){
  synth.frequency = random(frequencies);
  synth.play();
}

function mousePressed(){
  setInterval(playNote, 500);
  setInterval(playDrum, 250);
}

function playDrum(){
  let symbols = pattern[beat];
  if(symbols.includes('x') === true){
    kick.play();
  }else if(symbols.includes('o') === true){
    snare.play();0
  }else if (symbols.includes('*') === true){
    hihat.play();
  }
  beat++;
  if (beat >= pattern.length){
    beat = 0;
  }
}
