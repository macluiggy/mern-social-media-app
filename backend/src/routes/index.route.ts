import { Router } from "express";
import { hello } from "../controllers/index.controller";
const router = Router();

router.route("/api/hello").get(hello);

export default router;
