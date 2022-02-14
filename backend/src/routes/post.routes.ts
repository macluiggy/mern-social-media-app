import { Router } from "express";
import { requireSignin } from "../controllers/auth.controller";

const router = Router();

router.route("/api/posts/feed/:userId").get(requireSignin);
