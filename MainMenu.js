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
	this.state.start('Nivel1');
    }
};