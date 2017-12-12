var game = new Phaser.Game(800,600,Phaser.CANVAS,'gameDiv');

//Variables to control star background
var spacefield;
var backgroundSpeed;

//Player control variables
var player;
var cursors;

//Shooting
var bullets;
var bulletTime = 0;
var fireButton;

var mainState = {
    preload:function(){
      game.load.image('starfield', 'assets/starfield.png');
      game.load.image('player', 'assets/spaceship.png');
      game.load.image('bullet', 'assets/bullet.png');
    },

    create:function(){
      spacefield = game.add.tileSprite(0,0,800,600,'starfield');
      backgroundSpeed = 3;

      player = game.add.sprite(game.world.centerX, game.world.centerY+200, 'player');
      player.scale.setTo(0.2,0.2);
      game.physics.enable(player,Phaser.Physics.ARCADE);

      cursors = game.input.keyboard.createCursorKeys();

      bullets = game.add.group();
      bullets.enableBody = true;
      bullets.physicsBodyType = Phaser.Physics.ARCADE;
      bullets.createMultiple(30, 'bullet');
      bullets.setAll('scale.x', 0.03);
      bullets.setAll('scale.y', 0.03);
      bullets.setAll('anchor.x', 0.5);
      bullets.setAll('anchor.y', 1);
      bullets.setAll('outOfBoundsKill', true);
      bullets.setAll('checkWorldBounds', true);

      fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update:function(){
      spacefield.tilePosition.y += backgroundSpeed;
      player.body.velocity.x = 0;

      if(cursors.left.isDown)
        player.body.velocity.x = -350;
      if(cursors.right.isDown)
        player.body.velocity.x = 350;

      if(fireButton.isDown)
        fireBullet();
    }
}

function fireBullet(){
  if(game.time.now > bulletTime) {
    bullet = bullets.getFirstExists(false);
    if(bullet){
      bullet.reset(player.x+30,player.y);
      bullet.body.velocity.y = -400;
      bulletTime = game.time.now + 200;
    }
  }
}

game.state.add('mainState', mainState);
game.state.start('mainState');
