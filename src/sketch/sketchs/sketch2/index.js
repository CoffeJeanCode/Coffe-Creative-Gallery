import SketchBase, { interactionPressed } from "../../sketchBase";

export const Sketch2 = new SketchBase(
  "Vibrant Curve Lines",
  interactionPressed,
  (size) => (p) => {
    const path = [];
    let canvas;
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F0FF33", "#FF33F6"]; // Paleta de colores

    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
      p.noLoop();
      canvas.mouseOver(() => p.loop());
      canvas.mouseOut(() => p.noLoop());
      p.smooth();
    };

    p.draw = () => {
      p.background(0); // Fondo negro

      // Dibuja líneas de guía
      p.stroke(255, 50); // Color claro y translúcido
      p.line(p.mouseX, 0, p.mouseX, p.height);
      p.line(0, p.mouseY, p.width, p.mouseY);

      if (p.mouseIsPressed) {
        path.push(p.mouseX, p.mouseY);
      }

      // Dibuja líneas con colores alternos
      for (let i = 0; i < path.length; i += 2) {
        const colorIndex = (i / 2) % colors.length; // Alterna el índice del color
        p.stroke(colors[colorIndex]); // Asigna el color
        p.line(path[i], p.mouseY, p.mouseX, path[i + 1]);
      }
    };
  }
);
