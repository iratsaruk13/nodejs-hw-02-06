import express from "express";
import contactsController from "../../controllers/contacts-controllers.js";
import { authenticate, upload, isValidId } from "../../middlewars/index.js";

export const router = express.Router();
router.use(authenticate);

router.get("/", contactsController.getAll);

router.get("/:id", isValidId, contactsController.getById);

router.post("/", upload.single("avatar"), contactsController.add);

router.delete("/:id", isValidId, contactsController.deleteById);

router.put("/:id", isValidId, contactsController.updateById);

router.patch("/:id/favorite", isValidId, contactsController.updateFavorite);
