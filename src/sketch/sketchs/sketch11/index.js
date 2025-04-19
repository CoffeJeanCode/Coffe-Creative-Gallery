import SketchBase, { hoverInteraction } from "../../sketchBase";

export const Sketch11 = new SketchBase(
  "Lights",
  hoverInteraction,
  (size) => (p) => {
    let canvas;
    const particles = [];
    const MIN_RADIUS = 50;
    const MAX_RADIUS = 70;
    const PALETTE = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];
    const NUM_PARTICLES = p.random(10, 20);

    let buffer; // p5.Graphics buffer
    let isActive = false;

    // Pre-procesa los colores
    const processedColors = PALETTE.map((color) => {
      const [r, g, b] = p.color(color).levels;
      return { r, g, b };
    });

    class Particle {
      constructor() {
        this.reset();
        this.angleStep = p.random(0.02, 0.04);
        this.radiusVariation = p.random(3, 7);
      }

      reset() {
        this.x = p.random(p.width);
        this.y = p.random(p.height);
        this.radius = p.random(MIN_RADIUS, MAX_RADIUS);
        this.vx = p.random(-1.5, 1.5);
        this.vy = p.random(-1.5, 1.5);
        this.angle = p.random(p.TWO_PI);
        this.rgb = p.random(processedColors);
        return this;
      }

      update() {
        // Actualización de posición
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.angleStep;

        // Manejo de bordes mejorado
        if (this.x < this.radius) {
          this.x = this.radius;
          this.vx *= -1;
        } else if (this.x > p.width - this.radius) {
          this.x = p.width - this.radius;
          this.vx *= -1;
        }

        if (this.y < this.radius) {
          this.y = this.radius;
          this.vy *= -1;
        } else if (this.y > p.height - this.radius) {
          this.y = p.height - this.radius;
          this.vy *= -1;
        }

        return this.radius + Math.sin(this.angle) * this.radiusVariation;
      }

      draw(graphics, radius) {
        const ctx = graphics.drawingContext;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`;
        ctx.arc(this.x, this.y, radius, 0, p.TWO_PI);
        ctx.fill();
      }
    }

    p.setup = () => {
      // Configuración inicial
      canvas = p.createCanvas(size.width, size.height);
      p.frameRate(60);

      // Crea el buffer de p5
      buffer = p.createGraphics(p.width, p.height);
      buffer.drawingContext.filter = "blur(12px)";
      buffer.drawingContext.globalCompositeOperation = "source-over";

      const mainCtx = buffer.drawingContext;
      mainCtx.save();

      // boost del alpha (tipo colorMatrix con 25 -10)
      mainCtx.globalAlpha = 1;
      mainCtx.globalCompositeOperation = "source-over";
      mainCtx.filter = "brightness(1.5) contrast(2)";

      mainCtx.drawImage(buffer.elt, 0, 0);
      mainCtx.restore();

      // Inicializa partículas
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push(new Particle());
      }

      // Eventos del mouse
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
      if (!isActive) return;

      // Limpia los canvas
      p.clear();
      buffer.clear();

      // Actualiza y dibuja partículas
      for (const particle of particles) {
        const radius = particle.update();
        particle.draw(buffer, radius);
      }

      // Dibuja el fondo
      p.background(0);
      p.push();
      p.blendMode(p.SCREEN);
      p.image(buffer, 0, 0);
      p.blendMode(p.BLEND);
      p.pop();
    };

    // Manejo de resize
    p.windowResized = () => {
      if (size.width !== p.width || size.height !== p.height) {
        p.resizeCanvas(size.width, size.height);

        // Recrea el buffer con el nuevo tamaño
        buffer = p.createGraphics(size.width, size.height);
        buffer.drawingContext.globalCompositeOperation = "lighter";

        // Reposiciona las partículas
        particles.forEach((particle) => particle.reset());
      }
    };
  }
);
