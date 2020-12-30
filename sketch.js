
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var score=0;
var restart, restartImage;
var survivalTime=0;
var invisibleGround;
var PLAY=0;
var END=1;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  restartImage = loadImage("restart.png")
 
}



function setup() {
  monkey=createSprite(80, 365, 45, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  monkey.setCollider("circle",0,0,220);
  
  ground=createSprite(400, 400, 900, 10);
  ground.velcityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  restart=createSprite(200, 270, 10, 10);
  restart.addImage(restartImage);
  restart.scale=0.4;
  
  invisibleGround=createSprite(400,400,900,10);
  
  obstaclesGroup=new Group();
  FoodGroup=new Group();
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score:"+score, 500, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime, 10, 50);
}


function draw() {
  background("white");
  
  
  
  if(gameState==PLAY){
  stroke("black");
  textSize(20);
  fill("black");
  text("Score:"+score, 200, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime, 10, 50);
    
  restart.visible=false;  
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+1;
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    gameState=END;
  }
  
  if(keyDown("space")&&monkey.y>=350){
    monkey.velocityY=-20;
  }
  
 
  
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(invisibleGround);
  
  SpawnObstacles();
  SpawnBananas();
  
  }
  
  else if(gameState===END){
    restart.visible=true;
    monkey.velocityY=0;
    monkey.velocityX=0;
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    stroke("black");
    textSize(20);
    fill("black");
    text("GAME OVER", 135, 200);
    
    
    
    if(mousePressedOver(restart)){
      reset();
      restart.visible=false;
    }
  }
  drawSprites();
}
function SpawnObstacles(){
  
  if (frameCount % 150 === 0){
   var obstacle = createSprite(400,360,10,10);
   obstacle.velocityX = -(4+score/100);
   obstacle.addImage(obstacleImage); 
   obstaclesGroup.add(obstacle);
   
    
    
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.22;
    obstacle.lifetime=150;
   
   //add each obstacle to the group
    
  }
}

function SpawnBananas(){
  
  if (frameCount % 150 === 0){
   var banana = createSprite(400,120,10,40);
   banana.velocityX = -(4+score/100);
   banana.addImage(bananaImage); 
   FoodGroup.add(banana);
   
    
    
   
    //assign scale and lifetime to the obstacle           
    banana.scale = 0.1;
    banana.lifetime=150;
   
   //add each obstacle to the group
    
  }
}

function reset(){
  gameState=PLAY;
  
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  score=0;  
}









