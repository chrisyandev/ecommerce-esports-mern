const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createTokenUser,
  attachTokenToResponse,
  checkPermissions,
} = require("../utils");

const getAllUsersNotAdmin = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    throw new CustomError.NotFoundError(`no user with id ${userId}`);
  }

  checkPermissions(req.user, user._id);

  res.status(StatusCodes.OK).json({ user: user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    throw new CustomError.BadRequestError("please provide both email and name");
  }

  const user = await User.findOne({ _id: req.user.id });
  user.email = email;
  user.name = name;
  await user.save();

  const tokenUser = createTokenUser(user);
  attachTokenToResponse({ res: res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(
      "please provide old and new password"
    );
  }

  // user should exist if authentication passes
  const user = await User.findOne({ _id: req.user.id });
  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("invalid password");
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "password updated" });
};

module.exports = {
  getAllUsersNotAdmin,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
