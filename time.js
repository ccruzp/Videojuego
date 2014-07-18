
var width = 800;
var height = 600;


var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-test', { preload: preload, create: create, update: update });



function preload() {
    game.load.image('sky', 'assets/img/background2.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/shielded.png');
    game.load.image('diamond', 'assets/diamond.png');
    game.load.image('firstaid', 'assets/firstaid.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('enemy', 'assets/stuff.png', 105, 84);
    game.load.spritesheet('base', 'assets/basesheet2.png', 95, 100,2);
    game.load.image('bullet', 'assets/bullet.png', 32, 48);
}


var ship;
var star;
var firstaid;
var diamond;  
var diamondTime = 0;
var speedTime = 0;
var projectileSpeed = 1;
var platforms;
var ground;
var score = 0;
var scoreText;
var speedText;
var shieldText;
var shieldInterval = 0;
var fireButton;
var enemy;
var player2;
var alien;
var shieldSpeed = 0;
var shieldup;
var shielddown;
var shielded = false;

function create() {

    // The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    // We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    
    // Here we create the ground
    ground = platforms.create(0, game.world.height - 64, 'ground');

    // // Scale it to fit the width of the game (the original sprite is 400x32)
    ground.scale.setTo(2, 2);

    // // This stops it from falling away when you jump on it
    ground.body.immovable = true;
    
    
    game.add.sprite(0, 0, 'sky');


    makeGrid(width,height);

    // The player and its settings
    // player = game.add.sprite(32, game.world.height - 150, 'dude');
    player = game.add.sprite(250, 652, 'base');
    
    // We need to enable physics on the player
    game.physics.arcade.enable(player);

    // Player physics properties. Give the little guy a slight bounce
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  The baddies!
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    createAliens();

    speedText = game.add.text(
        16, height-32, '', { font: '24px Arial', fill: '#ffffff' }
    );


    shieldText = game.add.text(
        16, height-32-36, '', { font: '24px Arial', fill: '#ffffff' }
    );




    diamonds = game.add.group();
    diamonds.enableBody = true;
    diamonds.physicsBodyType = Phaser.Physics.ARCADE;
    diamonds.createMultiple(30, 'bullet');
    diamonds.setAll('anchor.x', 0.5);
    diamonds.setAll('anchor.y', 1);
    diamonds.setAll('outOfBoundsKill', true);
    diamonds.setAll('checkWorldBounds', true);

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    shieldup = game.input.keyboard.addKey(Phaser.Keyboard.W);
    shielddown = game.input.keyboard.addKey(Phaser.Keyboard.S);

    


}

function makeGrid(width, height) {
    var graphics = game.add.graphics(0, 0);
    
    //space between lines
    space = 20;
    
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

function update() {

    game.physics.arcade.collide(firstaid, platforms);
    game.physics.arcade.overlap(aliens, diamonds, killBoth, null, this);
    game.physics.arcade.overlap(player, diamonds, checkShield, null, this);

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
        updateSpeed();
    }


    if (shieldup.isDown || shielddown.isDown) {
        updateSpeed2();
    }

    if (fireButton.isDown) {
        fireDiamond2();

        if (shieldSpeed > 0){
            game.time.events.add(Phaser.Timer.SECOND * shieldSpeed*0.90, activateShield, this);
            game.time.events.add(Phaser.Timer.SECOND * shieldSpeed + Phaser.Timer.SECOND * 0.1, deactivateShield, this);
        }
        

    }
    speedText.text = 'Speed: ' + projectileSpeed;
    shieldText.text = 'Shield: ' + shieldSpeed + ' segs.' ;
}


function updateSpeed(){
    if (game.time.now > speedTime) {
        if (cursors.down.isDown && (projectileSpeed > 1)){
            projectileSpeed= projectileSpeed -1;
            speedTime = game.time.now + 150;
        }
        if (cursors.up.isDown && (projectileSpeed < 30)){
            projectileSpeed = projectileSpeed + 1;
            speedTime = game.time.now + 150;
        }
    }
}

function updateSpeed2(){
    if (game.time.now > speedTime) {
        if (shielddown.isDown && (shieldSpeed > 1)){
            shieldSpeed= shieldSpeed -1;
            speedTime = game.time.now + 150;
        }
        if (shieldup.isDown && (shieldSpeed < 30)){
            shieldSpeed = shieldSpeed + 1;
            speedTime = game.time.now + 150;
        }
    }
}


function activateShield(){
    shielded = true;
}

function deactivateShield(){
    shielded = false;
}



function fireDiamond() {

    if (game.time.now > diamondTime) {
        diamond = diamonds.getFirstExists(false);
        if (diamond) {
            diamond.reset(player.x + player.width/2, player.y);
            diamond.body.velocity.y = -20 * projectileSpeed;
            diamondTime = game.time.now + 200;
        }
    }
}


function fireDiamond2() {

    if (game.time.now > diamondTime) {
        diamond = diamonds.getFirstExists(false);
        if (diamond) {
            diamond.reset(alien.x, alien.y + alien.height/2 + 15);
            diamond.body.velocity.y = 20 * projectileSpeed;
            diamondTime = game.time.now + 200;
        }
    }
}



function createAliens () {


    alien = aliens.create(200, 50, 'star');
    alien.anchor.setTo(0.5, 0.5);
    alien.body.moves = false;

    aliens.x = 0;
    aliens.y = 0;


    alien.x = 300;
    alien.y = 60;

}

function killBoth(alien, diamond) {
    //alien.kill();
    // diamond.kill();
}

function checkShield(player,diamond){
    if (!shielded){
        player.kill();
    } else {
        diamond.kill();
    }

}
