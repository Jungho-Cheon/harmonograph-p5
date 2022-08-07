const scaleFromCenter = (x, y, scale) => {
  return {
    x: x * scale,
    y: y * scale,
  };
};

const RECORDING_FRAME_LIMIT = 60 * 10;

const show_pendulem = () => {
  /*
   * params
   */
  let DESC_1_1 = 0;
  let DESC_1_2 = 0;
  let DESC_2_1 = 0;
  let DESC_2_2 = 0;
  let DESC_3_1 = 0;
  let DESC_3_2 = 0;

  const {
    LIMIT_FRAME,
    ROTATE_1,
    AMP_1_1,
    THETA_AMP_1_1,
    THETA_AMP_DIV_1_1,
    THETA_PHASE_1_1,
    AMP_1_2,
    THETA_AMP_1_2,
    THETA_AMP_DIV_1_2,
    THETA_PHASE_1_2,
    ROTATE_2,
    AMP_2_1,
    THETA_AMP_2_1,
    THETA_AMP_DIV_2_1,
    THETA_PHASE_2_1,
    AMP_2_2,
    THETA_AMP_2_2,
    THETA_AMP_DIV_2_2,
    THETA_PHASE_2_2,
    ROTATE_3,
    AMP_3_1,
    THETA_AMP_3_1,
    THETA_AMP_DIV_3_1,
    THETA_PHASE_3_1,
    AMP_3_2,
    THETA_AMP_3_2,
    THETA_AMP_DIV_3_2,
    THETA_PHASE_3_2,
  } = params;
  for (let t = 0; t <= Number(LIMIT_FRAME.value()); t += 1) {
    const pOri1 = [
      [
        cos(
          (PI / 180) *
            t *
            THETA_AMP_1_1.value() *
            (1 / THETA_AMP_DIV_1_1.value()) +
            (PI / 180) * THETA_PHASE_1_1.value()
        ) *
          (AMP_1_1.value() - DESC_1_1),
        sin(
          (PI / 180) *
            t *
            THETA_AMP_1_2.value() *
            (1 / THETA_AMP_DIV_1_2.value()) +
            (PI / 180) * THETA_PHASE_1_2.value()
        ) *
          (AMP_1_2.value() - DESC_1_2),
      ],
    ];
    const pOri2 = [
      [
        cos(
          (PI / 180) *
            t *
            THETA_AMP_2_1.value() *
            (1 / THETA_AMP_DIV_2_1.value()) +
            (PI / 180) * THETA_PHASE_2_1.value()
        ) *
          (AMP_2_1.value() - DESC_2_1),
        sin(
          (PI / 180) *
            t *
            THETA_AMP_2_2.value() *
            (1 / THETA_AMP_DIV_2_2.value()) +
            (PI / 180) * THETA_PHASE_2_2.value()
        ) *
          (AMP_2_2.value() - DESC_2_2),
      ],
    ];
    const pOri3 = [
      [
        cos(
          (PI / 180) *
            t *
            THETA_AMP_3_1.value() *
            (1 / THETA_AMP_DIV_3_1.value()) +
            (PI / 180) * THETA_PHASE_3_1.value()
        ) *
          (AMP_3_1.value() - DESC_3_1),
        sin(
          (PI / 180) *
            t *
            THETA_AMP_3_2.value() *
            (1 / THETA_AMP_DIV_3_2.value()) +
            (PI / 180) * THETA_PHASE_3_2.value()
        ) *
          (AMP_3_2.value() - DESC_3_2),
      ],
    ];

    const [pendulem1] = sumMat(
      mulMat(pOri1, rotateMat((PI / 180) * (90 + ROTATE_1.value()))),
      [[0, -height / 3]]
    );
    const [pendulem2] = sumMat(
      mulMat(pOri2, rotateMat((PI / 180) * (45 + ROTATE_2.value()))),
      [[-width / 3, height / 3]]
    );
    const [pendulem3] = sumMat(
      mulMat(pOri3, rotateMat((PI / 180) * (-45 + ROTATE_3.value()))),
      [[width / 3, height / 3]]
    );

    push();
    stroke(0, 0, 255);
    translate(width / 2, height / 2);
    strokeWeight(2);
    point(pendulem1[0], pendulem1[1]);
    point(pendulem2[0], pendulem2[1]);
    point(pendulem3[0], pendulem3[1]);
    pop();
  }
};

