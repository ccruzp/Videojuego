BasicGame.Nivel3 = function(game) {

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

   // this.line;   //The line that helps you to use the numbers of the grid
    
    this.enemyOutOfGrid; //Booleans, set if an enemy is out of the grid

    //Grid adjustment in boxes
    this.gridX = 0;
    this.gridY = 0;
    //----------------------------------------------------------------------
    
    TOTAL_TIME = 10; // Time for explosion
    BOMB_TOTAL_TIME = 3;
    ENEMY_VELOCITY = 3; // Velocity of the enemy
    ENEMY_SHIELD_SPEED = 2.5;
    DISTANCE_ENEMIES = 0; // Amount of distance enemies
    VELOCITY_ENEMIES = 0; // Amount of velocity enemies
    TIME_ENEMIES = 1;
    TOTAL_ENEMIES = DISTANCE_ENEMIES + VELOCITY_ENEMIES + TIME_ENEMIES; // Total amount of enemies on the level

    this.bombPool; // Group of bombs
    this.cannonPool; // Group of cannons
    this.bulletPool; // Group of bullets
    this.enemyVelocityPool; // Group of velocity enemies.
    this.enemyTimePool; // Group of time enemies.
    this.enemyBulletPool; // Group for the bullets of the time enemy.
   this.enemy; // Instance of an enemy
    this.bombOnMouse; // The sprite that appears on the mouse
    
    this.cannonOnMouse; // The sprite that appears on the mouse
    this.shieldOnMouse; // The sprite that appears on the mouse
    // Counters
    this.timeCounter; // Time counter.
    this.explosionTimeCounter; // Tells the time remaining before de bomb explodes.
    // numberOfBombs; // Amount of bombs the user has
    // numberOfCannons; // Amount of cannons the user has

    // Texts
    this.bombsRemainingText;
    this.bombTextPool;
    this.cannonPool;
    this.shieldPool;
    this.otherTextPool;
    this.velocityText; // Text display of velocity
    this.levelText; // Text display of time
    this.explosionTimeText; // Text display for the explosionTimeCounter
    this.livesText; // Text display of lives
    this.blackHoleButtonText; // Text display for the time in which the bomb will explode
    this.cannonButtonText; // Text display for the speed of the bullet.
    this.shieldButtonText; // Text display for the activaation time of the shield.

    // Buttons
    /*this.buttons; // Group for locked buttons*/
    this.blackHoleButton; // Black hole bomb button.
    this.cannonButton; // Cannon Button.
    this.playButton; // Play button.
    this.shieldButton; // The shield button.

    // Actual level
    this.level;

    //Score system variables
    this.score;
    this.timeOfGame;

    //Aligned enemy in the grid.
    this.enemyPlace = 6;
};

