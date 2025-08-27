import { Router } from "express";
import {
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import { signUp } from "../controllers/auth.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", signUp);

userRouter.put("/:id", authorize, updateUser);

userRouter.delete("/:id", authorize, (req, res) => {
  res.send({ title: `Delete user with ID ${req.params.id}` });
});

export default userRouter;
