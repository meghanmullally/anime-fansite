import React from "react";
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="window">
      <div className="title-bar">
        <span>Microsoft Internet Explorer</span>
        <div className="title-bar-buttons">
          <button className="title-bar-button">_</button>
          <button className="title-bar-button">□</button>
          <button className="title-bar-button">X</button>
        </div>
      </div>
      <div className="toolbar">
        <div className="toolbar-button">
          <div
            className="toolbar-icon"
            style={{
              backgroundImage: `url('/assets/windows95_icons/back.png')`,
            }}
          ></div>
          Back
        </div>
        <div className="toolbar-button">
          <div
            className="toolbar-icon"
            style={{
              backgroundImage: `url('/assets/windows95_icons/forward.png')`,
            }}
          ></div>
          Forward
        </div>
        <div className="toolbar-button">
          <div
            className="toolbar-icon"
            style={{
              backgroundImage: `url('public/assets/windows95_icons/file.png')`,
            }}
          ></div>
          Refresh
        </div>
        <div className="toolbar-button">
          <div
            className="toolbar-icon"
            style={{
              backgroundImage: `url('/public/assets/windows95_icons/home.png')`,
            }}
          ></div>
          Home
        </div>
        <input
          type="text"
          className="address-bar"
          placeholder="https://www.anime-fansite.com"
        />
      </div>
      <div className="content">{children}</div>
      <div className="status-bar">
        <span className="status-text"><img src="public/assets/Ico/Webpage.ico" className="status-icon-img"/>Done</span>
        <span className="status-icon"><img className="status-icon-img" src="/public/assets/windows95_icons/Earth (16 colors).ico"/>Internet</span>
      </div>
    </div>
  );
};

export default Layout;