import {
  listByUser,
  listNewsFedd,
  create,
  photo,
  postById,
  isPoster,
  remove,
  like,
  unlike,
  comment,
  uncomment,
} from "../controllers/post.controller";
import { Router } from "express";
import { requireSignin } from "../controllers/auth.controller";
import { userById } from "../controllers/user.controller";

const router = Router();

router.route("/api/posts/new/:userId").post(requireSignin, create);

router.route("/api/posts/photo/:postId").get(photo);

router.route("/api/posts/by/:userId").get(requireSignin, listByUser);

router.route("/api/posts/feed/:userId").get(requireSignin, listNewsFedd);

router.route("/api/posts/like").put(requireSignin, like);
router.route("/api/posts/unlike").put(requireSignin, unlike);

router.route("/api/posts/comment").put(requireSignin, comment);
router.route("/api/posts/uncomment").put(requireSignin, uncomment);

router.route("/api/posts/:postId").delete(requireSignin, isPoster, remove);

router.param("userId", userById);
router.param("postId", postById);

export default router;
