/* Fill in any convex polygon made up of straight
 * line segments with N lines at the given angle
 *
 * Algorithm is to find a bounding box, for each
 * line going through that box, calculate the intersections
 * for each pair of line segments. Find the pair that
 * has the valid* distance between them, which will be
 * the correct line to use, because convexity.
 *
 * Valid lines are ones that have the intersection in the
 * line segment, rather than an intersection outside the
 * line segment.
 *
 * Obviously this is not efficient, it runs in
 * O(num_lines * (num_sides!)) time, and has to do
 * intersection/distance calculations for each sides comparison.
 * Wondering if there's a better algorithm for this.
 * Kept this way so you could generalize to any convex polygon.
 */
let points;

function setup() {
  createCanvas(400, 400);
  // TWO_PI = TWO_PI;
  points = polygon_points(200, 200, 100, 7);

  random_angle();
  example();
  button = createButton('show bounding box and lines');
  button.position(50, 30);
  button.mousePressed(line_show_swap);
}

function draw() {}

// Set this to true to only plot the red fill lines
let hide_example_lines = false;

let angle;

function random_angle() {
  angle = TWO_PI * Math.random();
}

function example() {
  background(220);
  noFill();
  stroke(0);
  text('press r to generate new lines', 50, 15);

  const num_lines = 10;

  if (!hide_example_lines) {
    fill(250);
    stroke(0);
    draw_shape(points);
  }
  const bounds = bounding_box(points);
  const bound_points = [
    [bounds[0], bounds[1]],
    [bounds[0], bounds[3]],
    [bounds[2], bounds[3]],
    [bounds[2], bounds[1]],
  ];
  if (!hide_example_lines) {
    noFill();
    draw_shape(bound_points);
  }

  draw_angled_lines(points, num_lines, bounds, angle);
}

function draw_angled_lines(points, num_lines, bounds, angle) {
  console.log(bounds);
  const box_length = Math.abs(bounds[0] - bounds[2]);
  const angle_offset_length = box_length * sin(angle);
  let bottom_point, top_point, draw_points;
  if (angle_offset_length >= 0) {
    bottom_point = [bounds[0], bounds[1]];
    top_point = [bounds[0] - angle_offset_length, bounds[3]];
  } else {
    bottom_point = [bounds[0] + angle_offset_length, bounds[1]];
    top_point = [bounds[0], bounds[3]];
  }
  const total_length = box_length + Math.abs(angle_offset_length);
  const increment_length = total_length / num_lines;
  for (let i = 0; i < num_lines; i++) {
    bottom_point[0] += increment_length;
    top_point[0] += increment_length;
    draw_points = find_min_intersect_segment(bottom_point, top_point, points);
    if (!hide_example_lines) {
      strokeWeight(1);
      stroke(0);
      line(bottom_point[0], bottom_point[1], top_point[0], top_point[1]);
    }
    if (draw_points != null) {
      stroke(255, 0, 0);
      strokeWeight(2);
      strokeCap(SQUARE);
      line(
        draw_points[0][0],
        draw_points[0][1],
        draw_points[1][0],
        draw_points[1][1]
      );
      // noStroke();
      // fill(255,0,0);
      // for (var j = 0; j < 1; j += 0.05) {
      //   ellipse(lerp(draw_points[0][0], draw_points[1][0], j),
      //           lerp(draw_points[0][1], draw_points[1][1], j),
      //           5);
      // }
    }
  }
}

function find_min_intersect_segment(point1, point2, points) {
  let dist = 100000000000000;
  let draw_points, res, intersect1, intersect2, intersect_dist;

  console.log(point1, point2, points);

  for (let i = 0; i < points.length; i++) {
    res = intersect_point(
      point1,
      point2,
      points[i],
      points[(i + 1) % points.length]
    );
    if (res[2]) {
      continue;
    } else {
      intersect1 = [res[0], res[1]];
    }
    for (let j = i + 1; j < points.length; j++) {
      res = intersect_point(
        point1,
        point2,
        points[j % points.length],
        points[(j + 1) % points.length]
      );
      if (res[2]) {
        continue;
      } else {
        intersect2 = [res[0], res[1]];
      }
      intersect_dist = distance(intersect1, intersect2);
      if (intersect_dist <= dist) {
        dist = intersect_dist;
        draw_points = [intersect1, intersect2];
      }
    }
  }
  return draw_points;
}

function polygon_points(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  let points = [];
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;

    points.push([sx, sy]);
  }
  return points;
}

function draw_shape(points) {
  beginShape();
  points.forEach(function (point) {
    vertex(point[0], point[1]);
  });
  endShape(CLOSE);
}

function bounding_box(points) {
  const min_x = points.reduce(
    (min, p) => (p[0] < min ? p[0] : min),
    points[0][0]
  );
  const max_x = points.reduce(
    (max, p) => (p[0] > max ? p[0] : max),
    points[0][0]
  );
  const min_y = points.reduce(
    (min, p) => (p[1] < min ? p[1] : min),
    points[0][1]
  );
  const max_y = points.reduce(
    (max, p) => (p[1] > max ? p[1] : max),
    points[0][1]
  );

  return [min_x, min_y, max_x, max_y];
}

function intersect_point(point1, point2, point3, point4) {
  const ua =
    ((point4[0] - point3[0]) * (point1[1] - point3[1]) -
      (point4[1] - point3[1]) * (point1[0] - point3[0])) /
    ((point4[1] - point3[1]) * (point2[0] - point1[0]) -
      (point4[0] - point3[0]) * (point2[1] - point1[1]));

  const ub =
    ((point2[0] - point1[0]) * (point1[1] - point3[1]) -
      (point2[1] - point1[1]) * (point1[0] - point3[0])) /
    ((point4[1] - point3[1]) * (point2[0] - point1[0]) -
      (point4[0] - point3[0]) * (point2[1] - point1[1]));

  const x = point1[0] + ua * (point2[0] - point1[0]);
  const y = point1[1] + ua * (point2[1] - point1[1]);

  let out_of_bounds = false;
  if ((ua < 0) | (ua > 1) | (ub < 0) | (ub > 1)) {
    out_of_bounds = true;
  }

  return [x, y, out_of_bounds];
}

function distance(v1, v2) {
  return ((v1[0] - v2[0]) ** 2 + (v1[1] - v2[1]) ** 2) ** 0.5;
}

function keyPressed() {
  if (key == 'r') {
    random_angle();
    example();
  }
}

function line_show_swap() {
  hide_example_lines = !hide_example_lines;
  example();
}
