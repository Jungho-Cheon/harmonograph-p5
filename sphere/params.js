const params = {
  DENSITY: undefined,
  THETA_MAX: undefined,
  PHI_MAX: undefined,
  ROTATE_X: undefined,
  ROTATE_Y: undefined,
  ROTATE_Z: undefined,
}

const initParams = () => {
  params.PHI_MAX = _createSlider({name: 'PHI_MAX', min: 0, max: 180, initial: 180, step: 10})
  params.THETA_MAX = _createSlider({name: 'THETA_MAX', min: 0, max: 360, initial: 360, step: 10})
  params.DENSITY = _createSlider({name: 'DENSITY', min: 3, max: 62, initial: 24, step: 1})
  params.ROTATE_X = _createSlider({name: 'ROTATE_X', min: 0, max: 360, initial: 0, step: 1})
  params.ROTATE_Y = _createSlider({name: 'ROTATE_Y', min: 0, max: 360, initial: 0, step: 1})
  params.ROTATE_Z = _createSlider({name: 'ROTATE_Z', min: 0, max: 360, initial: 0, step: 1})
}

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