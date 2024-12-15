import React, { useEffect, useState } from "react";
import Home from "./components/Home/Home";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    dragonBall: [],
    sailorMoon: [],
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const dragonBallUrl = `https://api.jikan.moe/v4/anime?q=dragon%20ball&start_date=1900-01-01&end_date=1999-12-31`;
        const sailorMoonUrl = `https://api.jikan.moe/v4/anime?q=sailor%20moon&start_date=1900-01-01&end_date=1999-12-31`;

        const dragonBallRes = await fetch(dragonBallUrl);
        const dragonBall = await dragonBallRes.json();

        const sailorMoonRes = await fetch(sailorMoonUrl);
        const sailorMoon = await sailorMoonRes.json();

        setData({
          dragonBall: dragonBall.data || [],
          sailorMoon: sailorMoon.data || [],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Home
          dragonBallData={data.dragonBall}
          sailorMoonData={data.sailorMoon}
        />
      )}
    </div>
  );
};

export default App;