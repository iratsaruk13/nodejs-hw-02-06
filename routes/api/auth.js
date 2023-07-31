import express from "express";
import { validateBody } from "../../middlewars/index.js";
import usersSchema from "../../schemas/users-schema.js";
import authController from "../../controllers/auth-controllers.js";
import { authenticate } from "../../middlewars/index.js";

export const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(usersSchema.userRegisterSchema),
  authController.register
);

authRouter.post(
  "/login",
  validateBody(usersSchema.userLoginSchema),
  authController.sighin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.sighout);
