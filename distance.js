// Variable declarations
var width = 800; // The width of the game screen
var height = 600; // The height of the game screen

var TOTAL_TIME = 3; // Time for explosion
var ENEMY_VELOCITY = 100; // Velocity of the enemy

var bombs; // Group of bombs
var enemys; // Group of enemys
var enemy; // Instance of an enemy
var bombOnMouse; // The sprite that appears on the mouse (Might be removed)

var lives = 3; // Lives left
var score = 0; // Score
var timeCounter = TOTAL_TIME; // Time counter

var velocityText; // Text display of velocity
var timeText; // Text display of time
var livesText; // Text display of lives
var introText; // Text display
var scoreText; // Text display of score

var lost = false; // Boolean that says if player lost the game
var start = false; // Boolean that says if the game has begun

var background; // Background of the game

// Representes de game
var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

// Loading the sprites.
function preload() {
    game.load.image('background', 'assets/img/background4.png'); // The background
    game.load.image('bombSelect', 'assets/bullet.png'); // The bomb that follows the mouse (Perhaps this will be removed)
    game.load.image('bomb', 'assets/bullet.png'); // The bomb
    game.load.image('enemyDistance', 'assets/enemy1.png'); // The distance enemy
}

// Creates the elements present in the game
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  We check bounds collisions against all walls other than the bottom one
    game.physics.arcade.checkCollision.down = false;

    background = game.add.tileSprite(0, 0, 800, 600, 'background');

    make_Grid(width,height);

    bombOnMouse = game.add.sprite(game.world.centerX, 500, 'bombSelect');
    bombOnMouse.anchor.setTo(0.5, 0.5);

    game.physics.enable(bombOnMouse, Phaser.Physics.ARCADE);

    bombOnMouse.body.collideWorldBounds = true;
    bombOnMouse.body.bounce.set(1);
    bombOnMouse.body.immovable = true;

    enemys = game.add.group();
    enemys.enableBody = true;
    enemys.physicsBodyType = Phaser.Physics.ARCADE;

    enemy = enemys.create(game.world.centerX, 100, 'enemyDistance');
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.body.collideWorldBounds = true;
    
    bombs = game.add.group();
    bombs.enableBody = true;
    bombs.physicsBodyType = Phaser.Physics.ARCADE;
    bombs.setAll('anchor.x', 0.5);
    bombs.setAll('anchor.y', 0.5);
    
    timeText = game.add.text(25, 25, 'time: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    velocityText = game.add.text(25, 75, 'Velocidad: ' + ENEMY_VELOCITY, { font: "20px Arial", fill: "#ffffff", align: "left" });
    scoreText = game.add.text(25, 125, 'Puntos: ' + score, { font: "20px Arial", fill: "#ffffff", align: "left" });
    livesText = game.add.text(width - 120, height - 50, 'Vidas: ' + lives, { font: "20px Arial", fill: "#ffffff", align: "left" });
    introText = game.add.text(game.world.centerX, game.world.centerY + 100, '- Haz click para empezar -', { font: "40px Arial", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(0.5, 0.5);

    game.input.onDown.add(put_Bomb, this);
    game.time.events.loop(Phaser.Timer.SECOND, countdown, this);
}

function update() {
    game.physics.arcade.overlap(enemys, bombs, try_To_Destroy, null, this);

    bombOnMouse.body.x = game.input.x - 5;
    bombOnMouse.body.y = game.input.y - 5;

    timeText.text = 'Tiempo: ' + timeCounter;
}

function try_To_Destroy(enemy, bullet) {
    if (timeCounter == 0) {
	enemy.kill();
	you_won();
    } else {
	bullet.kill();
	game_over();
    }
}

function countdown() {
    if (start) {
	if (!lost) {
	    timeCounter -= 1;
	}
	if (timeCounter < 0) {
	    game_over();
	}
    }
}

function put_Bomb() {
    start = true;
    if (!lost) {
	introText.visible = false;
	// Intance of a bomb
	var bomb = bombs.create(bombOnMouse.body.x + 5, bombOnMouse.body.y + 5, 'bomb');
	bomb.anchor.setTo(0.5, 0.5);
    }
    enemy.body.velocity.y = ENEMY_VELOCITY;
}

function make_Grid(width, height) {
	var graphics = game.add.graphics(0, 0);
	
	//space between lines
	var space = 20;
	
	//adding lines
	graphics.lineStyle(1, 0x33FF00,0.5);
	for (y = space; y < height; y = y+space){
		graphics.moveTo(0,y); 
		graphics.lineTo(width-space,y);
	}
	
	//adding line numbers.
	var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
	var end = height/space;
	for (y = space; y < height; y = y+space){
		end--;
		game.add.text(width-space,y-10,String(end),style);
	}
}

function you_won() {
    introText.text = '¡Ganaste!';
    introText.visible = true;
    lost = true;
    bombOnMouse.visible = false;
    enemys.visible = false;
}

function game_over() {
    introText.text = '¡Perdiste!';
    introText.visible = true;
    lost = true;
    bombOnMouse.visible = false;
    enemys.visible = false;
}
