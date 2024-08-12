import React, { useEffect, useState } from "react";
import Weapon1 from "./Weapon1";

const PlayerRectangle = ({ canvasRef }) => {
  const [rectPosition, setRectPosition] = useState({ x: 10, y: 10 });
  const [keysPressed, setKeysPressed] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });
  const [lastDirection, setLastDirection] = useState("right"); // Track last direction
  const [isWeaponActive, setIsWeaponActive] = useState(false);

  const moveSpeed = 2; // Base speed

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeysPressed((prevKeysPressed) => ({
        ...prevKeysPressed,
        [event.key]: true,
      }));

      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        setLastDirection(event.key); // Update last direction
      }

      if (event.key === " ") {
        setIsWeaponActive(true);
        setTimeout(() => setIsWeaponActive(false), 500); // Weapon active for 0.5 seconds
      }
    };

    const handleKeyUp = (event) => {
      setKeysPressed((prevKeysPressed) => ({
        ...prevKeysPressed,
        [event.key]: false,
      }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const moveRectangle = () => {
      setRectPosition((prevPosition) => {
        let { x, y } = prevPosition;

        // Check for diagonal movement
        const movingDiagonally =
          (keysPressed.ArrowUp || keysPressed.ArrowDown) &&
          (keysPressed.ArrowLeft || keysPressed.ArrowRight);

        // Adjust speed if moving diagonally
        const adjustedSpeed = movingDiagonally
          ? moveSpeed / Math.sqrt(2)
          : moveSpeed;

        if (keysPressed.ArrowUp) {
          y -= adjustedSpeed;
        }
        if (keysPressed.ArrowDown) {
          y += adjustedSpeed;
        }
        if (keysPressed.ArrowLeft) {
          x -= adjustedSpeed;
        }
        if (keysPressed.ArrowRight) {
          x += adjustedSpeed;
        }

        return { x, y };
      });
    };

    const animationFrameId = requestAnimationFrame(moveRectangle);

    return () => cancelAnimationFrame(animationFrameId);
  }, [rectPosition, keysPressed]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.fillStyle = "green";
      ctx.fillRect(rectPosition.x, rectPosition.y, 20, 20);
    }
  }, [rectPosition, canvasRef]);

  return (
    <>
      {isWeaponActive && (
        <Weapon1
          canvasRef={canvasRef}
          rectPosition={rectPosition}
          direction={lastDirection}
        />
      )}
    </>
  );
};

export default PlayerRectangle;
