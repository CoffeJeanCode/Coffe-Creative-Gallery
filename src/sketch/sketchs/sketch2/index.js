import SketchBase, { interactionPressed } from "../../sketchBase";

export const Sketch2 = new SketchBase(
  "Curve Lines",
  interactionPressed,
  (size) => (p) => {
    const path = [];
    let canvas;

    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
      p.noLoop();
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
