import { useContext } from "react";
import ShoopingCartIcon from "../../assets/shopping-bag.svg";
import { CartContext } from "../context/cart.context";

const CartIcon = () => {
  const { isCartOpen, setIscartOpen } = useContext(CartContext);

  const handleClick = () => {
    setIscartOpen(!isCartOpen);
  };
  return (
    <div
      className="flex justify-center items-center relative"
      onClick={handleClick}
    >
      <img src={ShoopingCartIcon} className="bg-white h-8" />
      <span className="absolute text-yellow font-semibold">0</span>
    </div>
  );
};

export default CartIcon;
