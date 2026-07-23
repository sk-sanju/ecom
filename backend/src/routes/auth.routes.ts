import express from "express";
import { register, login, getMe, updateMe, getUsers, createUser } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe);
router.put("/me", authenticate, updateMe);
router.post("/users", authenticate, createUser);
router.get("/users", authenticate, getUsers);

export default router;
