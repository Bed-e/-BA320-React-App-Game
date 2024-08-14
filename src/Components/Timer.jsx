import React from "react";

const Timer = ({ time, isPlaying }) => {
  const displayTime = isPlaying ? time.toFixed(2) : time.toFixed(2);

  return <div>Time: {displayTime} seconds</div>;
};

export default Timer;
