const router = require(`express`).Router();
// jwt init
const jwt = require("jsonwebtoken");
//bycript initial needed with solt
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(3);

const usersModel = require("../models/usersModel");

// add user with incryption
router.post(`/users/register`, (req, res) => {
  console.log(req.body.email);
  // If a user with this email does not already exist, then create new user
  usersModel.findOne({ email: req.body.email }, (uniqueError, uniqueData) => {
    if (uniqueData) {
      res.json({ errorMessage: `User already exists` });
    } else {
      bcrypt.hash(
        req.body.password,
        parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS),
        (err, hash) => {
          const user = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hash,
          };
          usersModel.create(user, (error, data) => {
            console.log(error);
            if (data) {
              req.session.user = {
                email: data.email,
                accessLevel: data.accessLevel,
              };
              res.json({
                name: data.name,
                surname: data.email,
                accessLevel: data.accessLevel,
              });
            } else {
              res.json({ errorMessage: error });
            }
          });
        }
      );
    }
  });
});

router.post("/users/login", (req, res) => {
  usersModel.findOne({ email: req.body.email }, (error, data) => {
    if (data) {
      bcrypt.compare(req.body.password, data.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { email: data.email, accessLevel: data.accessLevel },
            process.env.JWT_PRIVATE_KEY,
            { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRY }
          );
          req.session.user = {
            email: data.email,
            accessLevel: data.accessLevel,
            token: token,
          };
          res.json({ name: data.name, accessLevel: data.accessLevel });
        }
      });
    } else {
      res.json({ errorMessage: error });
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

router.get(`/users`, (req, res) => {
  usersModel.find((error, data) => {
    console.log(error);
    res.json(data);
  });
});

router.delete(`/users/:id/:email`, (req, res) => {
  usersModel.findByIdAndRemove(req.params.id, (error, data) => {
    res.json(data);
  });
});

module.exports = router;
