import SketchBase, { interactionMove } from "../../sketchBase";

export const Sketch8 = new SketchBase(
  "Square Division",
  interactionMove,
  (size) => (p) => {
    let angle = 0,
      grid = 0,
      mX = 0,
      mY = 0,
      spacing = 2,
      scaleVar = 1;
    let canvas;
    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height, p.WEBGL);
      p.noLoop();
      canvas.mouseOver(() => p.loop());
      canvas.mouseOut(() => p.noLoop());

      p.colorMode("hsb", 360, 100, 100);
      p.frameRate(60);
      grid = p.width / 2;

      p.ortho();
    };

    p.draw = () => {
      p.background(0);
      p.noStroke();

      p.rectMode(p.CENTER);
      scaleVar = p.lerp(scaleVar, p.map(p.mouseX, 0, p.width, 0.1, 3), 0.1);

      p.scale(scaleVar);

      for (
        let x = mX + grid - p.width / 2;
        x <= p.width / 2 - mX;
        x += grid * spacing
      ) {
        p.fill(360 - x, 100, 100);
        for (
          let y = mY + grid - p.height / 2;
          y <= p.height / 2 - mY;
          y += grid * spacing
        ) {
          p.push();
          p.translate(x, y);

          // Top Left

          p.push();
          p.translate(-grid / 2, -grid / 2);
          p.rotateX(p.radians(angle));
          p.rotateY(-p.radians(angle));

          p.rect(0, 0, grid, grid);
          p.pop();

          // Top Right

          p.push();
          p.translate(grid / 2, -grid / 2);
          p.rotateY(-p.radians(angle));
          p.rotateX(p.radians(angle));

          p.rect(0, 0, grid, grid);
          p.pop();

          // Bottom Left

          p.push();
          p.translate(-grid / 2, grid / 2);
          p.rotateY(p.radians(angle));
          p.rotateX(p.radians(angle));

          p.rect(0, 0, grid, grid);
          p.pop();

          // Bottom Right

          p.push();
          p.translate(grid / 2, grid / 2);
          p.rotateX(-p.radians(angle));
          p.rotateY(-p.radians(angle));

          p.rect(0, 0, grid, grid);
          p.pop();

          p.pop();
        }
      }

      angle += 1;

      if (angle > 180) {
        grid = grid / 2;
        if (grid <= p.width / 15) grid = p.width / 2;
        angle = 0;
      }
    };
  }
);
