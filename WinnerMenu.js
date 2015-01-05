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
		   allign_X,
		   allign_Y,
		   blackHoleButton_Setup,
		   bombOnMouse_Setup,
		   buttonPanel_Setup,
		  // bombPool_Setup,
		   countdown,
		   find_Grid_Place,
		   gridLine_Setup,
		   make_Grid,
		   minusButton_Setup,
		   plusButton_Setup,
		 //  lockedButtons_Setup,
		   playButton_Setup,
		   select_Bomb,
		   selector_Setup,
		   start,
		   scoreText_Setup,
		   try_To_Destroy) {
	this.nextLevel = nextLevel;
	this.lastScore = score;
	this.timeOfGame = lastTime;
	//this.timeOfGame = this.time.elapsedSecondsSince(this.timeOfGame);
	if(this.nextLevel != 0) this.nextLevelName = "Nivel" + this.nextLevel;
	else this.nextLevelName = 'MainMenu';
	
	this.allign_X = allign_X;
	this.allign_Y = allign_Y;
	this.blackHoleButton_Setup = blackHoleButton_Setup;
	this.bombOnMouse_Setup = bombOnMouse_Setup;
	this.buttonPanel_Setup = buttonPanel_Setup;
	//this.bombPool_Setup = bombPool_Setup;
	this.countdown = countdown;
	this.find_Grid_Place = find_Grid_Place;
	this.gridLine_Setup = gridLine_Setup;
	this.make_Grid = make_Grid;
	this.minusButton_Setup = minusButton_Setup;
	this.plusButton_Setup = plusButton_Setup;
	//this.lockedButtons_Setup = lockedButtons_Setup;
	this.playButton_Setup = playButton_Setup;
	this.select_Bomb = select_Bomb;
	this.selector_Setup = selector_Setup;
	this.start = start;
	this.scoreText_Setup = scoreText_Setup;
	this.try_To_Destroy = try_To_Destroy;
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
			 this.allign_X,
			 this.allign_Y,
			 this.blackHoleButton_Setup,
			 this.bombOnMouse_Setup,
			 this.buttonPanel_Setup,
			 //  this.bombPool_Setup,
			 this.countdown,
			 this.find_Grid_Place,
			 this.gridLine_Setup,
			 this.make_Grid,
			 this.minusButton_Setup,
			 this.plusButton_Setup,
			 //this.lockedButtons_Setup,
			 this.playButton_Setup,
			 this.select_Bomb,
			 this.selector_Setup,
			 this.start,
			 this.scoreText_Setup,
			 this.try_To_Destroy);
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