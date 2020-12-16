var bowls;
var polySynth;

function setup() {
  var width = windowWidth;
  var height = windowHeight - 5;
  createCanvas(width, height);
  bowls = new Group();
  spawnBowls(10);
  polySynth = new p5.PolySynth();

}

function draw() {
  background(50, 180, 220);
  checkCollisions();
  drawSprites();
  drawBowls();
}

function spawnBowls(bowlCount) {
  for (var i = 0; i < bowlCount; i++) {
    var px = Math.random() * width;
    var py = Math.random() * height;
    b = createSprite(px, py, 20, 20);
    var size = random(50) + 25;
    b.setCollider("circle", 0, 0, size);
    b.setSpeed(.7, random(360));
    b.size = size;
    bowls.add(b);
    //change second part for octave
    b.note = random(["C", "E", "G", "B"]) + ((size-25)/25 + 1).toString();
  }
  noStroke();
}

function drawBowls() {
  fill(255, 255, 255);
  for (var i = 0; i < bowls.length; i++) {
    var s = bowls[i];
    ellipse(s.position.x, s.position.y, s.size * 2, s.size * 2)
  }
}

function checkCollisions() {
  bowls.bounce(bowls, playNotes);

  for (var i = 0; i < bowls.length; i++) {
    var s = bowls[i];
    if (s.position.x < (0 + s.size)) {
      s.position.x = 1 + s.size;
      s.velocity.x = abs(s.velocity.x);
    }

    if (s.position.x > (width - s.size)) {
      s.position.x = width - s.size - 1;
      s.velocity.x = -abs(s.velocity.x);
    }

    if (s.position.y < (0 + s.size)) {
      s.position.y = 1 + s.size;
      s.velocity.y = abs(s.velocity.y);
    }

    if (s.position.y > (height - s.size)) {
      s.position.y = height - s.size - 1;
      s.velocity.y = -abs(s.velocity.y);
    }
  }
}

function playNotes(bowl1, bowl2) {
  playSound(bowl1.note);
  playSound(bowl2.note);
}

function touchStarted() {
  getAudioContext().resume();
}

function playSound(note) {

  // note velocity (volume, from 0 to 1)
  let velocity = .5
  // time from now (in seconds)
  let time = 0;
  // note duration (in seconds)
  let dur = 1 / 6;

  polySynth.play(note, velocity, time, dur);
}


// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }