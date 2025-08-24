import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ title: "GET all users" });
});

userRouter.get("/:id", (req, res) => {
  res.send({ title: `GET user with ID ${req.params.id}` });
});

userRouter.post("/", (req, res) => {
  res.send({ title: "Create a new user" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ title: `Update user with ID ${req.params.id}` });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ title: `Delete user with ID ${req.params.id}` });
});

export default userRouter;
