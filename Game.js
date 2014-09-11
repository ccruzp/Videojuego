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
    this.displayPool;
    this.velocityText; // Text display of velocity
    this.timeText; // Text display of time
    this.explosionTimeText; // Text display for the explosionTimeCounter
    this.livesText; // Text display of lives
    this.introText; // Text display for intro
    this.scoreText; // Text display of score
    this.bombPoolText; //Text display number of remaining bombPool

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
	this.numberOfBombs = 2; // Number of bombPool available in this level.
	
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
	this.enemyPool.createMultiple(2, 'distanceShip');
	this.enemyPool.setAll('anchor.x', 0.5);
	this.enemyPool.setAll('anchor.y', 0.5);
	this.enemyPool.setAll('outOfBoundsKill', true);
	this.enemyPool.setAll('checkWorldBounds', true);
	this.enemyPool.setAll('scale.x', 0.05);
	this.enemyPool.setAll('scale.y', 0.05);

	this.enemyPool.forEachDead(function(enemy) {
	    var enemy = this.enemyPool.getFirstExists(false);
	    // enemy.reset(this.rnd.integerInRange(200, 800), 100);
	    initialY = 40 - (enemy.height/2);
	    
	    aux1 = this.allign_X(this.enemyPlace) -(this.GRID_SPACE/2);
	    
	    enemy.reset(aux1, initialY);
	    enemy.body.setSize(100, 100, 0, enemy.height/2);

	}, this);

	// Create the bombPool
	this.bombPool = this.add.group();
	this.bombPool.enableBody = true;
	this.bombPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.bombPool.createMultiple(2, 'bomb');
	this.bombPool.setAll('anchor.x', 0.4);
	this.bombPool.setAll('anchor.y', 0.4);
	this.bombPool.setAll('scale.x', 0.15);
	this.bombPool.setAll('scale.y', 0.15);
	this.bombPool.forEach(function (bomb) {
	    bomb.animations.add('explode', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18], 10, false);
	}, this);

	// Group for the text displays
	this.displayPool = this.add.group();
	// Time until explosion display.
	this.enemyPool.forEach(function() {
	    var texto = this.add.text(0, 0, '', { font: "20px Arial", fill: "#ffffff", align: "left" }, this.displayPool);
	    texto.visible = false;
	}, this);
	// this.displayPool.forEach(function(l) {
	//     console.log("LETREROS: " + this.displayPool.getIndex(l));
	// }, this);

	// this.nextShotAt = 0;

	// Creating the text displays.
	// Game time display.
	this.timeText = this.add.text(25, 175, 'Tiempo: ' + this.TOTAL_TIME, { font: "20px Arial", fill: "#ffffff", align: "left" });
		
	// Display for velocity of the enemies.
	this.velocityText = this.add.text(25, 225, 'Velocidad: ' + this.ENEMY_VELOCITY, { font: "20px Arial", fill: "#ffffff", align: "left" });

	// Display for the amount of bombPool left.
	this.bombText = this.add.text(235, this.world.height - 40, '' + this.numberOfBombs, { font: "20px Arial", fill : "#ffffff", align: "left"});
	
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

	// if (started && placedBomb && this.time.now > lastTime + 1000) {
	//     lastTime = this.time.now;
	//     this.enemyPool.forEachAlive(function(enemy) {
	//     	// enemy.body.velocity.y = this.ENEMY_VELOCITY * this.GRID_SPACE;
	//     	y = enemy.body.y + this.ENEMY_VELOCITY * this.GRID_SPACE;
	//     	console.log("Y: " + y);
	//     	enemy.body.y = y;
	// 	console.log("Contador:" + this.explosionTimeCounter);
	//     }, this);
	    
	//     this.explosionTimeCounter -= 1;
	//     if (this.explosionTimeCounter == 0) {
	// 	this.explosionTimeText.visible = false;
	//     }
	// }
	
	// Update displays.
	this.timeText.text = 'Tiempo: ' + this.timeCounter;
	// this.explosionTimeText.text = this.explosionTimeCounter;
	this.bombText.text = 'x' + this.numberOfBombs;
	// Updating existing bomb's text display.
	this.bombPool.forEachAlive(function(bomb) {
	    var text = this.displayPool.getAt(this.bombPool.getIndex(bomb));
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
	    // this.bombPool.callAllExists('play', true, 'explode', 10, false, true);
	    this.bombPool.forEachAlive(function(bomb) {
		bomb.animations.play('explode');
		bomb.events.onAnimationComplete.add(function() {
		    if (this.enemyPool.countLiving() == 0) {
			bomb.kill();
			// this.quit_Game(true);
		    }
		}, this);
	    }, this);
	    // if (!this.bombPool.getFirstAlive()) {
	    // 	this.quit_Game(true);
	    // }
	}

	if ((!this.bombPool.getFirstAlive()) && (this.timeCounter < this.TOTAL_TIME)) {
	    this.quit_Game(true);
	}
	// If an enemy reaches the botom of the grid you lose the game.
	// this.enemies.forEach(this.outOfGrid, this, false);
	this.enemyPool.forEachAlive(function(enemy) {
	    //if (enemy.body.y > (200)) console.log("Entro aquí VE");
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
	this.buttons.removeAll(true);
	this.background.destroy();
	this.bombPool.removeAll(true);
	//this.timeOfGame = this.timeOfGame - this.time.now;
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
	// console.log("Explosion Y:" + explosionY);
	// console.log("ENEMY Y: " +  enemy.body.y);
	// console.log("Explosion: " + this.explosionTimeCounter);
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

	    bomb = this.bombPool.getFirstExists(false);
	    bomb.body.setSize(10, 10, 4, 4);
	    bomb.reset(x, y);

	    // var text = this.add.text(x, y, '10', { font: "20px Arial", fill: "#ffffff", align: "left" }, this.displayPool);
	    // text.visible = true;

	    var text = this.displayPool.getAt(this.bombPool.getIndex(bomb));
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
};