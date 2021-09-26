import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { useCookies } from "react-cookie";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { FETCH_WISHLIST, ADD_CART, DEL_WISHLIST } from "../../Utils/Routes";
import {
  CardPage,
  WishListContainer,
  Item,
  PageHeader,
  CloseButton,
  Heading,
  Button,
  CartButton,
  Price,
  ProductName,
  ItemcardRemoveIcon,
  ImageDiv,
} from "./WishlistElements";

function Wishlist() {
  const handleClose = (event, userId, productId) => {
    event.currentTarget.parentElement.parentElement.parentElement.style.display =
      "none";

    axios
      .delete(DEL_WISHLIST + `${userId}/${productId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToCart = (event, product) => {
    swal("Item moved to Cart");
    var userId = product.userId;
    var productId = product.productId;
    event.currentTarget.parentElement.parentElement.style.display = "none";
    axios
      .delete(DEL_WISHLIST + `${userId}/${productId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(ADD_CART, {
        userId: product.userId,
        productId: product.productId,
        imageUrl: product.imageUrl,
        productName: product.productName,
        productCategory: product.productCategory,
        price: product.price,
        quantity: 1,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [productObject, setproductObject] = useState([]);
  const [cookies, setCookie] = useCookies();
  const id = cookies.id;

  useEffect(() => {
    if (id !== undefined) {
      fetch(FETCH_WISHLIST + `${id}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result.body);
          setproductObject(result.body);
          console.log(productObject);
        });
    } else {
      swal("Please login to continue");
    }
  }, []);

  return (
    <CardPage>
      <Navbar />

      <PageHeader>
        <Heading>
          <h2 className="text-center">My Wishlist</h2>
        </Heading>
      </PageHeader>

      <WishListContainer>
        {productObject?.map((product) => (
          <Item>
            <ImageDiv>
              <img src={product.imageUrl} />
              <ItemcardRemoveIcon>
                <CloseButton
                  onClick={(event) =>
                    handleClose(event, product.userId, product.productId)
                  }
                >
                  <span>x</span>
                </CloseButton>
              </ItemcardRemoveIcon>
            </ImageDiv>

            <div style={{ marginTop: "6px" }}>
              <ProductName> {product.productName} </ProductName>
              <Price> ₹{product.price} </Price>
            </div>
            <CartButton>
              {" "}
              <Button
                to="#"
                onClick={(event) => handleAddToCart(event, product)}
              >
                {" "}
                ADD TO BAG
              </Button>
            </CartButton>
          </Item>
        ))}
      </WishListContainer>
      <Footer />
    </CardPage>
  );
}

export default Wishlist;
