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
        const types = ["soft", "bold", "hollow", "filled", "vapor", "ghost"];
        const type = p.random(types);
        return new Circle(x, y, type);
      } else {
        return null;
      }
    }

    class Circle {
      constructor(x, y, type = "default") {
        this.x = x;
        this.y = y;
        this.r = 0.01;
        this.growing = true;
        this.type = type;
      }

      grow() {
        if (this.growing) {
          const growthSpeed = 1.5;
          this.r += growthSpeed;
        }
      }

      show() {
        switch (this.type) {
          case "soft":
            p.noFill();
            p.stroke(255, 80);
            p.strokeWeight(1);
            break;
          case "bold":
            p.noFill();
            p.stroke(255);
            p.strokeWeight(3);
            break;
          case "hollow":
            p.noFill();
            p.stroke(200);
            p.strokeWeight(0.5);
            break;
          case "filled":
            p.noStroke();
            p.fill(255, 100);
            break;
          case "vapor":
            p.noFill();
            p.stroke(255, 50);
            p.strokeWeight(5);
            break;
          case "ghost":
            p.noFill();
            p.stroke(255, 25);
            p.strokeWeight(1);
            break;
          default:
            p.noFill();
            p.stroke(255);
            p.strokeWeight(0.5);
        }

        p.ellipse(this.x, this.y, this.r * 2);

        p.drawingContext.setLineDash([]); // reset
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
