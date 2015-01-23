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
	newGameButton = this.add.button(this.world.centerX, this.world.centerY - 150, 'level1', this.startGame, this, 1, 0, 1, 0);
	newGameButton.anchor.setTo(0.5, 0.5);
	newGameButton.scale.setTo(0.3, 0.3);
	// text.anchor.setTo(0.5, 0.5);    
	
	//Button to jump to level 2
	newGameButton = this.add.button(this.world.centerX, this.world.centerY, 'level2', this.startGame2, this, 1, 0, 1, 0);
	newGameButton.anchor.setTo(0.5, 0.5);
	newGameButton.scale.setTo(0.3, 0.3);
	// text = this.add.text(this.world.centerX, 50, 'Defensa lineal', { font: "50px Arial", fill: "#ffffff", align: "left" });
	
	//Button to jump to level 3
	newGameButton = this.add.button(this.world.centerX, this.world.centerY + 150, 'level3', this.startGame3, this, 1, 0, 1, 0);
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
			 /*this.shuffleBag_Get,
			 this.shuffleBag_Restart,
			 this.shuffleBag_Setup,*/
			 this.start,
			 this.try_To_Destroy,
			 this.try_To_Destroy_Time,
			 this.try_To_Destroy_Velocity,
			 this.you_Got_Shot);
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
			 /*this.shuffleBag_Get,
			 this.shuffleBag_Restart,
			 this.shuffleBag_Setup,*/
			 this.start,
			 this.try_To_Destroy,
			 this.try_To_Destroy_Time,
			 this.try_To_Destroy_Velocity,
			 this.you_Got_Shot);
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
			 this.you_Got_Shot);
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
	// this.blackHoleButton = this.add.button(this.world.width/2, this.world.height - 82, 'blackHoleButton', this.select_Bomb, this, null, null, 1, 1);
	this.blackHoleButton = this.add.button(this.world.width/2, this.world.height - 82, 'blackHoleButton', function() {
	    this.bombPool.forEachAlive(function(bomb) {
		bomb.kill();
	    }, this);
	    this.bombTextPool.forEach(function(l) {
		l.visible = false;
	    }, this);
	    numberOfBombs = DISTANCE_ENEMIES;
	    if(DISTANCE_ENEMIES > 0){
		this.bombOnMouse.reset(this.world.width/2, this.world.height - 82);
		this.bombOnMouseText.visible = true;
	    }
	}, this, null, null, 1, 0);
	this.blackHoleButton.anchor.setTo(0.5, 0.5);
	this.blackHoleButton.scale.setTo(0.25, 0.25);
	buttons.add(this.blackHoleButton);
    },
    
    //Setups the bomb that appears on the mouse
    bombOnMouse_Setup: function() {
	this.bombOnMouse = this.add.sprite(this.blackHoleButton.x, this.blackHoleButton.y, 'bomb');
	this.bombOnMouse.anchor.setTo(0.5, 0.5);
	this.bombOnMouse.scale.setTo(0.15, 0.15);
	// this.physics.enable(this.bombOnMouse, Phaser.Physics.ARCADE);
	this.bombOnMouse.inputEnabled = true;
	this.bombOnMouse.input.enableDrag(true);
	// this.bombOnMouse.events.onDragStart.add(function() {
	//     console.log("STARTED")
	// }, this);
	this.bombOnMouse.events.onDragStop.add(function() {
	    // console.log("STOPPED");
	    usingBlackHole = true;
	    this.put_Weapon();
	}, this);
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
		// this.explosionTimeCounter -= 1;
		// if(this.explosionTimeCounter >= 1){ bombBeep.play('',0,1,false);}
		// if(this.explosionTimeCounter ==0){ blackHoleSound.play('',0,1,false);}
		this.bombPool.forEachAlive(function(bomb) {
		    bomb.counter -= 1;
		    if (bomb.counter >= 1) { 
			bombBeep.play('', 0, 1, false);
		    }
		    if (bomb.counter == 0 ) { 
			blackHoleSound.play('', 0, 1, false);
		    }
		}, this);
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

    // Creates the play buttons
    playButton_Setup: function() {
	this.playButton = this.add.button(this.world.centerX, this.world.height - 35, 'playButton', this.start, this, 0, 0, 1, 0);
	this.playButton.anchor.setTo(0.5, 0.5);
	this.playButton.scale.setTo(0.04, 0.04);
	buttons.add(this.playButton);

	this.playButton1 = this.add.button(this.world.centerX + 200, this.world.height - 60, 'playButton', this.start, this, 0, 0, 1, 0);
	this.playButton1.anchor.setTo(0.5, 0.5);
	this.playButton1.scale.setTo(0.11, 0.11);
	buttons.add(this.playButton1);

	this.playButton2 = this.add.button(this.world.centerX - 200, this.world.height - 60, 'playButton', this.start, this, 0, 0, 1, 0);
	this.playButton2.anchor.setTo(0.5, 0.5);
	this.playButton2.scale.setTo(0.11, 0.11);
	buttons.add(this.playButton2);

    },

    //DEPRECATED, USE DISPLAYS_SETUP INSTEAD
    //Setups the score text. Use it after init "this.otherTextPool" group
    /*
    scoreText_Setup: function(){

	// Game score display.
	this.scoreText = this.add.text(65.45, 100, '' + this.score, { font: "30px Arial", fill: "#000000", align: "center" }, this.otherTextPool);
	this.scoreText.anchor.set(0.5);
    },*/
    //DEPRECATED, USE DISPLAYS_SETUP INSTEAD
    
  
    // Lets the player use the bombs.
    select_Bomb: function () {
	if(this.beginGame){
	    console.log('Im here');
	    usingBlackHole = (numberOfBombs > 0);
	    if (!usingBlackHole) {
		console.log('Im there');
		this.blackHoleButton.frame = 0;
		this.bombPool.forEachAlive(function(bomb) {
		    bomb.kill();
		}, this);
		this.bombTextPool.forEach(function(l) {
		    l.visible = false;
		}, this);
		numberOfBombs = DISTANCE_ENEMIES;
	    // } else {
	    // 	this.find_Grid_Place();
	    // 	x = this.allign_X(this.gridX-0.5);
	    // 	y = this.allign_Y(this.gridY-0.5);
	    // 	this.bombOnMouse.reset(x, y);
	    // 	this.bombOnMouse.isDragged = true;
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
	    
	    if (this.enemyVelocityPool != null) {
		this.enemyVelocityPool.forEachAlive(function(enemy) {
		    this.time.events.add(Phaser.Timer.SECOND * (enemy.shieldTime-1), this.deactivate_Enemy_Shield, this, enemy);
		    this.time.events.add(Phaser.Timer.SECOND * (enemy.shieldTime+0.1), this.activate_Enemy_Shield, this, enemy);
		},this);
	    }
	}
    },

    // If the bomb's counter is equal to zero then the enemy is killed.
    try_To_Destroy: function(enemy, bomb) {
	var explosionY = (initialY + (GRID_SPACE * enemy.speed * bomb.time));
	// if (this.explosionTimeCounter == 0 && enemy.body.y > explosionY && enemy.body.y <= explosionY + 25) {
	if (bomb.counter == 0 && enemy.body.y > explosionY && enemy.body.y <= explosionY + 25) {
	    this.score = this.score + 80;
	    enemy.kill();
	    //bomb.kill();
	    //Functionality for the 'x' times to continue
	    //this.timesPassed -= 1;
	    //started = false;
	}
    },


    //Added Functions
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    
    //Activates the velocity enemies shield
    activate_Enemy_Shield: function(enemy) {
	// this.enemyVelocityPool.forEachAlive(function(enemy) {
	//     enemy.animations.play('shield');
	// }, this);

	// enemy.frame = 1;
	enemy.shielded = true;
	console.log('El enemigo ha muerto?');
	console.log(enemy.died);
	if(!enemy.died){
	    console.log('I get here');
	    laser = this.enemyVelocityLaserPool.getAt(this.enemyVelocityPool.getIndex(enemy));
	    laser.body.setSize(10, 500 * enemy.pos, 0, 0);
	    laser.reset(enemy.x, enemy.y + 30);
	    if (enemy.pos <= 2) {
		laser.animations.play('laser' + 1);
	    } else {
		// var text = "laser" + (enemy.pos - 1);
		// console.log(text);
		// laser.animations.play(text);
		laser.animations.play('laser' + (enemy.pos - 1));
	    }
	    laser.events.onAnimationComplete.add(function() {
		this.lost = true;
	    }, this);
	}
	
	// laser.frame = enemy.pos - 1;
	// laser = this.add.sprite(enemy.x, enemy.y + 10, 'laser');
	// laser.enableBody = true;
	// laser.physicsBodyType = Phaser.Physics.ARCADE;
	// laser.anchor.setTo(0.5, 0.5);
	// laser.scale.setTo(0.2, 0.2);
	// laser.body.velocity.y = 3 * GRID_SPACE;
	// enemy.pos
    },
    
    //Skip the instructions window
    begin_Game: function(){
	//Begins the game 1 second after the mouse is pressed
	if(!this.beginGame){
	    this.time.events.add(Phaser.Timer.SECOND * 1, function() {
		this.blackScreen.destroy();
		this.beginGame = true;
		this.instructionsTextPool.destroy(true);
		//Start the game time
		this.timeOfGame = this.time.now;
	    },this);
	}
    },
    
    // Creates the texts that the games uses
    blackScreen_Displays_Setup: function(){
	this.instructionsTextPool = this.add.group();
	
	//Texts used in the instruction screen
	this.initialLevelText = this.add.text(this.world.width/2, this.world.height/5, 'NIVEL ' + this.level, { font: "140px Times New Roman", fill: "#f7d913", align: "left" },this.instructionsTextPool);
	this.initialLevelText.anchor.setTo(0.5,0.5);
	
	// this.initialInstructionText = this.add.text(this.world.width/2, this.world.height/2, '¡No dejes que los enemigos lleguen a tu planeta!', { font: "30px Arial", fill: "#ffffff", align: "left" },this.instructionsTextPool);
	// this.initialInstructionText.anchor.setTo(0.5,0.5);

	
	this.initialInstructionText = this.add.text(this.world.width/2, this.world.height/2, this.levelMessage, { font: "30px Arial", fill: "#ffffff", align: "left" },this.instructionsTextPool);
	this.initialInstructionText.anchor.setTo(0.5,0.5);
	/*
	if(this.level = 1){
	    this.initialInstructionText.addColor('#11ffff', 12);
	    this.initialInstructionText.addColor('#ffffff', 25);
	}
	*/
	
	// this.initialInstructionText = this.add.text(this.world.width/2, 3*this.world.height/5, 'Recuerda que: distancia = velocidad * tiempo', { font: "15px Arial", fill: "#ffffff", align: "left" },this.instructionsTextPool);
	// this.initialInstructionText.anchor.setTo(0.5,0.5);

	this.mouseToContinueText = this.add.text(this.world.width/2, 4*this.world.height/5, 'Presiona el mouse para continuar', { font: "20px Arial", fill: "#ffffff", align: "left" },this.instructionsTextPool);
	this.mouseToContinueText.anchor.setTo(0.5,0.5);
		
    },
        
    //Creates the bombPool
    bombPool_Setup: function() {
	this.bombPool = this.add.group();
	this.bombPool.enableBody = true;
	this.bombPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.bombPool.createMultiple(DISTANCE_ENEMIES, 'bomb');
	this.bombPool.setAll('anchor.x', 0.4);
	this.bombPool.setAll('anchor.y', 0.4);
	this.bombPool.setAll('scale.x', 0.15);
	this.bombPool.setAll('scale.y', 0.15);
	this.bombPool.forEach(function(bomb) {
	   
	    // Adding the bomb animation to each bomb.
	    bomb.animations.add('explode', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18], 10, false);
	    
	    //Do this if there are Distance Enemies
	    if(DISTANCE_ENEMIES > 0){
		
		//Setting the bomb time given the Distance enemies
		var enemy = this.enemyDistancePool.getAt(this.bombPool.getIndex(bomb));
		
		bomb.time = this.game.rnd.integerInRange(2, Math.floor((10/enemy.speed)));
		aux = 0;
		console.log('This case: ' + enemy.speed*bomb.time);
		if(TOTAL_ENEMIES < 3){
		    while( (enemy.speed*bomb.time) == lastMultiplicationValue && aux != 10){
			bomb.time = this.game.rnd.integerInRange(2, Math.floor((10/enemy.speed)));
			console.log('Im trying to give you unrepeated cases');
			console.log('New case: ' + enemy.speed*bomb.time);
		
			aux = aux + 1;
		    }  
		}
		if(aux == 10) {
		    console.log('Your game crashed and you have to restart your PC. Look! I Gave you a repeated case!');
		    aux = 0;
		    //
		    // (enemy.speed > 2) == lastValueHigh)
		    while(aux != 10 && (enemy.speed*bomb.time) == lastMultiplicationValue && (enemy.speed*bomb.time)<11){
			enemy.speed = this.shuffleBag_Bomb_Get();
			
			console.log('Im trying to give you unrepeated cases. DEATH case');
			console.log('New case: ' + enemy.speed*bomb.time);
			
			aux = aux + 1;
			this.enemyDistancePool.getAt(this.bombPool.getIndex(bomb))
			var text = this.enemyDistanceTextPool.getAt(this.enemyDistancePool.getIndex(enemy));
			text.text = 'Velocidad: \n' + enemy.speed;
		    }
		}
		
		if(aux == 10){
		    console.log('Dude, I really tried');
		    console.log('I do this so you can win your game');
		    enemy.speed = 3;
		    bomb.time = 3;
		    var text = this.enemyDistanceTextPool.getAt(this.enemyDistancePool.getIndex(enemy));
		    text.text = 'Velocidad: \n' + enemy.speed;
		}
		
		aux = 0;
		lastMultiplicationValue = enemy.speed*bomb.time;
		
	    } else{
		bomb.time = this.game.rnd.integerInRange(2, 10);
	    }
	    //Setting the counter, to track the time to explosion of each bomb
	    bomb.counter = bomb.time;
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
    
    
    // Creates the button for the cannon.
    cannonButton_Setup: function() {
	this.cannonButton = this.add.button(this.world.width/2 - 67, this.world.height - 50, 'cannonButton', this.select_Cannon, this, null, null, 1, 1);
	this.cannonButton.anchor.setTo(0.5, 0.5);
	this.cannonButton.scale.setTo(0.27, 0.27);
	buttons.add(this.cannonButton);
    },

    cannonOnMouse_Setup: function() {
	// Image that appears on the mouse when the cannon button is pressed.
	this.cannonOnMouse = this.add.sprite(1000, 1000, 'cannon');
	this.cannonOnMouse.anchor.setTo(0.5, 0.5);
	this.cannonOnMouse.scale.setTo(0.06, 0.06);
	this.physics.enable(this.cannonOnMouse, Phaser.Physics.ARCADE);
    },
    
    // Creates the cannons.
    cannonPool_Setup: function() {
	this.cannonPool = this.add.group();
	this.cannonPool.enableBody = true;
	this.cannonPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.cannonPool.createMultiple(VELOCITY_ENEMIES, 'cannon');
	this.cannonPool.setAll('anchor.x', 0.5);
	this.cannonPool.setAll('anchor.y', 0.5);
	this.cannonPool.setAll('scale.x', 0.06);
	this.cannonPool.setAll('scale.y', 0.06);

	this.cannonTextPool = this.add.group();
	this.cannonPool.forEach(function(cannon) {
	    cannon.inputEnabled = true;
	    cannon.events.onInputDown.add(function(cannon) {
		cannon.kill();
		numberOfCannons += 1;
		this.cannonTextPool.getAt(this.cannonPool.getIndex(cannon)).visible = false;
	    }, this);
	    var text = this.add.text(0,0, '', { font: "20px Arial", fill: "rgb(0, 0, 0)", align: "left" }, this.cannonTextPool);
	    text.visible = false;
	    text.anchor.setTo(0.5, 0.5);
	}, this);
	/*
	// Group for the text displays
	this.cannonTextPool = this.add.group();
	// Time until explosion display.
	this.cannonPool.forEach(function() {
	    var text = this.add.text(0, 0, '', { font: "20px Arial", fill: "#000000", align: "left" }, this.cannonTextPool);
	    text.visible = false;
	    text.anchor.setTo(0.5, 0.5);
	}, this);*/
    },
       
    cannonSelectorButtonsPool_Setup: function() {
	this.cannonSelectorButtonsPool = this.add.group();
	// var button = this.add.button(195, 555, 'okButton', function() {this.put_Cannon()}, this, 2, 1, 2, 1);
	// this.cannonSelectorButtonsPool.add(button);
	var chosen = this.add.sprite(196, 554, 'chosen');
	this.cannonSelectorButtonsPool.add(chosen);
	var button = this.add.button(100, 460, 'button1', function() {this.set_Missile_Speed(1)}, this, 1, 0, 1, 0);
	this.cannonSelectorButtonsPool.add(button);
	button = this.add.button(87, 481, 'button2', function() {this.set_Missile_Speed(2)}, this, 1, 0, 1, 0);
	this.cannonSelectorButtonsPool.add(button);
	button = this.add.button(113, 481, 'button3', function() {this.set_Missile_Speed(3)}, this, 1, 0, 1, 0);
	this.cannonSelectorButtonsPool.add(button);
	button = this.add.button(74, 502, 'button4', function() {this.set_Missile_Speed(4)}, this, 1, 0, 1, 0);
	this.cannonSelectorButtonsPool.add(button);
	button = this.add.button(100, 502, 'button5', function() {this.set_Missile_Speed(5)}, this, 1, 0, 1, 0);
	this.cannonSelectorButtonsPool.add(button);
	button = this.add.button(126, 502, 'button6', function() {this.set_Missile_Speed(6)}, this, 1, 0, 1, 0);
	this.cannonSelectorButtonsPool.add(button);
	button = this.add.button(61, 524, 'button7', function() {this.set_Missile_Speed(7)}, this, 1, 0, 1, 0);
	this.cannonSelectorButtonsPool.add(button);
	button = this.add.button(87, 524, 'button8', function() {this.set_Missile_Speed(8)}, this, 1, 0, 1, 0);
	this.cannonSelectorButtonsPool.add(button);
	button = this.add.button(113, 524, 'button9', function() {this.set_Missile_Speed(9)}, this, 1, 0, 1, 0);
	this.cannonSelectorButtonsPool.add(button);
	button = this.add.button(139, 524, 'button10', function() {this.set_Missile_Speed(10)}, this, 1, 0, 1, 0);
	this.cannonSelectorButtonsPool.add(button);

	this.cannonSelectorButtonsPool.setAll('anchor.x', 0.5);
	this.cannonSelectorButtonsPool.setAll('anchor.y', 0.5);
	this.cannonSelectorButtonsPool.setAll('scale.x', 0.15);
	this.cannonSelectorButtonsPool.setAll('scale.y', 0.15);
	this.cannonSelectorButtonsPool.setAll('frame', 0);
	this.cannonSelectorButtonsPool.setAll('visible', false);
	button = this.cannonSelectorButtonsPool.getAt(0);
	button.scale.setTo(0.17, 0.17);
	button.frame = 1;
    },

    //Disables the velocity enemies shield
    deactivate_Enemy_Shield: function(enemy) {
	// this.enemyVelocityPool.forEachAlive(function(enemy) {
	//     enemy.animations.play('unshield');
	// }, this);
	console.log('Deactivate Shield');
	enemy.frame = 0;
	enemy.shielded = false;
	enemy.died = false;
	console.log(enemy.died);
    },

    // Decreases the velocity of the missiles.
    decrease_Fire: function() {
	if (!started && missileSpeed > 0) {
	    missileSpeed -= 1;
	}
    },
    
    // Decreases the velocity of the bullets.
    decrease_Time_Shield: function() {
	if (!started && shieldTime > 0) {
	    shieldTime -= 1;
	}
    },
    
    //Desalligns a number to get the x in the grid
    desallign_X: function(X){
	return (X-LEFT_MARGIN)/GRID_SPACE;
    },
    
    //Desalligns a number to get the y in the grid
    desallign_Y: function(Y){
	return (Y-UP_MARGIN)/GRID_SPACE;
    },
	  
    // Creates several text displays.
    displays_Setup: function(){

	this.otherTextPool = this.add.group();	
	// Game time display.
	this.levelText = this.add.text(931, 85, '' + this.level, { font: "30px Arial", fill: "#000000", align: "left" }, this.otherTextPool);
		
	// Display for velocity of the enemies.
	/*this.velocityText = this.add.text((this.allign_X(this.enemyPlace)), 20, 'Velocidad: ' + enemy.speed, { font: "20px Arial", fill: "#ffffff", align: "left" }, this.otherTextPool);*/

	// Display for the amount of bombPool left.
	this.bombsRemainingText = this.add.text(this.blackHoleButton.x, this.blackHoleButton.y - 44, '' + numberOfBombs, { font: "20px Arial", fill : "#000000", align: "left"}, this.otherTextPool);
	this.bombsRemainingText.anchor.setTo(0.5, 0.5);

	// Display for the time of the bomb.
	if(DISTANCE_ENEMIES > 0){
	    var bomb = this.bombPool.getFirstExists(false);	
	    this.bombOnMouseText = this.add.text(this.blackHoleButton.x, this.blackHoleButton.y, '' + bomb.time, { font: "20px Arial", fill : "#000000", align: "left"}, this.otherTextPool);
	    this.bombOnMouseText.anchor.setTo(0.5, 0.5);
	}
	
	//THIS IS NOT IN THE DISPLAYS_SETUP OF LEVEL 1, check if errors happens
	//------------------------------------------------
	if(VELOCITY_ENEMIES > 0){
	    // Display for the velocity of the missile.
	    this.cannonButtonText = this.add.text(this.cannonButton.x, this.cannonButton.y - 2, '' + missileSpeed, { font: "20px Arial", fill : "#000000", align: "left"}, this.otherTextPool);
	    this.cannonButtonText.anchor.setTo(0.5, 0.5);
	}
	//------------------------------------------------	

	// Game score display.
	this.scoreText = this.add.text(65.45, 100, '' + this.score, { font: "30px Arial", fill: "#000000", align: "center", weight: "bold", }, this.otherTextPool);
	this.scoreText.anchor.set(0.5);


	this.roundText = this.add.text(65.45, 200,'Ronda \n' +(TIMES_TO_PASS-this.timesPassed+1)+ '/7' , { font: "bold 20px Arial", fill: "#00ffff", align: "center" },this.otherTextPool);
	this.roundText.anchor.setTo(0.5,0.5);
	
    },

    // The enemy's shot.
    enemy_Fire: function(enemy) {
	var bullet = this.enemyBulletPool.getAt(this.enemyTimePool.getIndex(enemy));
	bullet.reset(enemy.x, enemy.y /* enemy.height/2*/);
	bullet.angle = 180;
	console.log(enemyBulletSpeed);
	console.log("Bala: "+this.enemyBulletPool.getIndex(bullet));
	/*bullet.body.velocity.y = enemyBulletSpeed * GRID_SPACE;*/
	bullet.body.velocity.y = enemy.shieldTime * GRID_SPACE;
	console.log(enemy.shieldTime);
	enemyShot = true;
    },

    // If the enemy is shot.
    enemy_Hit: function(enemy, bullet) {
	if (shotRebound) {
	    enemy.kill();
	    bullet.kill();
	    this.score = this.score+80;
	}
    },
    
    // Enemy's shieldTime text
    enemy_ShieldTime_Text_Setup: function() {
	this.shieldTimeText = this.add.group();
	
	this.enemyVelocityPool.forEachAlive(function(enemy) {
	    /*var display = this.add.text(enemy.x + 25, enemy.y, 'Tiempo: ' + enemy.shieldTime, { font: "20px Arial", fill: "#ffffff", align: "left" }, this.shieldTimeText);*/
	    var display = this.add.text(enemy.x-32, enemy.y-54, 'Tiempo: \n' + enemy.shieldTime, { font: "17px Arial", fill: "#ffffff", align: "center" }, this.shieldTimeText);
	    
	},this);
    },
     
    // Creates the bullets for the enemies shots
    enemyBulletPool_Setup: function() {
	this.enemyBulletPool = this.add.group();
	this.enemyBulletPool.enableBody = true;
	this.enemyBulletPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.enemyBulletPool.createMultiple(TIME_ENEMIES, 'bullet');
	this.enemyBulletPool.setAll('anchor.x', 0.5);
	this.enemyBulletPool.setAll('anchor.y', 0.5);
	this.enemyBulletPool.setAll('angle', 180);
	// this.enemyBulletPool.setAll('outOfBoundsKill', true);
	// this.enemyBulletPool.setAll('checkWorldBounds', true);
    },

    // Creates the distance enemies of the level.
    enemyDistancePool_Setup: function() {
	this.enemyDistancePool = this.add.group();
	this.enemyDistancePool.enableBody = true;
	this.enemyDistancePool.physicsBodyType = Phaser.Physics.ARCADE;
	this.enemyDistancePool.createMultiple(DISTANCE_ENEMIES, 'distanceEnemy');
	this.enemyDistancePool.setAll('anchor.x', 0.5);
	this.enemyDistancePool.setAll('anchor.y', 0.025);
	this.enemyDistancePool.setAll('outOfBoundsKill', true);
	this.enemyDistancePool.setAll('checkWorldBounds', true);
	this.enemyDistancePool.setAll('scale.x', 0.067);
	this.enemyDistancePool.setAll('scale.y', 0.067);

	//this.enemyDistancePool.setAll('scale.x', 0.125);
	//this.enemyDistancePool.setAll('scale.y', 0.125);

	this.enemyDistancePool.forEach(function(enemy) {
	    // var enemy = this.enemyDistancePool.getFirstExists(false);
	    // enemy.reset(this.rnd.integerInRange(200, 800), 100);
	    initialY = 40 - (enemy.height/2);
	    //enemy.place = this.game.rnd.integerInRange(1, COLUMNS_NUMBER);
	    //console.log('Remainder of Times passed:' + this.timesPassed%2);
	    
	    enemy.place = this.shuffleBag_X_Axis_Get();
	    
	    //This controls enemies X axis 
	    if(TOTAL_ENEMIES > 1){
		while(enemy.place %2 != this.timesPassed%2){
		    console.log('I have been there before in X');
		    enemy.place = this.shuffleBag_X_Axis_Get();
		}
	    }
	    
	    aux1 = this.allign_X(enemy.place)-(GRID_SPACE/2);
	    enemy.frame = enemy.speed;
	    enemy.reset(aux1, initialY);
	    
	    enemy.speed = this.shuffleBag_Bomb_Get();
	    
	    aux = 0;
	    if(TOTAL_ENEMIES < 3){
		while( ((enemy.speed > 2) == lastValueHigh) && aux != 10 ){
		    enemy.speed = this.shuffleBag_Bomb_Get();
		    console.log('Im trying to change your speed');
		    aux = aux + 1;
		}  
	    }
	    if(aux == 10) console.log('Your game crashed and you have to restart your PC.');
	    
	    lastValueHigh = !lastValueHigh;
	    aux = 0;

	    enemy.body.setSize(100, 100, 0, enemy.height/2);
	    enemy.inputEnabled = true;
	    
	    enemy.events.onInputOver.add(function(enemy) {
		enemy.frame = enemy.speed + 10;
		enemy.scale.setTo(0.15, 0.15);
		enemy.body.reset(enemy.x, enemy.y);
	    }, this);
	    enemy.events.onInputOut.add(function(enemy) {
		enemy.frame = enemy.speed;
		enemy.scale.setTo(0.067, 0.067);
		enemy.body.reset(enemy.x, enemy.y);
	    }, this);
	}, this);
	
	// Group for the text displays
	this.enemyDistanceTextPool = this.add.group();
	// Velocity of each enemy.
	this.enemyDistancePool.forEach(function(enemy) {
	    /*var text = this.add.text((this.allign_X(enemy.place))+38, 20, 'Velocidad: ' + enemy.speed, { font: "17px Arial", fill: "#ffffff", align: "left" }, this.enemyDistanceTextPool);*/
	    var text = this.add.text((this.allign_X(enemy.place))-19, 14, 'Velocidad: \n' + enemy.speed, { font: "14px Arial", fill: "#ffffff", align: "center" }, this.enemyDistanceTextPool);
	    text.visible = true;
	    text.anchor.setTo(0.5, 0.5);
	}, this);
    },

    // Creates the Time enemies of the level.
    enemyTimePool_Setup: function() {
	this.enemyTimePool = this.add.group();
	this.enemyTimePool.enableBody = true;
	this.enemyTimePool.physicsBodyType = Phaser.Physics.ARCADE;
	this.enemyTimePool.createMultiple(TIME_ENEMIES, 'timeEnemy');
	this.enemyTimePool.setAll('anchor.x', 0.5);
	this.enemyTimePool.setAll('anchor.y', 0.5);
	this.enemyTimePool.setAll('outOfBoundsKill', true);
	this.enemyTimePool.setAll('checkWorldBounds', true);
	//this.enemyTimePool.setAll('scale.x', 0.075);
	//this.enemyTimePool.setAll('scale.y', 0.075);
	this.enemyTimePool.setAll('scale.x', 0.055);
	this.enemyTimePool.setAll('scale.y', 0.055);
	console.log('Time Enemies');
	this.enemyTimePool.forEach(function(enemy) {
	    this.get_Enemy_Distance_Speed(enemy);
	    this.simulationTime = this.simulationTime + 2*(enemy.pos/enemy.shieldTime);
	    initialY =this.allign_Y(10-enemy.pos)
	    //initialY = 55 - (enemy.height/2);
	    //initialY = 50 - (enemy.height/2);
	    //this.enemyPlace= this.game.rnd.integerInRange(1, COLUMNS_NUMBER);
	    this.enemyPlace = this.shuffleBag_X_Axis_Get();
	    
	    aux1 = this.allign_X(this.enemyPlace) -(GRID_SPACE/2);
	    enemy.frame = 1;
	    enemy.reset(aux1, initialY);
	    enemy.body.setSize(100, 100, 0, enemy.height/2);
	    // enemy.animations.add('shield', [1, 0], 10, false);
	    // enemy.animations.add('unshield', [0, 1], 10, false);
	}, this);
	
	// Group for the text displays
	this.enemyTimeTextPool = this.add.group();
	// Velocity of each enemy.
	this.enemyTimePool.forEach(function(enemy) {
	    var text = this.add.text(/*(this.allign_X(this.enemyPlace))*/enemy.x+60, enemy.y, 'Velocidad: ' + enemy.shieldTime, { font: "17px Arial", fill: "#ffffff", align: "left" }, this.enemyTimeTextPool);
	    text.visible = true;
	    text.anchor.setTo(0.5, 0.5);
	}, this);

    },
    
    // Creates the velocity enemies' laser.
    enemyVelocityLaserPool_Setup: function() {
	this.enemyVelocityLaserPool = this.add.group();
	this.enemyVelocityLaserPool.enableBody = true;
	this.enemyVelocityLaserPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.enemyVelocityLaserPool.createMultiple(VELOCITY_ENEMIES, 'velocityEnemyLaser');
	this.enemyVelocityLaserPool.setAll('anchor.x', 0.5);
	// this.enemyVelocityLaserPool.setAll('anchor.y', 0.5);
	this.enemyVelocityLaserPool.setAll('scale.x', 0.12);
	this.enemyVelocityLaserPool.setAll('scale.y', 0.09);
	this.enemyVelocityLaserPool.setAll('outOfBoundsKill', true);
	this.enemyVelocityLaserPool.setAll('checkWorldBounds', true);

	this.enemyVelocityLaserPool.forEach(function(laser) {
	    // laser.body.setSize(10, 100, 0, 0);
	    laser.animations.add('laser1', [0,1], 10, false);
	    laser.animations.add('laser2', [0,1,2], 10, false);
	    laser.animations.add('laser3', [0,1,2,3], 10, false);
	    laser.animations.add('laser4', [0,1,2,3,4], 10, false);
	    laser.animations.add('laser5', [0,1,2,3,4,5], 10, false);
	    laser.animations.add('laser6', [0,1,2,3,4,5,6], 10, false);
	    laser.animations.add('laser7', [0,1,2,3,4,5,6,7], 10, false);
	    laser.animations.add('laser8', [0,1,2,3,4,5,6,7,8], 10, false);
	    laser.animations.add('laser9', [0,1,2,3,4,5,6,7,8,9], 10, false);
	    laser.animations.add('laser10', [0,1,2,3,4,5,6,7,8,9,10], 10, false);
	}, this);
    },

    // Creates the velocity enemies of the level.
    enemyVelocityPool_Setup: function() {
	this.enemyVelocityPool = this.add.group();
	this.enemyVelocityPool.enableBody = true;
	this.enemyVelocityPool.physicsBodyType = Phaser.Physics.ARCADE;
	// console.log("T" + TOTAL_ENEMIES);
	this.enemyVelocityPool.createMultiple(VELOCITY_ENEMIES,'velocityEnemy');
	this.enemyVelocityPool.setAll('anchor.x', 0.5);
	this.enemyVelocityPool.setAll('anchor.y', 0.2);
	this.enemyVelocityPool.setAll('outOfBoundsKill', true);
	this.enemyVelocityPool.setAll('checkWorldBounds', true);
	this.enemyVelocityPool.setAll('scale.x', 0.1);
	this.enemyVelocityPool.setAll('scale.y', 0.1);
	this.enemyVelocityPool.setAll('shielded', true);


	// //this.enemyDistance = this.game.rnd.integerInRange(1, 10);
	// //Sets the value of enemyShieldSpeed and enemyGridDistance
	this.enemyVelocityPool.forEach(function(enemy) {
// <<<<<<< HEAD
	    this.get_Enemy_Distance_Speed(enemy);
	    
	    aux = 0;
	    if(TOTAL_ENEMIES < 3){
		while( (enemy.shieldTime > 5) == lastValueHigh && aux != 40 && (enemy.shieldTime*enemy.pos) != lastMultiplicationValue ){
		    //enemy.shieldTime = this.shuffleBag_Bomb_Get();
		    this.get_Enemy_Distance_Speed(enemy);
		    console.log('Im trying to change your case');
		    aux = aux + 1;
		}  
	    }
	    if(aux == 10) console.log('Your game crashed and you have to restart your PC.');
	    lastValueHigh = !lastValueHigh;
	    lastMultiplicationValue = enemy.shieldTime*enemy.pos; 
	    aux = 0;
	    
	    this.simulationTime = this.simulationTime + enemy.shieldTime;
	    //initialY = 50 - (enemy.height/2);
//	    initialY = initialY + this.allign_Y(10 - enemy.pos) - UP_MARGIN;
// =======
	    //The commented lines are no longer used
 	    initialY =this.allign_Y(10-enemy.pos)/*+ (enemy.height/7)*/;
// >>>>>>> 15591947b44f925a54d43b0defc9e55c25554336
	    
	    this.enemyPlace = this.shuffleBag_X_Axis_Get();
	    
	    //This controls enemies X axis 
	    if(TOTAL_ENEMIES > 1){
		while(this.enemyPlace %2 != this.timesPassed%2){
		    console.log('I have been there before in X');
		    this.enemyPlace = this.shuffleBag_X_Axis_Get();
		}
	    }
	    
	    //this.enemyPlace = this.game.rnd.integerInRange(1, COLUMNS_NUMBER);
	    
	    //This can be erased at any time, is used to test the function
	    //--------------------------------------------------------------
	    // console.log('Im here, the next function gives you the Y place of the enemy');
	    // console.log('The first row is 0, and is the one at the top')
	    // console.log(this.desallign_Y(initialY));
	    //--------------------------------------------------------------

 	    aux1 = this.allign_X(this.enemyPlace) - (GRID_SPACE/2);
	    enemy.frame = 1;
	    enemy.reset(aux1, initialY);
	    enemy.body.setSize(100, 100, 0, 0);
	    // enemy.animations.add('shield', [1, 0], 10, false);
	    // enemy.animations.add('unshield', [0, 1], 10, false);
	}, this);

    // Group for the text displays
	// this.enemyVelocityTextPool = this.add.group();
	// // Time of each enemy.
	// this.enemyVelocityPool.forEach(function(enemy) {
	//     var text = this.add.text((this.allign_X(this.enemyPlace))+38, enemy.y, 'Escudo: ' + this.enemyShieldSpeed, { font: "17px Arial", fill: "#ffffff", align: "left" }, this.enemyVelocityTextPool);
	//     text.visible = true;
	//     text.anchor.setTo(0.5, 0.5);
	// }, this);
    },

    // Makes the cannon shoot.
    fire: function(cannon) {
	// console.log('fool');
	var missile = this.missilePool.getAt(this.cannonPool.getIndex(cannon));
	// missile.reset(cannon.x, cannon.y + missile.height/4);
	missile.reset(cannon.x, cannon.y);
	
// <<<<<<< HEAD
	// missile.body.velocity.y = (-1) * missileSpeed * GRID_SPACE;
	missile.body.velocity.y = (-1) * cannon.shotVelocity * GRID_SPACE;

	this.enemyVelocityPool.forEachAlive(function(enemy) {
	    // this.time.events.add(Phaser.Timer.SECOND * (enemy.shieldTime * 0.8), this.deactivate_Enemy_Shield, this, enemy);
	    // this.time.events.add(Phaser.Timer.SECOND * (enemy.shieldTime * 1.2), this.activate_Enemy_Shield, this, enemy);
	//     this.time.events.add(Phaser.Timer.SECOND * (enemy.shieldTime * 1.2), this.activate_Enemy_Shield, this, enemy);
	// }, this);
	// cannon.shot = true;
	    //this.time.events.add(Phaser.Timer.SECOND * (enemy.shieldTime * 0.85), this.deactivate_Enemy_Shield, this, enemy);
	    //this.time.events.add(Phaser.Timer.SECOND * (enemy.shieldTime * 1.05), this.activate_Enemy_Shield, this, enemy);
	    
	    // this.time.events.add(Phaser.Timer.SECOND * (enemy.shieldTime-1), this.deactivate_Enemy_Shield, this, enemy);
	    // this.time.events.add(Phaser.Timer.SECOND * (enemy.shieldTime+0.1), this.activate_Enemy_Shield, this, enemy);
	    
	    cannon.shot = true;
	}, this);

// =======
// 	missile.body.velocity.y = (-1) * missileSpeed * GRID_SPACE;
	// this.time.events.add(Phaser.Timer.SECOND * (this.enemyShieldSpeed * 0.75), this.deactivate_Enemy_Shield, this);
	// //The second timer should not  generate the shield, instead the enemy should shoot some thing to the player 
	// this.time.events.add(Phaser.Timer.SECOND * (this.enemyShieldSpeed * 1.05), this.activate_Enemy_Shield, this);
// 	shot = true;
// >>>>>>> 15591947b44f925a54d43b0defc9e55c25554336
    },
    
    // Function used both for enemies of the time and Velocity
    // If used in velocity enemies, enemy.pos represents the position,
    // and enemy.shieldTime represents the time to activate the shield
    // If used in time enemies, enemy.pos represents the position,
    // and enemy.shieldTime represents the velocity of the enemy bullet 
    get_Enemy_Distance_Speed: function(enemy){
	aux = this.shuffleBag_Velocity_Get();
	//aux = this.game.rnd.integerInRange(1, 27);
	if (aux > 13){
	    if (aux > 20){
		if(aux>23){
		    if(aux == 24) {
			enemy.pos = 10;
			enemy.shieldTime = 1;
		    }
		    if(aux == 25) {
			enemy.pos = 10;
			enemy.shieldTime = 2;
		    }
		    if(aux == 26) {
			enemy.pos = 10;
			enemy.shieldTime = 5;
		    }
		    if(aux == 27) {
			enemy.pos = 10;
			enemy.shieldTime = 10;
		    }
		}else{
		    if(aux == 21) {
			enemy.pos = 9;
			enemy.shieldTime = 1;
		    }
		    if(aux == 22) {
			enemy.pos = 9;
			enemy.shieldTime = 3;
		    }
		    if(aux == 23) {
			enemy.pos = 9;
			enemy.shieldTime = 9;
		    }
		}
	    }else{
		if(aux>17){
		    if(aux == 18) {
			enemy.pos = 8;
			enemy.shieldTime = 2;
		    }
		    if(aux == 19) {
			enemy.pos = 8;
			enemy.shieldTime = 4;
		    }
		    if(aux == 20) {
			enemy.pos = 8;
			enemy.shieldTime = 8;
		    } 
		}else{
		    if(aux == 14) {
			enemy.pos = 6;
			enemy.shieldTime = 6;
		    }
		    if(aux == 15) {
			enemy.pos = 7;
			enemy.shieldTime = 1;
		    }
		    if(aux == 16) {
			enemy.pos = 7;
			enemy.shieldTime = 7;
		    }
		    if(aux == 17) {
			enemy.pos = 8;
			enemy.shieldTime = 1;
		    }
		}
	    }
	}else{
	    
	    if (aux > 7){
		if(aux>10){
		    if(aux == 11) {
			enemy.pos = 6;
			enemy.shieldTime = 1;
		    }
		    if(aux == 12) {
			enemy.pos = 6;
			enemy.shieldTime = 2;
		    }
		    if(aux == 13) {
			enemy.pos = 6;
			enemy.shieldTime = 3;
		    } 
		}else{
		    if(aux == 8) {
			enemy.pos = 4;
			enemy.shieldTime = 4;
		    }
		    if(aux == 9) {
			enemy.pos = 5;
			enemy.shieldTime = 1;
		    }
		    if(aux == 10) {
			enemy.pos = 5;
			enemy.shieldTime = 5;
		    }
		}
	    }else{
		if(aux>4){
		    if(aux == 5) {
			enemy.pos = 3;
			enemy.shieldTime = 3;
		    }
		    if(aux == 6) {
			enemy.pos = 4;
			enemy.shieldTime = 1;
		    }
		    if(aux == 7) {
			enemy.pos = 4;
			enemy.shieldTime = 2;
		    } 
		}else{
		    if(aux == 1) {
			enemy.pos = 5;
			enemy.shieldTime = 5;
		    }
		    if(aux == 2) {
			enemy.pos = 2;
			enemy.shieldTime = 1;
		    }
		    if(aux == 3) {
			enemy.pos = 2;
			enemy.shieldTime = 2;
		    }
		    if(aux == 4) {
			enemy.pos = 3;
			enemy.shieldTime = 1;
		    }
		}    
	    }
	    
	}
	// console.log(aux);
	// console.log("ENEPOS"+enemy.pos);
	// console.log("ENETIME"+enemy.shieldTime);
    },

    // Function used to return to the main menu
    go_To_Home: function(){
	//Return to the main menu only if the game has begun
	if(this.beginGame){
	    goHome = true;
	    this.quit_Game(false);
	}
    },

    // Creates the play button
    homeButton_Setup: function() {
	this.homeButton = this.add.button(this.world.width - 65.45, this.world.centerY - 100 , 'homeButton', this.go_To_Home, this, 0, 0, 1, 0);
	this.homeButton.anchor.setTo(0.5, 0.5);
	this.homeButton.scale.setTo(0.7, 0.7);
	buttons.add(this.homeButton);
    },


    // Increases the velocity of the missiles.
    increase_Fire: function() {
	if (!started) {
	    missileSpeed += 1;
	}
    },

    // Increases the velocity of the bullets.
    increase_Time_Shield: function() {
	if (!started) {
	    shieldTime += 1;
	}
    },
    
    // Creates the locked buttons
    lockedButtons_Setup: function() {
	
	lockedButtons = this.add.group();
	lockedButtons.createMultiple(2, 'lockedButton');
	lockedButtons.setAll('anchor.x', 0.5);
	lockedButtons.setAll('anchor.y', 0.5);
	lockedButtons.setAll('outOfBoundsKill', true);
	lockedButtons.setAll('checkWorldBounds', true);
	lockedButtons.setAll('alpha',0.85);
	//This is used with lock4.png
	lockedButtons.setAll('scale.x', 0.03);
	lockedButtons.setAll('scale.y', 0.03);
	
	/* This is used with lockedButton.png
	lockedButtons.setAll('scale.x', 0.12);
	lockedButtons.setAll('scale.y', 0.12);
	*/

	//Generalized form, it should cover the level 1, 2 and 3
	/*
	if(this.level < 3){
	    lockedButtons.getAt(0).reset(this.world.width/2 + 67, this.world.height - 50);
	}
	if(this.level < 2){
	    lockedButtons.getAt(1).reset(this.world.width/2 - 67, this.world.height - 50);
	}*/
/*
	if(this.level == 1 ){
	    lockedButtons.getAt(1).reset(this.world.width/2 - 67, this.world.height - 50);
	    lockedButtons.getAt(0).reset(this.world.width/2 + 67, this.world.height - 50);
	}
	else if(this.level == 2 ){
	    lockedButtons.getAt(1).reset(this.world.width/2, this.world.height - 82);
	    lockedButtons.getAt(0).reset(this.world.width/2 + 67, this.world.height - 50);
	}
	else if(this.level == 3 ){
	    lockedButtons.getAt(1).reset(this.world.width/2 - 67, this.world.height - 50);
	    lockedButtons.getAt(0).reset(this.world.width/2, this.world.height - 82);
	    } else {}
*/
	// The game should not have a level without unlocked weapons
	// If there are not distance enemies, lock the bombs
	if(DISTANCE_ENEMIES == 0){
	    var button = lockedButtons.getFirstExists(false);	
	    button.reset(this.world.width/2, this.world.height - 82);
	}
	// If there are not velocity enemies, lock the cannons
	if(VELOCITY_ENEMIES == 0){
	    var button = lockedButtons.getFirstExists(false);	
	    button.reset(this.world.width/2 - 67, this.world.height - 50);
	}
	// If there are not time enemies, lock the shields
	if(TIME_ENEMIES == 0){
	    var button = lockedButtons.getFirstExists(false);	
	    button.reset(this.world.width/2 + 67, this.world.height - 50);
	}

    },
    
    // Creates the missiles.
    missilePool_Setup: function() {
	this.missilePool = this.add.group();
	this.missilePool.enableBody = true;
	this.missilePool.physicsBodyType = Phaser.Physics.ARCADE;
	this.missilePool.createMultiple(VELOCITY_ENEMIES, 'missile');
	this.missilePool.setAll('anchor.x', 0.5);
	this.missilePool.setAll('anchor.y', 0.5);
	this.missilePool.setAll('scale.x', 0.2);
	this.missilePool.setAll('scale.y', 0.2);
	// this.missilePool.setAll('angle', 180);
	this.missilePool.setAll('outOfBoundsKill', true);
	this.missilePool.setAll('checkWorldBounds', true);
	this.missilePool.forEach(function(missile) {
	    missile.body.setSize(10, 10, 0, -25);
	}, this);
    },    
    
    //If a sprite is out of the vertical axis of the grid, exits the game
    out_Of_GridY: function(sprite) {
	//Commented lines are the code to be used in a function out_Of_GridX
	
	//auxX = parseInt((sprite.x-LEFT_MARGIN+GRID_SPACE)/GRID_SPACE);
	//auxY = parseInt((sprite.y-UP_MARGIN+GRID_SPACE)/GRID_SPACE);
	auxY = (sprite.y-UP_MARGIN+GRID_SPACE)/GRID_SPACE;
    
	//if(auxX < 1) this.gridX = 1;
	//if(auxX > 16) this.gridX = 16;
    
	if(auxY < 1) /*console.log(auxY)*/;
	if(auxY > 11.5) this.quit_Game(false);/*console.log(auxY)*/
    },
    
    // Creates a black hole bomb in the place clicked inside the grid.
    put_Weapon: function() {
	if (!started && this.beginGame) {
	    if (usingBlackHole && (numberOfBombs > 0)) {
		// Puts an instance of a bomb
		this.find_Grid_Place();
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
		if (numberOfBombs > 0) {
		    this.bombOnMouse.reset(this.world.width/2, this.world.height - 82);
		} else {
		    this.bombOnMouse.reset(1000, 1000);
		}
		
		//var bomb = this.bombPool.getFirstExists(false);	
		//if(bomb!= null) this.bombOnMouseText.text = '' + bomb.time;
		
		//this.bombOnMouseText.visible = false;
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
    
    // DEPRECATED, USE PUT_WEAPON INSTEAD
    // Creates a black hole bomb in the place clicked inside the grid.
    /*
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
    //DEPRECATED, USE PUT_WEAPON INSTEAD
    */
     
    // Lets the player use the cannons.
    select_Cannon: function() {
	if (!started){
	    usingCannon = (numberOfCannons > 0);
	    this.selector.getAt(0).frame = 1;
	    this.cannonSelectorButtonsPool.setAll('visible', true);
	    if (!usingCannon) {
		// this.bombPool.removeAll();
		this.cannonPool.forEachAlive(function(cannon) {
		    cannon.kill();
		    var text = this.cannonTextPool.getAt(this.cannonPool.getIndex(cannon));
		text.visible = false;
		//text.x = cannon.x;
		//text.y = cannon.y + 15;
		//text.text = '' + cannon.shotVelocity;

		}, this);
		/*this.bombTextPool.forEach(function(display) {
		  display.visible = false;
		  }, this);*/
		numberOfCannons = VELOCITY_ENEMIES;
	    }
	}
    },

    // Lets the player use the shield
    select_Shield: function() {
	if (!started){
	    usingShield = (numberOfShields > 0);
	    this.selector.getAt(1).frame = 1;
	    this.shieldSelectorButtonsPool.setAll('visible', true);
	    if (!usingShield) {
		this.shieldPool.forEachAlive(function(shield) {
		    this.shieldTextPool.getAt(this.shieldPool.getIndex(shield)).visible = false;
		    shield.kill();
		}, this);
		numberOfShields = TIME_ENEMIES;
	    }
	}
    },

    set_Missile_Speed: function(speed) {
	missileSpeed = speed;
	this.cannonSelectorButtonsPool.getAt(0).frame = speed + 1;
    },


    set_Shield_Time: function(time) {
	shieldTime = time;
	this.shieldSelectorButtonsPool.getAt(0).frame = time + 1;
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
	this.shieldPool.createMultiple(TIME_ENEMIES, 'shield');
	this.shieldPool.setAll('anchor.x', 0.5);
	this.shieldPool.setAll('anchor.y', 0.5);
	this.shieldPool.setAll('scale.x', 0.12);
	this.shieldPool.setAll('scale.y', 0.12);
	this.shieldPool.setAll('shieldActive', false);
	this.shieldTextPool = this.add.group();
	this.shieldPool.forEach(function(shield) {
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

    //-----------------------------------------------------------------------------
    // Gets next element from the shuffle Bag
    
    shuffleBag_Bomb_Get: function(/*random*/){
	// If shuffleBag is empty, restart the shuffleBag (function)
	if (this.shuffleBagBomb.countLiving() == 0){
	    this.shuffleBag_Bomb_Restart();
	}
	// Set random values to match values of next element in shuffle Bag 
	element = this.shuffleBagBomb.getRandom( 5-(this.shuffleBagBomb.countLiving()));
	random = element.value;
	// Kill the element used
	element.kill();
	
	//console.log('Element Index ' + this.shuffleBag.getIndex(element));
	//this.shuffleBag.bringToTop(element);
	this.shuffleBagBomb.sendToBack(element);
	//console.log('Element Index2 ' + this.shuffleBag.getIndex(element));
	
	//Sum 1 to be compatible with get_Enemy_Distance
	return (random+1);
    },
    //Restart the shuffle bag once is "empty"
    shuffleBag_Bomb_Restart: function(){
	//Revive all elements from the shuffleBag
	console.log('Everyday Im Shuffling');
	this.shuffleBagBomb.forEachDead(function(element){
	    element.reset();
	},this);   
    },
    // Create and initialize the Shuffle Bag
    shuffleBag_Bomb_Setup: function(){
	// Create the Shuffle Bag with "SHUFFLEBAG_ELEMENTS" elements
	this.shuffleBagBomb = this.add.group();
	this.shuffleBagBomb.createMultiple(/*SHUFFLEBAG_ELEMENTS*/5,'','',true);   
	// Initializes the shuffle bag, each element having its index value
	this.shuffleBagBomb.forEach(function(element) {
	    element.value = this.shuffleBagBomb.getIndex(element);
	}, this);
    },
    
    shuffleBag_Velocity_Get: function(/*random*/){
	// If shuffleBag is empty, restart the shuffleBag (function)
	if (this.shuffleBagVelocity.countLiving() == 0){
	    this.shuffleBagVelocity_Restart();
	}
	// Set random values to match values of next element in shuffle Bag 
	element = this.shuffleBagVelocity.getRandom( 27-(this.shuffleBagVelocity.countLiving()));
	random = element.value;
	// Kill the element used
	element.kill();
	
	//console.log('Element Index ' + this.shuffleBag.getIndex(element));
	//this.shuffleBag.bringToTop(element);
	this.shuffleBagVelocity.sendToBack(element);
	//console.log('Element Index2 ' + this.shuffleBag.getIndex(element));
	
	//Sum 1 to be compatible with get_Enemy_Distance
	return (random+1);
    },
    //Restart the shuffle bag once is "empty"
    shuffleBag_Velocity_Restart: function(){
	//Revive all elements from the shuffleBag
	console.log('I get here Dude');
	this.shuffleBagVelocity.forEachDead(function(element){
	    element.reset();
	},this);   
    },
    // Create and initialize the Shuffle Bag
    shuffleBag_Velocity_Setup: function(){
	// Create the Shuffle Bag with "SHUFFLEBAG_ELEMENTS" elements
	console.log("HOLA");

	this.shuffleBagVelocity = this.add.group();
	this.shuffleBagVelocity.createMultiple(/*SHUFFLEBAG_ELEMENTS*/27,'','',true);   
	// Initializes the shuffle bag, each element having its index value
	this.shuffleBagVelocity.forEach(function(element) {
	    element.value = this.shuffleBagVelocity.getIndex(element);
	}, this);
    },    
    
    shuffleBag_X_Axis_Get: function(/*random*/){
	// If shuffleBag is empty, restart the shuffleBag (function)
	if (this.shuffleBagXAxis.countLiving() == 0){
	    this.shuffleBag_X_Axis_Restart();
	}
	// Set random values to match values of next element in shuffle Bag 
	element = this.shuffleBagXAxis.getRandom( 16-(this.shuffleBagXAxis.countLiving()));
	random = element.value;
	// Kill the element used
	element.kill();
	
	//console.log('Element Index ' + this.shuffleBag.getIndex(element));
	//this.shuffleBag.bringToTop(element);
	this.shuffleBagXAxis.sendToBack(element);
	//console.log('Element Index2 ' + this.shuffleBag.getIndex(element));
	
	//Sum 1 to be compatible with get_Enemy_Distance
	return (random+1);
    },
    //Restart the shuffle bag once is "empty"
    shuffleBag_X_Axis_Restart: function(){
	//Revive all elements from the shuffleBag
	console.log('I get here Dude');
	this.shuffleBagXAxis.forEachDead(function(element){
	    element.reset();
	},this);   
    },
    // Create and initialize the Shuffle Bag
    shuffleBag_X_Axis_Setup: function(){
	// Create the Shuffle Bag with "SHUFFLEBAG_ELEMENTS" elements
	this.shuffleBagXAxis = this.add.group();
	this.shuffleBagXAxis.createMultiple(/*SHUFFLEBAG_ELEMENTS*/16,'','',true);   
	// Initializes the shuffle bag, each element having its index value
	this.shuffleBagXAxis.forEach(function(element) {
	    element.value = this.shuffleBagXAxis.getIndex(element);
	}, this);
    },

    //-----------------------------------------------------------------------------

    // If the enemy's shild is deactivated the enemy is killed.
    try_To_Destroy_Time: function(enemy, bullet) {
	if (!enemyShield) {
	    enemy.kill();
	    //this.score = this.score + 80;
	} else {
	    var vel = bullet.body.velocity.y;
	    bullet.body.velocity.y = -vel;
	    bullet.angle = 180;
	}
    },
    
    // If the enemy's shild is deactivated the enemy is killed.
    try_To_Destroy_Velocity: function(enemy, missile) {
	var cannon = this.cannonPool.getAt(this.missilePool.getIndex(missile));
	// console.log("PROBANDO: " + (enemy.pos == missileSpeed * enemy.shieldTime));
	// console.log("POS: " + enemy.pos);
	// console.log("SPEED: " + missileSpeed)
	// if (!enemy.shielded && (enemy.pos == missileSpeed * enemy.shieldTime)) {
	if (enemy.pos == cannon.shotVelocity * enemy.shieldTime) {
	    console.log('Killing');
	    this.shieldTimeText.getAt(this.enemyVelocityPool.getIndex(enemy)).visible = false;
	    enemy.kill();
	    this.score = this.score + 80;
	    enemy.died = true;
	    console.log(enemy.died);
	}// else{
	  //  
	//}
	missile.kill();
    },
    
    you_Got_Shot: function() {
	this.quit_Game(false);
    },

    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------

};

// 26/12/2014 
// List of functions, Made to change the actual list of functions passed
//-----------------------------------------------------------------------------
/*List of functions passed
  this.allign_X,
  this.allign_Y,
  this.blackHoleButton_Setup,
  this.bombOnMouse_Setup,
  this.buttonPanel_Setup,
  //this.bombPool_Setup,
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
  this.try_To_Destroy			 
*/

/*Functions used Nivel1.js
  begin_Game
  blackScreen_Displays_Setup
  bombPool_Setup  	  
  displays_Setup
  enemyDistancePool_Setup
  lockedButtons_Setup
  put_Bomb
  quit_Game
*/
/*Functions used in Nivel2.js
  activate_Enemy_Shield
  begin_Game
  blackScreen_Displays_Setup
  bombPool_Setup
  cannonButton_Setup
  cannonOnMouse_Setup
  cannonPool_Setup
  cannonSelectorButtonsPool_Setup
  deactivate_Enemy_Shield
  decrease_Fire
  desallign_X
  desallign_Y
  displays_Setup
  enemy_ShieldTime_Text_Setup
  enemyVelocityLaserPool_Setup
  enemyVelocityPool_Setup
  fire
  get_Enemy_Distance_Speed
  increase_Fire
  lockedButtons_Setup
  missilePool_Setup
  put_Weapon
  quit_Game
  select_Cannon
  set_Missile_Speed
  shuffleBag_Get
  shuffleBag_Restart
  shuffleBag_Setup
  try_To_Destroy_Velocity
  you_Got_Shot
*/

/*Functions used in Nivel3.js
  activate_Enemy_Shield
  begin_Game
  blackScreen_Displays_SetupbombPool_Setup
  cannonButton_Setup
  cannonOnMouse_Setup
  cannonPool_Setup
  cannonSelectorButtonsPool_Setup
  deactivate_Enemy_Shield
  decrease_Fire
  decrease_Time_Shield
  displays_Setup
  enemy_Fire
  enemy_Hit
  enemyBulletPool_Setup
  enemyVelocityPool_Setup
  enemyTimePool_Setup
  fire 
  get_Enemy_Distance_Speed
  increase_Fire
  increase_Time_Shield
  lockedButtons_Setup
  missilePool_Setup
  out_Of_GridY
  put_Weapon
  quit_Game
  select_Cannon
  select_Shield
  set_Missile_Speed
  set_Shield_Time
  shield_Hit
  shieldButton_Setup
  shieldOnMouse_Setup
  shieldPool_Setup
  shieldSelectorButtonsPool_Setup
  try_To_Destroy_Velocity
  you_Got_Shot
*/

//Functions that should be passed to every level
/*
ALL NIGGA, ALL, Here is the list of all functions in MainMenu.js 05/01/2015
allign_X,
allign_Y,
blackHoleButton_Setup,
bombOnMouse_Setup,
buttonPanel_Setup,
bombPool_Setup,
countdown,
find_Grid_Place,
make_Grid,
minusButton_Setup,
plusButton_Setup,
playButton_Setup,
select_Bomb,
selector_Setup,
start,
try_To_Destroy  
  ++
activate_Enemy_Shield
begin_Game
blackScreen_Displays_Setup
bombPool_Setup
cannonButton_Setup
cannonOnMouse_Setup
cannonPool_Setup
cannonSelectorButtonsPool_Setup
deactivate_Enemy_Shield
decrease_Fire
decrease_Time_Shield
desallign_X
desallign_Y
displays_Setup
enemy_Fire
enemy_Hit
enemy_ShieldTime_Text_Setup
enemyBulletPool_Setup
enemyDistancePool_Setup
enemyTimePool_Setup
enemyVelocityLaserPool_Setup
enemyVelocityPool_Setup
fire
get_Enemy_Distance_Speed
increase_Fire
increase_Time_Shield
lockedButtons_Setup
missilePool_Setup
out_Of_GridY
put_Weapon
select_Cannon
select_Shield
set_Missile_Speed
set_Shield_Time
shield_Hit
shieldButton_Setup
shieldOnMouse_Setup
shieldSelectorButtonsPool_Setup
shuffleBag_Get
shuffleBag_Restart
shuffleBag_Setup
try_To_Destroy_Time
try_To_Destroy_Velocity
you_Got_Shot
*/


/* Here is the same list, as is going to be passed through every level
this.activate_Enemy_Shield
this.allign_X,
this.allign_Y,
this.begin_Game
this.blackHoleButton_Setup,
this.blackScreen_Displays_Setup
this.bombOnMouse_Setup,
this.bombPool_Setup
this.buttonPanel_Setup,
this.cannonButton_Setup
this.cannonOnMouse_Setup
this.cannonPool_Setup
this.cannonSelectorButtonsPool_Setup
this.countdown,
this.deactivate_Enemy_Shield
this.decrease_Fire
this.decrease_Time_Shield
this.desallign_X
this.desallign_Y
this.displays_Setup
this.find_Grid_Place,
this.enemy_Fire
this.enemy_Hit
this.enemy_ShieldTime_Text_Setup
this.enemyBulletPool_Setup
this.enemyDistancePool_Setup
this.enemyTimePool_Setup
this.enemyVelocityLaserPool_Setup
this.enemyVelocityPool_Setup
this.fire
this.get_Enemy_Distance_Speed
this.increase_Fire
this.increase_Time_Shield
this.lockedButtons_Setup
this.make_Grid,
this.minusButton_Setup,
this.missilePool_Setup
this.out_Of_GridY
this.playButton_Setup,
this.plusButton_Setup,
this.put_Weapon
this.select_Bomb,
this.select_Cannon
this.select_Shield
this.selector_Setup,
this.set_Missile_Speed
this.set_Shield_Time
this.shield_Hit
this.shieldButton_Setup
this.shieldOnMouse_Setup
this.shieldSelectorButtonsPool_Setup
this.shuffleBag_Get
this.shuffleBag_Restart
this.shuffleBag_Setup
this.start
this.try_To_Destroy  
this.try_To_Destroy_Time
this.try_To_Destroy_Velocity
this.you_Got_Shot
*/

// Added-Erased 06-01-2015
/*
Added:
this.shuffleBag_Bomb_Get
this.shuffleBag_Bomb_Restart
this.shuffleBag_Bomb_Setup
this.shuffleBag_Velocity_Get
this.shuffleBag_Velocity_Restart
this.shuffleBag_Velocity_Setup
this.shuffleBag_X_Axis_Get
this.shuffleBag_X_Axis_Restart
this.shuffleBag_X_Axis_Setup

Erased:
this.shuffleBag_Get
this.shuffleBag_Restart
this.shuffleBag_Setup

*/

// Added-Erased 07-01-2015
/*
Added:
this.shieldPool_Setup
*/

// Added-Erased 18-01-2015
/*
Added: 
this.homeButton_Setup
this.go_To_Home:
*/