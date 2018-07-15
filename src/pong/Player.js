
var pixi = require('pixi'),
    config = require('./config'),
    Keyboard = require('./Keyboard'),
    ScoreDisplay = require('./ScoreDisplay'),
    geometry = require('geometry'),
    EventEmitter = require('event-emitter'),
    parseOctal = require('./utils').parseOctal,
    defaults = {
        barHeight: 80,
        spaceHeight: 140,
        controls: {
            'up': null,
            'down': null
        },
        speed: 450
    },
    Player;

Player = function (game, options) {
    EventEmitter.apply(this);

    this.game = game;
    this.hasScoreDisplay = options.hasScoreDisplay;
    this.amtRight = options.amtRight;
    this.team = options.team;
    this.width = config.BARS_WIDTH;
    this.barHeight = options.barHeight || defaults.barHeight;
    this.spaceHeight = options.spaceHeight || defaults.spaceHeight;
    this.numPaddles = options.numPaddles || 1;
    // full height of the set of paddles
    this.height = this.numPaddles * this.barHeight + (this.numPaddles - 1) * this.spaceHeight;
    this.speed = options.speed || defaults.speed;
    this.lastUpdate = new Date().getTime();
    this.keyboard = new Keyboard(options.controls || defaults.controls);
    this.y = 0;
    this.yOffsets = new Array(this.numPaddles).fill(0).map((_, i) => {
        return i * (this.barHeight + this.spaceHeight);
    });
    this.yVelocity = 0;
    this.score = 0;
    if (options.hasScoreDisplay)
        this.scoreDisplay = new ScoreDisplay(this);

    if (options.team === 'a')
        this.color = config.TEAM_A_COLOR;
    else this.color = config.TEAM_B_COLOR;

    this.graphics = new pixi.Graphics();
    this.game.stage.addChild(this.graphics);

    this.render();
    this.bind();
    this.updatePosition();
};

Player.prototype = new EventEmitter();

Player.prototype.addControls = function (controls) {
    this.keyboard.addControls(controls);
};

Player.prototype.bind = function () {
    var self = this;

    this.game.on('update', function () {
        self.update();
    });

    this.game.on('resize', function () {
        self.resize();
    });

    this.game.on('reset', function () {
        self.reset();
    });

    this.game.on('restart', function () {
        self.restart();
    });
};

Player.prototype.render = function () {
    this.yOffsets.forEach(offset => {
        this.graphics.beginFill(this.color);
        this.graphics.drawRect(0, 0 + offset, this.width, this.barHeight);
        this.graphics.endFill();
    })
};

Player.prototype.update = function () {
    this.graphics.position.y = this.screenY();

    if (this.keyboard.pressed.up) {
        this.move(-1);
        this.yVelocity = -1;
    } else if (this.keyboard.pressed.down) {
        this.move(1);
        this.yVelocity = 1;
    } else {
        this.yVelocity = 0;
    }

    this.lastUpdate = new Date().getTime();
};

Player.prototype.move = function (direction) {
    var elapsed = new Date().getTime() - this.lastUpdate || 1000 / 60,
        distance = (elapsed / 1000) * this.speed,
        stageHeight = this.game.renderer.height,
        newY;

    newY = this.y + distance * direction;

    if (newY > stageHeight / 2 - this.height / 2) {
        newY = stageHeight / 2 - this.height / 2;
    } else if (newY < -stageHeight / 2 + this.height / 2) {
        newY = -stageHeight / 2 + this.height / 2;
    }

    this.y = newY;
    this.lastFrameLength = elapsed;
};

Player.prototype.screenX = function () {
    var stageWidth = this.game.renderer.width,
        spacing = config.LINES_DISTANCE + config.PLAYER_MARGIN;

    return ((stageWidth - spacing * 0.5) * this.amtRight);
};

Player.prototype.screenY = function () {
    return this.y + this.game.renderer.height / 2 - this.height / 2;
};

Player.prototype.updatePosition = function () {
    this.graphics.position.x = this.screenX();
    this.graphics.position.y = this.screenY();
    if (this.hasScoreDisplay)
        this.scoreDisplay.updatePosition();
};

Player.prototype.resize = function () {
    this.updatePosition();
    if (this.hasScoreDisplay)
        this.scoreDisplay.resize();
};

Player.prototype.getBoundingBox = function () {
    return new geometry.Rect(
        { x: this.screenX(), y: this.screenY() },
        { width: this.width, height: this.height }
    );
};

Player.prototype.getPaddleBoundingBoxes = function () {
    return this.yOffsets.map(offset => {
        return new geometry.Rect(
            { x: this.screenX(), y: this.screenY() + offset },
            { width: this.width, height: this.barHeight }
        );
    })

};

Player.prototype.restart = function () {
    this.y = 0;
    this.update();
};

Player.prototype.reset = function () {
    this.score = 0;
    this.restart();
    if (this.hasScoreDisplay)
        this.scoreDisplay.update();
};

Player.prototype.addPoint = function () {
    this.score += 1;
    this.emit('point', this.score);
    this.game.emit('point', this);
};

Player.prototype.refresh = function () {
    this.graphics.clear();
    this.render();
};

Player.prototype.setHeight = function (height) {
    this.height = height;
    this.refresh();
};

Player.prototype.setColor = function (color) {
    this.color = parseOctal(color);
    this.refresh();
    this.game.updateIfStill();
};

Player.prototype.setSpeed = function (speed) {
    this.speed = speed;
};

Player.prototype.setY = function (y) {
    this.y = y;
};

module.exports = Player;
