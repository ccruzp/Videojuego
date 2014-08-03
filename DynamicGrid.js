
var WIDTH = 800;
var HEIGHT = 600;
var NUMBER_OF_BULLETS = 1;

var MIN_BULLET_SPEED = 1;
var MAX_BULLET_SPEED = 20;

var GRID_SPACE = 50;

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'phaser-test',
 {preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', 'assets/img/background2.png');
    game.load.image('ground', 'assets/platform.png');

    game.load.image('diamond', 'assets/diamond.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('enemy', 'assets/stuff.png', 104, 80);
    game.load.spritesheet('base', 'assets/basesheet2.png', 95, 100,2);
    game.load.image('bullet', 'assets/bullet.png', 32, 48);
}

// Map variables
var platforms;
var ground;
var lines;
var line;
var player;
var timer = true;
var lastLine;
function create() {

    // Configure the game platforms and background---------------------------
    // The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    // We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    
    // Set the background of the game
    game.add.sprite(0, 0, 'sky');

    // Add a grid to the background
    make_Grid(WIDTH,HEIGHT);

    // The player and its settings--------------------------------------
    player = game.add.sprite(250, 500, 'base');
    game.physics.arcade.enable(player);
    
    // Player physics properties. Give the little guy a slight bounce
    // player.body.bounce.y = 0;
    player.body.gravity.y = 00;
    player.body.collideWorldBounds = true;

    // Add keys to use in the game---------------------------------------------
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
	
    game.physics.arcade.overlap(player, lines, line_Collision, null, this);

    // Reset the players velocity (movement)
    player.body.velocity.x = 0;
	
    //Move the player with your mouse
    player.body.x = game.input.x - 48;
    player.body.y = game.input.y - 36;
    
}

// Displays a grid in the background
function make_Grid(WIDTH, HEIGHT) {
    lines = game.add.group();
    lines.enableBody = true;
   
    var style = { font: "15px Arial", fill: "#ffffff", align: "center" };

    for (indexAux = 0; indexAux < 10; indexAux = indexAux + 1){
	
	y = (indexAux * GRID_SPACE) + 50;
	line = lines.create( 0, y, 'ground');
	line.scale.setTo(2,0.0625);
	game.add.text(WIDTH-20,y-10,String((10-indexAux)),style);
	lastLine = line;
    }	
}

function line_Collision(player, line){
    lastLine.scale.setTo(2,0.0625);
    line.scale.setTo(2,0.4);
    lastLine = line;
}
