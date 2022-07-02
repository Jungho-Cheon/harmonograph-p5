const scaleFromCenter = (x, y, scale) => {
    return {
      x: x * scale,
      y: y * scale,
    }
  }
  

/*
* params
*/
let t = 0;
let DESC1 = 0;
let DESC2 = 0;
let DESC3 = 0;
let RESULT_ROTATE = 0;

const LIMIT_FRAME = 1800
let lines = []

function createLines(p1, p2) {
  for(let f = 0; f <= LIMIT_FRAME; f += 1) {

    const pOri1 = [[cos(PI/180 * t / 2) * (100 - DESC1 + p1 * 300), sin(PI/180 * t * p1 / 100000) * (100  - DESC1 + p1 * 100)]]
    const pOri2 = [[cos(PI/180 * t / 2) * (50 - DESC2), sin(PI/180 * t) * (100  - DESC2)]]
    // const pOri2 = [[0, 0]]
    // const pOri3 = [[0, 0]]
    const pOri3 = [[cos(PI/180 * t / 2) *  (0 - DESC3 + p2 * 200), sin(PI/180 * t /2) * (0 - DESC3 + p2 * 200)]]
     
    const [pendulem1] = sumMat(mulMat(pOri1, rotateMat(PI/180 * 90)), [[0, -height/3]])
    const [pendulem2] = sumMat(mulMat(pOri2, rotateMat(PI/180 * 45)), [[-width/3, height/3]])
    const [pendulem3] = sumMat(mulMat(pOri3, rotateMat(-PI/180 * 45)), [[width/3, height/3]])
    
    const mid = sumMat(sumMat([pendulem1], [pendulem2]), [pendulem3])
    
    // stroke(0,255,0)
    // point(pendulem1[0], pendulem1[1])
    // point(pendulem2[0], pendulem2[1])
    // point(pendulem3[0], pendulem3[1])
    
    const [rotateResult] = mulMat(mid, rotateMat(PI/180 * RESULT_ROTATE))
    const {x, y} = scaleFromCenter(rotateResult[0] * 2/5, rotateResult[1] * 2/5, 1)
  
    lines.push({x, y: y})
  
    DESC1 += 0
    // DESC1 += 200 / LIMIT_FRAME
    // DESC2 += 100 / LIMIT_FRAME
    DESC2 += 0
    DESC3 += 0
    // DESC3 += 100 / LIMIT_FRAME
    RESULT_ROTATE += 0.2
    t += 4;
  }
}

function setup() {
  createCanvas(1000, 1000);
  // createCanvas(800, 800, SVG);
  pixelDensity(3)
  // noLoop()
  background(0);
}


function draw() {
  background(214, 213, 168);
  translate(width/2, height/2)
  strokeWeight(1);

  // noFill()

  // rotate(frameCount % 360)

  createLines(sin(frameCount / PI / 30), cos(frameCount / PI / 90))

  stroke(27, 36, 48)
  fill(7, 36, 48)
  beginShape()
  lines.forEach((line) => {
    vertex(line.x, line.y)    
  })
  endShape()

  lines = []
}
