BasicGame.Nivel1 = function (game) {

    //Grid Stuff
    //-----------------------------------------------------------------------
    GRID_SPACE = 38;        //Length of the squares of the grid
    LEFT_MARGIN = 196;      //Left Margin for the grid
    UP_MARGIN = 60;         //Horizontal Margin for the grid
    ROWS_NUMBER = 10;       //Number of horizontal spaces in the grid
    COLUMNS_NUMBER = 16;    //Number of vertical spaces in the grid
   
    TOTAL_ENEMIES = 1;      //Total = Distance + Velocity    
    //TOTAL_TIME = 10;      //Time for explosion. Constant to be removed
    //BOMB_TOTAL_TIME = 3;  //Refer to bombTime
    //ENEMY_VELOCITY = 3;   //Refer to enemyVelocity
    
    TIMES_TO_PASS = 5;      //Number of times that the level is needed to be passed
    
    //this.line;//The line that helps you to use the numbers of the grid
    
    this.enemyOutOfGrid;    //Booleans, set if an enemy is out of the grid

    //Grid adjustment in boxes
    this.gridX = 0;
    this.gridY = 0;
    //----------------------------------------------------------------------
   
    //Now, this positions are generated randomly
    this.bombTime = 3; // Time for the bombs to explode
    this.enemyVelocity = game.rnd.integerInRange(1, ROWS_NUMBER/2); // Velocity of the enemy
    

    this.bombPool;          //Group of bombPool
    //this.bomb;            //Instance of the group of bombPool
    this.enemyDistancePool; // Group of Distance enemies
    this.enemy;             //Instance of an enemy
    this.bombOnMouse;       //The sprite that appears on the mouse (Might be removed)
    
    // Counters
    //this.timeCounter; // Time counter. Variable to be removed
    this.explosionTimeCounter; // Tells the time remaining before de bomb explodes.
    //this.numberOfBombs; //BombPool = number of enemies, should be generated.
    
    // Texts
    this.bombsRemainingTextPool;
    this.enemyDistanceTextPool;
    this.otherTextPool;
    this.instructionsTextPool;
    this.velocityText; // Text display of velocity
    this.levelText; // Text display of time
    this.explosionTimeText; // Text display for the explosionTimeCounter
    this.blackHoleButtonText; // Text display the time before the bombs explode
    
    this.initialLevelText; //Text with the level name shown in the blackScreen
    this.initialInstructionText;//Text with instruction shown in blackScreen
    this.mouseToContinueText; //Text that says "press the mouse, dude" SHOULD BE A CONSTANT
    
    // Buttons
    /*this.buttons; // Group for locked buttons*/
    this.blackHoleButton; // Black hole bomb button
    this.playButton; // Play button
    
    // Actual level
    this.level;

    //Score system variables
    this.score;
    this.timeOfGame;

    // Variable to play the level multiple times
    this.timesPassed = TIMES_TO_PASS;
   
    //Aligned enemy in the grid.
    this.enemyPlace = 0; //Is alligned later before used
    
    //Instruction Screen 
    this.blackScreen;
    this.beginGame = false;
};

