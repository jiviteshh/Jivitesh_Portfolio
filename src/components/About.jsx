import React from 'react';
import './styles/About.css'; 

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">

        <div className="about-left">
          <h2 className="about-title">About Me</h2>

          <p className="about-text">
            I’m <strong>Jivitesh</strong>, an undergraduate student pursuing 
            <strong> B.Tech in Computer Science</strong> with a strong interest in software development and cloud technologies.
            <br /><br />
            I enjoy learning and working with <strong>Java, Python, JavaScript, React, Flask, and cloud platforms</strong>. 
            My current focus is on building clean, efficient applications while improving my 
            understanding of <strong>DSA, backend engineering, and scalable system design</strong>.
            <br /><br />
            I’m passionate about continuous learning and aim to grow into a well-rounded 
            software engineer who builds reliable and meaningful solutions.
          </p>
        </div>

        {/* Side Buttons */}
        <div className="about-right">
          <a
            href="https://www.linkedin.com/in/naragam-jivitesh-71a4b8313"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-link"
          >
            <button className="linkedin-button">LinkedIn Profile</button>
          </a>

          <a href="/Resume_Jivi.pdf" download>
            <button className="download-resume">Download Resume</button>
          </a>
        </div>

      </div>
    </section>
  );
};

export default About;
