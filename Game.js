<<<<<<< HEAD
BasicGame.Distance = function (game) {

    //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    //Grid Stuff
    //---------------------------------------------------------------------------
    this.GRID_SPACE = 38;         //Length of the squares of the grid
    this.LEFT_MARGIN = 196;        //Left Margin for the grid
    this.UP_MARGIN = 60;          //Horizontal Margin for the grid
    this.ROWS_NUMBER = 10; // Number of horizontal spaces in the grid
    this.COLUMNS_NUMBER = 16;   // Number of vertical spaces in the grid

    this.line;         //The line that helps you to use the numbers of the grid
    
    this.enemyOutOfGrid; //Booleans, set if an enemy is out of the grid

    //Grid adjustment in boxes
    this.gridX = 0;
    this.gridY = 0;
    //---------------------------------------------------------------------------
    
    this.TOTAL_TIME = 10; // Time for explosion
    this.BOMB_TOTAL_TIME = 3;
    this.ENEMY_VELOCITY = 3; // Velocity of the enemy
    this.TOTAL_ENEMIES = 1;    
    this.bombPool; // Group of bombPool
    this.bomb; // Instance of the group of bombPool
    this.enemyPool; // Group of enemies
    this.enemy; // Instance of an enemy
    this.bombOnMouse; // The sprite that appears on the mouse (Might be removed)
    
    // Counters
    this.timeCounter; // Time counter.
    this.explosionTimeCounter; // Tells the time remaining before de bomb explodes.
    this.numberOfBombs; //BombPool = number of enemies, should be generated.
    
    // Texts
    this.bombTextPool;
    this.otherTextPool;
    this.velocityText; // Text display of velocity
    this.levelText; // Text display of time
    this.explosionTimeText; // Text display for the explosionTimeCounter
    this.livesText; // Text display of lives

    // Buttons
    this.buttons; // Group for locked buttons
    this.blackHoleButton; // Black hole bomb button
    this.playButton; // Play button
    
    //Score system variables
    this.score;
    this.timeOfGame;

    this.background; // Background of the game
    
    //Aligned enemy in the grid.
    this.enemyPlace = 6;
};

