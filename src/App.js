import { useState } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import Reviews from "./components/Reviews/Reviews";

function App() {
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem("reviews")) || []
  );

  console.log(reviews, typeof [1, 2, 3, 4]);
  return (
    <div className="App">
      <Form reviews={reviews} setReviews={setReviews} />
      <Reviews reviews={reviews} setReviews={setReviews} />
    </div>
  );
}

export default App;
