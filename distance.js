var width = 800;
var height = 600;


var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    // game.load.atlas('breakout', 'assets/games/breakout/breakout.png', 'assets/games/breakout/breakout.json');
    game.load.image('starfield', 'assets/img/background4.png');
    game.load.image('star', 'assets/bullet.png');
    game.load.image('diamond', 'assets/bullet.png');
    game.load.image('enemy', 'assets/enemy1.png');


}

var TOTAL_TIME = 3;
var ENEMY_VELOCITY = 100;

var diamonds;
var enemys;
var enemy;
var star;

var ball;
var paddle;
var bricks;

var ballOnPaddle = true;

var lives = 3;
var score = 0;
var contador = TOTAL_TIME;

var velocityText;
var timeText;
var livesText;
var introText;
var lost = false;
var start = false;
var s;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  We check bounds collisions against all walls other than the bottom one
    game.physics.arcade.checkCollision.down = false;

    s = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    makeGrid(width,height);

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


    enemy = enemys.create(game.world.centerX, 100, 'enemy');
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.body.collideWorldBounds = true;
    // enemy.body.velocity.y = 100;
    
    diamonds = game.add.group();
    diamonds.enableBody = true;
    diamonds.physicsBodyType = Phaser.Physics.ARCADE;
    diamonds.setAll('anchor.x', 0.5);
    diamonds.setAll('anchor.y', 0.5);
    
    velocityText = game.add.text(50, 100, 'Velocidad: ' + ENEMY_VELOCITY, { font: "20px Arial", fill: "#ffffff", align: "left" });
    timeText = game.add.text(50, 50, 'time: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    livesText = game.add.text(width - 120, height - 50, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });
    introText = game.add.text(game.world.centerX, game.world.centerY + 100, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(0.5, 0.5);

    game.input.onDown.add(releaseBall, this);
    game.time.events.loop(Phaser.Timer.SECOND, countdown, this);
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
	you_won();
    } else {
	bullet.kill();
	game_over();
    }
}

function countdown () {

    if (start) {
	
	if (!lost) {
	    contador -= 1;
	}
	if (contador < 0) {
	    game_over();
	}
    }
}

function releaseBall () {
    
    start = true;
    if (!lost) {
	introText.visible = false;
	diam = diamonds.create(star.body.x + 5, star.body.y + 5, 'diamond');
	diam.anchor.setTo(0.5, 0.5);
    }
    enemy.body.velocity.y = ENEMY_VELOCITY;
    // if (ballOnStar)
    // {
    //     ballOnStar = false;
    //     ball.body.velocity.y = -300;
    //     ball.body.velocity.x = -75;
    //     ball.animations.play('spin');
    //     introText.visible = false;
    // }

}

function makeGrid(width, height) {
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

function you_won () {

    // ball.body.velocity.setTo(0, 0);
    
    introText.text = '¡Ganaste!';
    introText.visible = true;
    lost = true;
    star.visible = false;
    enemys.visible = false;
    // diamonds.visible = false;
}

function game_over () {

    // ball.body.velocity.setTo(0, 0);
    
    introText.text = '¡Perdiste!';
    introText.visible = true;
    lost = true;
    star.visible = false;
    enemys.visible = false;
    // diamonds.visible = false;
}

// function ballHitBrick (_ball, _brick) {

//     _brick.kill();

//     score += 10;

//     velocityText.text = 'score: ' + score;

//     //  Are they any bricks left?
//     if (bricks.countLiving() == 0)
//     {
//         //  New level starts
//         score += 1000;
//         velocityText.text = 'score: ' + score;
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