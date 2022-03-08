let position;
let direction;
let keyToDir;

function preload() {
  myFont = loadFont('fonts/Oswald-Light.ttf');
  battleship = loadModel('assets/battleship.stl');
}

function setup() {
  createCanvas(windowWidth-20, windowHeight-60, WEBGL);
  position = createVector(0, 0, 0);
  direction = createVector(0, 0, 0);
  keyToDir = {
    'ArrowRight': createVector( 2.5, 0, 0),
    'ArrowLeft':  createVector(-2.5, 0, 0),
    'ArrowUp':  createVector(0, -2.5, 0),
    'ArrowDown':  createVector(0, 2.5, 0),
    'w':  createVector(0, 0, -2.5),
    's':  createVector(0, 0, 2.5)
  }
}

function draw() {
  position.add(direction);
  background('gray');
  orbitControl();
  push();
  translate(...position.array());
  scale(4);
  model(battleship);
  pop();
}

function keyPressed() {
  const requestedDir = keyToDir[key];
  if (requestedDir)
    direction = requestedDir;
}