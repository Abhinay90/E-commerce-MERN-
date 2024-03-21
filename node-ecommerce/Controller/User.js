const { User } = require("../Model/user");

exports.fetchUserById = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await User.findById(id).exec();
    delete response.id;
    delete response.salt;
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json(err);
  }
};
