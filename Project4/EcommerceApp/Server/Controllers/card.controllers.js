// Author : Jaahnvi Hehar
const express = require("express");
const app = express();
const Card = require("../Models/card.model");

app.use(express.json());

const addCard = async (req, res) => {
  const user_id = req.body.user_id;
  const cardholder_name = req.body.cardholder_name;
  const card_number = req.body.card_number;
  const expiration_date = req.body.expiration_date;

  const add_card = new Card({
    user_id: user_id,
    cardholder_name: cardholder_name,
    card_number: card_number,
    expiration_date: expiration_date,
  });

  await add_card.save((error, result) => {
    if (error) {
      return res.status(500).json({ success: false });
    } else {
      if (!result) {
        return res.status(204).json({ success: false });
      } else {
        return res.status(200).json({ success: true });
      }
    }
  });
};

const getCard = async (req, res) => {
  const user_id = req.body.user_id;

  Card.find({})
    .where("user_id")
    .equals(user_id)
    .exec((err, result) => {
      if (err) {
        return res.status(500).json({ success: false });
      } else {
        if (result.length > 0) {
          return res.status(200).json({
            success: true,
            cardholder_name: result[0].cardholder_name,
            card_number: result[0].card_number,
            expiration_date: result[0].expiration_date,
          });
        } else {
          return res.status(204).json({ success: false });
        }
      }
    });
};

const updateCard = async (req, res) => {
  const user_id = req.body.user_id;
  const cardholder_name = req.body.cardholder_name;
  const card_number = req.body.card_number;
  const expiration_date = req.body.expiration_date;

  const update = {
    cardholder_name: cardholder_name,
    card_number: card_number,
    expiration_date: expiration_date,
  };

  Card.findOneAndUpdate({ user_id: user_id }, update, {}, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
      });
    } else {
      if (!result) {
        return res.status(204).json({
          success: false,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  });
};

const deleteCard = async (req, res) => {
  const user_id = req.body.user_id;
  Card.findOneAndDelete({ user_id: user_id }, function (err, result) {
    if (err) {
      return res.status(500).json({
        success: false,
      });
    } else {
      return res.status(200).json({
        success: true,
      });
    }
  });
};

module.exports = {
  addCard,
  getCard,
  updateCard,
  deleteCard,
};
