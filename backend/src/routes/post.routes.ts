import {
  listByUser,
  listNewsFedd,
  create,
  photo,
  postById,
} from "../controllers/post.controller";
import { Router } from "express";
import { requireSignin } from "../controllers/auth.controller";
import { userById } from "../controllers/user.controller";

const router = Router();

router.route("/api/posts/new/:userId").post(requireSignin, create);

router.route("/api/posts/by/:postId").get(photo);

router.route("/api/posts/by/:userId").get(requireSignin, listByUser);

router.route("/api/posts/feed/:userId").get(requireSignin, listNewsFedd);

router.param("userId", userById);
router.param("postId", postById);

export default router;
