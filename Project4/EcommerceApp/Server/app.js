const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./Routes/user.routes");
const addressRouter = require("./Routes/address.routes");
const cardRouter = require("./Routes/card.routes");
const subscriberRouter = require("./Routes/subscriber.routes");
const orderRouter = require("./Routes/order.routes");
const wishlistRouter = require("./Routes/wishlist.routes");
const shopRouter = require("./Routes/shop.routes");
const cartRouter = require("./Routes/cart.routes");
const paymentRouter = require('./Routes/payment.routes');
const emailRouter = require('./Routes/email.routes');
const trackOrder=require('./Routes/trackOrder.routes');
const productRouter=require('./Routes/product.routes');
const reviewRouter = require("./Routes/products.routes");

app.use(express.json());
app.use(cors());

// Routes
app.use(userRouter);
app.use(addressRouter);
app.use(cardRouter);
app.use(subscriberRouter);
app.use(wishlistRouter);
app.use(orderRouter);
app.use(shopRouter);
app.use(cartRouter);
app.use(paymentRouter);
app.use(emailRouter);
app.use(reviewRouter);
app.use(trackOrder);
app.use(productRouter)

const PORT = process.env.PORT || 8000;

mongoose
  .connect(
    "mongodb+srv://anaha_user:anaha_password@anaha.ufo2y.mongodb.net/anaha?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.listen(PORT, function () {
  console.log(`Listening on Port ${PORT}`);
});
