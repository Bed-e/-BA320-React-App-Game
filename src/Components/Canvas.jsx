import React, { useRef, useEffect } from "react";
import PlayerRectangle from "./PlayerRectangle";
import "./CanvasStyle.css";

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;
  }, []);

  return (
    <div className="gameCanvas">
      <canvas ref={canvasRef} />
      <PlayerRectangle canvasRef={canvasRef} />
    </div>
  );
};

export default Canvas;
