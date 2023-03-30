import { useContext } from "react";
import ShoopingCartIcon from "../../assets/shopping-bag.svg";
import { CartContext } from "../context/cart.context";
const CartIcon = () => {
  const { isCartOpen, setIscartOpen, cartItems, cartCount } =
    useContext(CartContext);

  const handleClick = () => {
    setIscartOpen(!isCartOpen);
  };
  return (
    <div
      className="flex justify-center items-center relative"
      onClick={handleClick}
    >
      <img src={ShoopingCartIcon} className="bg-white h-8 fill-yellow" />
      <span className="absolute top-2 text-yellow font-semibold">
        {cartCount}
      </span>
    </div>
  );
};

export default CartIcon;
