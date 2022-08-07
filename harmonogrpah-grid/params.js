const params = {
  DESC_MODE: undefined,
  ANIMATION_MODE: undefined,
  SHOW_PENDULEM: undefined,
  LIMIT_FRAME: undefined,
  ROTATE_ADD: undefined,
  ROWS: undefined,
  COLS: undefined,
  ZOOM_RATE: undefined,
  BACKGROUND_COLOR: undefined,
  STROKE_COLOR: undefined,
  STROKE_ROTATE: undefined,
  ROTATE_1: undefined,
  AMP_1_1: undefined,
  THETA_AMP_1_1: undefined,
  THETA_AMP_DIV_1_1: undefined,
  THETA_PHASE_1_1: undefined,
  AMP_1_2: undefined,
  THETA_AMP_1_2: undefined,
  THETA_AMP_DIV_1_2: undefined,
  THETA_PHASE_1_2: undefined,
  ROTATE_2: undefined,
  AMP_2_1: undefined,
  THETA_AMP_2_1: undefined,
  THETA_AMP_DIV_2_1: undefined,
  THETA_PHASE_2_1: undefined,
  AMP_2_2: undefined,
  THETA_AMP_2_2: undefined,
  THETA_AMP_DIV_2_2: undefined,
  THETA_PHASE_2_2: undefined,
  ROTATE_3: undefined,
  AMP_3_1: undefined,
  THETA_AMP_3_1: undefined,
  THETA_AMP_DIV_3_1: undefined,
  THETA_PHASE_3_1: undefined,
  AMP_3_2: undefined,
  THETA_AMP_3_2: undefined,
  THETA_AMP_DIV_3_2: undefined,
  THETA_PHASE_3_2: undefined,
};

const getAllParams = () => {
  return Object.entries(params).reduce((prev, cur) => {
    const [name, param] = cur;

    return {
      ...prev,
      [name]: param.checked ? param.checked() : param.value(),
    };
  }, {});
};
const setAllParams = (loadedParams) => {
  Object.entries(loadedParams).forEach(([name, value]) => {
    if (params[name].checked) {
      params[name].checked(value);
    } else if (params[name].selected) {
      params[name].selected(value);
    } else if (params[name].value && params[name].valueInput) {
      params[name].value(value);
      params[name].valueInput.value(value);
    } else {
      params[name].value(value);
    }
  });
  redraw();
};

