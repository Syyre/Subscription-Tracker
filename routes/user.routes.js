import { Router } from "express";
import {
  deleteUser,
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

//Should only be able to delete your own account
userRouter.delete("/:id", authorize, deleteUser);

export default userRouter;
