import { FaEnvelope, FaLinkedin, FaGithub, FaLocationArrow, FaPhone } from "react-icons/fa";
import "./styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Contact Info */}
        <div className="footer-contact">
          <div>
            <FaEnvelope className="footer-icon" />
            <a href="mailto:jivinaragam@gmail.com">jivinaragam@gmail.com</a>
          </div>

          <div>
            <FaLocationArrow className="footer-icon" />
            Andhra Pradesh, India
          </div>
        </div>

        {/* Social Links */}
        <div className="footer-socials">
          <a
            href="https://github.com/jiviteshh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/naragam-jivitesh-71a4b8313/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a href="mailto:jivinaragam@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>

        {/* Copyright */}
        <p className="footer-copy">© {new Date().getFullYear()} Jivitesh. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
