
var WIDTH = 800;
var HEIGHT = 600;

var GRID_SPACE = 50;

// Map variables
var platforms;
var ground;

//Variables used to calculate the grid place
var gridX = 0;
var gridY = 0;

var debugText2;
var debugText3;

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
    
    debugText2 = game.add.text(
        16, HEIGHT-32, '', { font: '24px Arial', fill: '#ffffff' }
    );
    debugText3 = game.add.text(
        400, HEIGHT-32, '', { font: '24px Arial', fill: '#ffffff' }
    );
     
    // Add keys to use in the game---------------------------------------------
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {

    // Reset the players velocity (movement)
    player.body.velocity.x = 0;
	
    //Move the player with your mouse
    //player.body.x = game.input.x - 48;
    //player.body.y = game.input.y - 36;
    
    // Find the variables gridX and gridY
    findGridPlace();
    
    //48 and 36 are constants given by the object size
    player.body.x = (gridX*50) - 25;
    player.body.y = (gridY*50) - 25;

    debugText2.text = 'gridX:' + gridX + ', gridY:' + gridY;
    debugText3.text = 'mouseX:' + game.input.x + ', mouseY:' + game.input.y;
    
}

// Displays a grid in the background
function make_Grid(WIDTH, HEIGHT) {
    //We will make a unique grid, with static tiles and dynamic tiles

    var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
    
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(2, 0x00CCFF,1);
    
    for (indexAux = 0; indexAux < 12; indexAux = indexAux + 1){
	y = ((indexAux) * GRID_SPACE) + 50;
		
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
}

function findGridPlace() {
    gridX = parseInt(game.input.x/GRID_SPACE);
    gridY = parseInt(game.input.y/GRID_SPACE);
    
    if(gridX < 1) gridX = 1;
    if(gridX > 14) gridX = 14;
    
    if(gridY < 1) gridY = 1;
    if(gridY > 10) gridY = 10;
}