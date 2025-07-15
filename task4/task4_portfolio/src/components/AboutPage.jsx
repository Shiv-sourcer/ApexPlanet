import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/page_2.jpg";
import homeIcon from "../assets/home.png";
import aboutIcon from "../assets/about.png";
import skillsIcon from "../assets/skills.png";
import projectsIcon from "../assets/projects2.png";
import contactIcon from "../assets/contact.png";
import "./AboutPage.css";

const AboutPage = () => {
  const [hoverText, setHoverText] = useState("");
  const navigate = useNavigate();

  return (
    <div
      className="about-page"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* ICONS with hover handlers */}
      <div
        className="icon-wrapper home-icon"
        onMouseEnter={() => setHoverText("Home")}
        onMouseLeave={() => setHoverText("")}
      >
        <img src={homeIcon} alt="Home" className="icon" />
      </div>

      <div
        className="icon-wrapper about-icon"
        onMouseEnter={() => setHoverText("About")}
        onMouseLeave={() => setHoverText("")}
      >
        <img src={aboutIcon} alt="About" className="icon" />
      </div>

      <div
        className="icon-wrapper skills-icon"
        onMouseEnter={() => setHoverText("Skills")}
        onMouseLeave={() => setHoverText("")}
        onClick={() => navigate("/skills")} // ✅ navigates to /skills
      >
        <img src={skillsIcon} alt="Skills" className="icon" />
      </div>

      <div
        className="icon-wrapper projects-icon"
        onMouseEnter={() => setHoverText("Projects")}
        onMouseLeave={() => setHoverText("")}
      >
        <img src={projectsIcon} alt="Projects" className="icon" />
      </div>

      <div
        className="icon-wrapper contact-icon"
        onMouseEnter={() => setHoverText("Contact")}
        onMouseLeave={() => setHoverText("")}
      >
        <img src={contactIcon} alt="Contact" className="icon" />
      </div>

      {/* Hover text at bottom-left corner */}
      {hoverText && <div className="corner-text">{hoverText}</div>}
    </div>
  );
};

export default AboutPage;
