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

const RECORDING_FRAME_LIMIT = 60 * 10
const LIMIT_FRAME = 3600

const ZOOM_RATE = 1.6

const LOTATE_ADD = 0.1

/**
 * slider
 */
let DESC_MODE
let ANIMATION_MODE
let SHOW_PENDULEM

let AMP_1_1
let AMP_1_2
let THETA_AMP_1_1
let THETA_AMP_1_2
let THETA_PHASE_1_1
let THETA_PHASE_1_2

let AMP_2_1 
let AMP_2_2 
let THETA_AMP_2_1 
let THETA_AMP_2_2 
let THETA_PHASE_2_1 
let THETA_PHASE_2_2 


let AMP_3_1 
let AMP_3_2 
let THETA_AMP_3_1 
let THETA_AMP_3_2 
let THETA_PHASE_3_1 
let THETA_PHASE_3_2 

/**
 * colors
 */
const BACKGROUND_COLOR = '#020202'
const STROKE_COLOR = '#FD070B'
let lines = []

/**
 * util
 */
const getAllParams = () => {
  return {
    DESC_MODE: DESC_MODE.checked(),
    ANIMATION_MODE: ANIMATION_MODE.checked(),
    SHOW_PENDULEM: SHOW_PENDULEM.checked(),
    AMP_1_1: AMP_1_1.value(),
    THETA_AMP_1_1: THETA_AMP_1_1.value(),
    THETA_PHASE_1_1: THETA_PHASE_1_1.value(),
    AMP_1_2: AMP_1_2.value(),
    THETA_AMP_1_2: THETA_AMP_1_2.value(),
    THETA_PHASE_1_2: THETA_PHASE_1_2.value(),
    AMP_2_1: AMP_2_1.value(),
    THETA_AMP_2_1: THETA_AMP_2_1.value(),
    THETA_PHASE_2_1: THETA_PHASE_2_1.value(),
    AMP_2_2: AMP_2_2.value(),
    THETA_AMP_2_2: THETA_AMP_2_2.value(),
    THETA_PHASE_2_2: THETA_PHASE_2_2.value(),
    AMP_3_1: AMP_3_1.value(),
    THETA_AMP_3_1: THETA_AMP_3_1.value(),
    THETA_PHASE_3_1: THETA_PHASE_3_1.value(),
    AMP_3_2: AMP_3_2.value(),
    THETA_AMP_3_2: THETA_AMP_3_2.value(),
    THETA_PHASE_3_2: THETA_PHASE_3_2.value(),
  }
}
const setAllParams = (params) => {
  DESC_MODE.checked(params.DESC_MODE);
  ANIMATION_MODE.checked(params.ANIMATION_MODE);
  SHOW_PENDULEM.checked(params.SHOW_PENDULEM);
  AMP_1_1.value(params.AMP_1_1);
  THETA_AMP_1_1.value(params.THETA_AMP_1_1);
  THETA_PHASE_1_1.value(params.THETA_PHASE_1_1);
  AMP_1_2.value(params.AMP_1_2);
  THETA_AMP_1_2.value(params.THETA_AMP_1_2);
  THETA_PHASE_1_2.value(params.THETA_PHASE_1_2);
  AMP_2_1.value(params.AMP_2_1);
  THETA_AMP_2_1.value(params.THETA_AMP_2_1);
  THETA_PHASE_2_1.value(params.THETA_PHASE_2_1);
  AMP_2_2.value(params.AMP_2_2);
  THETA_AMP_2_2.value(params.THETA_AMP_2_2);
  THETA_PHASE_2_2.value(params.THETA_PHASE_2_2);
  AMP_3_1.value(params.AMP_3_1);
  THETA_AMP_3_1.value(params.THETA_AMP_3_1);
  THETA_PHASE_3_1.value(params.THETA_PHASE_3_1);
  AMP_3_2.value(params.AMP_3_2);
  THETA_AMP_3_2.value(params.THETA_AMP_3_2);
  THETA_PHASE_3_2.value(params.THETA_PHASE_3_2);

  redraw();
}

