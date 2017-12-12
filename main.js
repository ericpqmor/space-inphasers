var game = new Phaser.Game(800,600,Phaser.CANVAS,'gameDiv');

//Variable to store background
var spacefield;

var mainState = {
    preload:function(){
      game.load.image('starfield', 'assets/starfield.png');
    },

    create:function(){
      spacefield = game.add.tileSprite(0,0,800,600,'starfield');

    },

    update:function(){
      spacefield.tilePosition.y += 2;
    }
}

game.state.add('mainState', mainState);
game.state.start('mainState');
