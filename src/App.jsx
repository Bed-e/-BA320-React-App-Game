import Canvas from "./Components/Canvas";
import ToggleFullscreenButton from "./Components/ToggleFullscreenButton";
import "./App.css";
import TopTitle from "./Components/TopTitle";

function App() {
  return (
    <div className="page">
      <TopTitle />
      <Canvas />
      <ToggleFullscreenButton />
    </div>
  );
}

export default App;
