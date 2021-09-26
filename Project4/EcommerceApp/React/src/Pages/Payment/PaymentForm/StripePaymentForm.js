// Style for Stipe Card Element=https://stripe.com/docs/js/appendix/style
// https://stripe.dev/elements-examples/
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import PaymentSuccess from "../PaymentSuccess/PaymentSuccess";
import "./StripePaymentForm.css";

// Using style elements for adding color to stripe card
const StyleCardElement = {
  iconStyle: "solid",
  style: {
    base: {
      color: "#d0312d",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",

      "::placeholder": {
        color: "#d0312d",
      },
    },
    invalid: {
      iconColor: "#7B68EE",
      color: "#7B68EE",
    },
  },
};

// Importing stripe default elements by using existing api for stripe and implementing a proxy payment via stripe
export default function StripePaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: "helpdesk.anaha@gmail.com",
        name: "Anaha Helpdesk",
        address: "Jayanagar, Mumbai",
      },
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:3001/payment", {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className="payment__form__container">
      {!success ? (
        <div>
          <form onSubmit={handleSubmit}>
            <fieldset className="form__fieldset">
              <div className="form__card">
                <CardElement options={StyleCardElement} />
              </div>
            </fieldset>
            <button className="payment__button">Pay</button>
          </form>
        </div>
      ) : (
        <PaymentSuccess />
      )}
    </div>
  );
}
