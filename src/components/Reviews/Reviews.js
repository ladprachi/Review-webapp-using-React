import { useEffect } from "react";
import "./review.css";

export default function Reviews({ reviews, setReviews }) {
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleDelete = (id) => {
    setReviews(reviews.filter((review) => review._id !== id));
  };

  const RatingStar = ({ rating }) => {
    if (rating < 0 || rating > 5) {
      return null;
    }

    const filledStars = Array(rating).fill("★");
    const emptyStars = Array(5 - rating).fill("☆");
    const stars = [...filledStars, ...emptyStars];

    return (
      <div className="star_rating">
        {stars.map((star, i) => (
          <span key={i} data-rating={i + 1}>
            {star}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="review-container">
      <span className="heading-review">Reviews List</span>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div className="review">
            <div>Title : {review.title}</div>
            <div>
              Rating : <RatingStar rating={review.rating} />
            </div>
            <div>Description : {review.description}</div>
            <div>
              <button
                onClick={() => handleDelete(review._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="review"> No reviews to show</div>
      )}
    </div>
  );
}
