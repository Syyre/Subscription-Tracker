import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  getSubscriptionForUser,
  updateSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getAllSubscriptions);

subscriptionRouter.get("/:id", authorize, getSubscriptionById);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscription);

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: `Delete subscription with ID ${req.params.id}` });
});

subscriptionRouter.get("/user/:id", authorize, getSubscriptionForUser);

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: `Cancel subscription with ID ${req.params.id}` });
});

export default subscriptionRouter;
