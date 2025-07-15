import React, { useState } from "react";
import background from "../assets/page_skill.jpg";
import cIcon from "../assets/c.png";
import cppIcon from "../assets/cpp.png";
import htmlIcon from "../assets/html.png";
import cssIcon from "../assets/CSS.png";
import jsIcon from "../assets/js.png";
import nodeIcon from "../assets/node.png";
import "./SkillsPage.css";

const SkillsPage = () => {
  const [hoverText, setHoverText] = useState("");

  return (
    <div
      className="skills-page"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h1 className="neon-title">Skills</h1>

      <div className="skills-container">
        <div className="skills-row">
          <img
            src={cIcon}
            alt="C"
            className="skill-icon"
            onMouseEnter={() => setHoverText("C")}
            onMouseLeave={() => setHoverText("")}
          />
          <img
            src={cppIcon}
            alt="C++"
            className="skill-icon"
            onMouseEnter={() => setHoverText("C++")}
            onMouseLeave={() => setHoverText("")}
          />
        </div>
        <div className="skills-row">
          <img
            src={htmlIcon}
            alt="HTML"
            className="skill-icon"
            onMouseEnter={() => setHoverText("HTML")}
            onMouseLeave={() => setHoverText("")}
          />
          <img
            src={cssIcon}
            alt="CSS"
            className="skill-icon"
            onMouseEnter={() => setHoverText("CSS")}
            onMouseLeave={() => setHoverText("")}
          />
        </div>
        <div className="skills-row">
          <img
            src={jsIcon}
            alt="JavaScript"
            className="skill-icon"
            onMouseEnter={() => setHoverText("JavaScript")}
            onMouseLeave={() => setHoverText("")}
          />
          <img
            src={nodeIcon}
            alt="Node.js"
            className="skill-icon"
            onMouseEnter={() => setHoverText("Node.js")}
            onMouseLeave={() => setHoverText("")}
          />
        </div>
      </div>

      {/* Hover text at bottom-right */}
      {hoverText && <div className="skills-hover-text">{hoverText}</div>}
    </div>
  );
};

export default SkillsPage;
