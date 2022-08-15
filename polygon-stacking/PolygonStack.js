class PolygonStack {
  constructor({
    innerRadius,
    outerRadius,
    outerRadiusRandomRadio = 1,
    outerRadiusRandomAmp = 1,
    vertexPerEdge,
    stackCount,
    rotate = 0, // deg,
    showVertex = false,
  }) {
    this.innerRadius = innerRadius;
    this.innerVertexCount = 4;
    this.outerRadius = outerRadius;
    this.outerRadiusRandomRadio = outerRadiusRandomRadio;
    this.outerRadiusRandomAmp = outerRadiusRandomAmp;
    this.vertexPerEdge = vertexPerEdge;
    this.stackCount = stackCount;
    this.innerVertex = [];
    this.innerPoints = [];
    this.outerPoints = [];
    this.showVertex = showVertex;

    // get inner vertex
    for (let i = 0; i < this.innerVertexCount; i++) {
      const x =
        this.innerRadius *
        cos((TAU / this.innerVertexCount) * i + (PI / 180) * rotate);
      const y =
        this.innerRadius *
        sin((TAU / this.innerVertexCount) * i + (PI / 180) * rotate);
      this.innerVertex.push(createVector(x, y));
    }

    // get inner vertex include points on edge
    for (let i = 0; i < this.innerVertex.length; i++) {
      const nextVertex = this.innerVertex[(i + 1) % this.innerVertex.length];
      for (let j = 0; j < this.vertexPerEdge; j++) {
        const dx =
          this.innerVertex[i].x +
          (nextVertex.x - this.innerVertex[i].x) * (j / this.vertexPerEdge);
        const dy =
          this.innerVertex[i].y +
          (nextVertex.y - this.innerVertex[i].y) * (j / this.vertexPerEdge);
        this.innerPoints.push(createVector(dx, dy));
      }
    }

    // get outer points
    for (let i = 0; i < this.innerPoints.length; i++) {
      const x =
        (this.outerRadius +
          this.outerRadiusRandomRadio *
            random() *
            this.outerRadiusRandomAmp *
            pow(-1, i)) *
        cos((TAU / this.innerPoints.length) * i + (PI / 180) * rotate);
      const y =
        (this.outerRadius +
          this.outerRadiusRandomRadio *
            random() *
            this.outerRadiusRandomAmp *
            pow(-1, i)) *
        sin((TAU / this.innerPoints.length) * i + (PI / 180) * rotate);
      this.outerPoints.push(createVector(x, y));
    }
  }

  draw({ centerX, centerY }) {
    push();
    translate(centerX, centerY);
    noFill();

    if (this.showVertex) {
      beginShape();
      this.innerVertex.forEach((v) => vertex(v.x, v.y));
      endShape(CLOSE);

      this.innerPoints.forEach((v, idx) =>
        line(v.x, v.y, this.outerPoints[idx].x, this.outerPoints[idx].y)
      );

      stroke(255, 0, 0);
      strokeWeight(5);
      this.innerPoints.forEach((v) => point(v.x, v.y));

      stroke(0, 0, 255);
      strokeWeight(7);
      this.outerPoints.forEach((v) => point(v.x, v.y));
    }

    for (let i = 0; i <= this.stackCount; i++) {
      beginShape();
      for (let j = 0; j < this.outerPoints.length; j++) {
        const x =
          this.innerPoints[j].x +
          (this.outerPoints[j].x - this.innerPoints[j].x) *
            (i / this.stackCount);
        const y =
          this.innerPoints[j].y +
          (this.outerPoints[j].y - this.innerPoints[j].y) *
            (i / this.stackCount);
        vertex(x, y);
      }
      endShape(CLOSE);
    }
    pop();
  }
}
