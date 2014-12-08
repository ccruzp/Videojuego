BasicGame.GameOverMenu = function (game) {
    // this.background = null;
    // this.gameOverText = null;
    // this.playAgainButton = null;
    this.timeOfGame;
    this.nextLevelName;
    this.nextLevel;
};

BasicGame.GameOverMenu.prototype = {

    init: function(lastTime,nextLevel,score,
		   allign_X,
		   allign_Y,
		   blackHoleButton_Setup,
		   bombOnMouse_Setup,
		  // bombPool_Setup,
		   countdown,
		   find_Grid_Place,
		   gridLine_Setup,
		   make_Grid,
		   minusButton_Setup,
		   plusButton_Setup,
		   //lockedButtons_Setup,
		   playButton_Setup,
		   select_Bomb,
		   start,
		   scoreText_Setup,
		   try_To_Destroy) {
	this.timeOfGame = lastTime;
	this.timeOfGame = this.time.elapsedSecondsSince(this.timeOfGame);
	this.nextLevel = nextLevel;
	this.nextLevelName = "Nivel" + nextLevel;
	
    	this.allign_X = allign_X;
	this.allign_Y = allign_Y;
	this.blackHoleButton_Setup = blackHoleButton_Setup;
	this.bombOnMouse_Setup = bombOnMouse_Setup;
	//this.bombPool_Setup = bombPool_Setup;
	this.countdown = countdown;
	this.find_Grid_Place = find_Grid_Place;
	this.gridLine_Setup = gridLine_Setup;
	this.make_Grid = make_Grid;
	this.minusButton_Setup = minusButton_Setup;
	this.plusButton_Setup = plusButton_Setup;
	
	//this.lockedButtons_Setup = lockedButtons_Setup;
	this.playButton_Setup = playButton_Setup;
	this.select_Bomb = select_Bomb;
	this.start = start;
	this.scoreText_Setup = scoreText_Setup;
	this.try_To_Destroy = try_To_Destroy;
	},
    
    
    preload: function () {
	
    },
    
    create: function () {
	
	// this.background = this.add.sprite(0, 0, 'menuBackground');

	// this.gameOverText = this.add.text(this.world.centerX, 50, '¡Perdiste!',
	// 				  { font: "50px Arial", fill: "#ffffff",
	// 				    align: "left" });
	// this.gameOverText.anchor.setTo(0.5, 0.5);

	// this.playAgainButton = this.add.button(this.world.centerX, this.world.centerY, 'playAgainButton',
	// 				       this.playAgain, this, 1, 0, 1, 0);
	// this.playAgainButton.anchor.setTo(0.5, 0.5);
	// this.playAgainButton.scale.setTo(0.5, 0.5);
	
	loseSound = this.add.audio('diedS');
	background = this.add.sprite(0, 0, 'menuBackground');

	gameOverText = this.add.text(this.world.centerX, 50, '¡Perdiste!',
					  { font: "50px Arial", fill: "#ffffff",
					    align: "left" });
	gameOverText.anchor.setTo(0.5, 0.5);

	playAgainButton = this.add.button(this.world.centerX, this.world.centerY, 'playAgainButton',
					       this.playAgain, this, 1, 0, 1, 0);
	playAgainButton.anchor.setTo(0.5, 0.5);
	playAgainButton.scale.setTo(0.5, 0.5);
	
	loseSound.play('',0,1,false);
	
    },
    
    update: function () {
    
    // 		//	You don't actually need to do this, but I find it gives a much smoother game experience.
    // 		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
    // 		//	You can jump right into the menu if you want and still play the music, but you'll have a few
    // 		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
    // 		//	it's best to wait for it to decode here first, then carry on.
    
    // 		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
    // 		//	the update function completely.
    
    // 	// 	if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
    // 	// 	{
    // 			// this.ready = true;
    // 			// this.state.start('MainMenu');
    // 	// 	}
    
    },

    playAgain: function () {
	gameOverText.destroy();
	// this.playAgainButton.destroy();
	background.destroy();
	time = 0;
	score = 0;
	this.state.start(this.nextLevelName , true, false, 
			 time,this.nextLevel,score,
			 this.allign_X,
			 this.allign_Y,
			 this.blackHoleButton_Setup,
			 this.bombOnMouse_Setup,
			 //this.bombPool_Setup,
			 this.countdown,
			 this.find_Grid_Place,
			 this.gridLine_Setup,
			 this.make_Grid,
			 this.minusButton_Setup,
			 this.plusButton_Setup,
			 
			 //this.lockedButtons_Setup,
			 this.playButton_Setup,
			 this.select_Bomb,
			 this.start,
			 this.scoreText_Setup,
			 this.try_To_Destroy);
    },
    
};