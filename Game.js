BasicGame.Distance = function (game) {

    //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    // this.game;		//	a reference to the currently running game
    // this.add;		//	used to add sprites, text, groups, etc
    // this.camera;	//	a reference to the game camera
    // this.cache;		//	the game cache
    // this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    // this.load;		//	for preloading assets
    // this.math;		//	lots of useful common math operations
    // this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    // this.stage;		//	the game stage
    // this.time;		//	the clock
    // this.tweens;    //  the tween manager
    // this.state;	    //	the state manager
    // this.world;		//	the game world
    // this.particles;	//	the particle manager
    // this.physics;	//	the physics manager
    // this.rnd;		//	the repeatable random number generator
    
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    // this.WIDTH = this.width; // The WIDTH of the game screen
    // this.HEIGHT = this.game.height; // The HEIGHT of the game screen
    this.GRID_SPACE = 20;
    
    this.TOTAL_TIME = 3; // Time for explosion
    this.ENEMY_VELOCITY = 5; // Velocity of the enemy
    
    this.bombs; // Group of bombs
    this.bomb;
    this.enemys; // Group of enemys
    this.enemy; // Instance of an enemy
    this.bombOnMouse; // The sprite that appears on the mouse (Might be removed)
    
    // Counters
    this.lives;// Lives left
    this.score; // Score
    this.timeCounter; // Time counter
    
    // Texts
    this.velocityText; // Text display of velocity
    this.timeText; // Text display of time
    this.livesText; // Text display of lives
    this.introText; // Text display for intro
    this.scoreText; // Text display of score
    this.gameOverText; // Text display for the end of the game

    // Buttons    
    this.blackHoleButton;
    this.playButton;

    // Booleans
    this.lost = false; // Boolean that says if player lost the game
    // this.started = false; // Boolean that says if the game has begun
    this.background; // Background of the game
};

