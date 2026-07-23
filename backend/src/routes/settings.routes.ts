import express from "express";
import { getSettings, updateSettings } from "../controllers/settings.controller";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.get("/", getSettings);
router.put("/", authenticate, updateSettings);

export default router;
