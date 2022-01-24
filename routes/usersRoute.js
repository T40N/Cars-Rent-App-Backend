const express = require(`express`);
const app = express();
// jwt init
const jwt = require("jsonwebtoken");
//bycript initial needed with solt
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(PASSWORD_HASH_SALT_ROUNDS);

const usersModel = require("../models/usersModel");

// add user with incryption
app.post("/users/register", (req, res) => {
  let user = await usersModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("That user already exisits!");
  } else {
    let password = bcrypt.hashSync(req.body.password, salt);
    user = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: password,
    });
    usersModel.create(user, (error, data) => {
      res.json(data);
    });
  }
});

app.post("/users/login", (req, res) => {
  usersModel.findOne({ email: req.body.email }, (error, data) => {
    if (data) {
      bcrypt.compare(req.body.password, data.password, (err, result) => {
        if (result) {
          req.session.user = {
            email: data.email,
            accessLevel: data.accessLevel,
          };
          res.json({ name: data.name, accessLevel: data.accessLevel });
        }
      });
    }
  });
});

router.post("/users/logout", (req, res) => {
  req.session.destroy();
  res.json({});
});

router.get("/users/:email", (req, res) => {
  usersModel.findOne({ email: req.params.email }, (error, data) => {
    if (data) {
      console.log(data);
      res.json(data);
    }
  });
});

router.delete(`/users/:id`, (req, res) => {
  if (
    req.session.user.accessLevel >= process.env.ACCESS_LEVEL_ADMIN ||
    req.session.user.id === req.params.id
  ) {
    usersModel.findByIdAndRemove(req.params.id, (error, data) => {
      res.json(data);
    });
  } else {
    res.json({
      errorMessage: `User is not an administrator or owner of the accunt, so they cannot delete records`,
    });
  }
});
