const rotateMat = theta => [
  [cos(theta), -sin(theta)],
  [sin(theta), cos(theta)],
];

const sumMat = (a, b) => {
  return Array.from({ length: a.length }, (_, i) =>
    Array.from({ length: a[0].length }, (_, j) => a[i][j] + b[i][j])
  );
};

const mulMat = (a, b) => {
  const ret = Array.from({ length: a.length }, () =>
    Array.from({ length: b[0].length }, () => 0)
  );

  for (let i = 0; i < ret.length; i++) {
    for (let j = 0; j < ret[0].length; j++) {
      for (let k = 0; k < a[0].length; k++) {
        ret[i][j] += a[i][k] * b[k][j];
      }
    }
  }

  return ret;
};
const sin2D = (origin, theta) => {
  const sinMat = [[1], [sin(theta) * 100]];

  return mulMat(origin, sinMat);
};

/**
 * 3D vector, matrix utils
 */

const vecToMatrix = vector => {
  const matrix = Array.from({ length: 3 }, () => []);
  matrix[0][0] = vector.x;
  matrix[1][0] = vector.y;
  matrix[2][0] = vector.z;

  return matrix;
};

const matrixToVec = matrix => {
  const vector = createVector();
  vector.x = matrix[0][0];
  vector.y = matrix[1][0];
  if (matrix.length > 2) {
    vector.z = matrix[2][0];
  }

  return vector;
};

const rotateXMat = (angle, point) => {
  const rotateMat = [
    [1, 0, 0],
    [0, cos(angle), -sin(angle)],
    [0, sin(angle), cos(angle)],
  ];

  return mulMat(rotateMat, point)
};
const rotateYMat = (angle, point) => {
  const rotateMat = [
    [cos(angle), 0, sin(angle)],
    [0, 1, 0],
    [-sin(angle), 0, cos(angle)],
  ];

  return mulMat(rotateMat, point)
};
const rotateZMat = (angle, point) => {
  const rotateMat = [
    [cos(angle), -sin(angle), 0],
    [sin(angle), cos(angle), 0],
    [0, 0, 1],
  ];

  return mulMat(rotateMat, point)
};
