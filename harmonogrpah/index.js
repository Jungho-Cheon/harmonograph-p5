const scaleFromCenter = (x, y, scale) => {
    return {
      x: x * scale,
      y: y * scale,
    }
  }
  

/*
* params
*/
let DESC1 = 0;
let DESC2 = 0;
let DESC3 = 0;
let ROTATE_DEG = 0;

const DESC_MODE = false
const ANIMATION_MODE = true
const LIMIT_FRAME = 3600
const ZOOM_RATE = 1.6
let lines = []

function createLines() {
  for(let t = 0; t <= LIMIT_FRAME; t += 1) {

    const pOri1 = [[cos(PI/180 * t * 90) * (100 - DESC1), sin(PI/180 * t * 90) * (100  - DESC1)]]
    const pOri2 = [[cos(PI/180 * t) * (100 - DESC2), sin(PI/180 * t) * (100  - DESC2)]]
    const pOri3 = [[cos(PI/180 * t) *  (100 - DESC3), sin(PI/180 * t) * (100 - DESC3)]]
     
    const [pendulem1] = sumMat(mulMat(pOri1, rotateMat(PI/180 * 90)), [[0, -height/3]])
    const [pendulem2] = sumMat(mulMat(pOri2, rotateMat(PI/180 * 45)), [[-width/3, height/3]])
    const [pendulem3] = sumMat(mulMat(pOri3, rotateMat(-PI/180 * 45)), [[width/3, height/3]])
    
    const mid = sumMat(sumMat([pendulem1], [pendulem2]), [pendulem3])
    
    // stroke(255,0,0)
    // strokeWeight(2)
    // point(pendulem1[0], pendulem1[1])
    // point(pendulem2[0], pendulem2[1])
    // point(pendulem3[0], pendulem3[1])
    
    const [rotateResult] = mulMat(mid, rotateMat(PI/180 * ROTATE_DEG))
    const {x, y} = scaleFromCenter(rotateResult[0] * 2/5, rotateResult[1] * 2/5, ZOOM_RATE)
  
    lines.push({x, y: y})
  
    if(DESC_MODE) {
      DESC1 += 200 / LIMIT_FRAME
      DESC2 += 100 / LIMIT_FRAME
      DESC3 += 100 / LIMIT_FRAME
    }

    ROTATE_DEG += 0.1
  }
}

function setup() {
  createCanvas(1000, 1000);
  // createCanvas(1000, 1000, SVG);
  pixelDensity(3)
  noLoop()
  background(0);
}


function draw() {
  background(214, 213, 168);
  translate(width/2, height/2)
  strokeWeight(1);

  
  createLines(sin(frameCount / PI / 30), cos(frameCount / PI / 90))
  
  noFill()
  stroke(27, 36, 48)
  strokeWeight(1)
  beginShape()
  lines.forEach((line) => {
    vertex(line.x, line.y)    
  })
  endShape()

}
