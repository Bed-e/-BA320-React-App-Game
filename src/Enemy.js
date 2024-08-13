class Enemy {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.velocity = { x: 0, y: 0 };
    this.damping = 0.99; // Damping to maintain momentum
    this.turnRate = 0.04; // Slower turn rate for gradual direction change
    this.acceleration = 0.1; // Rate at which speed builds when accelerating
    this.maxSpeed = this.speed * 2.5; // Allow for higher max speed when accelerating
  }

  moveToward(player, enemies) {
    const attractionForce = this.calculateAttraction(player);
    const separationForce = this.calculateSeparation(enemies);

    // Apply the separation force directly to velocity
    this.velocity.x += separationForce.x;
    this.velocity.y += separationForce.y;

    // Gradually adjust velocity direction towards the attraction force
    this.velocity.x =
      this.velocity.x * (1 - this.turnRate) + attractionForce.x * this.turnRate;
    this.velocity.y =
      this.velocity.y * (1 - this.turnRate) + attractionForce.y * this.turnRate;

    // Apply damping to simulate inertia
    this.velocity.x *= this.damping;
    this.velocity.y *= this.damping;

    // Apply acceleration when moving in the current direction
    const velocityMagnitude = Math.sqrt(
      this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y
    );
    if (velocityMagnitude < this.maxSpeed) {
      this.velocity.x +=
        (this.velocity.x / velocityMagnitude) * this.acceleration;
      this.velocity.y +=
        (this.velocity.y / velocityMagnitude) * this.acceleration;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  calculateAttraction(player) {
    const dx = player.x + player.width / 2 - (this.x + this.size / 2);
    const dy = player.y + player.height / 2 - (this.y + this.size / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    return {
      x: (dx / distance) * this.speed,
      y: (dy / distance) * this.speed,
    };
  }

  calculateSeparation(enemies) {
    let separationX = 0;
    let separationY = 0;
    const separationDistance = this.size * 2.5;

    enemies.forEach((other) => {
      if (other !== this) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < separationDistance) {
          const force = (this.size * this.size) / (distance * distance);
          separationX += (dx / distance) * force;
          separationY += (dy / distance) * force;
        }
      }
    });

    return { x: separationX, y: separationY };
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.size / 2);
    ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2);
    ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
    ctx.closePath();
    ctx.fill();
  }
}

export default Enemy;
