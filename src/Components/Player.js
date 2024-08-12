class Player {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.keysPressed = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };
  }

  // Update player's position based on keys pressed
  update() {
    this.move();
  }

  // Handle movement
  move() {
    if (this.keysPressed.ArrowUp) this.y -= this.speed;
    if (this.keysPressed.ArrowDown) this.y += this.speed;
    if (this.keysPressed.ArrowLeft) this.x -= this.speed;
    if (this.keysPressed.ArrowRight) this.x += this.speed;
  }

  // Draw player on the canvas
  draw(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // Handle key down events
  handleKeyDown(event) {
    if (event.key in this.keysPressed) {
      this.keysPressed[event.key] = true;
    }
  }

  // Handle key up events
  handleKeyUp(event) {
    if (event.key in this.keysPressed) {
      this.keysPressed[event.key] = false;
    }
  }
}

export default Player;
