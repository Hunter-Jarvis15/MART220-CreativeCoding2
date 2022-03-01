var dim = 3;
var cube;

let myFont;
let battleship;
function preload() {
  myFont = loadFont('fonts/Oswald-Light.ttf');
  battleship = loadModel('assets/battleship.stl');
}

function make3DArray(x, y, z) {
  let arr = new Array(x);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(y);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = new Array(z);
    }
  }
  return arr;
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  cube = make3DArray(dim, dim, dim);
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      for (let k = 0; k < dim; k++) {
        let len = 30;
        let offset = (dim - 1) * len * 0.5
        let x = len * i - offset;
        let y = len * j - offset;
        let z = len * k - offset;
        cube[i][j][k] = new cubo(x, y, z, len);
      }
    }
  }

}

function draw() {
  background(100);
  orbitControl();
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);

  //rotateX(frameCount * 0.1);
  //rotateY(frameCount * 0.1);
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      for (let k = 0; k < dim; k++) {
        let len = 10;
        let x = len * i
        let y = len * j
        let z = len * k
        cube[i][j][k].show();
      }
    }
  }


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}

