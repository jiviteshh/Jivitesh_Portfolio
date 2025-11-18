import "./styles/Skills.css";

function Skills() {
  const categories = [
    {
      title: "Web Development",
      skills: [
        { name: "HTML", icon: "/html-5.svg", desc: "Markup language for web structure" },
        { name: "CSS", icon: "/css-3.svg", desc: "Styling language for web pages" },
        { name: "JavaScript", icon: "/js.svg", desc: "Scripting language for dynamic content" },
        { name: "React.js", icon: "/react.svg", desc: "JavaScript library for building UI" },
        { name: "Django", icon: "/django.png", desc: "High-level Python web framework" },
        { name: "Flask", icon: "/flask.png", desc: "Lightweight Python backend framework" },
        
      ],
    },

    {
      title: "Programming Languages",
      skills: [
        { name: "C", icon: "/c.png", desc: "Procedural programming language" },
        { name: "Java", icon: "/java.svg", desc: "Object-oriented programming language" },
        { name: "Python", icon: "/python.svg", desc: "High-level, versatile language" },
        { name: "JavaScript", icon: "/js.svg", desc: "Language for frontend & backend" },
        { name: "SQL", icon: "/sql-database-generic.svg", desc: "Database querying language" },
      ],
    },

    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", icon: "/aws.png", desc: "Cloud services for scalable systems" },
        { name: "Microsoft Azure", icon: "/azure.png", desc: "Cloud platform & services" },
        { name: "Docker", icon: "/docker.png", desc: "Containerization for applications" },
        { name: "Git", icon: "/git.png", desc: "Version control and collaboration" },
        { name: "REST APIs", icon: "/api.png", desc: "API design and backend integration" },
      ],
    },
    {
      title: "Soft Skills",
      skills: [
        { name: "Problem Solving", icon: "/ps.png", desc: "Analyzing and resolving issues" },
        { name: "Communication", icon: "/commu.png", desc: "Clear and effective interaction" },
        { name: "Team Management", icon: "/teamwork.svg", desc: "Leading and coordinating teams" },
      ],
    },
  ];

  return (
    <section className="skills-section">
      <h2 className="skills-title">Skills</h2>
      <div className="skills-container">
        {categories.map((category, i) => (
          <div key={i} className="skill-category">
            <h3 className="category-title">{category.title}</h3>

            <div className="skills-grid">
              {category.skills.map((skill, index) => (
                <div
                  key={index}
                  className="skill-card"
                  tabIndex={0}
                  aria-label={`${skill.name} skill: ${skill.desc}`}
                >
                  <div className="skill-icon">
                    <img src={skill.icon || "/placeholder.svg"} alt={`${skill.name} icon`} />
                  </div>

                  <div className="skill-info">
                    <h4 className="skill-name">{skill.name}</h4>
                    <p className="skill-desc">{skill.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
