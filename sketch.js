var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var survivalTime = 0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);

  //creating monkey ,moving the monkey and scaling the monkey 
  monkey = createSprite(80,300,20,30);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  //making the ground 
  ground = createSprite(400,340,1000,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.scale = 2;
  
  //creating the obstacle group and bananaGroup 
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  score = 0;
}


function draw() {
background(225);
  
  if(gameState === PLAY){
    //moving the ground 
    if(ground.x <0){
     ground.x = ground.width/2;
  }
    //making the monkey jump 
    if(keyDown("space")&& monkey.y >=100){
     monkey.velocityY = -12
  }
    monkey.velocityY = monkey.velocityY + 0.8;

    //colliding the monkey with ground 
    monkey.collide(ground);
    
    //destoying the banana 
   if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
     score = score+1;
   }
    
    //making the score 
    stroke("white");
    textSize(20);
    fill("white");
    text("score: "+ score,450,50);
    
    //making the survival time 
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate())
    text("Survival Time: "+ survivalTime,100,50);
  }
  
  if(gameState === END){
    
  }
  
  spawnObstacle();
  spawnBanana();
  
 drawSprites(); 
}

function spawnObstacle(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(400,291,10,10);
    obstacle.velocityX = -3;
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 150;
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,120,40,10)
    banana.velocityX = -3;
    banana.y = Math.round(random(120,200))
    banana.addImage(bananaImage);
    banana.lifetime = 200;
    banana.scale = 0.1;
    bananaGroup.add(banana);
  }
}


