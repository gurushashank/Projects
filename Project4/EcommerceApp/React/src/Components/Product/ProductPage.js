import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Image, Jumbotron, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import "../Product/Product.css";
import Review from "../CustomerReview/Review";

const PageHeader = styled(Jumbotron)`
  background-color: #dedede;
  width: 100%;
`;

function ProductPage({ match }) {
  const [productObject, setProductObject] = useState([]);
  const id = match.params.id;
  console.log(id);
  const url = "http://localhost:8000/product/" + id;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        console.log(setProductObject(response.data.body));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <PageHeader>
        <Container>
          <h2 className="text-center">Product</h2>
        </Container>
      </PageHeader>
      {productObject?.map((product) => (
        <div class="ppage">
          <Card>
            <Row class="image">
              <Col>
                <div class="picture">
                  <img
                    src={product.cardImageURL}
                    class="center"
                    alt="Cinque Terre"
                  />
                </div>
              </Col>
            </Row>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Product Details</Card.Title>
              <Card.Text>
                <p>product Name: {product.productTitle}</p>
                <hr></hr>
                <p>Product Description: {product.description} </p>
                <hr></hr>
                <p>Price :₹ {product.cost}</p>
                <hr></hr>
                <p>Category: {product.cat}</p>
              </Card.Text>
            </Card.Body>
          </Card>

          <div style={{ marginTop: "-20px" }}>
            <Review productID={product._id} />
          </div>
        </div>
      ))}
      ;
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(ProductPage);