BasicGame.Distance.prototype = {
    
    create: function () {
	
	// Initializing boolean variables.
	started = false; // Boolean that says if the game has begun.
	// lost = false; // Boolean that says if the player lost the game.
	// Boolean that says if the player has selected the black hole bomb.
	usingBlackHole = false; // Says if the player selected the bomb.
	placedBomb = false; // Says if a bomb has been placed on the grid.
	lastTime = this.time.now + 2500 // Keeps time for the explosion counter.
	this.numberOfBombs = this.TOTAL_ENEMIES; // Number of bombPool available in this level.
	
	// Creating background.
	this.background = this.add.sprite(0, 0, 'background');
	// Game physics system.
	this.physics.startSystem(Phaser.Physics.ARCADE);
	
	//  We check bounds collisions against all walls other than the bottom one
	// this.physics.arcade.checkCollision.down = false;
	
	// Creating the grid for the game.
	this.make_Grid(/*this.game.width, this.game.height*/);
	
	//Start the game inside the grid
	this.enemyOutOfGrid = false;

	/*
	 * Image that appears on the mouse when the black hole bomb button is 
	 * pressed.
	 */
	this.bombOnMouse = this.add.sprite(1000, 1000, 'bomb');
	this.bombOnMouse.anchor.setTo(0.5, 0.5);
	this.bombOnMouse.scale.setTo(0.1, 0.1);
	this.physics.enable(this.bombOnMouse, Phaser.Physics.ARCADE);
	
	this.line = this.add.sprite(1000, 1000,'ground');
	//this.line.scale.setTo(2.25,0.4); Use this for grid_space = 50
	this.line.scale.setTo(1.52, 0.4);
	this.line.anchor.setTo(0, 0.5);

	// Group for the enemies
	this.enemyPool = this.add.group();
	this.enemyPool.enableBody = true;
	this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.enemyPool.createMultiple(this.TOTAL_ENEMIES, 'distanceEnemy');
	this.enemyPool.setAll('anchor.x', 0.5);
	this.enemyPool.setAll('anchor.y', 0.5);
	this.enemyPool.setAll('outOfBoundsKill', true);
	this.enemyPool.setAll('checkWorldBounds', true);
	this.enemyPool.setAll('scale.x', 0.1);
	this.enemyPool.setAll('scale.y', 0.1);

	this.enemyPool.forEach(function(enemy) {
	    var enemy = this.enemyPool.getFirstExists(false);
	    // enemy.reset(this.rnd.integerInRange(200, 800), 100);
	    initialY = 40 - (enemy.height/2);
	    
	    aux1 = this.allign_X(this.enemyPlace) -(this.GRID_SPACE/2);
	    
	    enemy.frame = 0;
	    enemy.reset(aux1, initialY);
	    enemy.body.setSize(100, 100, 0, enemy.height/2);
	    enemy.inputEnabled = true;
	    enemy.events.onInputOver.add(function(enemy) {
		enemy.frame = this.ENEMY_VELOCITY;
	    }, this);
	    enemy.events.onInputOut.add(function(enemy) {
		enemy.frame = 0;
	    }, this);
	}, this);

	// Create the bombPool
	this.bombPool = this.add.group();
	this.bombPool.enableBody = true;
	this.bombPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.bombPool.createMultiple(this.TOTAL_ENEMIES, 'bomb');
	this.bombPool.setAll('anchor.x', 0.4);
	this.bombPool.setAll('anchor.y', 0.4);
	this.bombPool.setAll('scale.x', 0.15);
	this.bombPool.setAll('scale.y', 0.15);
	this.bombPool.forEach(function (bomb) {
	    bomb.animations.add('explode', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18], 10, false);
	}, this);

	// Group for the text displays
	this.bombTextPool = this.add.group();
	// Time until explosion display.
	this.enemyPool.forEach(function() {
	    var texto = this.add.text(0, 0, '', { font: "20px Arial", fill: "#ffffff", align: "left" }, this.bombTextPool);
	    texto.visible = false;
	}, this);

	// this.nextShotAt = 0;

	// Creating the text displays.
	this.otherTextPool = this.add.group();	
	// Game time display.
	this.levelText = this.add.text(931, 85, '1', { font: "30px Arial", fill: "#000000", align: "left" }, this.otherTextPool);
		
	// Display for velocity of the enemies.
	this.velocityText = this.add.text(25, 225, 'Velocidad: ' + this.ENEMY_VELOCITY, { font: "20px Arial", fill: "#ffffff", align: "left" }, this.otherTextPool);

	// Display for the amount of bombPool left.
	this.bombText = this.add.text(235, this.world.height - 40, '' + this.numberOfBombs, { font: "20px Arial", fill : "#ffffff", align: "left"}, this.otherTextPool);
	
	// Every second activates this.countdown.
	this.time.events.loop(Phaser.Timer.SECOND, this.countdown, this);
		
	// Counters.
	// Game's time counter.
	this.timeCounter = this.TOTAL_TIME;
	// Bomb's time counter.
	this.explosionTimeCounter = this.BOMB_TOTAL_TIME; // Time counter
	
	// Score counter
	this.timeOfGame = this.time.now;

	// Create the button for the black hole bomb
	this.blackHoleButton = this.add.button(200, this.world.height - 60, 
					       'blackHoleButton', 
					       this.select_Bomb, this, null,
					       null, 1, 1);
	this.blackHoleButton.anchor.setTo(0.5, 0.5);
	this.blackHoleButton.scale.setTo(0.4, 0.4);
	
	// // Create the play button
	this.playButton = this.add.button(this.world.centerX, 
					  this.world.height - 60, 'playButton',
					  this.start, 2, 1, 0);
	this.playButton.anchor.setTo(0.5, 0.5);
	this.playButton.scale.setTo(0.05, 0.05);

	// // Create the locked buttons	
	this.buttons = this.add.group();
	beforeButton = this.blackHoleButton;
	for(i = 0; i < 2; i++) {
	    x = this.buttons.create(beforeButton.x + 100, beforeButton.y, 
				    'lockedButton');
	    x.scale.setTo(0.175, 0.175);
	    beforeButton = x;
	};
	beforeButton = this.playButton;
	for(i = 0; i < 3; i++) {
	    x = this.buttons.create(beforeButton.x + 100, beforeButton.y, 
				    'lockedButton');
	    x.scale.setTo(0.175, 0.175);
	    beforeButton = x;
	};
	this.buttons.setAll('anchor.x', 0.5);
	this.buttons.setAll('anchor.y', 0.5);

	// Mouse input
	this.input.onDown.add(this.put_Bomb, this);

    },
    
    // Everything that needs to be done or modified constantly in the game goes
    // here.
    update: function () {
	// If an enemy and a bomb overlaps this.try_To_Destroy is activated.
	this.physics.arcade.overlap(this.enemyPool, this.bombPool, 
				    this.try_To_Destroy, null, this);
	// If the bomb on the mouse overlaps with a line this.line_Collision is 
	// activated.
	this.physics.arcade.overlap(this.bombOnMouse, this.lines,
				    this.line_Collision, null, this);
	this.bombOnMouse.reset(1000,1000);
	
	if (usingBlackHole) {
	    this.find_Grid_Place();
	    x = this.allign_X(this.gridX-0.5);
	    y = this.allign_Y(this.gridY-0.5);
	    this.bombOnMouse.reset(x,y);
	    
	    lineY = this.allign_Y(this.gridY-0.5); 
	    this.line.reset(this.LEFT_MARGIN,lineY);
	}

	// Update displays.
	this.bombText.text = 'x' + this.numberOfBombs;
	// Updating existing bomb's text display.
	this.bombPool.forEachAlive(function(bomb) {
	    var text = this.bombTextPool.getAt(this.bombPool.getIndex(bomb));
	    text.text = this.explosionTimeCounter;
	    text.visible = (this.explosionTimeCounter > 0);
	}, this);

	// If the game started move enemies.
	if (started) {
	    // enemy.body.velocity.y = this.ENEMY_VELOCITY * this.GRID_SPACE;
	    this.enemyPool.forEachAlive(function(enemy) {
		enemy.body.velocity.y = this.ENEMY_VELOCITY * this.GRID_SPACE;
	    }, this);
	}
	
	// If explosionTimeCounter is 0 start explosion animation.
	if (this.explosionTimeCounter == 0) {
	    this.bombPool.forEachAlive(function(bomb) {
		bomb.animations.play('explode');
		bomb.events.onAnimationComplete.add(function() {
		    if (this.enemyPool.countLiving() == 0) {
			bomb.kill();
		    }
		}, this);
	    }, this);
	}

	if ((!this.bombPool.getFirstAlive()) && (this.timeCounter < this.TOTAL_TIME) && (this.numberOfBombs < this.TOTAL_ENEMIES)) {
	    this.quit_Game(true);
	}
	// If an enemy reaches the botom of the grid you lose the game.
	this.enemyPool.forEachAlive(function(enemy) {
	    verticalLength = this.allign_Y(this.ROWS_NUMBER+0.7) ; 
	    if (enemy.body.y > (verticalLength)) this.enemyOutOfGrid = true;
	}, this);
	
	if (this.enemyOutOfGrid) {
	    this.quit_Game(false);
	}
    },
    
    // Destroys everything created and moves to the winner's menu or the game 
    // over menu.
    quit_Game: function (won) {	
	this.playButton.destroy();
	this.blackHoleButton.destroy();
	this.buttons.destroy(true);
	this.bombTextPool.destroy(true);
	this.otherTextPool.destroy(true);
	this.bombPool.destroy(true);
	this.background.kill();
	if (won) {
	    this.state.start('WinnerMenu', true, false, this.timeOfGame);
	} else {
	    //	Then let's go back to the game over menu.
	    this.state.start('GameOverMenu');	
	}
    },
    
    // If the bomb's counter is equal to zero then the enemy is killed.
    try_To_Destroy: function(enemy, bomb) {
	var explosionY = (initialY + (this.GRID_SPACE * this.ENEMY_VELOCITY * this.BOMB_TOTAL_TIME));
	if (this.explosionTimeCounter == 0 && enemy.body.y > explosionY && enemy.body.y <= explosionY + 25) {
	    enemy.kill();
	}
    },
    
    //Draws the grid
    make_Grid: function (/*WIDTH, HEIGHT*/) {
	
	//We will make a unique grid, with static tiles
	var style = { font: "15px Arial", fill: "#ffffff", align: "center" };

	var graphics = this.add.graphics(0, 0);
	graphics.lineStyle(2, 0x00CCFF,1);
	
	//Static horizontal lines------------------------------------------------   
	forConstant1 = (this.COLUMNS_NUMBER*this.GRID_SPACE) + this.LEFT_MARGIN;
	for( i = 0; i < (this.ROWS_NUMBER+1); i = i+1) {
	    y = (i * this.GRID_SPACE) + this.UP_MARGIN;
	    
	    graphics.moveTo(this.LEFT_MARGIN, y); 
	    graphics.lineTo(forConstant1,y);
	}

	//Static grid numbers----------------------------------------------------	
   	forConstant1=this.LEFT_MARGIN + this.GRID_SPACE*(this.COLUMNS_NUMBER+0.5);
	forConstant2 = ((this.GRID_SPACE) / 2) - 7.5; //7.5= 15px Arial / 2
	for( i= 0; i < this.ROWS_NUMBER; i = i+1) {
	    y = (i * this.GRID_SPACE) + this.UP_MARGIN;
	    
	    this.add.text( forConstant1, y + forConstant2, String(i+1), style );
	}
	//Static vertical lines--------------------------------------------------
	forConstant1 =(this.GRID_SPACE*this.ROWS_NUMBER)+this.UP_MARGIN;
	for (i = 0; i < (this.COLUMNS_NUMBER+1); i = i + 1) {
	    y = (i * this.GRID_SPACE) + this.LEFT_MARGIN;
	    
	    graphics.moveTo(y,this.UP_MARGIN);
	    graphics.lineTo(y,forConstant1);
	}
    },

    select_Bomb: function () {
	usingBlackHole = (this.numberOfBombs > 0);
	if (!usingBlackHole) {
	    // this.bombPool.removeAll();
	    this.bombPool.forEachAlive(function(bomb) {
		bomb.kill();
	    }, this);
	    this.bombTextPool.forEach(function(l) {
		l.visible = false;
	    }, this);
	    this.numberOfBombs = this.TOTAL_ENEMIES;
	}
		
    },

    start: function () {
	started = true;
    },

    // Creates a black hole bomb in the place clicked inside the grid.
    put_Bomb: function () {
	
	if (!started && usingBlackHole && (this.numberOfBombs > 0)) {
	    // Intance of a bomb
	    x = (this.allign_X(this.gridX-1)) + (this.GRID_SPACE/3);
	    y = (this.allign_Y(this.gridY-1)) + (this.GRID_SPACE/3);

	    this.bombPool.forEachDead(function(bomb) {
		console.log(this.bombPool.getIndex(bomb));
	    }, this);
	    var bomb = this.bombPool.getFirstExists(false);
	    bomb.body.setSize(10, 10, 4, 4);
	    bomb.reset(x, y);

	    var text = this.bombTextPool.getAt(this.bombPool.getIndex(bomb));
	    text.visible = true;
	    text.x = x;
	    text.y = y;
	    this.numberOfBombs -= 1;

	    placedBomb = true;
	}
	this.blackHoleButton.frame = 0;
	this.bombOnMouse.reset(1000, 1000);
    	usingBlackHole = false;
	this.line.reset(1000, 1000);
    },
    
    // Decreases the game's counter and the bomb's counter.
    countdown: function () {
	if (started) {
	    this.timeCounter -= 1;
	    if (this.timeCounter < 0) {
		this.quit_Game(true);
	    }
	    if (placedBomb) {
		this.explosionTimeCounter -= 1;
	    }
	}
    },
    
    //This function detects the place in the grid of an object.
    //Use it for objects that belong to the grid space.
    find_Grid_Place: function() {
	this.gridX = parseInt((this.input.x-this.LEFT_MARGIN+this.GRID_SPACE)/this.GRID_SPACE);
	this.gridY = parseInt((this.input.y-this.UP_MARGIN+this.GRID_SPACE)/this.GRID_SPACE);
    
	if(this.gridX < 1) this.gridX = 1;
	if(this.gridX > 16) this.gridX = 16;
    
	if(this.gridY < 1) this.gridY = 1;
	if(this.gridY > 10) this.gridY = 10;
    },
    
    //Alligns a number to the X axis of the grid
    allign_X: function(x){
	return x*this.GRID_SPACE + this.LEFT_MARGIN;
    },
    
    //Alligns a number to the Y axis of the grid
    allign_Y: function(y){
	return y*this.GRID_SPACE + this.UP_MARGIN;
    },
