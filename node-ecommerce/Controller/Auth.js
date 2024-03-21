const { User } = require("../Model/user");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";

exports.createUser = async (req, res) => {
  console.log("createUser=", req.body);
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const response = await user.save();
        req.login(sanitizeUser(response), (err) => {
          if (err) res.status(400).json(err);
          else {
            const token = jwt.sign(sanitizeUser(response), SECRET_KEY);
            res.cookie("jwt", token, {
              expires: new Date(Date.now() + 3600000),
              httpOnly: true,
            });
            res.status(201).json(token);
          }
        });
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.login = async (req, res) => {
  const user=req.user;
  res.cookie("jwt", req.user.token, {
    expires: new Date(Date.now() + 3600000),
    httpOnly: true,
  });
  res.json({id:user.id,role:user.role});
};


exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};

exports.checkUser = async (req, res) => {
  res.json(req.user);
};
