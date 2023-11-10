const express = require("express");
const router = express.Router();

const {
  registr,
  login,
  current,
  logout,
  updateUserSubscriptionStatus,
  updateUserAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/auth");

const { validateFunc, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/registr", validateFunc(schemas.registrationSchema), registr);

router.get("/verify/:verificationToken", verifyEmail);

router.get("/verify", validateFunc(schemas.emailSchema), resendVerifyEmail);

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