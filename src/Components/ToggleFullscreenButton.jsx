import React, { useState, useEffect } from "react";
import "./ToggleFullscreenButtonStyle.css";

const ToggleFullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <button onClick={toggleFullscreen} className="fullscreen-button">
      {isFullscreen ? (
        <span className="icon icon-exit">↘</span>
      ) : (
        <span className="icon icon-enter">↗</span>
      )}
    </button>
  );
};

export default ToggleFullscreenButton;
