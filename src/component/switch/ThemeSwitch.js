import React from 'react';
import "./themeSwitch.css"


const ThemeSwitch = ({handleTheme, themes}) =>{
    
    return (
      <div className="theme-switch-container">
        <header>
          <span className="switch-numbers-container">
            <p className="switch-numbers">1</p>
            <p className="switch-numbers">2</p>
            <p className="switch-numbers">3</p>
          </span>
          <div className="theme-header-container">
            <div className="calc-title">
              <h1>calc</h1>
            </div>
            <div class="switch-wrapper">
              <div className='theme-title-container'>
                <p className="theme-title">THEME</p>
              </div>
              <div className="switch-container">
                <div
                  className={`blue-switch switch ${
                    themes === "blue" ? "" : "inactiveButton"
                  }`}
                  onClick={(e) => handleTheme(e, "blue")}
                  value="light"
                ></div>
                <div
                  className={`white-switch switch ${
                    themes === "white" ? "" : "inactiveButton"
                  }`}
                  onClick={(e) => handleTheme(e, "white")}
                  value="dark"
                ></div>
                <div
                  className={`purple-switch switch ${
                    themes === "purple" ? "" : "inactiveButton"
                  }`}
                  onClick={(e) => handleTheme(e, "purple")}
                  value="other"
                ></div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
}

export default ThemeSwitch;