const createLines = ({ row, col }) => {
  const lines = [];
  /*
   * params
   */
  let DESC_1_1 = 0;
  let DESC_1_2 = 0;
  let DESC_2_1 = 0;
  let DESC_2_2 = 0;
  let DESC_3_1 = 0;
  let DESC_3_2 = 0;
  let ROTATE_DEG = 0;
  const {
    DESC_MODE,
    ROWS,
    COLS,
    LIMIT_FRAME,
    ROTATE_ADD,
    ZOOM_RATE,
    STROKE_ROTATE,
    ROTATE_1,
    AMP_1_1,
    THETA_AMP_1_1,
    THETA_AMP_DIV_1_1,
    THETA_PHASE_1_1,
    AMP_1_2,
    THETA_AMP_1_2,
    THETA_AMP_DIV_1_2,
    THETA_PHASE_1_2,
    ROTATE_2,
    AMP_2_1,
    THETA_AMP_2_1,
    THETA_AMP_DIV_2_1,
    THETA_PHASE_2_1,
    AMP_2_2,
    THETA_AMP_2_2,
    THETA_AMP_DIV_2_2,
    THETA_PHASE_2_2,
    ROTATE_3,
    AMP_3_1,
    THETA_AMP_3_1,
    THETA_AMP_DIV_3_1,
    THETA_PHASE_3_1,
    AMP_3_2,
    THETA_AMP_3_2,
    THETA_AMP_DIV_3_2,
    THETA_PHASE_3_2,
  } = params;

  const index = COLS.value() * row + col + 1;
  const total = ROWS.value() * COLS.value();

  for (let t = 0; t <= Number(LIMIT_FRAME.value()); t += 1) {
    const pOri1 = [
      [
        cos(
          (PI / 180) *
            t *
            THETA_AMP_1_1.getValue({
              index,
              total,
            }) *
            (1 /
              THETA_AMP_DIV_1_1.getValue({
                index,
                total,
              })) +
            (PI / 180) *
              THETA_PHASE_1_1.getValue({
                index,
                total,
              })
        ) *
          (AMP_1_1.getValue({
            index,
            total,
          }) -
            DESC_1_1),
        sin(
          (PI / 180) *
            t *
            THETA_AMP_1_2.getValue({
              index,
              total,
            }) *
            (1 /
              THETA_AMP_DIV_1_2.getValue({
                index,
                total,
              })) +
            (PI / 180) *
              THETA_PHASE_1_2.getValue({
                index,
                total,
              })
        ) *
          (AMP_1_2.getValue({
            index,
            total,
          }) -
            DESC_1_2),
      ],
    ];
    const pOri2 = [
      [
        cos(
          (PI / 180) *
            t *
            THETA_AMP_2_1.getValue({
              index,
              total,
            }) *
            (1 /
              THETA_AMP_DIV_2_1.getValue({
                index,
                total,
              })) +
            (PI / 180) *
              THETA_PHASE_2_1.getValue({
                index,
                total,
              })
        ) *
          (AMP_2_1.getValue({
            index,
            total,
          }) -
            DESC_2_1),
        sin(
          (PI / 180) *
            t *
            THETA_AMP_2_2.getValue({
              index,
              total,
            }) *
            (1 /
              THETA_AMP_DIV_2_2.getValue({
                index,
                total,
              })) +
            (PI / 180) *
              THETA_PHASE_2_2.getValue({
                index,
                total,
              })
        ) *
          (AMP_2_2.getValue({
            index,
            total,
          }) -
            DESC_2_2),
      ],
    ];
    const pOri3 = [
      [
        cos(
          (PI / 180) *
            t *
            THETA_AMP_3_1.getValue({
              index,
              total,
            }) *
            (1 /
              THETA_AMP_DIV_3_1.getValue({
                index,
                total,
              })) +
            (PI / 180) *
              THETA_PHASE_3_1.getValue({
                index,
                total,
              })
        ) *
          (AMP_3_1.getValue({
            index,
            total,
          }) -
            DESC_3_1),
        sin(
          (PI / 180) *
            t *
            THETA_AMP_3_2.getValue({
              index,
              total,
            }) *
            (1 /
              THETA_AMP_DIV_3_2.getValue({
                index,
                total,
              })) +
            (PI / 180) *
              THETA_PHASE_3_2.getValue({
                index,
                total,
              })
        ) *
          (AMP_3_2.getValue({
            index,
            total,
          }) -
            DESC_3_2),
      ],
    ];

    const [pendulem1] = sumMat(
      mulMat(
        pOri1,
        rotateMat(
          (PI / 180) *
            (90 +
              ROTATE_1.getValue({
                index,
                total,
              }))
        )
      ),
      [[0, -height / 3]]
    );
    const [pendulem2] = sumMat(
      mulMat(
        pOri2,
        rotateMat(
          (PI / 180) *
            (45 +
              ROTATE_2.getValue({
                index,
                total,
              }))
        )
      ),
      [[-width / 3, height / 3]]
    );
    const [pendulem3] = sumMat(
      mulMat(
        pOri3,
        rotateMat(
          (PI / 180) *
            (-45 +
              ROTATE_3.getValue({
                index,
                total,
              }))
        )
      ),
      [[width / 3, height / 3]]
    );

    const mid = sumMat(sumMat([pendulem1], [pendulem2]), [pendulem3]);
    const [rotateResult] = mulMat(
      mid,
      rotateMat(
        (PI / 180) *
          (ROTATE_DEG +
            STROKE_ROTATE.getValue({
              index,
              total,
            }))
      )
    );
    const { x, y } = scaleFromCenter(
      (rotateResult[0] * 2) / 5,
      (rotateResult[1] * 2) / 5,
      ZOOM_RATE.value()
    );

    lines.push({ x, y });

    if (DESC_MODE.checked()) {
      DESC_1_1 +=
        AMP_1_1.getValue({
          index,
          total,
        }) / LIMIT_FRAME.value();
      DESC_1_2 +=
        AMP_1_2.getValue({
          index,
          total,
        }) / LIMIT_FRAME.value();
      DESC_2_1 +=
        AMP_2_1.getValue({
          index,
          total,
        }) / LIMIT_FRAME.value();
      DESC_2_2 +=
        AMP_2_2.getValue({
          index,
          total,
        }) / LIMIT_FRAME.value();
      DESC_3_1 +=
        AMP_3_1.getValue({
          index,
          total,
        }) / LIMIT_FRAME.value();
      DESC_3_2 +=
        AMP_3_2.getValue({
          index,
          total,
        }) / LIMIT_FRAME.value();
    }

    ROTATE_DEG += Number(ROTATE_ADD.value());
  }
  ROTATE_DEG = 0;

  return lines;
};

