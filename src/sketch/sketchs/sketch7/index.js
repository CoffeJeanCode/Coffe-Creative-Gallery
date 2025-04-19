import SketchBase, { interactionPressed } from "../../sketchBase";

export const Sketch7 = new SketchBase(
  "Node Garden",
  interactionPressed,
  (size) => (p) => {
    const nodes = [],
      MAX_DIST = 50;
    let canvas;
    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
      p.noLoop();
      canvas.mouseOver(() => p.loop());
      canvas.mouseOut(() => p.noLoop());

      for (let i = 0; i < 60; i++) {
        nodes.push({
          x: p.random(p.width),
          y: p.random(p.height),
          vX: p.random() * 2 - 1,
          vY: p.random() * 2 - 1,
        });
      }
    };

    p.draw = () => {
      p.background(0);

      p.stroke(255);

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vX;
        node.y += node.vY;

        if (node.x < 0 || node.x > p.width) {
          node.x = p.width / 2;
        }

        if (node.y < 0 || node.y > p.height) {
          node.y = p.height / 2;
        }

        p.ellipse(node.x, node.y, 2);
      }

      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        for (let j = 0; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const distAB = p.dist(nodeA.x, nodeA.y, nodeB.x, nodeB.y);

          if (distAB < MAX_DIST) {
            p.strokeWeight(1 - distAB / MAX_DIST);
            p.line(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
          }
        }
      }
    };

    p.mousePressed = () => {
      nodes.push({
        x: p.mouseX,
        y: p.mouseY,
        vX: p.random() * 2 - 1,
        vY: p.random() * 2 - 1,
      });

      if (nodes.length > 100) {
        nodes.slice(1);
      }
    };
  }
);
