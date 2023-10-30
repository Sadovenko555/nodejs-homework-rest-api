const express = require("express");
const router = express.Router();

const {
  registr,
  login,
  current,
  logout,
  updateUserSubscriptionStatus,
  updateUserAvatar,
} = require("../../controllers/auth");

const { validateFunc, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/registr", validateFunc(schemas.registrationSchema), registr);
router.post("/login", validateFunc(schemas.loginSchema), login);
router.get("/current", authenticate, current);
router.post("/logout", authenticate, logout);
router.patch(
  "/",
  authenticate,
  validateFunc(schemas.updateSubscriptionSchema),
  updateUserSubscriptionStatus
);
router.patch("/avatar", authenticate, upload.single("avatar"), updateUserAvatar);

module.exports = router;