import "./styles/Certifications.css";

function Certifications() {
  const certifications = [
    {
      logo: "/aws.png",
      title: "AWS Certified Cloud Practitioner",
      company: "Amazon Web Services",
      viewLink:
        "https://drive.google.com/file/d/1RieH9GWIfMT441ahAwmvSklZg2jIB5SK/view?usp=sharing",
    },
    {
      logo: "/azure.png",
      title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
      company: "Microsoft",
      viewLink:
        "https://drive.google.com/file/d/1F3uvDAcJ6q90ufpqJBF8JjXrhq6y8lwx/view?usp=sharing", 
    },
    {
      logo: "/oracle.png",
      title: "Oracle Cloud Infrastructure Foundations",
      company: "Oracle",
      viewLink: "https://drive.google.com/file/d/10XbwZG3xHnrM4LJrBUk2ZApj1SEJhqoS/view?usp=sharing", 
    },
    {
      logo: "/eng.png",
      title: "Cambridge Linguaskill English Proficiency",
      company: "Cambridge University Press & Assessment",
      viewLink: "https://drive.google.com/file/d/1jNEkSTClBGVuc-6lZdOftPAo_mK7j0AH/view?usp=sharing",
    },
  ];

  return (
    <section className="certifications-section">
      <h2 className="certifications-title">Certifications</h2>
      <div className="certifications-container">
        {certifications.map((cert, index) => (
          <div key={index} className="certification-card">
            <div className="cert-logo">
              <img src={cert.logo} alt={`${cert.company} logo`} />
            </div>
            <div className="cert-info">
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-company">{cert.company}</p>
            </div>
            <a
              href={cert.viewLink}
              className="view-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="cert-icon"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2H6C5.5 2 5 2.5 5 3V21C5 21.5 5.5 22 6 22H18C18.5 22 19 21.5 19 21V8L14 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18C13.66 18 15 16.66 15 15C15 13.34 13.66 12 12 12C10.34 12 9 13.34 9 15C9 16.66 10.34 18 12 18Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              View
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
