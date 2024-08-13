import React from "react";

const Timer = ({ time }) => {
  return <div>Time: {time.toFixed(2)} seconds</div>;
};

export default Timer;
