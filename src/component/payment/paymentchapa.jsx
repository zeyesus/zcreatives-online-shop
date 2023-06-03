import React, { useContext } from "react";
import { UserContext } from "../context/user.context";
import { CartContext } from "../context/cart.context";
import { Navigate } from "react-router-dom";

const ChapPayment = ({ fname, lname, amount, email }) => {
  const currentDate = new Date();
  const { currentuser } = useContext(UserContext);
  const { cartTotal } = useContext(CartContext);
  //   const { displayName, email } = currentuser;
  const tx_ref = `${fname}-tx-2243065`;
  const public_chapaKey = "CHAPUBK_TEST-QEBhIYUTRif97TqAT2TV5bIzwrznd6Ua";
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
        <input type="hidden" name="public_key" value={public_chapaKey} />
        <input type="hidden" name="tx_ref" value={tx_ref} />
        <input type="hidden" name="amount" value={cartTotal} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="first_name" value={fname} />
        <input type="hidden" name="last_name" value={lname} />
        <input type="hidden" name="title" value="Let us do this" />
        <input
          type="hidden"
          name="description"
          value="Paying with Confidence with chapa"
        />
        <input
          type="hidden"
          name="logo"
          value="https://chapa.link/asset/images/chapa_swirl.svg"
        />
        <input
          type="hidden"
          name="callback_url"
          value="https://example.com/callbackurl"
        />
        <input
          type="hidden"
          name="return_url"
          value="http://localhost:5173/cart"
        />
        <input
          type="hidden"
          name="meta[title]"
          value="Payment to z-creatives"
        />
        <button
          type="submit"
          className="btn-large btn_hover bg-green-600 mt-10 w-2/3 mx-auto"
        >
          Pay Now With chapa
        </button>
      </form>
    </div>
  );
};

export default ChapPayment;
