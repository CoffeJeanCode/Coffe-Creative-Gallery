import SketchBase, { interactionMove } from "../../sketchBase";

export const Sketch3 = new SketchBase(
  "Color Squares",
  interactionMove,
  (size) => (p) => {
    let canvas;

    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
      p.noLoop();
      canvas.mouseOver(() => p.loop());
      canvas.mouseOut(() => p.noLoop());
      p.colorMode("hsb", 360, 100, 100);
    };

    p.draw = () => {
      p.background(0);
      const clientX = p.map(p.mouseX, 0, 360, 0, p.width);
      const clientY = p.map(p.mouseY, 0, 360, 0, p.height);
      const color = clientX + clientY;
      for (let x = 20; x <= p.width; x += p.width / 5) {
        for (let y = 20; y <= p.height; y += p.height / 5) {
          p.noFill();
          p.noStroke();
          p.fill(color, 100, 100);
          p.square(x, y, 20);
        }
      }
    };
  }
);
