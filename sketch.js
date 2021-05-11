const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine,world;

var particle;
var divisions = [];
var particles = [particle]
var plinkos = [];
var line;

var divisionHeight = 300;

var gameState = "PLAY";

var count= 0;
var score= 0;

function setup() {
  createCanvas(795,800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  for (var k = 0;k <=width; k = k +80){
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }


  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width; j=j+50){
    plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width; j=j+50){
    plinkos.push(new Plinko(j,375));
  }




}

function draw() {
  background(0);
  Engine.update(engine);
  fill("white");
  textSize(35);
  text("Score : "+score,20,40);
  fill(255);

  textSize(35);
  text("500",10, 550);
  text("500",90, 550);
  text("500",170, 550);
  text("500",250, 550);
  text("100",330, 550);
  text("100",410, 550);
  text("100",490, 550);
  text("200",570, 550);
  text("200",650, 550);
  text("200",730, 550);



  mousePressed();
  ground.display();
  if (gameState =="END"){
    background("black");
    fill("red");
    textSize(100);
    text("GAME OVER",200, 400);
  }

  for (var k = 0; k < plinkos.length; k++){
    plinkos[k].display();
  }

  if (particle=null){
    particle.display();

    if(particle.body.position.y>700){
      if (particle.body.position.x<300){
         score=score+500;
         particle=null;
         if (count>= 5) gameState = "END";
      }

      else if (particle.body.position.x< 600 && particle.body.position.x > 301 ){
        score=score+100;
        particle=null;
        if (count>= 5) gameState = "END";
      }
      else if (particle.body.position.x< 900 && particle.body.position.x > 601 ){
        score=score+200;
        particle=null;
        if (count>= 5) gameState = "END";
      }


    }
  }

  for (var i = 0; i < divisions.length; i++){
    divisions[i].display();
  }
  
}

function mousePressed() {
    if (gameState == "END"){
      count++;
    particle = new Particle(mouseX, 50, 10, 10);
    }
}