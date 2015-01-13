BasicGame.Nivel3 = function(game) {

    //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    //Grid Stuff
    //----------------------------------------------------------------------
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
    
    TIMES_TO_PASS = 5;      //Number of times that the level is needed to be passed

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
    this.initialLevelText; //Text with the level name shown in the blackScreen
    this.initialInstructionText;//Text with instruction shown in blackScreen
    this.mouseToContinueText; //Text that says "press the mouse, dude" SHOULD BE A CONSTANT
    
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
    this.simulationTime;
    
    // Variable to play the level multiple times
    this.timesPassed = TIMES_TO_PASS;
    
    //Aligned enemy in the grid.
    this.enemyPlace = 6;
    
    //Instruction Screen 
    this.blackScreen;
    this.beginGame = false;
};

BasicGame.Nivel3.prototype = {

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
		   try_To_Destroy,
		   try_To_Destroy_Time,
		   try_To_Destroy_Velocity,
		   you_Got_Shot){
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
	this.try_To_Destroy = try_To_Destroy;
	this.try_To_Destroy_Time = try_To_Destroy_Time;
	this.try_To_Destroy_Velocity = try_To_Destroy_Velocity;
	this.you_Got_Shot = you_Got_Shot;
    },

    
    create: function() {

	//Why is this here????------------------------------------------------
	// Initializing boolean variables.
	TOTAL_TIME = 400; // Time for explosion
	BOMB_TOTAL_TIME = 3;
	ENEMY_VELOCITY = 3; // Velocity of the enemy
	ENEMY_SHIELD_SPEED = 2.5;
	DISTANCE_ENEMIES = 0; // Amount of distance enemies
	VELOCITY_ENEMIES = 0; // Amount of velocity enemies
	TIME_ENEMIES = 1;
	TOTAL_ENEMIES = DISTANCE_ENEMIES + VELOCITY_ENEMIES + TIME_ENEMIES; // Total amount of enemies on the level
	//Why is this here????------------------------------------------------
	
	TIMES_TO_PASS = 5;	
	this.timesPassed = TIMES_TO_PASS;
	this.simulationTime = 0;
	//The message given to the player this level
	this.levelMessage = 'Activa el escudo en el momento correcto para devolver\n                         el disparo al enemigo.';
	//this.beginGame = true;

	started = false; // Boolean that says if the game has begun.
	console.log("TURURUR " + started);
	lost = false; // Boolean that says if the game has been lost.
	shot = false; // Boolean that says if the cannons have shot.
	enemyShield = true; // Boolean that says if the shields are activated.
	enemyShot = false; // Boolean that says if the enemy has shoot.
	shotRebound = false // Boolean that says if the bullet rebounded on a shield.

	missileSpeed = 0; // The speed of the missile shot by the player.
	shieldTime = 0; // The time in which the shield will activate.
	enemyBulletSpeed = 2; // Speed of the bullets shot by the timeEnemy.
	console.log('Im at level 3');
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

//-----------------------------------------------------
//----------------- Sounds ----------------------------
	//Beep sound of the bomb
	bombBeep = this.add.audio('bombBeep');

	//Beep sound of the bomb
	clockSound = this.add.audio('clock');
//----------------------------------------------------

	// Creating the grid for the game.
	option = 2;
	this.make_Grid(option);
	
	this.enemyOutOfGrid = false; // Start the game inside the grid.

	this.shuffleBag_X_Axis_Setup();
	this.shuffleBag_Velocity_Setup(); //Sets up the shuffle bag
	this.shuffleBag_X_Axis_Setup();
	this.shuffleBag_Bomb_Setup();
	
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
	this.enemyBulletPool_Setup(); // Creating the enemies' bullets.
	this.enemyTimePool_Setup(); // Setup the enemies.
	this.bombPool_Setup(); // Create the bombs.
	this.missilePool_Setup(); // Creating the bullets for the cannons.
	this.cannonPool_Setup(); // Create the cannonPool.
	this.shieldPool_Setup(); // Create the shieldPool.
	
	// Counters.
	this.timeCounter = TOTAL_TIME; // Game's time counter.
	this.explosionTimeCounter = BOMB_TOTAL_TIME; // Bomb's time counter.

	// The buttons panel
	this.buttonPanel_Setup();
	this.selector_Setup();
	this.cannonSelectorButtonsPool_Setup();
	this.shieldSelectorButtonsPool_Setup();
	buttons = this.add.group(); // Group for buttons.

	this.blackHoleButton_Setup(); // Creates the black hole button.
	this.cannonButton_Setup(); // Creates the cannon button.
	this.shieldButton_Setup(); // Creates the shield button.
	this.playButton_Setup(); // Creates the play button.
	// this.lockedButtons_Setup(); // Creates the locked buttons.

	// Creating the text displays.
	this.displays_Setup();
	// Score Texts
	// this.scoreText_Setup();
	
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
	// this.physics.arcade.overlap(this.enemyVelocityPool, this.bulletPool, this.try_To_Destroy_Time, null, this);
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
	
	// The amount of bombs remaining.
	this.bombsRemainingText.text = 'x' + numberOfBombs;

	// Updating existing bomb's text display.
	this.bombPool.forEachAlive(function(bomb) {
	    var text = this.bombTextPool.getAt(this.bombPool.getIndex(bomb));
	    text.text = this.explosionTimeCounter;
	    text.visible = (this.explosionTimeCounter > 0);
	}, this);
	
	// Updating buttons displays
	// this.cannonButtonText.text = '' + missileSpeed;
	// this.shieldButtonText.text = '' + shieldTime;

	//Update score display
	this.scoreText.text = '' + this.score;
	
	// Updating shield sprite.
	this.shieldPool.forEachAlive(function(shield) {
	    if (shield.shieldActive) {
		shield.frame = 1;
	    } else {
		shield.frame = 0;
	    }
	}, this);
	// If the game started move enemies.
	if (started) {
	    //Reproduces the clock sound
	    if(!clockSound.isPlaying){
		clockSound.play('', 0, 0.1, false, false);
	    }

	    this.cannonPool.forEachAlive(function(cannon) {
		if(this.missilePool.countLiving() < VELOCITY_ENEMIES && !cannon.shot) {
		    this.fire(cannon);
		}
	    }, this);

	    this.enemyBulletPool.forEachAlive(function(bullet) {
		this.out_Of_GridY(bullet);
	    }, this);
	    
	    if (!enemyShot) {
		this.enemyTimePool.forEachAlive(function(enemy) {
	    	    this.enemy_Fire(enemy);
		}, this);
		this.shieldPool.forEachAlive(function(shield) {
		    this.time.events.add(Phaser.Timer.SECOND * (shield.time - 0.14), function(shield) {
			shield.shieldActive = true;
		    }, this, shield);
		    this.time.events.add(Phaser.Timer.SECOND * (shield.time + 0.2), function(shield) {
			shield.shieldActive = false;
		    }, this, shield);
		}, this);
	    }
	    // if (lost) {
	    // 	this.quit_Game(false);
	    // }
	}else{
	    //Stops the sound of the clock when the game is stopped
	    clockSound.pause();
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
	    console.log('im here');
	    this.timesPassed -=1;
	    
	    if(this.timesPassed == 0){
		this.quit_Game(true);
	    } else{
		
		//Resets the enemies and bombs, maybe should be a function
		
		this.enemyBulletPool.destroy(true);
		this.enemyTimePool.destroy(true);
		this.enemyTimeTextPool.destroy(true);
		this.bombPool.destroy(true);
		this.bombTextPool.destroy(true);
		this.missilePool.destroy(true);
		this.cannonPool.destroy(true);
		this.cannonTextPool.destroy(true);
		this.shieldPool.destroy(true);
		this.shieldTextPool.destroy(true);

		//Set number of enemies in the next wave
		if(this.timesPassed > 3){
		    DISTANCE_ENEMIES = 0; // Amount of distance enemies
		    VELOCITY_ENEMIES = 0; // Amount of velocity enemies
		    TIME_ENEMIES = 1;
		    TOTAL_ENEMIES = DISTANCE_ENEMIES + VELOCITY_ENEMIES + TIME_ENEMIES;
		} else if (this.timesPassed > 1){
		    DISTANCE_ENEMIES = 0; // Amount of distance enemies
		    VELOCITY_ENEMIES = 0; // Amount of velocity enemies
		    TIME_ENEMIES = 2;
		    TOTAL_ENEMIES = DISTANCE_ENEMIES + VELOCITY_ENEMIES + TIME_ENEMIES;
		}else {
		    DISTANCE_ENEMIES = 0; // Amount of distance enemies
		    VELOCITY_ENEMIES = 0; // Amount of velocity enemies
		    TIME_ENEMIES = 3;
		    TOTAL_ENEMIES = DISTANCE_ENEMIES + VELOCITY_ENEMIES + TIME_ENEMIES;
		}
		
		this.enemyBulletPool_Setup(); // Creating the enemies' bullets.
		this.enemyTimePool_Setup(); // Setup the enemies.
		this.bombPool_Setup(); // Create the bombs.
		this.missilePool_Setup(); // Creating the bullets
		this.cannonPool_Setup(); // Create the cannonPool.
		this.shieldPool_Setup(); // Create the shieldPool.
	

		//------------------------------------------------------------
		// this.get_Enemy_Distance_Speed();
		/*
		this.enemyVelocity = this.game.rnd.integerInRange(1, ROWS_NUMBER/2);
		this.bombTime = this.game.rnd.integerInRange(2, Math.floor((10/this.enemyVelocity)));
		this.explosionTimeCounter = this.bombTime;
		this.blackHoleButtonText.text=  '' + this.explosionTimeCounter;
		shieldTime = 0;
		//this.shieldButtonText.text = '' + shieldTime;

		this.enemyTimePool.forEach(function(enemy) {
		    this.get_Enemy_Distance_Speed(enemy);
		    this.simulationTime = this.simulationTime + 2*(enemy.pos/enemy.shieldTime);	   
		    initialY =this.allign_Y(10-enemy.pos)
		    this.enemyPlace = this.game.rnd.integerInRange(1, COLUMNS_NUMBER);
		    aux1 = this.allign_X(this.enemyPlace) -(GRID_SPACE/2);
		    enemy.frame = 1;
		    enemy.reset(aux1, initialY);
		    enemy.body.setSize(100, 100, 0, enemy.height/2);
		    
		    var text = this.enemyTimeTextPool.getAt(this.enemyTimePool.getIndex(enemy));
		    text.visible = true;
		    text.x = (this.allign_X(this.enemyPlace))+38;
		    text.y = enemy.y;
		    text.text = 'Escudo: ' + enemy.shieldTime;
		
		}, this);
		
		this.cannonPool.forEach(function(cannon){
		    cannon.kill();
		},this);
		this.enemyBulletPool.setAll('angle',180);
		
		this.shieldPool.forEach(function(shield){
		    this.shieldTextPool.getAt(this.shieldPool.getIndex(shield)).visible = false;
		    shield.kill();
		},this); 
		*/
		this.explosionTimeCounter = this.bombTime;
		numberOfBombs = TOTAL_ENEMIES;
		numberOfCannons = TOTAL_ENEMIES
		numberOfShields = TOTAL_ENEMIES;
		shot = false;
		placedBomb = false;
		enemyShield = false;
		shotRebound = false;
		enemyShot = false;
		started = false;
		//------------------------------------------------------------
	    }	
	}
	// If an enemy reaches the botom of the grid you lose the game.
	// this.enemyVelocityPool.forEachAlive(function(enemy) {
	//     verticalLength = this.allign_Y(ROWS_NUMBER+0.7) ; 
	//     if (enemy.body.y > (verticalLength)) this.enemyOutOfGrid = true;
	// }, this);
	if (this.enemyOutOfGrid || lost) {
	    this.quit_Game(false);
	}
    },
    // // Creates the button for the cannon.
    // cannonButton_Setup: function() {
    // 	this.cannonButton = this.add.button(300, this.world.height - 60, 'cannonButton', this.select_Cannon, this, null, null, 1, 1);
    // 	this.cannonButton.anchor.setTo(0.5, 0.5);
    // 	this.cannonButton.scale.setTo(0.4, 0.4);
    // 	buttons.add(this.cannonButton);
    // 	this.minusButton_Setup(this.cannonButton, this.decrease_Fire);
    // 	this.plusButton_Setup(this.cannonButton, this.increase_Fire);
    // },
   
    // Creates the velocity enemies of the level.
    /*
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
    */