BasicGame.Nivel1.prototype = {
    init: function(lastTime,level,score,
		   allign_X,
		   allign_Y,
		   blackHoleButton_Setup,
		   bombOnMouse_Setup,
		   //bombPool_Setup,
		   countdown,
		   find_Grid_Place,
		  // gridLine_Setup,
		   make_Grid,
		   minusButton_Setup,
		   plusButton_Setup,
		   //lockedButtons_Setup,
		   playButton_Setup,
		   select_Bomb,
		   start,
		   scoreText_Setup,
		   try_To_Destroy) {
	this.level = level;
	this.score = score;
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
    
    create: function () {
	
	// Initializing boolean variables.
	started = false; // Boolean that says if the game has begun.
	// lost = false; // Boolean that says if the player lost the game.
	// Boolean that says if the player has selected the black hole bomb.
	usingBlackHole = false; // Says if the player selected the bomb.
	placedBomb = false; // Says if a bomb has been placed on the grid.
	lastTime = this.time.now + 2500 // Keeps time for the explosion counter.
	numberOfBombs = TOTAL_ENEMIES; // Number of bombPool available in this level.
	//Loading sounds
	bombBeep = this.add.audio('bombBeep');
	blackHoleSound = this.add.audio('blackHoleSound');
	
	this.timesPassed = TIMES_TO_PASS;	

	// Creating background.
	background = this.add.sprite(0, 0, 'background');
	// Game physics system.
	this.physics.startSystem(Phaser.Physics.ARCADE);
	
	// Creating the grid for the game.
	option = 1;
	this.make_Grid(option);
	
	// Bomb's time counter.
	this.bombTime = this.game.rnd.integerInRange(2, Math.floor((10/this.enemyVelocity)));
	this.explosionTimeCounter = this.bombTime; // Time counter
	
	//Start the game inside the grid
	this.enemyOutOfGrid = false;

	// Bomb that appears on the mouse
	this.bombOnMouse_Setup();
	
	//Line that follows the bombs in the grid
	//this.gridLine_Setup();
	
	// Group for the enemies
	this.enemyDistancePool_Setup();
	
	// Create the bombPool
	this.bombPool_Setup();
		
	// Counters.
	// Game's time counter.
	//this.timeCounter = TOTAL_TIME;
	
	// Score counter
	this.timeOfGame = this.time.now;

	// Group for the buttons
	buttons = this.add.group();

	// Create the button for the black hole bomb
	this.blackHoleButton_Setup();
	
	// // Create the play button
	this.playButton_Setup();
	
	// // Create the locked buttons
	this.lockedButtons_Setup();

	// Creating the text displays.
	this.displays_Setup();
	
	// Score Texts
	this.scoreText_Setup();
	
	// Every second activates this.countdown.
	this.time.events.loop(Phaser.Timer.SECOND, this.countdown, this);
	
	// Mouse input
	this.input.onDown.add(this.put_Bomb, this);
	
	//Mouse input
	this.input.onDown.add(this.begin_Game,this);
	// Creating auxiliar black screen.
	this.blackScreen = this.add.sprite(0, 0, 'blackScreen');
	this.blackScreen.alpha = 0.9;
	this.beginGame = false;
	//Generating instructions text
	this.blackScreen_Displays_Setup();

    },
    
    // Everything that needs to be done or modified constantly in the game goes
    // here.
    update: function () {
	//Begin game after the user reads the instructions
	
	// If an enemy and a bomb overlaps this.try_To_Destroy is activated.
	this.physics.arcade.overlap(this.enemyDistancePool, this.bombPool, 
				    this.try_To_Destroy, null, this);
	
	// Hide the bomb cursors.
	this.bombOnMouse.reset(1000,1000);
	
	if (usingBlackHole) {
	    this.find_Grid_Place();
	    x = this.allign_X(this.gridX-0.5);
	    y = this.allign_Y(this.gridY-0.5);
	    this.bombOnMouse.reset(x,y);
	    
	    // Display of the time left before the bomb explodes.
	    var text = this.bombTextPool.getAt(TOTAL_ENEMIES -1);
	    text.visible = true;
	    text.text = this.bombTime;
	    text.x = x;
	    text.y = y;
		
	    //lineY = this.allign_Y(this.gridY-0.5); 
	    //this.line.reset(LEFT_MARGIN,lineY);
	}
	
	// Update displays.
	this.bombsRemainingText.text = 'x' + numberOfBombs;
	this.scoreText.text = '' + this.score;
	
	// Updating existing bomb's text display.
	this.bombPool.forEachAlive(function(bomb) {
	    var text = this.bombTextPool.getAt(this.bombPool.getIndex(bomb));
	    text.text = this.explosionTimeCounter;
	    var hola = (this.explosionTimeCounter > 0);
	    text.visible = hola;
	}, this); 
	
	// If the game started move enemies.
	if (started) {
	    // enemy.body.velocity.y = this.ENEMY_VELOCITY * this.GRID_SPACE;
	    this.enemyDistancePool.forEachAlive(function(enemy) {
		enemy.body.velocity.y = this.enemyVelocity * GRID_SPACE;
		
		var text = this.enemyDistanceTextPool.getAt(this.enemyDistancePool.getIndex(enemy));
		text.visible = false;
	    }, this);
	    
	    //If the game started, hide the Velocity text
	    // this.velocityText.visible = false;
	}
	
	// If explosionTimeCounter is 0 start explosion animation.
	if (this.explosionTimeCounter == 0) {
	    this.bombPool.forEachAlive(function(bomb) {
		bomb.animations.play('explode');
		bomb.events.onAnimationComplete.add(function() {
		    bomb.kill();
		    // if (this.enemyDistancePool.countLiving() == 0) {
		    // 	bomb.kill();
		    // }
		}, this);
	    }, this);
	}
	
	// if ((!this.bombPool.getFirstAlive()) && (this.timeCounter < TOTAL_TIME) && (numberOfBombs < TOTAL_ENEMIES)) {
	if ((!this.bombPool.getFirstAlive()) && this.enemyDistancePool.countDead() == TOTAL_ENEMIES ){
	    this.timesPassed -=1;
	    
	    if(this.timesPassed ==0){
		this.quit_Game(true);
	    }else{
		//Resets the enemies and bombs, maybe should be a function
		//------------------------------------------------------------
		this.enemyVelocity = this.game.rnd.integerInRange(1, ROWS_NUMBER/2);
		this.bombTime = this.game.rnd.integerInRange(2, Math.floor((10/this.enemyVelocity)));
		this.explosionTimeCounter = this.bombTime;
		this.blackHoleButtonText.text =  '' + this.explosionTimeCounter;
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
		},this);
		
		this.explosionTimeCounter = this.bombTime;
		numberOfBombs = TOTAL_ENEMIES;
		placedBomb = false;
		//usingBlackHole = true;
		started = false;
		//------------------------------------------------------------
	    }
	}
	// If an enemy reaches the botom of the grid you lose the game.
	this.enemyDistancePool.forEachAlive(function(enemy) {
	    verticalLength = this.allign_Y(ROWS_NUMBER + 0.7) ; 
	    // console.log(enemy.body.y);
	    // console.log(verticalLength);
	    if (enemy.body.y > (verticalLength)) this.enemyOutOfGrid = true;
	}, this);
	
	if (this.enemyOutOfGrid) {
		this.quit_Game(false);
	}	
    },
    
    //Skip the instructions window
    begin_Game: function(){
	//Begins the game 1 second after the mouse is pressed
	this.time.events.add(Phaser.Timer.SECOND * 1, function() {
	    this.blackScreen.destroy();
	    this.beginGame = true;
	    this.instructionsTextPool.destroy(true);
	},this);
	
    },
    
    // Creates the texts that the games uses
    blackScreen_Displays_Setup: function(){
	this.instructionsTextPool = this.add.group();
	
	//Texts used in the instruction screen
	this.initialLevelText = this.add.text(this.world.width/2, this.world.height/5, 'NIVEL 1', { font: "140px Times New Roman", fill: "#f7d913", align: "left" },this.instructionsTextPool);
	this.initialLevelText.anchor.setTo(0.5,0.5);
	
	this.initialInstructionText = this.add.text(this.world.width/2, this.world.height/2, 'Coloca las bombas a la distancia adecuada para ganar', { font: "30px Arial", fill: "#ffffff", align: "left" },this.instructionsTextPool);
	this.initialInstructionText.anchor.setTo(0.5,0.5);

	this.mouseToContinueText = this.add.text(this.world.width/2, 4*this.world.height/5, 'Presiona el mouse para continuar', { font: "20px Arial", fill: "#ffffff", align: "left" },this.instructionsTextPool);
	this.mouseToContinueText.anchor.setTo(0.5,0.5);
	
    },
    
    //Creates the bombPool
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
	    // Adding the bomb animation to each bomb.
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
    	  
    // Creates the texts that the games uses
    displays_Setup: function(){

	this.otherTextPool = this.add.group();	
	// Game time display.
	this.levelText = this.add.text(931, 85, '' + this.level, { font: "30px Arial", fill: "#000000", align: "left" }, this.otherTextPool);
		
	// Display for velocity of the enemies.
	/*this.velocityText = this.add.text((this.allign_X(this.enemyPlace)), 20, 'Velocidad: ' + this.enemyVelocity, { font: "20px Arial", fill: "#ffffff", align: "left" }, this.otherTextPool);*/

	// Display for the amount of bombPool left.
	this.bombsRemainingText = this.add.text(235, this.world.height - 40, '' + numberOfBombs, { font: "20px Arial", fill : "#ffffff", align: "left"}, this.otherTextPool);

	// Display for the time of the bomb.
	this.blackHoleButtonText = this.add.text(this.blackHoleButton.x, this.blackHoleButton.y, '' + this.explosionTimeCounter, { font: "20px Arial", fill : "#000000", align: "left"}, this.otherTextPool);
	this.blackHoleButtonText.anchor.setTo(0.5, 0.5);
    },
    
    // Creates the distance enemies of the level.
    enemyDistancePool_Setup: function() {
	this.enemyDistancePool = this.add.group();
	this.enemyDistancePool.enableBody = true;
	this.enemyDistancePool.physicsBodyType = Phaser.Physics.ARCADE;
	this.enemyDistancePool.createMultiple(TOTAL_ENEMIES, 'distanceEnemy');
	this.enemyDistancePool.setAll('anchor.x', 0.5);
	this.enemyDistancePool.setAll('anchor.y', 0.025);
	this.enemyDistancePool.setAll('outOfBoundsKill', true);
	this.enemyDistancePool.setAll('checkWorldBounds', true);
	this.enemyDistancePool.setAll('scale.x', 0.067);
	this.enemyDistancePool.setAll('scale.y', 0.067);

	//this.enemyDistancePool.setAll('scale.x', 0.125);
	//this.enemyDistancePool.setAll('scale.y', 0.125);

	this.enemyDistancePool.forEach(function(enemy) {
	    var enemy = this.enemyDistancePool.getFirstExists(false);
	    // enemy.reset(this.rnd.integerInRange(200, 800), 100);
	    initialY = 40 - (enemy.height/2);
	    this.enemyPlace = this.game.rnd.integerInRange(1, COLUMNS_NUMBER);
	    
	    aux1 = this.allign_X(this.enemyPlace)-(GRID_SPACE/2);
	    enemy.frame = this.enemyVelocity;
	    enemy.reset(aux1, initialY);
	    enemy.enemyVelocity = this.enemyVelocity;
	    console.log(enemy.enemyVelocity);
	    enemy.body.setSize(100, 100, 0, enemy.height/2);
	    enemy.inputEnabled = true;
	    
	    enemy.events.onInputOver.add(function(enemy) {
		enemy.frame = this.enemyVelocity + 10;
		enemy.scale.setTo(0.15, 0.15);
		enemy.body.reset(enemy.x, enemy.y);
	    }, this);
	    enemy.events.onInputOut.add(function(enemy) {
		enemy.frame = this.enemyVelocity;
		enemy.scale.setTo(0.067, 0.067);
		enemy.body.reset(enemy.x, enemy.y);
	    }, this);
	}, this);
	
	// Group for the text displays
	this.enemyDistanceTextPool = this.add.group();
	// Velocity of each enemy.
	this.enemyDistancePool.forEach(function() {
	    var text = this.add.text((this.allign_X(this.enemyPlace))+38, 20, 'Velocidad: ' + this.enemyVelocity, { font: "17px Arial", fill: "#ffffff", align: "left" }, this.enemyDistanceTextPool);
	    text.visible = true;
	    text.anchor.setTo(0.5, 0.5);
	}, this);
    },

    // Creates the locked buttons
    lockedButtons_Setup: function() {
	
	lockedButtons = this.add.group();
	lockedButtons.createMultiple(5, 'lockedButton');
	lockedButtons.setAll('anchor.x', 0.5);
	lockedButtons.setAll('anchor.y', 0.5);
	lockedButtons.setAll('outOfBoundsKill', true);
	lockedButtons.setAll('checkWorldBounds', true);
	lockedButtons.setAll('scale.x', 0.175);
	lockedButtons.setAll('scale.y', 0.175);

	beforeButton = this.blackHoleButton;
	for(i = 0; i < 2; i++) {
	    x = lockedButtons.getAt(i).reset(beforeButton.x + 100, beforeButton.y);
	    beforeButton = x;
	};
	beforeButton = this.playButton;
	lockedButtons.forEachDead(function(button) {
	    button.reset(beforeButton.x + 100, beforeButton.y);
	    beforeButton = button;
	}, this);
    },

    // Creates a black hole bomb in the place clicked inside the grid.
    put_Bomb: function () {
	
	if(this.beginGame){
	    this.blackHoleButton.frame = 1;
	    if (!started && usingBlackHole && (numberOfBombs > 0)) {
		// Intance of a bomb
		x = (this.allign_X(this.gridX-1)) + (GRID_SPACE/3);
		y = (this.allign_Y(this.gridY-1)) + (GRID_SPACE/3);
		
		var bomb = this.bombPool.getFirstExists(false);
		bomb.body.setSize(10, 10, 4, 4);
		bomb.frame = 1;
		bomb.reset(x, y);
		//bomb.z = this.gridY-1;
		//console.log(bomb.z);
		
		var text = this.bombTextPool.getAt(this.bombPool.getIndex(bomb));
		text.visible = true;
		text.x = x+6;
		text.y = y+6;
		numberOfBombs -= 1;
		
		placedBomb = true;
	    }
	    this.blackHoleButton.frame = 0;
	    this.bombOnMouse.reset(1000, 1000);
    	    usingBlackHole = false;
	    //this.line.reset(1000, 1000);
	}
    },

    // Destroys everything created and moves to the winner's menu or the game 
    // over menu.
    quit_Game: function (won) {	
	this.playButton.destroy();
	this.blackHoleButton.destroy();
	buttons.destroy(true);
	this.bombTextPool.destroy(true);
	this.enemyDistanceTextPool.destroy(true);
	this.otherTextPool.destroy(true);
	this.bombPool.destroy(true);
	background.kill();
	if (won) {
	    time = this.timeOfGame;
	    this.level = 2;
	    nextState = 'WinnerMenu';
	} else {
	    //	You go to the game over menu.
	    time = 0;
	    // level = 1;
	    nextState = 'GameOverMenu';
	}
	this.state.start(nextState, true, false, time, this.level,this.score,
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
    
    // This function is for debug (and other stuff xD, but we're using it for
    // debugging sprite's sizes).
/*    render: function() {
    	if (this.enemyDistancePool.countLiving() > 0) {
    	    this.enemyDistancePool.forEachAlive(function (enemy) {
    		this.game.debug.body(enemy, false, 'rgb(255, 0, 0)');
    	    }, this);
    	}
    	if (this.bombPool.countLiving() > 0) {
    	    this.bombPool.forEachAlive(function(bomb) {
    		this.game.debug.body(bomb, false, 'rgb(255, 0, 0)');
    	    }, this);
    	}
    }*/
};

/*Functions commons to Nivel1 and Nivel2
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