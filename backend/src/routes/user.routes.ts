import {
  requireSignin,
  hasAuthorization,
} from "../controllers/auth.controller";
import { Router } from "express";
import {
  create,
  list,
  read,
  remove,
  update,
  userById,
} from "../controllers/user.controller";

const router = Router();

router.route("/api/users").get(list).post(create);

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
