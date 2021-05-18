var dog,dog1,dog2,dogimg,dogHappy,foodStock,foods;
var database;
var food1;
var position
var feed,add;
var Feedtime;
var Lastfeed;


function preload(){
dogimg = loadImage("images/dogImg.png");
dogHappy = loadImage("images/dogImg1.png");
dogimg1 = loadImage("images/dogImg.png")
dogimg2 = loadImage("images/dogImg1.png")
bedroomImg = loadImage("images/Bed Room.png")
gardenImg = loadImage("images/Garden.png")
washroomImg = loadImage("images/Wash Room.png")

}

function setup() {
  createCanvas(800, 700);
  
  
  dog = createSprite(400,500,50,50);
  dog.addImage(dogimg);
  dog.scale = 0.3;

  database = firebase.database();
  console.log(database)

  foodobject=new Food()
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  var dog = database.ref('Food');
  dog.on("value", readPosition, showError);
  feed = createButton("FEED DRAGO MILK")
  feed.position(600,100)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,100)
  add.mousePressed(AddFood)


 
 
}


function draw() {
  background(46,139,87); 
  
  if (keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(dogHappy);
  }

  if (keyWentUp(UP_ARROW)){
    dog.addImage(dogimg);

     
     fill(255,255,254);
      
  }
  foodobject.display()
  drawSprites();

  textSize(30);
  text("food remaining: "+foods,300,250);
  text("press the up arrow key to feed the dog",250,150);

  fedtime=database.ref('FeedTime')
  fedtime.on("value",function(data){ Lastfeed=data.val(); });
  if(Lastfeed>=12)
  {
    text("Last Feed :" + Lastfeed%12 + "PM", 150,100);
  }else if(Lastfeed ===0 )
  {
    text("Last Feed : 12 AM" , 150,100)
  }else
  {
    text("Last Feed :" + Lastfeed + "AM", 150,100);
  }
 
 drawSprites();

}

function readStock(data){
  foods = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writeStock(x){
  if (x<=0){
    x = 0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:position
   
  });
}
  

function FeedDog(){

  dog.addImage(dogimg2)
  foodobject.updateFoodStock(foodobject.getFoodStock()-1)
   database.ref('/').update({
     Food:foodobject.getFoodStock(),
     FeedTime:hour ()
   })
  }
  


