import SketchBase, { interactionMove } from "../../sketchBase";

export const Sketch1 = new SketchBase(
  "Dynamic Neon Matrix",
  interactionMove,
  (size) => (p) => {
    let canvas;
    let hue;
    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.noLoop();
      canvas.mouseOver(() => p.loop());
      canvas.mouseOut(() => p.noLoop());
    };

    p.draw = () => {
      p.background(0, 30);

      for (let x = 0; x <= p.width; x += p.width / 15) {
        for (let y = 0; y <= p.height; y += p.height / 15) {
          hue = p.random([260, 250, 150]);
          p.stroke(hue, 80, 100, 80);
          p.strokeWeight(0.8);

          // Líneas con vibración que apuntan al mouse
          let xOffset = p.random(-3, 3);
          let yOffset = p.random(-3, 3);
          p.line(x, y, p.mouseX + xOffset, p.mouseY + yOffset);

          // Puntos pequeños con un efecto de pulso en la cuadrícula
          p.strokeWeight(5);
          p.point(x + xOffset, y + yOffset);
        }
      }
    };
  }
);
