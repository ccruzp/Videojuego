BasicGame.Nivel2 = function (game) {
    TOTAL_ENEMIES = 1;
    NUMBER_OF_BULLETS = 1;
    MIN_BULLET_SPEED = 1;
    MAX_BULLET_SPEED = 20;
    this.GRID_SPACE = 38;         //Length of the squares of the grid
    this.LEFT_MARGIN = 196;        //Left Margin for the grid
    this.UP_MARGIN = 60;          //Horizontal Margin for the grid
    this.ROWS_NUMBER = 10; // Number of horizontal spaces in the grid
    this.COLUMNS_NUMBER = 16;   // Number of vertical spaces in the grid

    this.line;         //The line that helps you to use the numbers of the grid
    
    this.enemyOutOfGrid; //Booleans, set if an enemy is out of the grid

    //Grid adjustment in boxes
    this.gridX = 0;
    this.gridY = 0;
    this.make_Grid;

}

BasicGame.Nivel2.prototype = {

    init: function(make_Grid) {
	this.make_Grid = make_Grid;
    },

    create: function() {
	background = this.add.sprite(0, 0, 'background');
	this.physics.startSystem(Phaser.Physics.ARCADE);
	this.make_Grid();
	console.log("HOLA");
    }
}
//     var WIDTH = 800;
//     var HEIGHT = 600;

//     var GRID_SPACE = 50;

//     // Map variables
//     var platforms;
//     var ground;

//     //Diamond variables, 
//     var fireButton;
//     var diamond;  
//     var diamondTime = 0;

//     //Projectile speed variables, text
//     var speedTime = 0;
//     var speedText;
//     var projectileSpeed = MIN_BULLET_SPEED;
    
//     // Score variables, text
//     var score = 0;
//     var scoreText;
    
//     // Shield Speed variables, text
//     var shieldSpeed = 0;
//     var shieldText;
    
//     // Variables to handle multiple aliens, text
//     var nextAlienTime = 5;
//     var nextAlienText;
//     var resetNextAlienButton;
//     var updateAlienTime = 0;
//     var alienExists = true;
    
//     // The alien and its shield
//     var alien;
//     var shieldUpButton;
//     var shieldDownButton;
//     var shielded = true;
    
//     //Variables to test the functionality of the shield sprite
//     var activateShieldButton;
//     var manualShieldTime = 0;
    
//     // This variable hold the las time the clock was pressed
//     var lastTimeClockReset = 0;
    
//     // Dude, the clock time
//     var clock = 99;
    
//     //Used as a counter in the for loops
//     var indexAux = 1;
// },
    
// BasicGame.Nivel2.prototype = {

//     create: function() {
	
// 	// Configure the game platforms and background---------------------------
// 	// The platforms group contains the ground and the 2 ledges we can jump on
// 	platforms = game.add.group();
	
// 	// We will enable physics for any object that is created in this group
// 	platforms.enableBody = true;
	
// 	// Here we create the ground
// 	ground = platforms.create(0, game.world.height - 64, 'ground');
	
// 	// Scale it to fit the width of the game (the original sprite is 400x32)
// 	ground.scale.setTo(2, 2);
	
// 	// This stops it from falling away when you jump on it
// 	ground.body.immovable = true;
	
// 	// Set the background of the game
// 	game.add.sprite(0, 0, 'sky');
	
// 	// Add a grid to the background
// 	make_Grid(WIDTH,HEIGHT);
	
// 	// The player and its settings--------------------------------------
// 	player = game.add.sprite(250, 500, 'base');
// 	game.physics.arcade.enable(player);
	
// 	// Player physics properties. Give the little guy a slight bounce
// 	// player.body.bounce.y = 0;
// 	player.body.gravity.y = 00;
// 	player.body.collideWorldBounds = true;
	
// 	// Enabling physics for the group of enemies (aliens)--------------------
// 	aliens = game.add.group();
// 	aliens.enableBody = true;
// 	aliens.physicsBodyType = Phaser.Physics.ARCADE;
	
// 	// Procedure to create the aliens
// 	create_Aliens();
	
