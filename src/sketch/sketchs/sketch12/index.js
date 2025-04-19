import SketchBase, { interactionPressed } from "../../sketchBase";

export const Sketch12 = new SketchBase(
  "Pop Art Waves",
  interactionPressed,
  (size) => (p) => {
    const waves = [];
    const colors = [
      [255, 0, 0], // Rojo brillante
      [255, 236, 0], // Amarillo brillante
      [0, 232, 255], // Cian brillante
      [255, 0, 231], // Magenta brillante
      [0, 255, 0], // Verde neón
      [255, 145, 0], // Naranja brillante
    ];
    const dotPatterns = [];
    const GRID_SIZE = 5;

    let isActive = false;
    let canvas;

    function createDotPattern() {
      const pattern = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          pattern.push(p.random() > 0.5);
        }
      }
      return pattern;
    }

    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
      p.noStroke();
      p.angleMode(p.DEGREES);

      // Crear patrones de puntos predefinidos
      for (let i = 0; i < 4; i++) {
        dotPatterns.push(createDotPattern());
      }

      // Manejadores de eventos optimizados
      canvas.mouseOver(() => {
        isActive = true;
        p.loop();
      });

      canvas.mouseOut(() => {
        isActive = false;
        p.noLoop();
      });

      p.noLoop();
    };

    p.draw = () => {
      p.background(0);

      // Actualiza y dibuja las ondas
      for (let i = waves.length - 1; i >= 0; i--) {
        let wave = waves[i];
        wave.radius += 3; // Aumenta el radio

        if (wave.radius > p.width * 1.2) {
          waves.splice(i, 1);
          continue;
        }

        drawPopArtWave(wave, i);
      }
    };

    function drawPopArtWave(wave, index) {
      let colorIndex = index % colors.length;
      let patternIndex = index % dotPatterns.length;
      let pattern = dotPatterns[patternIndex];

      for (let y = 0; y < p.height; y += GRID_SIZE) {
        for (let x = 0; x < p.width; x += GRID_SIZE) {
          let d = p.dist(x + GRID_SIZE / 2, y + GRID_SIZE / 2, wave.x, wave.y);
          let isInWave = p.abs(d - wave.radius) < 20;

          if (isInWave) {
            drawPopArtElement(x, y, GRID_SIZE, colors[colorIndex], pattern);
          }
        }
      }
    }

    function drawPopArtElement(x, y, size, color, pattern) {
      let elementType = p.floor((x + y + p.frameCount) / 30) % 3;

      p.push();
      p.translate(x + size / 2, y + size / 2);

      switch (elementType) {
        case 0:
          p.fill(color);
          p.rect(-size / 2, -size / 2, size, size);
          p.fill(0);
          let dotSize = size / 6;
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (pattern[i * 3 + j]) {
                p.circle((i - 1) * dotSize, (j - 1) * dotSize, dotSize / 2);
              }
            }
          }
          break;

        case 1:
          p.fill(color);
          p.beginShape();
          for (let i = 0; i < 8; i++) {
            let radius = i % 2 === 0 ? size / 2 : size / 4;
            let ang = i * 45;
            p.vertex(p.cos(ang) * radius, p.sin(ang) * radius);
          }
          p.endShape(p.CLOSE);
          break;

        case 2:
          p.fill(color);
          p.rect(-size / 2, -size / 2, size, size);
          p.fill(0);
          for (let i = -size / 2; i < size / 2; i += size / 4) {
            p.rect(i, -size / 2, size / 8, size);
          }
          break;
      }
      p.pop();
    }

    p.mousePressed = () => {
      waves.push({
        x: p.mouseX,
        y: p.mouseY,
        radius: 0,
      });

      if (waves.length > 15) {
        waves.splice(0, 1);
      }

      dotPatterns[p.floor(p.random(dotPatterns.length))] = createDotPattern();
    };
  }
);
