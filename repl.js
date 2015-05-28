//USE THIS TO CONTROLL THE DRONE FROM THE CONSOLE
var arDrone = require('ar-drone');
var client  = arDrone.createClient();
client.createRepl();