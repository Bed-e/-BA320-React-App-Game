import React from "react";

function Description({ city, weather }) {
  return (
    <div>
      <br></br>
      Resist the destruction of {city} for as long as you can by using the arrow
      keys to avoid the enemies.
      <br />
      The background changes with the weather in your area and time of day! Your
      current weather:
      <strong> {weather}</strong>
      <br />
      if you meet the fate of the <strong>RED STORM</strong>, but want to give
      the saving thing another try, <strong>Refresh</strong> the page
      <br />
      Come back later when the weather is different or when it's a different
      time of day!
      <br />
      this site does <strong>not</strong> store your location data
    </div>
  );
}

export default Description;
