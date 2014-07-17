var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    // game.load.atlas('breakout', 'assets/games/breakout/breakout.png', 'assets/games/breakout/breakout.json');
    game.load.image('starfield', 'assets/img/background4.png');
    game.load.image('star', 'assets/bullet.png');
    game.load.image('diamond', 'assets/bullet.png');
    game.load.image('firstaid', 'assets/firstaid.png');


}

var TOTAL_TIME = 3;

var diamonds;
var enemys;
var star;

var ball;
var paddle;
var bricks;

var ballOnPaddle = true;

var lives = 3;
var score = 0;
var contador = TOTAL_TIME;

var scoreText;
var timeText;
var livesText;
var introText;
var lost = false;
var s;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  We check bounds collisions against all walls other than the bottom one
    game.physics.arcade.checkCollision.down = false;

    s = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    // bricks = game.add.group();
    // bricks.enableBody = true;
    // bricks.physicsBodyType = Phaser.Physics.ARCADE;

    // var brick;

    // for (var y = 0; y < 4; y++)
    // {
    //     for (var x = 0; x < 15; x++)
    //     {
    //         brick = bricks.create(120 + (x * 36), 100 + (y * 52), 'breakout', 'brick_' + (y+1) + '_1.png');
    //         brick.body.bounce.set(1);
    //         brick.body.immovable = true;
    //     }
    // }

    // paddle = game.add.sprite(game.world.centerX, 500, 'breakout', 'star.png');
    star = game.add.sprite(game.world.centerX, 500, 'star');
    star.anchor.setTo(0.5, 0.5);

    game.physics.enable(star, Phaser.Physics.ARCADE);

    star.body.collideWorldBounds = true;
    star.body.bounce.set(1);
    star.body.immovable = true;

    // ball = game.add.sprite(game.world.centerX, star.y - 16, 'breakout', 'diamond.png');
    // ball.anchor.set(0.5);
    // ball.checkWorldBounds = true;

    // game.physics.enable(ball, Phaser.Physics.ARCADE);

    // ball.body.collideWorldBounds = true;
    // ball.body.bounce.set(1);

    // ball.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);

    // ball.events.onOutOfBounds.add(ballLost, this);

    enemys = game.add.group();
    enemys.enableBody = true;
    enemys.physicsBodyType = Phaser.Physics.ARCADE;


    enemy = enemys.create(game.world.centerX, 100, 'firstaid');
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.body.collideWorldBounds = true;
    enemy.body.velocity.y = 100;
    
    diamonds = game.add.group();
    diamonds.enableBody = true;
    diamonds.physicsBodyType = Phaser.Physics.ARCADE;
    diamonds.setAll('anchor.x', 0.5);
    diamonds.setAll('anchor.y', 0.5);
    
    // scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    timeText = game.add.text(50, 50, 'time: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });
    introText = game.add.text(game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(0.5, 0.5);

    game.input.onDown.add(releaseBall, this);
    game.time.events.loop(Phaser.Timer.SECOND, sumar, this);
}

function update () {

    //  Fun, but a little sea-sick inducing :) Uncomment if you like!
    // s.tilePosition.x += (game.input.speed.x / 2);

    // game.physics.arcade.collide(diam, enemy, choque, this, this);
    game.physics.arcade.overlap(enemys, diamonds, try_destroy, null, this);

    star.body.x = game.input.x - 5;
    star.body.y = game.input.y - 5;

    timeText.text = 'Tiempo: ' + contador;
    // if (star.x < 24)
    // {
    //     star.x = 24;
    // }
    // else if (star.x > game.width - 24)
    // {
    //     star.x = game.width - 24;
    // }

    // if (ballOnStar)
    // {
    //     ball.body.x = star.x;
    // }
    // else
    // {
    //     game.physics.arcade.collide(ball, star, ballHitStar, null, this);
    //     game.physics.arcade.collide(ball, bricks, ballHitBrick, null, this);
    // }

}

function try_destroy (enemy, bullet) {
    if (contador == 0) {
	enemy.kill();
    } else {
	bullet.kill();
	game_over();
    }
}

function sumar () {

    if (!lost) {
	contador -= 1;
    }
}

function releaseBall () {
    
    if (!lost) {
	introText.visible = false;
	diam = diamonds.create(star.body.x + 5, star.body.y + 5, 'diamond');
	diam.anchor.setTo(0.5, 0.5);
    }
    // if (ballOnStar)
    // {
    //     ballOnStar = false;
    //     ball.body.velocity.y = -300;
    //     ball.body.velocity.x = -75;
    //     ball.animations.play('spin');
    //     introText.visible = false;
    // }

}

// function ballLost () {

//     lives--;
//     livesText.text = 'lives: ' + lives;

//     if (lives === 0)
//     {
//         game_over();
//     }
//     else
//     {
//         ballOnStar = true;

//         ball.reset(star.body.x + 16, star.y - 16);
        
//         ball.animations.stop();
//     }

// }

function game_over () {

    // ball.body.velocity.setTo(0, 0);
    
    introText.text = 'Game Over!';
    introText.visible = true;
    lost = true;
    star.visible = false;
    enemys.visible = false;
    // diamonds.visible = false;


}

// function ballHitBrick (_ball, _brick) {

//     _brick.kill();

//     score += 10;

//     scoreText.text = 'score: ' + score;

//     //  Are they any bricks left?
//     if (bricks.countLiving() == 0)
//     {
//         //  New level starts
//         score += 1000;
//         scoreText.text = 'score: ' + score;
//         introText.text = '- Next Level -';

//         //  Let's move the ball back to the star
//         ballOnStar = true;
//         ball.body.velocity.set(0);
//         ball.x = star.x + 16;
//         ball.y = star.y - 16;
//         ball.animations.stop();

//         //  And bring the bricks back from the dead :)
//         bricks.callAll('revive');
//     }

// }

// function ballHitStar (_ball, _star) {

//     var diff = 0;

//     if (_ball.x < _star.x)
//     {
//         //  Ball is on the left-hand side of the star
//         diff = _star.x - _ball.x;
//         _ball.body.velocity.x = (-10 * diff);
//     }
//     else if (_ball.x > _star.x)
//     {
//         //  Ball is on the right-hand side of the star
//         diff = _ball.x -_star.x;
//         _ball.body.velocity.x = (10 * diff);
//     }
//     else
//     {
//         //  Ball is perfectly in the middle
//         //  Add a little random X to stop it bouncing straight up!
//         _ball.body.velocity.x = 2 + Math.random() * 8;
//     }

// }