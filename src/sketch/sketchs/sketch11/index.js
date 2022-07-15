import SketchBase, { hoverInteraction } from "../../sketchBase";

export const Sketch11 = new SketchBase(
  "Gradient Generator",
  hoverInteraction,
  (size) => (p) => {
    let canvas;
    let colors = [];
    const particles = [];
    const MIN_RADIUS = 15;
    const MAX_RADIUS = 30;
    const PALETTE = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];

    let curColor = 0;
    let graphic, graphicCtx;

    p.setup = () => {
      canvas = p.createCanvas(size.width, size.height);
      p.noLoop();
      canvas.mouseOver(() => p.loop());
      canvas.mouseOut(() => p.noLoop());

      graphic = p.createGraphics(p.width, p.height);
      graphicCtx = graphic.canvas.getContext("2d");
      colors = createPallete();

      for (let i = 0; i < 15; i++) {
        const particle = new Particle(
          p.random(p.width + MIN_RADIUS),
          p.random(p.height + MIN_RADIUS),
          (MAX_RADIUS - MIN_RADIUS) * MIN_RADIUS,
          colors[curColor]
        );
        particles.push(particle);

        curColor++;
        if (curColor >= colors.length) {
          curColor = 0;
        }
      }
    };

    p.draw = () => {
      graphicCtx.clearRect(0, 0, p.width, p.height);
      graphicCtx.globalCompositeOperation = "saturation";

      p.noStroke();
      p.background(0);

      for (const particle of particles) {
        particle.animate();
      }

      p.image(graphic, 0, 0);
    };

    const createPallete = () =>
      PALETTE.sort(() => (p.random() > 0.5 ? 1 : -1)).map((c) => {
        const [r, g, b] = p.color(c).levels;
        return { r, g, b };
      });

    class Particle {
      constructor(x, y, radius, rgb) {
        this.x = x;
        this.y = y;
        this.radius = p.abs(radius);
        this.rgb = rgb;

        this.vx = p.random(-2, 4);
        this.vy = p.random(-2, 4);

        this.sinValue = p.random();
      }

      animate() {
        this.sinValue += 0.01;

        this.radius += p.sin(this.sinValue);

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) {
          this.vx *= -1;
          this.x -= 5;
        } else if (this.x > p.width) {
          this.vx *= -1;
          this.x += 5;
        }

        if (this.y < 0) {
          this.vy *= -1;
          this.y += 5;
        } else if (this.y > p.height) {
          this.vy *= -1;
          this.y -= 5;
        }

        const g = graphicCtx.createRadialGradient(
          this.x,
          this.y,
          this.radius * 0.001,
          this.x,
          this.y,
          this.radius
        );

        g.addColorStop(
          0,
          `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`
        );
        g.addColorStop(
          1,
          `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0)`
        );
        graphicCtx.fillStyle = g;

        graphicCtx.arc(
          this.x,
          this.y,
          this.radius,
          this.radius,
          0,
          p.TAU,
          false
        );
        graphicCtx.fill();
      }
    }
  }
);
