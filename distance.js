// Variable declarations
var WIDTH = 800; // The WIDTH of the game screen
var HEIGHT = 600; // The HEIGHT of the game screen
var GRID_SPACE = 20;
	
var TOTAL_TIME = 3; // Time for explosion
var ENEMY_VELOCITY = 5; // Velocity of the enemy

var bombs; // Group of bombs
var bomb;
var enemys; // Group of enemys
var enemy; // Instance of an enemy
var bombOnMouse; // The sprite that appears on the mouse (Might be removed)

var lives;// Lives left
var score; // Score
var timeCounter; // Time counter

var velocityText; // Text display of velocity
var timeText; // Text display of time
var livesText; // Text display of lives
var introText; // Text display for intro
var scoreText; // Text display of score
var gameOverText; // Text display for the end of the game

var playAgainButton; // Button for play again

var lost; // Boolean that says if player lost the game
var start; // Boolean that says if the game has begun

var background; // Background of the game

// Representes de game
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'phaser-example', 
			   { preload: preload, create: create, update: update });

// Loading the sprites.
function preload() {
    // The background    
    game.load.image('background', 'assets/img/background4.png');
    // The bomb that follows the mouse (Perhaps this will be removed)
    game.load.image('bombSelect', 'assets/bullet.png');
    // The bomb
    game.load.image('bomb', 'assets/bullet.png');
    // The distance enemy
    game.load.image('enemyDistance', 'assets/enemy1.png');
    game.load.image('playAgainButton', 'assets/star.png');
}

// Creates the elements present in the game
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  We check bounds collisions against all walls other than the bottom one
    game.physics.arcade.checkCollision.down = false;

    background = game.add.tileSprite(0, 0, 800, 600, 'background');

    make_Grid(WIDTH,HEIGHT);

    bombOnMouse = game.add.sprite(game.world.centerX, 500, 'bombSelect');
    bombOnMouse.anchor.setTo(0.5, 0.5);

    game.physics.enable(bombOnMouse, Phaser.Physics.ARCADE);

    bombOnMouse.body.collideWorldBounds = true;
    bombOnMouse.body.bounce.set(1);
    bombOnMouse.body.immovable = true;

    enemys = game.add.group();
    enemys.enableBody = true;
    enemys.physicsBodyType = Phaser.Physics.ARCADE;
    
    bombs = game.add.group();
    bombs.enableBody = true;
    bombs.physicsBodyType = Phaser.Physics.ARCADE;
    bombs.setAll('anchor.x', 0.5);
    bombs.setAll('anchor.y', 0.5);
    
    timeText = game.add.text(25, 25, '', { font: "20px Arial", fill: "#ffffff",
					   align: "left" });
    velocityText = game.add.text(25, 75, '', { font: "20px Arial",
					       fill: "#ffffff", 
					       align: "left" });
    scoreText = game.add.text(25, 125, '', { font: "20px Arial", 
					     fill: "#ffffff", align: "left" });
    livesText = game.add.text(WIDTH - 120, HEIGHT - 50, '',
			      { font: "20px Arial", fill: "#ffffff", 
    				align: "left" });
    introText = game.add.text(game.world.centerX, game.world.centerY + 100, '',
			      { font: "40px Arial", fill: "#ffffff", 
				align: "center" });
    introText.anchor.setTo(0.5, 0.5);
    gameOverText = game.add.text(game.world.centerX, game.world.centerY - 100, 
    			      '', { font: "60px Arial", fill: "#ffffff", 
    				    align: "center" });
    gameOverText.anchor.setTo(0.5, 0.5);
    game.input.onDown.add(put_Bomb, this);
    set_Game();
    game.time.events.loop(Phaser.Timer.SECOND, countdown, this);

    playAgainButton = game.add.button(1000, 1000,
    				      'playAgainButton', play_Again, 2, 1, 0);

    // playAgainButton = game.add.button(game.world.centerX, game.world.centerY,
    // 				      'playAgainButton', play_Again, 2, 1, 0);

}

function update() {
    game.physics.arcade.overlap(enemys, bombs, try_To_Destroy, null, this);

    bombOnMouse.body.x = game.input.x - 5;
    bombOnMouse.body.y = game.input.y - 5;

    timeText.text = 'Tiempo: ' + timeCounter;
}

function try_To_Destroy(enemy, bomb) {
    if (timeCounter == 0) {
	enemy.kill();
	you_Won();
    } else {
	bomb.kill();
	game_Over();
    }
}

function countdown() {
    if (start) {
	if (!lost) {
	    timeCounter -= 1;
	}
	if (timeCounter < 0) {
	    bomb.kill();
	    game_Over();
	}
    }
}

function put_Bomb() {
    start = true;
    if (!lost) {
	introText.visible = false;
	// Intance of a bomb
	bomb = bombs.create(bombOnMouse.body.x + 5, bombOnMouse.body.y + 5, 'bomb');
	bomb.anchor.setTo(0.5, 0.5);
    }
    enemy.body.velocity.y = ENEMY_VELOCITY * GRID_SPACE;
}

function make_Grid(WIDTH, HEIGHT) {
	var graphics = game.add.graphics(0, 0);
	
	//GRID_SPACE between lines
	GRID_SPACE = 20;
	
	//adding lines
	graphics.lineStyle(1, 0x33FF00,0.5);
	for (y = GRID_SPACE; y < HEIGHT; y = y + GRID_SPACE){
		graphics.moveTo(0, y); 
		graphics.lineTo(WIDTH - GRID_SPACE, y);
	}
	
	//adding line numbers.
	var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
	var end = HEIGHT/GRID_SPACE;
	for (y = GRID_SPACE; y < HEIGHT; y = y + GRID_SPACE){
		end--;
		game.add.text(WIDTH - GRID_SPACE, y - 10, String(end), style);
	}
}

function you_Won() {
    gameOverText.text = '¡Ganaste!';
    gameOverText.visible = true;
    lost = true;
    bombOnMouse.visible = false;
    enemys.visible = false;
}

function game_Over() {
    gameOverText.text = "¡Perdiste!";
    gameOverText.visible = true;
    lost = true;
    bombOnMouse.visible = false;
    enemys.removeAll();
    bombs.removeAll(true);
    // playAgainButton = game.add.button(game.world.centerX, game.world.centerY,
    // 				      'playAgainButton', play_Again, 2, 1, 0);
    playAgainButton.reset(game.world.centerX, game.world.centerY);
}

function play_Again() {
    playAgainButton.reset(1000, 1000);
    set_Game();
}

function set_Game() {
    lives = 3; // Lives left
    score = 0; // Score
    timeCounter = TOTAL_TIME; // Time counter
    lost = false; // Boolean that says if player lost the game
    start = false; // Boolean that says if the game has begun

    enemy = enemys.create(game.world.centerX, 20, 'enemyDistance');
    enemy.body.collideWorldBounds = true;

    timeText.text = 'Tiempo: ' + TOTAL_TIME;
    velocityText.text = 'Velocidad: ' + ENEMY_VELOCITY;
    scoreText.text = 'Puntos: ' + score;
    livesText.text = 'Vidas: ' + lives;
    introText.text = '- Haz click para empezar -';
    introText.visible = true;
    gameOverText.visible = false;
    bombOnMouse.visible = true;
}