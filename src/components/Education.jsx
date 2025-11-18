import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaCertificate } from "react-icons/fa";
import "./styles/Education.css";

const educationData = [
  {
    period: "2023–2027",
    institution: "Koneru Lakshmiah Education Foundation",
    course: "B.Tech, Computer Science & Engineering",
    location: "Vijayawada, Andhra Pradesh",
    logo: "kl.png",
    details: "Pursuing specialization in Cloud Infrastructure and Design.",
    achievements: ["CGPA: 9.41"],
  },
  {
    period: "2021–2023",
    institution: "Narayana Junior College",
    course: "Intermediate – MPC (Maths, Physics, Chemistry)",
    location: "Andhra Pradesh",
    logo: "narayana.png",
    details: "Board of Intermediate Education",
    achievements: ["Percentage : 96%"],
  },
  {
    period: "2020–2021",
    institution: "Viswabharathi E.M High School",
    course: "SSC (10th Grade)",
    location: "Andhra Pradesh",
    logo: "school.png",
    details: "Scored 98% – AP State Board",
  },
];

function Education() {
  return (
    <section className="education-section" aria-label="Education Timeline">
      <h2 className="education-title">Education</h2>
      <div className="education-status">
        <h3 className="current-status">
          Currently pursuing B.Tech in Computer Science & Engineering
        </h3>
      </div>
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {educationData.map((edu, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-period">
                <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
                {edu.period}
              </div>
              <div className="timeline-info">
                <div className="institution-logo">
                  <img
                    src={edu.logo || "/default-school-icon.svg"}
                    alt={edu.institution}
                  />
                </div>
                <div className="institution-details">
                  <h4>{edu.course}</h4>
                  <h5>{edu.institution}</h5>
                  <p>{edu.details}</p>
                  {edu.achievements?.length > 0 && (
                    <>
                      {edu.achievements.map((item, i) => (
                        <p key={i} className="achievement">
                          <FaCertificate style={{ marginRight: "0.4rem" }} />
                          {item}
                        </p>
                      ))}
                    </>
                  )}
                  <p className="location">
                    <FaMapMarkerAlt style={{ marginRight: "0.3rem" }} />
                    {edu.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;
