import React, { useState, useEffect } from "react";
import "./form.css";
import { v1 as uuid } from "uuid";

const Form = ({ reviews, setReviews }) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleReset = () => {
    setTitle("");
    setRating();
    setDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      title,
      rating,
      description,
      _id: uuid(),
    };
    setReviews([...reviews, review]);
    setTitle("");
    setRating(0);
    setDescription("");
    console.log(reviews);
  };

  const RatingStar = ({ rating = 0, onClick }) => {
    if (rating < 0 || rating > 5) {
      return null;
    }

    const handleStarClick = (index) => {
      onClick(index + 1);
    };

    const filledStars = Array(rating).fill("★");
    const emptyStars = Array(5 - rating).fill("☆");
    const stars = [...filledStars, ...emptyStars];

    return (
      <div className="star_rating">
        {stars.map((star, i) => (
          <span key={i} data-rating={i + 1} onClick={() => handleStarClick(i)}>
            {star}
          </span>
        ))}
      </div>
    );
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="form-container">
      <span className="heading-form">Give Review</span>
      <form onSubmit={handleSubmit} className="form">
        Title:{" "}
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        Rating: <RatingStar rating={rating} onClick={handleRatingChange} />
        <br />
        Description:{" "}
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default Form;
