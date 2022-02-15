var model = [];
var move = 50;

var width = 5;
var length = 5;
var depth = 5;

let myFont;
let battleship;
function preload() {
  myFont = loadFont('fonts/Oswald-Light.ttf');
  battleship = loadModel('assets/battleship.stl');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

   /* for(var i = 0; i <= 5; i++)
    {
        model[i] = box(width, length, depth); 
        translate(40, 15);
        rotate(PI/3);
        
    }*/
   
  }
  
  function draw() {
    background(148, 233, 255);
    orbitControl();
    //textFont(myFont);
    //textSize(64);
    //text("Interactive Box", -840, -300);

    for(var i = 0; i <= 20; i++)
    {

        model[i] = model(battleship);
        translate(p5.Vector.fromAngle(millis() / 1000, 50));
        rotate(PI/10);
        
    }

  }

  function windowResized() 
  {
    resizeCanvas(windowWidth, windowHeight, WEBGL);
  }