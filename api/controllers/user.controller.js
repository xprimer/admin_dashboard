const UserModel = require("../../models/user.model");
const bcrypt = require("bcrypt");

createNewUSer = async (req, res) => {
  const txtUsername = req.body.txtUsername ? req.body.txtUsername.trim() : "";
  const txtPassword = req.body.txtPassword ? req.body.txtPassword.trim() : "";
  const txtPasswordConfirm = req.body.txtPasswordConfirm
    ? req.body.txtPasswordConfirm.trim()
    : "";
  const txtEmail = req.body.txtEmail ? req.body.txtEmail.trim() : "";

  let errors = [];

  if (!txtUsername || txtUsername.length < 6) {
    errors.push({
      usernameErr: "Username must be at least 6 characters !",
    });
  }

  if (!txtPassword || txtPassword < 8) {
    errors.push({
      passwordErr: "Password must be at least 8 characters !",
    });
  } else if (!txtPassword.match(/[A-Z]/g) || !txtPassword.match(/[0-9]/g)) {
    errors.push({
      passwordErr:
        "Password must contains at least one character with uppercase and one digit !",
    });
  } else if (txtPassword !== txtPasswordConfirm) {
    errors.push({
      passwordErr: "Password and Password confirm is not match !",
    });
  }

  if (!txtEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push({
      emailErr: "Email is invalid !",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: "error",
      data: [],
      messages: errors,
    });
  }

  let hashPassword = await bcrypt.hash(txtPassword, 10);
  try {
    await UserModel.create(
      {
        username: txtUsername,
        password: hashPassword,
        email: txtEmail,
      },
      (err, user) => {
        if (err) {
          if (err.message.includes("duplicate")) {
            return res.status(400).json({
              status: "error",
              data: [],
              messages: [
                {
                  usernameErr: "Username already exists !",
                },
              ],
            });
          }
          return res.status(400).json({
            status: "error",
            data: [],
            messages: [
              {
                error:
                  "Error while creating new user ! Please try again later !",
              },
            ],
          });
        }
        return res.status(200).json({
          status: "success",
          data: [],
          messages: [
            {
              success: "Your account has been created !",
            },
          ],
        });
      }
    );
  } catch (error) {
    console.log("UserController ERROR : " + error.message);
    error.stack;
  }
};

module.exports = {
  createNewUSer,
};
