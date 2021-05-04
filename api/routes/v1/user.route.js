const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
// Controller
const UserController = require("../../controllers/user.controller");

router.post("/login", async (req, res, next) => {
  console.log(req.isAuthenticated())
  if (!req.isAuthenticated()) {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error("Login error occured !");
          next(error);
          return res.status(400).json({
            status: "error",
            data: [error],
            messages: [{ loginErr: "Login error" }],
          });
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
        });
        return res.json({
          status: 200,
          data: [user],
          messages: [info],
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  } else {
    return res.json({
      status: 400,
      data: [],
      messages: [
        {
          error: "You already loged in !",
        },
      ],
    });
  }
});

router.get("/logout", (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      req.logout();
      return res.status(200).json({
        status: "success",
        data: [],
        messages: [{ success: "You have loged out !" }],
      });
    } else {
      return res.status(400).json({
        status: "error",
        data: [],
        messages: [{ logoutErr: "You have not log in yet !" }],
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/register", UserController.createNewUSer);

module.exports = router;
