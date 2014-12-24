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

	// instructionsButton = this.add.button(this.world.centerX, this.world.centerY - 100, 'instructionsButton', this.startGame, this, 1, 0, 1, 0);
	// instructionsButton.anchor.setTo(0.5, 0.5);
	// instructionsButton.scale.setTo(0.3, 0.3);
	
	text = this.add.text(this.world.centerX, 50, 'Defensa lineal', { font: "50px Arial", fill: "#ffffff", align: "left" });
	text.anchor.setTo(0.5, 0.5);    

	//Button to jump to level 1
	newGameButton = this.add.button(this.world.centerX, this.world.centerY - 150, 'newGameButton', this.startGame, this, 1, 0, 1, 0);
	newGameButton.anchor.setTo(0.5, 0.5);
	newGameButton.scale.setTo(0.3, 0.3);
	// text.anchor.setTo(0.5, 0.5);    
	
	//Button to jump to level 2
	newGameButton = this.add.button(this.world.centerX, this.world.centerY, 'newGameButton', this.startGame2, this, 1, 0, 1, 0);
	newGameButton.anchor.setTo(0.5, 0.5);
	newGameButton.scale.setTo(0.3, 0.3);
	// text = this.add.text(this.world.centerX, 50, 'Defensa lineal', { font: "50px Arial", fill: "#ffffff", align: "left" });
	
	//Button to jump to level 3
	newGameButton = this.add.button(this.world.centerX, this.world.centerY + 150, 'newGameButton', this.startGame3, this, 1, 0, 1, 0);
	newGameButton.anchor.setTo(0.5, 0.5);
	newGameButton.scale.setTo(0.3, 0.3);
	// text = this.add.text(this.world.centerX, 50, 'Defensa lineal', { font: "50px Arial", fill: "#ffffff", align: "left" });
	// text.anchor.setTo(0.5, 0.5);    
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
	level = 1;
	score = 0;
	console.log(level);
	this.state.start('Nivel1',true,false,time,level,score,
			 this.allign_X,
			 this.allign_Y,
			 this.blackHoleButton_Setup,
			 this.bombOnMouse_Setup,
			 this.buttonPanel_Setup,
			 // this.bombPool_Setup,
			 this.countdown,
			 this.find_Grid_Place,
			 //this.gridLine_Setup,
			 this.make_Grid,
			 this.minusButton_Setup,
			 this.plusButton_Setup,
			 //this.lockedButtons_Setup,
			 this.playButton_Setup,
			 this.select_Bomb,
			 this.selector_Setup,
			 this.start,
			 this.scoreText_Setup,//Should be part of "displays_Setup"
			 this.try_To_Destroy);
    },

    startGame2: function (pointer) {
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
	level = 2;
	score = 0;
	console.log(level);
	this.state.start('Nivel2',true,false,time,level,score,
			 this.allign_X,
			 this.allign_Y,
			 this.blackHoleButton_Setup,
			 this.bombOnMouse_Setup,
			 this.buttonPanel_Setup,
			 // this.bombPool_Setup,
			 this.countdown,
			 this.find_Grid_Place,
			 // this.gridLine_Setup,
			 this.make_Grid,
			 this.minusButton_Setup,
			 this.plusButton_Setup,
			 //this.lockedButtons_Setup,
			 this.playButton_Setup,
			 this.select_Bomb,
			 this.selector_Setup,
			 this.start,
			 this.scoreText_Setup,//Should be part of "displays_Setup"
			 this.try_To_Destroy);
    },

    startGame3: function (pointer) {
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
	level = 3;
	score = 0;
	console.log(level);
	this.state.start('Nivel3',true,false,time,level,score,
			 this.allign_X,
			 this.allign_Y,
			 this.blackHoleButton_Setup,
			 this.bombOnMouse_Setup,
			 this.buttonPanel_Setup,
			 // this.bombPool_Setup,
			 this.countdown,
			 this.find_Grid_Place,
			 // this.gridLine_Setup,
			 this.make_Grid,
			 this.minusButton_Setup,
			 this.plusButton_Setup,
			 //this.lockedButtons_Setup,
			 this.playButton_Setup,
			 this.select_Bomb,
			 this.selector_Setup,
			 this.start,
			 this.scoreText_Setup,//Should be part of "displays_Setup"
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
	this.blackHoleButton = this.add.button(this.world.width/2, this.world.height - 82, 'blackHoleButton', this.select_Bomb, this, null, null, 1, 1);
	this.blackHoleButton.anchor.setTo(0.5, 0.5);
	this.blackHoleButton.scale.setTo(0.25, 0.25);
	buttons.add(this.blackHoleButton);
    },
    
    //Setups the bomb that appears on the mouse
    bombOnMouse_Setup: function() {
	this.bombOnMouse = this.add.sprite(1000, 1000, 'bomb');
	this.bombOnMouse.anchor.setTo(0.5, 0.5);
	this.bombOnMouse.scale.setTo(0.1, 0.1);
	this.physics.enable(this.bombOnMouse, Phaser.Physics.ARCADE);
    },

    // button panel setup.
    buttonPanel_Setup: function() {
	this.buttonPanel = this.add.sprite(this.world.width/2, this.world.height - 70, 'buttonPanel');
	this.buttonPanel.anchor.setTo(0.5, 0.5);
	this.buttonPanel.scale.setTo(0.3, 0.27);
    },

    // Decreases the game's counter and the bomb's counter.
    countdown: function () {
	if (started) {
	    this.timeCounter -= 1;
	    if (this.timeCounter < 0) {
		this.quit_Game(true);
	    }
	    //placedBomb should be a number, not a boolean
	    if (placedBomb) {
		
		//This should be changed to work with each bomb counter
		this.explosionTimeCounter -= 1;
		if(this.explosionTimeCounter >= 1){ bombBeep.play('',0,1,false);}
		if(this.explosionTimeCounter ==0){ blackHoleSound.play('',0,1,false);}
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
/*    gridLine_Setup: function(){
	
	this.line = this.add.sprite(1000, 1000,'ground');
	//this.line.scale.setTo(2.25,0.4); Use this for grid_space = 50
	this.line.scale.setTo(1.52, 0.4);
	this.line.anchor.setTo(0, 0.5);
    },*/
        
    //Draws the grid
    make_Grid: function (gridOption) {
	
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
   	forConstant1 = LEFT_MARGIN + GRID_SPACE * (COLUMNS_NUMBER + 0.5); //Left numbers space
	forConstant2 = ((GRID_SPACE) / 2) - 7.5; //7.5= 15px Arial / 2 //Vertical space
	forConstant3 = LEFT_MARGIN - (GRID_SPACE/2);
	
	if(gridOption==1){
	    for( i= 0; i < ROWS_NUMBER; i = i + 1) {
		y = (i * GRID_SPACE) + UP_MARGIN;
		//Rigth screen numbers.
		this.add.text( forConstant1, y + forConstant2, String(i+1), style );
	    }
	}
	
	if(gridOption==2){
	    for( i= 0; i < ROWS_NUMBER; i = i + 1) {
		y = (i * GRID_SPACE) + UP_MARGIN;
		//Left Screen numbers. Inversed order.
		this.add.text( forConstant3, y + forConstant2, String(10-i), style );
	    }
	}
	
	if(gridOption==3){
	    for( i= 0; i < ROWS_NUMBER; i = i + 1) {
		y = (i * GRID_SPACE) + UP_MARGIN;
		//Both numbers
		this.add.text( forConstant1, y + forConstant2, String(i+1), style );
		this.add.text( forConstant3, y + forConstant2, String(10-i), style );
	    }
	}
	//Static vertical lines--------------------------------------------------
	forConstant1 =(GRID_SPACE * ROWS_NUMBER) + UP_MARGIN;
	for (i = 0; i < (COLUMNS_NUMBER + 1); i = i + 1) {
	    y = (i * GRID_SPACE) + LEFT_MARGIN;
	    
	    graphics.moveTo(y, UP_MARGIN);
	    graphics.lineTo(y, forConstant1);
	}
    },

    minusButton_Setup: function(button, func) {
	var minusButton = this.add.button(button.x + 40, button.y + 20, 'minusButton', func, this, 0, 0, 1, 0);
	minusButton.anchor.setTo(0.5, 0.5);
	minusButton.scale.setTo(0.02, 0.02);
	buttons.add(minusButton);
    },

    // Creates the plus button for the cannons.
    plusButton_Setup: function(button, func) {
	var plusButton = this.add.button(button.x + 40, button.y - 20, 'plusButton', func, this, 0, 0, 1, 0);
	plusButton.anchor.setTo(0.5, 0.5);
	plusButton.scale.setTo(0.02, 0.02);
	buttons.add(plusButton);
    },

    // Creates the play button
    playButton_Setup: function() {
	this.playButton = this.add.button(this.world.centerX, this.world.height - 35, 'playButton', this.start, this, 0, 0, 1, 0);
	this.playButton.anchor.setTo(0.5, 0.5);
	this.playButton.scale.setTo(0.04, 0.04);
	buttons.add(this.playButton);
    },

    //Setups the score text. Use it after init "this.otherTextPool" group
    scoreText_Setup: function(){

	// Game score display.
	this.scoreText = this.add.text(65.45, 100, '' + this.score, { font: "30px Arial", fill: "#000000", align: "center" }, this.otherTextPool);
	this.scoreText.anchor.set(0.5);
    },
  
    // Lets the player use the bombs.
    select_Bomb: function () {
	if(this.beginGame){
	    console.log('Im here');
	    usingBlackHole = (numberOfBombs > 0);
	    if (!usingBlackHole) {
		console.log('Im there');
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
	}
    },
    
    // The selector
    selector_Setup: function() {
	this.selector = this.add.group();
	var selector = this.add.sprite(117, 500, 'selectorCannon');
	this.selector.add(selector);
	selector = this.add.sprite(883, 500, 'selectorShield');
	this.selector.add(selector);
	this.selector.setAll('anchor.x', 0.5);
	this.selector.setAll('anchor.y', 0.5);
	this.selector.setAll('scale.x', 0.45);
	this.selector.setAll('scale.y', 0.45);
    },

    //Starts the actual game level
    start: function () {
	if(this.beginGame){
	    started = true;
	}
    },

    // If the bomb's counter is equal to zero then the enemy is killed.
    try_To_Destroy: function(enemy, bomb) {
	var explosionY = (initialY + (GRID_SPACE * this.enemyVelocity * this.bombTime));
	if (this.explosionTimeCounter == 0 && enemy.body.y > explosionY && enemy.body.y <= explosionY + 25) {
	    this.score = this.score + 80;
	    enemy.kill();
	    //Functionality for the 'x' times to continue
	    //this.timesPassed -= 1;
	    //started = false;
	}
    },

};
