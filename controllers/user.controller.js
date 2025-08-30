import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).send({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).send({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const allowedUpdates = ["name", "email"];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      const error = new Error("Invalid updates");
      error.statusCode = 400;
      throw error;
    }

    //check user
    const userCheck = await User.findById(req.params.id);
    if (userCheck.id != req.user.id) {
      const error = new Error("You can update only your account");
      error.statusCode = 403;
      throw error;
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      session,
      strict: "throw",
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).send({
      success: true,
      message: "User updated",
      data: user,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    //check user
    const userCheck = await User.findById(req.params.id);
    if (userCheck.id != req.user.id) {
      const error = new Error("You can delete only your account");
      error.statusCode = 403;
      throw error;
    }

    await User.findByIdAndDelete(req.params.id, { session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).send({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
