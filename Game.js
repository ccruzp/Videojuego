BasicGame.Distance = function (game) {

    //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    //Grid Stuff
    this.GRID_SPACE = 38;
    this.line;
    this.indexAux = 0;
    this.enemyOutOfGrid = false; //Booleans, set if an enemy is out of the grid

    //Grid adjustment in boxes
    this.gridX = 0;
    this.gridY = 0;

    this.TOTAL_TIME = 10; // Time for explosion
    this.BOMB_TOTAL_TIME = 3;
    this.ENEMY_VELOCITY = 2; // Velocity of the enemy
    
    this.bombs; // Group of bombs
    this.bomb; // Instance of the group of bombs
    this.enemies; // Group of enemies
    this.enemy; // Instance of an enemy
    this.bombOnMouse; // The sprite that appears on the mouse (Might be removed)
    
    // Counters
    this.lives;// Lives left
    this.score; // Score
    this.timeCounter; // Time counter
    // Tells the time remaining before de bomb explodes
    this.explosionTimeCounter; 
    this.numberOfBombs; //Bombs = number of enemies, should be generated
    
    // Texts
    this.velocityText; // Text display of velocity
    this.timeText; // Text display of time
    this.explosionTimeText; // Text display for the explosionTimeCounter
    this.livesText; // Text display of lives
    this.introText; // Text display for intro
    this.scoreText; // Text display of score
    this.bombsText; //Text display number of remaining bombs

    // Buttons
    this.buttons; // Group for locked buttons
    this.blackHoleButton; // Black hole bomb button
    this.playButton; // Play button

    this.background; // Background of the game
    
    //Aligned enemy in the grid
    this.enemyPlace = 6;

    this.bombs;
    this.bombs;
    this.nextShotAt;
};

