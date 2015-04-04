BasicGame.Nivel2 = function (game) {

    //Grid Stuff
    //-----------------------------------------------------------------------
    GRID_SPACE = 38;        //Length of the squares of the grid
    LEFT_MARGIN = 196;      //Left Margin for the grid
    UP_MARGIN = 60;         //Horizontal Margin for the grid
    ROWS_NUMBER = 10;       //Number of horizontal spaces in the grid
    COLUMNS_NUMBER = 16;    //Number of vertical spaces in the grid
   
    DISTANCE_ENEMIES = 1; // Amount of distance enemies
	
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
    this.bombOnMouseText; // Text display the time before the bombs explode
    
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

BasicGame.Nivel2.prototype = {
    init: function(lastTime,level,score,
		   activate_Enemy_Shield,
		   allign_X,
		   allign_Y,
		   begin_Game,
		   blackHoleButton_Setup,
		   blackScreen_Displays_Setup,
		   bombOnMouse_Setup,
		   bombPool_Setup,
		   buttonPanel_Setup,
		   cannonButton_Setup,
		   cannonOnMouse_Setup,
		   cannonPool_Setup,
		   selectorButtonsPool_Setup,
		   selectorTextPool_Setup,
		   countdown,
		   deactivate_Enemy_Shield,
		   decrease_Fire,
		   decrease_Time_Shield,
		   desallign_X,
		   desallign_Y,
		   displays_Setup,
		   find_Grid_Place,
		   enemy_Fire,
		   enemy_Hit,
		   enemy_ShieldTime_Text_Setup,
		   enemyBulletPool_Setup,
		   enemyDistancePool_Setup,
		   enemyTimePool_Setup,
		   enemyVelocityLaserPool_Setup,
		   enemyVelocityPool_Setup,
		   fire,
		   get_Enemy_Distance_Speed,
		   get_Enemy_Time_Speed,
		   go_To_Home,
		   homeButton_Setup,	 
		   increase_Fire,
		   increase_Time_Shield,
		   lockedButtons_Setup,
		   make_Grid,
		   minusButton_Setup,
		   missilePool_Setup,
		   out_Of_GridY,
		   playButton_Setup,
		   plusButton_Setup,
		   put_Weapon,
		   select_Bomb,
		   select_Cannon,
		   select_Shield,
		   selector_Setup,
		   set_Missile_Speed,
		   set_Shield_Time,
		   shield_Hit,
		   shieldButton_Setup,
		   shieldOnMouse_Setup,
		   shieldPool_Setup,
		   shieldSelectorButtonsPool_Setup,
		   shuffleBag_Bomb_Get,
		   shuffleBag_Bomb_Restart,
		   shuffleBag_Bomb_Setup,
		   shuffleBag_Velocity_Get,
		   shuffleBag_Velocity_Restart,
		   shuffleBag_Velocity_Setup,
		   shuffleBag_X_Axis_Get,
		   shuffleBag_X_Axis_Restart,
		   shuffleBag_X_Axis_Setup,
		   start,
		   start_Game,
		   try_To_Destroy,
		   try_To_Destroy_Time,
		   try_To_Destroy_Velocity,
		   you_Got_Shot) {
	
	this.level = level;
	this.score = score;
    	this.activate_Enemy_Shield = activate_Enemy_Shield;
	this.allign_X = allign_X;
	this.allign_Y = allign_Y;
	this.begin_Game = begin_Game; 
	this.blackHoleButton_Setup = blackHoleButton_Setup;
	this.blackScreen_Displays_Setup = blackScreen_Displays_Setup;
	this.bombOnMouse_Setup = bombOnMouse_Setup;
	this.bombPool_Setup = bombPool_Setup;
	this.buttonPanel_Setup = buttonPanel_Setup;
	this.cannonButton_Setup = cannonButton_Setup;
	this.cannonOnMouse_Setup = cannonOnMouse_Setup;
	this.cannonPool_Setup = cannonPool_Setup;
	this.selectorButtonsPool_Setup = selectorButtonsPool_Setup;
	this.selectorTextPool_Setup = selectorTextPool_Setup;
	this.countdown = countdown;
	this.deactivate_Enemy_Shield = deactivate_Enemy_Shield;
	this.decrease_Fire = decrease_Fire;
	this.decrease_Time_Shield = decrease_Time_Shield;
	this.desallign_X = desallign_X;
	this.desallign_Y = desallign_Y; 
	this.displays_Setup = displays_Setup;
	this.find_Grid_Place = find_Grid_Place;
	this.enemy_Fire = enemy_Fire;
	this.enemy_Hit = enemy_Hit;
	this.enemy_ShieldTime_Text_Setup = enemy_ShieldTime_Text_Setup;
	this.enemyBulletPool_Setup = enemyBulletPool_Setup;
	this.enemyDistancePool_Setup = enemyDistancePool_Setup;
	this.enemyTimePool_Setup = enemyTimePool_Setup;
	this.enemyVelocityLaserPool_Setup = enemyVelocityLaserPool_Setup;
	this.enemyVelocityPool_Setup = enemyVelocityPool_Setup;
	this.fire = fire;
	this.get_Enemy_Distance_Speed = get_Enemy_Distance_Speed;
	this.get_Enemy_Time_Speed = get_Enemy_Time_Speed;
	this.go_To_Home = go_To_Home;
	this.homeButton_Setup = homeButton_Setup;
	this.increase_Fire = increase_Fire;
	this.increase_Time_Shield = increase_Time_Shield;
	this.lockedButtons_Setup = lockedButtons_Setup;
	this.make_Grid = make_Grid;
	this.minusButton_Setup = minusButton_Setup;
	this.missilePool_Setup = missilePool_Setup;
	this.out_Of_GridY = out_Of_GridY;
	this.playButton_Setup = playButton_Setup;
	this.plusButton_Setup = plusButton_Setup;
	this.put_Weapon = put_Weapon;
	this.select_Bomb = select_Bomb;
	this.select_Cannon = select_Cannon;
	this.select_Shield = select_Shield;
	this.selector_Setup = selector_Setup;
	this.set_Missile_Speed = set_Missile_Speed;
	this.set_Shield_Time = set_Shield_Time;
	this.shield_Hit = shield_Hit;
	this.shieldButton_Setup = shieldButton_Setup;
	this.shieldOnMouse_Setup = shieldOnMouse_Setup;
	this.shieldPool_Setup = shieldPool_Setup;
	this.shieldSelectorButtonsPool_Setup = shieldSelectorButtonsPool_Setup;
	this.shuffleBag_Bomb_Get = shuffleBag_Bomb_Get;
	this.shuffleBag_Bomb_Restart = shuffleBag_Bomb_Restart;	
	this.shuffleBag_Bomb_Setup = shuffleBag_Bomb_Setup;
	this.shuffleBag_Velocity_Get = shuffleBag_Velocity_Get;
	this.shuffleBag_Velocity_Restart = shuffleBag_Velocity_Restart;
	this.shuffleBag_Velocity_Setup = shuffleBag_Velocity_Setup;
	this.shuffleBag_X_Axis_Get = shuffleBag_X_Axis_Get;
	this.shuffleBag_X_Axis_Restart = shuffleBag_X_Axis_Restart;
	this.shuffleBag_X_Axis_Setup = shuffleBag_X_Axis_Setup;
	this.start = start;
	this.start_Game = start_Game; 
	this.try_To_Destroy = try_To_Destroy;
	this.try_To_Destroy_Time = try_To_Destroy_Time;
	this.try_To_Destroy_Velocity = try_To_Destroy_Velocity;
	this.you_Got_Shot = you_Got_Shot;   
    },
    
    create: function () {
	
	TOTAL_ENEMIES = 1;
	DISTANCE_ENEMIES = 1; // Amount of distance enemies
	VELOCITY_ENEMIES = 0;
	TIME_ENEMIES = 0;
	TIMES_TO_PASS = 7;
	this.enemyVelocityPool = null;
	// Initializing boolean variables.
	started = false; // Boolean that says if the game has begun.
	goHome = false; // Boolean used to return to the main Menu
	// lost = false; // Boolean that says if the player lost the game.
	// Boolean that says if the player has selected the black hole bomb.
	usingBlackHole = false; // Says if the player selected the bomb.
	usingCannon = false;
	usingShield = false;
	placedBomb = false; // Says if a bomb has been placed on the grid.
	lastValueHigh = true; //Auxiliar boolean to control variability of cases  
	tutorial = false; // Says if this level is a tutorial
	following = false; // Some endogenous solution for the problem of dragging a bomb that has already been placed
	movingBombID = null;
	lastMultiplicationValue = 88; //Auxiliar to avoid repeated cases
	lastTime = this.time.now + 2500 // Keeps time for the explosion counter.
	
	numberOfBombs = DISTANCE_ENEMIES; // Number of bombPool available in this level.
	//Loading sounds
	bombBeep = this.add.audio('bombBeep');
	blackHoleSound = this.add.audio('blackHoleSound');
	
	//Loading times needed to pass the level
	this.timesPassed = TIMES_TO_PASS;	
	
	//Initializing time spent in animations
	this.simulationTime = 0;
	
	//The message given to the player this level
	//this.levelMessage = 'Coloca la bomba en el lugar correcto para destruir al enemigo.';
	this.levelMessage = 'Coloca la trampa a la distancia correcta para atrapar al enemigo.';
	
	// Creating background.
	background = this.add.sprite(0, 0, 'background');
	// Game physics system.
	this.physics.startSystem(Phaser.Physics.ARCADE);
	
	//Creates the shuffle bag to bombs
	this.shuffleBag_Bomb_Setup();
	//Create the shuffle bag to the X Axis
	this.shuffleBag_X_Axis_Setup();
		   
	// Creating the grid for the game.
	option = 1;
	this.make_Grid(option);
	
	// Bomb's time counter.
	// bomb.time = this.game.rnd.integerInRange(2, Math.floor((10/enemy.speed)));
	// this.simulationTime = this.simulationTime + bomb.time; 
	// this.explosionTimeCounter = bomb.time; // Time counter
	
	//Start the game inside the grid
	this.enemyOutOfGrid = false;
	
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

	// // The button panel.
	// this.buttonPanel_Setup();

	// // The selector.
	// this.selector_Setup();

	// Group for the buttons
	buttons = this.add.group();

	// Create the button for the black hole bomb
	this.blackHoleButton_Setup();
	
	// // Create the play button
	this.playButton_Setup();
	
	// Create the Home Button
	this.homeButton_Setup();
	
	// // Create the locked buttons
	this.lockedButtons_Setup();

	// Bomb that appears on the mouse
	this.bombOnMouse_Setup();

	// Creating the text displays.
	this.displays_Setup();
	
	// Score Texts
	//this.scoreText_Setup();
	
	// Every second activates this.countdown.
	this.time.events.loop(Phaser.Timer.SECOND, this.countdown, this);
	
	// Mouse input
	this.input.onDown.add(this.put_Weapon, this);
	
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
	// this.bombOnMouse.reset(1000,1000);
	// console.log("PRUEBA " + this.input.mousePointer.isDown);
	console.log(usingBlackHole);
	if (usingBlackHole) {
	    
	    // Display for the time of the bomb.
	    var bomb = this.bombPool.getFirstExists(false);	
	    var text = this.bombTextPool.getAt(this.bombPool.getIndex(bomb));
	    text.visible = true;
	    text.text = bomb.time;
	    text.x = x;
	    text.y = y;
	}
	if (following) {
	    this.bombOnMouse.reset(this.input.x, this.input.y);
	    this.bombOnMouseText.x = this.input.x;
	    this.bombOnMouseText.y = this.input.y;
	    this.bombOnMouseText.text = '' + this.bombTextPool.getAt(movingBombID).text;

	} else {
	    // Update displays.
	    this.bombOnMouseText.x = this.bombOnMouse.x;
	    this.bombOnMouseText.y = this.bombOnMouse.y;
	    var bomb = this.bombPool.getFirstExists(false);	
	    if(bomb!= null) {
		this.bombOnMouseText.text = '' + bomb.time;
		this.bombOnMouseText.visible = true;
	    }
	}
		
	this.bombsRemainingText.text = 'x' + numberOfBombs;
	this.scoreText.text = '' + this.score;
	
	// Display for the time of the bomb.
	// var bomb = this.bombPool.getFirstExists(false);	
	// if(bomb!= null) this.blackHoleButtonText.text = '' + bomb.time;
	
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
	if ((!this.bombPool.getFirstAlive()) && this.enemyDistancePool.countDead() == DISTANCE_ENEMIES ){
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
		// this.bombOnMouseText.text =  '' + this.explosionTimeCounter
		;
		/*
		this.enemyDistancePool.forEach(function(enemy) {
		    // var enemy = this.enemyDistancePool.getFirstExists(false);
		    this.bombOnMouse.reset(this.world.width/2, this.world.height -82);
		    this.bombOnMouseText.visible = true;
		    initialY = 40 - (enemy.height/2);
		    //enemy.place = this.game.rnd.integerInRange(1, COLUMNS_NUMBER);	    
		    enemy.speed = this.shuffleBag_Bomb_Get();
		    
		    enemy.place = this.shuffleBag_X_Axis_Get();
		    
		    aux1 = this.allign_X(enemy.place)-(GRID_SPACE/2);
		    enemy.frame = enemy.speed;
		    enemy.reset(aux1, initialY);
		    var index = this.enemyDistancePool.getIndex(enemy);
		    var bomb = this.bombPool.getAt(index);
		    bomb.time = this.game.rnd.integerInRange(2, Math.floor((10/enemy.speed)));
		    bomb.counter = bomb.time;
		    bomb.frame = 1;
		    this.simulationTime = this.simulationTime + bomb.time;
		    // this.explosionTimeCounter = bomb.time;
		    this.bombOnMouseText.text =  '' + bomb.counter;
		    var text = this.enemyDistanceTextPool.getAt(this.enemyDistancePool.getIndex(enemy));
		    text.visible = true;
		    text.x = (this.allign_X(enemy.place))+38;
		    text.text = 'Velocidad: ' + enemy.speed;
		},this);
		*/
		if(!tutorial){
		    if(this.timesPassed > 5){
			TOTAL_ENEMIES = 1;
			DISTANCE_ENEMIES = 1;
		    } else if (this.timesPassed > 3){
			TOTAL_ENEMIES = 2;
			DISTANCE_ENEMIES = 2;
		    }else {
			TOTAL_ENEMIES = 3;
			DISTANCE_ENEMIES = 3;		
		    }
		}
		else{
		    TOTAL_ENEMIES = 1;
		    DISTANCE_ENEMIES = 1;
		}
		this.enemyDistancePool.destroy(true);
		this.enemyDistanceTextPool.destroy(true);
		this.bombPool.destroy(true);
		this.bombTextPool.destroy(true);
		//this.bombOnMouseText.destroy(true);

		this.enemyDistancePool_Setup();
		this.bombPool_Setup();
		this.bombPool.forEach(function(bomb) {
		    this.simulationTime = this.simulationTime + bomb.time; 
		    // this.explosionTimeCounter = bomb.time; // Time counter
		}, this);
		this.bombOnMouse.reset(this.blackHoleButton.x, this.blackHoleButton.y);
		// this.bombOnMouseText.x = this.bombOnMouse.x;
		// this.bombOnMouseText.y = this.bombOnMouse.y;
		// this.bombOnMouseText.visible = true;

		this.roundText.text = 'Ronda \n' +(TIMES_TO_PASS-this.timesPassed+1)+ '/7';
		// Display for the time of the bomb.
		/*var bomb = this.bombPool.getFirstExists(false);	
		this.bombOnMouseText = this.add.text(this.blackHoleButton.x, this.blackHoleButton.y, '' + bomb.time, { font: "20px Arial", fill : "#000000", align: "left"}, this.otherTextPool);
		this.bombOnMouseText.anchor.setTo(0.5, 0.5);
		*/
		// Display for the time of the bomb.
		//var bomb = this.bombPool.getFirstExists(false);	
		//this.blackHoleButtonText = '' + bomb.time;
		
		// this.explosionTimeCounter = bomb.time;
		numberOfBombs = DISTANCE_ENEMIES;
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
	// this.buttonPanel.kill();
	// this.blackHoleButton.destroy();
	this.homeButton.destroy();
	buttons.destroy(true);
	// this.selector.destroy(true);
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
	    this.level += 1;
	    nextState = 'WinnerMenu';
	} else {
	    //	You go to the game over menu.
	    time = 0;
	    // level = 1;
	    nextState = 'GameOverMenu';
	}
	if(goHome){
	    nextState = 'MainMenu';
	}
	this.start_Game(nextState,time,this.level,this.score);
	
	/*
	this.state.start(nextState, true, false, time, this.level,this.score,
			 this.activate_Enemy_Shield,
			 this.allign_X,
			 this.allign_Y,
			 this.begin_Game,
			 this.blackHoleButton_Setup,
			 this.blackScreen_Displays_Setup,
			 this.bombOnMouse_Setup,
			 this.bombPool_Setup,
			 this.buttonPanel_Setup,
			 this.cannonButton_Setup,
			 this.cannonOnMouse_Setup,
			 this.cannonPool_Setup,
			 this.selectorButtonsPool_Setup,
			 this.countdown,
			 this.deactivate_Enemy_Shield,
			 this.decrease_Fire,
			 this.decrease_Time_Shield,
			 this.desallign_X,
			 this.desallign_Y,
			 this.displays_Setup,
			 this.find_Grid_Place,
			 this.enemy_Fire,
			 this.enemy_Hit,
			 this.enemy_ShieldTime_Text_Setup,
			 this.enemyBulletPool_Setup,
			 this.enemyDistancePool_Setup,
			 this.enemyTimePool_Setup,
			 this.enemyVelocityLaserPool_Setup,
			 this.enemyVelocityPool_Setup,
			 this.fire,
			 this.get_Enemy_Distance_Speed,
			 this.get_Enemy_Time_Speed,
			 this.go_To_Home,
			 this.homeButton_Setup,
			 this.increase_Fire,
			 this.increase_Time_Shield,
			 this.lockedButtons_Setup,
			 this.make_Grid,
			 this.minusButton_Setup,
			 this.missilePool_Setup,
			 this.out_Of_GridY,
			 this.playButton_Setup,
			 this.plusButton_Setup,
			 this.put_Weapon,
			 this.select_Bomb,
			 this.select_Cannon,
			 this.select_Shield,
			 this.selector_Setup,
			 this.set_Missile_Speed,
			 this.set_Shield_Time,
			 this.shield_Hit,
			 this.shieldButton_Setup,
			 this.shieldOnMouse_Setup,
			 this.shieldPool_Setup,
			 this.shieldSelectorButtonsPool_Setup,
			 this.shuffleBag_Bomb_Get,
			 this.shuffleBag_Bomb_Restart,
			 this.shuffleBag_Bomb_Setup,
			 this.shuffleBag_Velocity_Get,
			 this.shuffleBag_Velocity_Restart,
			 this.shuffleBag_Velocity_Setup,
			 this.shuffleBag_X_Axis_Get,
			 this.shuffleBag_X_Axis_Restart,
			 this.shuffleBag_X_Axis_Setup,
			 this.start,
			 this.try_To_Destroy,
			 this.try_To_Destroy_Time,
			 this.try_To_Destroy_Velocity,
			 this.you_Got_Shot);*/
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