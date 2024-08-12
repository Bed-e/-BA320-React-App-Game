import Player from "./Components/Player";
import Enemy from "./Enemy";

class GameLoop {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.player = new Player(10, 10, 20, 20, 2);
    this.enemies = [
      new Enemy(800, 100, 20, 1),
      new Enemy(-10, 400, 20, 1), // Size is 20 to match the player’s height
      // Add more enemies here if needed
    ];
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
      enemy.moveToward(this.player);
      enemy.draw(this.ctx);
    });

    requestAnimationFrame(() => this.update());
  }
}

export default GameLoop;