// 	// The text available in the game--------------------------------------    
// 	// Speed of the bullet
// 	speedText = game.add.text(
//             16, HEIGHT-32, '', { font: '24px Arial', fill: '#ffffff' }
// 	);
	
// 	// Time needed to a perfect shot
// 	shieldText = game.add.text(
//             16, HEIGHT-32-36, '', { font: '24px Arial', fill: '#ffffff' }
// 	);
	
// 	// Time for the next enemy to appear
// 	nextAlienText = game.add.text(
// 	    WIDTH-350,HEIGHT-32-36,'',{ font: '24px Arial', fill: '#ffffff' }
// 	);
	
// 	scoreText = game.add.text(
// 	    WIDTH-350,HEIGHT-32,'',{ font: '24px Arial', fill: '#ffffff' }
// 	);
	
// 	// Set options for the bullets of the player---------------------------
// 	diamonds = game.add.group();
// 	diamonds.enableBody = true;
// 	diamonds.physicsBodyType = Phaser.Physics.ARCADE;
// 	diamonds.createMultiple(NUMBER_OF_BULLETS, 'bullet');
// 	diamonds.setAll('anchor.x', 0.5);
// 	diamonds.setAll('anchor.y', 1);
// 	diamonds.setAll('outOfBoundsKill', true);
// 	diamonds.setAll('checkWorldBounds', true);
	
// 	// Add keys to use in the game---------------------------------------------
// 	cursors = game.input.keyboard.createCursorKeys();
// 	fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
// 	// Keys to modify the speed of the alien speed
// 	shieldUpButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
// 	shieldDownButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
	
// 	// Variable to test the functionality of the shield sprite
// 	activateShieldButton = game.input.keyboard.addKey(Phaser.Keyboard.Y);
	
// 	// Variable to manually reset the next alien Time
// 	resetNextAlienButton = game.input.keyboard.addKey(Phaser.Keyboard.T);
	
// 	//Initializes the clock reset
// 	lastTimeClockReset = game.time.now;
	
// 	//Shoot with the mouse
// 	game.input.onDown.add(fire_Diamond, this);
    // },
    
    // update: function() {
	
// 	game.physics.arcade.overlap(aliens, diamonds, check_Shield, null, this);
	
// 	// Reset the players velocity (movement)
// 	player.body.velocity.x = 0;
	
// 	//Move the player with your mouse
// 	player.body.x = game.input.x - 48;
// 	//player.body.y = game.input.y - 36;
	
// 	if( 0 > clock){	
// 	    lastTimeClockReset = game.time.now;
// 	    update_Aliens();
// 	}
	
// 	/* NOT USED WHEN CONTROLLING WITH THE MOUSE
// 	   if (cursors.left.isDown) {
	   
// 	   player.body.velocity.x = -150;
	   
// 	   } else if (cursors.right.isDown) {
	   
// 	   player.body.velocity.x = 150;
// 	   } */
	
// 	if (shielded) {
// 	    alien.frame = 0;
// 	} else {
//             alien.frame = 1;
// 	}
	
// 	if (cursors.up.isDown || cursors.down.isDown) {
//             update_Speed();
// 	}
	
// 	if (shieldUpButton.isDown || shieldDownButton.isDown) {
//             update_Speed2();
// 	}
	
// 	// Activate the shield using Y
// 	if (activateShieldButton.isDown) {
// 	    manual_Activate_Shield();
// 	}
	
// 	// Reset the clock when the T is pressed
// 	if (resetNextAlienButton.isDown) {
// 	    lastTimeClockReset = game.time.now;
// 	    update_Aliens();
// 	}
	
// 	// Fire the bullet, and count the time given in "shieldSpeed"
// 	if (fireButton.isDown) {
//             fire_Diamond();
// 	}
	
// 	// Check if the clock reaches zero
// 	if( 0 > clock){	
// 	    lastTimeClockReset = game.time.now;
// 	    update_Aliens();	
// 	}
	
// 	//SUPER DEATH CLOCK
// 	//Displays the time in mS
// 	clock = nextAlienTime-(game.time.elapsedSecondsSince(lastTimeClockReset));
	
