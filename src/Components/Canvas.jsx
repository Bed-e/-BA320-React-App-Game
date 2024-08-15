import React, { useRef, useEffect } from "react";
import GameLoop from "../GameLoop";
import "./CanvasStyle.css";

// setTime={setTime}
// setIsPlaying={setIsPlaying}
// isPlaying={isPlaying}

const Canvas = ({ weather, setTime, setIsPlaying, isPlaying }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;

    const gameLoop = new GameLoop(canvas, setIsPlaying, isPlaying);
    gameLoop.start();
  }, [setIsPlaying, isPlaying]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={isPlaying ? "gameCanvasAlive" : "gameCanvasDead"}
      />
    </>
  );
};

export default Canvas;
