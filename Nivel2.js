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

    this.line;         //The line that helps you to use the numbers of the grid
    
    this.enemyOutOfGrid; //Booleans, set if an enemy is out of the grid

    //Grid adjustment in boxes
    this.gridX = 0;
    this.gridY = 0;
    //---------------------------------------------------------------------------
    
    TOTAL_TIME = 10; // Time for explosion
    BOMB_TOTAL_TIME = 3;
    ENEMY_VELOCITY = 3; // Velocity of the enemy
    TOTAL_ENEMIES = 1;    
    this.bombPool; // Group of bombPool
    this.bomb; // Instance of the group of bombPool
    this.cannonPool;
    this.enemyPool; // Group of enemies
    this.enemy; // Instance of an enemy
    this.bombOnMouse; // The sprite that appears on the mouse
    
    this.cannonOnMouse; // The sprite that appears on the mouse
    
    // Counters
    this.timeCounter; // Time counter.
    this.explosionTimeCounter; // Tells the time remaining before de bomb explodes.
    // numberOfBombs; // Amount of bombs the user has
    // numberOfCannons; // Amount of cannons the user has

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

    //Aligned enemy in the grid.
    this.enemyPlace = 6;
};

BasicGame.Nivel2.prototype = {
    
    create: function() {
	
	// Initializing boolean variables.
	started = false; // Boolean that says if the game has begun.

	// Booleans that says if the player is using a weapon.
	
	//-A player should not be able of using more than a weapon at a time
	//-------------------------------------------------------------
	usingBlackHole = false; // Says if the player selected the bomb.
	usingCannon = false; // Says if the player selected the cannon.
	//-------------------------------------------------------------

	placedBomb = false; // Says if a bomb has been placed on the grid.
	lastTime = this.time.now + 2500 // Keeps time for the explosion counter.
	numberOfBombs = TOTAL_ENEMIES; // Number of bombs available in this level.
	numberOfCannons = TOTAL_ENEMIES; // Number of cannons available in this level.

	// Creating background.
	background = this.add.sprite(0, 0, 'background');
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
	
	/*
	 * Image that appears on the mouse when cannon button is pressed
	 */
	this.cannonOnMouse = this.add.sprite(1000, 1000, 'cannon');
	this.cannonOnMouse.anchor.setTo(0.5, 0.5);
	this.cannonOnMouse.scale.setTo(0.06, 0.06);
	this.physics.enable(this.cannonOnMouse, Phaser.Physics.ARCADE);
	
	
	this.line = this.add.sprite(1000, 1000,'ground');
	//this.line.scale.setTo(2.25,0.4); Use this for grid_space = 50
	this.line.scale.setTo(1.52, 0.4);
	this.line.anchor.setTo(0, 0.5);

	// Group for the enemies
	this.enemyPool = this.add.group();
	this.enemyPool.enableBody = true;
	this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.enemyPool.createMultiple(TOTAL_ENEMIES, 'distanceEnemy');
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
	    
	    aux1 = this.allign_X(this.enemyPlace) -(GRID_SPACE/2);
	    
	    enemy.frame = 0;
	    enemy.reset(aux1, initialY);
	    enemy.body.setSize(100, 100, 0, enemy.height/2);
	    enemy.inputEnabled = true;
	    enemy.events.onInputOver.add(function(enemy) {
		enemy.frame = ENEMY_VELOCITY;
	    }, this);
	    enemy.events.onInputOut.add(function(enemy) {
		enemy.frame = 0;
	    }, this);
	}, this);

	// Create the bombPool
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
	this.enemyPool.forEach(function() {
	    var text = this.add.text(0, 0, '', { font: "20px Arial", fill: "#ffffff", align: "left" }, this.bombTextPool);
	    text.visible = false;
	    text.anchor.setTo(0.5, 0.5);
	}, this);

	// Create the cannonPool
	this.cannonPool = this.add.group();
	this.cannonPool.enableBody = true;
	this.cannonPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.cannonPool.createMultiple(TOTAL_ENEMIES, 'cannon');
	this.cannonPool.setAll('anchor.x', 0.5);
	this.cannonPool.setAll('anchor.y', 0.5);
	this.cannonPool.setAll('scale.x', 0.06);
	this.cannonPool.setAll('scale.y', 0.06);

	// this.nextShotAt = 0;

	// Creating the text displays.
	this.otherTextPool = this.add.group();	
	// Game time display.
	this.levelText = this.add.text(931, 85, '1', { font: "30px Arial", fill: "#000000", align: "left" }, this.otherTextPool);
		
	// Display for velocity of the enemies.
	this.velocityText = this.add.text(25, 225, 'Velocidad: ' + ENEMY_VELOCITY, { font: "20px Arial", fill: "#ffffff", align: "left" }, this.otherTextPool);

	// Display for the amount of bombs left.
	this.bombText = this.add.text(235, this.world.height - 40, 'x' + numberOfBombs, { font: "20px Arial", fill : "#ffffff", align: "left"}, this.otherTextPool);
	
	// Every second activates this.countdown.
	this.time.events.loop(Phaser.Timer.SECOND, this.countdown, this);
		
	// Counters.
	// Game's time counter.
	this.timeCounter = TOTAL_TIME;
	// Bomb's time counter.
	this.explosionTimeCounter = BOMB_TOTAL_TIME; // Time counter
	
	// Score counter
	this.timeOfGame = this.time.now;

	// Group for buttons
	buttons = this.add.group();
	// Create the button for the black hole bomb
	this.blackHoleButton = this.add.button(200, this.world.height - 60, 
					       'blackHoleButton', 
					       this.select_Bomb, this, null,
					       null, 1, 1);
	this.blackHoleButton.anchor.setTo(0.5, 0.5);
	this.blackHoleButton.scale.setTo(0.4, 0.4);
	buttons.add(this.blackHoleButton);
	
	// Create the button for the cannon
	cannonButton = this.add.button(300, this.world.height - 60, 'cannonButton', this.select_Cannon, this, null, null, 1, 1);
	cannonButton.anchor.setTo(0.5, 0.5);
	cannonButton.scale.setTo(0.4, 0.4);
	buttons.add(cannonButton);

	// // Create the play button
	this.playButton = this.add.button(this.world.centerX, 
					  this.world.height - 60, 'playButton',
					  this.start, 2, 1, 0);
	this.playButton.anchor.setTo(0.5, 0.5);
	this.playButton.scale.setTo(0.05, 0.05);
	buttons.add(this.playButton);

	// // Create the locked buttons	
	lockedButtons = this.add.group();
	lockedButtons.createMultiple(4, 'lockedButton');
	lockedButtons.setAll('anchor.x', 0.5);
	lockedButtons.setAll('anchor.y', 0.5);
	lockedButtons.setAll('scale.x', 0.175);
	lockedButtons.setAll('scale.y', 0.175);

	beforeButton = cannonButton;
	
	lockedButtons.getAt(0).reset(beforeButton.x + 100, beforeButton.y);
	beforeButton = this.playButton;
	lockedButtons.forEachDead(function(button) {
	    button.reset(beforeButton.x + 100, beforeButton.y);
	    beforeButton = button;
	}, this);

	// plus and minus buttons
	plusButton = this.add.button(cannonButton.x + 40, cannonButton.y - 20, 'plusButton', this.increase_Fire, 2, 1, 0);
	plusButton.anchor.setTo(0.5, 0.5);
	plusButton.scale.setTo(0.02, 0.02);
	buttons.add(plusButton);

	minusButton = this.add.button(cannonButton.x + 40, cannonButton.y + 20, 'minusButton', this.decrease_Fire, 2, 1, 0);
	minusButton.anchor.setTo(0.5, 0.5);
	minusButton.scale.setTo(0.02, 0.02);
	buttons.add(minusButton);

	// Mouse input
	this.input.onDown.add(this.put_Weapon, this);
    },
    
    // Everything that needs to be done or modified constantly in the game goes
    // here.
    update: function() {
	// If an enemy and a bomb overlaps this.try_To_Destroy is activated.
	this.physics.arcade.overlap(this.enemyPool, this.bombPool, 
				    this.try_To_Destroy, null, this);

	//Hide the weapons cursors
	this.bombOnMouse.reset(1000,1000);
	this.cannonOnMouse.reset(1000,1000);

	
	if (usingBlackHole) {
	    this.find_Grid_Place();
	    x = this.allign_X(this.gridX-0.5);
	    y = this.allign_Y(this.gridY-0.5);
	    this.bombOnMouse.reset(x, y);

	    // Display of the time left before the bomb explodes.
	    var text = this.bombTextPool.getAt(TOTAL_ENEMIES-1);
	    // text.anchor.setTo(0.5, 0.5);
	    text.visible = true;
	    text.text = BOMB_TOTAL_TIME;
	    text.x = x;
	    text.y = y;

	    lineY = this.allign_Y(this.gridY-0.5); 
	    this.line.reset(LEFT_MARGIN,lineY);

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

	// If the game started move enemies.
	if (started) {
	    // enemy.body.velocity.y = ENEMY_VELOCITY * GRID_SPACE;
	    this.enemyPool.forEachAlive(function(enemy) {
		enemy.body.velocity.y = ENEMY_VELOCITY * GRID_SPACE;
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

	if ((!this.bombPool.getFirstAlive()) && (this.timeCounter < TOTAL_TIME) && (numberOfBombs < TOTAL_ENEMIES)) {
	    this.quit_Game(true);
	}
	// If an enemy reaches the botom of the grid you lose the game.
	this.enemyPool.forEachAlive(function(enemy) {
	    verticalLength = this.allign_Y(ROWS_NUMBER+0.7) ; 
	    if (enemy.body.y > (verticalLength)) this.enemyOutOfGrid = true;
	}, this);
	
	if (this.enemyOutOfGrid) {
	    this.quit_Game(false);
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
	    this.state.start('WinnerMenu', true, false, this.timeOfGame, 2);
	} else {
	    //	Then let's go back to the game over menu.
	    this.state.start('GameOverMenu');	
	}
    },
    
    // If the bomb's counter is equal to zero then the enemy is killed.
    try_To_Destroy: function(enemy, bomb) {
	var explosionY = (initialY + (GRID_SPACE * ENEMY_VELOCITY * BOMB_TOTAL_TIME));
	if (this.explosionTimeCounter == 0 && enemy.body.y > explosionY && enemy.body.y <= explosionY + 25) {
	    enemy.kill();
	}
    },
    
    //Draws the grid
    make_Grid: function() {
	
	//We will make a unique grid, with static tiles
	var style = { font: "15px Arial", fill: "#ffffff", align: "center" };

	var graphics = this.add.graphics(0, 0);
	graphics.lineStyle(2, 0x00CCFF,1);
	
	//Static horizontal lines------------------------------------------------   
	forConstant1 = (COLUMNS_NUMBER*GRID_SPACE) + LEFT_MARGIN;
	for( i = 0; i < (ROWS_NUMBER+1); i = i+1) {
	    y = (i * GRID_SPACE) + UP_MARGIN;
	    
	    graphics.moveTo(LEFT_MARGIN, y); 
	    graphics.lineTo(forConstant1,y);
	}

	//Static grid numbers----------------------------------------------------	
   	forConstant1=LEFT_MARGIN + GRID_SPACE*(COLUMNS_NUMBER+0.5);
	forConstant2 = ((GRID_SPACE) / 2) - 7.5; //7.5= 15px Arial / 2
	for( i= 0; i < ROWS_NUMBER; i = i+1) {
	    y = (i * GRID_SPACE) + UP_MARGIN;
	    
	    this.add.text( forConstant1, y + forConstant2, String(i+1), style );
	}
	//Static vertical lines--------------------------------------------------
	forConstant1 =(GRID_SPACE*ROWS_NUMBER)+UP_MARGIN;
	for (i = 0; i < (COLUMNS_NUMBER+1); i = i + 1) {
	    y = (i * GRID_SPACE) + LEFT_MARGIN;
	    
	    graphics.moveTo(y,UP_MARGIN);
	    graphics.lineTo(y,forConstant1);
	}
    },

    select_Bomb: function() {
	usingBlackHole = (numberOfBombs > 0);
	// If the all the bombs has been placed, the bombs are removed and the counter is reseted.
	if (!usingBlackHole) {
	    // this.bombPool.removeAll();
	    this.bombPool.forEachAlive(function(bomb) {
		bomb.kill();
	    }, this);
	    this.bombTextPool.forEach(function(display) {
		display.visible = false;
	    }, this);
	    numberOfBombs = TOTAL_ENEMIES;
	}
    },

    select_Cannon: function() {
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
    },

    start: function() {
	started = true;
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
		this.line.reset(1000, 1000);
		
		// Update displays.
		this.bombText.text = 'x' + numberOfBombs;

	    } else if (usingCannon && numberOfCannons > 0) {
		x = this.allign_X(this.gridX - 0.5);
		y = 460;
		var cannon = this.cannonPool.getFirstExists(false);
		cannon.body.setSize(10, 10);
		cannon.reset(x, y);
		numberOfCannons -= 1;
		
		cannonButton.frame = 0;
		usingCannon = false;
	    }
 	}
    },
    
    increase_Fire: function() {
	console.log("Increase fire");
    },

    decrease_Fire: function() {
	console.log("Decrease fire");
    },

    // Decreases the game's counter and the bomb's counter.
    countdown: function() {
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
	this.gridX = parseInt((this.input.x-LEFT_MARGIN+GRID_SPACE)/GRID_SPACE);
	this.gridY = parseInt((this.input.y-UP_MARGIN+GRID_SPACE)/GRID_SPACE);
    
	if(this.gridX < 1) this.gridX = 1;
	if(this.gridX > 16) this.gridX = 16;
    
	if(this.gridY < 1) this.gridY = 1;
	if(this.gridY > 10) this.gridY = 10;
    },
    
    //Alligns a number to the X axis of the grid
    allign_X: function(x){
	return x*GRID_SPACE + LEFT_MARGIN;
    },
    
    //Alligns a number to the Y axis of the grid
    allign_Y: function(y){
	return y*GRID_SPACE + UP_MARGIN;
    },
/*
    outOfGrid: function(enemy) {
	//if (enemy.body.y > (200)) console.log("Entro aquí VE");
	verticalLength = this.allignY ( this.VERTICAL_NUMBER ) ; 
	if (enemy.body.y > verticalLength) this.enemyOutOfGrid = true;
    },*/

    // NO TOCAR SIN MI PERMISO :)
    // This function is for debug (and other stuff xD, but we're using it for
    // debugging sprite's sizes).
    
    // render: function() {
    // 	if (this.enemyPool.countLiving() > 0) {
    // 	    this.enemyPool.forEachAlive(function(enemy) {
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

    // }
};