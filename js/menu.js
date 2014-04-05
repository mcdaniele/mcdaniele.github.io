Game.Menu = function (game) { };

Game.Menu.prototype = {
	create: function () {
		this.cursor = this.game.input.keyboard.createCursorKeys();
//		game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		game.stage.backgroundColor = '#aaaaaa';
		var bgmenu = this.game.add.sprite(42, 0, 'menubg');
		var playbutton = this.game.add.button(300, 175, 'playb', this.startPlay, this);
		playbutton.anchor.setTo(0.5, 0);
		var labelscore = game.add.text(80, 50, 'Score: '+score, { font: '18px Arial', fill: '#000', align: 'left' });
		var labelhighscore = game.add.text(80, 80, 'Previous Highscore: '+previoushigh, { font: '18px Arial', fill: '#000', align: 'left' });
		if (game.device.desktop) {
			var label = game.add.text(w/2, h-70, '(Press the UP arrow key to start)', { font: '20px Arial', fill: '#000' });
			label.anchor.setTo(0.5, 0.5);
		}
		game.add.text(w-150, 50, 'Music', { font: '18px Arial', fill: '#000', align: 'right' });
		this.music_toggle = this.game.add.button(w-103, 50, 'sound', this.toggle_music, this);
		if (musicbool) {
			this.music_toggle.frame = 0;
		}
		else {
			this.music_toggle.frame = 1;
		}
		game.add.text(w-138, 80, 'SFX', { font: '18px Arial', fill: '#000', align: 'right' });
		this.sfx_toggle = this.game.add.button(w-103, 80, 'sound', this.toggle_sfx, this);
		if (sfxbool) {
			this.sfx_toggle.frame = 0;
		}
		else {
			this.sfx_toggle.frame = 1;
		}
//		if (!game.device.desktop) game.input.onDown.add(gofull, this);
	},

	update: function() {
		if (this.cursor.up.isDown) {
			this.game.state.start('Play');	
		}
	},

	startPlay: function() {
		this.game.state.start('Play');
	},
	
	toggle_music: function() {
		if (musicbool) {
			this.music_toggle.frame = 1;
			musicbool = false;
		}
		else {
			this.music_toggle.frame = 0;
			musicbool = true;			
		}
	},

	toggle_sfx: function() {
		if (sfxbool) {
			this.sfx_toggle.frame = 1;
			sfxbool = false;
		}
		else {
			this.sfx_toggle.frame = 0;
			sfxbool = true;			
		}
	},

		gofull: function() {
		    game.scale.startFullScreen();
	},
};
