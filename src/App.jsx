import Canvas from "./Components/Canvas";
import ToggleFullscreenButton from "./Components/ToggleFullscreenButton";
import "./App.css";
import TopTitle from "./Components/TopTitle";
import Timer from "./Components/Timer";
import { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState(0); // Initialize state for time

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 0.01); // Increment time every 100ms
    }, 10);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="page">
      <TopTitle />
      <Timer time={time} /> {/* Pass the time state to Timer component */}
      <Canvas setTime={setTime} />{" "}
      {/* Pass setTime to Canvas to control time from the game loop */}
      <ToggleFullscreenButton />
    </div>
  );
}

export default App;
