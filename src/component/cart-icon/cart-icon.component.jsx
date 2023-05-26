import { useContext } from "react";
import ShoopingCartIcon from "../../assets/shopping-bag.svg";
import { AiOutlineShopping } from "react-icons/ai";
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
      {/* <img src={ShoopingCartIcon} className="bg-white h-8 fill-yellow" /> */}
      <AiOutlineShopping size={40} />
      <span className="absolute top-3  font-semibold">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
