import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({ title: "GET all subscriptions" });
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send({ title: `GET subscription with ID ${req.params.id}` });
});

subscriptionRouter.post("/", (req, res) => {
  res.send({ title: "Create a new subscription" });
});

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: `Update subscription with ID ${req.params.id}` });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: `Delete subscription with ID ${req.params.id}` });
});

subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({
    title: `GET subscriptions for user with ID ${req.params.id}`,
  });
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: `Cancel subscription with ID ${req.params.id}` });
});

export default subscriptionRouter;
