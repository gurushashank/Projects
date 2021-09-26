import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Rating1 from "./Rating1";
import { useHistory } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { FETCH_ORDER, CANCEL_ORDER } from "../../Utils/Routes";
import {
  Card,
  Wrap,
  Span,
  Span2,
  Action,
  PageHeader,
  Title,
  Button,
  CancelButton,
  Image,
  Stars,
} from "./OrderHistoryElements";
import { useCookies } from "react-cookie";

function Orders() {
  const [orderObject, setOrderObject] = useState([]);
  const [cancel, setCancel] = useState(false);
  const [cookies, setCookie] = useCookies();
  const id = cookies.id;

  let history = useHistory();
  useEffect(() => {
    fetch(FETCH_ORDER + `${id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.body);
        setOrderObject(result.body);
        console.log(orderObject);
      });
  }, []);

  const handleTrack = (orderId) => {
    history.push(`/orders/track/${orderId}`);
  };

  const handleCancel = (orderId) => {
    axios
      .put(CANCEL_ORDER + `${orderId}`)
      .then((res) => {
        console.log(res.status);
        if (res.status == 200) {
          setCancel(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <Card>
        <PageHeader>
          <Title>
            <h2 className="text-center">Orders</h2>
          </Title>
        </PageHeader>
        {orderObject?.map((order) => (
          <Wrap>
            <div class="container">
              <div class="row">
                <div class="col col-lg-2">
                  <Image className="img" src={order.imageUrl} />{" "}
                </div>
                <div class="col">
                  <Span>
                    {" "}
                    <strong> {order.productName} </strong>
                  </Span>
                  <Span> {order.productDesc} </Span>
                  <Span> ₹{order.price} </Span>

                  {!order.cancelledStatus ? (
                    <Action>
                      <CancelButton>
                        <Button onClick={() => handleCancel(order.orderId)}>
                          CANCEL
                        </Button>
                      </CancelButton>

                      <CancelButton>
                        <Button onClick={handleTrack}>TRACK</Button>
                      </CancelButton>
                    </Action>
                  ) : (
                    <h4 style={{ marginTop: "70px", color: "grey" }}>
                      Your order is cancelled{" "}
                    </h4>
                  )}
                  <Stars>
                    {" "}
                    <Rating1 orderId={order.orderId} />{" "}
                  </Stars>
                </div>
                <div class="col col-lg-2">
                  <Span2> Order ID #{order.orderId} </Span2>
                </div>
              </div>
            </div>
          </Wrap>
        ))}
        ;
      </Card>
      <Footer />
    </div>
  );
}

export default Orders;
