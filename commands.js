var commands = [
        doTakeoff,
        goUp,
        doFlip,
        doLanding
    ];

function doTakeoff() {
    process.stdout.write('taking off...\n');
    this.takeoff();
}

function goUp() {
    var c = this;
    this.up(0.5);
    this.after(2000, function () {
        c.stop();
    });
}

function strafe() {
    this.stop();
    this.forward(1);
    this.left(1);
}

function doFlip() {
    this.stop();
    this.animate('flipLeft', 500);
}

function doLanding() {
    this.stop();
    this.land();
}

var index = 0;
module.exports = {
    next: function (client) {
        commands[index++].call(client);
        return commands.length - index;
    },

    reset: function () {
        index = 0;
    }
};
