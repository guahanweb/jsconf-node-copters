var arDrone = require('ar-drone');
var client = arDrone.createClient();
var keybindings = require('./keybindings');

function log(msg) {
    process.stdout.write(msg + '\n');
}

var sequences = {
    'one': function (cb) {
        var control = arDrone.createUdpControl();
        var start = Date.now();

        var ref = { emergency: true };
        var pcmd = {};

        setTimeout(function () {
            ref.emergency = false;
            ref.fly = true;
        }, 1000);

        setTimeout(function () {
            pcmd.front = 0.5;
            pcmd.left = 1;
        }, 2000);

        setTimeout(function () {
            pcmd.left = 0;
            pcmd.right = 1;
        }, 3000);

        setTimeout(function () {
            ref.fly = false;
            pcmd = {};
        }, 6000);

        var interval = setInterval(function () {
            control.ref(ref);
            control.pcmd(pcmd);
            control.flush();
        }, 30);
    }
};

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
    } else if (key == 'left') {
        client.counterClockwise(1);
    } else if (key == 'right') {
        client.clockwise(1);
    } else if (key == 'w') {
        client.front(1);
    } else if (key == 's') {
        client.back(1);
    } else if (key == 'a') {
        client.left(1);
    } else if (key == 'd') {
        client.right(1);
    } else if (key == '1') {
        console.log(key);
        sequences.one();
    }
});

keybindings.on('keyup', function (key) {
    if (key == 'up') {
        client.up(0);
    } else if (key == 'down') {
        client.down(0);
    } else if (key == 'left') {
        client.counterClockwise(0);
    } else if (key == 'right') {
        client.clockwise(0);
    } else if (key == 'w') {
        client.front(0);
    } else if (key == 's') {
        client.back(0);
    } else if (key == 'a') {
        client.left(0);
    } else if (key == 'd') {
        client.right(0);
    }
});

keybindings.init();
