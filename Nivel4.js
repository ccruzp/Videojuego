BasicGame.Nivel4 = function(game) {

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
    
    SHUFFLEBAG_ELEMENTS = 27; //Number of elements in the shuffle bag
    
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
    this.bombOnMouseText; // Text display for the time in which the bomb will explode
    this.cannonButtonText; // Text display for the speed of the missile.

    this.initialLevelText; //Text with the level name shown in the blackScreen
    this.initialInstructionText;//Text with instruction shown in blackScreen
    this.mouseToContinueText; //Text that says "press the mouse, dude" SHOULD BE A CONSTANT

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
    this.simulationTime

    // Variable to play the level multiple times
    this.timesPassed;
    
    //Aligned enemy in the grid.
    this.enemyPlace = 6;
    
    //equations for the kids to enjoy
    //this.enemyShieldSpeed = 2.5;
    // this.enemyGridDistance = 1;
};

BasicGame.Nivel4.prototype = {

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
		   cannonSelectorButtonsPool_Setup,
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
	// console.log(level);
	this.score = score;
	this.level = level;
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
	this.cannonSelectorButtonsPool_Setup = cannonSelectorButtonsPool_Setup;
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
    
    create: function() {
	this.cannon;
	BOMB_TOTAL_TIME = 3;
	ENEMY_VELOCITY = 3; // Velocity of the enemy
	//--------------------------------
	TIMES_TO_PASS = 5;	
	this.timesPassed = TIMES_TO_PASS;
	this.simulationTime = 0;

	//The message given to the player this level
	//this.levelMessage = 'Dispara a la velocidad correcta para destruir al enemigo.';
	this.levelMessage = 'Dispara a la velocidad correcta para detener al enemigo.';
	//ENEMY_SHIELD_SPEED = 2.5; //Refer to this.enemyShieldSpeed
	
	DISTANCE_ENEMIES = 0; // Amount of distance enemies
	VELOCITY_ENEMIES = 1; // Amount of velocity enemies
	TIME_ENEMIES = 0;
	TOTAL_ENEMIES = DISTANCE_ENEMIES + VELOCITY_ENEMIES; // Total amount of enemies on the level
	TIMES_TO_PASS = 7;
	this.timesPassed = TIMES_TO_PASS;
    
	// Initializing boolean variables.
	started = false; // Boolean that says if the game has begun.
	goHome = false; //Boolean used to return to the main Menu
	shot = false; // Boolean that says if the cannons have shot.
	enemyShield = true; // Boolean that says if the shields are activated.
	selectedSpeed = false; // Boolean that says if the player selected a speed for the cannon.
	missileSpeed = 0; // The speed of the missiles.
	placedBomb = false; // Says if a bomb has been placed on the grid.
	lastValueHigh = true; //Auxiliar boolean to control variability of cases  
	lastMultiplicationValue = 88;
	tutorial = false;
	following = false;
	// Booleans that says if the player is using a weapon.
	// A player should not be able of using more than a weapon at a time
	//-------------------------------------------------------------
	usingBlackHole = false; // Says if the player selected the bomb.
	usingCannon = false; // Says if the player selected the cannon.
	usingShield = false;
	//-------------------------------------------------------------
	this.beginGame = true;
	this.lost = false;
	placedBomb = false; // Says if a bomb has been placed on the grid.
	numberOfBombs = DISTANCE_ENEMIES; // Number of bombs available in this level.
	numberOfCannons = VELOCITY_ENEMIES; // Number of cannons available in this level.
	
	//Beep sound of the bomb
	bombBeep = this.add.audio('bombBeep');

	//Sound of the exploding bomb
	blackHoleSound = this.add.audio('blackHoleSound');
	
	//Clock Sound
	clockSound = this.add.audio('clock');

	background = this.add.sprite(0, 0, 'background'); // Creating background.
	this.physics.startSystem(Phaser.Physics.ARCADE); //Game physics system.

	// //this.enemyDistance = this.game.rnd.integerInRange(1, 10);
	// //Sets the value of enemyShieldSpeed and enemyGridDistance
	// this.get_Enemy_Distance_Speed();
	
	//this.enemyShieldSpeed = 10/(this.game.rnd.integerInRange(1, 10));
	//this.enemyShieldSpeed = this.enemyShieldSpeed.toPrecision(3);
	
	option = 2;
	this.make_Grid(option); //Creates game grid
	
	this.enemyOutOfGrid = false; // Start the game inside the grid.
	
	//this.gridLine_Setup();
	/*
	this.line = this.add.sprite(1000, 1000,'ground');
	//this.line.scale.setTo(2.25,0.4); Use this for grid_space = 50
	this.line.scale.setTo(1.52, 0.4);
	this.line.anchor.setTo(0, 0.5);
	*/

	this.shuffleBag_Velocity_Setup(); //Sets up the shuffle bag
	this.shuffleBag_X_Axis_Setup();
	this.shuffleBag_Bomb_Setup();
	
	this.enemyVelocityPool_Setup(); // Setup the enemies.
	this.bombPool_Setup(); // Create the bombs.
	this.missilePool_Setup(); // Creating the missiles for the cannons.
	this.cannonPool_Setup(); // Create the cannonPool.
	this.enemyVelocityLaserPool_Setup();
	
	// Counters.
	//this.timeCounter = TOTAL_TIME; // Game's time counter. Not used
	this.explosionTimeCounter = BOMB_TOTAL_TIME; // Bomb's time counter.

	// Creates the button's panel.
	// this.buttonPanel_Setup();
	
	// Creates the cannon's and shield's selector panels.
	// this.selector_Setup();
	
	// Creates the cannon's selector's buttons.
	this.cannonSelectorButtonsPool_Setup();
	
	buttons = this.add.group(); // Group for buttons.

	this.blackHoleButton_Setup(); // Creates the black hole button.
	this.cannonButton_Setup(); // Creates the cannon button.
	this.playButton_Setup(); // Creates the play button.
	this.homeButton_Setup(); // Creates the Home Button
	
	this.lockedButtons_Setup(); // Creates the locked buttons.

	//this.bombOnMouse_Setup(); // Image that appears on the mouse when the black hole bomb button is pressed.

	this.cannonOnMouse_Setup(); // Image that appears on the mouse when the cannon button is pressed.

	// Creating the text displays.
	this.displays_Setup();

	// Enemy's shieldTime text
	this.enemy_ShieldTime_Text_Setup();

	this.timeOfGame = this.time.now; // Score counter.

	this.input.onDown.add(this.put_Weapon, this); // Mouse input.

	this.time.events.loop(Phaser.Timer.SECOND, this.countdown, this); // Every second activates this.countdown.

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
    update: function() {
	// If an enemy and a bomb overlaps this.try_To_Destroy is activated.
	this.physics.arcade.overlap(this.enemyVelocityPool, this.missilePool, this.try_To_Destroy_Velocity, null, this);
	// this.physics.arcade.overlap(this.enemyVelocityLaserPool, this.cannonPool, this.destroy_Missile_And_Cannon, this);
	this.physics.arcade.overlap(this.enemyVelocityLaserPool, this.cannonPool, function(laser, cannon) {
	    var missile = this.missilePool.getAt(this.cannonPool.getIndex(cannon));
	    missile.kill();
	    laser.events.onAnimationComplete.add(function() {
		// missile.kill();
		cannon.kill();
		laser.kill();
		this.lost = true;
	    }, this);
	    
	}, null, this);

	//Hide the weapons cursors
	// this.bombOnMouse.reset(1000, 1000);
	// this.cannonOnMouse.reset(1000, 1000);

	
	if (usingBlackHole) {
	    this.find_Grid_Place();
	    x = this.allign_X(this.gridX - 0.5);
	    y = this.allign_Y(this.gridY - 0.5);
	    this.bombOnMouse.reset(x, y);
	    
	    // Display for the time of the bomb.
	    var bomb = this.bombPool.getFirstExists(false);	
	    var text = this.bombTextPool.getAt(this.bombPool.getIndex(bomb));
	    text.visible = true;
	    text.text = bomb.time;
	    text.x = x;
	    text.y = y;
	} else if (usingCannon) {
	     this.find_Grid_Place();
	     x = this.allign_X(this.gridX - 0.5);
	     y = 460;
	     // this.cannonOnMouse.reset(x, y);
	}

	if(DISTANCE_ENEMIES > 0){
	    if (following) {
		this.bombOnMouse.reset(this.input.x, this.input.y);
		this.bombOnMouseText.x = this.input.x;
		this.bombOnMouseText.y = this.input.y;
		this.bombOnMouseText.text = '' + this.bombTextPool.getAt(movingBombID).text;
	    } else {

		// The amount of bombs remaining.
		this.bombOnMouseText.x = this.bombOnMouse.x;
		this.bombOnMouseText.y = this.bombOnMouse.y;
		var bomb = this.bombPool.getFirstExists(false);	
		if(bomb!= null) {
		    this.bombOnMouseText.text = '' + bomb.time;
		    this.bombOnMouseText.visible = true;
		}
	    }
	}
	// Update Displays
	this.bombsRemainingText.text = 'x' + numberOfBombs;
	this.scoreText.text = '' + this.score;

	// Display for the time of the bomb.
	//var bomb = this.bombPool.getFirstExists(false);	
	//if(bomb!= null) this.blackHoleButtonText.text = '' + bomb.time;
	
	// Updating existing bomb's text display.
	this.bombPool.forEachAlive(function(bomb) {
	    var text = this.bombTextPool.getAt(this.bombPool.getIndex(bomb));
	    text.text = bomb.counter;
	    text.visible = (bomb.counter > 0);
	}, this);
	
	// // Updating buttons displays
	// this.cannonButtonText.text = '' + missileSpeed;
	
	// If the game started move enemies.
	if (started) {
	    //Reproduces the clock sound
	    if(!clockSound.isPlaying){
		clockSound.play('',0,0.1,false,false);
	    }
	    
	    this.cannonPool.forEachAlive(function(cannon) {
		
		if(this.missilePool.countLiving() < VELOCITY_ENEMIES && !cannon.shot) {
		    this.fire(cannon);
		}
	    }, this);
	}else{
	    //Stops the sound of the clock when the game is stopped
	    clockSound.pause();
	}
	
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

	if (!this.enemyVelocityPool.getFirstAlive()) {
	    this.timesPassed -=1;
	    
	    if(this.timesPassed ==0){
		this.quit_Game(true);
	    }else{
		//Resets the enemies and bombs, maybe should be a function
		//------------------------------------------------------------
		
		//Destroy every sheet
		this.enemyVelocityPool.destroy(true);
		this.bombPool.destroy(true);
		this.bombTextPool.destroy(true);
		this.missilePool.destroy(true);
		this.cannonPool.destroy(true);
		this.cannonTextPool.destroy(true);
		this.enemyVelocityLaserPool.destroy(true);
		this.shieldTimeText.destroy(true);
		
		//Set number of enemies in the next wave
		if(this.timesPassed > 5){
		    DISTANCE_ENEMIES = 0; 
		    VELOCITY_ENEMIES = 1; 
		    TOTAL_ENEMIES = DISTANCE_ENEMIES + VELOCITY_ENEMIES;
		} else if (this.timesPassed > 3){
		    DISTANCE_ENEMIES = 0; 
		    VELOCITY_ENEMIES = 2; 
		    TOTAL_ENEMIES = DISTANCE_ENEMIES + VELOCITY_ENEMIES;
		}else {
		    DISTANCE_ENEMIES = 0; 
		    VELOCITY_ENEMIES = 3; 
		    TOTAL_ENEMIES = DISTANCE_ENEMIES + VELOCITY_ENEMIES;
		}
		
		//Reconstruct every sheet
		this.enemyVelocityPool_Setup(); // Setup the enemies.
		this.bombPool_Setup(); // Create the bombs.
		this.missilePool_Setup(); // Creating the missiles 
		this.cannonPool_Setup(); // Create the cannonPool.
		this.enemyVelocityLaserPool_Setup();
		this.enemy_ShieldTime_Text_Setup(); // Enemy's shieldTime text
		if(DISTANCE_ENEMIES > 0){
		    this.bombOnMouse.reset(this.blackHoleButton.x, this.blackHoleButton.y);
		    // this.bombOnMouse.reset(this.world.width/2, this.world.height - 82);
		}
		this.roundText.text = 'Ronda \n' +(TIMES_TO_PASS-this.timesPassed+1)+ '/7';
		/*
		this.enemyVelocity = this.shuffleBag_Bomb_Get();
		this.bombTime = this.game.rnd.integerInRange(2, Math.floor((10/this.enemyVelocity)));
		this.explosionTimeCounter = this.bombTime;
<<<<<<< HEAD
		this.bombOnMouseText.text=  '' + this.explosionTimeCounter;
		
=======
		this.blackHoleButtonText.text=  '' + this.explosionTimeCounter;
		*/
		/*
>>>>>>> variableEnemies
		this.enemyVelocityPool.forEach(function(enemy) {
		    this.get_Enemy_Distance_Speed(enemy);    
		    console.log('posicion' + enemy.pos);
		    console.log('tiempo' + enemy.shieldTime);
		    this.simulationTime = this.simulationTime + enemy.shieldTime; 
	
		    initialY =this.allign_Y(10-enemy.pos);
		    this.enemyPlace = this.shuffleBag_X_Axis_Get();
		    
		    aux1 = this.allign_X(this.enemyPlace)-(GRID_SPACE/2);
		    enemy.frame = 1;
		    enemy.reset(aux1, initialY);
		    enemy.body.setSize(100, 100, 0, 0);
		    //enemy.animations.play('shield');
		    
		    var text = this.shieldTimeText.getAt(this.enemyVelocityPool.getIndex(enemy));
		    text.visible = true;
		    text.x = enemy.x + 25;
		    text.y = enemy.y;
		    text.text = 'Tiempo: ' + enemy.shieldTime;
		},this);
		*/
		/*
		this.cannonPool.forEach(function(cannon){
		    cannon.kill();
		    cannon.shot = false;
		    var text = this.cannonTextPool.getAt(this.cannonPool.getIndex(cannon));
		    text.visible = false;
		},this); 
		*/
		/*
		this.enemyVelocityLaserPool.forEach(function(laser){
		    laser.kill();
		},this);
		*/
		this.explosionTimeCounter = this.bombTime;
		missileSpeed = 0;
		numberOfBombs = DISTANCE_ENEMIES;
		numberOfCannons = VELOCITY_ENEMIES;
		shot = false;
		placedBomb = false;
		started = false;
	    //------------------------------------------------------------
	    }
	    
	}
	// If an enemy reaches the botom of the grid you lose the game.
	this.enemyVelocityPool.forEachAlive(function(enemy) {
	    verticalLength = this.allign_Y(ROWS_NUMBER+0.7) ; 
	    if (enemy.body.y > (verticalLength)) this.enemyOutOfGrid = true;
	}, this);
	
	if (this.lost) {
	    this.quit_Game(false);
	}
	// if (this.enemyOutOfGrid) {
	//     this.quit_Game(false);
	// }
    },
    
    // Destroys everything created and moves to the winner's menu or the game 
    // over menu.
    quit_Game: function(won) {	
	bombBeep.stop();
	clockSound.stop();
	this.homeButton.destroy();
	buttons.destroy(true);
	lockedButtons.destroy(true);
	this.bombTextPool.destroy(true);
	this.shieldTimeText.destroy(true);
	this.otherTextPool.destroy(true);
	this.bombPool.destroy(true);
	// this.selector.destroy(true);
	// this.buttonPanel.kill();
	background.kill();
	if (won) {
	    time = this.time.elapsedSecondsSince(this.timeOfGame);
	    time = time - this.simulationTime;
	    time = time - TIMES_TO_PASS * 4;
	    
	    //time = this.timeOfGame;
	    this.level += 1;
	    nextState = 'WinnerMenu';
	} else {
	    //	Then let's go back to the game over menu.
	    time = 0;
	    // level = 2;
	    nextState = 'GameOverMenu';
	}
	if(goHome){
	    nextState = 'MainMenu';
	}
	this.start_Game(nextState,time,this.level,this.score);
	/*
	this.state.start(nextState, true, false, 
			 time, this.level,this.score,
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
			 this.cannonSelectorButtonsPool_Setup,
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
        
// <<<<<<< HEAD
// =======
//     get_Enemy_Distance_Speed: function(){
	
// 	aux = this.game.rnd.integerInRange(1, 27);
// 	if (aux > 13){
// 	    if (aux > 20){
// 		if(aux>23){
// 		    if(aux == 24) {
// 			this.enemyGridDistance = 10;
// 			this.enemyShieldSpeed = 1;
// 		    }
// 		    if(aux == 25) {
// 			this.enemyGridDistance = 10;
// 			this.enemyShieldSpeed = 2;
// 		    }
// 		    if(aux == 26) {
// 			this.enemyGridDistance = 10;
// 			this.enemyShieldSpeed = 5;
// 		    }
// 		    if(aux == 27) {
// 			this.enemyGridDistance = 10;
// 			this.enemyShieldSpeed = 10;
// 		    }
// 		}else{
// 		    if(aux == 21) {
// 			this.enemyGridDistance = 9;
// 			this.enemyShieldSpeed = 1;
// 		    }
// 		    if(aux == 22) {
// 			this.enemyGridDistance = 9;
// 			this.enemyShieldSpeed = 3;
// 		    }
// 		    if(aux == 23) {
// 			this.enemyGridDistance = 9;
// 			this.enemyShieldSpeed = 9;
// 		    }
// 		}
// 	    }else{
// 		if(aux>17){
// 		    if(aux == 18) {
// 			this.enemyGridDistance = 8;
// 			this.enemyShieldSpeed = 2;
// 		    }
// 		    if(aux == 19) {
// 			this.enemyGridDistance = 8;
// 			this.enemyShieldSpeed = 4;
// 		    }
// 		    if(aux == 20) {
// 			this.enemyGridDistance = 8;
// 			this.enemyShieldSpeed = 8;
// 		    } 
// 		}else{
// 		    if(aux == 14) {
// 			this.enemyGridDistance = 6;
// 			this.enemyShieldSpeed = 6;
// 		    }
// 		    if(aux == 15) {
// 			this.enemyGridDistance = 7;
// 			this.enemyShieldSpeed = 1;
// 		    }
// 		    if(aux == 16) {
// 			this.enemyGridDistance = 7;
// 			this.enemyShieldSpeed = 7;
// 		    }
// 		    if(aux == 17) {
// 			this.enemyGridDistance = 8;
// 			this.enemyShieldSpeed = 1;
// 		    }
// 		}
// 	    }
// 	}else{
	    
// 	    if (aux > 7){
// 		if(aux>10){
// 		    if(aux == 11) {
// 			this.enemyGridDistance = 6;
// 			this.enemyShieldSpeed = 1;
// 		    }
// 		    if(aux == 12) {
// 			this.enemyGridDistance = 6;
// 			this.enemyShieldSpeed = 2;
// 		    }
// 		    if(aux == 13) {
// 			this.enemyGridDistance = 6;
// 			this.enemyShieldSpeed = 3;
// 		    } 
// 		}else{
// 		    if(aux == 8) {
// 			this.enemyGridDistance = 4;
// 			this.enemyShieldSpeed = 4;
// 		    }
// 		    if(aux == 9) {
// 			this.enemyGridDistance = 5;
// 			this.enemyShieldSpeed = 1;
// 		    }
// 		    if(aux == 10) {
// 			this.enemyGridDistance = 5;
// 			this.enemyShieldSpeed = 5;
// 		    }
// 		}
// 	    }else{
// 		if(aux>4){
// 		    if(aux == 5) {
// 			this.enemyGridDistance = 3;
// 			this.enemyShieldSpeed = 3;
// 		    }
// 		    if(aux == 6) {
// 			this.enemyGridDistance = 4;
// 			this.enemyShieldSpeed = 1;
// 		    }
// 		    if(aux == 7) {
// 			this.enemyGridDistance = 4;
// 			this.enemyShieldSpeed = 2;
// 		    } 
// 		}else{
// 		    if(aux == 1) {
// 			this.enemyGridDistance = 2;
// 			//Distance = 1 is no longer used
// 			//Because is too close to the cannon
// 			/*this.enemyGridDistance = 1;*/
// 			this.enemyShieldSpeed = 1;
// 		    }
// 		    if(aux == 2) {
// 			this.enemyGridDistance = 2;
// 			this.enemyShieldSpeed = 1;
// 		    }
// 		    if(aux == 3) {
// 			this.enemyGridDistance = 2;
// 			this.enemyShieldSpeed = 2;
// 		    }
// 		    if(aux == 4) {
// 			this.enemyGridDistance = 3;
// 			this.enemyShieldSpeed = 1;
// 		    }
// 		}    
// 	    }
	    
// 	}
// 	console.log(aux);
// 	console.log(this.enemyGridDistance);
// 	console.log(this.enemyShieldSpeed);
//     },
// >>>>>>> 15591947b44f925a54d43b0defc9e55c25554336

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
    // 	if (this.enemyVelocityLaserPool.countLiving() > 0) {
    // 	    this.enemyVelocityLaserPool.forEachAlive(function(laser) {
    // 		this.game.debug.body(laser, false, 'rgb(255, 0, 0)');
    // 	    }, this);
    // 	}
    // }
};
