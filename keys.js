'use strict';

var keypress = require('keypress');

// make `process.stdin` begin emitting 'keypress' events
keypress(process.stdin);

// listen for the 'keypress' event

process.stdin.setRawMode(true);
process.stdin.resume();

console.log('Ready to Fly!');

process.stdin.on('keypress', function (ch, key) {
  if (key.name === 't') {
    console.log('takeoff');
  } else if (key.name === 'w') {
    console.log('foward')
  } else if (key.name === 's') {
    console.log('backwards')
  } else if (key.name === 'left') {
    console.log('rotate left')
  } else if (key.name === 'a') {
    console.log('left')
  } else if (key.name === 'd') {
    console.log('right')
  } else if (key.name === 'right') {
    console.log('rotate right')
  } else if (key.name === 'up') {
    console.log('up')
  } else if (key.name === 'down') {
    console.log('down')
  } else if (key.name === 'q') {
    console.log('Initiated Landing Sequence...');
  }

  if (key && key.ctrl && key.name === 'c') {
    process.stdin.pause();
    process.exit();
  }
});
