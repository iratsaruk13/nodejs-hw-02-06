import Joi from "joi";
import { emailRegexp } from "../constants/user-constants.js";

const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

export default {
  userRegisterSchema,
  userLoginSchema,
};
