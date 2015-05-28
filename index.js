var arDrone = require('ar-drone');
var client = arDrone.createClient();

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
/*
client.takeoff();
client
    .after(4000, function () {
        this.animate('flipLeft', 1000);
    })
    .after(4000, function () {
        this.animate('phiDance', 5000);
    })
    .after(6000, function () {
        this.up(0.3);
    })
    .after(4000, function () {
        this.stop();
    })
    .after(2000, function () {
        this.animate('flipAhead', 1000);
    })
    .after(4000, function () {
        this.down(0.3);
    })
    .after(2000, function () {
        this.stop();
    })
    .after(4000, function () {
        this.animate('yawDance', 3000);
    })
    .after(5000, function () {
        this.land();
    });
*/
