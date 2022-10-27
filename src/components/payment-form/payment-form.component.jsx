import "./payment-form.styles.scss";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";

import { selectCurrentUser } from "../../store/user/user.selector";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import React from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const amount = useSelector(selectCartTotal);

  const paymentHandler = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => {
      return res.json();
    });
    const clientSecret = response.paymentIntent.client_secret;
    console.log(
      "🚀 ~ file: payment-form.component.jsx ~ line 41 ~ paymentHandler ~ currentUser.displayName",
      currentUser.displayName
    );

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.email : "Guest",
        },
      },
    });
    setIsProcessingPayment(false);

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment succeeded!");
      }
    }
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={paymentHandler} className="form-container">
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.payment}>
          Pay Now
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
