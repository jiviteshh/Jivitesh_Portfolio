import "./styles/Projects.css";

function Projects() {
  const projects = [
    {
      icon: "/promptpress.png",
      title: "PromptPress - AI News Dashboard",
      description:
        "An AI-powered news summarization and analytics platform built using Flask, Cohere APIs, and Groq for real-time insights.",
      githubLink: "https://github.com/jiviteshh/Prompt_Press",
    },
    {
      icon: "/academic.png",
      title: "Smart Academic Resource Finder",
      description:
        "A smart assistant that helps students locate academic materials, resources, and references efficiently.",
      githubLink: "https://github.com/jiviteshh/Smart_Academic_ResourceFinder",
    },
    {
      icon: "/lostfound.png",
      title: "Lost & Found Portal",
      description:
        "A secure full-stack portal with authentication for managing lost and found items inside institutions.",
      githubLink: "https://github.com/jiviteshh/Lost_Found_Portal",
    },
    {
      icon: "/vacant.png",
      title: "Vacant Class Finder",
      description:
        "Real-time classroom availability tracker that helps students find empty rooms on campus.",
      githubLink: "https://github.com/jiviteshh/Vacant_Class_Finder",
    },
    {
      icon: "/house.png",
      title: "House Price Predictor",
      description:
        "A machine learning system predicting house prices with 85% accuracy using real-estate features.",
      githubLink: "https://github.com/jiviteshh/House_Price_Predictor",
    },
  ];

  return (
    <section className="projects-section">
      <h2 className="projects-title">Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img src={project.icon} alt={project.title} className="project-image" />

            <div className="project-content">
              <h3 className="project-name">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              <div className="project-links">
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
