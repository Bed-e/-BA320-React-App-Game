import Canvas from "./Components/Canvas";
import ToggleFullscreenButton from "./Components/ToggleFullscreenButton";
import "./App.css";

function App() {
  return (
    <div className="page">
      <Canvas />
      <ToggleFullscreenButton />
    </div>
  );
}

export default App;
