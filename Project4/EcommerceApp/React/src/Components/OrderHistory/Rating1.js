import React, { useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";

import styled from "styled-components";

function Rating1({ orderId }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    console.log(`Rating for ${orderId} is ${rating} `);
  }, [orderId, rating]);

  function onStarClick(nextValue, prevValue, name) {
    setRating(nextValue);
  }
  return (
    <Stars>
      <StarRatingComponent
        name="rate1"
        starCount={5}
        value={rating}
        onStarClick={onStarClick}
      />
      <span> {rating}/5 </span>
    </Stars>
  );
}

export default Rating1;

const Stars = styled.div`
  display: flex;

  span {
    margin-left: 5px;
  }
`;
