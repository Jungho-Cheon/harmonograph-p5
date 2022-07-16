const DEBOUNCE_MILLI = 600;

const _createCheckBox = ({ name, initial }) => {
  const checkBox = createCheckbox(name, initial).parent('#panel');
  checkBox.changed(
    debounce(() => {
      redraw();
    }, DEBOUNCE_MILLI)
  );

  return checkBox;
};
const _createSlider = ({ name, min, max, initial, step = 0.1 }) => {
  const panel = document.getElementById('panel');
  const inputContainer = document.createElement('div');

  inputContainer.className = 'input-container';

  createP(name).parent(inputContainer);
  const slider = createSlider(min, max, initial, step).parent(inputContainer);
  const valueInput = createInput(initial).parent(inputContainer);

  panel.appendChild(inputContainer);

  valueInput.input(
    debounce(e => {
      const { value } = e.target;
      if (Number.isNaN(value)) return;

      slider.value(Number(value));
      redraw();
    }, DEBOUNCE_MILLI)
  );

  slider.changed(
    debounce(() => {
      valueInput.value(slider.value());
      // background(BACKGROUND_COLOR);
      redraw();
    }, DEBOUNCE_MILLI)
  );
  slider.valueInput = valueInput;

  return slider;
};
const _createRadio = ({ name, initial, options }) => {
  const panel = document.getElementById('panel');
  const radioContainer = document.createElement('div');
  radioContainer.className = 'radio-container';

  createP(name).parent(radioContainer);
  const radio = createRadio(name).parent(radioContainer);

  options.forEach(option => {
    radio.option(option);
  });

  radio.selected(String(initial));
  radio.style('display', 'inline-block');
  radio.input(
    debounce(() => {
      redraw();
    }, DEBOUNCE_MILLI)
  );
  panel.appendChild(radioContainer);

  return radio;
};
const _createColorPicker = ({ name, initial = '#ffffff' }) => {
  const panel = document.getElementById('panel');
  const colorPickerContainer = document.createElement('div');
  colorPickerContainer.className = 'radio-container';

  createP(name).parent(colorPickerContainer);
  const colorPicker = createColorPicker(initial).parent(colorPickerContainer);
  colorPicker.input(
    debounce(() => {
      redraw();
    }, DEBOUNCE_MILLI)
  );

  panel.appendChild(colorPickerContainer);

  return colorPicker;
};

