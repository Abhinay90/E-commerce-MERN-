const { Product } = require("../Model/product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const response = await product.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProducts = async (req, res) => {
  // sort ,pagination ,filter
  const condition = {};
  if (!req.query.admin) {
    condition.delete = { $ne: true };
  }
  let query = Product.find(condition);
  let totalCountQuery = Product.find({});
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalCountQuery = totalCountQuery.find({ category: req.query.category });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalCountQuery = totalCountQuery.find({ brand: req.query.brand });
  }
  // TODO: sort not work on discount prize

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    totalCountQuery = totalCountQuery.sort({
      [req.query._sort]: req.query._order,
    });
  }
  const totalCount = await totalCountQuery.count().exec();
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * page - pageSize).limit(pageSize);
  }
  try {
    const response = await query.exec();
    res.set("X-Total-Count", totalCount);
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Product.findById(id);
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};