BasicGame.Distance.prototype = {
    
    create: function () {
	
	// Initializing boolean variables.
	started = false; // Boolean that says if the game has begun.
	lost = false; // Boolean that says if the player lost the game.
	// Boolean that says if the player has selected the black hole bomb.
	usingBlackHole = false; // Says if the player selected the bomb.
	placedBomb = false; // Says if a bomb has been placed on the grid.
	this.numberOfBombs = 2; // Number of bombs available in this level.

	// Creating background.
	this.background = this.add.sprite(0, 0, 'background');
	// Game physics system.
	this.physics.startSystem(Phaser.Physics.ARCADE);
	
	//  We check bounds collisions against all walls other than the bottom one
	// this.physics.arcade.checkCollision.down = false;
	
	// Creating the grid for the game.
	this.make_Grid(this.game.width, this.game.height);
	
	/*
	 * Image that appears on the mouse when the black hole bomb button is 
	 * pressed.
	 */
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
	enemy = this.add.sprite((this.enemyPlace*this.GRID_SPACE)+196-(this.GRID_SPACE/2), 50, 'enemyDistance');
	enemy.anchor.setTo(0.5, 0.5);
	enemy.scale.setTo(0.3, 0.3);
	this.enemies.add(enemy);

	// Create the bombs
	this.bombs = this.add.group();
	this.bombs.enableBody = true;
	this.bombs.physicsBodyType = Phaser.Physics.ARCADE;
	this.bombs.createMultiple(2, 'bomb');
	this.bombs.setAll('anchor.x', 0.37);
	this.bombs.setAll('anchor.y', 0.37);
	this.bombs.setAll('scale.x', 0.1);
	this.bombs.setAll('scale.y', 0.1);
	this.bombs.forEach(function (bomb) {
	    bomb.animations.add('explode', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18], 10, false);
	}, this);

	// this.nextShotAt = 0;

	// Creating the text displays.
	// Game time display.
	this.timeText = this.add.text(25, 175, 'Tiempo: ' + this.TOTAL_TIME, { font: "20px Arial", 
						    fill: "#ffffff", 
						    align: "left" });

	// Time until explosion display.
	this.explosionTimeText = this.add.text(25, 300, this.BOMB_TOTAL_TIME, { font: "20px Arial", 
						    fill: "#ffffff", 
						    align: "left" });
	this.explosionTimeText.visible = false;

	// Display for velocity of the enemies.
	this.velocityText = this.add.text(25, 225, 'Velocidad: ' + this.ENEMY_VELOCITY, { font: "20px Arial",
							fill: "#ffffff", 
							align: "left" });

	// Display for the amount of bombs left.
	this.bombsText = this.add.text(25,275,'Bombas restantes:' + this.numberOfBombs, { font: "20px Arial",
						   fill : "#ffffff",
						   align: "left"});

	// Every second activates this.countdown.
	this.time.events.loop(Phaser.Timer.SECOND, this.countdown, this);
		
	// Counters.
	// Game's time counter.
	this.timeCounter = this.TOTAL_TIME;
	// Bomb's time counter.
	this.explosionTimeCounter = this.BOMB_TOTAL_TIME; // Time counter
		
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
    
    // Everything that needs to be done or modified constantly in the game goes
    // here.
    update: function () {
	// If an enemy and a bomb overlaps this.try_To_Destroy is activated.
	this.physics.arcade.overlap(this.enemies, this.bombs, 
				    this.try_To_Destroy, null, this);
	// this.physics.arcade.overlap(this.enemies, this.bombs, 
	// 			    this.try_To_Destroy, null, this);
	// If the bomb on the mouse overlaps with a line this.line_Collision is 
	// activated.
	this.physics.arcade.overlap(this.bombOnMouse, this.lines,
				    this.line_Collision, null, this);
	this.bombOnMouse.reset(1000,1000);
	
	if (usingBlackHole) {
	    this.findGridPlace();
	    this.bombOnMouse.reset(((this.gridX-1)*this.GRID_SPACE)+214,((this.gridY-1)*this.GRID_SPACE)+83);
	    
	    //Constant= OffsetY - ((gridspace-SizeofGrid)/2 + SizeofGrid)
	    //Size of grid: 32*0.4. OffsetY = 60
	    this.line.reset(196,(((this.gridY)*(this.GRID_SPACE))+34.6));
	}

	// Update displays.
	this.timeText.text = 'Tiempo: ' + this.timeCounter;
	this.explosionTimeText.text = this.explosionTimeCounter;
	this.bombsText.text = 'Bombas restantes:' + this.numberOfBombs;
	
	// If the game started move enemies.
	if (started) {
	    enemy.body.velocity.y = this.ENEMY_VELOCITY * this.GRID_SPACE;
	    // this.bombs.callAllExists('play', true, 'explode');
	}
	
	// If explosionTimeCounter is 0 start explosion animation.
	if (this.explosionTimeCounter == 0) {
	    // this.bombs.callAllExists('play', true, 'explode', 10, false, true);
	    bomb.animations.play('explode');
	    bomb.events.onAnimationComplete.add(function(){
		console.log("complete")
	    }, this);
	}
	
	// If an enemy reaches the botom of the grid you lose the game.
	this.enemies.forEach(this.outOfGrid, this, false);
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
	this.bombs.removeAll(true);
	if (won) {
	    this.state.start('WinnerMenu');
	} else {
	    //	Then let's go back to the game over menu.
	    this.state.start('GameOverMenu');	
	}
    },
    
    // If the bomb's counter is equal to zero then the enemy is killed.
    try_To_Destroy: function(enemy, bomb) {
	if (this.explosionTimeCounter == 0) {
	    enemy.kill();
	    // if (this.timeCounter == 0) {
	    // 	this.quit_Game();
	    // }
	}
    },
    
    make_Grid: function (WIDTH, HEIGHT) {
	
	//We will make a unique grid, with static tiles
	var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
    
	var graphics = this.add.graphics(0, 0);
	graphics.lineStyle(2, 0x00CCFF,1);
    
	for(this.indexAux = 0; this.indexAux < 11; this.indexAux = this.indexAux + 1) {
	    y = ((this.indexAux) * this.GRID_SPACE) + 60;
	    
	    //Static horizontal lines
	    graphics.moveTo(196, y); 
	    graphics.lineTo(this.game.width-196,y);
	    if (this.indexAux < 10) {
		this.add.text(this.game.width - 180, y - 10 + ((this.GRID_SPACE) / 2),
			      String((this.indexAux+1)),style);
	    }
	}
    
	for (this.indexAux = 0; this.indexAux < 17; this.indexAux = this.indexAux + 1) {
	    y = (this.indexAux * this.GRID_SPACE) + 196;
	    //Static vertical lines
	    graphics.moveTo(y,60);
	    graphics.lineTo(y,(((this.GRID_SPACE)*10)+60));
	}
    },

    select_Bomb: function () {
	usingBlackHole = (this.numberOfBombs > 0);
    },

    start: function (pointer) {
	started = true;
    },

    // Creates a black hole bomb in the place clicked inside the grid.
    put_Bomb: function () {
	
	if (!started && usingBlackHole && (this.numberOfBombs > 0)) {
	    // Intance of a bomb
	    x = ((this.gridX-1)*this.GRID_SPACE)+196+(this.GRID_SPACE/3);
	    y = ((this.gridY-1)*this.GRID_SPACE)+60+(this.GRID_SPACE/3);

	    bomb = this.bombs.getFirstExists(false);
	    bomb.body.setSize(35, 35, 2, 2);
	    bomb.reset(x, y);

	    this.explosionTimeText.visible = true;
	    this.explosionTimeText.x = x
	    this.explosionTimeText.y = y;
	    this.numberOfBombs -=1;

	    placedBomb = true;
	}
	this.blackHoleButton.frame = 0;
	this.bombOnMouse.reset(1000,1000);
    	usingBlackHole = false;
	this.line.reset(1000,1000);

	// if (this.bombs.countDead() === 0) {
	//     return;
	// }
    },
    
    // Decreases the game's counter and the bomb's counter.
    countdown: function () {
	if (started) {
	    if (!lost) {
		this.timeCounter -= 1;
		if (placedBomb) {
		    this.explosionTimeCounter -= 1;
		}
	    }
	    if (this.explosionTimeCounter == 0) {
		this.explosionTimeText.visible = false;
	    }
	    if (this.timeCounter < 0) {
		this.quit_Game(true);
	    }
	}
    },

    findGridPlace: function() {
	this.gridX = parseInt((this.input.x-196+this.GRID_SPACE)/this.GRID_SPACE);
	this.gridY = parseInt((this.input.y-60+this.GRID_SPACE)/this.GRID_SPACE);
    
	if(this.gridX < 1) this.gridX = 1;
	if(this.gridX > 16) this.gridX = 16;
    
	if(this.gridY < 1) this.gridY = 1;
	if(this.gridY > 10) this.gridY = 10;
    },

    outOfGrid: function(enemy) {
	//if (enemy.body.y > (200)) console.log("Entro aquí VE");//outOfGrid = true;
	if (enemy.body.y > (this.game.width-220)) outOfGrid = true;
    },

    // This function is for debug (and other stuff xD, but we're using it for
    // debugging sprite's sizes).
    // render: function() {
    // 	if (this.enemies.countLiving() > 0) {
    // 	    this.enemies.forEachAlive(function (enemy) {
    // 		this.game.debug.body(enemy, false, 'rgb(255, 0, 0)');
    // 	    }, this);
    // 	}
    // 	if (this.bombs.countLiving() > 0) {
    // 	    this.bombs.forEachAlive(function(bomb) {
    // 		this.game.debug.body(bomb, false, 'rgb(255, 0, 0)');
    // 	    }, this);
    // 	}
    // }
};