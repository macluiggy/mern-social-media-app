import {
  requireSignin,
  hasAuthorization,
} from "../controllers/auth.controller";
import { Router } from "express";
import {
  addFollower,
  addFollowing,
  create,
  defaultPhoto,
  list,
  photo,
  read,
  remove,
  update,
  userById,
} from "../controllers/user.controller";

const router = Router();

router.route("/api/users").get(list).post(create);

router.route("/api/users/photo/:userId").get(photo, defaultPhoto);
router.route("/api/users/defaultphoto").get(defaultPhoto);

router.route("/api/users/follow").put(requireSignin, addFollowing, addFollower);
router.route("/api/users/unfollow").put(requireSignin);

router
  .route("/api/users/:userId")
  .get(requireSignin, read)
  .put(requireSignin, hasAuthorization, update)
  .delete(requireSignin, hasAuthorization, remove);

router.route("/api/").put((req, res) => {
  console.log(req.body);

  res.json(req.body);
});
router.param("userId", userById);

export default router;
