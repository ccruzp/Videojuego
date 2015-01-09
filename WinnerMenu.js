BasicGame.WinnerMenu = function (game) {
    // this.background = null;
    // this.winnerText = null;
    // this.playAgainButton = null;

    this.timeOfGame;
    this.score;
    this.scoreTime;
    this.maxTime;
    this.rankBoolean;
    this.nextLevelName;
    this.nextLevel
    this.make_Grid;
};

BasicGame.WinnerMenu.prototype = {
    
    init: function(lastTime, nextLevel,score,
		   activate_Enemy_Shield,
		   allign_X,
		   allign_Y,
		   begin_Game,
		   blackHoleButton_Setup,
		   blackScreen_Displays_Setup,
		   bombOnMouse_Setup,
		   bombPool_Setup,
		   buttonPanel_Setup,
		   cannonButton_Setup,
		   cannonOnMouse_Setup,
		   cannonPool_Setup,
		   cannonSelectorButtonsPool_Setup,
		   countdown,
		   deactivate_Enemy_Shield,
		   decrease_Fire,
		   decrease_Time_Shield,
		   desallign_X,
		   desallign_Y,
		   displays_Setup,
		   find_Grid_Place,
		   enemy_Fire,
		   enemy_Hit,
		   enemy_ShieldTime_Text_Setup,
		   enemyBulletPool_Setup,
		   enemyDistancePool_Setup,
		   enemyTimePool_Setup,
		   enemyVelocityLaserPool_Setup,
		   enemyVelocityPool_Setup,
		   fire,
		   get_Enemy_Distance_Speed,
		   increase_Fire,
		   increase_Time_Shield,
		   lockedButtons_Setup,
		   make_Grid,
		   minusButton_Setup,
		   missilePool_Setup,
		   out_Of_GridY,
		   playButton_Setup,
		   plusButton_Setup,
		   put_Weapon,
		   select_Bomb,
		   select_Cannon,
		   select_Shield,
		   selector_Setup,
		   set_Missile_Speed,
		   set_Shield_Time,
		   shield_Hit,
		   shieldButton_Setup,
		   shieldOnMouse_Setup,
		   shieldPool_Setup,
		   shieldSelectorButtonsPool_Setup,
		   shuffleBag_Bomb_Get,
		   shuffleBag_Bomb_Restart,
		   shuffleBag_Bomb_Setup,
		   shuffleBag_Velocity_Get,
		   shuffleBag_Velocity_Restart,
		   shuffleBag_Velocity_Setup,
		   shuffleBag_X_Axis_Get,
		   shuffleBag_X_Axis_Restart,
		   shuffleBag_X_Axis_Setup,
		   start,
		   try_To_Destroy,
		   try_To_Destroy_Time,
		   try_To_Destroy_Velocity,
		   you_Got_Shot) {
		   
	this.nextLevel = nextLevel;
	this.lastScore = score;
	this.timeOfGame = lastTime;
	//this.timeOfGame = this.time.elapsedSecondsSince(this.timeOfGame);
	if(this.nextLevel != 0) this.nextLevelName = "Nivel" + this.nextLevel;
	else this.nextLevelName = 'MainMenu';
	
	this.activate_Enemy_Shield = activate_Enemy_Shield;
	this.allign_X = allign_X;
	this.allign_Y = allign_Y;
	this.begin_Game = begin_Game; 
	this.blackHoleButton_Setup = blackHoleButton_Setup;
	this.blackScreen_Displays_Setup = blackScreen_Displays_Setup;
	this.bombOnMouse_Setup = bombOnMouse_Setup;
	this.bombPool_Setup = bombPool_Setup;
	this.buttonPanel_Setup = buttonPanel_Setup;
	this.cannonButton_Setup = cannonButton_Setup;
	this.cannonOnMouse_Setup = cannonOnMouse_Setup;
	this.cannonPool_Setup = cannonPool_Setup;
	this.cannonSelectorButtonsPool_Setup = cannonSelectorButtonsPool_Setup;
	this.countdown = countdown;
	this.deactivate_Enemy_Shield = deactivate_Enemy_Shield;
	this.decrease_Fire = decrease_Fire;
	this.decrease_Time_Shield = decrease_Time_Shield;
	this.desallign_X = desallign_X;
	this.desallign_Y = desallign_Y; 
	this.displays_Setup = displays_Setup;
	this.find_Grid_Place = find_Grid_Place;
	this.enemy_Fire = enemy_Fire;
	this.enemy_Hit = enemy_Hit;
	this.enemy_ShieldTime_Text_Setup = enemy_ShieldTime_Text_Setup;
	this.enemyBulletPool_Setup = enemyBulletPool_Setup;
	this.enemyDistancePool_Setup = enemyDistancePool_Setup;
	this.enemyTimePool_Setup = enemyTimePool_Setup;
	this.enemyVelocityLaserPool_Setup = enemyVelocityLaserPool_Setup;
	this.enemyVelocityPool_Setup = enemyVelocityPool_Setup;
	this.fire = fire;
	this.get_Enemy_Distance_Speed = get_Enemy_Distance_Speed;
	this.increase_Fire = increase_Fire;
	this.increase_Time_Shield = increase_Time_Shield;
	this.lockedButtons_Setup = lockedButtons_Setup;
	this.make_Grid = make_Grid;
	this.minusButton_Setup = minusButton_Setup;
	this.missilePool_Setup = missilePool_Setup;
	this.out_Of_GridY = out_Of_GridY;
	this.playButton_Setup = playButton_Setup;
	this.plusButton_Setup = plusButton_Setup;
	this.put_Weapon = put_Weapon;
	this.select_Bomb = select_Bomb;
	this.select_Cannon = select_Cannon;
	this.select_Shield = select_Shield;
	this.selector_Setup = selector_Setup;
	this.set_Missile_Speed = set_Missile_Speed;
	this.set_Shield_Time = set_Shield_Time;
	this.shield_Hit = shield_Hit;
	this.shieldButton_Setup = shieldButton_Setup;
	this.shieldOnMouse_Setup = shieldOnMouse_Setup;
	this.shieldPool_Setup = shieldPool_Setup;
	this.shieldSelectorButtonsPool_Setup = shieldSelectorButtonsPool_Setup;
	
	this.shuffleBag_Bomb_Get = shuffleBag_Bomb_Get;
	this.shuffleBag_Bomb_Restart = shuffleBag_Bomb_Restart;	
	this.shuffleBag_Bomb_Setup = shuffleBag_Bomb_Setup;
	this.shuffleBag_Velocity_Get = shuffleBag_Velocity_Get;
	this.shuffleBag_Velocity_Restart = shuffleBag_Velocity_Restart;
	this.shuffleBag_Velocity_Setup = shuffleBag_Velocity_Setup;
	this.shuffleBag_X_Axis_Get = shuffleBag_X_Axis_Get;
	this.shuffleBag_X_Axis_Restart = shuffleBag_X_Axis_Restart;
	this.shuffleBag_X_Axis_Setup = shuffleBag_X_Axis_Setup;
	
	this.start = start;
	this.try_To_Destroy = try_To_Destroy;
	this.try_To_Destroy_Time = try_To_Destroy_Time;
	this.try_To_Destroy_Velocity = try_To_Destroy_Velocity;
	this.you_Got_Shot = you_Got_Shot;
    },
    
    preload: function () {
	
    },
    
    create: function () {
	
	// this.background = this.add.sprite(0, 0, 'menuBackground');

	// this.winnerText = this.add.text(this.world.centerX, 50, '¡Ganaste!',
	// 				  { font: "50px Arial", fill: "#ffffff",
	// 				    align: "left" });
	// this.winnerText.anchor.setTo(0.5, 0.5);

	// this.playAgainButton = this.add.button(this.world.centerX, this.world.centerY, 'playAgainButton',
	// 				       this.playAgain, this, 1, 0, 1, 0);
	// this.playAgainButton.anchor.setTo(0.5, 0.5);
	// this.playAgainButton.scale.setTo(0.5, 0.5);
	aux = 0;
	this.rankBoolean = true; 
	this.score = 0;
	this.maxTime = 100; 
	this.timeOfGame = Math.floor(this.timeOfGame);
	console.log('timeOfGame ' + this.timeOfGame);
	this.scoreTime = this.maxTime - this.timeOfGame;
	
	music = this.add.audio('coin');
	rankSound = this.add.audio('rankS');

	background = this.add.sprite(0, 0, 'menuBackground');

	winnerText = this.add.text(this.world.centerX, 50, '¡Ganaste!',
					  { font: "50px Arial", fill: "#ffffff",
					    align: "left" });
	winnerText.anchor.setTo(0.5, 0.5);
	
	/*timeText = this.add.text(30, this.world.height-140, 'Tiempo total: '+ this.timeOfGame.toPrecision(3) + ' segundos',
					  { font: "40px Arial", fill: "#ffffff",
					    align: "left" });*/
	
	scoreText = this.add.text(70, this.world.height-100, 'Score: '+ this.score,
					  { font: "70px Arial", fill: "#ffffff",
					    align: "left" });
	
	/*scoreTimeText = this.add.text(30, this.world.height-60, 'TiempoAux: '+ this.scoreTime,
					  { font: "40px Arial", fill: "#ffffff",
					    align: "left" });
	*/
	rankText = this.add.text(this.world.width - 300, this.world.height-100, 'Rank:',
					  { font: "70px Arial", fill: "#ffffff",
					    align: "left" });
	
	rankLetterText = this.add.text(this.world.width - 100, this.world.height-100, '',
					  { font: "70px Arial", fill: "#f7d913",
					    align: "left" });
	
	this.time.events.loop(Phaser.Timer.SECOND/10, this.update_Score, this);
		
	nextLevelButton = this.add.button(this.world.centerX, this.world.centerY, 'nextLevelButton',
					       this.next_Level, this, 1, 0, 1, 0);
	nextLevelButton.anchor.setTo(0.5, 0.5);
	nextLevelButton.scale.setTo(0.5, 0.5);
    },
    
    update: function () {
    
    // 		//	You don't actually need to do this, but I find it gives a much smoother game experience.
    // 		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
    // 		//	You can jump right into the menu if you want and still play the music, but you'll have a few
    // 		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
    // 		//	it's best to wait for it to decode here first, then carry on.
    
    // 		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
    // 		//	the update function completely.
	//music.play('' ,0,1,true);
    // 	// 	if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
    // 	// 	{
    // 			// this.ready = true;
    // 			// this.state.start('MainMenu');
    // 	// 	}
    
    },

    next_Level: function () {
	winnerText.destroy();
	// this.playAgainButton.destroy();
	background.destroy();
	this.state.start(this.nextLevelName , true, false,
			 time,this.nextLevel,this.score,
			 this.activate_Enemy_Shield,
			 this.allign_X,
			 this.allign_Y,
			 this.begin_Game,
			 this.blackHoleButton_Setup,
			 this.blackScreen_Displays_Setup,
			 this.bombOnMouse_Setup,
			 this.bombPool_Setup,
			 this.buttonPanel_Setup,
			 this.cannonButton_Setup,
			 this.cannonOnMouse_Setup,
			 this.cannonPool_Setup,
			 this.cannonSelectorButtonsPool_Setup,
			 this.countdown,
			 this.deactivate_Enemy_Shield,
			 this.decrease_Fire,
			 this.decrease_Time_Shield,
			 this.desallign_X,
			 this.desallign_Y,
			 this.displays_Setup,
			 this.find_Grid_Place,
			 this.enemy_Fire,
			 this.enemy_Hit,
			 this.enemy_ShieldTime_Text_Setup,
			 this.enemyBulletPool_Setup,
			 this.enemyDistancePool_Setup,
			 this.enemyTimePool_Setup,
			 this.enemyVelocityLaserPool_Setup,
			 this.enemyVelocityPool_Setup,
			 this.fire,
			 this.get_Enemy_Distance_Speed,
			 this.increase_Fire,
			 this.increase_Time_Shield,
			 this.lockedButtons_Setup,
			 this.make_Grid,
			 this.minusButton_Setup,
			 this.missilePool_Setup,
			 this.out_Of_GridY,
			 this.playButton_Setup,
			 this.plusButton_Setup,
			 this.put_Weapon,
			 this.select_Bomb,
			 this.select_Cannon,
			 this.select_Shield,
			 this.selector_Setup,
			 this.set_Missile_Speed,
			 this.set_Shield_Time,
			 this.shield_Hit,
			 this.shieldButton_Setup,
			 this.shieldOnMouse_Setup,
			 this.shieldPool_Setup,
			 this.shieldSelectorButtonsPool_Setup,
			 this.shuffleBag_Bomb_Get,
			 this.shuffleBag_Bomb_Restart,
			 this.shuffleBag_Bomb_Setup,
			 this.shuffleBag_Velocity_Get,
			 this.shuffleBag_Velocity_Restart,
			 this.shuffleBag_Velocity_Setup,
			 this.shuffleBag_X_Axis_Get,
			 this.shuffleBag_X_Axis_Restart,
			 this.shuffleBag_X_Axis_Setup,
			 this.start,
			 this.try_To_Destroy,
			 this.try_To_Destroy_Time,
			 this.try_To_Destroy_Velocity,
			 this.you_Got_Shot);
    },

    update_Score: function(){
	
	if (this.rankBoolean){
	    if (this.scoreTime > 0){
	    
		aux = aux +1 ;
		//this.timeOfGame = this.timeOfGame + 1;
		this.scoreTime = this.scoreTime - 1;
		this.score = aux * 50;
	    
		scoreText.text =  'Score: '+ this.score;
		/*scoreTimeText.text = 'TiempoAux: '+ this.scoreTime;*/
		music.play('',0,1,false);
	    
	    
	    } else {
		this.score = this.score + this.lastScore;
		scoreText.text =  'Score: '+ this.score;
		
		this.scoreTime = this.maxTime - this.timeOfGame;
		/*Shows the total Rank earned, enables going to the next level*/
		console.log(this.scoreTime);
		//Shows in the screen: YOUR RANK IS:
	    
		if(this.scoreTime > (0.9 * this.maxTime)){
		    rankLetterText.text = 'S';
		    /* S Rank*/ 
		} else if (this.scoreTime > (0.8 * this.maxTime)){
		    rankLetterText.text = 'A';
		    /* A Rank */
		} else if (this.scoreTime > (0.7 * this.maxTime)){
		    rankLetterText.text = 'B';
		    /* B Rank */
		} else if (this.scoreTime > (0.5 * this.maxTime)){
		    rankLetterText.text = 'C';
		    /* C Rank*/
		} else if (this.scoreTime > (0.25 * this.maxTime)){
		    rankLetterText.text = 'D';
		    /* D Rank*/
		} else {
		    rankLetterText.text = 'E';
		    /* E Rank */
		}
	    
		this.rankBoolean = false;
		rankSound.play('',0,1,false);
	    
	    }
	    
	}
    },
    
};