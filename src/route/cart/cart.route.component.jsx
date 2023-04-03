import React, { Fragment, useContext } from "react";
import CheckOutItem from "../../component/check-out/checkout-item.component";
import { CartContext } from "../../component/context/cart.context";

const CartRoute = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <Fragment>
      {/* {cartItems.quantity == 0 ? (
        <h2>You havent selected any products yet!!</h2>
      ) : (
        <h2>Enjoy Our Products</h2>
      )} */}
      <div className="flex flex-col  items-center mt-12 max-w-screen-lg bg-slate-500 mx-auto">
        <div className="flex justify-between w-5/6 uppercase font-semibold">
          <div>
            <h2>Image</h2>
          </div>
          <div>
            <h2>Name</h2>
          </div>
          <div>
            <h2>Quantity</h2>
          </div>
          <div>
            <h2>Price</h2>
          </div>
          <div>
            <h2>Remove</h2>
          </div>
        </div>

        {cartItems.map((item) => {
          return <CheckOutItem key={item.id} cartItem={item} />;
        })}
        <div>
          <h2>Total:{cartTotal} </h2>
        </div>
      </div>
    </Fragment>
  );
};

export default CartRoute;
