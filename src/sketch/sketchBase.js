export default class SketchBase {
  constructor(title, interaction, Sketch) {
    this.title = title;
    this.Sketch = Sketch;
    this.interaction = interaction;
  }
}

export const interactionMove = {
  type: "move",
  isInteractive: true,
};

export const interactionPressed = {
  type: "press",
  isInteractive: true,
};

export const hoverInteraction = {
  type: "hover",
  isInteractive: true,
};
export const nonInteraction = {
  isInteractive: false,
};
