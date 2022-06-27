import SketchBase from "./sketchBase";

export const Sketch1 = new SketchBase(
  "Matrix Lines",
  "Matrix Lines in X an Y to mouse position",
  (size) => (p) => {
    let canvas;
    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
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
  (size) => (p) => {
    const path = [];
    let canvas;

    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
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

export const Sketch3 = new SketchBase("Color Squares", "", (size) => (p) => {
  let canvas;

  p.setup = () => {
    canvas = p.createCanvas(size.width, size.height);
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

export const Sketch4 = new SketchBase("Kaleiospe", "", (size) => (p) => {
  let symetry = 12;
  let angle = 360 / symetry;
  let canvas;

  p.setup = () => {
    canvas = p.createCanvas(size.width, size.height);
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

export const Sketch5 = new SketchBase(
  "Terrain Generator",
  "",
  (size) => (p) => {
    let cols, rows;
    let scl = 40;
    let w = 1400;
    let h = 1000;

    let flying = 0;

    let terrain = [];

    p.setup = () => {
      p.createCanvas(size.width, size.height, p.WEBGL);
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
  }
);

export const Sketch6 = new SketchBase("Follow Cursor", "", (size) => (p) => {
  const GAP = 12;
  const lineLength = 12;
  let canvas;
  p.setup = () => {
    canvas = p.createCanvas(size.width, size.height);
    canvas.mouseOver(() => p.loop());
    canvas.mouseOut(() => p.noLoop());
  };

  p.draw = () => {
    p.clear();
    p.background(0);

    p.strokeWeight(3);
    p.stroke(255);
    p.strokeCap("round");

    const radius = lineLength * 0.7;
    const horizontalGap = lineLength + GAP;
    const verticalGap = lineLength + GAP;

    for (let rows = 0; rows < p.width / 15; rows++) {
      for (let cols = 0; cols < p.height / 15; cols++) {
        const centerX = rows * horizontalGap + horizontalGap;
        const centerY = cols * verticalGap + verticalGap;

        const deltaX = centerX - p.mouseX;
        const deltaY = centerY - p.mouseY;

        const distance = p.dist(centerX, centerY, p.mouseX, p.mouseY);

        const hypRatio = radius / distance;

        const xRatio = deltaX * hypRatio;
        const yRatio = deltaY * hypRatio;

        const dampenBy = p.constrain(p.map(distance, 300, 0, 1, 0), 0, 1);
        const p1 = {
          x: centerX - xRatio * dampenBy,
          y: centerY - yRatio * dampenBy,
        };
        const p2 = {
          x: centerX + xRatio * dampenBy,
          y: centerY + yRatio * dampenBy,
        };
        p.line(p1.x, p1.y, p2.x, p2.y);
      }
    }
  };
});
