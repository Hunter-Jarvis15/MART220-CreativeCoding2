var model = [];
var move = 20;

let myFont;
let battleship;
function preload() {
  myFont = loadFont('fonts/Oswald-Light.ttf');
  battleship = loadModel('assets/battleship.stl');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    for(var i = 0; i <= 10; i++)
    {
      model[i]; 
    }
   
  }
  
  function draw() {
    background(148, 233, 255);
    orbitControl();
    textFont(myFont);
    textSize(64);
    //text("Interactive Box", -840, -300);


    for(var i = 0; i <= model.length; i++)
    {
      //box(50);
      model(battleship);
      translate(move, 0);
      rotate(36);
    }

  }

  function windowResized() 
  {
    resizeCanvas(windowWidth, windowHeight, WEBGL);
  }

