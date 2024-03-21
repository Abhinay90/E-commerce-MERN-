const express = require("express");
const {
  addToCart,
  fetchCartByUser,
  updateCart,
  deleteToCart,
} = require("../Controller/Cart");
const router = express.Router();

router
  .post("/", addToCart)
  .get("/", fetchCartByUser)
  .patch("/:id", updateCart)
  .delete("/:id", deleteToCart);

exports.router = router;
