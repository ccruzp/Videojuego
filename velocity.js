
var WIDTH = 800;
var HEIGHT = 600;
var NUMBER_OF_BULLETS = 999;

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'phaser-test', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', 'assets/img/background2.png');
    game.load.image('ground', 'assets/platform.png');

    game.load.image('diamond', 'assets/diamond.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('enemy', 'assets/stuff.png', 104, 80);
    game.load.spritesheet('base', 'assets/basesheet2.png', 95, 100,2);
    game.load.image('bullet', 'assets/bullet.png', 32, 48);
}


var platforms;
var ground;

var diamond;  
var diamondTime = 0;

var speedTime = 0;
var speedText;
var projectileSpeed = 1;

var score = 0;
var scoreText;


var shieldText;
var shieldInterval = 0;
var fireButton;
var alien;

var shieldSpeed = 0;
var shieldUp;
var shieldDown;
var shielded = true;

function create() {

	// Configure the game platforms and background--------------------------------------------------------------
    // The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    // We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    
    // Here we create the ground
    ground = platforms.create(0, game.world.height - 64, 'ground');

    // Scale it to fit the width of the game (the original sprite is 400x32)
    ground.scale.setTo(2, 2);

    // This stops it from falling away when you jump on it
    ground.body.immovable = true;
    
    // Set the background of the game
    game.add.sprite(0, 0, 'sky');

    // Add a grid to the background
    make_Grid(WIDTH,HEIGHT);

    // The player and its settings-----------------------------------------------------------------------------
    player = game.add.sprite(250, 652, 'base');
    game.physics.arcade.enable(player);
    
    // Player physics properties. Give the little guy a slight bounce
    // player.body.bounce.y = 0;
    player.body.gravity.y = 00;
    player.body.collideWorldBounds = true;
		
    // Enabling physics for the group of enemies (aliens)------------------------------------------------
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

	// Procedure to create the aliens
    create_Aliens();

	// The text available in the game---------------------------------------------------------------------    
	// Speed of the bullet
	speedText = game.add.text(
        16, HEIGHT-32, '', { font: '24px Arial', fill: '#ffffff' }
    );
	
	// Time for the next unshield
    shieldText = game.add.text(
        16, HEIGHT-32-36, '', { font: '24px Arial', fill: '#ffffff' }
    );
	
	// Set options for the bullets of the player------------------------------------------------------
    diamonds = game.add.group();
    diamonds.enableBody = true;
    diamonds.physicsBodyType = Phaser.Physics.ARCADE;
    diamonds.createMultiple(NUMBER_OF_BULLETS, 'bullet');
    diamonds.setAll('anchor.x', 0.5);
    diamonds.setAll('anchor.y', 1);
    diamonds.setAll('outOfBoundsKill', true);
    diamonds.setAll('checkWorldBounds', true);

	// Add keys to use in the game-------------------------------------------------------------------------
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    shieldUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
    shieldDown = game.input.keyboard.addKey(Phaser.Keyboard.S);

}

function update() {

    game.physics.arcade.overlap(aliens, diamonds, check_Shield, null, this);

    // Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {

		player.body.velocity.x = -150;
		
    } else if (cursors.right.isDown) {
		
		player.body.velocity.x = 150;
    } 

    if (shielded) {
        alien.frame = 2;
    } else {
        alien.frame = 1;
    }
   
    if (cursors.up.isDown || cursors.down.isDown) {
        update_Speed();
    }

    if (shieldUp.isDown || shieldDown.isDown) {
        update_Speed2();
    }

    if (fireButton.isDown) {
        fire_Diamond();
		
        if (shieldSpeed > 0){
            game.time.events.add(Phaser.Timer.SECOND * shieldSpeed*0.90, deactivate_Shield, this);
            game.time.events.add(Phaser.Timer.SECOND * shieldSpeed + Phaser.Timer.SECOND * 0.1, activate_Shield, this);
        }
        
    }
    speedText.text = 'Speed: ' + projectileSpeed;
    shieldText.text = 'Shield: ' + shieldSpeed + ' segs.' ;
}

function make_Grid(WIDTH, HEIGHT) {
	var graphics = game.add.graphics(0, 0);
	
	//space between lines
	linesSpace = 20;
	
	//adding lines
	graphics.lineStyle(1, 0x33FF00,0.5);
	for (y = linesSpace; y < HEIGHT; y = y+linesSpace){
		graphics.moveTo(0,y); 
		graphics.lineTo(WIDTH-linesSpace,y);
	}
	
	//adding line numbers.
	var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
	var end = HEIGHT/linesSpace;
	for (y = linesSpace; y < HEIGHT; y = y + linesSpace){
		end--;
		game.add.text(WIDTH-linesSpace,y-10,String(end),style);
	}
}

function update_Speed(){
    if (game.time.now > speedTime) {
        if (cursors.down.isDown && (projectileSpeed > 1)){
            projectileSpeed = projectileSpeed -1;
            speedTime = game.time.now + 150;
        }
        if (cursors.up.isDown && (projectileSpeed < 30)){
            projectileSpeed = projectileSpeed + 1;
            speedTime = game.time.now + 150;
        }
    }
}

function update_Speed2(){
    if (game.time.now > speedTime) {
        if (shieldDown.isDown && (shieldSpeed > 1)){
            shieldSpeed = shieldSpeed -1;
            speedTime = game.time.now + 150;
        }
        if (shieldUp.isDown && (shieldSpeed < 30)){
            shieldSpeed = shieldSpeed + 1;
            speedTime = game.time.now + 150;
        }
    }
}

function activate_Shield(){
    shielded = true;
}

function deactivate_Shield(){
    shielded = false;
}

function fire_Diamond() {
    if (game.time.now > diamondTime) {
		
        diamond = diamonds.getFirstExists(false);
        if (diamond) {
            diamond.reset(player.x + player.width/2, player.y);
            diamond.body.velocity.y = -20 * projectileSpeed;
            diamondTime = game.time.now + 200;
        }
    }
}

function create_Aliens () {
    alien = aliens.create( 200, 50, 'enemy');
    alien.anchor.setTo( 0.5, 0.5);
    alien.body.moves = false;
    aliens.x = 0;
    aliens.y = 0;
    alien.x = 300;
    alien.y = 60;
}

function kill_Both(alien, diamond) {
    if (!shielded) {
        alien.kill();
    } 
    diamond.kil();
}

function check_Shield(player,diamond){
    if (!shielded){
        alien.kill();
    } else {
        diamond.kill();
    }
}