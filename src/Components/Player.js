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
    let moveX = 0;
    let moveY = 0;

    if (this.keysPressed.ArrowUp) moveY -= 1;
    if (this.keysPressed.ArrowDown) moveY += 1;
    if (this.keysPressed.ArrowLeft) moveX -= 1;
    if (this.keysPressed.ArrowRight) moveX += 1;

    // If moving diagonally, normalize speed by dividing by sqrt(2)
    const isDiagonal = moveX !== 0 && moveY !== 0;
    const speedAdjustment = isDiagonal ? 1 / Math.sqrt(2) : 1;

    this.x += moveX * this.speed * speedAdjustment;
    this.y += moveY * this.speed * speedAdjustment;
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
