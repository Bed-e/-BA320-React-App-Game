import React from "react";

function Timer({ time, isPlaying, className }) {
  return (
    <div className={`timer ${className}`}>
      {isPlaying
        ? `Time: ${time.toFixed(2)}s`
        : `YOU LASTED: ${time.toFixed(2)}s`}
    </div>
  );
}

export default Timer;
