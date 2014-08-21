BasicGame.pruebaGame = function (game) {

    //Grid Stuff
    this.GRID_SPACE = 50;
    this.line;
    this.indexAux = 0;
   
    //Grid adjustment in boxes
    this.gridX = 0;
    this.gridY = 0;

    this.TOTAL_TIME = 3; // Time for explosion
    this.ENEMY_VELOCITY = 2; // Velocity of the enemy
    
    this.bombs; // Group of bombs
    this.bomb;
    this.enemies; // Group of enemies
    this.enemy; // Instance of an enemy
    this.bombOnMouse; // The sprite that appears on the mouse (Might be removed)
    
    // Counters
    this.lives;// Lives left
    this.score; // Score
    this.timeCounter; // Time counter
    this.numberOfBombs; //Bombs = number of enemies, should be generated
    
    // Texts
    this.velocityText; // Text display of velocity
    this.timeText; // Text display of time
    this.livesText; // Text display of lives
    this.introText; // Text display for intro
    this.scoreText; // Text display of score
    this.bombsText; //Text display number of remaining bombs
    // Buttons
    this.buttons; // Group for locked buttons
    this.blackHoleButton; // Black hole bomb button
    this.playButton; // Play button

    // Booleans
    // this.lost = false; // Boolean that says if player lost the game
    this.background; // Background of the game
};

