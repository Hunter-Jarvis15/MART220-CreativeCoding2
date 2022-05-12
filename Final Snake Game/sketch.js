const CELLS_PER_DIMENSION = 11;
const CELLS_RIGHT_OF_CENTER = (CELLS_PER_DIMENSION - 1) / 2;
const STARTING_NUM_SEGMENTS = 3;
const MS_PER_MOVE = 1000;
const SPEEDUP_FACTOR = 3;
let food;
let foodModel;
let snakeModel;
let direction;
let segments;
let keyMappings;
let arenaWidth;
let cellWidth;
let zeroVector;
let nextMoveTime;
let rightmostCellCenter;

function preload() {
  foodModel = loadModel('assets/Duck v5.stl');
  snakeModel = loadModel('assets/BRv2.stl');
}

function setup() {
  const len = min(windowWidth - 10, windowHeight - 70);
  createCanvas(len, len, WEBGL);
  zeroVector = createVector(0, 0, 0);
  arenaWidth = round(width * 0.6);
  cellWidth = round(arenaWidth / CELLS_PER_DIMENSION);
  rightmostCellCenter = cellWidth * CELLS_RIGHT_OF_CENTER;
  mapKeys();
  setUpState();
}

function draw() {
  if (millis() > nextMoveTime) {
    moveSnake();
    nextMoveTime += keyIsDown(SHIFT) ? MS_PER_MOVE / SPEEDUP_FACTOR : MS_PER_MOVE;
  }
  moveCameraTo();
  background(255);
  lights();
  smooth();
  drawArena();
  drawSnake();
  drawFood();
}

function mapKeys() {
  const v = createVector;
  const up      = v( 0, -1,  0);
  const down    = v( 0,  1,  0);
  const left    = v(-1,  0,  0);
  const right   = v( 1,  0,  0);
  const away    = v( 0,  0, -1);
  const towards = v( 0,  0,  1);
  keyMappings = {
    'w':          away,
    's':          towards,
    'ArrowLeft':  left,
    'ArrowRight': right,
    'ArrowUp':    up,
    'ArrowDown':  down,
  };
}

function setUpState() {
  direction = createVector(0, 0, 0);
  food = newFoodPosition();
  segments = Array.from({length: STARTING_NUM_SEGMENTS}, (v, i) => createVector(-i * cellWidth, 0, 0));
}

function moveCameraTo() {
  camera(-175, -175, (height/2) / tan(PI/6), 0, 0, 0, 0, 1, 0)
}

function keyPressed() {
  const requestedDir = keyMappings[key];
  if (requestedDir) {
    const oppositeOfCurrentDir = p5.Vector.mult(direction, -1);
    if (!requestedDir.equals(oppositeOfCurrentDir)) {
      direction = requestedDir;
      if (!nextMoveTime)
        nextMoveTime = millis();
    }
  }
}

function newFoodPosition() {
  const m = CELLS_RIGHT_OF_CENTER;
  const c = () => round(random(-m, m)) * cellWidth;
  return createVector(c(), c(), c());
}

function moveSnake() {
  if (!direction.equals(zeroVector)) {
    const newHeadPos = p5.Vector.add(segments[0], p5.Vector.mult(direction, cellWidth));
    if (newPositionWouldLeaveArena(newHeadPos)) {
      setUpState();
    } else {
      if (newHeadPos.equals(food))
        food = newFoodPosition();
      else
        segments.pop(); // Discard last
      segments.unshift(newHeadPos); // Put new head on front
    }
  }
}

function newPositionWouldLeaveArena(pos) {
  return !pos.array().every(coord => abs(coord) < arenaWidth / 2);
}

function drawArena() {
  stroke('gray');
  const cMax = rightmostCellCenter + cellWidth / 2;
  const cMin = -cMax;

  [
    '⊤↑I', // Right  horizontal
    '⊤I↑', //        vertical
    'I↑⊥', // Back   horizontal
    '↑I⊥', //        vertical
    'I⊤↑', // Bottom “horizontal”
    '↑⊤I'  //        “vertical”
  ].forEach(codeSet => {
    for (let v = cMin; v <= cMax; v += cellWidth) {
      const coords = [0, 0, 0, 0, 0, 0];

      codeSet.split('').forEach((code, i) => {
        switch (code) {
          case '⊤':
            coords[i    ] =
            coords[i + 3] = cMax;
            break;
          case '⊥':
            coords[i    ] =
            coords[i + 3] = cMin;
            break;
          case '↑':
            coords[i    ] =
            coords[i + 3] = v;
            break;
          case 'I':
            coords[i    ] = cMin;
            coords[i + 3] = cMax;
            break;
        }
      });
      line(...coords);
    }
  });
}

function drawSnake() {
  const segmentWidth = cellWidth * 0.9;
  segments.forEach(segment => {
    noStroke();
    fill(103, 181, 145);
    referenceSquare(...segment.array(), () => model(snakeModel));

    stroke(0, 255, 0);
    fill(0, 255, 0, 60);
    drawReferenceStructures(segments[0], segmentWidth);
  });
}

function drawFood() {
  noStroke();
  fill(255,0,0);
  const itemWidth = cellWidth * 0.8;
  referenceSquare(...food.array(), () => model(foodModel));

  stroke(255, 0, 0);
  fill(255, 0, 0, 60);
  drawReferenceStructures(food, itemWidth);
}

function drawReferenceStructures(pos, objWidth) {
  const l = arenaWidth / 2; // Largest coordinate value
  const s = -l; // Smallest
  const {x, y, z} = pos;
  line(x, y, z,  l, y, z);
  line(x, y, z,  x, l, z);
  line(x, y, z,  x, y, s);

  noStroke();
  const w = objWidth;
  const f = 0.1; // Length on flat dimension
  referenceSquare(l, y, z, () => box(f, w, w));
  referenceSquare(x, l, z, () => box(w, f, w));
  referenceSquare(x, y, s, () => box(w, w, f));
}

function referenceSquare(x, y, z, fn) {
  push();
  translate(x, y, z);
  fn();
  pop();
}