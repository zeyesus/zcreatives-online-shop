import React, { useState } from "react";
import FormInput from "../form/formInput.component";
import ChapPayment from "./paymentchapa";
const PaymentForm = () => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [amount, setamount] = useState(50);

  const handlSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer CHASECK_TEST-yqdk2G7PcnhEBV7pMmhhXxyP2g4aEy8M"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      amount: "100",
      currency: "ETB",
      email: "abebawzeyesus@gmail.com",
      first_name: "Bilen",
      last_name: "Gizachew",
      phone_number: "0912345678",
      tx_ref: "ch21ww23atatest-6669",
      callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
      return_url: "https://www.google.com/",
      "customization[title]": "Payment for my favourite merchant",
      "customization[description]": "I love online payments",
    });

    var requestOptions = {
      method: "POST",
      accept: "*/*",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.chapa.co/v1/transaction/initialize", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      <form onSubmit={handlSubmit}>
        <FormInput
          label="first name"
          type="text"
          placeholder="first name"
          name="fname"
          required
          onChange={(e) => {
            setfname(e.target.value);
          }}
        />
        <FormInput
          label="last name"
          type="text"
          placeholder="last name"
          name="lname"
          required
          onChange={(e) => {
            setlname(e.target.value);
          }}
        />
        <FormInput
          label="email"
          type="email"
          placeholder="name@gmail.com"
          name="email"
          required
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <FormInput
          label="amount"
          type="number"
          placeholder="name@gmail.com"
          name="amount"
          required
          onChange={(e) => {
            setamount(e.target.value);
          }}
        />
        <button className="bg-red-400 p-4">Pay now</button>
      </form>
    </div>
  );
};

export default PaymentForm;
