import SketchBase, { interactionMove } from "../../sketchBase";

export const Sketch1 = new SketchBase(
  "Matrix Lines",
  interactionMove,
  (size) => (p) => {
    let canvas;
    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
      p.noLoop();
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