function setup() {
  initParams();
  initButtons();
  const { BACKGROUND_COLOR } = params;
  const canvas = createCanvas(800, 1024);
  canvas.parent('root');
  frameRate(120);
  // createCanvas(1000, 1000, SVG);
  noLoop();

  background(BACKGROUND_COLOR.value());
}

function draw() {
  const { BACKGROUND_COLOR, STROKE_COLOR, SHOW_PENDULEM, ROWS, COLS } = params;
  if (params.ANIMATION_MODE.checked() && frameCount === 1) {
    capturer.start();
  }

  background(BACKGROUND_COLOR.value());
  strokeWeight(1);
  noFill();
  stroke(STROKE_COLOR.value());

  if (SHOW_PENDULEM.checked()) {
    show_pendulem();
  }

  for (let row = 0; row < ROWS.value(); row++) {
    for (let col = 0; col < COLS.value(); col++) {
      push();
      translate(
        (width / COLS.value()) * col + width / COLS.value() / 2,
        (height / ROWS.value()) * row + height / ROWS.value() / 2
      );
      const lines = createLines({
        row,
        col,
      });
      beginShape();
      lines.forEach((line) => {
        vertex(line.x, line.y);
      });
      endShape();
      pop();
    }
  }

  if (params.ANIMATION_MODE.checked()) {
    if (frameCount < RECORDING_FRAME_LIMIT) {
      capturer.capture(canvas);
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
}
