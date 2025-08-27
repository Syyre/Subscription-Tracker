import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);

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
