var game = new Phaser.Game(600, 300, Phaser.AUTO, 'gamecontainer');


game.state.add('Boot', Game.Boot);
game.state.add('Load', Game.Load);
game.state.add('Menu', Game.Menu);
game.state.add('Play', Game.Play);

game.state.start('Boot');