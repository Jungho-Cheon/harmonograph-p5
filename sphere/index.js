const radius = 200;
const points = [];
let points2d = [];
let angle = 0;

const projection = [
  [1, 0, 0],
  [0, 1, 0],
];

function setup() {
  createCanvas(600, 600, SVG);
  // noLoop();
  noFill();
  stroke(0);
  strokeWeight(1);
  bumpySphere();
  
  initParams();
  initButtons();
}

function draw() {
  background(0,0,0,0)
  const {ROTATE_X, ROTATE_Y, ROTATE_Z} = params
  translate(width / 2, height / 2);

  for (let i = 0; i < points.length; i++) {
    points2d[i] = [];

    for (let j = 0; j < points[i].length; j++) {
      const p = points[i][j];

      const xRotated = rotateXMat(ROTATE_X.value(), vecToMatrix(p));
      const yRotated = rotateYMat(ROTATE_Y.value(), xRotated);
      const zRotated = rotateZMat(ROTATE_Z.value(), yRotated);
      const projected2d = mulMat(zRotated, projection);
      const vector2d = matrixToVec(projected2d);

      points2d[i].push(vector2d);
    }
  }

  for (let j = 0; j < points2d[0].length - 1; j++) {
    beginShape();
    for (let i = 0; i < points2d.length; i++) {
      vertex(points2d[i][j].x, points2d[i][j].y);
      vertex(points2d[i][j + 1].x, points2d[i][j + 1].y);
    }
    endShape();
  }

  points2d = [];
}

const PHI = 360;
const THETA = 360;

const bumpySphere = () => {
  const phiAdd = 5;
  const thetaAdd = 5;

  for (let theta = 0; theta <= THETA; theta += thetaAdd) {
    for (let phi = 0, idx = 0; phi <= PHI; phi += phiAdd, idx++) {
      const x = radius * (1 + 0.2 * sin((PI/180) * theta * 4) * sin((PI/180) * phi * 2)) * cos((PI / 180) * phi) * sin((PI / 180) * theta);
      const y = radius * (1 + 0.2 * sin((PI/180) * theta * 4) * sin((PI/180) * phi * 2)) * sin((PI / 180) * phi) * sin((PI / 180) * theta);
      const z = radius * (1 + 0.2 * sin((PI/180) * theta * 4) * sin((PI/180) * phi * 2)) * cos((PI / 180) * theta);

      if (!points[idx]) points[idx] = [createVector(x, y, z)];
      else points[idx].push(createVector(x, y, z));
    }
  }
};
