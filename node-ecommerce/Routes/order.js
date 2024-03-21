const express = require("express");
const {
  addToOrder,
  fetchAllOrders,
  fetchOrderByUser,
  updateOrder,
} = require("../Controller/Order");
const router = express.Router();

router
  .post("/", addToOrder)
  .get("/", fetchAllOrders)
  .get("/own/", fetchOrderByUser)
  .patch('/:id',updateOrder)

  exports.router=router