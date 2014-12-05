BasicGame.Nivel2 = function(game) {

    //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    //Grid Stuff
    //---------------------------------------------------------------------------
    GRID_SPACE = 38;         //Length of the squares of the grid
    LEFT_MARGIN = 196;        //Left Margin for the grid
    UP_MARGIN = 60;          //Horizontal Margin for the grid
    ROWS_NUMBER = 10; // Number of horizontal spaces in the grid
    COLUMNS_NUMBER = 16;   // Number of vertical spaces in the grid
    
    TIMES_TO_PASS = 5; //Number of times that the level is needed to be passed

    //this.line;  //The line that helps you to use the numbers of the grid
    
    this.enemyOutOfGrid; //Booleans, set if an enemy is out of the grid

    //Grid adjustment in boxes
    this.gridX = 0;
    this.gridY = 0;
    //----------------------------------------------------------------------
    
    //TOTAL_TIME = 10; // Time for explosion. Not used, waited to be erased
    
    //If required to use, this.enemyVelocity & this.bombTime need to be added
    //--------------------------------
    BOMB_TOTAL_TIME = 3;
    ENEMY_VELOCITY = 3; // Velocity of the enemy
    //--------------------------------

    //ENEMY_SHIELD_SPEED = 2.5; //Refer to this.enemyShieldSpeed
    
    DISTANCE_ENEMIES = 0; // Amount of distance enemies
    VELOCITY_ENEMIES = 1; // Amount of velocity enemies
    TOTAL_ENEMIES = DISTANCE_ENEMIES + VELOCITY_ENEMIES; // Total amount of enemies on the level

    this.bombPool; // Group of bombs
    this.cannonPool; // Group of cannons
    this.missilePool; // Group of missiles
    this.enemyVelocityPool; // Group of enemies
    
    this.enemy; // Instance of an enemy
    this.bombOnMouse; // The sprite that appears on the mouse
    
    this.cannonOnMouse; // The sprite that appears on the mouse
    
    // Counters
    //this.timeCounter; // Time counter. Not used, waited to be erased
    this.explosionTimeCounter; // Tells the time remaining before de bomb explodes.
    // numberOfBombs; // Amount of bombs the user has
    // numberOfCannons; // Amount of cannons the user has

    // Texts
    this.bombsRemainingText;
    this.bombTextPool;
    this.otherTextPool;
    this.velocityText; // Text display of velocity
    this.levelText; // Text display of time
    this.explosionTimeText; // Text display for the explosionTimeCounter
    this.livesText; // Text display of lives
    this.blackHoleButtonText; // Text display for the time in which the bomb will explode
    this.cannonButtonText; // Text display for the speed of the missile.

    // Buttons
    /*this.buttons; // Group for locked buttons*/
    this.blackHoleButton; // Black hole bomb button
    this.cannonButton;
    this.playButton; // Play button
    
    // Actual level
    this.level;

    //Score system variables
    this.score;
    this.timeOfGame;

    // Variable to play the level multiple times
    this.timesPassed = TIMES_TO_PASS;
    
    //Aligned enemy in the grid.
    this.enemyPlace = 6;
    
    //equations for the kids to enjoy
    this.enemyShieldSpeed = 2.5;
    this.enemyGridDistance = 1;
};

