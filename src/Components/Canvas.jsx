import React, { useRef, useEffect } from "react";
import GameLoop from "../GameLoop";
import "./CanvasStyle.css";

const Canvas = ({ setIsPlaying }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;

    const gameLoop = new GameLoop(canvas, setIsPlaying);
    gameLoop.start();
  }, [setIsPlaying]);

  return <canvas ref={canvasRef} className="gameCanvas" />;
};

export default Canvas;
