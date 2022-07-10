const _createCheckBox = ({ name, initial }) => {
  const checkBox = createCheckbox(name, initial).parent('#panel');
  checkBox.changed(
    debounce(() => {
      redraw();
    }, 100)
  );

  return checkBox;
};
const _createSlider = ({ name, min, max, initial, step = 1 }) => {
  const panel = document.getElementById('panel');
  const inputContainer = document.createElement('div');

  inputContainer.className = 'input-container';

  createP(name).parent(inputContainer);
  const slider = createSlider(min, max, initial, step).parent(inputContainer);
  const valueP = createP(initial).parent(inputContainer);

  panel.appendChild(inputContainer);

  slider.changed(
    debounce(() => {
      valueP.html(slider.value());
      background(BACKGROUND_COLOR);
      redraw();
    }, 100)
  );
  slider.valueP = valueP

  return slider;
};
const _createRadio = ({ name, initial, options }) => {
  const panel = document.getElementById('panel');
  const radioContainer = document.createElement('div');
  radioContainer.className = 'radio-container';

  createP(name).parent(radioContainer);
  const radio = createRadio(name).parent(radioContainer);

  options.forEach(option => {
    radio.option(option, option);
  });

  radio.selected(String(initial));
  radio.style('display', 'inline-block');
  radio.input(
    debounce(() => {
      redraw();
    })
  );
  panel.appendChild(radioContainer);

  return radio;
};

const params = {
  DESC_MODE: undefined,
  ANIMATION_MODE: undefined,
  SHOW_PENDULEM: undefined,
  LIMIT_FRAME: undefined,
  ROTATE_ADD: undefined,
  ZOOM_RATE: undefined,
  AMP_1_1: undefined,
  THETA_AMP_1_1: undefined,
  THETA_AMP_DIV_1_1: undefined,
  THETA_PHASE_1_1: undefined,
  AMP_1_2: undefined,
  THETA_AMP_1_2: undefined,
  THETA_AMP_DIV_1_2: undefined,
  THETA_PHASE_1_2: undefined,
  AMP_2_1: undefined,
  THETA_AMP_2_1: undefined,
  THETA_AMP_DIV_2_1: undefined,
  THETA_PHASE_2_1: undefined,
  AMP_2_2: undefined,
  THETA_AMP_2_2: undefined,
  THETA_AMP_DIV_2_2: undefined,
  THETA_PHASE_2_2: undefined,
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
      params[name].checked(value)
    } else if (params[name].value && params[name].valueP) {
      params[name].value(value);
      params[name].valueP.html(value);
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
  (params.LIMIT_FRAME = _createRadio({
    name: 'LIMIT_FRAME',
    initial: 3600,
    options: [3600, 7200, 36000],
  })),
    (params.ROTATE_ADD = _createRadio({
      name: 'ROTATE_ADD',
      initial: 0.1,
      options: [0.01, 0.05, 0.1],
    })),
    (params.ZOOM_RATE = _createSlider({
      name: 'ZOOM_RATE',
      min: 0.5,
      max: 2,
      initial: 1,
      step: 0.1,
    }));

  params.AMP_1_1 = _createSlider({
    name: 'AMP_1_1',
    min: 0,
    max: 400,
    initial: 100,
  });
  params.THETA_AMP_1_1 = _createSlider({
    name: 'THETA_AMP_1_1',
    min: 0,
    max: 90,
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
    max: 90,
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
    min: 1,
    max: 90,
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
    max: 90,
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
    min: 1,
    max: 90,
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
    max: 90,
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
    min: 1,
    max: 90,
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
    max: 90,
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
    min: 1,
    max: 90,
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
    max: 90,
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
    min: 1,
    max: 90,
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
    max: 90,
    initial: 0,
  });
};
