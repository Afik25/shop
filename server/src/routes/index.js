const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const uploadFiles = require("../middlewares/uploadFiles");
const countries = require("../middlewares/countries.json");
const Inscription = require("../api/v1/controllers/authentication/Inscription");
const Login = require("../api/v1/controllers/authentication/Login");
const User = require("../api/v1/controllers/users/User");
const Organization = require("../api/v1/controllers/organization/Organization");
const Entity = require("../api/v1/controllers/organization/Entity");
const Permission = require("../api/v1/controllers/users/Permission");
const Role = require("../api/v1/controllers/users/Role");
const Payment = require("../api/v1/controllers/subscription/Payment");
const Subscription = require("../api/v1/controllers/subscription/Subscription");
//
// root configure
// router.get("/root", User.rootConfigure);
//
// Register
router.post("/auth/register", Inscription.create);
router.post("/auth/complete", verifyJWT, Inscription.complete);
router.post("/auth/activation", verifyJWT, Inscription.activateCompletion);
//
// login
router.post("/auth/login", Login.login);
router.get("/auth/refresh", verifyJWT, Login.refreshToken);
router.get("/auth/logout", verifyJWT, Login.logout);
//
// organization
router.get("/organizations", verifyJWT, Organization.get);
router
  .get("/entities", verifyJWT, Entity.get)
  .post("/entities", verifyJWT, Entity.create)
  .put("/entities/:id", verifyJWT, Entity.update)
  .delete("/entities/:stat/:id", verifyJWT, Entity.enabled);
//
// role
router.get("/roles", verifyJWT, Role.get);
//
// subscriptions
router.get("/payments", verifyJWT, Payment.get);
router.get("/subscriptions", verifyJWT, Subscription.get);
//
// // Permission
// router.get("/permissions", Permission.getPermission);
//
// User
router.post("/user", User.create).get("/user", User.get);
router
  .get("/user/key/:key", User.getByKey)
  .put("/user/key/:id", User.update)
  .delete("/user/key/:id", User.delete);
//

module.exports = router;
