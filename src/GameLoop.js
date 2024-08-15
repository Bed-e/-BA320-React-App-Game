import Player from "./Components/Player";
import Enemy from "./Enemy";

class GameLoop {
  constructor(canvas, setIsPlaying, isPlaying) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.player = new Player(400, 300, 20, 20, 2);
    this.enemies = [new Enemy(1000, 1000, 20, 1)];
    this.time = 0;
    this.isPlaying = isPlaying;
    this.enemyCount = 1; // Initial number of enemies to add
    this.addEnemiesInterval = 10000; // 10 seconds in milliseconds
    this.setIsPlaying = setIsPlaying;
    this.lastTimestamp = performance.now(); // Initial timestamp
    this.gameSpeed = 2; // Default game speed
  }

  start() {
    window.addEventListener("keydown", (event) =>
      this.player.handleKeyDown(event)
    );
    window.addEventListener("keyup", (event) => this.player.handleKeyUp(event));
    this.update();
  }

  update() {
    // Calculate delta time and adjust for game speed
    const currentTimestamp = performance.now();
    const deltaTime = (currentTimestamp - this.lastTimestamp) * this.gameSpeed;
    this.lastTimestamp = currentTimestamp;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw player
    this.player.move(deltaTime);
    this.player.draw(this.ctx);

    // Update and draw enemies
    this.enemies.forEach((enemy) => {
      enemy.moveToward(this.player, this.enemies, deltaTime);
      enemy.draw(this.ctx);
    });

    // Collision detection
    this.enemies.forEach((enemy) => {
      if (this.checkCollision(enemy, this.player)) {
        this.setIsPlaying(false); // Toggle isPlaying to false when collision occurs
      }
    });

    // Update game time
    this.time += deltaTime; // Use deltaTime for more accurate timing

    // Add enemies every 10 seconds
    if (this.time >= this.addEnemiesInterval) {
      this.addEnemies();
      this.time = 0; // Reset the timer
    }

    if (this.isPlaying) {
      requestAnimationFrame(() => this.update());
    }
  }

  checkCollision(enemy, player) {
    const dx = enemy.x - (player.x + player.width / 2);
    const dy = enemy.y - (player.y + player.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < enemy.size / 2 + player.width / 2;
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
