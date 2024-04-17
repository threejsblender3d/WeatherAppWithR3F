import { Suspense, useState } from "react";
import { Center, Html, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Backdrop from "./components/Backdrop.jsx";

import classes from "./App.module.css";

export default function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  function closewindowHandler() {
    setIsWindowOpen(true);
  }

  const apiKey = "7a11ff201910162a879e7aa32d259914";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  async function getWeatherData() {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data) {
      setWeatherData(data);
    }

    closewindowHandler();
  }

  const loadingScreen = (
    <Center>
      <Text3D
        font="./fonts/helvetiker_regular.typeface.json"
        size={0.75}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        Loading weather models ....
        <meshNormalMaterial />
      </Text3D>
    </Center>
  );

  return (
    <>
      {!isWindowOpen && (
        <>
          <Backdrop />
          <div className={classes.searchBox}>
            <div className={classes.control}>
              <h1>3D WEATHER APP</h1>
              <p>Which city do you want to check for the current weather?</p>
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="CITY NAME ?"
                type="text"
              />
              <button onClick={getWeatherData}>Check weather</button>
            </div>
          </div>
        </>
      )}

      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [4, 2.5, 10],
        }}
      >
        {weatherData && (
          <Suspense fallback={loadingScreen}>
            <Experience location={location} weather={weatherData} />
          </Suspense>
        )}
      </Canvas>
    </>
  );
}
