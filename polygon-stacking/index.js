const row = 6;
const column = 5;
const polygonStacks = [];

function setup() {
  const canvas = createCanvas(800, 1024);
  canvas.parent('root');
  noLoop();

  Array.from({ length: row * column }, () =>
    polygonStacks.push(
      new PolygonStack({
        innerRadius: 20,
        outerRadius: 60,
        outerRadiusRandomAmp: 20,
        vertexPerEdge: 7,
        stackCount: 20,
        rotate: 45,
      })
    )
  );
}

function draw() {
  background(255);

  polygonStacks.forEach((polygonStack, idx) =>
    polygonStack.draw({
      centerX: (width / column) * (idx % column) + 80,
      centerY: (height / row) * parseInt(idx / column) + 80,
    })
  );
}