/*
    outOfGrid: function(enemy) {
	//if (enemy.body.y > (200)) console.log("Entro aquí VE");
	verticalLength = this.allignY ( this.VERTICAL_NUMBER ) ; 
	if (enemy.body.y > verticalLength) this.enemyOutOfGrid = true;
    },*/

    // This function is for debug (and other stuff xD, but we're using it for
    // debugging sprite's sizes).
    // render: function() {
    // 	if (this.enemyPool.countLiving() > 0) {
    // 	    this.enemyPool.forEachAlive(function (enemy) {
    // 		this.game.debug.body(enemy, false, 'rgb(255, 0, 0)');
    // 	    }, this);
    // 	}
    // 	if (this.bombPool.countLiving() > 0) {
    // 	    this.bombPool.forEachAlive(function(bomb) {
    // 		this.game.debug.body(bomb, false, 'rgb(255, 0, 0)');
    // 	    }, this);
    // 	}
    // }
=======
BasicGame.Distance = function (game) {

    //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    // this.game;		//a reference to the currently running game
    // this.add;		//used to add sprites, text, groups, etc
    // this.camera;	        //a reference to the game camera
    // this.cache;		//the game cache
    // this.input;		//the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    // this.load;		//for preloading assets
    // this.math;		//lots of useful common math operations
    // this.sound;		//the sound manager - add a sound, play one, set-up markers, etc
    // this.stage;		//the game stage
    // this.time;		//the clock
    // this.tweens;             //the tween manager
    // this.state;	        //the state manager
    // this.world;		//the game world
    // this.particles;	        //the particle manager
    // this.physics;	        //the physics manager
    // this.rnd;		//the repeatable random number generator
    
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    //Grid Stuff
    this.GRID_SPACE = 38;
    this.line;
    this.indexAux = 0;
   
    //Grid adjustment in boxes
    this.gridX = 0;
    this.gridY = 0;

    this.TOTAL_TIME = 3; // Time for explosion
    this.ENEMY_VELOCITY = 2; // Velocity of the enemy
    
    this.bombs; // Group of bombs
    this.bomb;
    this.enemies; // Group of enemies
    this.enemy; // Instance of an enemy
    this.bombOnMouse; // The sprite that appears on the mouse (Might be removed)
    
    // Counters
    this.lives;// Lives left
    this.score; // Score
    this.timeCounter; // Time counter
    this.numberOfBombs; //Bombs = number of enemies, should be generated
    
    // Texts
    this.velocityText; // Text display of velocity
    this.timeText; // Text display of time
    this.livesText; // Text display of lives
    this.introText; // Text display for intro
    this.scoreText; // Text display of score
    this.bombsText; //Text display number of remaining bombs
    // Buttons
    this.buttons; // Group for locked buttons
    this.blackHoleButton; // Black hole bomb button
    this.playButton; // Play button

    // Booleans
    // this.lost = false; // Boolean that says if player lost the game
    this.background; // Background of the game
    
    //Aligned enemy in the grid
    this.enemyPlace = 6;
};

