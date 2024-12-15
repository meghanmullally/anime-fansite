import React, { useState } from "react";
import Layout from "../Layout/Layout";
import DragonBall from "../DragonBall/DragonBall";
import SailorMoon from "../SailorMoon/SailorMoon";
import './Home.css';

const Home = ({ dragonBallData = [], sailorMoonData = [] }) => {
  const [activeTab, setActiveTab] = useState("DragonBall");

  return (
    <div className="home">
      <div className="taskbar">
        <button
          className={`taskbar-item ${activeTab === "DragonBall" ? "active" : ""}`}
          onClick={() => setActiveTab("DragonBall")}
        >
          <span className="taskbar-icon" style={{ backgroundImage: `url('/public/assets/windows95_icons/tumblr_b2b2abdc67afa527d42638e8fda369dd_f4c1899a_1280.png')` }}></span>
          Dragon Ball
        </button>
        <button
          className={`taskbar-item ${activeTab === "SailorMoon" ? "active" : ""}`}
          onClick={() => setActiveTab("SailorMoon")}
        >
          <span className="taskbar-icon" style={{ backgroundImage: `url('/public/assets/windows95_icons/tumblr_b2b2abdc67afa527d42638e8fda369dd_f4c1899a_1280.png')` }}></span>
          Sailor Moon
        </button>
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