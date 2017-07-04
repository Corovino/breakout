var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload()
{
     game.load.image('paddle','assets/paddle.png');
     game.load.image('brick', 'assets/brick.png'); 
     game.load.image('ball', 'assets/ball.png'); 
}

let ball;
let paddle;
let bricks;
let left;
let right;
let score = 0;
let scoreText;
let gameOver;
let finalScore;
function create()
{
    game.stage.backgroundColor = '#3598db';

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.world.enableBody = true;

    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    // Add the paddle at the bottom of the screen
    paddle = game.add.sprite(200, 500, 'paddle');
    paddle.scale.setTo(0.5,0.5);

    // Make sure the paddle won't move when it hits the ball
    paddle.body.immovable = true;

    // Create a group that will contain all the bricks
    bricks = game.add.group();
    // Add 25 bricks to the group (5 columns and 5 lines)
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 6; j++) {
            // Create the brick at the correct position
            var brick = game.add.sprite(105+i*60, 40+j*35, 'brick');

            // Make sure the brick won't move when the ball hits it
            brick.body.immovable = true;

            // Add the brick to the group
            bricks.add(brick);
        }
    }

    // Add the ball 
    ball = game.add.sprite(200, 300, 'ball');  
    ball.scale.setTo(0.5,0.5);

    // Give the ball some initial speed
    ball.body.velocity.x = 200;
    ball.body.velocity.y = 400;

    // Make sure the ball will bounce when hitting something
    ball.body.bounce.setTo(1); 
    ball.body.collideWorldBounds = true;

    scoreText = game.add.text(16,16, 'Score: 0', { fontSize: '20px', fill:'#000'} );



}

function update()
{

   // Move the paddle left/right when an arrow key is pressed
   if (left.isDown) paddle.body.velocity.x = -700;
   else if (right.isDown) paddle.body.velocity.x = 700; 

   // Stop the paddle when no key is pressed
   else paddle.body.velocity.x = 0; 

   // Add collisions between the paddle and the ball
   game.physics.arcade.collide(paddle, ball);

   // Call the 'hit' function when the ball hits a brick
   game.physics.arcade.collide(ball, bricks, hit, null, this);

   if (ball.position.y > 510)
   {
     
      gameOver = game.add.text(270,300, 'GAME OVER',{ fontSize: '40px', fill:'#000'} );
      finalScore = game.add.text(325,350, 'Final Score : '+score,{ fontSize: '20px', fill:'#000'} );
      

      ball.body.velocity.y = 0;    
      ball.body.velocity.x = 0;    
      setTimeout( () => {
         resetGame();
     }, 5000);
    
      
      
   }


}

function resetGame()
{
    socre = 0;
    game.state.restart();

    
}

function hit(ball, brick)
{

	brick.kill();
  score += 1;
  scoreText.text = 'Score:'+score;
}













