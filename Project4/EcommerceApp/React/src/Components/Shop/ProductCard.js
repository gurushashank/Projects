import React, { useContext, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Bag, BagCheckFill, Heart, HeartFill } from "react-bootstrap-icons";
import { ShopContext } from "./ShopContext";
import { Button, CartButton } from "../Wishlist/WishlistElements";

const StyledCard = styled(Card)`
  width: auto;
  height: auto;
  box-shadow: 0 0 8px 0 rgba(100, 100, 100, 0.25);
  margin: 10px 5px;
  transition: all 150ms cubic-bezier(0.26, 0.46, 0.45, 0.95) 0s;

  h5 {
    cursor: text;
  }
  &:hover {
    transform: scale(1.03);
  }
`;

const StyledCardTitle = styled(Card.Title)`
  font-size: medium;
  cursor: none;
`;

const UnstyledButton = styled.button`
  cursor: pointer;
  color: inherit;
  padding: 0;
  font: inherit;
  margin-right: 20px;
  border: none;
  background: none;
`;

const CardImage = styled(Card.Img)`
  overflow: hidden;
  height: 300px;
`;

export default function ProductCard(props) {
  const {
    productID,
    productTitle,
    cardImageURL,
    currencySymbol,
    cost,
    productCat,
  } = props;
  const { likeCallback, cartCallback, likeSet, cartSet, userID } =
    useContext(ShopContext);

  const handleCartPress = () => {
    setaddCart(!addCart);
    cartCallback(props);
  };

  const handleLikePress = () => {
    setaddLike(!addLike);
    likeCallback(props);
  };

  const [addCart, setaddCart] = useState(cartSet.has(productID));
  const [addLike, setaddLike] = useState(likeSet.has(productID));

  return (
    <StyledCard>
      <CardImage variant="top" src={cardImageURL} />
      <Card.Body style={{ paddingBottom: "0.5rem" }}>
        <StyledCardTitle>{productTitle}</StyledCardTitle>
        <Card.Subtitle className="text-muted mb-2">{productCat}</Card.Subtitle>
        <Row>
          <Col>
            <h5>
              {currencySymbol}
              {cost}
            </h5>
          </Col>
          {userID && (
            <Col>
              <UnstyledButton>
                {cartSet.has(productID) ? (
                  <BagCheckFill
                    onClick={handleCartPress}
                    color="#d0312d"
                    size="18"
                  />
                ) : (
                  <Bag onClick={handleCartPress} size="18" />
                )}
              </UnstyledButton>
              <UnstyledButton>
                {likeSet.has(productID) ? (
                  <HeartFill
                    onClick={handleLikePress}
                    color="#d0312d"
                    size="18"
                  />
                ) : (
                  <Heart onClick={handleLikePress} size="18" />
                )}
              </UnstyledButton>
            </Col>
          )}
        </Row>
      </Card.Body>
      <CartButton>
        <Button to={`/product/${productID}`}>View Product</Button>
      </CartButton>
    </StyledCard>
  );
}