// 	// Display some things
// 	speedText.text = 'Rapidez: ' + projectileSpeed;
// 	shieldText.text = 'Escudo: ' + shieldSpeed + ' segs.' ;
// 	scoreText.text = 'Puntaje: ' + score;
// 	nextAlienText.text = 'Siguiente nave en: ' + clock.toPrecision(4) +' segs.';
	
//     }
    
//     // Displays a grid in the background
//     function make_Grid(WIDTH, HEIGHT) {
// 	var graphics = game.add.graphics(0, 0);
	
// 	//adding lines & numbers
// 	graphics.lineStyle(1, 0x33FF00,0.5);
// 	var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
	
// 	for (indexAux = 0; indexAux < 10; indexAux = indexAux + 1){
// 	    y = (indexAux * GRID_SPACE) + 50;
// 	    graphics.moveTo(0, y); 
// 	    graphics.lineTo(WIDTH-20,y);
// 	    game.add.text(WIDTH-20,y-10,String((10-indexAux)),style);
// 	}	
// }
    
//     // Update speed of the bullet
//     function update_Speed(){
// 	if (game.time.now > speedTime) {
//             if (cursors.down.isDown && (projectileSpeed > MIN_BULLET_SPEED)){
// 		projectileSpeed = projectileSpeed -1;
// 		speedTime = game.time.now + 150;
//             }
//             if (cursors.up.isDown && (projectileSpeed < MAX_BULLET_SPEED)){
// 		projectileSpeed = projectileSpeed + 1;
// 		speedTime = game.time.now + 150;
//             }
// 	}
//     }
    
//     // Update speed of the shield
//     function update_Speed2(){
// 	if (game.time.now > speedTime) {
//             if (shieldDownButton.isDown && (shieldSpeed > 1)){
// 		shieldSpeed = shieldSpeed -1;
// 		speedTime = game.time.now + 150;
//             }
//             if (shieldUpButton.isDown && (shieldSpeed < 10)){
// 		shieldSpeed = shieldSpeed + 1;
// 		speedTime = game.time.now + 150;
//             }
// 	}
//     }
    
//     function activate_Shield(){
// 	shielded = true;
//     }
    
//     function deactivate_Shield(){
// 	shielded = false;
//     }
    
//     //Fire all the bullets available
//     function fire_Diamond() {
// 	if (game.time.now > diamondTime) {
	    
//             diamond = diamonds.getFirstExists(false);
//             if (diamond) {
// 		diamond.reset(player.x + player.width/2, player.y);
// 		diamond.body.velocity.y = -50 * projectileSpeed;
// 		diamondTime = game.time.now + 200;
		
// 		if (shieldSpeed > 0){
// 		    game.time.events.add(Phaser.Timer.SECOND * (shieldSpeed*0.80),
// 					 deactivate_Shield, this);
// 		    game.time.events.add(Phaser.Timer.SECOND * (shieldSpeed + 0.2),
// 					 activate_Shield, this);	
// 	    }
//             }
// 	}
//     }
    
//     // Function to activate the shield manually using the "Y" key
//     function manual_Activate_Shield() {
// 	if (game.time.now > manualShieldTime) {
// 	    shielded = !shielded;
// 	    manualShieldTime = game.time.now + 150;
// 	}
//     }
    
//     // Create the enemy ship
//     function create_Aliens() {
// 	alien = aliens.create( 100, 50, 'enemy');
// 	alien.anchor.setTo( 0.5, 0.5);
// 	alien.body.moves = false;
// 	aliens.x = 0;
// 	aliens.y = 0;
// 	alien.x = game.rnd.integerInRange(50, (WIDTH-50));
// 	alien.y = 40;
//     }
//     function check_Shield(player,diamond){
// 	diamond.kill();
// 	if (!shielded){
// 	    score = score + 1;
// 	    alien.kill();
// 	} else {
//             //diamond.kill();
// 	}
//     }
    
//     function update_Aliens(){
// 	if (game.time.now > updateAlienTime) {
// 	    alien.kill();
// 	    create_Aliens();
// 	    updateAlienTime = game.time.now + 150;	
// 	}
//     }
    // }
// }