// src/components/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/page_1.png';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage" style={{ backgroundImage: `url(${background})` }}>
      <h1 className="name-overlay">SHIVANSH CHOUDHARY</h1>
      <p className="tagline">
          Computer Science Engineering student with front-end experience and growing full-stack interest. Skilled in HTML, CSS, JavaScript, Bootstrap, Node.js, and React. Proficient in MySQL, PostgreSQL, C, and C++. Eager to build scalable web apps and deepen cloud & backend skills.
        </p>
      <button className="view-btn" onClick={() => navigate("/about")}>
        View
      </button>
    </div>
  );
};

export default HomePage;
