//Create variables here.
var dog , happyDog ;
var  database ;
var food , foodStock ;

function preload()
{
  //load images here.
  doggy=loadImage("dogimg.png");

  happyDoggy=loadImage("dogimg1.png");
}

function setup() {
  createCanvas(500,500);

  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock);
  
  dog=createSprite(250,300,150,150);
  dog.addImage(doggy);
  dog.scale=0.15;

  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(happyDoggy);
    
  }

  drawSprites();
  //add styles here
  fill("white");
  textSize(13);
  text("Food Remaining : "+food,170,200);
  text("NOTE:press UP_ARROW for feeding your pet",130,10,300,20);

  
}

function readStock(data){
   food=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref("/").update({
  food:x 
  })
}

