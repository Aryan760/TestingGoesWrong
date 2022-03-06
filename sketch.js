var bg;
var zombie,zombieImg;
var creeper,creeperImg
var skeleton,skeletonImg
var player,playerImg
var mobsGroup
var arrow,arrowImg,arrowGroup
var shoot = 0
var bgImg
var food,foodImg
var heart,heart2,heart3,heartImg
var necron,necronImg
var score = 0 
var hearts
var life

function preload(){
bgImg = loadImage("bg.png")
zombieImg = loadImage("zombiee.png")
creeperImg = loadImage("creeper.jpg")
skeletonImg = loadImage("skele.png")
playerImg = loadImage("player.png")
arrowImg = loadImage("arrow.png")
heartImg = loadImage("heart.png")
foodImg = loadImage("food.png")
necronImg = loadImage("necron.png")
}


function setup()
{
  createCanvas(600,600);

  bg = createSprite(300,300,600,600)
  bg.addImage(bgImg)
  bg.velocityY = 5
  bg.scale = 3
  player = createSprite(300,500,100,100)
  player.addImage(playerImg)
  player.scale = 2;
  heart = createSprite(20,20,5,5)
  heart.addImage(heartImg)
  heart2 = createSprite(55,20,5,5)
  heart2.addImage(heartImg)
  heart2.scale = 0.2
  heart3 = createSprite(90,20,5,5)
  heart3.addImage(heartImg)
  heart3.scale = 0.2
  heart.scale = 0.2
  food = createSprite(20,60,5,5)
  food.addImage(foodImg)
  food.scale = 0.3
  necron = createSprite(300,100,100,100)
  necron.addImage(necronImg)
  necron.scale = 1
  necron.visible = false

  hearts = [heart,heart2,heart3]

  mobsGroup = new Group()
  arrowGroup = new Group()
  

}

function draw() 
{
  background(0);

  if(bg.y>700){
    bg.y = 300
  }

  if(keyDown("D")&&player.x<560){
    player.x = player.x +10
  }

  if(keyDown("A")&&player.x>40){
    player.x = player.x -10
  }
  
  if(keyDown("SPACE")){
    player.velocityX = 0
  }
  shoot = shoot-1
  if(keyWentDown("space")&&frameCount%3===0) {
    arrow = createSprite(player.x,player.y - 130);
    arrow.addImage(arrowImg);
    arrow.velocityY = -8; 
    arrow.scale = 0.7;
    arrowGroup.add(arrow);
  
    shoot = arrow.y
  } 

  if(arrowGroup.isTouching(mobsGroup)){
    score = score +100
    mobsGroup.destroyEach();
  }

  if(score===300){
    necron.visible = true
  }

  if(mobsGroup.isTouching(player)){
  hearts.pop();
  console.log(life)
  }


  mobs();
  drawSprites();

  textSize(25);
  fill("white")
  text("Score"+score,475,30)

}

function mobs() {
  if(frameCount % 110 === 0) {
  
    var mobs = createSprite(Math.round(random(35,375)),-20);
    mobs.velocityY = 6;
    mobs.lifetime = 200;
    mobs.scale = random(0.6,1);
    //mobs.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: mobs.addImage(zombieImg);
              mobs.setCollider("circle",-80,10,160);
              break;
      case 2: mobs.addImage(creeperImg);
              mobs.setCollider("circle",50,0,150);
              break;
      case 3: mobs.addImage(skeletonImg);
              mobs.setCollider("circle",0,0,170)
      default: break;
    }
    
    //console.log(astroid.x);
    mobsGroup.add(mobs);
  }
}