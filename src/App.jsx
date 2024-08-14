import Canvas from "./Components/Canvas";
import ToggleFullscreenButton from "./Components/ToggleFullscreenButton";
import "./App.css";
import TopTitle from "./Components/TopTitle";
import Timer from "./Components/Timer";
import { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 0.01);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="page">
      <TopTitle />
      <Timer time={time} isPlaying={isPlaying} />
      {/* Pass isPlaying to Timer component */}
      <Canvas setTime={setTime} setIsPlaying={setIsPlaying} />
      <ToggleFullscreenButton />
    </div>
  );
}

export default App;
