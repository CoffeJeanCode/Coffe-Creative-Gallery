import SketchBase from "./sketchBase";

export const Sketch1 = new SketchBase(
  "Matrix Lines",
  "Matrix Lines in X an Y to mouse position",
  (p) => {
    let canvas;
    p.setup = () => {
      canvas = p.createCanvas(300, 300);
      canvas.mouseOver(() => p.loop());
      canvas.mouseOut(() => p.noLoop());
    };

    p.draw = () => {
      p.background(0);
      for (let x = 0; x <= p.width; x += p.width / 5) {
        for (let y = 0; y <= p.height; y += p.height / 5) {
          p.stroke(255);
          p.strokeWeight(1);
          p.line(x, y, p.mouseX, p.mouseY);
          p.strokeWeight(10);
          p.point(x, y);
        }
      }
    };
  }
);

export const Sketch2 = new SketchBase(
  "Curve Lines",
  "Matrix Lines in X an Y to mouse position",
  (p) => {
    const path = [];
    let canvas;

    p.setup = () => {
      canvas = p.createCanvas(300, 300);
      canvas.mouseOver(() => p.loop());
      canvas.mouseOut(() => p.noLoop());
    };

    p.draw = () => {
      p.background(0);
      p.stroke(255);
      p.line(p.mouseX, 0, p.mouseX, p.height);
      p.line(0, p.mouseY, p.width, p.mouseY);
      if (p.mouseIsPressed) {
        path.push(p.mouseX, p.mouseY);
      }
      for (let i = 0; i < path.length; i++) {
        p.line(path[i], p.mouseY, p.mouseX, path[i + 1]);
      }
    };
  }
);

export const Sketch3 = new SketchBase("Color Squares", "", (p) => {
  let canvas;

  p.setup = () => {
    canvas = p.createCanvas(300, 300);
    canvas.mouseOver(() => p.loop());
    canvas.mouseOut(() => p.noLoop());
    p.colorMode("hsb", 360, 100, 100);
  };

  p.draw = () => {
    p.background(0);
    for (let x = 20; x <= p.width; x += p.width / 5) {
      for (let y = 20; y <= p.height; y += p.height / 5) {
        p.noFill();
        p.noStroke();
        p.fill(p.mouseX + p.mouseY, 100, 100);
        p.square(x, y, 20);
      }
    }
  };
});

export const Sketch4 = new SketchBase("Kaleiospe", "", (p) => {
  let symetry = 12;
  let angle = 360 / symetry;
  let canvas;

  p.setup = () => {
    canvas = p.createCanvas(300, 300);
    canvas.mouseOver(() => p.loop());
    canvas.mouseOut(() => p.noLoop());
    p.angleMode(p.DEGREES);
    p.background(0);
    p.translate(p.width / 2, p.height / 2);
    p.stroke(255);

    for (let i = 0; i < symetry; i++) {
      p.rotate(angle);
      p.line(0, 0, p.width, 0);
    }
  };

  p.draw = () => {
    let mx = p.mouseX - p.width / 2;
    let my = p.mouseY - p.height / 2;
    let pmx = p.pmouseX - p.width / 2;
    let pmy = p.pmouseY - p.height / 2;

    p.translate(p.width / 2, p.height / 2);

    if (p.mouseIsPressed) {
      p.stroke(255);

      for (let i = 0; i < symetry; i++) {
        p.rotate(angle);
        let d = p.dist(mx, my, pmx, pmy),
          sw = p.map(d, 0, 10, 10, 1);

        p.strokeWeight(sw);
        p.line(mx, my, pmx, pmy);
      }
    }
  };
});

export const Sketch5 = new SketchBase("Terrain Generator", "", (p) => {
  let cols, rows;
  let scl = 40;
  let w = 1400;
  let h = 1000;

  let flying = 0;

  let terrain = [];

  p.setup = () => {
    p.createCanvas(300, 300, p.WEBGL);
    cols = w / scl;
    rows = h / scl;

    for (let x = 0; x < cols; x++) {
      terrain[x] = [];
      for (let y = 0; y < rows; y++) {
        terrain[x][y] = 0; //specify a default value for now
      }
    }
  };

  p.draw = () => {
    flying -= 0.1;
    let yoff = flying;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        terrain[x][y] = p.map(p.noise(xoff, yoff), 0, 1, -100, 100);
        xoff += 0.2;
      }
      yoff += 0.2;
    }

    p.background(0);
    p.translate(0, 50);
    p.rotateX(p.PI / 3);
    p.fill(200, 200, 200);
    p.translate(-w / 2, -h / 2);
    for (let y = 0; y < rows - 1; y++) {
      p.beginShape(p.TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
        p.vertex(x * scl, y * scl, terrain[x][y]);
        p.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
      }
      p.endShape();
    }
  };
});