BasicGame.Nivel3.prototype = {

    init: function(lastTime,level,score,
		   allign_X,
		   allign_Y,
		   blackHoleButton_Setup,
		   bombOnMouse_Setup,
		  // bombPool_Setup,
		   countdown,
		   find_Grid_Place,
		   //gridLine_Setup,
		   make_Grid,
		   minusButton_Setup,
		   plusButton_Setup,
		  // lockedButtons_Setup,
		   playButton_Setup,
		   select_Bomb,
		   start,
		   scoreText_Setup,
		   try_To_Destroy) {
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
	TOTAL_TIME = 10; // Time for explosion
	BOMB_TOTAL_TIME = 3;
	ENEMY_VELOCITY = 3; // Velocity of the enemy
	ENEMY_SHIELD_SPEED = 2.5;
	DISTANCE_ENEMIES = 0; // Amount of distance enemies
	VELOCITY_ENEMIES = 0; // Amount of velocity enemies
	TIME_ENEMIES = 1;
	TOTAL_ENEMIES = DISTANCE_ENEMIES + VELOCITY_ENEMIES + TIME_ENEMIES; // Total amount of enemies on the level

	TIMES_TO_PASS = 1;	
	this.timesPassed = TIMES_TO_PASS;
	this.beginGame = true;

	started = false; // Boolean that says if the game has begun.
	lost = false; // Boolean that says if the game has been lost.
	shot = false; // Boolean that says if the cannons have shot.
	enemyShield = true; // Boolean that says if the shields are activated.
	enemyShot = false; // Boolean that says if the enemy has shoot.
	shotRebound = false // Boolean that says if the bullet rebounded on a shield.

	missileSpeed = 0; // The speed of the missile shot by the player.
	shieldTime = 0; // The time in which the shield will activate.
	enemyBulletSpeed = 2; // Speed of the bullets shot by the timeEnemy.

	// Booleans that says if the player is using a weapon.
	// A player should not be able of using more than a weapon at a time
	//-------------------------------------------------------------
	usingBlackHole = false; // Says if the player selected the bomb.
	usingCannon = false; // Says if the player selected the cannon.
	usingShield = false; // Says if the player selected the shield.
	//-------------------------------------------------------------

	placedBomb = false; // Says if a bomb has been placed on the grid.
	numberOfBombs = TOTAL_ENEMIES; // Number of bombs available in this level.
	numberOfCannons = TOTAL_ENEMIES; // Number of cannons available in this level.
	numberOfShields = TOTAL_ENEMIES; // Number of shields available in this level.
	background = this.add.sprite(0, 0, 'background'); // Creating background.
	this.physics.startSystem(Phaser.Physics.ARCADE); // Game physics system.
	
	// Creating the grid for the game.
	option = 3;
	this.make_Grid(option);
	
	this.enemyOutOfGrid = false; // Start the game inside the grid.

	this.bombOnMouse_Setup(); // Image that appears on the mouse when the black hole bomb button is pressed.

	this.cannonOnMouse_Setup(); // Image that appears on the mouse when the cannon button is pressed.
	this.shieldOnMouse_Setup(); // Image that appears on the mouse when the shield button is pressed.
	//this.gridLine_Setup();
	/*
	this.line = this.add.sprite(1000, 1000,'ground');
	//this.line.scale.setTo(2.25,0.4); Use this for grid_space = 50
	this.line.scale.setTo(1.52, 0.4);
	this.line.anchor.setTo(0, 0.5);
	*/
	// this.enemyVelocityPool_Setup(); // Setup the enemies.
	this.enemyTimePool_Setup(); // Setup the enemies.
	this.bombPool_Setup(); // Create the bombs.
	this.missilePool_Setup(); // Creating the bullets for the cannons.
	this.enemyBulletPool_Setup(); // Creating the enemies' bullets.
	this.cannonPool_Setup(); // Create the cannonPool.
	this.shieldPool_Setup(); // Create the shieldPool.
	
	// Counters.
	this.timeCounter = TOTAL_TIME; // Game's time counter.
	this.explosionTimeCounter = BOMB_TOTAL_TIME; // Bomb's time counter.

	buttons = this.add.group(); // Group for buttons.

	this.blackHoleButton_Setup(); // Creates the black hole button.
	this.cannonButton_Setup(); // Creates the cannon button.
	this.shieldButton_Setup(); // Creates the shield button.
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
	// this.physics.arcade.overlap(this.enemyVelocityPool, this.bulletPool, this.try_To_Destroy_Velocity, null, this);
	this.physics.arcade.overlap(this.cannonPool, this.missilePool, this.you_Got_Shot, null, this);
	this.physics.arcade.overlap(this.shieldPool, this.enemyBulletPool, this.shield_Hit, null, this);
	this.physics.arcade.overlap(this.enemyTimePool, this.enemyBulletPool, this.enemy_Hit, null, this);

	//Hide the weapons cursors
	this.bombOnMouse.reset(1000, 1000);
	this.cannonOnMouse.reset(1000, 1000);
	this.shieldOnMouse.reset(1000, 1000);
	
	if (usingBlackHole) {
	    this.find_Grid_Place();
	    x = this.allign_X(this.gridX - 0.5);
	    y = this.allign_Y(this.gridY - 0.5);
	    this.bombOnMouse.reset(x, y);

	    // Display of the time left before the bomb explodes.
	    var text = this.bombTextPool.getAt(TOTAL_ENEMIES - 1);
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
	    
	} else if(usingShield){
	    this.find_Grid_Place();
	    //This should be added later
	    x = this.allign_X(this.gridX - 0.5);
	    y = 460;
	    this.shieldOnMouse.reset(x, y);
	    
	}
	
	// Updating existing bomb's text display.
	this.bombPool.forEachAlive(function(bomb) {
	    var text = this.bombTextPool.getAt(this.bombPool.getIndex(bomb));
	    text.text = this.explosionTimeCounter;
	    text.visible = (this.explosionTimeCounter > 0);
	}, this);
	
	// Updating buttons displays
	this.cannonButtonText.text = '' + missileSpeed;
	this.shieldButtonText.text = '' + shieldTime;

	// Updating shield sprite.
	this.shieldPool.forEachAlive(function(shield) {
	    if (shield.shieldActive) {
		shield.frame = 1;
	    } else {
		shield.frame = 0;
	    }
	}, this);
	// If the game started move enemies.
	console.log("STARTED:" + started);
	if (started) {
	    this.cannonPool.forEachAlive(function(cannon) {
		if(this.missilePool.countLiving() < VELOCITY_ENEMIES && !shot) {
		    this.fire(cannon);
		}
	    }, this);
	    if (!enemyShot) {
		this.enemyTimePool.forEachAlive(function(enemy) {
	    	    this.enemy_Fire(enemy);
		}, this);
		this.shieldPool.forEachAlive(function(shield) {
		    this.time.events.add(Phaser.Timer.SECOND * (shield.time * 1), function(shield) {
			shield.shieldActive = true;
		    }, this, shield);
		    this.time.events.add(Phaser.Timer.SECOND * (shield.time + 0.2), function(shield) {
			shield.shieldActive = false;
		    }, this, shield);
		}, this);
	    }
	    if (lost) {
		this.quit_Game(false);
	    }
	}
	// this.enemyBulletPool.forEachAlive(function(bullet) {
	//     bullet.body.velocity.y = enemyBulletSpeed * GRID_SPACE;
	// }, this);
	
	// If explosionTimeCounter is 0 start explosion animation.
	if (this.explosionTimeCounter == 0) {
	    this.bombPool.forEachAlive(function(bomb) {
		bomb.animations.play('explode');
		bomb.events.onAnimationComplete.add(function() {
		    bomb.kill();
		}, this);
	    }, this);
	}

	/*((!this.bombPool.getFirstAlive()) && (this.timeCounter < TOTAL_TIME) && (numberOfBombs < TOTAL_ENEMIES))*/
	// if (!this.enemyVelocityPool.getFirstAlive()) {
	//     this.quit_Game(true);
	// }
	if (!this.enemyTimePool.getFirstAlive()) {
	    this.quit_Game(true);
	}
	// If an enemy reaches the botom of the grid you lose the game.
	// this.enemyVelocityPool.forEachAlive(function(enemy) {
	//     verticalLength = this.allign_Y(ROWS_NUMBER+0.7) ; 
	//     if (enemy.body.y > (verticalLength)) this.enemyOutOfGrid = true;
	// }, this);
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
    //Is this used on level 1 (?) requires removing the enemyVelocityPool 
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

    // Creates the bullets.
    missilePool_Setup: function() {
	this.missilePool = this.add.group();
	this.missilePool.enableBody = true;
	this.missilePool.physicsBodyType = Phaser.Physics.ARCADE;
	this.missilePool.createMultiple(TOTAL_ENEMIES, 'bullet');
	this.missilePool.setAll('anchor.x', 0.5);
	this.missilePool.setAll('anchor.y', 0.5);
	this.missilePool.setAll('outOfBoundsKill', true);
	this.missilePool.setAll('checkWorldBounds', true);
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
    },
       
    //Disables the velocity enemies shield
    deactivate_Enemy_Shield: function() {
	this.enemyVelocityPool.forEachAlive(function(enemy) {
	    enemy.animations.play('unshield');
	}, this);
	enemyShield = false;
    },

    // Decreases the velocity of the bullets.
    decrease_Fire: function() {
	if (!started && missileSpeed > 0) {
	    missileSpeed -= 1;
	}
    },

    // Decreases the velocity of the bullets.
    decrease_Time_Shield: function() {
	if (!started && shieldTime > 0) {
	    shieldTime -= 1;
	}
    },
    
    // Creates several text displays.
    displays_Setup: function() {

	this.otherTextPool = this.add.group();

	// Game time display.
	this.levelText = this.add.text(931, 85, '' + this.level, { font: "30px Arial", fill: "#000000", align: "left" }, this.otherTextPool);
	
	// Display for velocity of the enemies.
	this.velocityText = this.add.text(25, 225, 'Velocidad: ' + ENEMY_VELOCITY, { font: "20px Arial", fill: "#ffffff", align: "left" }, this.otherTextPool);

	// Display for the amount of bombs left.
	this.bombsRemainingText = this.add.text(235, this.world.height - 40, 'x' + numberOfBombs, { font: "20px Arial", fill : "#ffffff", align: "left"}, this.otherTextPool);

	// Display for the time of the bomb.
	this.blackHoleButtonText = this.add.text(this.blackHoleButton.x, this.blackHoleButton.y, '' + this.explosionTimeCounter, { font: "20px Arial", fill : "#000000", align: "left"}, this.otherTextPool);
	this.blackHoleButtonText.anchor.setTo(0.5, 0.5);

	// Display for the velocity of the bullet.
	this.cannonButtonText = this.add.text(this.cannonButton.x, this.cannonButton.y - 2, '' + missileSpeed, { font: "20px Arial", fill : "#000000", align: "left"}, this.otherTextPool);
	this.cannonButtonText.anchor.setTo(0.5, 0.5);

	// Display for the activation time of the shield.
	this.shieldButtonText = this.add.text(this.shieldButton.x, this.shieldButton.y - 2, '' + shieldTime, { font: "20px Arial", fill : "#000000", align: "left"}, this.otherTextPool);
	this.shieldButtonText.anchor.setTo(0.5, 0.5);
    },
    
    // The enemy's shot.
    enemy_Fire: function(enemy) {
	var bullet = this.enemyBulletPool.getAt(this.enemyTimePool.getIndex(enemy));
	bullet.reset(enemy.x, enemy.y + enemy.height/2);
	console.log(enemyBulletSpeed);
	console.log("B"+this.enemyBulletPool.getIndex(bullet));
	bullet.body.velocity.y = enemyBulletSpeed * GRID_SPACE;
	enemyShot = true;
    },

    // If the enemy is shot.
    enemy_Hit: function(enemy, bullet) {
	if (shotRebound) {
	    enemy.kill();
	    bullet.kill();
	}
    },

    // Creates the bullets for the enemies shots
    enemyBulletPool_Setup: function() {
	this.enemyBulletPool = this.add.group();
	this.enemyBulletPool.enableBody = true;
	this.enemyBulletPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.enemyBulletPool.createMultiple(TOTAL_ENEMIES, 'bullet');
	this.enemyBulletPool.setAll('anchor.x', 0.5);
	this.enemyBulletPool.setAll('anchor.y', 0.5);
	this.enemyBulletPool.setAll('angle', 180);
	// this.enemyBulletPool.setAll('outOfBoundsKill', true);
	// this.enemyBulletPool.setAll('checkWorldBounds', true);
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
	    initialY = 50 - (enemy.height/2);
	    this.enemyPlace = this.game.rnd.integerInRange(1, COLUMNS_NUMBER);
	    aux1 = this.allign_X(this.enemyPlace) -(GRID_SPACE/2);
	    enemy.frame = 1;
	    enemy.reset(aux1, initialY);
	    enemy.body.setSize(100, 100, 0, enemy.height/2);
	    enemy.animations.add('shield', [1, 0], 10, false);
	    enemy.animations.add('unshield', [0, 1], 10, false);
	}, this);
    },

    // Creates the velocity enemies of the level.
    enemyTimePool_Setup: function() {
	this.enemyTimePool = this.add.group();
	this.enemyTimePool.enableBody = true;
	this.enemyTimePool.physicsBodyType = Phaser.Physics.ARCADE;
	this.enemyTimePool.createMultiple(TOTAL_ENEMIES, 'timeEnemy');
	this.enemyTimePool.setAll('anchor.x', 0.5);
	this.enemyTimePool.setAll('anchor.y', 0.5);
	this.enemyTimePool.setAll('outOfBoundsKill', true);
	this.enemyTimePool.setAll('checkWorldBounds', true);
	this.enemyTimePool.setAll('scale.x', 0.075);
	this.enemyTimePool.setAll('scale.y', 0.075);

	this.enemyTimePool.forEach(function(enemy) {
	    initialY = 50 - (enemy.height/2);
	    aux1 = this.allign_X(this.enemyPlace) -(GRID_SPACE/2);
	    enemy.frame = 1;
	    enemy.reset(aux1, initialY);
	    enemy.body.setSize(100, 100, 0, enemy.height/2);
	    // enemy.animations.add('shield', [1, 0], 10, false);
	    // enemy.animations.add('unshield', [0, 1], 10, false);
	}, this);
    },

    // Makes the cannon shoot.
    fire: function(cannon) {
	var missile = this.missilePool.getAt(this.cannonPool.getIndex(cannon));
	missile.reset(cannon.x, cannon.y - cannon.height/2);
	missile.body.velocity.y = (-1) * missileSpeed * GRID_SPACE;
	this.time.events.add(Phaser.Timer.SECOND * (ENEMY_SHIELD_SPEED * 0.8), this.deactivate_Enemy_Shield, this);
	this.time.events.add(Phaser.Timer.SECOND * (ENEMY_SHIELD_SPEED + 0.2), this.activate_Enemy_Shield, this);
	shot = true;
    },

    // Increases the velocity of the bullets.
    increase_Fire: function() {
	if (!started) {
	    missileSpeed += 1;
	}
    },

    // Increases the velocity of the bullets.
    increase_Time_Shield: function() {
	if (!started) {
	    shieldTime += 1;
	}
    },

    // Creates the locked buttons
    lockedButtons_Setup: function() {
	lockedButtons = this.add.group();
	lockedButtons.createMultiple(3, 'lockedButton');
	lockedButtons.setAll('anchor.x', 0.5);
	lockedButtons.setAll('anchor.y', 0.5);
	lockedButtons.setAll('scale.x', 0.175);
	lockedButtons.setAll('scale.y', 0.175);

	// beforeButton = this.cannonButton;
	
	// lockedButtons.getAt(0).reset(beforeButton.x + 100, beforeButton.y);
	beforeButton = this.playButton;
	lockedButtons.forEachDead(function(button) {
	    button.reset(beforeButton.x + 100, beforeButton.y);
	    beforeButton = button;
	}, this);
    },

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

	    } else if (usingShield && numberOfShields > 0) {
		x = this.allign_X(this.gridX - 0.5);
		y = 460;
		var shield = this.shieldPool.getFirstExists(false);
		shield.body.setSize(10, 10);
		shield.reset(x, y);
		shield.time = shieldTime;
		console.log("Shieldtime: " + shield.time);
		numberOfShields -= 1;
		
		this.shieldButton.frame = 0;		
		usingShield = false;
	    }
 	}
    },

    // Destroys everything created and moves to the winner's menu or the game 
    // over menu.
    quit_Game: function(won) {	
	this.bombOnMouse.kill();
	this.bombPool.destroy(true);
	this.missilePool.destroy(true);
	this.enemyBulletPool.destroy(true);
	this.cannonPool.destroy(true);
	buttons.destroy(true);
	lockedButtons.destroy(true);
	this.otherTextPool.destroy(true);
	// this.playButton.destroy();
	// this.blackHoleButton.destroy();
	// buttons.destroy(true);
	// lockedButtons.destroy(true);
	// this.bombTextPool.destroy(true);
	// this.otherTextPool.destroy(true);
	// this.bombPool.destroy(true);
	// background.kill();
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

    // Lets the player use the shield
    select_Shield: function() {
	if (!started){
	    usingShield = (numberOfShields > 0);
	    if (!usingShield) {
		this.shieldPool.forEachAlive(function(shield) {
		    shield.kill();
		}, this);
		numberOfShields = TOTAL_ENEMIES;
	    }
	}
    },

    // Creates the shield button.
    shieldButton_Setup: function() {
	this.shieldButton = this.add.button(405, this.world.height - 60, 'shieldButton', this.select_Shield, this, null, null, 1, 1);
	this.shieldButton.anchor.setTo(0.5, 0.5);
	this.shieldButton.scale.setTo(0.4, 0.4);
	buttons.add(this.shieldButton);
	this.minusButton_Setup(this.shieldButton, this.decrease_Time_Shield);
	this.plusButton_Setup(this.shieldButton, this.increase_Time_Shield);
     },

    shieldOnMouse_Setup: function() {
	// Image that appears on the mouse when the cannon button is pressed.
	this.shieldOnMouse = this.add.sprite(1000, 1000, 'shield');
	this.shieldOnMouse.anchor.setTo(0.5, 0.5);
	this.shieldOnMouse.scale.setTo(0.12, 0.12);
	this.physics.enable(this.shieldOnMouse, Phaser.Physics.ARCADE);
    },

    // Creates the cannons.
    shieldPool_Setup: function() {
	this.shieldPool = this.add.group();
	this.shieldPool.enableBody = true;
	this.shieldPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.shieldPool.createMultiple(TOTAL_ENEMIES, 'shield');
	this.shieldPool.setAll('anchor.x', 0.5);
	this.shieldPool.setAll('anchor.y', 0.5);
	this.shieldPool.setAll('scale.x', 0.12);
	this.shieldPool.setAll('scale.y', 0.12);
	this.shieldPool.setAll('shieldActive', false);
	// this.shieldPool.forEach(function(shield) {
	//     // Adding the bomb animation to each bomb.
	//     shield.animations.add('shield', [0, 1, 0], 10, false);
	// }, this);
    },
     
    shield_Hit: function(shieldGen, bullet) {
	if (shieldGen.shieldActive) {
	    bullet.angle = 0;
	    bullet.body.velocity.y = -(bullet.body.velocity.y);
	    shotRebound = true;
	} else {
	    this.lost = true;
	    shieldGen.kill();
	    bullet.kill();
	}
    },

    // If the enemy's shild is deactivated the enemy is killed.
    try_To_Destroy_Velocity: function(enemy, bullet) {
	if (!enemyShield) {
	    enemy.kill();
	} else {
	    var vel = bullet.body.velocity.y;
	    bullet.body.velocity.y = -vel;
	    bullet.angle = 180;
	}
    },
    
    you_Got_Shot: function() {
	this.quit_Game(false);
    },
        
    // NO TOCAR SIN MI PERMISO :)
    // Solo la comenté una vez u.u
    // This function is for debug (and other stuff xD, but we're using it for
    // debugging sprite's sizes).    
//     render: function() {
//     	if (this.enemyTimePool.countLiving() > 0) {
//     	    this.enemyTimePool.forEachAlive(function(enemy) {
//     		this.game.debug.body(enemy, false, 'rgb(255, 0, 0)');
//     	    }, this);
//     	}
//     	if (this.bombPool.countLiving() > 0) {
//     	    this.bombPool.forEachAlive(function(bomb) {
//     		this.game.debug.body(bomb, false, 'rgb(255, 0, 0)');
//     	    }, this);
//     	}
//     	if (this.cannonPool.countLiving() > 0) {
//     	    this.cannonPool.forEachAlive(function(cannon) {
//     		this.game.debug.body(cannon, false, 'rgb(255, 0, 0)');
//     	    }, this);
//     	}
//     	if (this.missilePool.countLiving() > 0) {
//     	    this.missilePool.forEachAlive(function(missile) {
//     		this.game.debug.body(missile, false, 'rgb(255, 0, 0)');
//     	    }, this);
//     	}
//     	if (this.shieldPool.countLiving() > 0) {
//     	    this.shieldPool.forEachAlive(function(shield) {
//     		this.game.debug.body(shield, false, 'rgb(255, 0, 0)');
//     	    }, this);
//     	}

//     }
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
