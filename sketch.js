var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastFed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed =createButton ("Feed Dog")
  feed.position (900,95)
  feed.mousePressed(feed)

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  database.ref("Feedtime").on("value",(data)=>{lastFed=data.val()})
 
  //write code to display text lastFed time here
  if(lastFed>= 12){
    fill("black")
    text("Last Feed : " + lastFed % 12 + "PM",350,30)
  }
 else if(lastFed == 0) {
  fill("black")
  text("Last Feed : 12 AM ",350,30)
 }
 else {
  fill("black")
   text("Last Feed :"+ lastFed + "AM",350,30)
 }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodVal = foodObj.getFoodStock();
  //write code here to update food stock and last fed time
  if(foodVal <= 0){
    foodObj.updateFoodStock(foodVal* 0);
  }
  else {
    foodObj.updateFoodStock(foodVal - 1);
  }
}
database.ref("/").update({
  FeedTime : hour(),
  Food : foodObj.getFoodStock()
})
//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
