import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import DragonBall from "../DragonBall/DragonBall";
import SailorMoon from "../SailorMoon/SailorMoon";
import './Home.css';

const Home = ({ dragonBallData = [], sailorMoonData = [] }) => {
  const [activeTab, setActiveTab] = useState("DragonBall");
  const [currentTime, setCurrentTime] = useState("");


  //Time updates every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const mins = now.getMinutes().toString().padStart(2, "0");
      const period = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
  
      // Convert to 12-hour format
      hours = hours % 12 || 12;
  
      setCurrentTime(`${hours}:${mins} ${period}`);
    };
  
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="home">
      <div className="taskbar">
        <div className="start">
          <button className="start-button">
            <span
              className="windows-icon"
              style={{ backgroundImage: `url('/assets/windows95_icons/Windows logo (without text).ico')` }}
            ></span>
            Start
          </button>
        </div>
        <button
          className={`taskbar-item ${activeTab === "DragonBall" ? "active" : ""}`}
          onClick={() => setActiveTab("DragonBall")}
        >
          <span
            className="taskbar-icon"
            style={{
              backgroundImage: `url('/assets/windows95_icons/ie_icon.png')`,
            }}
          ></span>
          Dragon Ball
        </button>
        <button
          className={`taskbar-item ${activeTab === "SailorMoon" ? "active" : ""}`}
          onClick={() => setActiveTab("SailorMoon")}
        >
          <span
            className="taskbar-icon"
            style={{
              backgroundImage: `url('/assets/windows95_icons/ie_icon.png')`,
            }}
          ></span>
          Sailor Moon
        </button>
        <div className="clock">
          {currentTime}</div>
      </div>
      <div>
        <Layout>
          {activeTab === "DragonBall" && <DragonBall data={dragonBallData} />}
          {activeTab === "SailorMoon" && <SailorMoon data={sailorMoonData} />}
        </Layout>
      </div>
    </div>
  );
};

export default Home;