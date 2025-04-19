import SketchBase, { hoverInteraction } from "../../sketchBase";

export const Sketch10 = new SketchBase(
  "10Print",
  hoverInteraction,
  (size) => (p) => {
    let canvas;
    let x = 0;
    let y = 0;
    let spacing = 10;

    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
      p.noLoop();
      canvas.mouseOver(() => p.loop());
      canvas.mouseOut(() => p.noLoop());
      p.frameRate(20);
      p.background(0);
      spacing = p.int(p.random(15, 30));
    };

    p.draw = () => {
      p.stroke(255 - x, y * 2, x + y);
      p.strokeWeight(p.random(0.5, 10));

      if (p.random(1) < 0.5) {
        p.line(x, y, x + spacing, y + spacing);
      } else {
        p.line(x, y + spacing, x + spacing, y);
      }

      x += spacing;
      if (x > p.width) {
        x = 0;
        y += spacing;
      }

      if (y > p.height + spacing * 2) {
        p.background(0);
        x = 0;
        y = 0;
      }
    };
  }
);
