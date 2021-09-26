// https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets
// https://www.paidmembershipspro.com/setting-developer-account-test-payment-gateway/
// https://stripe.com/docs/checkout/integration-builder
// https://www.youtube.com/watch?v=XKWJFpZYVAQ

// Commenting out code of Stripe Payment Operations to use Payment Form Basic as our primary payment method
// import { Elements } from "@stripe/react-stripe-js";
// import PaymentForm from "../PaymentForm/StripePaymentForm";
// import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import {useLocation } from "react-router-dom";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import { Container, Jumbotron } from "react-bootstrap";
import styled from "styled-components";
import "./StripeContainer.css";
import PaymentFormBasic from "../PaymentForm/PaymentFormBasic";

// Commenting out Stripe Payment API code 
// const PUBLIC_KEY =
//   "pk_test_51J3nDzSFWKGlDES1OceTvai2QqJCfUIOufTjFPDNMG3BD99fuVWaSD5dvJLAGbZzA14TzNpnZoyRsbXScDHQNi6i00vbSPAWzq";

// To Load Stripe API for card
// const stripeTestPromise = loadStripe(PUBLIC_KEY);

// Styling Stripe Card
const PageHeader = styled(Jumbotron)`
  background-color: #dedede;
  width: 100%;
`;

// Stripe Container can handle either Payment form basic or Stripe payment form depending on the user requirement
export default function StripeContainer() {
  const location = useLocation();

  const orderData = location.cartObject;
  return (
    <div className="stripe__container">
      <div className="stripe__header">
        <Navbar />
        <PageHeader>
          <Container>
            <h2 className="text-center">Payment</h2>
          </Container>
        </PageHeader>
      </div>

      <div className="stripe__body">
        {/* <h2> Enter your card details</h2>
        <Elements stripe={stripeTestPromise}>
          <StripePaymentForm />
        </Elements> */}
        <PaymentFormBasic orderData={orderData} />
      </div>

      <div className="stripe__footer">
        <Footer />
      </div>
    </div>
  );
}
