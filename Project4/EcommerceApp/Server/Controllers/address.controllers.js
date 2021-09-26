// Author : Jaahnvi Hehar
const express = require("express");
const app = express();
const Address = require("../Models/address.model");

app.use(express.json());

const getAddress = async (req, res) => {
  const user_id = req.body.user_id;

  Address.find({})
    .where("user_id")
    .equals(user_id)
    .exec((err, result) => {
      if (err) {
        return res.status(500).json({ success: false });
      } else {
        if (result.length > 0) {
          return res.status(200).json({
            success: true,
            address: result[0].address,
            city: result[0].city,
            zip_code: result[0].zip_code,
          });
        } else {
          return res.status(204).json({ success: false });
        }
      }
    });
};

const addAddress = async (req, res) => {
  const user_id = req.body.user_id;
  const address = req.body.address;
  const city = req.body.city;
  const zip_code = req.body.zip_code;

  const add_address = new Address({
    user_id: user_id,
    address: address,
    city: city,
    zip_code: zip_code,
  });

  await add_address.save((error, result) => {
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

const updateAddress = async (req, res) => {
  const user_id = req.body.user_id;
  const address = req.body.address;
  const city = req.body.city;
  const zip_code = req.body.zip_code;

  const update = {
    address: address,
    city: city,
    zip_code: zip_code,
  };

  Address.findOneAndUpdate({ user_id: user_id }, update, {}, (err, result) => {
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

const deleteAddress = async (req, res) => {
  const user_id = req.body.user_id;
  Address.findOneAndDelete({ user_id: user_id }, function (err, result) {
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
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
};
