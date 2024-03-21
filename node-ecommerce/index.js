const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local").Strategy;
const productRouter = require("./Routes/product");
const categoryRouter = require("./Routes/category");
const brandRouter = require("./Routes/brand");
const authRouter = require("./Routes/auth");
const userRouter = require("./Routes/user");
const cartRouter = require("./Routes/cart");
const orderRouter = require("./Routes/order");
const { User } = require("./Model/user");
const crypto = require("crypto");
const { isAuth, sanitizeUser, cookieExtractor } = require("./services/common");
const server = express();
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const opts = {};
// const sign=

//jwt option
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

// middilwars
// server.use(express.static('build'))

server.use(cookieParser());
server.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

server.use(passport.authenticate("session"));

server.use(express.json()); // to parse req.body
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use("/products", isAuth(), productRouter.router); // we can use jwt
server.use("/categoreis", isAuth(), categoryRouter.router);
server.use("/brands", isAuth(), brandRouter.router);
server.use("/auth", authRouter.router);
server.use("/user", isAuth(), userRouter.router);
server.use("/cart", isAuth(), cartRouter.router);
server.use("/order", isAuth(), orderRouter.router);

//passport stratgeis

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const response = await User.findOne({ email: email });
      crypto.pbkdf2(
        password,
        response.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(response.password, hashedPassword)) {
            done(null, false, { message: "Invalid Email or Password" });
          } else {
            const token = jwt.sign(sanitizeUser(response), SECRET_KEY);
            done(null, { id: response.id, role: response.role, token });
          }
        }
      );
    } catch (err) {
      done(null, false, { message: "Invalid Email or Password" });
      console.log(err);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      console.log(jwt_payload);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser(function (user, cb) {
  // console.log("user", user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")(process.env.STRIPE_SERVER_KEY);

// const paymentMethodDomain = await stripe.paymentMethodDomains.create(
//   {
//     domain_name: 'example.com',
//   },
//   {
//     stripeAccount: '{{CONNECTED_ACCOUNT_ID}}',
//   }
// );

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

server.post("/create-payment-intent", async (req, res) => {
  const { totalAmount } = req.body;
  console.log("req.body=", req.body);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100,
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("DataBase Is Connected!!!");
}

main().catch((err) => console.log(err));

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(process.env.PORT, () => {
  console.log("server started");
});
