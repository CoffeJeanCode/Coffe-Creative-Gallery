import SketchBase, { hoverInteraction } from "../../sketchBase";

export const Sketch9 = new SketchBase(
  "Circle Packing",
  hoverInteraction,
  (size) => (p) => {
    let canvas;
    const circles = [];

    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
      p.noLoop();
      canvas.mouseOver(() => p.loop());
      canvas.mouseOut(() => p.noLoop());
      p.frameRate(20);
    };

    p.draw = () => {
      p.background(0);
      p.strokeWeight(0.5);
      let total = 5;
      let count = 0;
      let attempts = 0;

      while (count < total) {
        let newC = newCircle();
        if (newC !== null) {
          circles.push(newC);
          count++;
        }
        attempts++;
        if (attempts > 100) {
          p.noLoop();
          console.log("finished");
          break;
        }
      }

      for (const circle of circles) {
        if (circle.growing) {
          if (circle.edges()) {
            circle.growing = false;
          } else {
            for (const other of circles) {
              if (circle !== other) {
                let d = p.dist(circle.x, circle.y, other.x, other.y);
                let distance = circle.r + other.r;

                if (d - 3.5 < distance) {
                  circle.growing = false;
                  break;
                }
              }
            }
          }
        }

        circle.show();
        circle.grow();
      }
    };

    function newCircle() {
      let x = p.random(p.width);
      let y = p.random(p.height);
      let valid = true;
      for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        let d = p.dist(x, y, circle.x, circle.y);
        if (d < circle.r) {
          valid = false;
          break;
        }
      }
      if (valid) {
        return new Circle(x, y);
      } else {
        return null;
      }
    }

    class Circle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 1;
        this.growing = true;
      }

      grow() {
        if (this.growing) this.r += 0.5;
      }

      show() {
        p.stroke(255);
        p.noFill();
        p.ellipse(this.x, this.y, this.r * 2);
      }

      edges() {
        return (
          this.x + this.r >= p.width ||
          this.x - this.r <= 0 ||
          this.y + this.r >= p.height ||
          this.y - this.r <= 0
        );
      }
    }
  }
);
