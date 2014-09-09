BasicGame.WinnerMenu = function (game) {
    // this.background = null;
    // this.winnerText = null;
    // this.playAgainButton = null;
    this.timeOfGame;
};

BasicGame.WinnerMenu.prototype = {
    
    init: function(customParam1) {
	this.timeOfGame = customParam1;
	this.timeOfGame = this.time.elapsedSecondsSince(this.timeOfGame);
    },
    
    preload: function () {
	
    },
    
    create: function () {
	
	// this.background = this.add.sprite(0, 0, 'menuBackground');

	// this.winnerText = this.add.text(this.world.centerX, 50, '¡Ganaste!',
	// 				  { font: "50px Arial", fill: "#ffffff",
	// 				    align: "left" });
	// this.winnerText.anchor.setTo(0.5, 0.5);

	// this.playAgainButton = this.add.button(this.world.centerX, this.world.centerY, 'playAgainButton',
	// 				       this.playAgain, this, 1, 0, 1, 0);
	// this.playAgainButton.anchor.setTo(0.5, 0.5);
	// this.playAgainButton.scale.setTo(0.5, 0.5);
	background = this.add.sprite(0, 0, 'menuBackground');

	winnerText = this.add.text(this.world.centerX, 50, '¡Ganaste!  Tiempo total: '+ this.timeOfGame.toPrecision(5) + 'segundos',
					  { font: "50px Arial", fill: "#ffffff",
					    align: "left" });
	winnerText.anchor.setTo(0.5, 0.5);

	playAgainButton = this.add.button(this.world.centerX, this.world.centerY, 'playAgainButton',
					       this.playAgain, this, 1, 0, 1, 0);
	playAgainButton.anchor.setTo(0.5, 0.5);
	playAgainButton.scale.setTo(0.5, 0.5);
	
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
	winnerText.destroy();
	// this.playAgainButton.destroy();
	background.destroy();
	this.state.start('Distance');
    }
    
};