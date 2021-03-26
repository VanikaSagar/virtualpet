var dog,sadDog,happyDog;
var feed,addFood
var foodObj
var database
var fedTime,lastFed

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database()
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  Food=new food()

  feed=createButton("Feed the dog ")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add food ")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)



}

function draw() {
  background(46,139,87);

  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed=data.val()
  })

  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12 + "PM",350,30)

  }else if(lastFed==0){
    text("Last Feed : 12AM",350,30)
  }else{
    text("Last Feed : " + lastFed +"AM",350,30)
  }
  drawSprites();
  Food.display()
}

function feedDog(){
  dog.addImage(happyDog)
  if(Food.getFoodStock()<=0){
    Food.updateFoodStock(Food.getFoodStock()*0)
  }else{
    Food.updateFoodStock(Food.getFoodStock()-1)
    database.ref('/').update({
      food:Food.getFoodStock(),
      FeedTime:hour()
    })
  }
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  }

  )
}



//function to read food Stock


//function to update food stock and last fed time


//function to add food in stock
