import React from "react";

function Description({ city, weather }) {
  return (
    <ul>
      <li>{city} is under attack!</li>
      <li>
        Protect {city} from the <strong>RED STORM</strong> for as long as you
        can by using the <em>arrow keys </em>to avoid the enemies.
      </li>
      <li>
        The background changes with the weather in your area and time of day!
        Your current weather:
        <strong> {weather}</strong>
      </li>

      <li>
        if you meet the fate of the <strong>RED STORM</strong>,
        <strong> Refresh</strong> the page to try again
      </li>
      <li>
        Come back later when the weather is different or when it's a different
        time of day!
      </li>
      <li>
        this site does <strong>not</strong> store your location data
      </li>
    </ul>
  );
}

export default Description;