const _createCheckBox = ({name, initial}) => {
  const checkBox = createCheckbox(name, initial).parent('#panel')
  checkBox.changed(debounce(() => {
    console.log('changed')
    redraw();
  }, 100))

  return checkBox
}
const _createSlider = ({name, min, max, initial, step = 1}) => {
  const panel = document.getElementById('panel')
  const inputContainer = document.createElement('div')

  inputContainer.className = 'input-container';

  const nameP = createP(name).parent(inputContainer)
  const slider = createSlider(min, max, initial).parent(inputContainer)
  const valueP = createP(initial).parent(inputContainer)

  panel.appendChild(inputContainer)

  slider.input(debounce(() => {
    valueP.html(slider.value());
    background(BACKGROUND_COLOR);
    redraw();
  }, 100))

  return slider
}

function createLines(mod1, mod2) {
  for(let t = 0; t <= LIMIT_FRAME; t += 1) {

    const pOri1 = [[
        cos(PI/180 * t * THETA_AMP_1_1.value() + THETA_PHASE_1_1.value()) * (AMP_1_1.value() - DESC1), 
        sin(PI/180 * t * THETA_AMP_1_2.value() + THETA_PHASE_1_2.value()) * (AMP_1_2.value() - DESC1)
      ]]
    const pOri2 = [[
      cos(PI/180 * t * THETA_AMP_2_1.value() + THETA_PHASE_2_1.value()) * (AMP_2_1.value() - DESC2),
      sin(PI/180 * t * THETA_AMP_2_1.value() + THETA_PHASE_2_2.value()) * (AMP_2_2.value() - DESC2)
    ]]
    const pOri3 = [[
      cos(PI/180 * t * THETA_AMP_3_1.value() + THETA_PHASE_3_1.value()) * (AMP_3_1.value() - DESC2),
      sin(PI/180 * t * THETA_AMP_3_1.value() + THETA_PHASE_3_2.value()) * (AMP_3_2.value() - DESC2)
    ]]
     
    const [pendulem1] = sumMat(mulMat(pOri1, rotateMat(PI/180 * 90)), [[0, -height/3]])
    const [pendulem2] = sumMat(mulMat(pOri2, rotateMat(PI/180 * 45)), [[-width/3, height/3]])
    const [pendulem3] = sumMat(mulMat(pOri3, rotateMat(-PI/180 * 45)), [[width/3, height/3]])
    
    const mid = sumMat(sumMat([pendulem1], [pendulem2]), [pendulem3])
    
    if (SHOW_PENDULEM.checked()) {
      push()
      stroke(0,0,255)
      strokeWeight(2)
      point(pendulem1[0], pendulem1[1])
      point(pendulem2[0], pendulem2[1])
      point(pendulem3[0], pendulem3[1])
      pop()
    }
    
    const [rotateResult] = mulMat(mid, rotateMat(PI/180 * ROTATE_DEG))
    const {x, y} = scaleFromCenter(rotateResult[0] * 2/5, rotateResult[1] * 2/5, ZOOM_RATE)
  
    lines.push({x, y: y})
  
    if(DESC_MODE.checked()) {
      DESC1 += 200 / LIMIT_FRAME
      DESC2 += 100 / LIMIT_FRAME
      DESC3 += 100 / LIMIT_FRAME
    }

    ROTATE_DEG += LOTATE_ADD
  }
  ROTATE_DEG = 0
}

