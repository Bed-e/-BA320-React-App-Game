import React, { useEffect } from "react";

const Weapon1 = ({ canvasRef, rectPosition, direction }) => {
  useEffect(() => {
    let startTime = null;

    const drawSword = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Calculate the current rotation angle (90 degrees over 500ms)
      const rotationAngle = Math.min((90 * elapsed) / 500, 90);

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.save(); // Save the current state of the canvas

        // Translate to the player's position
        ctx.translate(rectPosition.x + 10, rectPosition.y + 10);

        // Rotate the canvas context based on the direction and current angle
        let initialAngle = 0;
        switch (direction) {
          case "ArrowUp":
            initialAngle = -90;
            break;
          case "ArrowDown":
            initialAngle = 90;
            break;
          case "ArrowLeft":
            initialAngle = 180;
            break;
          case "ArrowRight":
            initialAngle = 0;
            break;
          default:
            break;
        }
        ctx.rotate((initialAngle + rotationAngle) * (Math.PI / 180));

        // Draw the sword
        ctx.fillStyle = "red";
        ctx.fillRect(0, -5, 70, 10); // The sword rectangle

        ctx.restore(); // Restore the canvas state to what it was before rotating
      }

      if (elapsed < 500) {
        requestAnimationFrame(drawSword); // Continue the animation
      }
    };

    requestAnimationFrame(drawSword); // Start the animation
  }, [canvasRef, rectPosition, direction]);

  return null; // This component doesn't render anything on its own
};

export default Weapon1;
