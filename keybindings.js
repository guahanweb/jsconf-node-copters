var keypress = require('keypress')(process.stdin);
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var keybindings;

process.stdin.setRawMode(true);

var logs = {};
var keys = {};

function handleKeypress(key) {
    if (key.ctrl) {
        if (key.name == 'c') {
            process.stdin.resume();
            keybindings.emit('kill');
        } else if (key.name == 'r') {
            keybindings.emit('reset');
        }
    } else {
        if (!keys[key.name]) {
            keys[key.name] = true;
            keybindings.emit('keydown', key.name);
        }
        logs[key.name] = Date.now();
    }
}

var delay = 500;
function handlePoll() {
    Object.keys(keys).forEach(function (key) {
        if (keys[key] && logs[key] < (Date.now() - delay)) {
            keybindings.emit('keyup', key);
            delete keys[key];
            delete logs[key];
        }
    });
}

var Keybindings = function () {};
util.inherits(Keybindings, EventEmitter);

var timeout = null;
Keybindings.prototype.init = function () {
    timeout = setInterval(handlePoll, 50);
};

Keybindings.prototype.stop = function () {
    clearInterval(timeout);
};

keybindings = new Keybindings();
process.stdin.on('keypress', function (ch, key) {
    handleKeypress(key);
});

module.exports = keybindings;
