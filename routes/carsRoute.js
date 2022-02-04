const app = require(`express`).Router();

const carsModel = require("../models/carsModel");

// get all cars
app.get("/cars", (req, res) => {
  carsModel.find((error, data) => {
    res.json(data);
  });
});

// get one car by id
app.get("/cars/:id", (req, res) => {
  carsModel.findById(req.params.id, (error, data) => {
    res.json(data);
  });
});

// add new car
app.post(`/cars`, (req, res) => {
  console.log(req.body);
  carsModel.create(req.body, (error, data) => {
    res.json(data);
  });
});

// update one car
app.put(`/cars/:id`, (req, res) => {
  if (typeof req.session.user === `undefined`) {
    res.json({ errorMessage: `User is not logged in` });
  } else {
    if (
      req.session.user.accessLevel !== `undefined` &&
      req.session.user.accessLevel >= process.env.ACCESS_LEVEL_NORMAL_USER
    ) {
      carsModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        (error, data) => {
          res.json(data);
        }
      );
    } else {
      res.json({
        errorMessage: `User is not logged in, so they cannot update cars`,
      });
    }
  }
});

// delete one car
app.delete(`/cars/:id`, (req, res) => {
  if (typeof req.session.user === `undefined`) {
    res.json({ errorMessage: `User is not logged in` });
  } else {
    if (req.session.user.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
      carsModel.findByIdAndRemove(req.params.id, (error, data) => {
        res.json(data);
      });
    } else {
      res.json({
        errorMessage: `User is not an administrator, so they cannot delete records`,
      });
    }
  }
});

module.exports = app;
