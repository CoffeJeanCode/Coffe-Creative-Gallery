import SketchBase, { interactionPressed } from "../../sketchBase";

export const Sketch2 = new SketchBase(
  "Vibrant Curve Lines",
  interactionPressed,
  (size) => (p) => {
    const path = [];
    let canvas;
    const palette1 = ["#FF5733", "#FFC300", "#FF4500"];
    const palette2 = ["#33FF57", "#3357FF", "#00FFFF"];
    const palette3 = ["#F0FF33", "#FFB6C1", "#ADD8E6"];
    const colors = p.random([palette1, palette2, palette3]);
    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
      p.noLoop();
      canvas.mouseOver(() => p.loop());
      canvas.mouseOut(() => p.noLoop());
      p.smooth();
    };

    p.draw = () => {
      p.background(0);

      p.stroke(255, 50);
      p.line(p.mouseX, 0, p.mouseX, p.height);
      p.line(0, p.mouseY, p.width, p.mouseY);

      if (p.mouseIsPressed) {
        path.push(p.mouseX, p.mouseY);
      }

      for (let i = 0; i < path.length; i += 2) {
        const colorIndex = (i / 2) % colors.length;
        p.stroke(colors[colorIndex]);
        p.line(path[i], p.mouseY, p.mouseX, path[i + 1]);
      }
    };
  }
);
