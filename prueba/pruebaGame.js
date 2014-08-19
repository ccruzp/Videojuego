BasicGame.pruebaGame = function (game) {

    this.background; // Background of the game
};

BasicGame.pruebaGame.prototype = {
    
    create: function () {

	this.background = this.add.sprite(0, 0, 'background');

    },
    
    update: function () {

    },
    
    quit_Game: function (won) {

    },
    
    try_To_Destroy: function(enemy, bomb) {

    },

    make_Grid: function (WIDTH, HEIGHT) {
	

    },

    select_Bomb: function () {

    },

    start: function (pointer) {
	started = true;
    },

    put_Bomb: function () {
	
    },
    
    countdown: function () {

    },

    findGridPlace: function(){

    }

};