BasicGame.Distance.prototype = {
    
    create: function () {

	started = false; // Boolean that says if the game has begun
	lost = false; // Boolean that says if the player lost the game
	// Boolean that says if the player has selected the black hole bomb
	usingBlackHole = false; 
	
	this.numberOfBombs = 2; // Number of bombs available in this level

	this.background = this.add.sprite(0, 0, 'background');
	this.physics.startSystem(Phaser.Physics.ARCADE);
	
	//  We check bounds collisions against all walls other than the bottom one
	this.physics.arcade.checkCollision.down = false;
	
	// this.background = this.add.tileSprite(0, 0, 1000, 600, 'background');	
	this.make_Grid(this.game.width, this.game.height);
	
	this.bombOnMouse = this.add.sprite(1000, 1000, 'bombSelect');
	this.bombOnMouse.anchor.setTo(0.5, 0.5);
	this.physics.enable(this.bombOnMouse, Phaser.Physics.ARCADE);
	
	this.line = this.add.sprite(1000,1000,'ground');
	//this.line.scale.setTo(2.25,0.4); Use this for grid_space = 50
	this.line.scale.setTo(1.52,0.4);

	// Group for the enemies
	this.enemies = this.add.group();
	this.enemies.enableBody = true;
	this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
	
	// Create an instance of an enemy
	// this.enemy = this.enemies.create(0, 0, 'enemyDistance');
	// // this.enemy.body.reset(150, 150);

	// this.enemy.body.collideWorldBounds = true;

	enemy = this.add.sprite((this.enemyPlace*this.GRID_SPACE)+196-(this.GRID_SPACE/2), 50, 'enemyDistance');
	enemy.anchor.setTo(0.5, 0.5);
	enemy.scale.setTo(0.1, 0.1);
	this.enemies.add(enemy);

	// Create the bombs
	this.bombs = this.add.group();
	this.bombs.enableBody = true;
	this.bombs.physicsBodyType = Phaser.Physics.ARCADE;
	this.bombs.setAll('anchor.x', 0.5);
	this.bombs.setAll('anchor.y', 0.5);
	
	this.timeText = this.add.text(25, 175, '', { font: "20px Arial", 
						    fill: "#ffffff", 
						    align: "left" });
	this.velocityText = this.add.text(25, 225, '', { font: "20px Arial",
							fill: "#ffffff", 
							align: "left" });
	this.bombsText = this.add.text(25,275,'', { font: "20px Arial",
						   fill : "#ffffff",
						   align: "left"});
	// // this.livesText = this.add.text(this.game.width - 120, this.game.height - 50, '',
	// // 			       { font: "20px Arial", fill: "#ffffff", 
    	// // 				 align: "left" });
	this.time.events.loop(Phaser.Timer.SECOND, this.countdown, this);
		
	// this.lives = 3; // Lives left
	// this.score = 0; // Score
	this.timeCounter = this.TOTAL_TIME; // Time counter
		
	this.timeText.text = 'Tiempo: ' + this.TOTAL_TIME;
	this.velocityText.text = 'Velocidad: ' + this.ENEMY_VELOCITY;
	this.bombsText.text = 'Bombas restantes:' + this.numberOfBombs;
	// this.scoreText.text = 'Puntos: ' + this.score;
	// this.livesText.text = 'Vidas: ' + this.lives;

	// Create the button for the black hole bomb
	this.blackHoleButton = this.add.button(200, this.world.height - 60, 
					       'blackHoleButton', 
					       this.select_Bomb, this, null,
					       null, 1, 1);
	this.blackHoleButton.anchor.setTo(0.5, 0.5);
	this.blackHoleButton.scale.setTo(0.4, 0.4);

	// this.blackHoleButton.animations.add('unpressed', [0], 1, false);
	// this.blackHoleButton.animations.add('pressed', [1], 1, false);
	// // Create the play button
	this.playButton = this.add.button(this.world.centerX, 
					  this.world.height - 60, 'playButton',
					  this.start, 2, 1, 0);
	this.playButton.anchor.setTo(0.5, 0.5);
	this.playButton.scale.setTo(0.050, 0.050);

	// // Create the locked buttons	
	this.buttons = this.add.group();
	beforeButton = this.blackHoleButton;
	for(i = 0; i < 2; i++) {
	    x = this.buttons.create(beforeButton.x + 100, beforeButton.y, 
				    'lockedButton');
	    x.scale.setTo(0.175, 0.175);
	    beforeButton = x;
	};
	beforeButton = this.playButton;
	for(i = 0; i < 3; i++) {
	    x = this.buttons.create(beforeButton.x + 100, beforeButton.y, 
				    'lockedButton');
	    x.scale.setTo(0.175, 0.175);
	    beforeButton = x;
	};
	this.buttons.setAll('anchor.x', 0.5);
	this.buttons.setAll('anchor.y', 0.5);

	// Mouse input
	this.input.onDown.add(this.put_Bomb, this);
    },
    
    update: function () {
	this.physics.arcade.overlap(this.enemies, this.bombs, 
				    this.try_To_Destroy, null, this);
	this.physics.arcade.overlap(this.bombOnMouse, this.lines,
				    this.line_Collision, null, this);
	this.bombOnMouse.reset(1000,1000);
	if (usingBlackHole){

	    this.findGridPlace();
	    
	    this.bombOnMouse.reset(((this.gridX-1)*this.GRID_SPACE)+214,((this.gridY-1)*this.GRID_SPACE)+83);
	    
	    //Constant= OffsetY - ((gridspace-SizeofGrid)/2 + SizeofGrid)
	    //Size of grid: 32*0.4. OffsetY = 60
	    this.line.reset(196,(((this.gridY)*(this.GRID_SPACE))+34.6));
	    
	}
	this.timeText.text = 'Tiempo: ' + this.timeCounter;
	this.bombsText.text = 'Bombas restantes:' + this.numberOfBombs;
	
	if (started) {
	    enemy.body.velocity.y = this.ENEMY_VELOCITY * this.GRID_SPACE;
	}

    },
    
    quit_Game: function (won) {
	
	//Here you should destroy anything you no longer need.
	//Stop music, delete sprites, purge caches, free resources, all that good stuff.
	this.playButton.destroy();
	this.blackHoleButton.destroy();
	this.buttons.removeAll(true);
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
	    // if ((enemy.x - bomb.x) < 20 && (enemy.y == bomb.y) < 20) {
	    	enemy.kill();
	    	this.quit_Game(true);
	    // }
	 } // else {
	    // lost = true;
	// }
    },

    make_Grid: function (WIDTH, HEIGHT) {
	
	//We will make a unique grid, with static tiles
	var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
    
	var graphics = this.add.graphics(0, 0);
	graphics.lineStyle(2, 0x00CCFF,1);
    
	for(this.indexAux = 0; this.indexAux < 11; this.indexAux = this.indexAux + 1){
	    y = ((this.indexAux) * this.GRID_SPACE) + 60;
	    
	    //Static horizontal lines
	    graphics.moveTo(196, y); 
	    graphics.lineTo(this.game.width-196,y);
	    if (this.indexAux <10){
		this.add.text(this.game.width-180,y-10+((this.GRID_SPACE)/2),
			      String((this.indexAux+1)),style);
	    }
	}
    
	for (this.indexAux = 0; this.indexAux < 17; this.indexAux = this.indexAux + 1){
	    y = (this.indexAux * this.GRID_SPACE) + 196;
	    //Static vertical lines
	    graphics.moveTo(y,60);
	    graphics.lineTo(y,(((this.GRID_SPACE)*10)+60));
	}
    },

    select_Bomb: function () {
	//Odio esta maldita mierda de los grupos q no funcionan u.u
	/*if(this.numberOfBombs<=0){
	    this.bombs.removeAll(true);
	    this.bombs.removeAll(false);
	}*/
	//this.bombs.removeAll(true);
	//this.enemies.removeAll(true);
	usingBlackHole = true;
	// player.animations.play('pressed');
	// this.blackHoleButton.frame = 1;
    },

    start: function (pointer) {
	started = true;
    },

    put_Bomb: function () {
	
	if (!started && usingBlackHole && (this.numberOfBombs>0)) {
	    // Intance of a bomb
	    this.bomb = this.bombs.create( ((this.gridX-1)*this.GRID_SPACE)+196+(this.GRID_SPACE/3),
					   ((this.gridY-1)*this.GRID_SPACE)+60+(this.GRID_SPACE/3), 'bomb');
	    this.numberOfBombs -=1;
	}
	this.bombOnMouse.reset(1000,1000);
    	usingBlackHole = false;
	this.line.reset(1000,1000);
    },
    
    countdown: function () {
	if (started) {
	    if (!lost) {
		this.timeCounter -= 1;
	    }
	    if (this.timeCounter < 0) {
		this.quit_Game();
	    }
	}
    },

    findGridPlace: function(){
	this.gridX = parseInt((this.input.x-196+this.GRID_SPACE)/this.GRID_SPACE);
	this.gridY = parseInt((this.input.y-60+this.GRID_SPACE)/this.GRID_SPACE);
    
	if(this.gridX < 1) this.gridX = 1;
	if(this.gridX > 16) this.gridX = 16;
    
	if(this.gridY < 1) this.gridY = 1;
	if(this.gridY > 10) this.gridY = 10;
    }  
>>>>>>> 8359f36e6f2f0705a4828ed86d297a60cbef83ed
};