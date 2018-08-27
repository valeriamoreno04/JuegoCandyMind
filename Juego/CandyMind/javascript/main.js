var mainState = {
  preload: function(){
    //load our player
    game.load.image('alien', 'Recursos/PantallaJuego/Alien1.png');

    //loading the pipe
    game.load.image('pipe', 'Recursos/PantallaJuego/Obstaculos1.png');
  },

  create: function(){
    game.stage.backgroundColor  = '#71c5cf';

    //start game physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.alien = game.add.sprite(100, 245, 'alien');

    //apply physics to Alien
    game.physics.arcade.enable(this.alien);

    this.alien.body.gravity.y = 1000;

    //jump
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    this.pipes = game.add.group();

    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

    this.score = 0;

    this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff"});
  },

  update: function(){
    //restar gmae if alien goes above or below screen
    if(this.alien.y < 0 || this.alien.y > 490){
      this.restartGame();
    }

    game.physics.arcade.overlap(this.alien, this.pipes, this.restartGame, null);
  },

  jump: function(){
    this.alien.body.velocity.y = -350;
  },

  restartGame: function(){
    game.state.start('main');
  },

  addOnePipe: function(x, y){
    var pipe = game.add.sprite(x, y, 'pipe');

    this.pipes.add(pipe);

    game.physics.arcade.enable(pipe);

    //making pipe move left
    pipe.body.velocity.x = -200;

    //destroy pipe when out of screen
    pipe.checWorldBounds = true;
    pipe.outOfBoundsKill = true;

  },

  addRowOfPipes: function(){
    //random number 1-5 for hole position
    var hole = Math.floor(Math.random()*5) + 1;

    //add pipes with one hole
    for(var i = 0; i < 8; i++){
      if(i  != hole && i != hole + 1){
        this.addOnePipe(400, i * 60 + 10);
      }
    }

    this.score += 100;
    this.labelScore.text = this.score;
  }

};

var game = new Phaser.Game(400, 490);

game.state.add('main', mainState);

game.state.start('main');
