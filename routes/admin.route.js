const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const adminController = require("../controller/admin.controller");
const roles = require('../utils/adminRoles')

router.route("/:id").get(/*auth.verifyToken,*/adminController.getSingleProfile);

router.route("/authtest").get(auth.verifyToken,adminController.authtest);

router.route("/login").post(adminController.Login);

router.route("/register").post(auth.verifyToken,auth.allowedTo(roles.ceo,roles.backend), adminController.register);

router.route("/logout").post(auth.verifyToken, adminController.Logout);

router.route("/message").get(auth.verifyToken, adminController.GetMessages);

router.route("/message/:id").delete(auth.verifyToken, auth.allowedTo(roles.ceo,roles.backend), adminController.DelMessages);

router
  .route("/log")
  .get(auth.verifyToken, adminController.GetLogs)
  .post(auth.verifyToken, adminController.CreateLogs);
router
  .route("/log/:id")
  .get(auth.verifyToken, adminController.GetSingleLog)
  .delete(auth.verifyToken, adminController.DelLogs)
  .put(auth.verifyToken, adminController.UpdateLogs);

module.exports = router;
