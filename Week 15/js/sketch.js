var mainColor =  600;

function setup() {
    createCanvas(640, 480);
    background(120);
    frameRate(25);
    noStroke();
    rectMode(CENTER);
}
function draw() {
    fill(random(125),random(mainColor),random(mainColor), random(150));

    var size= random(150);
    var size2= random(150);
    ellipse(random(width), random(height), size, size2);

    if (frameCount % 2 == 0) {
        mainColor = 255 - mainColor;
    }

    if (frameCount > 50) {
        noLoop();
    }
    //saveFrames("myMovie",".png",1,25);
}