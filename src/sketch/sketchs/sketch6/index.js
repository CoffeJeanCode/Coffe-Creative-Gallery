import SketchBase, { interactionMove } from "../../sketchBase";

export const Sketch6 = new SketchBase(
  "Follow Cursor",
  interactionMove,
  (size) => (p) => {
    const GAP = 12;
    const lineLength = 12;
    let canvas;
    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
      p.noLoop();
      canvas.mouseOver(() => p.loop());
      canvas.mouseOut(() => p.noLoop());
    };

    p.draw = () => {
      p.clear();
      p.background(0);

      p.strokeWeight(3);
      p.stroke(255);
      p.strokeCap("round");

      const radius = lineLength * 0.7;
      const horizontalGap = lineLength + GAP;
      const verticalGap = lineLength + GAP;

      for (let rows = 0; rows < p.width / 15; rows++) {
        for (let cols = 0; cols < p.height / 15; cols++) {
          const centerX = rows * horizontalGap + horizontalGap;
          const centerY = cols * verticalGap + verticalGap;

          const deltaX = centerX - p.mouseX;
          const deltaY = centerY - p.mouseY;

          const distance = p.dist(centerX, centerY, p.mouseX, p.mouseY);

          const hypRatio = radius / distance;

          const xRatio = deltaX * hypRatio;
          const yRatio = deltaY * hypRatio;

          const dampenBy = p.constrain(p.map(distance, 300, 0, 1, 0), 0, 1);
          const p1 = {
            x: centerX - xRatio * dampenBy,
            y: centerY - yRatio * dampenBy,
          };
          const p2 = {
            x: centerX + xRatio * dampenBy,
            y: centerY + yRatio * dampenBy,
          };
          p.line(p1.x, p1.y, p2.x, p2.y);
        }
      }
    };
  }
);
