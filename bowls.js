var bowls;

function setup() {
  var width = windowWidth;
  var height = windowHeight-5;
  createCanvas(width, height);
  bowls = new Group();
  spawnBowls(10);
}

function draw() {
  background(50, 180, 220);
  checkCollisions();
  drawSprites();
  drawBowls();
}

function spawnBowls(bowlCount) {
  for(var i = 0; i < bowlCount; i++) {
    var px = Math.random()*width;
    var py = Math.random()*height;
    b = createSprite(px, py, 20, 20);
    var size = random(50) + 25;
    b.setCollider("circle",0,0,size);
    b.setSpeed(.7, random(360));
    b.size = size;
    bowls.add(b);
  }
  noStroke();
}

function drawBowls() {
  fill(255,255,255);
  for(var i = 0; i < bowls.length; i++){
    var s = bowls[i];
    ellipse(s.position.x, s.position.y, s.size*2, s.size*2)
  }
}

function checkCollisions() {
  bowls.bounce(bowls);

  for(var i=0; i<bowls.length; i++) {
   var s = bowls[i];
   if(s.position.x<(0+s.size)) {
     s.position.x = 1+s.size;
     s.velocity.x = abs(s.velocity.x);
   }

   if(s.position.x>(width-s.size)) {
     s.position.x = width-s.size-1;
     s.velocity.x = -abs(s.velocity.x);
   }

   if(s.position.y<(0+s.size)) {
     s.position.y = 1+s.size;
     s.velocity.y = abs(s.velocity.y);
   }

   if(s.position.y>(height-s.size)) {
     s.position.y = height-s.size-1;
     s.velocity.y = -abs(s.velocity.y);
   }
 }
}
