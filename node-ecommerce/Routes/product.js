const express = require("express");
const {
  createProduct,
  fetchProducts,
  fetchProductById,
  updateProduct,
} = require("../Controller/Product");
const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchProducts)
  .get("/:id", fetchProductById)
  .patch("/:id",updateProduct)

exports.router = router;