BasicGame.Nivel2.prototype = {

    init: function(lastTime,level,score,
		   allign_X,
		   allign_Y,
		   blackHoleButton_Setup,
		   bombOnMouse_Setup,
		  // bombPool_Setup,
		   countdown,
		   find_Grid_Place,
		  // gridLine_Setup,
		   make_Grid,
		   minusButton_Setup,
		   plusButton_Setup,
		  // lockedButtons_Setup,
		   playButton_Setup,
		   select_Bomb,
		   start,
		   scoreText_Setup,
		   try_To_Destroy) {
	console.log(level);
	this.score = score;
	this.level = level;
    	this.allign_X = allign_X;
	this.allign_Y = allign_Y;
	this.blackHoleButton_Setup = blackHoleButton_Setup;
	this.bombOnMouse_Setup = bombOnMouse_Setup;
	//this.bombPool_Setup = bombPool_Setup;
	this.countdown = countdown;
	this.find_Grid_Place = find_Grid_Place;
	//this.gridLine_Setup = gridLine_Setup;
	this.make_Grid = make_Grid;
	this.minusButton_Setup = minusButton_Setup;
	this.plusButton_Setup = plusButton_Setup;
	//this.lockedButtons_Setup = lockedButtons_Setup;
	this.playButton_Setup = playButton_Setup;
	this.select_Bomb = select_Bomb;
	this.start = start;
	this.scoreText_Setup = scoreText_Setup;
	this.try_To_Destroy = try_To_Destroy;
    },

    
    create: function() {
	// Initializing boolean variables.
	started = false; // Boolean that says if the game has begun.
	shot = false; // Boolean that says if the cannons have shot.
	enemyShield = true; // Boolean that says if the shields are activated.

	missileSpeed = 0; // The speed of the missiles.

	// Booleans that says if the player is using a weapon.
	// A player should not be able of using more than a weapon at a time
	//-------------------------------------------------------------
	usingBlackHole = false; // Says if the player selected the bomb.
	usingCannon = false; // Says if the player selected the cannon.
	//-------------------------------------------------------------

	placedBomb = false; // Says if a bomb has been placed on the grid.
	numberOfBombs = TOTAL_ENEMIES; // Number of bombs available in this level.
	numberOfCannons = TOTAL_ENEMIES; // Number of cannons available in this level.
	
	//Beep sound of the bomb
	bombBeep = this.add.audio('bombBeep');

	background = this.add.sprite(0, 0, 'background'); // Creating background.
	this.physics.startSystem(Phaser.Physics.ARCADE); //Game physics system.

	//this.enemyDistance = this.game.rnd.integerInRange(1, 10);
	//Sets the value of enemyShieldSpeed and enemyGridDistance
	this.get_Enemy_Distance_Speed();
	
	//this.enemyShieldSpeed = 10/(this.game.rnd.integerInRange(1, 10));
	//this.enemyShieldSpeed = this.enemyShieldSpeed.toPrecision(3);

	this.make_Grid(); // Creating the grid for the game.
	
	this.enemyOutOfGrid = false; // Start the game inside the grid.

	this.bombOnMouse_Setup(); // Image that appears on the mouse when the black hole bomb button is pressed.

	this.cannonOnMouse_Setup(); // Image that appears on the mouse when the cannon button is pressed.
	
	//this.gridLine_Setup();
	/*
	this.line = this.add.sprite(1000, 1000,'ground');
	//this.line.scale.setTo(2.25,0.4); Use this for grid_space = 50
	this.line.scale.setTo(1.52, 0.4);
	this.line.anchor.setTo(0, 0.5);
	*/
	this.enemyVelocityPool_Setup(); // Setup the enemies.
	this.bombPool_Setup(); // Create the bombs.
	this.missilePool_Setup(); // Creating the missiles for the cannons.
	this.cannonPool_Setup(); // Create the cannonPool.

	// Counters.
	//this.timeCounter = TOTAL_TIME; // Game's time counter. Not used
	this.explosionTimeCounter = BOMB_TOTAL_TIME; // Bomb's time counter.

	buttons = this.add.group(); // Group for buttons.

	this.blackHoleButton_Setup(); // Creates the black hole button.
	this.cannonButton_Setup(); // Creates the cannon button.
	this.playButton_Setup(); // Creates the play button.
	this.lockedButtons_Setup(); // Creates the locked buttons.

	// Creating the text displays.
	this.displays_Setup();
	// Score Texts
	this.scoreText_Setup();
	
	this.timeOfGame = this.time.now; // Score counter.

	this.input.onDown.add(this.put_Weapon, this); // Mouse input.

	this.time.events.loop(Phaser.Timer.SECOND, this.countdown, this); // Every second activates this.countdown.

    },
    
    // Everything that needs to be done or modified constantly in the game goes
    // here.
    update: function() {
	// If an enemy and a bomb overlaps this.try_To_Destroy is activated.
	this.physics.arcade.overlap(this.enemyVelocityPool, this.missilePool, this.try_To_Destroy_Velocity, null, this);
	// this.physics.arcade.overlap(this.cannonPool, this.missilePool, this.you_Got_Shot, null, this);

	//Hide the weapons cursors
	this.bombOnMouse.reset(1000, 1000);
	this.cannonOnMouse.reset(1000, 1000);

	
	if (usingBlackHole) {
	    this.find_Grid_Place();
	    x = this.allign_X(this.gridX - 0.5);
	    y = this.allign_Y(this.gridY - 0.5);
	    this.bombOnMouse.reset(x, y);

	    // Display of the time left before the bomb explodes.
	    var text = this.bombTextPool.getAt(TOTAL_ENEMIES - 1);
	    // text.anchor.setTo(0.5, 0.5);
	    text.visible = true;
	    text.text = BOMB_TOTAL_TIME;
	    text.x = x;
	    text.y = y;

	    lineY = this.allign_Y(this.gridY - 0.5); 
	    //this.line.reset(LEFT_MARGIN, lineY);

	} else if (usingCannon) {
	     this.find_Grid_Place();
	     x = this.allign_X(this.gridX - 0.5);
	     y = 460;
	     this.cannonOnMouse.reset(x, y);
	}

	// Updating existing bomb's text display.
	this.bombPool.forEachAlive(function(bomb) {
	    var text = this.bombTextPool.getAt(this.bombPool.getIndex(bomb));
	    text.text = this.explosionTimeCounter;
	    text.visible = (this.explosionTimeCounter > 0);
	}, this);
	
	// Updating buttons displays
	this.cannonButtonText.text = '' + missileSpeed;

	// If the game started move enemies.
	if (started) {
	    
	    this.cannonPool.forEachAlive(function(cannon) {
		if(this.missilePool.countLiving() < VELOCITY_ENEMIES && !shot) {
		    console.log('peace');
		    this.fire(cannon);
		}
	    }, this);
	}
	
	// If explosionTimeCounter is 0 start explosion animation.
	if (this.explosionTimeCounter == 0) {
	    this.bombPool.forEachAlive(function(bomb) {
		bomb.animations.play('explode');
		bomb.events.onAnimationComplete.add(function() {
		    bomb.kill();
		    // if (this.enemyVelocityPool.countLiving() == 0) {
		    // 	bomb.kill();
		    // }
		}, this);
	    }, this);
	}

	/*((!this.bombPool.getFirstAlive()) && (this.timeCounter < TOTAL_TIME) && (numberOfBombs < TOTAL_ENEMIES))*/
	if (!this.enemyVelocityPool.getFirstAlive()) {
	    this.timesPassed -=1;
	    
	    if(this.timesPassed ==0){
		this.quit_Game(true);
	    }else{
		//Resets the enemies and bombs, maybe should be a function
		//------------------------------------------------------------
		this.get_Enemy_Distance_Speed();
		
		this.enemyVelocity = this.game.rnd.integerInRange(1, ROWS_NUMBER/2);
		this.bombTime = this.game.rnd.integerInRange(2, Math.floor((10/this.enemyVelocity)));
		this.explosionTimeCounter = this.bombTime;
		this.blackHoleButtonText.text =  '' + this.explosionTimeCounter;
		//----------------------------------------------------------
		this.enemyVelocityPool.forEach(function(enemy) {
		    initialY =this.allign_Y(10-this.enemyGridDistance)+ (enemy.height/5);
		    this.enemyPlace = this.game.rnd.integerInRange(1, COLUMNS_NUMBER);
		    
		    aux1 = this.allign_X(this.enemyPlace) -(GRID_SPACE/2);
		    enemy.frame = 1;
		    enemy.reset(aux1, initialY);
		    enemy.body.setSize(100, 100, 0, 0);
		    enemy.animations.add('shield', [1, 0], 10, false);
		    enemy.animations.add('unshield', [0, 1], 10, false);			},this);
		/*
		this.enemyDistancePool.forEach(function(enemy) {
		    var enemy = this.enemyDistancePool.getFirstExists(false);
		    initialY = 40 - (enemy.height/2);
		    this.enemyPlace = this.game.rnd.integerInRange(1, COLUMNS_NUMBER);	    
		    aux1 = this.allign_X(this.enemyPlace)-(GRID_SPACE/2);
		    enemy.frame = this.enemyVelocity;
		    enemy.reset(aux1, initialY);

		    var text = this.enemyDistanceTextPool.getAt(this.enemyDistancePool.getIndex(enemy));
		    text.visible = true;
		    text.x = (this.allign_X(this.enemyPlace))+38;
		    text.text = 'Velocidad: ' + this.enemyVelocity;
		},this);*/
		//----------------------------------------------------------
		
		this.explosionTimeCounter = this.bombTime;
		numberOfBombs = TOTAL_ENEMIES;
		numberOfCannons = TOTAL_ENEMIES;
		placedBomb = false;
		//usingBlackHole = true;
		started = false;
	    //------------------------------------------------------------
	    }
	    
	}
	// If an enemy reaches the botom of the grid you lose the game.
	this.enemyVelocityPool.forEachAlive(function(enemy) {
	    verticalLength = this.allign_Y(ROWS_NUMBER+0.7) ; 
	    if (enemy.body.y > (verticalLength)) this.enemyOutOfGrid = true;
	}, this);
	
	if (this.enemyOutOfGrid) {
	    this.quit_Game(false);
	}
    },
    
    //Activates the velocity enemies shield
    activate_Enemy_Shield: function() {
	this.enemyVelocityPool.forEachAlive(function(enemy) {
	    enemy.animations.play('shield');
	}, this);
	enemyShield = true;
    },

    // Create the bombPool
    bombPool_Setup: function() {
	this.bombPool = this.add.group();
	this.bombPool.enableBody = true;
	this.bombPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.bombPool.createMultiple(TOTAL_ENEMIES, 'bomb');
	this.bombPool.setAll('anchor.x', 0.4);
	this.bombPool.setAll('anchor.y', 0.4);
	this.bombPool.setAll('scale.x', 0.15);
	this.bombPool.setAll('scale.y', 0.15);
	this.bombPool.forEach(function(bomb) {
	    bomb.animations.add('explode', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18], 10, false);

	    // Enabling the input for bombs.
	    bomb.inputEnabled = true;
	    // Adding hand cursor for hovering over the bombs before game has started.
	    bomb.events.onInputOver.add(function(bomb) {
		if (!started) {
		    bomb.input.useHandCursor = true;
		} else {
		    bomb.input.useHandCursor = false;
		}
	    }, this);

	    // Making invisible the text display and killing bomb clicked before has not started.
	    bomb.events.onInputDown.add(function(bomb) {
		if (!started) {
		    var text = this.bombTextPool.getAt(this.bombPool.getIndex(bomb));
		    text.visible = false;
		    bomb.kill();
		    numberOfBombs += 1;
		    usingBlackHoleBomb = true;
		}
	    }, this);
	}, this);
	// Group for the text displays
	this.bombTextPool = this.add.group();
	
	// Time until explosion display.
	this.bombPool.forEach(function() {
	    var text = this.add.text(0, 0, '', { font: "20px Arial", fill: "#000000", align: "left" }, this.bombTextPool);
	    text.visible = false;
	    text.anchor.setTo(0.5, 0.5);
	}, this);
	
    },

    // Creates the missiles.
    missilePool_Setup: function() {
	this.missilePool = this.add.group();
	this.missilePool.enableBody = true;
	this.missilePool.physicsBodyType = Phaser.Physics.ARCADE;
	this.missilePool.createMultiple(TOTAL_ENEMIES, 'missile');
	this.missilePool.setAll('anchor.x', 0.5);
	this.missilePool.setAll('anchor.y', 0.5);
	this.missilePool.setAll('scale.x', 0.25);
	this.missilePool.setAll('scale.y', 0.25);
	// this.missilePool.setAll('angle', 180);
	this.missilePool.setAll('outOfBoundsKill', true);
	this.missilePool.setAll('checkWorldBounds', true);
	this.missilePool.forEach(function(missile) {
	    missile.body.setSize(10, 10, 0, -25);
	}, this);
    },

    // Creates the button for the cannon.
    cannonButton_Setup: function() {
	this.cannonButton = this.add.button(300, this.world.height - 60, 'cannonButton', this.select_Cannon, this, null, null, 1, 1);
	this.cannonButton.anchor.setTo(0.5, 0.5);
	this.cannonButton.scale.setTo(0.4, 0.4);
	buttons.add(this.cannonButton);
	this.minusButton_Setup(this.cannonButton, this.decrease_Fire);
	this.plusButton_Setup(this.cannonButton, this.increase_Fire);
    },

    cannonOnMouse_Setup: function() {
	// Image that appears on the mouse when the cannon button is pressed.
	this.cannonOnMouse = this.add.sprite(1000, 1000, 'cannon');
	this.cannonOnMouse.anchor.setTo(0.5, 0.5);
	this.cannonOnMouse.scale.setTo(0.06, 0.06);
	this.physics.enable(this.cannonOnMouse, Phaser.Physics.ARCADE);
    },
    
    // Creates the cannons.
    cannonPool_Setup: function() {
	this.cannonPool = this.add.group();
	this.cannonPool.enableBody = true;
	this.cannonPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.cannonPool.createMultiple(TOTAL_ENEMIES, 'cannon');
	this.cannonPool.setAll('anchor.x', 0.5);
	this.cannonPool.setAll('anchor.y', 0.5);
	this.cannonPool.setAll('scale.x', 0.06);
	this.cannonPool.setAll('scale.y', 0.06);
	
	// Group for the text displays
	this.cannonTextPool = this.add.group();
	// Time until explosion display.
	this.cannonPool.forEach(function() {
	    var text = this.add.text(0, 0, '', { font: "20px Arial", fill: "#000000", align: "left" }, this.cannonTextPool);
	    text.visible = false;
	    text.anchor.setTo(0.5, 0.5);
	}, this);
    },
       
    //Disables the velocity enemies shield
    deactivate_Enemy_Shield: function() {
	this.enemyVelocityPool.forEachAlive(function(enemy) {
	    enemy.animations.play('unshield');
	}, this);
	enemyShield = false;
    },

    // Decreases the velocity of the missiles.
    decrease_Fire: function() {
	if (!started && missileSpeed > 0) {
	    missileSpeed -= 1;
	}
    },
    
    // Creates several text displays.
    displays_Setup: function() {

	this.otherTextPool = this.add.group();

	// Game time display.
	this.levelText = this.add.text(931, 85, '' + this.level, { font: "30px Arial", fill: "#000000", align: "left" }, this.otherTextPool);
	
	// Display for velocity of the enemies.
	/*this.velocityText = this.add.text(25, 225, 'Velocidad: ' + ENEMY_VELOCITY, { font: "20px Arial", fill: "#ffffff", align: "left" }, this.otherTextPool);*/
	// Display for time of next unshield.
	this.velocityText = this.add.text(25, 225, 'Tiempo: ' + this.enemyShieldSpeed , { font: "20px Arial", fill: "#ffffff", align: "left" }, this.otherTextPool);

	// Display for the amount of bombs left.
	this.bombsRemainingText = this.add.text(235, this.world.height - 40, 'x' + numberOfBombs, { font: "20px Arial", fill : "#ffffff", align: "left"}, this.otherTextPool);

	// Display for the time of the bomb.
	this.blackHoleButtonText = this.add.text(this.blackHoleButton.x, this.blackHoleButton.y, '' + this.explosionTimeCounter, { font: "20px Arial", fill : "#000000", align: "left"}, this.otherTextPool);
	this.blackHoleButtonText.anchor.setTo(0.5, 0.5);

	// Display for the velocity of the missile.
	this.cannonButtonText = this.add.text(this.cannonButton.x, this.cannonButton.y - 2, '' + missileSpeed, { font: "20px Arial", fill : "#000000", align: "left"}, this.otherTextPool);
	this.cannonButtonText.anchor.setTo(0.5, 0.5);
    },
    
    // Creates the velocity enemies of the level.
    enemyVelocityPool_Setup: function() {
	this.enemyVelocityPool = this.add.group();
	this.enemyVelocityPool.enableBody = true;
	this.enemyVelocityPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.enemyVelocityPool.createMultiple(TOTAL_ENEMIES, 'velocityEnemy');
	this.enemyVelocityPool.setAll('anchor.x', 0.5);
	this.enemyVelocityPool.setAll('anchor.y', 0.5);
	this.enemyVelocityPool.setAll('outOfBoundsKill', true);
	this.enemyVelocityPool.setAll('checkWorldBounds', true);
	this.enemyVelocityPool.setAll('scale.x', 0.05);
	this.enemyVelocityPool.setAll('scale.y', 0.05);

	this.enemyVelocityPool.forEach(function(enemy) {
	    initialY =this.allign_Y(10-this.enemyGridDistance)+ (enemy.height/5);
	    this.enemyPlace = this.game.rnd.integerInRange(1, COLUMNS_NUMBER);
	    
	    aux1 = this.allign_X(this.enemyPlace) -(GRID_SPACE/2);
	    enemy.frame = 1;
	    enemy.reset(aux1, initialY);
	    enemy.body.setSize(100, 100, 0, 0);
	    enemy.animations.add('shield', [1, 0], 10, false);
	    enemy.animations.add('unshield', [0, 1], 10, false);
	}, this);
	
	// Group for the text displays
	this.enemyVelocityTextPool = this.add.group();
	// Time of each enemy.
	this.enemyVelocityPool.forEach(function(enemy) {
	    var text = this.add.text((this.allign_X(this.enemyPlace))+38, enemy.y, 'Escudo: ' + this.enemyShieldSpeed, { font: "17px Arial", fill: "#ffffff", align: "left" }, this.enemyVelocityTextPool);
	    text.visible = true;
	    text.anchor.setTo(0.5, 0.5);
	}, this);
    },

    // Makes the cannon shoot.
    fire: function(cannon) {
	console.log('fool');
	var missile = this.missilePool.getAt(this.cannonPool.getIndex(cannon));
	missile.reset(cannon.x, cannon.y - cannon.height/2);
	missile.body.velocity.y = (-1) * missileSpeed * GRID_SPACE;
	this.time.events.add(Phaser.Timer.SECOND * (this.enemyShieldSpeed * 0.8), this.deactivate_Enemy_Shield, this);
	this.time.events.add(Phaser.Timer.SECOND * (this.enemyShieldSpeed * 1.2), this.activate_Enemy_Shield, this);
	shot = true;
    },
	
    // Increases the velocity of the missiles.
    increase_Fire: function() {
	if (!started) {
	    missileSpeed += 1;
	}
    },

    // Creates the locked buttons
    lockedButtons_Setup: function() {
	lockedButtons = this.add.group();
	lockedButtons.createMultiple(4, 'lockedButton');
	lockedButtons.setAll('anchor.x', 0.5);
	lockedButtons.setAll('anchor.y', 0.5);
	lockedButtons.setAll('scale.x', 0.175);
	lockedButtons.setAll('scale.y', 0.175);

	beforeButton = this.cannonButton;
	
	lockedButtons.getAt(0).reset(beforeButton.x + 100, beforeButton.y);
	beforeButton = this.playButton;
	lockedButtons.forEachDead(function(button) {
	    button.reset(beforeButton.x + 100, beforeButton.y);
	    beforeButton = button;
	}, this);
    },

    // // Creates the minus button for the cannons.
    // minusButton_Setup: function(button, func) {
    // 	var minusButton = this.add.button(button.x + 40, button.y + 20, 'minusButton', func, 2, 1, 0);
    // 	minusButton.anchor.setTo(0.5, 0.5);
    // 	minusButton.scale.setTo(0.02, 0.02);
    // 	buttons.add(minusButton);
    // },

    // // Creates the plus button for the cannons.
    // plusButton_Setup: function(button, func) {
    // 	var plusButton = this.add.button(button.x + 40, button.y - 20, 'plusButton', func, 2, 1, 0);
    // 	plusButton.anchor.setTo(0.5, 0.5);
    // 	plusButton.scale.setTo(0.02, 0.02);
    // 	buttons.add(plusButton);
    // },

    // Creates a black hole bomb in the place clicked inside the grid.
    put_Weapon: function() {
	if (!started) {
	    if (usingBlackHole && (numberOfBombs > 0)) {
		// Puts an instance of a bomb
		x = (this.allign_X(this.gridX-1)) + (GRID_SPACE/3);
		y = (this.allign_Y(this.gridY-1)) + (GRID_SPACE/3);

		var bomb = this.bombPool.getFirstExists(false);
		bomb.body.setSize(10, 10, 4, 4);
		bomb.reset(x, y);
		
		var text = this.bombTextPool.getAt(this.bombPool.getIndex(bomb));
		// text.visible = true;
		text.x = x + 6;
		text.y = y + 6;
		numberOfBombs -= 1;
		
		placedBomb = true;
		//}
		this.blackHoleButton.frame = 0;
		this.bombOnMouse.reset(1000, 1000);
    		usingBlackHole = false;
		//this.line.reset(1000, 1000);
		
		// Update displays.
		this.bombsRemainingText.text = 'x' + numberOfBombs;

	    } else if (usingCannon && numberOfCannons > 0) {
		x = this.allign_X(this.gridX - 0.5);
		y = 460;
		var cannon = this.cannonPool.getFirstExists(false);
		cannon.body.setSize(10, 10);
		cannon.reset(x, y);
		numberOfCannons -= 1;
		
		this.cannonButton.frame = 0;
		usingCannon = false;
	    }
 	}
    },

    // Destroys everything created and moves to the winner's menu or the game 
    // over menu.
    quit_Game: function(won) {	
	this.playButton.destroy();
	this.blackHoleButton.destroy();
	buttons.destroy(true);
	lockedButtons.destroy(true);
	this.bombTextPool.destroy(true);
	this.otherTextPool.destroy(true);
	this.bombPool.destroy(true);
	background.kill();
	if (won) {
	    time = this.timeOfGame;
	    this.level = 3;
	    nextState = 'WinnerMenu';
	} else {
	    //	Then let's go back to the game over menu.
	    time = 0;
	    // level = 2;
	    nextState = 'GameOverMenu';
	}
	this.state.start(nextState, true, false, 
			 time, this.level,this.score,
			 this.allign_X,
			 this.allign_Y,
			 this.blackHoleButton_Setup,
			 this.bombOnMouse_Setup,
			 this.countdown,
			 this.find_Grid_Place,
			 //this.gridLine_Setup,
			 this.make_Grid,
			 this.minusButton_Setup,
			 this.plusButton_Setup,
			 this.playButton_Setup,
			 this.select_Bomb,
			 this.start,
			 this.scoreText_Setup,
			 this.try_To_Destroy);
    },
     
    // Lets the player use the cannons.
    select_Cannon: function() {
	if (!started){
	    usingCannon = (numberOfCannons > 0);
	    if (!usingCannon) {
		// this.bombPool.removeAll();
		this.cannonPool.forEachAlive(function(cannon) {
		    cannon.kill();
		}, this);
		/*this.bombTextPool.forEach(function(display) {
		  display.visible = false;
		  }, this);*/
		numberOfCannons = TOTAL_ENEMIES;
	    }
	}
    },

    // If the enemy's shild is deactivated the enemy is killed.
    try_To_Destroy_Velocity: function(enemy, missile) {
	if (!enemyShield) {
	    enemy.kill();
	// } else {
	//     var vel = missile.body.velocity.y;
	//     missile.body.velocity.y = -vel;
	//     missile.angle = 180;
	}// else{
	  //  
	//}
	missile.kill();
    },
    
    you_Got_Shot: function() {
	this.quit_Game(false);
    },
        
    get_Enemy_Distance_Speed: function(){
	
	aux = this.game.rnd.integerInRange(1, 27);
	if (aux > 13){
	    if (aux > 20){
		if(aux>23){
		    if(aux == 24) {
			this.enemyGridDistance = 10;
			this.enemyShieldSpeed = 1;
		    }
		    if(aux == 25) {
			this.enemyGridDistance = 10;
			this.enemyShieldSpeed = 2;
		    }
		    if(aux == 26) {
			this.enemyGridDistance = 10;
			this.enemyShieldSpeed = 5;
		    }
		    if(aux == 27) {
			this.enemyGridDistance = 10;
			this.enemyShieldSpeed = 10;
		    }
		}else{
		    if(aux == 21) {
			this.enemyGridDistance = 9;
			this.enemyShieldSpeed = 1;
		    }
		    if(aux == 22) {
			this.enemyGridDistance = 9;
			this.enemyShieldSpeed = 3;
		    }
		    if(aux == 23) {
			this.enemyGridDistance = 9;
			this.enemyShieldSpeed = 9;
		    }
		}
	    }else{
		if(aux>17){
		    if(aux == 18) {
			this.enemyGridDistance = 8;
			this.enemyShieldSpeed = 2;
		    }
		    if(aux == 19) {
			this.enemyGridDistance = 8;
			this.enemyShieldSpeed = 4;
		    }
		    if(aux == 20) {
			this.enemyGridDistance = 8;
			this.enemyShieldSpeed = 8;
		    } 
		}else{
		    if(aux == 14) {
			this.enemyGridDistance = 6;
			this.enemyShieldSpeed = 6;
		    }
		    if(aux == 15) {
			this.enemyGridDistance = 7;
			this.enemyShieldSpeed = 1;
		    }
		    if(aux == 16) {
			this.enemyGridDistance = 7;
			this.enemyShieldSpeed = 7;
		    }
		    if(aux == 17) {
			this.enemyGridDistance = 8;
			this.enemyShieldSpeed = 1;
		    }
		}
	    }
	}else{
	    
	    if (aux > 7){
		if(aux>10){
		    if(aux == 11) {
			this.enemyGridDistance = 6;
			this.enemyShieldSpeed = 1;
		    }
		    if(aux == 12) {
			this.enemyGridDistance = 6;
			this.enemyShieldSpeed = 2;
		    }
		    if(aux == 13) {
			this.enemyGridDistance = 6;
			this.enemyShieldSpeed = 3;
		    } 
		}else{
		    if(aux == 8) {
			this.enemyGridDistance = 4;
			this.enemyShieldSpeed = 4;
		    }
		    if(aux == 9) {
			this.enemyGridDistance = 5;
			this.enemyShieldSpeed = 1;
		    }
		    if(aux == 10) {
			this.enemyGridDistance = 5;
			this.enemyShieldSpeed = 5;
		    }
		}
	    }else{
		if(aux>4){
		    if(aux == 5) {
			this.enemyGridDistance = 3;
			this.enemyShieldSpeed = 3;
		    }
		    if(aux == 6) {
			this.enemyGridDistance = 4;
			this.enemyShieldSpeed = 1;
		    }
		    if(aux == 7) {
			this.enemyGridDistance = 4;
			this.enemyShieldSpeed = 2;
		    } 
		}else{
		    if(aux == 1) {
			this.enemyGridDistance = 2;
			//Distance = 1 is no longer used
			//Because is too close to the cannon
			/*this.enemyGridDistance = 1;*/
			this.enemyShieldSpeed = 1;
		    }
		    if(aux == 2) {
			this.enemyGridDistance = 2;
			this.enemyShieldSpeed = 1;
		    }
		    if(aux == 3) {
			this.enemyGridDistance = 2;
			this.enemyShieldSpeed = 2;
		    }
		    if(aux == 4) {
			this.enemyGridDistance = 3;
			this.enemyShieldSpeed = 1;
		    }
		}    
	    }
	    
	}
	console.log(aux);
	console.log(this.enemyGridDistance);
	console.log(this.enemyShieldSpeed);
    },

    // NO TOCAR SIN MI PERMISO :)
    // Solo la comenté una vez u.u
    // This function is for debug (and other stuff xD, but we're using it for
    // debugging sprite's sizes).    
    // render: function() {
    // 	if (this.enemyVelocityPool.countLiving() > 0) {
    // 	    this.enemyVelocityPool.forEachAlive(function(enemy) {
    // 		this.game.debug.body(enemy, false, 'rgb(255, 0, 0)');
    // 	    }, this);
    // 	}
    // 	if (this.bombPool.countLiving() > 0) {
    // 	    this.bombPool.forEachAlive(function(bomb) {
    // 		this.game.debug.body(bomb, false, 'rgb(255, 0, 0)');
    // 	    }, this);
    // 	}
    // 	if (this.cannonPool.countLiving() > 0) {
    // 	    this.cannonPool.forEachAlive(function(cannon) {
    // 		this.game.debug.body(cannon, false, 'rgb(255, 0, 0)');
    // 	    }, this);
    // 	}
    // 	if (this.missilePool.countLiving() > 0) {
    // 	    this.missilePool.forEachAlive(function(missile) {
    // 		this.game.debug.body(missile, false, 'rgb(255, 0, 0)');
    // 	    }, this);
    // 	}

    // }
    
};
/*Functions commons to Nivel1 and Nivel2 (every level by now)
  allign_X
  allign_Y
  blackHoleButton_Setup
  bombOnMouse_Setup
  countdown
  find_Grid_Place
  gridLine_Setup  
  makegrid
  playButton_Setup
  select_Bomb
  start
  try_To_Destroy
*/
