var arDrone = require('ar-drone');
var client = arDrone.createClient();
var keybindings = require('./keybindings');

function log(msg) {
    process.stdout.write(msg + '\n');
}

keybindings.on('kill', function () {
    log('Killing process...');
    process.exit();
});

keybindings.on('reset', function () {
    log('Resetting device...');
    client.disableEmergency();
});

keybindings.on('keydown', function (key) {
    if (key == 't') {
        log('Taking off...');
        client.takeoff();
    } else if (key == 'l') {
        log('Landing...');
        client.land();
    } else if (key == 'up') {
        log('Going up...');
        client.up(1);
    } else if (key == 'down') {
        log('Going down...');
        client.down(1);
    }
});

keybindings.on('keyup', function (key) {
    if (key == 'up') {
        log('Not going up...');
        client.up(0);
    } else if (key == 'down') {
        log('Not going down...');
        client.down(0);
    }
});

keybindings.init();

/*

var keypress = require('keypress');
keypress(process.stdin);
process.stdin.setRawMode(true);

client.config('control:altitude_max', 3000);
var commands = require('./commands');

process.stdin.on('keypress', function (ch, key) {
    if (key.name == 'space') {
        process.stdout.write('next method...\n');
        if (commands.next(client) == 0) {
            process.stdout.write('done\n');
        }
    } else if (key.name == 'k') {
        client.stop();
    } else if (key.name == 'p') {
        commands.reset();
    } else if (key.name == 't') {
        client.takeoff();
    } else if (key.name == 'l') {
        client.land();
    } else if (key.name == 'a') {
        client.left(0.6);
    } else if (key.name == 'w') {
        client.front(0.6);
    } else if (key.name == 's') {
        client.back(0.6);
    } else if (key.name == 'd') {
        client.right(0.6);
    } else if (key.name == 'q') {
        client.clockwise(1);
        client.front(0.3);
    } else if (key.name == 'up') {
        client.up(0.6);
    } else if (key.name == 'down') {
        client.down(0.6);
    } else if (key.name == 'left') {
        client.stop();
        client.counterClockwise(0.5);
    } else if (key.name == 'right') {
        client.stop();
        client.clockwise(0.5);
    } else if (key.ctrl && key.name == 'r') {
        client.stop();
        client.disableEmergency();
    } else if (key.ctrl && key.name == 'c') {
        process.stdin.resume();
        process.exit();
    }
});
*/
