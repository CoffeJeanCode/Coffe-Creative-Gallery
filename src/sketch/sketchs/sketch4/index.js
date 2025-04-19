import SketchBase, { interactionPressed } from "../../sketchBase";

export const Sketch4 = new SketchBase(
  "Kaleiospe",
  interactionPressed,
  (size) => (p) => {
    let symetry;
    let angle;
    let canvas;

    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
      p.noLoop();
      canvas.mouseOver(() => p.loop());
      canvas.mouseOut(() => p.noLoop());
      p.angleMode(p.DEGREES);
      p.background(0);
      p.translate(p.width / 2, p.height / 2);
      p.stroke(255);

      symetry = p.int(p.random(12, 24));
      angle = 360 / symetry;

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
            sw = p.map(d, 0, 10, 5, 0.5);

          p.strokeWeight(sw);
          p.line(mx, my, pmx, pmy);
        }
      }
    };
  }
);
