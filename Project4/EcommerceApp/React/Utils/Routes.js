const BASE_URL = "https://anaha-backend.herokuapp.com";

// Cart
export const ADD_CART = BASE_URL + "/addToCart";
export const DEL_CART = BASE_URL + "/delete/cart/";
export const FETCH_CART = BASE_URL + "/cart/";

// Wishlist
export const ADD_WISHLIST = BASE_URL + "/add";
export const DEL_WISHLIST = BASE_URL + "/delete/";
export const FETCH_WISHLIST = BASE_URL + "/wishlist/";

// Products
export const FETCH_ALL_PRODUCTS = BASE_URL + "/products";

//Users
export const SIGN_IN = BASE_URL + "/signin";
export const SIGN_IN_RESET_PASSWORD = BASE_URL + "/signin/reset/password";
export const ADD_PROFILE = BASE_URL + "/add/profile";
export const GET_PROFILE = BASE_URL + "/get/profile";
export const UPDATE_PROFILE = BASE_URL + "/update/profile";
export const UPDATE_PASSWORD = BASE_URL + "/update/password";
export const DELETE_PROFILE = BASE_URL + "/delete/profile";

//Cards
export const GET_CARD = BASE_URL + "/get/card";
export const ADD_CARD = BASE_URL + "/add/card";
export const UPDATE_CARD = BASE_URL + "/update/card";
export const DELETE_CARD = BASE_URL + "/delete/card";

//Addresses
export const GET_ADDRESS = BASE_URL + "/get/address";
export const ADD_ADDRESS = BASE_URL + "/add/address";
export const UPDATE_ADDRESS = BASE_URL + "/update/address";
export const DELETE_ADDRESS = BASE_URL + "/delete/address";

// payments
export const PAYMENT = BASE_URL + "/payment";
export const PAYMENT_EMAIL = BASE_URL + "/email";
export const PAYMENT_SUCCESS = BASE_URL + "/paymentSuccess";

//Subscribers
export const ADD_SUBSCRIBER = BASE_URL + "/add/subscriber";

// Orders
export const FETCH_ORDER = BASE_URL + "/orders/";
export const ADD_ORDER = BASE_URL + "/orders/add";
export const CANCEL_ORDER = BASE_URL + "/order/";

// Track Orders
export const TRACK_ORDER = BASE_URL + "/orders/track/:id";

//Product page
export const PRODUCT = BASE_URL + "/product/:id";

//Email
export const EMAIL = BASE_URL + "/email";

//Reviews
export const FETCH_REVIEWS = BASE_URL + "/review/";
export const ADD_REVIEW = BASE_URL + "/reviews/add";
