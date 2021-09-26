import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import { Route, Switch } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart/Shoppingcart";
import Contact from "./Pages/Contact";
import { GlobalStyle } from "./GlobalStyles.styled";
import TandC from "./Pages/TandC";
import Faq from "./Pages/Faqs/Faq";
import Wishlist from "./Components/Wishlist/Wishlist";
import OrderHistory from "./Components/OrderHistory/OrderHistory";
import SignIn from "./Components/Account/SignIn";
import ResetPassword from "./Components/Account/ResetPassword";
import SignUpProfile from "./Components/Account/SignUpProfile";
import SignUpAddress from "./Components/Account/SignUpAddress";
import SignUpCard from "./Components/Account/SignUpCard";
import Profile from "./Pages/Profile";
import Address from "./Pages/Address";
import Card from "./Pages/Card";
import StipeContainer from "./Pages/Payment/StripeContainer/StripeContainer";
import PaymentSuccess from "./Pages/Payment/PaymentSuccess/PaymentSuccess";
import Review from "./Components/CustomerReview/Review";
import Product from "./Pages/Product";
import TrackOrder from "./Components/TrackOrder/TrackOrder";
import ProductPage from "./Components/Product/ProductPage";

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route exact path="/shop">
          <Shop />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/cart/:id">
          <Cart />
        </Route>
        <Route exact path="/termsandconditions">
          <TandC />
        </Route>
        <Route exact path="/faqs">
          <Faq />
        </Route>
        <Route exact path="/wishlist/:id">
          <Wishlist />
        </Route>
        <Route exact path="/orders/track/:id">
          <TrackOrder />
        </Route>
        <Route exact path="/orders/:id">
          <OrderHistory />
        </Route>
        <Route exact path="/reviews">
          <Review />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signin/reset/password">
          <ResetPassword />
        </Route>
        <Route exact path="/signup/profile">
          <SignUpProfile />
        </Route>
        <Route exact path="/signup/address">
          <SignUpAddress />
        </Route>
        <Route exact path="/signup/card">
          <SignUpCard />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/address">
          <Address />
        </Route>
        <Route exact path="/card">
          <Card />
        </Route>
        <Route exact path="/product">
          <Product />
        </Route>
        <Route exact path="/product/:id">
          <ProductPage />
        </Route>
        <Route exact path="/payment">
          <StipeContainer />
        </Route>
        <Route exact path="/paymentSuccess">
          <PaymentSuccess />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
