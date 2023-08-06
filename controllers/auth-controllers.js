import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../decorators/index.js";
import dotenv from "dotenv";
import Jimp from "jimp";

dotenv.config();

const avatarPath = path.resolve("public", "avatars");

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email); 

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const sighin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

const getCurrent = (req, res) => {
  const { name, email } = req.user;

  res.json({
    name,
    email,
  });
};

const sighout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "Sighout success",
  });
};

const updateAvatar = async(req, res) => {
  const {_id} = req.user;
const {path: tempUpload, originalName} = req.file;

await Jimp.read(tempUpload)
    .then((avatar) => {
      return avatar.resize(250, 250);
    })
    .catch((err) => {
      throw err;
    });
    
const filename = `${_id}_${originalName}`;
const resultUpload = path.join(avatarPath, filename);
await fs.rename(tempUpload, resultUpload);
const avatar = path.join("avatars", filename);
await User.findByIdAndUpdate(_id, avatar);

res.json({
  avatar,
})
}

export default {
  register: ctrlWrapper(register),
  sighin: ctrlWrapper(sighin),
  getCurrent: ctrlWrapper(getCurrent),
  sighout: ctrlWrapper(sighout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