BasicGame.pruebaGame.prototype = {
    
    create: function () {

	started = false; // Boolean that says if the game has begun
	lost = false; // Boolean that says if the player lost the game
	// Boolean that says if the player has selected the black hole bomb
	usingBlackHole = false; 
	
	this.numberOfBombs = 2; // Number of bombs available in this level

	this.physics.startSystem(Phaser.Physics.ARCADE);
	
	//  We check bounds collisions against all walls other than the bottom one
	this.physics.arcade.checkCollision.down = false;
	
	// this.background = this.add.tileSprite(0, 0, 1000, 600, 'background');	
	this.make_Grid(this.game.width, this.game.height);
	
	this.bombOnMouse = this.add.sprite(1000, 1000, 'bombSelect');
	this.bombOnMouse.anchor.setTo(0.5, 0.5);
	this.physics.enable(this.bombOnMouse, Phaser.Physics.ARCADE);
	
	this.line = this.add.sprite(1000,1000,'ground');
	this.line.scale.setTo(2.25,0.4);
	
	// Group for the enemies
	this.enemies = this.add.group();
	this.enemies.enableBody = true;
	this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
	
	// Create an instance of an enemy
	this.enemy = this.enemies.create(this.world.centerX, 20, 'enemyDistance');
	this.enemy.anchor.setTo(0.5, 0.5);
	this.enemy.body.collideWorldBounds = true;

	// Create the bombs
	this.bombs = this.add.group();
	this.bombs.enableBody = true;
	this.bombs.physicsBodyType = Phaser.Physics.ARCADE;
	this.bombs.setAll('anchor.x', 0.5);
	this.bombs.setAll('anchor.y', 0.5);
	
	this.timeText = this.add.text(25, 25, '', { font: "20px Arial", 
						    fill: "#ffffff", 
						    align: "left" });
	this.velocityText = this.add.text(25, 75, '', { font: "20px Arial",
							fill: "#ffffff", 
							align: "left" });
	this.bombsText = this.add.text(25,125,'', { font: "20px Arial",
						   fill : "#ffffff",
						   align: "left"});
	// // this.livesText = this.add.text(this.game.width - 120, this.game.height - 50, '',
	// // 			       { font: "20px Arial", fill: "#ffffff", 
    	// // 				 align: "left" });
	this.time.events.loop(Phaser.Timer.SECOND, this.countdown, this);
		
	// this.lives = 3; // Lives left
	// this.score = 0; // Score
	this.timeCounter = this.TOTAL_TIME; // Time counter
		
	// this.scoreText.text = 'Puntos: ' + this.score;
	// this.livesText.text = 'Vidas: ' + this.lives;

	// Create the button for the black hole bomb
	// this.blackHoleButton = this.add.button(100, this.world.height - 75, 
	// 				       'blackHoleButton', 
	// 				       this.select_Bomb, this, null,
	// 				       null, 1, 1);
	// this.blackHoleButton.anchor.setTo(0.5, 0.5);
	// this.blackHoleButton.scale.setTo(0.45, 0.45);

	// // this.blackHoleButton.animations.add('unpressed', [0], 1, false);
	// // this.blackHoleButton.animations.add('pressed', [1], 1, false);
	// // // Create the play button
	// this.playButton = this.add.button(this.world.centerX, 
	// 				  this.world.height - 75, 'playButton',
	// 				  this.start, 2, 1, 0);
	// this.playButton.anchor.setTo(0.5, 0.5);
	// this.playButton.scale.setTo(0.070, 0.070);

	// // // Create the locked buttons	
	// this.buttons = this.add.group();
	// beforeButton = this.blackHoleButton;
	// for(i = 0; i < 2; i++) {
	//     x = this.buttons.create(beforeButton.x + 125, beforeButton.y, 
	// 			    'lockedButton');
	//     x.scale.setTo(0.055, 0.055);
	//     beforeButton = x;
	// };
	// beforeButton = this.playButton;
	// for(i = 0; i < 3; i++) {
	//     x = this.buttons.create(beforeButton.x + 125, beforeButton.y, 
	// 			    'lockedButton');
	//     x.scale.setTo(0.055, 0.055);
	//     beforeButton = x;
	// };
	// this.buttons.setAll('anchor.x', 0.5);
	// this.buttons.setAll('anchor.y', 0.5);

	// Mouse input
	this.input.onDown.add(this.put_Bomb, this);
    },
    
    update: function () {
	this.physics.arcade.overlap(this.enemies, this.bombs, 
				    this.try_To_Destroy, null, this);
	this.physics.arcade.overlap(this.bombOnMouse, this.lines,
				    this.line_Collision, null, this);
	this.bombOnMouse.reset(1000,1000);
	if (usingBlackHole){

	    this.findGridPlace();
	    this.bombOnMouse.reset(((this.gridX*50)+25),((this.gridY*50)+25));
	    this.line.reset(50,((this.gridY*50)+18.6));
	    //this.bombOnMouse.reset(this.input.x, this.input.y);
	    
	}
	
	if (started) {
	    this.enemy.body.velocity.y = this.ENEMY_VELOCITY * this.GRID_SPACE;
	}

    },
    
    quit_Game: function (won) {
	
	//Here you should destroy anything you no longer need.
	//Stop music, delete sprites, purge caches, free resources, all that good stuff.
	this.playButton.destroy();
	this.blackHoleButton.destroy();
	this.buttons.removeAll(true);
	this.background.destroy();
	this.bombs.removeAll(true);
	if (won) {
	    this.state.start('WinnerMenu');
	} else {
	    //	Then let's go back to the main menu.
	    this.state.start('GameOverMenu');	
	}
    },
    
    try_To_Destroy: function(enemy, bomb) {
	if (this.timeCounter == 0) {
	    // if ((enemy.x - bomb.x) < 20 && (enemy.y == bomb.y) < 20) {
	    	enemy.kill();
	    	this.quit_Game(true);
	    // }
	}
    },

    make_Grid: function (WIDTH, HEIGHT) {
	
	//We will make a unique grid, with static tiles
	var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
    
	var graphics = this.add.graphics(0, 0);
	graphics.lineStyle(2, 0x00CCFF,1);
    
	for(this.indexAux = 0; this.indexAux < 12; this.indexAux = this.indexAux + 1){
	    y = ((this.indexAux) * this.GRID_SPACE) + 50;
	    
	    //Static horizontal lines
	    graphics.moveTo(50, y); 
	    graphics.lineTo(this.game.width-50,y);
	    if (this.indexAux <10){
		this.add.text(this.game.width-20,y-10+25,
			      String((this.indexAux+1)),style);
	    }
	}
    
	for (this.indexAux = 0; this.indexAux < 19; this.indexAux = this.indexAux + 1){
	    y = (this.indexAux * this.GRID_SPACE) + 50;
	    //Static vertical lines
	    graphics.moveTo(y,50);
	    graphics.lineTo(y,HEIGHT-50);
	}
    },

    select_Bomb: function () {
	//Odio esta maldita mierda de los grupos q no funcionan u.u
	/*if(this.numberOfBombs<=0){
	    this.bombs.removeAll(true);
	    this.bombs.removeAll(false);
	}*/
	//this.bombs.removeAll(true);
	//this.enemies.removeAll(true);
	usingBlackHole = true;
	// player.animations.play('pressed');
	// this.blackHoleButton.frame = 1;
    },

    start: function (pointer) {
	started = true;
    },

    put_Bomb: function () {
	
	if (!started && usingBlackHole && (this.numberOfBombs>0)) {
	    // Intance of a bomb
	    this.bomb = this.bombs.create(((this.gridX*50) + 20),
					  ((this.gridY*50)+15), 'bomb');
	    this.numberOfBombs -=1;
	}
	this.bombOnMouse.reset(1000,1000);
    	usingBlackHole = false;
	this.line.reset(1000,1000);
    },
    
    countdown: function () {
	if (started) {
	    if (!lost) {
		this.timeCounter -= 1;
	    }
	    if (this.timeCounter < 0) {
		this.quit_Game();
	    }
	}
    },

    findGridPlace: function(){
	this.gridX = parseInt(this.input.x/this.GRID_SPACE);
	this.gridY = parseInt(this.input.y/this.GRID_SPACE);
    
	if(this.gridX < 1) this.gridX = 1;
	if(this.gridX > 18) this.gridX = 18;
    
	if(this.gridY < 1) this.gridY = 1;
	if(this.gridY > 10) this.gridY = 10;
    }  
};