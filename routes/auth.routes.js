import { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", (req, res) => {
  res.send({ title: "User signed in" });
});

authRouter.post("/sign-out", (req, res) => {
  res.send({ title: "User signed out" });
});

export default authRouter;
