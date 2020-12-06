var ship;
var asteroids;
var bullets;

function setup() {
  var width = windowWidth;
  var height = windowHeight-5;
  createCanvas(width, height);
  setupShip();
  asteroids = new Group();
  bullets = new Group();
  setupAsteroids(8);
}

function draw() {
  background(15,15,15);
  getKeyInput();
  wrapAround();
  checkCollisions();
  drawSprites();
}


//--------------------------------------------------------------------------
//Setup Functions

function setupShip(){
  ship = createSprite(width/2, height/2, 25, 25);
  ship.setCollider("rectangle");
  ship.rotation = -90;
  ship.maxspeed = 5;
  ship.friction = 0.02;
}

function setupAsteroids(asteroidCount){
  for(var i = 0; i < asteroidCount; i++){
    var px = Math.random();
    var py = Math.random();
    createAsteroid(3, (px*width), (py*height));
  }
}

//---------------------------------------------------------------------------
//Gameplay Functions

function getKeyInput() {
  if (keyDown('a')) {
    ship._rotation = ship.rotation - 3;
  } else if (keyDown('d')) {
      ship._rotation = ship.rotation + 3;
  }
  if (keyDown('w')) {
   ship.addSpeed(.2, ship.rotation);
  }
  if (keyWentDown(' ')){
    shoot();
  }
}

function wrapAround(){
  for(var i=0; i < allSprites.length; i++) {
    var s = allSprites[i];
    if(s.position.x > width) s.position.x = 0;
    if(s.position.x < 0) s.position.x = width;
    if(s.position.y > height) s.position.y = 0;
    if(s.position.y < 0) s.position.y = height;
  }
}

function createAsteroid(size, x, y){
  a = createSprite(x, y, size*15, size*15);
  a.setCollider("circle");
  a.setSpeed(.7, random(360));
  a.size = size;
  console.log(a.size);
  asteroids.add(a);
}

function shoot(){
  if (bullets.length < 10) {
    b = createSprite(ship.position.x, ship.position.y, 6, 6);
    b.setCollider("rectangle");
    b.setSpeed(7, ship.rotation);
    bullets.add(b);
  }
}

function checkCollisions(){
  ship.bounce(asteroids);
  asteroids.bounce(asteroids);
  asteroids.overlap(bullets, asteroidHit);
}

function asteroidHit(asteroid, bullet){
  //console.log(asteroid.size);
  if(asteroid.size>1){
    createAsteroid(asteroid.size-1, asteroid.position.x, asteroid.position.y);
    createAsteroid(asteroid.size-1, asteroid.position.x, asteroid.position.y);
  }
  bullet.remove();
  asteroid.remove();
}
