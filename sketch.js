var road , roadImg;
var amb , ambImg;
var B1 , B2 ; //B1=boundary1 B2=boundary2
//Obstacles
var car1 , car1Img;
var car2 , car2Img;
var truck , truckImg;
//Score
var score;
//Game States
var gameState = 1;
var PLAY=1;
var END=0;
//Rewards
var medicine,medicineImg;
var injection,injecImg;
var medikit,mediImg

function preload(){
  //Lading Images
    roadImg = loadImage("road.jpg");
    ambImg = loadImage("ambulance-removebg.png");
    car1Img = loadImage("car_1.png");
    car2Img = loadImage("car_2.png");
    truckImg = loadImage("truck..png");
    medicineImg = loadImage("medicine.png");
    injecImg = loadImage("injection.png");
    mediImg = loadImage("medi kit.png");
    
}

function setup() {
 createCanvas(800,600);
 //Creating Road sprite ,adding image and setting velocity
 road = createSprite(400,300);
 road.addImage("road",roadImg);
road.velocityY=5;
 road.scale=1.6;

 //Creating Ambulance and adding image
 amb = createSprite(120,515,30,10);
 amb.addImage("amb",ambImg);
 amb.scale=0.32;

 //Creating boundaries
 B1 = createSprite(750,400,20,500);
 B1.visible=false;
 B1.debug=false;

 B2 = createSprite(50,400,20,500);
 B2.visible=false;
 B2.debug=false;

 //Score variables and Groups
 score=0
 car1G = new Group();
 car2G = new Group();
 truckG = new Group(); 
 medicineG = new Group();
 injectionG = new Group();
 medikitG = new Group();

//set collider for ambulance
amb.setCollider("rectangle",0,0,170,375);
amb.debug=true; 
}

function draw() {

if(gameState===PLAY){

  //Code to reset the background
  if(road.y > 450){
    road.y = height/2
  }
  //Move ambulance with right arrow and left arrow
    if(keyWentDown("right_arrow")){
      amb.x = amb.x + 140;
    }
    if(keyWentDown("left_arrow")){
     amb.x = amb.x - 140 ;
    }
   /* if(amb.isTouching(B1)){
      console.log("amb is touching B1");
      amb.x = amb.x-20;
    
    }
    if(amb.isTouching(B2)){
      console.log("amb is touching B2");
      amb.x = amb.x+20;
    
    }*/
    
  //Call Obstacles and reward functions
    spawntruck() ;
    spawncar2();
    spawncar1() ;
    spawnmedicine();
    spawninjection();
    spawnmedikit();
    
    //Increase score if ambulance collects medical supplies
    if(medicineG.isTouching(amb)){
      medicineG.destroyEach();
      score = score +10;
    }else if (injectionG.isTouching(amb)){
      injectionG.destroyEach();
      score = score +50;
    }else if (medikitG.isTouching(amb)){
      medikitG.destroyEach();
      score = score +150
    }
    
  //Go to end state if ambulance is touching obstacles
   if(amb.isTouching(car1G)||amb.isTouching(car2G)||amb.isTouching(truckG))
   {  gameState = "END";   } 
      
}
   drawSprites();
 //Display Score
   textSize(25)
   text("Score:"+score,635,50);

 if(gameState === "END"){
  //stop the road
    road.velocityY=0;
  //Destroy obstacles and rewards 
    car1G.setVelocityYEach(0);
    car2G.setVelocityYEach(0);
    truckG.setVelocityYEach(0);
    medicineG.setVelocityYEach(0);
    injectionG.setVelocityYEach(0);
    medikitG.setVelocityYEach(0);
 
    car1G.setLifetimeEach(-1);
    car2G.setLifetimeEach(-1);
    truckG.setLifetimeEach(-1);
    medicineG.setLifetimeEach(-1);
    injectionG.setLifetimeEach(-1);
    medikitG.setLifetimeEach(-1);




    
    //Display Game over and restart
    textSize(50)
    fill("red")
    text("GAME OVER!!",200,300)
    textSize(40)
    fill("red")
    text("Press UP ARROW to restart",200,350)
    
    //Reset if up arrow key is pressed
      if(keyDown("UP_ARROW")){
        reset();
      }
}}
//Creating Obstacles 
function spawncar1() {
   if(World.frameCount % 240 === 0){
var car1=createSprite(Math.round(random(120,680)),40,30,10);
car1.addImage(car1Img);
car1.scale = 0.32;
car1.velocityY = 3;
car1G.add(car1);
car1.lifetime = 200;
}}
function spawncar2() {
  if(World.frameCount % 440 === 0){
var car2=createSprite(Math.round(random(120,680)),40,30,10);
car2.addImage(car2Img);
car2.scale = 0.32;
car2.velocityY = 3;
car2G.add(car2);
car2.lifetime = 200;
}}
 function spawntruck() {
  if(World.frameCount % 390 === 0){
    var truck=createSprite(Math.round(random(120,680)),40,30,10);
    truck.addImage(truckImg);
    truck.scale = 0.32;
    truck.velocityY = 3;
    truck.lifetime = 200;
    truckG.add(truck);
}}
 //Reset 
 function reset(){
gameState = PLAY;
score = 0
road.velocityY = 5;

car1G.destroyEach();
car2G.destroyEach();
truckG.destroyEach();
medicineG.destroyEach();
injectionG.destroyEach();
medikitG.destroyEach();

}
//Creating rewards
 function spawnmedicine(){
if(World.frameCount % 500 === 0){
var medicine = createSprite(Math.round(random(120,680)),40,30,10);
medicine.addImage(medicineImg);
medicine.scale = 0.29;
medicine.velocityY = 3;
medicine.lifetime = 200;
medicineG.add(medicine);
}}
function spawninjection(){
  if(World.frameCount % 560 === 0){
  var injection = createSprite(Math.round(random(120,680)),40,30,10);
  injection.addImage(injecImg);
  injection.scale = 0.29;
  injection.velocityY = 3;
  injection.lifetime = 200;
  injectionG.add(injection);
}}
  function spawnmedikit(){
    if(World.frameCount % 650 === 0){
    var medikit = createSprite(Math.round(random(120,680)),40,30,10);
    medikit.addImage(mediImg);
    medikit.scale = 0.29;
    medikit.velocityY = 3;
    medikit.lifetime = 200;
    medikitG.add(medikit);
}}