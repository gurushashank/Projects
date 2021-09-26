import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Jumbotron,
  Row,
  Form,
  Tab,
  Nav,
  Spinner,
} from "react-bootstrap";
import styled from "styled-components";
import ProductList from "../Components/Shop/ProductList";
import {
  sortAscendingTitle,
  sortDecendingTitle,
  sortDecendingCost,
  sortAscendingCost,
} from "../Utils/Sortings";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import axios from "axios";
import { ShopContext } from "../Components/Shop/ShopContext";
import {
  ADD_CART,
  ADD_WISHLIST,
  FETCH_CART,
  FETCH_WISHLIST,
  FETCH_ALL_PRODUCTS,
  DEL_CART,
  DEL_WISHLIST,
} from "../Utils/Routes";
import { useCookies } from "react-cookie";

const PageHeader = styled(Jumbotron)`
  background-color: #dedede;
  width: 100%;
`;

const StyledContainer = styled(Container)`
  margin: 20px auto 20px auto;
  min-height: 100vh;
  & a.nav-link.active {
    background-color: #d0312d;
  }

  & a.nav-link {
    color: #d0312d;
  }

  & select:focus {
    border-color: #d0312d;
    box-shadow: 0 0 8px #d0312d;
  }
`;

function useForceUpdate() {
  const [forceUpdateValue, setForceUpdateValue] = useState(0);
  return () => setForceUpdateValue((value) => ++value);
}

