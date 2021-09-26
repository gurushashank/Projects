import React from "react";
import { useHistory } from "react-router-dom";
import paymentSuccess from "../../../Images/payment_success.svg";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import { Container, Jumbotron } from "react-bootstrap";
import styled from "styled-components";
import "./PaymentSuccess.css";

const PageHeader = styled(Jumbotron)`
  background-color: #dedede;
  width: 100%;
`;


// The page displays that the payment was successful
export default function PaymentSuccess() {
  let history = useHistory();

  const addToList = () => {
    history.push('/shop');
  };

  return (
    <div className="paymentSuccess__container">
      <div className="paymentSuccess__header">
        <Navbar />
        <PageHeader>
          <Container>
            <h2 className="text-center">Payment Status</h2>
          </Container>
        </PageHeader>
      </div>

      <div className="paymentSuccess__body">
        <img
          className="paymentSuccess__img"
          src={paymentSuccess}
          alt="Success Message"
          width="100"
          height="100"
        />
        <h2>Success, Your payment has been processed successfully</h2>
        <div>
          Thank you for your payment. An automated payment receipt will be sent
          to your registered email.
        </div>
        <div class="paymentSuccess_button">
          <button onClick={addToList} type="submit">
            Continue Shopping
          </button>
        </div>
      </div>
      <div className="paymentSuccess__footer">
        <Footer />
      </div>
    </div>
  );
}