const initParams = () => {
  params.DESC_MODE = _createCheckBox({ name: 'DESC_MODE', initial: false });
  params.ANIMATION_MODE = _createCheckBox({
    name: 'ANIMATION_MODE',
    initial: false,
  });
  params.SHOW_PENDULEM = _createCheckBox({
    name: 'SHOW_PENDULEM',
    initial: true,
  });
  params.LIMIT_FRAME = _createRadio({
    name: 'LIMIT_FRAME',
    initial: '3600',
    options: ['3600', '18000', '36000'],
  });
  params.ROTATE_ADD = _createRadio({
    name: 'ROTATE_ADD',
    initial: '0.1',
    options: ['0.01', '0.05', '0.1'],
  });
  params.ROWS = _createSlider({
    name: 'ROWS',
    min: 1,
    max: 8,
    initial: 6,
    step: 1,
  });
  params.COLS = _createSlider({
    name: 'COLS',
    min: 1,
    max: 6,
    initial: 4,
    step: 1,
  });
  params.ZOOM_RATE = _createSlider({
    name: 'ZOOM_RATE',
    min: 0.01,
    max: 2,
    initial: 0.2,
    step: 0.01,
  });
  params.BACKGROUND_COLOR = _createColorPicker({
    name: 'BACKGROUND',
    initial: '#aaaaaa',
  });
  params.STROKE_COLOR = _createColorPicker({
    name: 'STROKE_COLOR',
    initial: '#000000',
  });
  params.STROKE_ROTATE = _createSlider({
    name: 'STROKE_ROTATE',
    min: 0,
    max: 360,
    initial: 0,
    selectable: true,
  });

  params.ROTATE_1 = _createSlider({
    name: 'ROTATE_1',
    min: 0,
    max: 360,
    initial: 0,
    selectable: true,
  });
  params.AMP_1_1 = _createSlider({
    name: 'AMP_1_1',
    min: 0,
    max: 400,
    initial: 100,
    selectable: true,
  });
  params.THETA_AMP_1_1 = _createSlider({
    name: 'THETA_AMP_1_1',
    min: 0,
    max: 360 * 4,
    initial: 1,
    selectable: true,
  });
  params.THETA_AMP_DIV_1_1 = _createSlider({
    name: 'THETA_AMP_DIV_1_1',
    min: 1,
    max: 10,
    initial: 1,
    selectable: true,
  });
  params.THETA_PHASE_1_1 = _createSlider({
    name: 'THETA_PHASE_1_1',
    min: 0,
    max: 360,
    initial: 0,
    selectable: true,
  });
  params.AMP_1_2 = _createSlider({
    name: 'AMP_1_2',
    min: 0,
    max: 400,
    initial: 100,
    selectable: true,
  });
  params.THETA_AMP_1_2 = _createSlider({
    name: 'THETA_AMP_1_2',
    min: 0,
    max: 360 * 4,
    initial: 1,
    selectable: true,
  });
  params.THETA_AMP_DIV_1_2 = _createSlider({
    name: 'THETA_AMP_DIV_1_2',
    min: 1,
    max: 10,
    initial: 1,
    selectable: true,
  });
  params.THETA_PHASE_1_2 = _createSlider({
    name: 'THETA_PHASE_1_2',
    min: 0,
    max: 360,
    initial: 0,
    selectable: true,
  });

  params.ROTATE_2 = _createSlider({
    name: 'ROTATE_2',
    min: 0,
    max: 360,
    initial: 0,
    selectable: true,
  });
  params.AMP_2_1 = _createSlider({
    name: 'AMP_2_1',
    min: 0,
    max: 400,
    initial: 100,
    selectable: true,
  });
  params.THETA_AMP_2_1 = _createSlider({
    name: 'THETA_AMP_2_1',
    min: 0,
    max: 360 * 4,
    initial: 1,
    selectable: true,
  });
  params.THETA_AMP_DIV_2_1 = _createSlider({
    name: 'THETA_AMP_DIV_2_1',
    min: 1,
    max: 10,
    initial: 1,
    selectable: true,
  });
  params.THETA_PHASE_2_1 = _createSlider({
    name: 'THETA_PHASE_2_1',
    min: 0,
    max: 360,
    initial: 0,
    selectable: true,
  });
  params.AMP_2_2 = _createSlider({
    name: 'AMP_2_2',
    min: 0,
    max: 400,
    initial: 100,
    selectable: true,
  });
  params.THETA_AMP_2_2 = _createSlider({
    name: 'THETA_AMP_2_2',
    min: 0,
    max: 360 * 4,
    initial: 1,
    selectable: true,
  });
  params.THETA_AMP_DIV_2_2 = _createSlider({
    name: 'THETA_AMP_DIV_2_2',
    min: 1,
    max: 10,
    initial: 1,
    selectable: true,
  });
  params.THETA_PHASE_2_2 = _createSlider({
    name: 'THETA_PHASE_2_2',
    min: 0,
    max: 360,
    initial: 0,
    selectable: true,
  });

  params.ROTATE_3 = _createSlider({
    name: 'ROTATE_3',
    min: 0,
    max: 360,
    initial: 0,
    selectable: true,
  });
  params.AMP_3_1 = _createSlider({
    name: 'AMP_3_1',
    min: 0,
    max: 400,
    initial: 100,
    selectable: true,
  });
  params.THETA_AMP_3_1 = _createSlider({
    name: 'THETA_AMP_3_1',
    min: 0,
    max: 360 * 4,
    initial: 1,
    selectable: true,
  });
  params.THETA_AMP_DIV_3_1 = _createSlider({
    name: 'THETA_AMP_DIV_3_1',
    min: 1,
    max: 10,
    initial: 1,
    selectable: true,
  });
  params.THETA_PHASE_3_1 = _createSlider({
    name: 'THETA_PHASE_3_1',
    min: 0,
    max: 360,
    initial: 0,
    selectable: true,
  });
  params.AMP_3_2 = _createSlider({
    name: 'AMP_3_2',
    min: 0,
    max: 400,
    initial: 100,
    selectable: true,
  });
  params.THETA_AMP_3_2 = _createSlider({
    name: 'THETA_AMP_3_2',
    min: 0,
    max: 360 * 4,
    initial: 1,
    selectable: true,
  });
  params.THETA_AMP_DIV_3_2 = _createSlider({
    name: 'THETA_AMP_DIV_3_2',
    min: 1,
    max: 10,
    initial: 1,
    selectable: true,
  });
  params.THETA_PHASE_3_2 = _createSlider({
    name: 'THETA_PHASE_3_2',
    min: 0,
    max: 360,
    initial: 0,
    selectable: true,
  });
};

const initButtons = () => {
  const saveBtn = createButton('save image').parent('#panel');
  saveBtn.mousePressed(() => {
    console.log('save');
    save();
  });
  const exportJsonBtn = createButton('export JSON').parent('#panel');
  exportJsonBtn.mousePressed(() => {
    console.log('export JSON');
    const data =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(getAllParams(), null, '\t'));
    console.log(data);
    const a = document.createElement('a');
    a.href = data;
    a.download = `${new Date().toLocaleDateString()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
  const loadJsonBtn = createInput('load JSON')
    .parent('#panel')
    .attribute('type', 'file');
  loadJsonBtn.changed((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fr = new FileReader();
    fr.onload = (e) => {
      const params = JSON.parse(e.target.result);
      console.log('params', params);
      setAllParams(params);
    };
    fr.readAsText(file);
    console.log('changed JSON', e.target.files);
  });
};