/*    
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

	    } else if (usingCannon // && selectedSpeed
		       && numberOfCannons > 0 && missileSpeed > 0) {
	    	x = this.allign_X(this.gridX - 0.5);
	    	y = 460;
	    	this.cannon = this.cannonPool.getFirstExists(false);
	    	this.cannon.body.setSize(10, 10);
	    	this.cannon.reset(x, y);
	    	this.cannon.shotVelocity = missileSpeed;
	    	numberOfCannons -= 1;
	    	var text = this.cannonTextPool.getAt(this.cannonPool.getIndex(this.cannon));
	    	text.visible = true;
	    	text.x = this.cannon.x;
	    	text.y = this.cannon.y + 15;
	    	text.text = '' + this.cannon.shotVelocity;
		
		this.selector.getAt(0).frame = 0;
		this.cannonSelectorButtonsPool.setAll('visible', false);
		this.cannonSelectorButtonsPool.getAt(0).frame = 1;
	    	this.cannonButton.frame = 0;
	    	usingCannon = false;
		selectedSpeed = false;
		missileSpeed = 0;
		// else if (usingCannon && numberOfCannons > 0) {
		// 	x = this.allign_X(this.gridX - 0.5);
		// 	y = 460;
		// 	var cannon = this.cannonPool.getFirstExists(false);
		// 	cannon.body.setSize(10, 10);
		// 	cannon.reset(x, y);
		
		// 	numberOfCannons -= 1;
		
		// 	var text = this.cannonTextPool.getAt(this.cannonPool.getIndex(cannon));
	      // 	text.visible = true;
		// 	text.x = cannon.x;
		// 	text.y = cannon.y + 15;
		// 	text.text = '' + missileSpeed;
		
		// 	this.cannonButton.frame = 0;
		// 	usingCannon = false;
		
	    } else if (usingShield && numberOfShields > 0 && shieldTime > 0) {
		x = this.allign_X(this.gridX - 0.5);
		y = 460;
		var shield = this.shieldPool.getFirstExists(false);
		shield.body.setSize(10, 10);
		shield.reset(x, y);
		shield.time = shieldTime;
		shield.shieldActive = false;
		numberOfShields -= 1;
		var text = this.shieldTextPool.getAt(this.shieldPool.getIndex(shield));
		text.visible = true;
		text.x = shield.x - 1;
		text.y = shield.y;
		text.text = shield.time;
		
		this.selector.getAt(1).frame = 0;
		this.shieldSelectorButtonsPool.setAll('visible', false);
		this.shieldSelectorButtonsPool.getAt(0).frame = 1;
		this.shieldButton.frame = 0;		
		usingShield = false;
		shieldTime = 0;
	    }
 	}
    },
*/
    // Destroys everything created and moves to the winner's menu or the game 
    // over menu.
    quit_Game: function(won) {	
	bombBeep.stop();
	clockSound.stop();
	this.started = false;
	this.bombOnMouse.kill();
	this.bombPool.destroy(true);
	this.missilePool.destroy(true);
	this.enemyBulletPool.destroy(true);
	this.cannonPool.destroy(true);
	buttons.destroy(true);
	// lockedButtons.destroy(true);
	this.otherTextPool.destroy(true);
	// this.playButton.destroy();
	// this.blackHoleButton.destroy();
	// buttons.destroy(true);
	// lockedButtons.destroy(true);
	// this.bombTextPool.destroy(true);
	// this.otherTextPool.destroy(true);
	// this.bombPool.destroy(true);
	this.selector.destroy(true);
	this.buttonPanel.kill();
	background.kill();
	if (won) {
	    time = this.time.elapsedSecondsSince(this.timeOfGame);
	    time = time - this.simulationTime;
	    time = time - TIMES_TO_PASS * 4;
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
			 this.you_Got_Shot);
    },

    shield_Hit: function(shieldGen, bullet) {
	var enemy = this.enemyTimePool.getAt(this.enemyBulletPool.getIndex(bullet));
	// console.log("POS" +  enemy.pos);
	// console.log("VEL" + enemy.shieldTime);
	// console.log("TIME" + shieldGen.time);
	console.log("GOLA" + (enemy.pos == enemy.shieldTime * shieldGen.time));
	console.log("ACTIVE" + shieldGen.shieldActive);
	// if (shieldGen.shieldActive && (enemy.pos == enemy.shieldTime * shieldGen.time)) {
	if (enemy.pos == enemy.shieldTime * shieldGen.time) {
	    console.log("GOL");
	    bullet.angle = 0;
	    bullet.body.velocity.y = -(bullet.body.velocity.y);
	    shotRebound = true;
	} else {
	    lost = true;
	    shieldGen.kill();
	    bullet.kill();
	}
    },
    
    // Creates the shield button.
    shieldButton_Setup: function() {
	this.shieldButton = this.add.button(this.world.width/2 + 67, this.world.height - 50, 'shieldButton', this.select_Shield, this, null, null, 1, 1);
	this.shieldButton.anchor.setTo(0.5, 0.5);
	this.shieldButton.scale.setTo(0.27, 0.27);
	buttons.add(this.shieldButton);
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
	this.shieldTextPool = this.add.group();
	this.shieldPool.forEach(function(shield) {
	    shield.body.setSize(100, 100, 0, -10);
	    shield.inputEnabled = true;
	    shield.events.onInputDown.add(function(shield) {
		this.shieldTextPool.getAt(this.shieldPool.getIndex(shield)).visible = false;
		shield.kill();
		numberOfShields += 1;
	    }, this);
	    var text = this.add.text(0,0, '', { font: "25px Arial", fill: "rgb(0, 0, 0)", align: "left" }, this.shieldTextPool);
	    text.visible = false;
	    text.anchor.setTo(0.5, 0.5);
	}, this);

	// this.shieldPool.forEach(function(shield) {
	//     // Adding the bomb animation to each bomb.
	//     shield.animations.add('shield', [0, 1, 0], 10, false);
	// }, this);
    },
     
    shieldSelectorButtonsPool_Setup: function() {
	this.shieldSelectorButtonsPool = this.add.group();
	var chosen = this.add.sprite(803, 554, 'chosen');
	this.shieldSelectorButtonsPool.add(chosen);
	var button = this.add.button(903, 460, 'button1', function() {this.set_Shield_Time(1)}, this, 1, 0, 1, 0);
	this.shieldSelectorButtonsPool.add(button);
	button = this.add.button(890, 481, 'button2', function() {this.set_Shield_Time(2)}, this, 1, 0, 1, 0);
	this.shieldSelectorButtonsPool.add(button);
	button = this.add.button(916, 481, 'button3', function() {this.set_Shield_Time(3)}, this, 1, 0, 1, 0);
	this.shieldSelectorButtonsPool.add(button);
	button = this.add.button(877, 502, 'button4', function() {this.set_Shield_Time(4)}, this, 1, 0, 1, 0);
	this.shieldSelectorButtonsPool.add(button);
	button = this.add.button(903, 502, 'button5', function() {this.set_Shield_Time(5)}, this, 1, 0, 1, 0);
	this.shieldSelectorButtonsPool.add(button);
	button = this.add.button(929, 502, 'button6', function() {this.set_Shield_Time(6)}, this, 1, 0, 1, 0);
	this.shieldSelectorButtonsPool.add(button);
	button = this.add.button(864, 524, 'button7', function() {this.set_Shield_Time(7)}, this, 1, 0, 1, 0);
	this.shieldSelectorButtonsPool.add(button);
	button = this.add.button(890, 524, 'button8', function() {this.set_Shield_Time(8)}, this, 1, 0, 1, 0);
	this.shieldSelectorButtonsPool.add(button);
	button = this.add.button(916, 524, 'button9', function() {this.set_Shield_Time(9)}, this, 1, 0, 1, 0);
	this.shieldSelectorButtonsPool.add(button);
	button = this.add.button(942, 524, 'button10', function() {this.set_Shield_Time(10)}, this, 1, 0, 1, 0);
	this.shieldSelectorButtonsPool.add(button);

	this.shieldSelectorButtonsPool.setAll('anchor.x', 0.5);
	this.shieldSelectorButtonsPool.setAll('anchor.y', 0.5);
	this.shieldSelectorButtonsPool.setAll('scale.x', 0.15);
	this.shieldSelectorButtonsPool.setAll('scale.y', 0.15);
	this.shieldSelectorButtonsPool.setAll('frame', 0);
	this.shieldSelectorButtonsPool.setAll('visible', false);
	button = this.shieldSelectorButtonsPool.getAt(0);
	button.scale.setTo(0.17, 0.17);
	button.frame = 1;
    },

    // If the enemy's shild is deactivated the enemy is killed.
    try_To_Destroy_Velocity: function(enemy, bullet) {
	if (!enemyShield) {
	    enemy.kill();
	    //this.score = this.score + 80;
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
    // This function is for debug (and other stuff xD, but we're using it for
    // debugging sprite's sizes).    
    render: function() {
    	if (this.enemyTimePool.countLiving() > 0) {
    	    this.enemyTimePool.forEachAlive(function(enemy) {
    		this.game.debug.body(enemy, false, 'rgb(255, 0, 0)');
    	    }, this);
    	}
    	if (this.bombPool.countLiving() > 0) {
    	    this.bombPool.forEachAlive(function(bomb) {
    		this.game.debug.body(bomb, false, 'rgb(255, 0, 0)');
    	    }, this);
    	}
    	if (this.cannonPool.countLiving() > 0) {
    	    this.cannonPool.forEachAlive(function(cannon) {
    		this.game.debug.body(cannon, false, 'rgb(255, 0, 0)');
    	    }, this);
    	}
    	if (this.missilePool.countLiving() > 0) {
    	    this.missilePool.forEachAlive(function(missile) {
    		this.game.debug.body(missile, false, 'rgb(255, 0, 0)');
    	    }, this);
    	}
    	if (this.shieldPool.countLiving() > 0) {
    	    this.shieldPool.forEachAlive(function(shield) {
    		this.game.debug.body(shield, false, 'rgb(255, 0, 0)');
    	    }, this);
    	}
    	if (this.enemyBulletPool.countLiving() > 0) {
    	    this.enemyBulletPool.forEachAlive(function(bullet) {
    		this.game.debug.body(bullet, false, 'rgb(255, 0, 0)');
    	    }, this);
    	}

    }
};
