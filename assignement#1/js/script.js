"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
window.onload = setup;

function setup(){
  console.log("Document loaded.");
  for (var i = 0; i < 1000; i++) {
    let pixel = document.createElement('div');
    pixel.setAttribute('class', 'pixel');
    document.body.appendChild(pixel);
    pixel.addEventListener('mouseover',paint);
  }

}

function paint(e){
  let pixel = e.target;
  pixel.style.backgroundColor = "white";
  setTimeout(resetPixel, 1000, pixel);
}



function resetPixel(pixel){
    pixel.style.backgroundColor = "black";
}
