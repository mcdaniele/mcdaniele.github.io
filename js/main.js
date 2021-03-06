Game.Play = function (game) { };

var leftt = false;
var rightt = false;
var first = true;
var dee = 0;
var timer2;

Game.Play.prototype = {

    create: function() { 

        this.bgworld = this.game.add.sprite(0, 0, 'bgworld');
        this.hero = this.game.add.sprite(game.world.centerX, 230,'hero');
        this.hero.anchor.setTo(0.5, 0.5);
        this.hero.body.gravity.y = 300;
        this.hero.body.collideWorldBounds = true;
        this.hero.body.bounce.y = 0.5;
        this.heroSpeed = 0;
        this.hero.animations.add('left', [4, 2, 4, 3], 6, true);
        this.hero.animations.add('right', [5, 6, 5, 7], 6, true);
        this.hero.animations.add('dead', [0, 0], 2, true);
        this.hero.animations.add('alive', [1, 1], 2, true);
        this.meteors = game.add.group();
        this.meteors.createMultiple(20, 'meteor');
        this.timer = this.game.time.events.loop(1000, this.spawnMeteors, this);
        this.ground = this.game.add.sprite(0, 250, 'ground');
        this.ground.body.immovable = true;
        this.coin = this.game.add.emitter(game.world.centerX, -10);
        this.coin.makeParticles('coin', 0, 100, true, false);
        this.coin.minParticleSpeed.setTo(-200, -200);
        this.coin.maxParticleSpeed.setTo(200, -300);
        this.coin.gravity = 300;
        this.coin.bounce.setTo(0.5,0.4);
//		this.coin.minRotation = 0;
//		this.coin.maxRotation = 0;
        this.coin.start(false, 6000, 400);  
        
		game.stage.backgroundColor = '#000';
        // SCORE
        // Create variable score with default 0
        score = 0;
        // Score shadow
        // Must be declared before "highlight text" since this is read first
        // Create var styleShadow which will handle the text's styling
        var styleShadow = {font: "30px Arial", fill: "#000000"};
//        var styleShadow2 = {font: "30px Arial", fill: "#000000"};
        this.scoreLabelShadow = this.game.add.text(290, 13, "0", styleShadow);
        // Score highlight
        // Item
        var style = {font: "30px Arial", fill: "#ffffff"};
//        var style2 = {font: "30px Arial", fill: "#ffffff"};
        this.scoreLabel = this.game.add.text(290, 10, "0", style);
        switch (true)
        {
            case (highscore > 9999):
                this.highscoreLabelShadow = this.game.add.text(497, 13, "0", styleShadow);
                this.highscoreLabel = this.game.add.text(497, 10, "0", style);
                break;
            case (highscore > 999):
                this.highscoreLabelShadow = this.game.add.text(514, 13, "0", styleShadow);
                this.highscoreLabel = this.game.add.text(514, 10, "0", style);
                break;
            case (highscore > 99):
                this.highscoreLabelShadow = this.game.add.text(531, 13, "0", styleShadow);
                this.highscoreLabel = this.game.add.text(531, 10, "0", style);
                break;
            case (highscore > 9):
                this.highscoreLabelShadow = this.game.add.text(548, 13, "0", styleShadow);
                this.highscoreLabel = this.game.add.text(548, 10, "0", style);
                break;
            default:
                this.highscoreLabelShadow = this.game.add.text(565, 13, "0", styleShadow);
//				this.highscoreLabelShadow.align = 'right';
                this.highscoreLabel = this.game.add.text(565, 10, "0", style);
//				this.highscoreLabel.align = 'right';
//                break;
		}
		this.highscoreLabelShadow.content = highscore;
        this.highscoreLabel.content = highscore;

		// INDICATOR
        // Create indicator that will help with player's death animation
        // So, only alive if hero is alive
        this.indicator = this.game.add.sprite(-30,0, 'indicator');
        // If the indicator is dead, then run the deadHero function
        this.indicator.events.onKilled.add(this.deadHero, this);

        // MOVEMENT
        // Setting up hero movement. Defining the cursor keys
		this.cursors = this.game.input.keyboard.createCursorKeys();
		//TOUCH
		if (!game.device.desktop)
		{
			this.buttonleft = this.game.add.button(0, 0, 'touchb', null, this, 0, 0, 0, 0);
        	this.buttonleft.fixedToCamera = true;
        	this.buttonleft.events.onInputOver.add(function(){leftt=true;});
        	this.buttonleft.events.onInputOut.add(function(){leftt=false;});
        	this.buttonleft.events.onInputDown.add(function(){leftt=true;});
        	this.buttonleft.events.onInputUp.add(function(){leftt=false;});
        	this.buttonright = this.game.add.button(300, 0, 'touchb', null, this, 0, 0, 0, 0);
        	this.buttonright.fixedToCamera = true;
        	this.buttonright.events.onInputOver.add(function(){rightt=true;});
        	this.buttonright.events.onInputOut.add(function(){rightt=false;});
        	this.buttonright.events.onInputDown.add(function(){rightt=true;});
        	this.buttonright.events.onInputUp.add(function(){rightt=false;});
//			game.stage.scaleMode = Phaser.StageScaleMode.EXACT_FIT; //resize your window to see the stage resize too
//			game.stage.scale.setShowAll();
//			game.stage.scale.refresh();		
		}
//		game,stage.scale.startFullScreen();

        // SOUND
        this.coin_s = game.add.sound('scoin');
    	this.coin_s.volume = 1;
        this.death_s = game.add.sound('sdeath');
    	this.death_s.volume = 1;
    	this.music_s = game.add.sound('smusic'); 
    	this.music_s.volume = 1;
        if (musicbool) this.music_s.play('', 0, 0.5, true);
    },
    
	update: function() {

        // PHYSICS
        // Check collision between(key, key)
        this.game.physics.collide(this.hero, this.ground);
        this.game.physics.collide(this.ground, this.coin);
        // Check collision between(key, key, call a function)
        this.game.physics.overlap(this.hero, this.coin, this.collectCoin, null, this);
        this.game.physics.overlap(this.hero, this.meteors, this.playerHit, null, this);

        // MOVEMENT
        // Set hero's default velocity to heroSpeed (at this point = 0)
        this.hero.body.velocity.x = this.heroSpeed;
        // If hero is alive AND player is holding down LEFT key then:
        if (this.hero.alive == true){
            if (this.cursors.left.isDown||leftt)
            {
                // Change player's velocity to -300
                this.hero.body.velocity.x = -300;
                // Play 'left' animation defined above
                if (dee != 1)
                {
                    this.hero.animations.play('left');
                    dee = 1;
                }
            // If not, then check if hero is alive AND player is holding down RIGHT key
            } 
            else if (this.cursors.right.isDown||rightt) 
            {
                // Change player's velocity to 300
                this.hero.body.velocity.x = 300;
                // Play 'right' animation
                if (dee != 2)
                {
                    this.hero.animations.play('right');
                    dee = 2;
                }
            } 
            else 
            {
                dee = 0;
                // Otherwise, stop all animations
                this.hero.animations.stop();
                // And display hero's 1st frame
                this.hero.frame = 1;
            }
        }
        if (game.time.now - timer2 > 3600 && !(this.hero.alive)) {this.hero.body.angularVelocity=0;this.music_s.stop();this.coin=null;this.music_s=null;game.state.start('Menu')};
    },

// FUNCTIONS
	enterIncorrectOrientation: function () {
 
        game.orientated = false;
 
//        document.getElementById('orientation').style.display = 'block';
        //INSERT PAUSE LOGIC HERE
		game.paused=true;
 
    },
 
    leaveIncorrectOrientation: function () {
 
        game.orientated = true;
 
//        document.getElementById('orientation').style.display = 'none';
        //INSERT UNPAUSE LOGIC HERE
		game.paused=false;
 
    },

    // Function that can be called to create one meteor
    spawnSingleMeteor: function(x, y){
        // Create var getmeteor
        // .getFirstDead will grab the first meteor from the meteors group (that is dead). 
        var getMeteor = this.meteors.getFirstDead();
        // We will reset the meteor we just fetched to the values x and y. Which corresponf to the function's attributes (x, y)
        getMeteor.reset(x, y);
        // Fake the meteor's gravity so that they fall from above
        // Math.floor rounds the result of Math.random to its lowest integer
        // Math.random()*150)+200 will create a randowm value betwen 200 and 350
        // This will make the meteors fall at different speeds each time
        getMeteor.body.velocity.y = Math.floor((Math.random()*150)+200);
        getMeteor.body.angularVelocity = Math.floor((Math.random()*400)-200);
        getMeteor.anchor.setTo(0.5, 0.5);
        // Destroy meteor if it is out of bounds, this in turn adds to the dead pool of meteors
        getMeteor.outOfBoundsKill = true;
    },

    // Function that spawns several meteors
    spawnMeteors: function(){
        // Loop 6 times, this in turn creates 6 meteors at a time
        // So the timer defined above will now spawn 6 meteors every 1.5 seconds
        for(var i = 0; i < 4; i++){
            // Here we pass the spawnSingleMeteor 2 attributes for it to modify (x, y)
            //this.spawnSingleMeteor(x,y)
            this.spawnSingleMeteor(Math.floor((Math.random()*580)+1), Math.floor((Math.random()*-100)-10));
        }
    },

    // Function called when the hero overlaps with a coin
    collectCoin: function(hero, coin){
        // Destroy the coin
        coin.kill();
        if (sfxbool) this.coin_s.play();
        // Add 1 to the score
        score += 1;
        // Update the scoreLabel content to the new score
        this.scoreLabel.content = score;
        // Idem for the shadow
        this.scoreLabelShadow.content = score;
    },

    // Function called when hero overlaps with meteors
    playerHit: function(hero, coin) {
        // If hero is still alive then 'return' or exit the function
        if (this.hero.alive == false) {
            return;
        };
        this.hero.animations.play('dead');
        if (sfxbool) this.death_s.play();
		game.add.tween(this.music_s).to({volume:0}, 2500, Phaser.Easing.Linear.None, true, 0, false);
        // If the fnction was not exited, then change the player's life status to dead
        this.hero.alive = false;
        // Kill the timer so that no more meteors are produced every 1.5 seconds
        this.game.time.events.remove(this.timer);
        // Kill the indicator which we defined before, this will then run the deadHero function bellow
        this.indicator.kill();
        // Also kill the coin emitter to prevent more coins from being created
        this.coin.kill();
    },

    // Function called when indicator is destroyed
    deadHero: function(){
        
        // Play hero's dead animation
        this.hero.animations.play('dead');
        // Remove hero's collideWorldBounds constraint so it can exit the play area
        this.hero.body.collideWorldBounds = false;
        // Make it pop upwards
        this.hero.body.velocity.y = -300;
        // Change heroSpeed to 70 so it also starts moving towards the larger half
        if (this.hero.x < game.world.centerX)
        {
            this.heroSpeed = 70;
            // Velocity angular rotation set positive
//            this.hero.body.angularVelocity = 300;
//			this.hero.angle = 180;
game.add.tween(this.hero).to({angle: 180}, 2000, Phaser.Easing.Linear.None, true, 0, false);
        }
        else 
        {
            this.heroSpeed = -70;
            // Velocity angular rotation set negative
//            this.hero.body.angularVelocity = -300;
//			this.hero.angle = 180;
game.add.tween(this.hero).to({angle: 180}, 2000, Phaser.Easing.Linear.None, true, 0, false);
        }
        // Set previous high score
        previoushigh = highscore;
        // If appropriate update high score
        if (score > highscore) highscore = score;
        timer2 = game.time.now;
    }

};