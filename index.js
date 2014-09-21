window.onload = function() {

    //	Create your Phaser game and inject it into the gameContainer div.
    //	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
    var game = new Phaser.Game(1000, 600, Phaser.CANVAS, 'gameContainer');

    //	Add the States your game has.
    //	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
    game.state.add('Boot', BasicGame.Boot);
    game.state.add('Preloader', BasicGame.Preloader);
    game.state.add('MainMenu', BasicGame.MainMenu);
    game.state.add('Nivel1', BasicGame.Nivel1);
    game.state.add('WinnerMenu', BasicGame.WinnerMenu);
    game.state.add('GameOverMenu', BasicGame.GameOverMenu);
    //	Now start the Boot state.
    game.state.start('Boot');
};
