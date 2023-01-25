  var PLAY = 1
  var END = 0
  var gameState = PLAY

  var track, trackimg;
  var car,car1, car2, car3, car4, car5, carimg,car5img, car1img,car2img,car3img,car5img;
  var scenery,scenery1,scenery1img,sceneryimg;
  var invisibleLine1,invisibleLine2;
  var checkpointsound,diesound;
  var resart,restartimg;
  var gameOver,gameOverimg
  var bgSound;
  var score

function preload(){
   car1img = loadImage("car-1.png");
   car2img = loadImage("car2.png");
   car3img = loadImage("car-3.png");
   car5img = loadImage("car 5.png");
   trackimg = loadImage("path.png");
   sceneryimg = loadImage("scene.png")
   scenery1img = loadImage("scener.png")
   checkpointsound = loadSound("checkPoint.mp3");
   diesound =loadSound("die.mp3");
   restartimg = loadImage("restart.png")
   gameOverimg = loadImage("gameOver.png");
   bgSound = loadSound("bg.mp3");
}

function setup() {
    createCanvas(1366,766);
    scenery1 = createSprite(1330,312);
    scenery1.addImage(scenery1img);
    scenery1.scale = 0.5

    track = createSprite(683,312.5);
    track.addImage(trackimg)
    track.scale = 1.5
  
    scenery = createSprite(120,312);
    scenery.addAnimation("Moving",sceneryimg)
    scenery.scale = 0.5
  

   
    car5 = createSprite(600,400);
    car5.addImage(car5img);
    car5.scale = 0.5
  
    invisibleLine1 = createSprite(483,503.5,10,track.height)
    invisibleLine2 = createSprite(890,503.5,10,track.height)
    invisibleLine3 = createSprite(690,150,400,6);
    invisibleLine4 = createSprite(690,600,400,6);
 
    restart = createSprite(683,350,30,30);
    restart.addImage(restartimg); 
    restart.scale=1.5
    
    gameOver  = createSprite(680,180,20,20);
    gameOver.addImage(gameOverimg)
    gameOver.scale = 0.7
    
    invisibleLine1.visible = false;
    invisibleLine2.visible = false;
    invisibleLine3.visible = false;
    invisibleLine4.visible = false;
    
    

    score = 0;
    car5.setCollider("rectangle",0,0,car5.width,car5.height-4);
    //car5.debug = true
    
    carGroup = createGroup ()
}


function draw() {
    background("black")
   
    textSize(50);
    fill("yellow");
    text("S",950,50)
    text("C",950,100)
    text("O",950,150)
    text("R",950,200)
    text("E",950,250)
    text(":"+score,910,350)
   
    car5.collide(invisibleLine1);
    car5.collide(invisibleLine2);
    car5.collide(invisibleLine3);
    car5.collide(invisibleLine4);
  

  if (gameState === PLAY){
    function resetTrack (){
      if (track.y >100) {
      track.y = 10
    
    }
    }
  //  bgSound.play();
    track.velocityY = +(4+6 * score/100)
      if (keyDown("left")){
      car5.x = car5.x-8
}
      
      if (keyDown("right")){
        car5.x = car5.x+8
}
  
 /*     if (keyDown("up")){
        car5.y = car5.y-5
}
  
      if (keyDown("down")){
        car5.y = car5.y +5
}
 */            
        score = score + Math.round(getFrameRate()/60)
        spawnCars();
      if(score>0 && score%100 === 0){
      checkpointsound.play ()
      car.velocityY = car.velocityY-1
}

           
        restart.visible = false
        gameOver.visible = false
            
       
        
        resetTrack ()
        scenery1.y = track.y
        scenery.y = track.y
        
    if (carGroup.isTouching(car5)) {
        diesound.play()
        gameState = END

}

}  else if (gameState === END) {

   restart.visible = true
   gameOver.visible = true

   carGroup.setLifetimeEach(-1)
   carGroup.setVelocityYEach(0)

   if (mousePressedOver(restart)){
   reset();
}

   collided ()

}   



 drawSprites();
}



function spawnCars (){
  if (frameCount % 60 === 0){
    car = createSprite(random(520,880),700,0.5,0.5)
    var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: car.addImage(car1img);
                break;
        case 2: car.addImage(car2img);
                break;
        case 3: car.addImage(car3img);
                break;
        default: break;
      }
    car.velocityY = -4
  
   
    car.lifetime = -285.7142857142857
    car.collide(invisibleLine1);
    car.collide(invisibleLine2);
    car.scale = 0.6
    carGroup.add(car)
    car.depth = gameOver.depth
    gameOver.depth = gameOver.depth+1
    car.depth = restart.depth
    restart.depth = restart.depth+1
 //   car.debug = true
  //  car.setCollider("rectangle",0,0,car5.width,car5.heigh-35);

} 

}

function collided (){
track.velocityY = 0
car.velocityY = 0
carGroup.setLifetimeEach(-1)
carGroup.setVelocityYEach(0)

}

function reset() {
gameState = PLAY
 carGroup.destroyEach();
 score=0
 
}


//console.log(car.velocityY);











