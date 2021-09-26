import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Image, Jumbotron, Row, Col } from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import "../TrackOrder/Track.css";
const PageHeader = styled(Jumbotron)`
  background-color: #dedede;
  width: 100%;
`;

function TrackOrder({match}) {
  const [orderObject, setOrderObject] = useState([]);
  const id=match.params.id
  console.log(id)
const url='http://localhost:8000/orders/track/'+id
  


  useEffect(() => {
    axios
    .get(url)
    .then((response) => {
      console.log(response);
      console.log(setOrderObject(response.data.body));
      
    })
    .catch((error) => {
      console.log(error);
    });
    
  }, []) 
    
  

  return (
    <div>
      <Navbar />
      <PageHeader>
        <Container>
          <h2 className="text-center">Track Order</h2>
        </Container>
      </PageHeader>
    {orderObject?.map((order)=>(
      <div>
        <Card>
          <Row class="image">
            <Col>
              <div class="tImage">
                <img
                  src={order.imageUrl}
                  class="center"
                  alt="Cinque Terre"
                />
              </div>
            </Col>
          </Row>
        </Card>
        <Card>
          <Card.Body>
            <Card.Text className="text">
              <h3>Order Id:{order.orderId}</h3>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Product Details</Card.Title>
            <Card.Text>
            <p>product Name: {order.productName}</p>
              <hr></hr>
              <p>Product Description: {order.productDesc} </p>
              <hr></hr>
              <p>Price :₹ {order.price}</p>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Text>
              <h2>Order status: {order.orderStatus}</h2>
            </Card.Text>
          </Card.Body>
        </Card>
        
      </div>
        ))};
    
      
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(TrackOrder);