BasicGame.Distance.prototype = {
    
    create: function () {

	started = false; // Boolean that says if the game has begun
	usingBlackHole = false;
	usingMissile = false;
	usingShield = false;
	
	//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
    
	this.background = this.add.sprite(0, 0, 'background');
	this.physics.startSystem(Phaser.Physics.ARCADE);
	
	//  We check bounds collisions against all walls other than the bottom one
	this.physics.arcade.checkCollision.down = false;
	
	this.background = this.add.tileSprite(0, 0, 800, 600, 'background');
	
	this.make_Grid(this.game.width, this.game.height);
	
	// this.bombOnMouse = this.add.sprite(this.world.centerX, 500, 'bombSelect');
	// this.bombOnMouse.anchor.setTo(0.5, 0.5);
	
	// this.physics.enable(this.bombOnMouse, Phaser.Physics.ARCADE);
	
	// this.bombOnMouse.body.collideWorldBounds = true;
	// this.bombOnMouse.visible = false;
	// this.bombOnMouse.body.bounce.set(1);
	// this.bombOnMouse.body.immovable = true;
	
	this.enemys = this.add.group();
	this.enemys.enableBody = true;
	this.enemys.physicsBodyType = Phaser.Physics.ARCADE;
	
	this.bombs = this.add.group();
	this.bombs.enableBody = true;
	this.bombs.physicsBodyType = Phaser.Physics.ARCADE;
	this.bombs.setAll('anchor.x', 0.5);
	this.bombs.setAll('anchor.y', 0.5);
	
	this.timeText = this.add.text(25, 25, '', { font: "20px Arial", fill: "#ffffff",
						    align: "left" });
	this.velocityText = this.add.text(25, 75, '', { font: "20px Arial",
							fill: "#ffffff", 
							align: "left" });
	this.scoreText = this.add.text(25, 125, '', { font: "20px Arial", 
						      fill: "#ffffff", align: "left" });
	this.livesText = this.add.text(this.game.width - 120, this.game.height - 50, '',
				       { font: "20px Arial", fill: "#ffffff", 
    					 align: "left" });
	this.gameOverText = this.add.text(this.world.centerX, this.world.centerY - 100, 
    					  '', { font: "60px Arial", fill: "#ffffff", 
    						align: "center" });
	this.gameOverText.anchor.setTo(0.5, 0.5);
	this.time.events.loop(Phaser.Timer.SECOND, this.countdown, this);
		
	this.lives = 3; // Lives left
	this.score = 0; // Score
	this.timeCounter = this.TOTAL_TIME; // Time counter
	
	this.enemy = this.enemys.create(this.world.centerX, 20, 'enemyDistance');
	this.enemy.anchor.setTo(0.5, 0.5);
	this.enemy.body.collideWorldBounds = true;
	
	this.timeText.text = 'Tiempo: ' + this.TOTAL_TIME;
	this.velocityText.text = 'Velocidad: ' + this.ENEMY_VELOCITY;
	this.scoreText.text = 'Puntos: ' + this.score;
	this.livesText.text = 'Vidas: ' + this.lives;
	this.gameOverText.visible = false;

	this.blackHoleButton = this.add.button(100, this.world.height - 75, 'blackHoleButton', this.select_Bomb);
	this.blackHoleButton.anchor.setTo(0.5, 0.5);
	this.blackHoleButton.scale.setTo(0.055, 0.055);

	this.playButton = this.add.button(this.world.centerX, this.world.height - 75, 'playButton', this.start, 2, 1, 0);
	this.playButton.anchor.setTo(0.5, 0.5);
	this.playButton.scale.setTo(0.075, 0.075);

	this.input.onDown.add(this.putWeapon, this);


    },
    
    update: function () {
	this.physics.arcade.overlap(this.enemys, this.bombs, this.try_To_Destroy, null, this);
	
	// if (this.bombOnMouse){
	//     this.bombOnMouse.body.x = this.input.x - 5;
	//     this.bombOnMouse.body.y = this.input.y - 5;
	// }
	this.timeText.text = 'Tiempo: ' + this.timeCounter;
	if (started) {
	    this.enemy.body.velocity.y = this.ENEMY_VELOCITY * this.GRID_SPACE;
	}

    },
    
    quitGame: function (won) {
	
	//	Here you should destroy anything you no longer need.
	//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
	this.playButton.destroy();
	this.blackHoleButton.destroy();
	this.background.destroy();
	this.bombs.removeAll(true);
	if (won) {
	    this.state.start('WinnerMenu');
	} else {
	//	Then let's go back to the main menu.
	this.state.start('GameOverMenu');	
	}
    },
    
    try_To_Destroy: function(enemy, bomb) {
	if (this.timeCounter == 0) {
	    enemy.kill();
	    this.quitGame(true);
	} else {
	    this.quitGame(false);
	}
    },

    make_Grid: function (WIDTH, HEIGHT) {
	var graphics = this.add.graphics(0, 0);
	
	//GRID_SPACE between lines
	this.GRID_SPACE = 20;
	
	//adding lines
	graphics.lineStyle(1, 0x33FF00,0.5);
	for (y = this.GRID_SPACE; y < this.game.height; y = y + this.GRID_SPACE) {
	    graphics.moveTo(0, y); 
	    graphics.lineTo(this.game.width - this.GRID_SPACE, y);
	}
	
	//adding line numbers.
	var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
	var end = this.game.height / this.GRID_SPACE;
	for (y = this.GRID_SPACE; y < this.game.height; y = y + this.GRID_SPACE) {
	    end--;
	    this.add.text(this.game.width - this.GRID_SPACE, y - 10, String(end), style);
	}
    },
    
    select_Bomb: function () {
	usingBlackHole = true;
    	// this.bombOnMouse = this.add.sprite(this.world.centerX, 500, 'bombSelect');
    	// this.bombOnMouse.anchor.setTo(0.5, 0.5);
	
    	// this.physics.enable(this.bombOnMouse, Phaser.Physics.ARCADE);
	
    	// this.bombOnMouse.body.collideWorldBounds = true;
    	// this.bombOnMouse.visible = false;

    	// console.log(this.bombOnMouse.body.x);
    	// console.log("HOLA");
	
    },

    start: function (pointer) {
	started = true;
    },

    put_Bomb: function () {
	if (!started) {
	    // Intance of a bomb
	    this.bomb = this.bombs.create(this.input.x - 5, this.input.y - 5, 'bomb');
	}
    },
    
    putWeapon: function () {
	if (!started) {
	    if (usingBlackHole) {
		this.put_Bomb();
	    }
	}
    },

    countdown: function () {
	if (started) {
	    if (!this.lost) {
		this.timeCounter -= 1;
	    }
	    if (this.timeCounter < 0) {
		this.quitGame();
	    }
	}
    }
};