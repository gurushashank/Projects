import React from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { Spinner, Container } from "react-bootstrap";

export default function ProductList({ products, currency }) {
  return products.length > 0 ? (
    <Row md={3} sm={2} xs={1}>
      {products.map((product) => (
        <Col>
          <ProductCard
            key={product._id}
            productID={product._id}
            productTitle={product.productTitle}
            cardImageURL={product.cardImageURL}
            currencySymbol={currency.currencySymbol}
            cost={(product.cost * currency.valueMul).toFixed(2)}
            productCat={product.cat}
          />
          </Col>
      ))}
    </Row>
  ) : (
    <Spinner
      animation="border"
      size="lg"
      style={{ color: "#d0312d", margin: "0px 5px" }}
    />
  );
}
