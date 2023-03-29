import React from "react";

const ShopCard = (props) => {
  const { name, imageUrl, price } = props.product;

  return (
    <div className="h-72 flex flex-col gap-y-1 shadow-xl bg-white rounded-lg overflow-clip ">
      <img
        src={imageUrl}
        className="object-cover overflow-hidden hover:scale-110  transition-all"
      />
      <span>{name}</span>
      <span>{price}</span>
      <button className="btn-outline btn-outline-hover">Add to cart</button>
    </div>
  );
};

export default ShopCard;
