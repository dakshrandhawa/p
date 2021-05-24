var PLAY = 1;
var END = 0;
var gameState = PLAY;


var trex;
var sun;
var cloud;
var score = 0;
var gameSound;
var gameOverImage,game_Over;
var restart, resartImage;

function preload(){
trex_running = loadAnimation("Trex_running0.png","Trex_running1.png","Trex_running2.png","Trex_running3.png","Trex_running4.png","Trex_running5.png","Trex_running6.png");
  
  trex_jump = loadAnimation("T-rex-Jump0.png","T-rex-Jump1.png","T-rex-Jump2.png","T-rex-Jump3.png","T-rex-Jump4.png");
  
  backgroundImage = loadImage("groundnew.png");
  sunImage = loadImage("sun.png");
  bananaImage = loadImage("banana.png");
  beeImage = loadImage("bee.png");
  cloudImage = loadImage("cloud.png");
  flowerImage = loadImage("flower.png");
  fireImage = loadImage("fire.png");
  ghostImage = loadImage("ghost.png");
   gameSound = loadSound("game_sound.wav");
 jumpSound = loadSound("jump.wav");
gameOver = loadSound("gameOver.mp3");
  gameOverImage = loadImage("game_over_icon.jpg");
  restartImage = loadImage("restart.png");



}


function setup() {
  createCanvas(windowWidth, windowHeight)
  
  backlground = createSprite(windowWidth-250, windowHeight, 50, 50);
  backlground.addImage(backgroundImage);
  backlground.visible = true;
  backlground.lifetime = 2000;
  
  invisibleGround = createSprite(windowWidth-700, windowHeight-70, 1450, 10);
  invisibleGround.visible = false;
 
  
  
  
 
  
 trex = createSprite(25, 400, 20, 20);
 trex.addAnimation("running", trex_running);
 trex.scale = 0.3 ;
  trex.debug = false;
  trex.setCollider("circle", 0 , 0 , 120);
  
  sun = createSprite(windowWidth-150, windowHeight-590, 20, 20);
 sun.addImage(sunImage);
  sun.scale = 0.2;
  
   game_Over = createSprite(175, 200, 400, 400);
   game_Over.addImage(gameOverImage);
  
  
  restart = createSprite(175, 370, 400, 400);
   restart.addImage(restartImage);
   
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
 
   
}



function draw() {
  background("blue")
  
 if(gameState === PLAY)
   {
     game_Over.scale = 0;
      restart.scale = 0;
   backlground.velocityX = (-3-2*score/200);
  

     restart.visible =false;
     game_Over.visible = false;
  
     
     score = score + Math.round(frameCount/200); 
     
  if(backlground.x < 0)
{
  backlground.x = backlground.width/2;
} 
  
  if(keyDown("space")&& trex.y >=450)
    {
     jumpSound.play();
     trex.velocityY = -12;
     
    }
  trex.velocityY = trex.velocityY+0.4;
     
    trex.collide(invisibleGround);


    obstacleGroup.collide(invisibleGround)





  
  var select_obstacles = Math.round(random(1,6))
  if(frameCount%200 === 0)
    {
      if(select_obstacles === 1)
        {
          bananas();
        }else  if(select_obstacles === 2)
        {
          bees();
        }else  if(select_obstacles === 3)
        {
          fires();
        }else  if(select_obstacles === 4)
        {
          flowers();
        }else  if(select_obstacles === 5)
        {
          ghosts();
        }
    }
  
  if(obstacleGroup.isTouching(trex))
    {
      gameState = END;
      gameSound.stop();
      gameOver.play();
    
    
     
    }
  
  
  
   }
  
  if(gameState === END)
    {
      
       trex.collide(invisibleGround);
      
      backlground.velocityX = 0;
      
      cloudGroup.destroyEach();
     cloudGroup.setVelocityXEach(0);
      obstacleGroup.destroyEach();
     obstacleGroup.setVelocityXEach(0);
      
       
       game_Over.scale = 0.8;
       game_Over.visible = true;
      
        restart.scale = 0.3;
     restart.visible = true;
     
  
    }
  
  if(mousePressedOver(restart))
       {
         reset();
       }
  
  clouds();
  
  
  
  drawSprites();
  
  fill("green")
  stroke(255)
  rect(windowWidth-1355, windowHeight-650, 400, 30);

  textFont("Arial");
  textSize (20);
  fill("white");
  text("Your Score = " + score,windowWidth-1345, windowHeight-630)
 
  

  fill("green")
  stroke(255)
  rect(windowWidth-800, windowHeight-650, 220, 25);


  textSize (20);
  fill("white")
  text("T-Rex Runner by Daksh",windowWidth-795, windowHeight-645, 400);
  
 
}

function reset()
{
  score = 0;
  gameState = PLAY;
  cloudGroup.destroyEach();
  obstacleGroup.destroyEach();
    trex.collide(invisibleGround);
  
}

function clouds()
{
  if(frameCount%150 === 0)
    {
  cloud = createSprite(1350, Math.round(random(80,95)), 20, 20);
 cloud.addImage(cloudImage);
  cloud.scale = 0.1;
      cloud.lifetime =500;
  cloud.velocityX = -3-1*score/100;
      cloudGroup.add(cloud);
    }
}


function bananas()
{
  banana = createSprite(1350,height-95,20,30)
  banana.addImage(bananaImage);
  banana.scale = 0.2;
  banana.velocityX = -3;
  banana.lifetime =500;
  banana.setCollider("circle", 0 , 0 , 100)
  banana.debug = false;
   obstacleGroup.add(banana);
}
  
function bees()
{
  bee = createSprite(1350,height-95,20,30)
  bee.addImage(beeImage);
  bee.scale = 0.1;
  bee.velocityX = -3;
  bee.lifetime =500;
  bee.setCollider("circle", 0 , 0 , 100)
  bee.debug = false;
   obstacleGroup.add(bee);
}  

function fires()
{
   fire = createSprite(1350,height-95,20,30)
  fire.addImage(fireImage);
  fire.scale = 0.2;
  fire.velocityX = -3;
  fire.debug = false;
  fire.setCollider("circle", 0 , 0 , 100)
  fire.lifetime =500;
   obstacleGroup.add(fire);
} 

function flowers()
{
  flower = createSprite(1350,height-95,20,30)
  flower.addImage(flowerImage);
  flower.scale = 0.1;
  flower.velocityX = -3;
  flower.lifetime =500;
  flower.debug = false;
  flower.setCollider("circle", 0 , 0 , 100)
   obstacleGroup.add(flower);
} 
 

function ghosts()
{
  ghost = createSprite(1350,height-95,20,30)
  ghost.addImage(ghostImage);
  ghost.scale = 0.1;
  ghost.velocityX = -3;
  ghost.lifetime =500;
  ghost.setCollider("circle", 0 , 0 , 100)
  ghost.debug = false
  
  ;
  obstacleGroup.add(ghost);
}