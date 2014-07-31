var WIDTH = 800; // WIDTH of the game
var HEIGHT = 600; // HEIGHT of the game
var GRID_SPACE = 20; //GRID_SPACE between lines
 
var cursors;
var fireButton;
var shieldUp;
var shieldDown;

var player; // The player
var alien; // Instance of an enemy
var aliens; // Group that represents the enemies
var bullet; // Instance of a bullet shot by an enemy
var bullets; // Group that represents the bullets shot by enemies
var shieldTime = 0; // Time that takes the shield to activate
var bulletSpeed = 10; // Speed of the bullets
var bulletWaitingTime = 10000; // Avoids too many bullets shot at the same time
var lectureSpeedTime = 0; // Avoids keyboard lecture too many times

var score = 0; // NOT USED YET - Player's score
var scoreText; // NOT USED YET - Display for player's score
var speedText; // Display for enemies' bullet's speed
var shieldText; // Display for player's shield's time

var shielded = false; // Says if the player is shielded or not

// Variable that represents the game
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'phaser-test', 
			   { preload: preload, create: create, update: update }
);

function preload() {
    game.load.image('background', 'assets/img/background2.png');
    game.load.image('star', 'assets/unshielded.png');
    game.load.image('bullet', 'assets/bullet.png', 32, 48);
    game.load.spritesheet('base', 'assets/basesheet2.png', 95, 100,2);
    game.load.image('upButton', 'assets/star.png');
    game.load.image('downButton', 'assets/diamond.png');
}

function create() {
    game.add.sprite(0, 0, 'background');

    make_Grid(WIDTH,HEIGHT);

    // The player and its settings
    // player = game.add.sprite(32, game.world.HEIGHT - 150, 'dude');
    player = game.add.sprite(250, 652, 'base');
    
    // We need to enable physics on the player
    game.physics.arcade.enable(player);

    // Player physics properties. Give the little guy a slight bounce
    player.body.collideWorldBounds = true;

    //  The baddies!
    aliens = game.add.group();
    aliens.enableBody = true;
    // aliens.physicsBodyType = Phaser.Physics.ARCADE;

    alien = aliens.create(game.world.centerX, game.world.centerY - 250, 'star');
    alien.anchor.setTo(0.5, 0.5);
    // alien.scale.setTo(0.5, 0.5);
    // alien.body.immovable = true;

    speedText = game.add.text(
        16, HEIGHT-32, '', { font: '24px Arial', fill: '#ffffff' }
    );

    shieldText = game.add.text(
        16, HEIGHT-32-36, '', { font: '24px Arial', fill: '#ffffff' }
    );

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    shieldUp = game.add.button(WIDTH - 75, HEIGHT - 100, 'upButton',
				     up_Shield_Speed, 2, 1, 0);
    shieldDown = game.add.button(WIDTH - 75, HEIGHT - 50, 'downButton',
				       down_Shield_Speed, 2, 1, 0);
}

function update() {
    game.physics.arcade.overlap(player, bullets, check_Shield, null, this);
    game.physics.arcade.overlap(alien, bullets, kill_Alien, null, this);

    // Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
	player.body.velocity.x = -150;
    } else if (cursors.right.isDown) {
	player.body.velocity.x = 150;
    } 

    if (shielded) {
        player.frame = 1;
    } else {
        player.frame = 0;
    }
    if (fireButton.isDown) {
        shoot();
        if (shieldTime > 0){
            game.time.events.add(Phaser.Timer.SECOND * shieldTime * 0.90, activate_Shield, this);
            game.time.events.add(Phaser.Timer.SECOND * shieldTime + Phaser.Timer.SECOND * 0.1, deactivate_Shield, this);
        }
    }
    speedText.text = 'Velocidad: ' + bulletSpeed;
    shieldText.text = 'Escudo: ' + shieldTime + ' s.' ;
}

function make_Grid(WIDTH, HEIGHT) {
    var graphics = game.add.graphics(0, 0);
       
    //adding lines
    graphics.lineStyle(1, 0x33FF00,0.5);
    for (y = GRID_SPACE; y < HEIGHT; y = y + GRID_SPACE){
        graphics.moveTo(0, y); 
        graphics.lineTo(WIDTH-GRID_SPACE, y);
    }
    
    //adding line numbers.
    var style = { font: "15px Arial", fill: "#ffffff", align: "center" };
    var end = HEIGHT / GRID_SPACE;
    for (y = GRID_SPACE; y < HEIGHT; y = y + GRID_SPACE){
        end--;
        game.add.text(WIDTH - GRID_SPACE, y - 10, String(end), style);
    }
}

function up_Shield_Speed() {
        if (shieldTime < 30) {
            shieldTime = shieldTime + 1;
        }    
}

function down_Shield_Speed() {
        if (shieldTime > 0) {
            shieldTime = shieldTime - 1;
        }    
}

function shoot() {
    bullet = bullets.getFirstExists(true);
    if (!bullet) {
        bullet = bullets.create(alien.x, alien.y + alien.height/2 + 15, 'bullet');
        bullet.body.velocity.y = 20 * bulletSpeed;
        bulletWaitingTime = game.time.now + 200;
    }
}

function activate_Shield() {
    shielded = true;
}

function deactivate_Shield() {
    shielded = false;
}

function check_Shield(player, bullet) {
    if (!shielded){
        player.kill();
    } else {
        bullet.body.velocity.y = - bulletSpeed * GRID_SPACE;
    }

}

function click() {
    var introText = game.add.text(game.world.centerX, game.world.centerY + 100, 
			      '- Haz click para empezar -', 
			      { font: "40px Arial", fill: "#ffffff", 
				align: "center" });
    introText.anchor.setTo(0.5, 0.5);

    introText.text = '¡Perdiste!';
    introText.visible = true;
    lost = true;
    bombOnMouse.visible = false;
    enemys.visible = false;
}

function kill_Alien(alien) {
    bullet.kill();
    alien.kill();
}