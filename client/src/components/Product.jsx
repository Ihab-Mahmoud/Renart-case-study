import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";





const renderStars = (score) => {
  const fullStars = Math.floor(score);
  const hasHalfStar = score - fullStars >= 0.25 && score - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} color="#ffc107" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" color="#ffc107" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} color="#ccc" />);
  }

  return stars;
};


const Product = (data) =>
{
  const scoreOutOf5 = parseFloat((data?.data?.popularityScore * 5).toFixed(1));
  
  const [selectedColor, setSelectedColor] = useState("yellow");

  const colors = [
    { name: "Yellow Gold", className: "yellow" },
    { name: "White Gold", className: "white" },
    { name: "Rose Gold", className: "rose" },
  ];

  const currentImage = data?.data?.images[selectedColor];
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={currentImage} className="card-img-top rounded" alt="Product" />

      <div className="card-body">
        <h5 className="card-title" style={{ fontWeight: "500" }}>
          {data?.data?.name}
        </h5>
        <p className="card-text my-3" style={{ fontWeight: "400" }}>
          ${data?.data?.price} USD
        </p>
        <div className="color-swatches">
          {colors.map((color) => (
            <span
              key={color.className}
              className={`swatch ${
                selectedColor === color.className ? "selected" : ""
              }`}
              title={color.name}
              onClick={() => setSelectedColor(color.className)}
            >
              <span
                className={`inner-swatch ${color.className}`}
                title={color.name}
              ></span>
            </span>
          ))}
        </div>
        <p className="card-text my-3" style={{ fontWeight: "300" }}>
          {colors.find((color) => color.className === selectedColor)?.name}
        </p>

        <div className="rating-container">
          <div className="stars">{renderStars(scoreOutOf5)}</div>

          <span className="rating-text">{scoreOutOf5} / 5</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
