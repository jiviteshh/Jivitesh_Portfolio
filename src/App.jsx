import React from "react";
import "./App.css";
import Home from "./components/Homepage";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import About from "./components/About";
import FeedBack from "./components/Feedback";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="portfolio">
      <header>
        <div className="container header-container">
          <h1 className="portfolio-title">PORTFOLIO</h1>
          <nav className="main-nav">
            {[ 
              { name: "Home", path: "#home" },
              { name: "About", path: "#about" },
              { name: "Education", path: "#education" },
              { name: "Skills", path: "#skills" },
              { name: "Projects", path: "#projects" },
              { name: "Certifications", path: "#certifications" },
              { name: "Contact", path: "#contact" },
            ].map(({ name, path }) => (
              <a key={name} href={path} className="nav-link">
                {name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="container">
        <Home /> 
        
        <section id="about" className="section"><About /></section>
        <section id="education" className="section"><Education /></section>
        <section id="skills" className="section"><Skills /></section>
        <section id="projects" className="section"><Projects /></section>
        <section id="certifications" className="section"><Certifications /></section>
        <section id="contact" className="section"><Contact /></section>
        <Footer/>
     

      </main>
    </div>
  );
}

export default App;
