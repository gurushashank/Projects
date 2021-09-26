import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import swal from "sweetalert";
import axios from "axios";
import { Container, Jumbotron } from "react-bootstrap";
import styled from "styled-components";
import "./Cart.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { FETCH_CART, DEL_CART } from "../../Utils/Routes";

const PageHeader = styled(Jumbotron)`
  background-color: #dedede;
  width: 100%;
  padding: 40px;
`;

function Shoppingcart(props) {
  let history = useHistory();
  // Function to use history hook to redirect to payment page along with cart total value
  const makePayment = () => {
    history.push({
      pathname: "/payment",
      cartObject,
    });
  };

  const removeItem = (userId, productId) => {
    let filtredCartObject = cartObject.filter((x) => {
      if (x.productId !== productId) return x;
    });
    // this axios call is used to call backend api for removing product from cart which can be used in SHOP component
    axios
      .delete(DEL_CART + `${userId}/${productId}`)
      .then((res) => {
        console.log(res);
        setCartObject(filtredCartObject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const increment = (id) => {
    const exist = cartObject.find((x) => x._id === id);
    if (exist) {
      setCartObject(
        cartObject.map((x) =>
          x._id === id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartObject([...cartObject]);
    }
  };

  const decrement = (id, userId, productId) => {
    const exist = cartObject.find((x) => x._id === id);
    if (exist.quantity === 1) {
      setCartObject(cartObject.filter((x) => x._id !== id));
    } else {
      setCartObject(
        cartObject.map((x) =>
          x._id === id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
    if (exist.quantity === 1) {
      axios
        .delete(DEL_CART + `${userId}/${productId}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [cartObject, setCartObject] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  

  useEffect(() => {
    let temp = 0;
    let itemCount = 0;
    cartObject?.map((item) => {
      temp += item.quantity * item.price;
      itemCount += item.quantity;
    });
    setTotalPrice(temp);
    setTotalItems(itemCount);
    console.log(temp);
  }, [cartObject]);

  const [cookies, setCookie] = useCookies();
  const uid = cookies.id;
  //const name = cookies.name;

  useEffect(() => {
    if (uid !== undefined) {
      fetch(FETCH_CART+ `${uid}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result.body);
          setCartObject(result.body);
        });
      }else {
        swal("Please login to continue");
      }
    }, []);
    

  return (
    <div>
      <Navbar />
      <PageHeader>
        <Container>
          <h2 className="text-center">Shopping cart</h2>
          <p className="total-items, text-center">
            You have <span className="total-items-quantity">{totalItems}</span>{" "}
            items in your cart
          </p>
        </Container>
      </PageHeader>
      <section className="main-cart">
        <div className="cart-items">
          <div className="cart-items-box">
            {cartObject?.map((item) => (
              <>
                <div className="item-details">
                  <div className="product-img">
                    <img src={item.imageUrl} alt="dress" />
                  </div>

                  <div className="title">
                    <h2>{item.productName}</h2>
                    <p>{item.productCategory}</p>
                  </div>

                  <div className="quantity-update">
                    <i
                      className="fas fa-minus minus"
                      onClick={() =>
                        decrement(item._id, item.userId, item.productId)
                      }
                    ></i>
                    <input type="text" placeholder={item.quantity} />
                    <i
                      className="fas fa-plus add"
                      onClick={() => increment(item._id)}
                    ></i>
                  </div>

                  <div class="price">
                    <h3>₹{item.price}</h3>
                  </div>

                  <div className="remove-item">
                    <i
                      className="fas fa-trash-alt remove"
                      onClick={() => removeItem(item.userId, item.productId)}
                    ></i>
                  </div>
                </div>
                <hr />
              </>
            ))}
          </div>
        </div>

        <div className="cart-total">
          <h3>
            Cart Total: <span>₹{totalPrice}</span>
          </h3>
          <button onClick={makePayment}>Checkout</button>
        </div>
      </section>
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
}

export default Shoppingcart;
