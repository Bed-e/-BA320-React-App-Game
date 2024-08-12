class Enemy {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.maxSpeed = 2.5; // Maximum speed
    this.acceleration = 0.04; // Rate at which the enemy accelerates
    this.dampingThreshold = 0.1; // Threshold for applying damping
    this.dampingFactor = 0; // Damping factor to reduce velocity when turning
    this.velocityX = 0; // Velocity in the x direction
    this.velocityY = 0; // Velocity in the y direction
    this.lastDirectionX = 0; // Last direction in the x direction
    this.lastDirectionY = 0; // Last direction in the y direction
  }

  moveToward(player) {
    // Calculate center points
    const enemyCenterX = this.x + this.size / 2;
    const enemyCenterY = this.y - this.size / 2;

    const playerCenterX = player.x + player.width / 2;
    const playerCenterY = player.y + player.height / 2;

    // Calculate the direction towards the player
    const directionX = playerCenterX - enemyCenterX;
    const directionY = playerCenterY - enemyCenterY;
    const distance = Math.sqrt(
      directionX * directionX + directionY * directionY
    );

    if (distance > 0) {
      // Normalize the direction vector
      const normalizedDirectionX = directionX / distance;
      const normalizedDirectionY = directionY / distance;

      // Calculate the angular velocity (rate of change of direction)
      const dotProduct =
        normalizedDirectionX * this.lastDirectionX +
        normalizedDirectionY * this.lastDirectionY;
      const angularVelocity = 1 - dotProduct; // Simplified angular velocity calculation

      // Apply damping if angular velocity is above the threshold
      if (angularVelocity > this.dampingThreshold) {
        this.velocityX *= this.dampingFactor;
        this.velocityY *= this.dampingFactor;
      }

      // Accelerate towards the player
      this.velocityX += normalizedDirectionX * this.acceleration;
      this.velocityY += normalizedDirectionY * this.acceleration;

      // Limit the velocity to maxSpeed
      const velocityMagnitude = Math.sqrt(
        this.velocityX * this.velocityX + this.velocityY * this.velocityY
      );
      if (velocityMagnitude > this.maxSpeed) {
        this.velocityX = (this.velocityX / velocityMagnitude) * this.maxSpeed;
        this.velocityY = (this.velocityY / velocityMagnitude) * this.maxSpeed;
      }

      // Update position based on velocity
      this.x += this.velocityX;
      this.y += this.velocityY;

      // Update last direction
      this.lastDirectionX = normalizedDirectionX;
      this.lastDirectionY = normalizedDirectionY;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y); // Starting point (bottom-left corner)
    ctx.lineTo(this.x + this.size, this.y); // Bottom-right corner
    ctx.lineTo(this.x + this.size / 2, this.y - this.size); // Top point of the triangle
    ctx.closePath();
    ctx.fill();
  }
}

export default Enemy;
