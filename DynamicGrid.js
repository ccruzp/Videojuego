
var WIDTH = 800;
var HEIGHT = 600;
var NUMBER_OF_BULLETS = 1;

var MIN_BULLET_SPEED = 1;
var MAX_BULLET_SPEED = 20;

var GRID_SPACE = 50;


// Map variables
var platforms;
var ground;
var lines;
var line;
var player;
var lastLine;

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'phaser-test',
 {preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', 'assets/img/background2.png');
    game.load.image('ground', 'assets/platform2.png');

    game.load.image('diamond', 'assets/diamond.png');
    game.load.spritesheet('enemy', 'assets/stuff.png', 104, 80);
    game.load.spritesheet('base', 'assets/basesheet2.png', 95, 100,2);
    game.load.image('bullet', 'assets/bullet.png', 32, 48);
}

function create() {
    
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
    //We will make a unique grid, with static tiles and dynamic tiles

    lines = game.add.group();
    lines.enableBody = true;
    var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
    
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(2, 0x00CCFF,1);
    
    for (indexAux = 0; indexAux < 12; indexAux = indexAux + 1){
	y = ((indexAux) * GRID_SPACE) + 50;
	
	//Dynamic lines
	line = lines.create( 50, y+50, 'ground');
	line.scale.setTo(1,0.0078125);
	lastLine = line;
	
	//Static horizontal lines
	graphics.moveTo(50, y); 
	graphics.lineTo(WIDTH-50,y);
	game.add.text(WIDTH-20,y-10+25,String((10-indexAux)),style);
	
    }
    
    for (indexAux = 0; indexAux < 15; indexAux = indexAux + 1){
	y = (indexAux * GRID_SPACE) + 50;
	
	//Static vertical lines
	graphics.moveTo(y,50);
	graphics.lineTo(y,HEIGHT-50);
    }
/*
    // Dynamic GRID-------------------------------------------------------------
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
    // Dynamic GRID-------------------------------------------------------------
    // Static GRID--------------------------------------------------------------
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(1, 0x33FF00,0.5);
    var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
    for (indexAux = 0; indexAux < 10; indexAux = indexAux + 1){
        y = (indexAux * GRID_SPACE) + 50;
	graphics.moveTo(0, y); 
	graphics.lineTo(WIDTH-20,y);
	game.add.text(WIDTH-20,y-10,String((10-indexAux)),style);
    }	
    // Static GRID--------------------------------------------------------------
*/
}

function line_Collision(player, line){

    //Restore the previous moved line
    lastLine.scale.setTo(1,0.03125);
    //31.4 = HalfStep + HalfAmplitudScale*Height = 25 + 0.2*32 = 31.4
    lastLine.body.y = lastLine.body.y + 31.4;
   
    //Change the line that the player touches
    line.scale.setTo(2,0.4);
    line.body.y = line.body.y - 31.4;
    
    //Now, that line is the new line
    lastLine = line;
    
}
