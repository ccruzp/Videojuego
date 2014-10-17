BasicGame.MainMenu = function (game) {
    // this.background = null;
    // this.music = null;
    // this.newGameButton = null;
    // this.text = null;
};

BasicGame.MainMenu.prototype = {
    create: function () {
	
	//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
	//	Here all we're doing is playing some music and adding a picture and button
	//	Naturally I expect you to do something significantly better :)
	
	// this.music = this.add.audio('titleMusic');
	// this.music.play();
	
	// this.add.sprite(0, 0, 'titlepage');
	
	// this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');

	// this.background = this.add.sprite(0, 0, 'menuBackground');

	// this.newGameButton = this.add.button(this.world.centerX, this.world.centerY, 'newGameButton', this.startGame, this, 1, 0, 1, 0);
	// this.newGameButton.anchor.setTo(0.5, 0.5);
	// this.newGameButton.scale.setTo(0.5, 0.5);
	// this.text = this.add.text(this.world.centerX, 50, 'Menú', { font: "50px Arial", fill: "#ffffff", align: "left" });
	// this.text.anchor.setTo(0.5, 0.5);
	background = this.add.sprite(0, 0, 'menuBackground');

	newGameButton = this.add.button(this.world.centerX, this.world.centerY, 'newGameButton', this.startGame, this, 1, 0, 1, 0);
	newGameButton.anchor.setTo(0.5, 0.5);
	newGameButton.scale.setTo(0.5, 0.5);
	text = this.add.text(this.world.centerX, 50, 'Menú', { font: "50px Arial", fill: "#ffffff", align: "left" });
	text.anchor.setTo(0.5, 0.5);    
    },

    update: function () {

	//	Do some nice funky main menu effect here
	
    },
    
    startGame: function (pointer) {
	//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
	// this.music.stop();
	
	//	And start the actual game
	// this.newGameButton.destroy();
	// this.text.destroy();
	// this.background.destroy();
	// this.state.start('Distance');
	// newGameButton.destroy();
	text.destroy();
	background.destroy();
	time = 0;
	level = 0;
	this.state.start('Nivel1',true,false,time,level,
			 this.allign_X,
			 this.allign_Y,
			 this.blackHoleButton_Setup,
			 this.bombOnMouse_Setup,
			// this.bombPool_Setup,
			 this.countdown,
			 this.find_Grid_Place,
			 this.gridLine_Setup,
			 this.make_Grid,
			 //this.lockedButtons_Setup,
			 this.playButton_Setup,
			 this.select_Bomb,
			 this.start,
			 this.try_To_Destroy);
    },

//Functions used in every level, ordered alphabetically
    
    //Alligns a number to the X axis of the grid
    allign_X: function(x){
	return x*GRID_SPACE + LEFT_MARGIN;
    },
    
    //Alligns a number to the Y axis of the grid
    allign_Y: function(y){
	return y*GRID_SPACE + UP_MARGIN;
    },

    // Creates the black hole bomb button.
    blackHoleButton_Setup: function() {
	this.blackHoleButton = this.add.button(200, this.world.height - 60, 'blackHoleButton', this.select_Bomb, this, null, null, 1, 1);
	this.blackHoleButton.anchor.setTo(0.5, 0.5);
	this.blackHoleButton.scale.setTo(0.4, 0.4);
	buttons.add(this.blackHoleButton);
    },
    
    //Setups the bomb that appears on the mouse
    bombOnMouse_Setup: function() {
	this.bombOnMouse = this.add.sprite(1000, 1000, 'bomb');
	this.bombOnMouse.anchor.setTo(0.5, 0.5);
	this.bombOnMouse.scale.setTo(0.1, 0.1);
	this.physics.enable(this.bombOnMouse, Phaser.Physics.ARCADE);
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
	this.gridX = parseInt((this.input.x-LEFT_MARGIN+GRID_SPACE)/GRID_SPACE);
	this.gridY = parseInt((this.input.y-UP_MARGIN+GRID_SPACE)/GRID_SPACE);
    
	if(this.gridX < 1) this.gridX = 1;
	if(this.gridX > 16) this.gridX = 16;
    
	if(this.gridY < 1) this.gridY = 1;
	if(this.gridY > 10) this.gridY = 10;
    },
    
    //Setups the dynamic line of the grid
    gridLine_Setup: function(){
	
	this.line = this.add.sprite(1000, 1000,'ground');
	//this.line.scale.setTo(2.25,0.4); Use this for grid_space = 50
	this.line.scale.setTo(1.52, 0.4);
	this.line.anchor.setTo(0, 0.5);
    },
        
    //Draws the grid
    make_Grid: function (/*WIDTH, HEIGHT*/) {
	
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
   	forConstant1=LEFT_MARGIN + GRID_SPACE * (COLUMNS_NUMBER + 0.5);
	forConstant2 = ((GRID_SPACE) / 2) - 7.5; //7.5= 15px Arial / 2
	for( i= 0; i < ROWS_NUMBER; i = i + 1) {
	    y = (i * GRID_SPACE) + UP_MARGIN;
	    
	    this.add.text( forConstant1, y + forConstant2, String(i+1), style );
	}
	//Static vertical lines--------------------------------------------------
	forConstant1 =(GRID_SPACE * ROWS_NUMBER) + UP_MARGIN;
	for (i = 0; i < (COLUMNS_NUMBER + 1); i = i + 1) {
	    y = (i * GRID_SPACE) + LEFT_MARGIN;
	    
	    graphics.moveTo(y, UP_MARGIN);
	    graphics.lineTo(y, forConstant1);
	}
    },

    // Creates the play button
    playButton_Setup: function() {
	this.playButton = this.add.button(this.world.centerX, this.world.height - 60, 'playButton', this.start, 2, 1, 0);
	this.playButton.anchor.setTo(0.5, 0.5);
	this.playButton.scale.setTo(0.05, 0.05);
	buttons.add(this.playButton);
    },
  
    // Lets the player use the bombs.
    select_Bomb: function () {
	usingBlackHole = (numberOfBombs > 0);
	if (!usingBlackHole) {
	    // this.bombPool.removeAll();
	    this.blackHoleButton.frame = 0;
	    this.bombPool.forEachAlive(function(bomb) {
		bomb.kill();
	    }, this);
	    this.bombTextPool.forEach(function(l) {
		l.visible = false;
	    }, this);
	    numberOfBombs = TOTAL_ENEMIES;
	}		
    },
    
    //Starts the actual game level
    start: function () {
	started = true;
    },

    // If the bomb's counter is equal to zero then the enemy is killed.
    try_To_Destroy: function(enemy, bomb) {
	var explosionY = (initialY + (GRID_SPACE * ENEMY_VELOCITY * BOMB_TOTAL_TIME));
	if (this.explosionTimeCounter == 0 && enemy.body.y > explosionY && enemy.body.y <= explosionY + 25) {
	    enemy.kill();
	}
    },

};