Game.Menu = function (game) { };

Game.Menu.prototype = {

	create: function() {
		this.cursor = this.game.input.keyboard.createCursorKeys();
		game.stage.backgroundColor = '#000';
		var bgmenu = this.game.add.sprite(42, 0, 'menubg');
		var playbutton = this.game.add.button(300, 200, 'playb', this.startPlay, this);
		playbutton.anchor.setTo(0.5, 0);
		var oldhigh = Number(getCookie("johnnyhigh"));
		if (highscore>oldhigh) {
			setCookie("johnnyhigh",highscore,"200");
		}
		else {
			highscore=oldhigh;
			previoushigh=oldhigh;
		}
		var labelscore = game.add.text(80, 50, 'Score: '+score, { font: '20px Arial', fill: '#000', align: 'left', fontWeight: 'bold' });
		var labelhighscore = game.add.text(80, 80, 'Previous Highscore: '+previoushigh, { font: '20px Arial', fill: '#000', align: 'left', fontWeight: 'bold' });
		if (game.device.desktop) {
			var label = game.add.text(300, 135, 'Arrows to control', { font: '20px Arial', fill: '#000', align: 'center', fontWeight: 'bold' });
			label.fontWeight = 'bold';
			label.anchor.setTo(0.5, 0.5);
			var label22 = game.add.text(300, 160, '(UP arrow to start)', { font: '20px Arial', fill: '#000', align: 'center', fontWeight: 'bold' });
			label22.fontWeight = 'bold';
			label22.anchor.setTo(0.5, 0.5);
		}
		else {
			var controllabel = game.add.text(300, 135, 'Touch left half of game screen to move left', { font: '20px Arial', fill: '#000', align: 'center', fontWeight: 'bold' });
			controllabel.fontWeight = 'bold';
			controllabel.anchor.setTo(0.5, 0.5);
			var controllabel2 = game.add.text(300, 160, 'Right half to move right', { font: '20px Arial', fill: '#000', align: 'center', fontWeight: 'bold' });
			controllabel2.fontWeight = 'bold';
			controllabel2.anchor.setTo(0.5, 0.5);
		}
		this.music_toggle = this.game.add.button(w-168, 50, 'music', this.toggle_music, this);
		if (musicbool) {
			this.music_toggle.frame = 0;
		}
		else {
			this.music_toggle.frame = 1;
		}
		this.sfx_toggle = this.game.add.button(w-143, 80, 'sfx', this.toggle_sfx, this);
		if (sfxbool) {
			this.sfx_toggle.frame = 0;
		}
		else {
			this.sfx_toggle.frame = 1;
		}
this.angle = 0;
		game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
		game.stage.scale.pageAlignHorizontally = true;
		game.stage.scale.pageAlignVertically = true;
	    game.stage.scale.setScreenSize(true);
		setContent();
	},

	update: function() {
		if (this.cursor.up.isDown) {
	    	game.stage.scale.setScreenSize(true);
			this.game.state.start('Play');	
		}
	},

	startPlay: function() {
/*  var Fullscreen = {
    launch: function(element) {
      if(element.requestFullscreen) {
        element.requestFullscreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    exit: function() {
      if(document.exitFullscreen) {
        document.exitFullscreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };
    Fullscreen.launch(document.documentElement);
		screen.orientation.lock("landscape-primary");
	    	game.stage.scale.setScreenSize(true);
		setContent();*/
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
