const { Brand } = require("../Model/brand");
exports.createBrand = async (req, res) => {
  const brand = new Brand(req.body);
  try {
    const response = await brand.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(404).json(err);
  }
};

exports.fetchBrands = async (req, res) => {
  try {
    const response = await Brand.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json(err);
  }
};
