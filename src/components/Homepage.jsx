import React from "react";
import "./styles/Homepage.css";

const Homepage = () => {
  return (
    <section id="home" className="home-section">
      <div className="content-left">
        <h2 className="welcome-text">Welcome to My Digital Universe</h2>
        <h3 className="myself-text">Where Innovation Meets Engineering</h3>

        <div className="name-section">
          <h2 className="name-text">
            {"Jivitesh".split("").map((char, index) => (
              <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                {char}
              </span>
            ))}
          </h2>

          <p className="role-text">
            Undergraduate Computer Science Student • Aspiring Software Engineer & Cloud Enthusiast
          </p>
        </div>
      </div>

      <div className="content-right">
        <img src="profilefinal.png" alt="Profile" className="profile-image" />

        <a
          href="https://drive.google.com/file/d/1jY3emaKQUicsj7mUdjghlI0jzwiroF4s/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="resume-link"
        >
          View Resume
        </a>
      </div>
    </section>
  );
};

export default Homepage;
