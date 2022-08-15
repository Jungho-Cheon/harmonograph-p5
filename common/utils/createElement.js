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
const _createSlider = ({
  name,
  min,
  max,
  initial,
  step = 0.1,
  selectable = false,
}) => {
  const panel = document.getElementById('panel');
  const inputContainer = document.createElement('div');

  inputContainer.className = 'input-container';

  createP(name).parent(inputContainer);
  const slider = createSlider(min, max, initial, step).parent(inputContainer);
  const valueInput = createInput(initial).parent(inputContainer);

  panel.appendChild(inputContainer);

  valueInput.input(
    debounce((e) => {
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

  if (selectable) {
    const checkBox = createCheckbox().parent(inputContainer);
    checkBox.addClass('selectable-checkbox');
    checkBox.changed(
      debounce(() => {
        redraw();
      }, DEBOUNCE_MILLI)
    );
    slider.checkBox = checkBox;
  }

  slider.getValue = ({ index, total }) => {
    if (slider.checkBox?.checked()) {
      if (index === undefined || total === undefined)
        throw new Error('index not found');
      return (
        (slider.value() *
          (Math.max(index, total - index) - Math.ceil(total / 2))) /
        Math.ceil(total / 2)
      );
    }
    return slider.value();
  };
  return slider;
};
const _createRadio = ({ name, initial, options }) => {
  const panel = document.getElementById('panel');
  const radioContainer = document.createElement('div');
  radioContainer.className = 'radio-container';

  createP(name).parent(radioContainer);
  const radio = createRadio(name).parent(radioContainer);

  options.forEach((option) => {
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
