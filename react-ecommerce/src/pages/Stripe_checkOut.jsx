import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckOutForm";
import "../stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";

const stripePromise = loadStripe("pk_test_51OrmlLSC8zPxbAtrsGT7a1UYUVq0w6HyVFeJcVK6YlIVnr6zEIuXJYUtWXQDMgbhQE9xfxEXfvNrTuPyLCKXTvQl00Ael36GSj");

export default function StripeCheckOut() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder=useSelector(selectCurrentOrder);
  console.log('currentOrder=',currentOrder.totalAmount) 
  useEffect(() => {
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}