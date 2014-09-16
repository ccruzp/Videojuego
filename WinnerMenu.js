BasicGame.WinnerMenu = function (game) {
    // this.background = null;
    // this.winnerText = null;
    // this.playAgainButton = null;

    this.timeOfGame;
    this.score;
    this.scoreTime;
    this.maxTime;
    this.rankBoolean;
};

BasicGame.WinnerMenu.prototype = {
    
    init: function(customParam1) {
	this.timeOfGame = customParam1;
	this.timeOfGame = this.time.elapsedSecondsSince(this.timeOfGame);
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
	this.maxTime = 70; 
	this.timeOfGame = Math.floor(this.timeOfGame);
	this.scoreTime = this.maxTime - this.timeOfGame;
	
	music = this.add.audio('coin');
	rankSound = this.add.audio('rankS');

	background = this.add.sprite(0, 0, 'menuBackground');

	winnerText = this.add.text(this.world.centerX, 50, '¡Ganaste!',
					  { font: "50px Arial", fill: "#ffffff",
					    align: "left" });
	winnerText.anchor.setTo(0.5, 0.5);
	
	timeText = this.add.text(30, this.world.height-140, 'Tiempo total: '+ this.timeOfGame.toPrecision(3) + ' segundos',
					  { font: "40px Arial", fill: "#ffffff",
					    align: "left" });
	
	scoreText = this.add.text(350, this.world.height-60, 'Score: '+ this.score,
					  { font: "40px Arial", fill: "#ffffff",
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
		
	playAgainButton = this.add.button(this.world.centerX, this.world.centerY, 'playAgainButton',
					       this.playAgain, this, 1, 0, 1, 0);
	playAgainButton.anchor.setTo(0.5, 0.5);
	playAgainButton.scale.setTo(0.5, 0.5);
	
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

    playAgain: function () {
	winnerText.destroy();
	// this.playAgainButton.destroy();
	background.destroy();
	this.state.start('Distance');
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