const params = {
  DESC_MODE: undefined,
  ANIMATION_MODE: undefined,
  SHOW_PENDULEM: undefined,
  LIMIT_FRAME: undefined,
  ROTATE_ADD: undefined,
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
const setAllParams = loadedParams => {
  Object.entries(loadedParams).forEach(([name, value]) => {
    if (params[name].checked) {
      params[name].checked(value);
    } else if (params[name].selected) {
      params[name].selected(value);
    } else if (params[name].value && params[name].valueInput) {
      params[name].value(value);
      params[name].valueInput.value(value);
    } else {
      params[name].value(value)
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
  params.ZOOM_RATE = _createSlider({
    name: 'ZOOM_RATE',
    min: 0.5,
    max: 2,
    initial: 1,
    step: 0.1,
  });
  params.BACKGROUND_COLOR = _createColorPicker({
    name: 'BACKGROUND',
    initial: '#000000',
  });
  params.STROKE_COLOR = _createColorPicker({
    name: 'STROKE_COLOR',
    initial: '#ffffff',
  });
  params.STROKE_ROTATE = _createSlider({
    name: 'STROKE_ROTATE',
    min: 0,
    max: 360,
    initial: 0,
  });

  params.ROTATE_1 = _createSlider({
    name: 'ROTATE_1',
    min: 0,
    max: 360,
    initial: 0,
  });
  params.AMP_1_1 = _createSlider({
    name: 'AMP_1_1',
    min: 0,
    max: 400,
    initial: 100,
  });
  params.THETA_AMP_1_1 = _createSlider({
    name: 'THETA_AMP_1_1',
    min: 0,
    max: 360 * 4,
    initial: 1,
  });
  params.THETA_AMP_DIV_1_1 = _createSlider({
    name: 'THETA_AMP_DIV_1_1',
    min: 1,
    max: 10,
    initial: 1,
  });
  params.THETA_PHASE_1_1 = _createSlider({
    name: 'THETA_PHASE_1_1',
    min: 0,
    max: 360,
    initial: 0,
  });
  params.AMP_1_2 = _createSlider({
    name: 'AMP_1_2',
    min: 0,
    max: 400,
    initial: 100,
  });
  params.THETA_AMP_1_2 = _createSlider({
    name: 'THETA_AMP_1_2',
    min: 0,
    max: 360 * 4,
    initial: 1,
  });
  params.THETA_AMP_DIV_1_2 = _createSlider({
    name: 'THETA_AMP_DIV_1_2',
    min: 1,
    max: 10,
    initial: 1,
  });
  params.THETA_PHASE_1_2 = _createSlider({
    name: 'THETA_PHASE_1_2',
    min: 0,
    max: 360,
    initial: 0,
  });

  params.ROTATE_2 = _createSlider({
    name: 'ROTATE_2',
    min: 0,
    max: 360,
    initial: 0,
  });
  params.AMP_2_1 = _createSlider({
    name: 'AMP_2_1',
    min: 0,
    max: 400,
    initial: 100,
  });
  params.THETA_AMP_2_1 = _createSlider({
    name: 'THETA_AMP_2_1',
    min: 0,
    max: 360 * 4,
    initial: 1,
  });
  params.THETA_AMP_DIV_2_1 = _createSlider({
    name: 'THETA_AMP_DIV_2_1',
    min: 1,
    max: 10,
    initial: 1,
  });
  params.THETA_PHASE_2_1 = _createSlider({
    name: 'THETA_PHASE_2_1',
    min: 0,
    max: 360,
    initial: 0,
  });
  params.AMP_2_2 = _createSlider({
    name: 'AMP_2_2',
    min: 0,
    max: 400,
    initial: 100,
  });
  params.THETA_AMP_2_2 = _createSlider({
    name: 'THETA_AMP_2_2',
    min: 0,
    max: 360 * 4,
    initial: 1,
  });
  params.THETA_AMP_DIV_2_2 = _createSlider({
    name: 'THETA_AMP_DIV_2_2',
    min: 1,
    max: 10,
    initial: 1,
  });
  params.THETA_PHASE_2_2 = _createSlider({
    name: 'THETA_PHASE_2_2',
    min: 0,
    max: 360,
    initial: 0,
  });

  params.ROTATE_3 = _createSlider({
    name: 'ROTATE_3',
    min: 0,
    max: 360,
    initial: 0,
  });
  params.AMP_3_1 = _createSlider({
    name: 'AMP_3_1',
    min: 0,
    max: 400,
    initial: 100,
  });
  params.THETA_AMP_3_1 = _createSlider({
    name: 'THETA_AMP_3_1',
    min: 0,
    max: 360 * 4,
    initial: 1,
  });
  params.THETA_AMP_DIV_3_1 = _createSlider({
    name: 'THETA_AMP_DIV_3_1',
    min: 1,
    max: 10,
    initial: 1,
  });
  params.THETA_PHASE_3_1 = _createSlider({
    name: 'THETA_PHASE_3_1',
    min: 0,
    max: 360,
    initial: 0,
  });
  params.AMP_3_2 = _createSlider({
    name: 'AMP_3_2',
    min: 0,
    max: 400,
    initial: 100,
  });
  params.THETA_AMP_3_2 = _createSlider({
    name: 'THETA_AMP_3_2',
    min: 0,
    max: 360 * 4,
    initial: 1,
  });
  params.THETA_AMP_DIV_3_2 = _createSlider({
    name: 'THETA_AMP_DIV_3_2',
    min: 1,
    max: 10,
    initial: 1,
  });
  params.THETA_PHASE_3_2 = _createSlider({
    name: 'THETA_PHASE_3_2',
    min: 0,
    max: 360,
    initial: 0,
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
  loadJsonBtn.changed(e => {
    const file = e.target.files[0];
    if (!file) return;

    const fr = new FileReader();
    fr.onload = e => {
      const params = JSON.parse(e.target.result);
      console.log('params', params);
      setAllParams(params);
    };
    fr.readAsText(file);
    console.log('changed JSON', e.target.files);
  });
};