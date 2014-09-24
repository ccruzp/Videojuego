var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
<<<<<<< HEAD
	this.load.image('menuBackground', 'assets/img/Menu_Background.png');
=======
>>>>>>> 8359f36e6f2f0705a4828ed86d297a60cbef83ed
	this.load.image('background', 'assets/img/background_purple_Half.png');
        // this.load.image('background', 'assets/Mockup/PNGs/background.png');
        // this.load.image('preloaderBar', 'images/preloadr_bar.png');
	// The bomb that follows the mouse (Perhaps this will be removed)
	this.load.image('bombSelect', 'assets/bullet.png');
<<<<<<< HEAD
	// The distance enemy
	this.load.image('enemyDistance', 'assets/enemy1.png');
	this.load.image('distanceShip', 'assets/Mockup/PNGs/distanceShip.png');
	// this.load.image('newGameButton', 'assets/Mockup/PNGs/NewGameButton.png');
	this.load.image('playAgainButton', 'assets/Mockup/PNGs/replay_button.png');
=======
	// The bomb
	this.load.image('bomb', 'assets/bullet.png');
	// The distance enemy
	this.load.image('enemyDistance', 'assets/Mockup/PNGs/distanceShip.png');
	this.load.image('playAgainButton', 'assets/star.png');
	this.load.image('startButton', 'assets/star.png');
>>>>>>> 8359f36e6f2f0705a4828ed86d297a60cbef83ed
	this.load.image('playButton', 'assets/Mockup/PNGs/playButton.png');
	this.load.image('lockedButton', 'assets/Mockup/PNGs/lock.png');
	this.load.image('minusButton', 'assets/Mockup/PNGs/minusButton.png');
	this.load.image('plusButton', 'assets/Mockup/PNGs/plusButton.png');
<<<<<<< HEAD
	this.load.image('missileButton', 'assets/Mockup/PNGs/missileButton.png');
	this.load.image('ground', 'assets/platform2.png');
	this.load.spritesheet('distanceEnemy', 'assets/Spritesheets/distanceShip_spritesheet.png', 399, 500, 10);
	this.load.spritesheet('newGameButton', 'assets/Spritesheets/newGameButton.png', 1993, 570, 2);
	this.load.spritesheet('playAgainButton', 'assets/Spritesheets/playAgainButton.png', 1998, 584, 2);
	
	// The bomb
	this.load.spritesheet('bomb', 'assets/Spritesheets/blackHoleBomb.png', 420, 420, 19);
	this.load.spritesheet('blackHoleButton', 'assets/Spritesheets/Button_bomb_sheet.png', 250, 242, 2);
	
	this.load.audio('coin', 'assets/audio/collectcoin.mp3', true);
	
	this.load.audio('rankS', 'assets/audio/dun.mp3', true);
	
	this.load.audio('diedS', 'assets/audio/die-or-lose-life.mp3', true);
=======
	this.load.spritesheet('blackHoleButton', 'assets/Spritesheets/Button_bomb_sheet.png', 250, 242, 2);
	this.load.image('missileButton', 'assets/Mockup/PNGs/missileButton.png');
	this.load.image('ground', 'assets/platform2.png');
>>>>>>> 8359f36e6f2f0705a4828ed86d297a60cbef83ed
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