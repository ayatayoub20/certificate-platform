import { Router } from "express";
import { getLoginPage, login, logout } from "../controllers/auth.controller";

const router = Router();

router.get("/login", getLoginPage);
router.post("/login", login);
router.post("/logout", logout);

export default router;