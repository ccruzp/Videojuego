var BasicGame = {};

BasicGame.prueba = function (game) {

};

BasicGame.prueba.prototype = {

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
	this.load.image('background', '../assets/img/background4.png');
    },

    create: function () {

        this.state.start('Preloader');

    }

};