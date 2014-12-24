BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = true;

};

BasicGame.Preloader.prototype = {

    preload: function () {
	this.preloadBar = this.add.sprite(this.world.centerX-200, this.world.centerY, 'preloadBar');
	this.preloadBar.anchor.setTo(0,0.5);
	this.add.text(this.world.centerX-80,this.world.centerY-100,"Cargando...",{font: '30px Arial', fill: '#ffffff', align: 'center'});

	//-----------------------------------

	this.load.setPreloadSprite(this.preloadBar);

	this.load.image('menuBackground', 'assets/img/Menu_Background.png');
	this.load.image('background', 'assets/img/background_purple_Half.png');
	this.load.image('blackScreen', 'assets/img/background4.png');
	this.load.image('buttonPanel', 'assets/Mockup/PNGs/Buttons_HUD.png');

	// Cannon and shield selectors and buttons.
	this.load.spritesheet('selectorCannon', 'assets/Spritesheets/Selector/Selector_Cannon.png', 505, 498, 2);
	this.load.spritesheet('selectorShield', 'assets/Spritesheets/Selector/Selector_Shield.png', 503, 500, 2);
	this.load.spritesheet('okButton', 'assets/Spritesheets/Selector/Selector_OK.png', 174, 200, 3);
	this.load.spritesheet('chosen', 'assets/Spritesheets/Selector/Selector_Chosen.png', 419, 500, 12);
	this.load.spritesheet('button1', 'assets/Spritesheets/Selector/Selector_Number_1.png', 171, 200, 2);
	this.load.spritesheet('button2', 'assets/Spritesheets/Selector/Selector_Number_2.png', 171, 200, 2);
	this.load.spritesheet('button3', 'assets/Spritesheets/Selector/Selector_Number_3.png', 171, 200, 2);
	this.load.spritesheet('button4', 'assets/Spritesheets/Selector/Selector_Number_4.png', 171, 200, 2);
	this.load.spritesheet('button5', 'assets/Spritesheets/Selector/Selector_Number_5.png', 171, 200, 2);
	this.load.spritesheet('button6', 'assets/Spritesheets/Selector/Selector_Number_6.png', 171, 200, 2);
	this.load.spritesheet('button7', 'assets/Spritesheets/Selector/Selector_Number_7.png', 171, 200, 2);
	this.load.spritesheet('button8', 'assets/Spritesheets/Selector/Selector_Number_8.png', 171, 200, 2);
	this.load.spritesheet('button9', 'assets/Spritesheets/Selector/Selector_Number_9.png', 171, 200, 2);
	this.load.spritesheet('button10', 'assets/Spritesheets/Selector/Selector_Number_10.png', 171, 200, 2);

	this.load.image('lockedButton', 'assets/Mockup/PNGs/lockedButton.png');
	this.load.image('ground', 'assets/platform2.png');
	
	this.load.image('missile', 'assets/missile.png');

	// Loading menu buttons' spritesheets
	this.load.spritesheet('newGameButton', 'assets/Spritesheets/newGameButton.png', 1993, 570, 2);
	this.load.spritesheet('nextLevelButton', 'assets/Spritesheets/nextLevelButton.png', 2000, 585, 2);
	this.load.spritesheet('playAgainButton', 'assets/Spritesheets/playAgainButton.png', 1998, 584, 2);
	this.load.spritesheet('instructionsButton', 'assets/Spritesheets/instructionsButton.png', 1992, 555, 2);

	// Loading enemies' spritesheets
	this.load.spritesheet('distanceEnemy', 'assets/Spritesheets/distanceShip_spritesheet_z.png', 399, 500, 20);
	this.load.spritesheet('velocityEnemy', 'assets/Spritesheets/velocityShip_spritesheet.png', 499, 500, 2);
	this.load.image('timeEnemy', 'assets/Mockup/PNGs/timeShip.png');

	// Velocity enemy's laser
	this.load.spritesheet('velocityEnemyLaser', 'assets/Spritesheets/velocityEnemyLaser_spritesheet.png', 491, 4970, 11);
	this.load.image('laser', 'assets/Mockup/PNGs/enemyVelocityLaser.png');

	// Loading buttons' spritesheets
	this.load.spritesheet('blackHoleButton', 'assets/Spritesheets/Button_bomb_sheet.png', 250, 242, 2);
	this.load.spritesheet('cannonButton', 'assets/Spritesheets/Button_cannon_spritesheet_z.png', 250, 242, 2);
	this.load.spritesheet('shieldButton', 'assets/Spritesheets/genShield_button_spritesheet.png', 250, 242, 2);
	this.load.spritesheet('minusButton', 'assets/Spritesheets/Button_minus_spritesheet.png', 1958, 2000, 2);
	this.load.spritesheet('plusButton', 'assets/Spritesheets/Button_plus_spritesheet.png', 1958, 2000, 2);
	this.load.spritesheet('playButton', 'assets/Spritesheets/playButton_spritesheet.png', 1032, 1000, 2);

	// The bomb
	this.load.spritesheet('bomb', 'assets/Spritesheets/blackHoleBomb.png', 420, 420, 19);
	// The cannon
	this.load.image('cannon', 'assets/Mockup/PNGs/cannon.png');

	// The shield generator
	this.load.spritesheet('shield', 'assets/Spritesheets/shieldGen_Spritesheet.png', 401, 500, 2);

	// Invisible spritesheet.
	// this.load.image('shield', 'assets/Mockup/PNGs/cannon.png');

	// The bullet
	this.load.image('bullet', 'assets/bullet.png');
	
	// Loading audio
	this.load.audio('coin', 'assets/audio/collectcoin.mp3', true);
	this.load.audio('rankS', 'assets/audio/dun.mp3', true);
	this.load.audio('diedS', 'assets/audio/die-or-lose-life.mp3', true);
	this.load.audio('bombBeep', 'assets/audio/beep.mp3', true);
	this.load.audio('blackHoleSound', 'assets/audio/blackHole-whoosh.mp3', true);
	this.load.audio('clock', 'assets/audio/clock.mp3', true);
	this.load.audio('missile_launch', 'assets/audio/Missle_Launch.mp3', true);
	

//------------------
	//	These are the assets we loaded in Boot.js
	//	A nice sparkly background and a loading progress bar
	// this.background = this.add.sprite(0, 0, 'preloaderBackground');
	// this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
	
	//	This sets the preloadBar sprite as a loader sprite.
	//	What that does is automatically crop the sprite from 0 to full-width
	//	as the files below are loaded in.
	// this.load.setPreloadSprite(this.preloadBar);
	
	//	Here we load the rest of the assets our game needs.
	//	As this is just a Project Template I've not provided these assets, swap them for your own.
	// this.load.image('titlepage', 'images/title.jpg');
	// this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
	// this.load.audio('titleMusic', ['audio/main_menu.mp3']);
	// this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
	//	+ lots of other required assets here
	
    },
    
    create: function () {
	
	//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
	// // this.preloadBar.cropEnabled = false;
	// this.state.start('MainMenu');
	
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
    	if (this.ready) {
    	    this.state.start('MainMenu');
	}
    // 	// 	}
    
    	}
    
};