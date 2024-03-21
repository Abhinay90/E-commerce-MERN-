const express = require("express");
const { createUser } = require("../Controller/Auth");
const { fetchUserById, updateUser } = require("../Controller/User");
const router = express.Router();

router.get("/own", fetchUserById).patch("/:id", updateUser);

exports.router = router;
