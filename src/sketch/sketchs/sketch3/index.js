import SketchBase, { interactionMove } from "../../sketchBase";

export const Sketch3 = new SketchBase(
  "Color Squares",
  interactionMove,
  (size) => (p) => {
    let canvas;

    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
      p.noLoop(); // Para detener el dibujo en el loop
      canvas.mouseOver(() => p.loop());
      canvas.mouseOut(() => p.noLoop());
      p.colorMode("hsb", 360, 100, 100);
    };

    p.draw = () => {
      p.background(0);

      // Mapea las coordenadas del mouse al rango de color
      const clientX = p.map(p.mouseX, 0, p.width, 0, 360);
      const clientY = p.map(p.mouseY, 0, p.height, 0, 360);
      const color = (clientX + clientY) % 360; // Asegúrate de que el color esté dentro de 0-360

      const squareSize = p.width / 10; // Calcula el tamaño de los cuadrados
      const startX = (p.width - squareSize * 5) / 2; // Centra los cuadrados horizontalmente
      const startY = (p.height - squareSize * 5) / 2; // Centra los cuadrados verticalmente

      // Dibuja cuadrados centrados en la superficie del canvas
      for (let x = 0; x < 5; x++) {
        // 5 cuadrados en cada dimensión
        for (let y = 0; y < 5; y++) {
          p.noFill();
          p.noStroke();
          p.fill(color, 100, 100);
          p.square(
            startX + x * squareSize,
            startY + y * squareSize,
            squareSize * 0.8
          ); // Agrega un pequeño margen
        }
      }
    };
  }
);
