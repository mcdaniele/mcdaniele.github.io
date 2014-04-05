Game = {};

var w = 600;
var h = 300;
var sound = true;
var sfxbool = true;
var musicbool = true;
var highscore = 0;
var previoushigh = 0;
var score = 0;

function rand(num){ return Math.floor(Math.random() * num) };

Game.Boot = function (game) { };

Game.Boot.prototype = {
	preload: function () {
		game.stage.backgroundColor = '#777777';
		game.load.image('loading', 'images/loading.png');
		game.load.image('loading2', 'images/loading2.png');
	},
	create: function() {
		this.game.state.start('Load');
	}
};

Game.Load = function (game) { };

Game.Load.prototype = {
	preload: function () {
	    label2 = game.add.text(Math.floor(w/2)+0.5, Math.floor(h/2)-15+0.5, 'loading...', { font: '30px Arial', fill: '#fff' });
		label2.anchor.setTo(0.5, 0.5);

		preloading2 = game.add.sprite(w/2, h/2+15, 'loading2');
		preloading2.x -= preloading2.width/2;
		preloading = game.add.sprite(w/2, h/2+19, 'loading');
		preloading.x -= preloading.width/2;
		game.load.setPreloadSprite(preloading);

		game.load.image('bgworld', 'assets/background.png');
        game.load.spritesheet('hero', 'assets/heropot.png', 30, 42);
        game.load.image('meteor', 'assets/meteor.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('playb', 'assets/play.png');
        game.load.image('menubg', 'assets/menu.png');
        game.load.image('ground', 'assets/grnd.png');
        game.load.spritesheet('touchb', 'assets/touch.png',300,300);
        game.load.image('indicator', 'assets/indicator.png');
        game.load.audio('coin', 'assets/coin.wav');
        game.load.audio('music', 'assets/appleseed.ogg');
        game.load.audio('death', 'assets/death.wav');
		game.load.spritesheet('sound', 'assets/sound.png', 28, 22);

	},
	create: function () {
		game.state.start('Menu');
	}
};
