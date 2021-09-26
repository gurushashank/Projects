const express = require("express");
const app = express();
const Cart = require("../Models/cart.models");

app.use(express.json());

const cart = (req, res) => {
  userId = req.params.id;
  Cart.find({ userId: userId }, function (err, products) {
    if (err) {
      return res.status(500).json({
        message: "Internal server error!",
        success: false,
      });
    } else {
      if (!products || !products.length) {
        return res.status(200).json({
          message: "No products!",
          success: true,
          body: [],
        });
      }
      return res.status(200).json({
        message: "Items Retrieved!",
        success: true,
        body: products,
      });
    }
  });
};

// API call to fetch item from database and delete it can be used by SHOP component/page
const deleteByCartId = (req, res) => {
  userId = req.params.userId;
  productId = req.params.productId;
  if (!userId) {
    return res.status(400).json({
      message: "Invalid UserId",
      success: false,
    });
  }
  if (!productId) {
    return res.status(400).json({
      message: "Invalid Product Id",
      success: false,
    });
  }

  Cart.findOneAndRemove(
    { userId: userId, productId: productId },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).json({
          message: "item deleted!",
          success: true,
          body: data,
        });
      }
    }
  );
};

module.exports = {
  cart,
  deleteByCartId,
};
