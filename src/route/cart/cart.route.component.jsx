import React, { Fragment, useContext } from "react";
import CheckOutItem from "../../component/check-out/checkout-item.component";
import { CartContext } from "../../component/context/cart.context";
import FormInput from "../../component/form/formInput.component";

const CartRoute = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  console.log(cartItems);
  return (
    <Fragment>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5 md:ml-8 md:mt-6 md:p-0 p-4">
        <div className="col-span-2">
          <table className="w-full  text-left mt-4">
            <thead className="bg-brightYellow ">
              <tr>
                <th className="p-2 font-bold"> Product image</th>
                <th className="p-2 font-bold">Product Name</th>
                <th className="p-2 font-bold">Quantity</th>
                <th className="p-2 font-bold">Price</th>
                <th className="p-2 font-bold">Remove</th>
              </tr>
            </thead>
            {cartItems.length == 0 ? (
              <h2 className="font-semibold text-2xl  mt-6 text-gray-400">
                You haven't selected any products yet!!
              </h2>
            ) : (
              cartItems.map((item) => {
                return <CheckOutItem key={item.id} cartItem={item} />;
              })
            )}
          </table>
          <div className="flex justify-end items-center gap-2 mt-9">
            <h2 className=" text-xl font-semibold">Total:</h2>
            <span className=" text-lg bg-black py-2 px-3 text-white rounded-sm">
              {cartTotal}$
            </span>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-xl ">Check Out Form</h2>
          <form className="bg-black p-3 w-5/6 text-gray-400">
            <FormInput
              label="fname"
              type="text"
              placeholder="full name"
              name="fname"
            />
            <FormInput
              label="Lname"
              type="text"
              placeholder="Last name"
              name="Lname"
            />
            <FormInput
              label="Location"
              type="text"
              placeholder="City/Kebele/Street name"
              name="Lname"
            />
            <FormInput
              label="Transaction id"
              type="text"
              placeholder="13x4rfsdfasdfsfsdfdv"
              name="Lname"
            />
            <button className="btn-large mt-4">Check Out</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CartRoute;