function setup() {
  const canvas = createCanvas(800, 1024);
  canvas.parent('root')
  frameRate(120)
  // createCanvas(1000, 1000, SVG);
  noLoop();

  background(BACKGROUND_COLOR);

  // slider setting
  DESC_MODE = _createCheckBox({name: 'DESC_MODE', initial: false})
  ANIMATION_MODE = _createCheckBox({name: 'ANIMATION_MODE', initial: false})
  SHOW_PENDULEM = _createCheckBox({name: 'SHOW_PENDULEM', initial: true})
  AMP_1_1 = _createSlider({name:'AMP_1_1', min:0, max:400, initial: 100})
  THETA_AMP_1_1 = _createSlider({name:'THETA_AMP_1_1', min: 0, max: 90, initial: 1})
  THETA_PHASE_1_1 = _createSlider({name:'THETA_PHASE_1_1', min: 0, max: 90, initial: 0})
  AMP_1_2 = _createSlider({name:'AMP_1_2', min:0, max:400, initial: 100})
  THETA_AMP_1_2 = _createSlider({name:'THETA_AMP_1_2', min: 1, max: 90, initial: 1})
  THETA_PHASE_1_2 = _createSlider({name:'THETA_PHASE_1_2', min: 0, max: 90, initial: 0})
  AMP_2_1 = _createSlider({name:'AMP_3_1', min:0, max:400, initial: 100})
  THETA_AMP_2_1 = _createSlider({name:'THETA_AMP_3_1', min: 1, max: 90, initial: 1})
  THETA_PHASE_2_1 = _createSlider({name:'THETA_PHASE_3_1', min: 0, max: 90, initial: 0})
  AMP_2_2 = _createSlider({name:'AMP_3_2', min:0, max:400, initial: 100})
  THETA_AMP_2_2 = _createSlider({name:'THETA_AMP_3_2', min: 1, max: 90, initial: 1})
  THETA_PHASE_2_2 = _createSlider({name:'THETA_PHASE_3_2', min: 0, max: 90, initial: 0})
  AMP_3_1 = _createSlider({name:'AMP_3_1', min:0, max:400, initial: 100})
  THETA_AMP_3_1 = _createSlider({name:'THETA_AMP_3_1', min: 1, max: 90, initial: 1})
  THETA_PHASE_3_1 = _createSlider({name:'THETA_PHASE_3_1', min: 0, max: 90, initial: 0})
  AMP_3_2 = _createSlider({name:'AMP_3_2', min:0, max:400, initial: 100})
  THETA_AMP_3_2 = _createSlider({name:'THETA_AMP_3_2', min: 1, max: 90, initial: 1})
  THETA_PHASE_3_2 = _createSlider({name:'THETA_PHASE_3_2', min: 0, max: 90, initial: 0})
  
  

  const saveBtn = createButton('save image').parent('#panel')
  saveBtn.mousePressed(() => {
    console.log('save')
  })
  const exportJsonBtn = createButton('export JSON').parent('#panel')
  exportJsonBtn.mousePressed(() => {
    console.log('export JSON')
    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(getAllParams(), null, '\t'))
    console.log(data)
    const a = document.createElement('a');
    a.href = data;
    a.download = 'save.json';
    document.body.appendChild(a)
    a.click();
    a.remove()
  })
  const loadJsonBtn = createInput('load JSON').parent('#panel').attribute('type', 'file')
  loadJsonBtn.changed((e) => {
    const file = e.target.files[0]
    if (!file) return;

    const fr = new FileReader();
    fr.onload = e => {
      const params = JSON.parse(e.target.result);
      console.log('params', params)
      setAllParams(params)
    }
    fr.readAsText(file)
    console.log('changed JSON', e.target.files)
  })
}


function draw() {
  if (ANIMATION_MODE.checked() && frameCount === 1) {
    capturer.start();
  }

  background(BACKGROUND_COLOR);
  translate(width/2, height/2)
  strokeWeight(1);

  
  createLines(sin(PI / 180 * frameCount / 20), cos(PI / 180 * frameCount / 10))
  
  noFill()
  stroke(STROKE_COLOR)
  strokeWeight(1)
  beginShape()
  lines.forEach((line) => {
    vertex(line.x, line.y)    
  })
  endShape()

  if (ANIMATION_MODE.checked()) {
    if (frameCount < RECORDING_FRAME_LIMIT) {
      capturer.capture(canvas)
    } else if (frameCount === RECORDING_FRAME_LIMIT) {
      capturer.save();
      capturer.stop();
    }
  } else {
    DESC1 = 0;
    DESC2 = 0;
    DESC3 = 0;
    ROTATE_DEG = 0;
  }
  lines = []
}
