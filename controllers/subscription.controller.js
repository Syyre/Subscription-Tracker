import mongoose from "mongoose";
import Subscription from "../models/subscription.model.js";
import User from "../models/user.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionForUser = async (req, res, next) => {
  try {
    const userCheck = await User.findById(req.params.id);
    if (userCheck.id != req.user.id) {
      const error = new Error("You can not view another user's subscriptions");
      error.statusCode = 403;
      throw error;
    }

    const subscription = await Subscription.find({ user: req.params.id });
    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const allowedUpdates = [
      "name",
      "price",
      "frequency",
      "paymentMethod",
      "status",
    ];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      const error = new Error("Invalid updates");
      error.statusCode = 400;
      throw error;
    }

    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    if (subscription.user.toString() !== req.user.id) {
      const error = new Error(
        "You are not authorized to update this subscription"
      );
      error.statusCode = 403;
      throw error;
    }
    // Update subscription details
    Object.assign(subscription, req.body);
    await subscription.save({ session });

    await session.commitTransaction();
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    if (subscription.user.toString() !== req.user.id) {
      const error = new Error(
        "You are not authorized to delete this subscription"
      );
      error.statusCode = 403;
      throw error;
    }

    await Subscription.findByIdAndDelete(req.params.id, { session });
    await session.commitTransaction();
    res.status(200).json({ success: true, message: "Subscription deleted" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

//get subscription and change status to cancelled
export const cancelSubscription = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    if (subscription.user.toString() !== req.user.id) {
      const error = new Error(
        "You are not authorized to cancel this subscription"
      );
      error.statusCode = 403;
      throw error;
    }

    subscription.status = "cancelled";
    await subscription.save({ session });

    await session.commitTransaction();
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
