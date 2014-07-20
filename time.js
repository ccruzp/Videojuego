var width = 800; // Width of the game
var height = 600; // Height of the game

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
var bulletSpeed = 1; // Speed of the bullets
var bulletWaitingTime = 0; // Avoids too many bullets shot at the same time
var lectureSpeedTime = 0; // Avoids keyboard lecture too many times

var score = 0; // NOT USED YET - Player's score
var scoreText; // NOT USED YET - Display for player's score
var speedText; // Display for enemies' bullet's speed
var shieldText; // Display for player's shield's time

var shielded = false; // Says if the player is shielded or not

// Variable that represents the game
var game = new Phaser.Game(
    width, height, Phaser.AUTO, 'phaser-test', 
    { preload: preload, create: create, update: update }
);

function preload() {
    game.load.image('background', 'assets/img/background2.png');
    game.load.image('star', 'assets/shielded.png');
    game.load.image('bullet', 'assets/bullet.png', 32, 48);
    game.load.spritesheet('base', 'assets/basesheet2.png', 95, 100,2);
}

function create() {
    game.add.sprite(0, 0, 'background');

    make_Grid(width,height);

    // The player and its settings
    // player = game.add.sprite(32, game.world.height - 150, 'dude');
    player = game.add.sprite(250, 652, 'base');
    
    // We need to enable physics on the player
    game.physics.arcade.enable(player);

    // Player physics properties. Give the little guy a slight bounce
    player.body.collideWorldBounds = true;

    //  The baddies!
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    alien = aliens.create(300, 60, 'star');
    alien.anchor.setTo(0.5, 0.5);

    speedText = game.add.text(
        16, height-32, '', { font: '24px Arial', fill: '#ffffff' }
    );

    shieldText = game.add.text(
        16, height-32-36, '', { font: '24px Arial', fill: '#ffffff' }
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

    shieldUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
    shieldDown = game.input.keyboard.addKey(Phaser.Keyboard.S);
}

function update() {
    game.physics.arcade.overlap(player, bullets, check_Shield, null, this);

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
    if (cursors.up.isDown || cursors.down.isDown) {
        update_Shield_Speed();
    }
    if (shieldUp.isDown || shieldDown.isDown) {
        update_Bullet_Speed();
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

function update_Shield_Speed() {
    if (game.time.now > lectureSpeedTime) {
        if (cursors.down.isDown && (bulletSpeed > 1)){
            bulletSpeed = bulletSpeed -1;
            lectureSpeedTime = game.time.now + 150;
        }
        if (cursors.up.isDown && (bulletSpeed < 30)){
            bulletSpeed = bulletSpeed + 1;
            lectureSpeedTime = game.time.now + 150;
        }
    }
}

function update_Bullet_Speed() {
    if (game.time.now > lectureSpeedTime) {
        if (shieldDown.isDown && (shieldTime > 1)){
            shieldTime= shieldTime -1;
            lectureSpeedTime = game.time.now + 150;
        }
        if (shieldUp.isDown && (shieldTime < 30)){
            shieldTime = shieldTime + 1;
            lectureSpeedTime = game.time.now + 150;
        }
    }
}

function shoot() {
    if (game.time.now > bulletWaitingTime) {
        bullet = bullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(alien.x, alien.y + alien.height/2 + 15);
            bullet.body.velocity.y = 20 * bulletSpeed;
            bulletWaitingTime = game.time.now + 200;
        }
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
        bullet.kill();
    }

}
