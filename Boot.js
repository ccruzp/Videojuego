var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
	this.load.image('menuBackground', 'assets/img/Menu_Background.png');
	this.load.image('background', 'assets/img/background_purple_Half.png');
	// The bomb that follows the mouse (Perhaps this will be removed)
	this.load.image('bombSelect', 'assets/bullet.png');
	// The shielded enemy
	this.load.image('shieldEnemy', 'assets/Art/Enemies/shielded.png');
	this.load.image('playAgainButton', 'assets/Mockup/PNGs/replay_button.png');
	this.load.image('playButton', 'assets/Mockup/PNGs/playButton.png');
	this.load.image('lockedButton', 'assets/Mockup/PNGs/lockedButton.png');
	this.load.image('minusButton', 'assets/Mockup/PNGs/minusButton.png');
	this.load.image('plusButton', 'assets/Mockup/PNGs/plusButton.png');
	this.load.image('ground', 'assets/platform2.png');

	// Loading spritesheets
	this.load.spritesheet('distanceEnemy', 'assets/Spritesheets/distanceShip_spritesheet.png', 399, 500, 10);
	this.load.spritesheet('newGameButton', 'assets/Spritesheets/newGameButton.png', 1993, 570, 2);
	this.load.spritesheet('playAgainButton', 'assets/Spritesheets/playAgainButton.png', 1998, 584, 2);
	
	// The bomb
	this.load.spritesheet('bomb', 'assets/Spritesheets/blackHoleBomb.png', 420, 420, 19);

	// The buttons
	this.load.spritesheet('blackHoleButton', 'assets/Spritesheets/Button_bomb_sheet.png', 250, 242, 2);
	this.load.spritesheet('shootButton', 'assets/Spritesheets/shootButton', 250, 242, 2);
	
	// Loading audio
	this.load.audio('coin', 'assets/audio/collectcoin.mp3', true);
	
	this.load.audio('rankS', 'assets/audio/dun.mp3', true);
	
	this.load.audio('diedS', 'assets/audio/die-or-lose-life.mp3', true);
    },

    create: function () {

    //     //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    //     this.input.maxPointers = 1;

    //     // //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
    //     // this.stage.disableVisibilityChange = true;

    //     // if (this.game.device.desktop)
    //     // {
    //     //     //  If you have any desktop specific settings, they can go in here
    //     //     this.scale.pageAlignHorizontally = true;
    //     // }
    //     // else
    //     // {
    //     //     //  Same goes for mobile settings.
    //     //     //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
    //     //     this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //     //     this.scale.minWidth = 480;
    //     //     this.scale.minHeight = 260;
    //     //     this.scale.maxWidth = 1024;
    //     //     this.scale.maxHeight = 768;
    //     //     this.scale.forceLandscape = true;
    //     //     this.scale.pageAlignHorizontally = true;
    //     //     this.scale.setScreenSize(true);
    //     // }

    //     //  By this point the preloader assets have loaded to the cache, we've set the game settings
    //     //  So now let's start the real preloader going
        this.state.start('Preloader');

    }

};