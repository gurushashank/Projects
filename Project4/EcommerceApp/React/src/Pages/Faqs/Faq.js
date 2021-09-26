import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
// import Navbar from ".././Components/Navbar/Navbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import styled from "styled-components";
import "./Faq.css";

const PageHeader = styled(Jumbotron)`
  background-color: #dedede;
  width: 100%;
`;

function Faq() {
  return (
    <div>
      <Navbar />
      <PageHeader>
        <Container>
          <h2 className="text-center">Frequenty Asked Questions(FAQs)</h2>
        </Container>
      </PageHeader>

      <div class="container-fluid">
        {/* <h1>Frequenty Asked Questions(FAQs)</h1> */}
        <div class="accordion">
          <div>
            <input
              type="radio"
              name="example_accordion"
              id="section1"
              class="accordion__input"
            />
            <label for="section1" class="accordion__label">
              What can I return?
            </label>
            <div class="accordion__content">
              {/* <p>
                <strong>What can I return?</strong>
              </p> */}
              <p>
                You may request returns for most items you buy from sellers
                listed on Anaha.in that are within the return window, except
                those that are explicitly identified as not returnable on the
                product detail page and/or Anaha.in Returns policy.
              </p>
            </div>
          </div>
          <div>
            <input
              type="radio"
              name="example_accordion"
              id="section2"
              class="accordion__input"
            />
            <label for="section2" class="accordion__label">
              What are the return guidelines?
            </label>
            <div class="accordion__content">
              {/* <p> */}
              {/* <strong>What are the return guidelines?</strong> */}
              {/* </p> */}
              <p>
                Following are the return guidelines: Your address and the item
                that you wish to return must be eligible for return. If the
                return is not eligible for Pickup, a Self-Return option will be
                given. Once the return is received, you will, in accordance with
                Anaha.in Refund Policy, be issued a refund to your original
                payment method. For Pay on Delivery orders, refunds will be
                processed either to your bank account (via National Electronic
                Funds Transfer (NEFT)) or Anaha account (as Anaha Pay balance).
              </p>
            </div>
          </div>
          <div>
            <input
              type="radio"
              name="example_accordion"
              id="section3"
              class="accordion__input"
            />
            <label for="section3" class="accordion__label">
              Can my order be replaced?
            </label>
            <div class="accordion__content">
              {/* <p>
                <strong>Can my order be replaced?</strong>
              </p> */}
              <p>
                Only Fulfilled by Anaha items, Prime eligible items and few
                Seller Fulfilled items can be replaced. If the item you ordered
                arrived in a physically damaged or defective condition or is
                different from their description on the product detail page , or
                has missing parts or accessories, it will be eligible for a free
                replacement, provided the exact item is available with the same
                seller.
              </p>
            </div>
          </div>

          <div>
            <input
              type="radio"
              name="example_accordion"
              id="section4"
              class="accordion__input"
            />
            <label for="section4" class="accordion__label">
              How can I return a Gift?
            </label>
            <div class="accordion__content">
              {/* <p> */}
              {/* <strong>How can I return a Gift?</strong> */}
              {/* </p> */}
              <p>
                Please visit the Gift Returns option and enter the Order Number
                to initiate a return. Detailed guidance on this process can be
                found here. You can also return a gift item, if the gift giver
                has sent a Gift Receipt to you. Once we process the return, a
                refund is processed to the original payment method of the gift
                giver. please visit Return a Gift for details.
              </p>
            </div>
          </div>

          <div>
            <input
              type="radio"
              name="example_accordion"
              id="section5"
              class="accordion__input"
            />
            <label for="section5" class="accordion__label">
              How can I return a Gift Card?
            </label>
            <div class="accordion__content">
              {/* <p>
                <strong>How can I return a Gift Card?</strong>
              </p> */}
              <p>
                Gift cards once purchased cannot be cancelled or returned due to
                regulatory restrictions. If you need help with adding gift card
                balance to your account or using it, please visit this page.
              </p>
            </div>
          </div>

          <div>
            <input
              type="radio"
              name="example_accordion"
              id="section6"
              class="accordion__input"
            />
            <label for="section6" class="accordion__label">
              Is it necessary to have an account to shop on Anaha?
            </label>
            <div class="accordion__content">
              {/* <p>
                <strong>
                  Is it necessary to have an account to shop on Anaha?
                </strong>
              </p> */}
              <p>
                Yes, it's necessary to log into your Anaha account to shop.
                Shopping as a logged-in user is fast & convenient and also
                provides extra security. You'll have access to a personalised
                shopping experience including recommendations and quicker
                check-out.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Faq;