export default function Shop() {
  let [products, setProducts] = useState([]);
  let [sortValue, setSortValue] = useState("ltoh");
  let [curValue, setCurValue] = useState("INR");
  const [curSpinnerVisibility, setCurSpinnerVisibility] = useState(false);
  // Set to maintain wishlist/cart ids.
  const [likeSet, setLikeSet] = useState(new Set());
  const [cartSet, setCartSet] = useState(new Set());
  // Force updates the component
  const update = useForceUpdate();

  const [currency, setCurrency] = useState({
    currencySymbol: "₹",
    valueMul: "1",
  });
  const [cookies, setCookie] = useCookies();
  const userID = cookies.id;
  const name = cookies.name;

  const fetchProducts = () =>
    axios
      .get(FETCH_ALL_PRODUCTS)
      .then((d) => setProducts(d.data.products.sort(sortAscendingCost)));

  /////// WISHLIST ///////
  const fetchWishList = () => {
    axios
      .get(FETCH_WISHLIST + `${userID}`)
      .then((data) => {
        console.log("/Wishlist" + `${userID}`, data.data.body);
        const localSet = new Set();
        data.data.body.forEach((element) => {
          localSet.add(element.productId);
        });
        setLikeSet(localSet);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addToWishList = (product) => {
    console.log("addToWishList: ", product);
    axios.post(ADD_WISHLIST, product).then((data) => {
      console.log("addToWishList:/add", data);
    });
  };

  const removeFromWishList = (product) => {
    axios
      .delete(DEL_WISHLIST + `${product.userId}/${product.productId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const likeCallback = (product) => {
    console.log("likeCallCallback");

    const payLoad = {
      userId: userID,
      productId: product.productID,
      imageUrl: product.cardImageURL,
      productName: product.productTitle,
      productCategory: product.productCat,
      price: product.cost,
    };

    if (!likeSet.has(product.productID)) {
      addToWishList(payLoad);
      setLikeSet((likeSet) => new Set(likeSet.add(product.productID)));

      console.log("Like Added");
    } else {
      removeFromWishList(payLoad);
      likeSet.delete(product.productID);

      console.log("Like Removed");
    }
    update();
  };

  /////// CART ///////
  const fetchCart = () => {
    axios
      .get(FETCH_CART + `${userID}`)
      .then((data) => {
        console.log("/cart", data.data.body);
        const localSet = new Set();
        data.data.body.forEach((element) => {
          localSet.add(element.productId);
        });
        setCartSet(localSet);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addToCart = (product) => {
    console.log("addToCart: ", product);
    axios.post(ADD_CART, product).then((data) => {
      console.log("addToCart:/addToCart", data);
    });
  };

  const removeFromCart = (product) => {
    axios
      .delete(DEL_CART + `${product.userId}/${product.productId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cartCallback = (product) => {
    console.log("cartCallCallback");

    const payLoad = {
      userId: userID,
      productId: product.productID,
      imageUrl: product.cardImageURL,
      productName: product.productTitle,
      productCategory: product.productCat,
      price: product.cost,
      quantity: 1,
    };

    if (!cartSet.has(product.productID)) {
      setCartSet((cartSet) => new Set(cartSet.add(product.productID)));
      addToCart(payLoad);
      console.log("Cart Added");
    } else {
      cartSet.delete(product.productID);
      removeFromCart(payLoad);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchWishList();
      fetchCart();
    }
    fetchProducts();
  }, []);

  const handleSortOption = (e) => {
    let compare;

    switch (e.target.value) {
      case "ltoh":
        setSortValue("ltoh");
        compare = sortAscendingCost;
        break;
      case "htol":
        setSortValue("htol");
        compare = sortDecendingCost;
        break;
      case "atz":
        setSortValue("atz");
        compare = sortAscendingTitle;
        break;
      case "ztoa":
        setSortValue("ztoa");
        compare = sortDecendingTitle;
        break;
      default:
        break;
    }
    setProducts(products.slice().sort(compare));
  };

  const FilterRows = styled(Row)`
    padding: 10px;
  `;

  const changeCurrency = (e) => {
    setCurSpinnerVisibility(true);

    switch (e.target.value) {
      case "INR":
        setCurrency({ currencySymbol: "₹", valueMul: "1" });
        setCurValue("INR");
        setCurSpinnerVisibility(false);
        break;

      case "USD":
        fetch(
          "https://free.currconv.com/api/v7/convert?q=INR_USD&compact=ultra&apiKey=cceb0945cfff15bdde70",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((resData) => {
            setCurSpinnerVisibility(false);
            setCurrency({ currencySymbol: "$", valueMul: resData.INR_USD });
          });

        setCurValue("USD");
        break;

      case "CAD":
        fetch(
          "https://free.currconv.com/api/v7/convert?q=INR_CAD&compact=ultra&apiKey=cceb0945cfff15bdde70",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((resData) => {
            setCurSpinnerVisibility(false);
            setCurrency({ currencySymbol: "CA$", valueMul: resData.INR_CAD });
          });

        setCurValue("CAD");
        break;
    }
  };
  return (
    <>
      <Navbar />
      <PageHeader>
        <Container>
          <h1 className="text-center">Shop</h1>
        </Container>
      </PageHeader>
      <ShopContext.Provider
        value={{
          likeCallback: likeCallback,
          cartCallback: cartCallback,
          likeSet: likeSet,
          cartSet: cartSet,
          userID: userID,
        }}
      >
        <StyledContainer>
          <h2> Categories</h2>
          <Tab.Container defaultActiveKey="All">
            <Row>
              <Col sm={2}>
                <Nav className="flex-column" variant="pills">
                  <Nav.Item>
                    <Nav.Link onClick={update} eventKey="All">
                      All
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={update} eventKey="Saree">
                      Saree
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={update} eventKey="Lehenga">
                      Lehenga
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <FilterRows>
                  <h6>Sort By</h6>
                  <Form.Control
                    as="select"
                    size="sm"
                    custom
                    defaultValue={sortValue}
                    onChange={handleSortOption}
                  >
                    <option value="ltoh">Price: Low to High</option>
                    <option value="htol">Price: High to Low</option>
                    <option value="atz">Title: A to Z</option>
                    <option value="ztoa">Title: Z to A</option>
                  </Form.Control>
                </FilterRows>
                <FilterRows>
                  <h6>
                    Currency{" "}
                    {curSpinnerVisibility && (
                      <Spinner
                        animation="border"
                        size="sm"
                        style={{ color: "#d0312d", margin: "0px 5px" }}
                      />
                    )}
                  </h6>
                  <Form.Control
                    as="select"
                    size="sm"
                    custom
                    defaultValue={curValue}
                    onChange={changeCurrency}
                    disabled={curSpinnerVisibility}
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                  </Form.Control>
                </FilterRows>
                {!userID && (
                  <Row>
                    <p
                      className="text-left text-secondary"
                      style={{ margin: "10px 0px 10px 10px" }}
                    >
                      Note: Login to use Wishlist and Cart features
                    </p>
                  </Row>
                )}
              </Col>

              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="All">
                    <ProductList products={products} currency={currency} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="Saree">
                    <ProductList
                      products={products.flatMap((product) =>
                        product.cat === "Saree" ? [product] : []
                      )}
                      currency={currency}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="Lehenga">
                    <ProductList
                      products={products.flatMap((product) =>
                        product.cat === "Lehenga" ? [product] : []
                      )}
                      currency={currency}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </StyledContainer>
      </ShopContext.Provider>
      <Footer />
    </>
  );
}
