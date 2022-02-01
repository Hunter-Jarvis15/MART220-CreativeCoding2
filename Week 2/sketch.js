




let myFont;
function preload() {
  myFont = loadFont('fonts/Oswald-Light.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    textFont(myFont);
    textSize(32);
    text("Interactive Box", 10, 30);
  }
  
  function draw() {
    background(148, 233, 255);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    box(200);


  }

