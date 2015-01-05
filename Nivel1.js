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
    // bomb.time = 3; // Time for the bombs to explode
    // enemy.speed = game.rnd.integerInRange(1, ROWS_NUMBER/2); // Velocity of the enemy
    

    this.bombPool;          //Group of bombPool
    //this.bomb;            //Instance of the group of bombPool
    this.enemyDistancePool; // Group of Distance enemies
    this.enemy;             //Instance of an enemy
    this.bombOnMouse;       //The sprite that appears on the mouse (Might be removed)
    
    // Counters
    //this.timeCounter; // Time counter. Variable to be removed
    //this.explosionTimeCounter; // Tells the time remaining before de bomb explodes.
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
    this.simulationTime;

    // Variable to play the level multiple times
    this.timesPassed = TIMES_TO_PASS;
   
    //Aligned enemy in the grid.
    // this.enemyPlace = 0; Is alligned later before used
    
    //Instruction Screen 
    this.blackScreen;
    this.beginGame = false;
    this.levelMessage; //The message given to the player this level
};

BasicGame.Nivel1.prototype = {
    init: function(lastTime,level,score,
		   allign_X,
		   allign_Y,
		   blackHoleButton_Setup,
		   bombOnMouse_Setup,
		   buttonPanel_Setup,
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
		   selector_Setup,
		   start,
		   scoreText_Setup,
		   try_To_Destroy) {
	this.level = level;
	this.score = score;
    	this.allign_X = allign_X;
	this.allign_Y = allign_Y;
	this.blackHoleButton_Setup = blackHoleButton_Setup;
	this.bombOnMouse_Setup = bombOnMouse_Setup;
	this.buttonPanel_Setup = buttonPanel_Setup;
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
	this.selector_Setup = selector_Setup;
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
	
	//Loading times needed to pass the level
	this.timesPassed = TIMES_TO_PASS;	
	
	//Initializing time spent in animations
	this.simulationTime = 0;
	
	//The message given to the player this level
	this.levelMessage = 'Coloca la bomba en el lugar correcto para destruir al enemigo.';
	
	// Creating background.
	background = this.add.sprite(0, 0, 'background');
	// Game physics system.
	this.physics.startSystem(Phaser.Physics.ARCADE);
	
	// Creating the grid for the game.
	option = 1;
	this.make_Grid(option);
	
	// Bomb's time counter.
	// bomb.time = this.game.rnd.integerInRange(2, Math.floor((10/enemy.speed)));
	// this.simulationTime = this.simulationTime + bomb.time; 
	// this.explosionTimeCounter = bomb.time; // Time counter
	
	//Start the game inside the grid
	this.enemyOutOfGrid = false;

	// Bomb that appears on the mouse
	this.bombOnMouse_Setup();
	
	//Line that follows the bombs in the grid
	//this.gridLine_Setup();
	
	// Group for the enemies
	this.enemyDistancePool_Setup();
	// Bomb's time counter.
	// this.enemyDistancePool.forEach(function(enemy) {
	    
	//     bomb.time = this.game.rnd.integerInRange(2, Math.floor((10/enemy.speed)));
	// }, this);
	
	// Create the bombPool
	this.bombPool_Setup();

	this.bombPool.forEach(function(bomb) {
	    this.simulationTime = this.simulationTime + bomb.time; 
	    // this.explosionTimeCounter = bomb.time; // Time counter
	}, this);
		
	// Counters.
	// Game's time counter.
	//this.timeCounter = TOTAL_TIME;
	
	// Score counter---> Now is set in "Begin Game"
	//this.timeOfGame = this.time.now;

	// The button panel.
	this.buttonPanel_Setup();

	// The selector.
	this.selector_Setup();

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
	    this.bombTextPool.forEach(function(text) {
		var bomb = this.bombPool.getAt(this.bombTextPool.getIndex(text));
		text.visible = true;
		text.text = bomb.time;
		text.x = x;
		text.y = y;
	    }, this);
	    //lineY = this.allign_Y(this.gridY-0.5); 
	    //this.line.reset(LEFT_MARGIN,lineY);
	}
	
	// Update displays.
	this.bombsRemainingText.text = 'x' + numberOfBombs;
	this.scoreText.text = '' + this.score;
	
	// Updating existing bomb's text display.
	this.bombPool.forEachAlive(function(bomb) {
	    var text = this.bombTextPool.getAt(this.bombPool.getIndex(bomb));
	    // text.text = this.explosionTimeCounter;
	    // var hola = (this.explosionTimeCounter > 0);
	    text.text = bomb.counter;
	    text.visible = (bomb.counter > 0);
	}, this); 
	
	// If the game started move enemies.
	if (started) {
	    // enemy.body.velocity.y = this.ENEMY_VELOCITY * this.GRID_SPACE;
	    this.enemyDistancePool.forEachAlive(function(enemy) {
		enemy.body.velocity.y = enemy.speed * GRID_SPACE;
		
		var text = this.enemyDistanceTextPool.getAt(this.enemyDistancePool.getIndex(enemy));
		text.visible = false;
	    }, this);
	    
	    //If the game started, hide the Velocity text
	    // this.velocityText.visible = false;
	}
	
	// If explosionTimeCounter is 0 start explosion animation.
	// if (this.explosionTimeCounter == 0) {
	this.bombPool.forEachAlive(function(bomb) {
	    if (bomb.counter == 0) {
		bomb.animations.play('explode');
		bomb.events.onAnimationComplete.add(function() {
		    bomb.kill();
		    // if (this.enemyDistancePool.countLiving() == 0) {
		    // 	bomb.kill();
		// }
		}, this);
	    }
	}, this);
	// }
	
	// if ((!this.bombPool.getFirstAlive()) && (this.timeCounter < TOTAL_TIME) && (numberOfBombs < TOTAL_ENEMIES)) {
	if ((!this.bombPool.getFirstAlive()) && this.enemyDistancePool.countDead() == TOTAL_ENEMIES ){
	    this.timesPassed -=1;
	    
	    if(this.timesPassed ==0){
		this.quit_Game(true);
	    }else{
		//Resets the enemies and bombs, maybe should be a function
		//------------------------------------------------------------
		// enemy.speed = this.game.rnd.integerInRange(1, ROWS_NUMBER/2);
		// bomb.time = this.game.rnd.integerInRange(2, Math.floor((10/enemy.speed)));
		// this.simulationTime = this.simulationTime + bomb.time;
		// this.explosionTimeCounter = bomb.time;
		// this.blackHoleButtonText.text =  '' + this.explosionTimeCounter
		;
		this.enemyDistancePool.forEach(function(enemy) {
		    // var enemy = this.enemyDistancePool.getFirstExists(false);
		    initialY = 40 - (enemy.height/2);
		    enemy.place = this.game.rnd.integerInRange(1, COLUMNS_NUMBER);	    
		    enemy.speed = this.game.rnd.integerInRange(1, ROWS_NUMBER/2);
		    aux1 = this.allign_X(enemy.place)-(GRID_SPACE/2);
		    enemy.frame = enemy.speed;
		    enemy.reset(aux1, initialY);
		    var index = this.enemyDistancePool.getIndex(enemy);
		    var bomb = this.bombPool.getAt(index);
		    bomb.time = this.game.rnd.integerInRange(2, Math.floor((10/enemy.speed)));
		    bomb.counter = bomb.time;
		    this.simulationTime = this.simulationTime + bomb.time;
		    // this.explosionTimeCounter = bomb.time;
		    this.blackHoleButtonText.text =  '' + bomb.counter;
		    var text = this.enemyDistanceTextPool.getAt(this.enemyDistancePool.getIndex(enemy));
		    text.visible = true;
		    text.x = (this.allign_X(enemy.place))+38;
		    text.text = 'Velocidad: ' + enemy.speed;
		},this);
		
		// this.explosionTimeCounter = bomb.time;
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

    // Destroys everything created and moves to the winner's menu or the game 
    // over menu.
    quit_Game: function (won) {	
	this.playButton.destroy();
	this.buttonPanel.kill();
	this.blackHoleButton.destroy();
	buttons.destroy(true);
	this.selector.destroy(true);
	this.bombTextPool.destroy(true);
	this.enemyDistanceTextPool.destroy(true);
	this.otherTextPool.destroy(true);
	this.bombPool.destroy(true);
	background.kill();
	if (won) {
	    //Tiempo total de juego
	    time = this.time.elapsedSecondsSince(this.timeOfGame);
	    //Tiempo restando el tiempo de simulacion
	    time = time - this.simulationTime;
	    //Tiempo restando una constante
	    time = time - TIMES_TO_PASS * 4;
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
			 this.buttonPanel_Setup,
			 this.countdown,
			 this.find_Grid_Place,
			 //this.gridLine_Setup,
			 this.make_Grid,
			 this.minusButton_Setup,
			 this.plusButton_Setup,
			 this.playButton_Setup,
			 this.select_Bomb,
			 this.selector_Setup,
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