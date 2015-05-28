var keypress = require('keypress')(process.stdin);
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var keybindings;

process.stdin.setRawMode(true);

var logs = {};
var keys = {};

function handleKeypress(ch, key) {
    if (key && key.ctrl) {
        if (key.name == 'c') {
            process.stdin.resume();
            keybindings.emit('kill');
        } else if (key.name == 'r') {
            keybindings.emit('reset');
        }
    } else {
        if (!keys[ch]) {
            keys[ch] = true;
            keybindings.emit('keydown', ch);
        }
        logs[ch] = Date.now();
    }
}

var delay = 500;
function handlePoll() {
    Object.keys(keys).forEach(function (ch) {
        if (keys[ch] && logs[ch] < (Date.now() - delay)) {
            keybindings.emit('keyup', ch);
            delete keys[ch];
            delete logs[ch];
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
    handleKeypress(ch, key);
});

module.exports = keybindings;
