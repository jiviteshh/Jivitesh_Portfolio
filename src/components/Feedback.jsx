import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./styles/Feedback.css";

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const token = localStorage.getItem("token"); // include token if needed
      const res = await fetch("http://localhost:8080/api/feedback", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch feedback");

      const data = await res.json();
      setFeedbackList(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !rating || !comment) return;

    const feedbackData = { name, comment, rating };

    try {
      const token = localStorage.getItem("token"); // include token if needed

      const res = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(feedbackData),
      });

      if (!res.ok) throw new Error("Failed to submit feedback");

      setName("");
      setComment("");
      setRating(0);
      fetchFeedback(); // refresh feedback list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="feedback-section">
      <h2 className="feedback-title">Leave Your Feedback</h2>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Your feedback"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="rating-container">
          {[...Array(5)].map((_, idx) => {
            const currentRating = idx + 1;
            return (
              <FaStar
                key={idx}
                className={`star ${currentRating <= rating ? "selected" : ""}`}
                onClick={() => setRating(currentRating)}
              />
            );
          })}
        </div>
        <button type="submit">Submit</button>
      </form>

      <h3 className="reviews-title">Recent Reviews</h3>

      <div className="feedback-list">
        {feedbackList.map((fb) => (
          <div key={fb.id} className="feedback-item">
            <h4>{fb.name}</h4>
            <p>{fb.comment}</p>
            <div className="rating-display">
              {Array.from({ length: fb.rating }).map((_, idx) => (
                <FaStar key={idx} className="star selected" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feedback;
