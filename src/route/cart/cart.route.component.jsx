import React, { Fragment, useContext, useState } from "react";
import CheckOutItem from "../../component/check-out/checkout-item.component";
import { CartContext } from "../../component/context/cart.context";
import FormInput from "../../component/form/formInput.component";
import { UserContext } from "../../component/context/user.context";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../utils/firebase/firebase.utils";
import PaymentForm from "../../component/payment/payInfo.form";
import ChapPayment from "../../component/payment/paymentchapa";
const CartRoute = () => {
  const { cartItems, cartTotal, setcartItems } = useContext(CartContext);
  const { currentuser } = useContext(UserContext);

  const navigate = useNavigate();

  const defaultFormData = { fname: "", lname: "", location: "", tid: "" };
  const [chekoutformdata, setchekoutformdata] = useState(defaultFormData);
  const { fname, lname, location, email } = chekoutformdata;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setchekoutformdata((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = { order: cartItems, user: chekoutformdata };
    try {
      await addOrder(order);
      alert("order have been placed successfuly");
      setchekoutformdata(defaultFormData);
      setcartItems([]);
      console.log("succetssfuly inserted", order);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5 md:ml-8 md:mt-6 md:p-0 p-4">
        <div className="col-span-2">
          <table className="w-full  text-left mt-4">
            <thead className="bg-brightYellow ">
              <tr>
                <th className="p-2 font-bold"> Product image</th>
                <th className="p-2 font-bold">Product Name</th>
                <th className="p-2 font-bold">Size</th>
                <th className="p-2 font-bold">Quantity</th>
                <th className="p-2 font-bold">Price</th>
                <th className="p-2 font-bold">Remove</th>
              </tr>
            </thead>
            {cartItems !== undefined && cartItems.length == 0 ? (
              <tr className="font-semibold text-2xl  mt-6 text-gray-400">
                <td>You haven't selected any products yet!!</td>
              </tr>
            ) : (
              cartItems.map((item) => {
                return (
                  <CheckOutItem
                    key={`${item.id}-${item.size}`}
                    cartItem={item}
                  />
                );
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
          <form
            className="bg-black p-3 w-5/6 text-gray-400"
            onSubmit={handleSubmit}
          >
            <FormInput
              label="Firsrt name"
              type="text"
              placeholder="full name"
              name="fname"
              value={fname}
              required
              onChange={handleChange}
            />

            <FormInput
              label="Lname"
              type="text"
              placeholder="Last name"
              name="lname"
              value={lname}
              required
              onChange={handleChange}
            />
            <FormInput
              label="Location"
              type="text"
              placeholder="City/Kebele/Street name"
              name="location"
              value={location}
              required
              onChange={handleChange}
            />
            <FormInput
              label="Email"
              type="email"
              placeholder="Please enter valid email only"
              name="email"
              value={email}
              required
              onChange={handleChange}
            />
            {/* <button className="btn-large mt-4">Check Out</button> */}
          </form>
          <ChapPayment fname={fname} lname={lname} email={email} />
          {/* <PaymentForm /> */}
          {/* <button
            className="p-2 bg-brightYellow"
            onClick={() => {
              fetch("http://localhost:8080/initialize-transaction")
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  // handle response data
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            pay now with node js
          </button> */}
        </div>
      </div>
    </Fragment>
  );
};

export default CartRoute;
