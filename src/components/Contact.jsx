import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./styles/Contact.css";

function Contact() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await emailjs.sendForm(
        "service_gmkj2di",     // Your Service ID
        "template_osrscem",    // Your Template ID
        formRef.current,
        {
          publicKey: "0Da8uF4yQxEWJ5gf9",   // NEW EmailJS API style
        }
      );

      setStatus("Message sent successfully! 🎉");
      formRef.current.reset();
    } catch (error) {
      setStatus("❌ Failed to send message. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <section className="contact-section">
      <h2 className="contact-title">Contact</h2>

      <div className="contact-container">
        <p className="contact-message">
          Feel free to reach out for collaborations, opportunities, or questions.
        </p>

        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />

          <input type="email" name="email" placeholder="Your Email" required />

          <textarea name="message" placeholder="Your Message" rows="5" required></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && <p className="status-message">{status}</p>}
      </div>
    </section>
  );
}

export default Contact;
