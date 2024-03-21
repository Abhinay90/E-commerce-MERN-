const { Cart } = require("../Model/cart");

exports.addToCart = async (req, res) => {
  console.log(req.user);
  const {id}=req.user;
  console.log({...req.body,user:id});
  const cart = new Cart({...req.body,users:id});
  try {
    const response = await cart.save();
    result = await response.populate("products");
    console.log('result=',result)
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchCartByUser = async (req, res) => {
  const { id } = req.user;
  console.log(id);
  try {
    const response = await Cart.find({ user: id })
      .populate("users")
      .populate("products");
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result=await response.populate('products');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteToCart = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Cart.findByIdAndDelete(id)
      .populate("users")
      .populate("products");
      res.status(200).json(response);
    } catch (err) {
    res.status(400).json(err);
  }
};
