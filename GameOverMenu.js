BasicGame.GameOverMenu = function (game) {
<<<<<<< HEAD
    // this.background = null;
    // this.gameOverText = null;
    // this.playAgainButton = null;
=======
    this.gameOverText = null;
    this.playAgainButton = null;
>>>>>>> 8359f36e6f2f0705a4828ed86d297a60cbef83ed
};

BasicGame.GameOverMenu.prototype = {

    preload: function () {
	
    },
    
    create: function () {
	
<<<<<<< HEAD
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
=======
	this.gameOverText = this.add.text(this.world.centerX, 50, '¡Perdiste!',
					  { font: "50px Arial", fill: "#ffffff",
					    align: "left" });
	this.gameOverText.anchor.setTo(0.5, 0.5);

	this.playAgainButton = this.add.button(100, 100, 'startButton',
					  this.fun, this);
	this.playAgainButton.anchor.setTo(0.5, 0.5);
>>>>>>> 8359f36e6f2f0705a4828ed86d297a60cbef83ed
	
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

<<<<<<< HEAD
    playAgain: function () {
	gameOverText.destroy();
	// this.playAgainButton.destroy();
	background.destroy();
=======
    fun: function () {
	this.gameOverText.destroy();
	this.playAgainButton.destroy();
>>>>>>> 8359f36e6f2f0705a4828ed86d297a60cbef83ed
	this.state.start('Distance');
    }
    
};