import Player from "./Components/Player";
import Enemy from "./Enemy";

class GameLoop {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.player = new Player(400, 300, 20, 20, 2);
    this.enemies = [];
    this.time = 0;
    this.enemyCount = 1; // Initial number of enemies to add
    this.addEnemiesInterval = 10000; // 10 seconds in milliseconds
  }

  start() {
    window.addEventListener("keydown", (event) =>
      this.player.handleKeyDown(event)
    );
    window.addEventListener("keyup", (event) => this.player.handleKeyUp(event));
    this.update();
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.player.move();
    this.player.draw(this.ctx);

    this.enemies.forEach((enemy) => {
      enemy.moveToward(this.player, this.enemies);
      enemy.draw(this.ctx);
    });

    // Update game time
    this.time += 16.67; // Approximate time per frame at 60fps

    // Add enemies every 10 seconds
    if (this.time >= this.addEnemiesInterval) {
      this.addEnemies();
      this.time = 0; // Reset the timer
    }

    requestAnimationFrame(() => this.update());
  }

  addEnemies() {
    for (let i = 0; i < this.enemyCount; i++) {
      const position = this.getRandomOffScreenPosition();
      this.enemies.push(new Enemy(position.x, position.y, 20, 1));
    }

    // Increment enemy count every other time
    if (this.enemyCountIncremented) {
      this.enemyCount++;
    }
    this.enemyCountIncremented = !this.enemyCountIncremented; // Toggle incrementing flag
  }

  getRandomOffScreenPosition() {
    const edge = Math.floor(Math.random() * 4);
    let x, y;

    switch (edge) {
      case 0: // Top edge
        x = Math.random() * this.canvas.width;
        y = -20;
        break;
      case 1: // Right edge
        x = this.canvas.width + 20;
        y = Math.random() * this.canvas.height;
        break;
      case 2: // Bottom edge
        x = Math.random() * this.canvas.width;
        y = this.canvas.height + 20;
        break;
      case 3: // Left edge
        x = -20;
        y = Math.random() * this.canvas.height;
        break;
      default:
        x = -20;
        y = -20;
        break;
    }

    return { x, y };
  }
}

export default GameLoop;
